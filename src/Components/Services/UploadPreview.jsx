import { useMemo, useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Center,
  Grid as DreiGrid,
  Bounds,
  useBounds,
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";

// ---------------- Small swatches + more options ----------------
const COLOR_PRESETS = [
  { key: "bronze", name: "Bronze", hex: "#cd7f32", metalness: 1.0, roughness: 0.35 },
  { key: "copper", name: "Copper", hex: "#b87333", metalness: 1.0, roughness: 0.35 },
  { key: "rose", name: "Rose Gold", hex: "#b76e79", metalness: 1.0, roughness: 0.35 },
  { key: "gunmetal", name: "Gunmetal", hex: "#2a2e35", metalness: 0.9, roughness: 0.5 },
  { key: "graphite", name: "Graphite", hex: "#2f2f2f", metalness: 0.8, roughness: 0.6 },
  { key: "silver", name: "Silver", hex: "#d7d7d7", metalness: 1.0, roughness: 0.2 },
  { key: "steel", name: "Steel Blue", hex: "#7a8a99", metalness: 0.7, roughness: 0.45 },
  { key: "orange", name: "Chroma Orange", hex: "#f97316", metalness: 0.6, roughness: 0.4 },
  { key: "emerald", name: "Emerald", hex: "#2ecc71", metalness: 0.5, roughness: 0.5 },
  { key: "violet", name: "Violet", hex: "#7c3aed", metalness: 0.6, roughness: 0.5 },
  { key: "white", name: "Soft White", hex: "#f1f1f1", metalness: 0.2, roughness: 0.9 },
  { key: "gray", name: "Neutral Gray", hex: "#9ca3af", metalness: 0.3, roughness: 0.8 },
  { key: "matteblack", name: "Matte Black", hex: "#111112", metalness: 0.05, roughness: 0.95 },
];

// ---------- utils ----------
function safeApplyMaterial(mesh, colorCfg) {
  const apply = (m) => {
    if (!m) return m;
    // If not standard, clone to Standard
    if (!(m instanceof THREE.MeshStandardMaterial)) {
      const nm = new THREE.MeshStandardMaterial();
      nm.color = new THREE.Color(colorCfg.hex);
      nm.metalness = colorCfg.metalness;
      nm.roughness = colorCfg.roughness;
      return nm;
    }
    // Clone to avoid mutating shared materials
    const nm = m.clone();
    nm.color = new THREE.Color(colorCfg.hex);
    nm.metalness = colorCfg.metalness;
    nm.roughness = colorCfg.roughness;
    nm.side = THREE.FrontSide; // prevent double-sided perf hit
    return nm;
  };

  const { material } = mesh;
  if (Array.isArray(material)) {
    mesh.material = material.map(apply);
  } else {
    mesh.material = apply(material);
  }
}

function normalizeExtents(root) {
  // Normalize ridiculous extents to something sane (~ unit-ish)
  const box = new THREE.Box3().setFromObject(root);
  if (!box.isEmpty()) {
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (!isFinite(maxDim) || maxDim === 0) return;
    if (maxDim > 1000 || maxDim < 0.001) {
      const scale = 1 / maxDim;
      root.scale.setScalar(scale);
    }
  }
}

function FitOnLoad({ deps = [] }) {
  const api = useBounds();
  // Fit over a few frames so geometry is fully committed
  useEffect(() => {
    let alive = true;
    let n = 0;
    function tick() {
      if (!alive) return;
      try {
        api.refresh().fit();
      } catch {}
      n += 1;
      if (n < 5) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return null;
}

// ---------- Per-format loaders ----------
function GLTFScene({ url, colorCfg, onAfterBuild }) {
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    // DRACO support
    const draco = new DRACOLoader();
    // Put these decoder files under: public/draco/*
    // Files needed: draco_wasm_wrapper.js, draco_decoder.wasm (or JS equivalents)
    draco.setDecoderPath("/draco/");
    loader.setDRACOLoader(draco);
  });

  const root = useMemo(() => {
    const s = gltf.scene ? gltf.scene.clone(true) : new THREE.Group();
    s.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = o.receiveShadow = true;
        safeApplyMaterial(o, colorCfg);
      }
    });
    normalizeExtents(s);
    onAfterBuild?.(s);
    return s;
  }, [gltf, colorCfg, onAfterBuild]);

  return (
    <Center>
      <primitive object={root} />
    </Center>
  );
}

function OBJGroup({ url, colorCfg, onAfterBuild }) {
  const obj = useLoader(OBJLoader, url);
  const group = useMemo(() => {
    const g = obj.clone(true);
    g.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = o.receiveShadow = true;
        safeApplyMaterial(o, colorCfg);
      }
    });
    normalizeExtents(g);
    onAfterBuild?.(g);
    return g;
  }, [obj, colorCfg, onAfterBuild]);

  return (
    <Center>
      <primitive object={group} />
    </Center>
  );
}

function STLMesh({ url, colorCfg, onAfterBuild }) {
  const geom = useLoader(STLLoader, url);
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    const g = ref.current;
    // Wrap in group to normalize easily
    const parent = new THREE.Group();
    parent.add(g);
    normalizeExtents(parent);
    onAfterBuild?.(parent);
    // remove again, we only needed bounds pass
    parent.remove(g);
  }, [onAfterBuild]);

  return (
    <Center>
      <mesh ref={ref} castShadow receiveShadow geometry={geom}>
        <meshStandardMaterial
          color={colorCfg.hex}
          metalness={colorCfg.metalness}
          roughness={colorCfg.roughness}
        />
      </mesh>
    </Center>
  );
}

function GenericModel({ file, colorCfg, onAfterBuild }) {
  if (!file) return null;
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const url = URL.createObjectURL(file); // key below to force remount per new file

  let Child = null;
  if (ext === "glb" || ext === "gltf") Child = GLTFScene;
  else if (ext === "obj") Child = OBJGroup;
  else if (ext === "stl") Child = STLMesh;

  if (!Child) return null;

  return (
    <Bounds fit clip observe margin={1} key={url}>
      <Child url={url} colorCfg={colorCfg} onAfterBuild={onAfterBuild} />
      <FitOnLoad deps={[url, colorCfg.key]} />
    </Bounds>
  );
}

function Viewer({ file, colorCfg, onAfterBuild }) {
  return (
    <div className="relative h-[100svh] w-full">
      <div className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <Canvas shadows camera={{ position: [2.2, 1.6, 2.6], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#0a0a0b"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={1.05} castShadow />
        <directionalLight position={[-3, 1, -2]} intensity={0.45} />

        <Suspense fallback={null}>
          <GenericModel file={file} colorCfg={colorCfg} onAfterBuild={onAfterBuild} />
          <Environment preset="city" />
          <ContactShadows opacity={0.4} scale={8} blur={2.5} far={4} />
        </Suspense>

        <DreiGrid
          args={[10, 10]}
          sectionSize={1}
          cellSize={0.2}
          cellThickness={0.6}
          sectionThickness={1}
          followCamera={false}
          fadeDistance={18}
          fadeStrength={1}
          position={[0, -0.001, 0]}
          infiniteGrid
        />
        <OrbitControls enableDamping dampingFactor={0.08} makeDefault />
      </Canvas>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-white/70 tracking-wide select-none">
        <div className="flex items-center gap-3">
          <span>←</span>
          <span className="uppercase">Hold & drag to orbit</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
}

// ---------------- Main UploadPreview Component ----------------
export default function UploadPreview() {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [colorKey, setColorKey] = useState("bronze");
  const [err, setErr] = useState("");

  const colorCfg = useMemo(
    () => COLOR_PRESETS.find((c) => c.key === colorKey) || COLOR_PRESETS[0],
    [colorKey]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    setErr("");
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    if (["glb", "gltf", "stl", "obj"].includes(ext)) setFile(f);
    else setErr("Unsupported file type. Use .glb, .gltf, .stl, or .obj");
  };

  const onPick = (e) => {
    setErr("");
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    if (["glb", "gltf", "stl", "obj"].includes(ext)) setFile(f);
    else setErr("Unsupported file type. Use .glb, .gltf, .stl, or .obj");
  };

  // track last built root size for debug (optional)
  const lastInfoRef = useRef(null);
  const onAfterBuild = (root) => {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    lastInfoRef.current = { size: size.toArray(), center: center.toArray() };
    // console.log("Model bbox:", lastInfoRef.current);
  };

  return (
    <div className="min-h-screen w-full text-[#f1f1f1] bg-[#0a0a0b] relative overflow-hidden">
      {/* BG layers */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_60%_at_50%_20%,rgba(5,5,6,0.8),rgba(5,5,6,0.98))]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,transparent 0 20px,rgba(255,255,255,0.6) 21px,transparent 22px)," +
            "repeating-linear-gradient(0deg,transparent 0 20px,rgba(255,255,255,0.6) 21px,transparent 22px)",
        }}
      />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[40rem] w-[40rem] bg-orange-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-[30rem] w-[30rem] bg-orange-500/10 blur-3xl rounded-full" />

      {/* 70 / 30 split */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[70vw_minmax(0,1fr)]">
        {/* 3D Viewer */}
        <div className="col-span-1 lg:col-auto">
          <Viewer file={file} colorCfg={colorCfg} onAfterBuild={onAfterBuild} />
        </div>

        {/* Right Controls: full viewport height */}
        <div className="h-[100svh] overflow-y-auto border-l border-white/10 bg-black/40 backdrop-blur-md p-4">
          {/* Header (tiny helper text) */}
          <div className="sticky top-0 z-10 -mx-4 mb-3 border-b border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md">
            <div className="text-[12px] tracking-widest uppercase">Upload & Style</div>
            <div className="text-[10px] text-[#9ca3af]">Supported: .glb · .gltf · .stl · .obj</div>
          </div>

          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            className={`rounded-2xl border ${
              drag ? "border-orange-400 bg-orange-500/5" : "border-white/10 bg-black/30"
            } p-4 text-center mb-4`}
          >
            <div className="text-sm mb-1">Drag & drop your 3D file here</div>
            <div className="text-[10px] text-[#9ca3af] mb-3">or</div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs hover:border-white/30">
              <input type="file" accept=".glb,.gltf,.stl,.obj" onChange={onPick} className="hidden" />
              <span>Browse Files</span>
            </label>
            {file && (
              <div className="mt-2 text-[11px] text-[#9ca3af]">
                Selected: <span className="text-white">{file.name}</span>
              </div>
            )}
            {err && <div className="mt-2 text-[11px] text-orange-400">{err}</div>}
            <div className="mt-2 text-[10px] text-[#9ca3af]">Supported: .glb · .gltf · .stl · .obj</div>
          </div>

          {/* Color swatches (small) */}
          <div className="mb-5">
            <div className="mb-2 text-[12px] tracking-widest uppercase">Color & Finish</div>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setColorKey(c.key)}
                  className={`group flex flex-col items-center gap-1 rounded-lg border p-2 transition ${
                    colorKey === c.key
                      ? "border-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.22)]"
                      : "border-white/10"
                  }`}
                  title={c.name}
                >
                  <span className="h-8 w-8 rounded-md" style={{ background: c.hex }} />
                  <span className="text-[9px] text-[#9ca3af]">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Quote (placeholder UI) */}
          <div className="grid gap-2 text-[12px] pb-6">
            {[
              "Design-for-Manufacture check",
              "Support removal & cleanup",
              "Dimensional QA report (on request)",
              "Secure packaging & tracked shipping",
            ].map((t, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="text-[#c9c9c9]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
