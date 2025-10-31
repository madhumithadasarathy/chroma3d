import { useMemo, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Center,
  Grid as DreiGrid,
} from "@react-three/drei";
import { OBJLoader } from "three-stdlib/loaders/OBJLoader";
import { STLLoader } from "three-stdlib/loaders/STLLoader";
import { GLTFLoader } from "three-stdlib/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { MeshStandardMaterial, Color } from "three";

// ---------------- Theme presets ----------------
const COLOR_PRESETS = [
  { key: "bronze", name: "Bronze", hex: "#cd7f32", metalness: 1.0, roughness: 0.35 },
  { key: "gunmetal", name: "Gunmetal", hex: "#2a2e35", metalness: 0.9, roughness: 0.5 },
  { key: "silver", name: "Silver", hex: "#d7d7d7", metalness: 1.0, roughness: 0.2 },
  { key: "graphite", name: "Graphite", hex: "#2f2f2f", metalness: 0.8, roughness: 0.6 },
  { key: "orange", name: "Chroma Orange", hex: "#f97316", metalness: 0.6, roughness: 0.4 },
  { key: "white", name: "Soft White", hex: "#f1f1f1", metalness: 0.2, roughness: 0.9 },
  { key: "gray", name: "Neutral Gray", hex: "#9ca3af", metalness: 0.3, roughness: 0.8 },
];

// ---------------- Per-format model components (hook-safe) ----------------
function GLTFScene({ url, colorCfg }) {
  const gltf = useLoader(GLTFLoader, url);
  const mat = useMemo(
    () => new MeshStandardMaterial({
      color: new Color(colorCfg.hex),
      metalness: colorCfg.metalness,
      roughness: colorCfg.roughness,
    }),
    [colorCfg]
  );

  const scene = useMemo(() => {
    const s = gltf.scene.clone();
    s.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.material = mat;
      }
    });
    return s;
  }, [gltf, mat]);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function OBJGroup({ url, colorCfg }) {
  const obj = useLoader(OBJLoader, url);
  const mat = useMemo(
    () => new MeshStandardMaterial({
      color: new Color(colorCfg.hex),
      metalness: colorCfg.metalness,
      roughness: colorCfg.roughness,
    }),
    [colorCfg]
  );

  const group = useMemo(() => {
    const g = obj.clone();
    g.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.material = mat;
      }
    });
    return g;
  }, [obj, mat]);

  return (
    <Center>
      <primitive object={group} />
    </Center>
  );
}

function STLMesh({ url, colorCfg }) {
  const geom = useLoader(STLLoader, url);
  return (
    <Center>
      <mesh castShadow receiveShadow geometry={geom}>
        <meshStandardMaterial
          color={colorCfg.hex}
          metalness={colorCfg.metalness}
          roughness={colorCfg.roughness}
        />
      </mesh>
    </Center>
  );
}

// Chooser that renders exactly one of the above subcomponents.
// (Hooks remain stable because they are inside leaf components.)
function GenericModel({ file, colorCfg }) {
  if (!file) return null;
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const url = URL.createObjectURL(file);

  if (ext === "glb" || ext === "gltf") {
    return <GLTFScene url={url} colorCfg={colorCfg} />;
  }
  if (ext === "obj") {
    return <OBJGroup url={url} colorCfg={colorCfg} />;
  }
  if (ext === "stl") {
    return <STLMesh url={url} colorCfg={colorCfg} />;
  }
  return null;
}

function Viewer({ file, colorCfg }) {
  return (
    <div className="relative h-[100svh] w-full">
      {/* Subtle halo */}
      <div className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <Canvas shadows camera={{ position: [1.8, 1.2, 2.2], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={1.1} castShadow />
        <directionalLight position={[-3, 1, -2]} intensity={0.4} />

        <Suspense fallback={null}>
          <GenericModel file={file} colorCfg={colorCfg} />
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
        <OrbitControls enableDamping dampingFactor={0.08} />
      </Canvas>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/70 tracking-wide select-none">
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

  const colorCfg = useMemo(
    () => COLOR_PRESETS.find((c) => c.key === colorKey) || COLOR_PRESETS[0],
    [colorKey]
  );

  const acceptExt = [".glb", ".gltf", ".stl", ".obj"];

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    if (["glb", "gltf", "stl", "obj"].includes(ext)) setFile(f);
  };

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    if (["glb", "gltf", "stl", "obj"].includes(ext)) setFile(f);
  };

  return (
    <div className="min-h-screen w-full text-[#f1f1f1] bg-[#0a0a0b] relative overflow-hidden">
      {/* Layered depth */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_60%_at_50%_20%,rgba(5,5,6,0.8),rgba(5,5,6,0.98))]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,transparent 0 20px,rgba(255,255,255,0.6) 21px,transparent 22px),"
            + "repeating-linear-gradient(0deg,transparent 0 20px,rgba(255,255,255,0.6) 21px,transparent 22px)",
        }}
      />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[40rem] w-[40rem] bg-orange-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-[30rem] w-[30rem] bg-orange-500/10 blur-3xl rounded-full" />

      {/* 70 / 30 split */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[70vw_minmax(0,1fr)]">
        {/* 3D Viewer */}
        <div className="col-span-1 lg:col-auto">
          <Viewer file={file} colorCfg={colorCfg} />
        </div>

        {/* Controls */}
        <div className="h-[100svh] overflow-y-auto border-l border-white/10 bg-black/40 backdrop-blur-md p-5">
          <div className="sticky top-0 z-10 -mx-5 mb-4 border-b border-white/10 bg-black/60 px-5 py-3 backdrop-blur-md">
            <div className="text-sm tracking-widest uppercase">Upload & Style</div>
            <div className="text-xs text-[#9ca3af]">Supported: .glb, .gltf, .stl, .obj</div>
          </div>

          {/* Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            className={`rounded-2xl border ${drag ? "border-orange-400 bg-orange-500/5" : "border-white/10 bg-black/30"} p-4 text-center mb-5`}
          >
            <div className="text-sm mb-2">Drag & drop your 3D file here</div>
            <div className="text-xs text-[#9ca3af] mb-3">or</div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs hover:border-white/30">
              <input type="file" accept={acceptExt.join(",")} onChange={onPick} className="hidden" />
              <span>Browse Files</span>
            </label>
            {file && (
              <div className="mt-3 text-xs text-[#9ca3af]">
                Selected: <span className="text-white">{file.name}</span>
              </div>
            )}
          </div>

          {/* Color swatches */}
          <div className="mb-6">
            <div className="mb-2 text-sm tracking-widest uppercase">Color & Finish</div>
            <div className="grid grid-cols-4 gap-3">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setColorKey(c.key)}
                  className={`group flex flex-col items-center gap-1 rounded-xl border p-2 transition ${
                    colorKey === c.key
                      ? "border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.25)]"
                      : "border-white/10"
                  }`}
                >
                  <span className="h-10 w-10 rounded-lg" style={{ background: c.hex }} />
                  <span className="text-[10px] text-[#9ca3af]">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Quote (placeholders) */}
          <div className="mb-6">
            <div className="mb-2 text-sm tracking-widest uppercase">Quick Quote (Preview)</div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <select className="rounded-lg border border-white/10 bg-black/40 p-2">
                <option>Material: PLA</option>
                <option>PETG</option>
                <option>ABS</option>
                <option>TPU (95A)</option>
                <option>Nylon (PA12)</option>
                <option>CF-Nylon</option>
              </select>
              <select className="rounded-lg border border-white/10 bg-black/40 p-2">
                <option>Layer: 0.2 mm</option>
                <option>0.12 mm</option>
                <option>0.28 mm</option>
              </select>
              <select className="rounded-lg border border-white/10 bg-black/40 p-2">
                <option>Infill: 15%</option>
                <option>0%</option>
                <option>5%</option>
                <option>25%</option>
                <option>50%</option>
              </select>
              <select className="rounded-lg border border-white/10 bg-black/40 p-2">
                <option>Finish: None</option>
                <option>Sanding</option>
                <option>Primer-Ready</option>
                <option>Vapor (ABS)</option>
              </select>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
              <div>
                <div className="text-xs text-[#9ca3af]">Est. Price (illustrative)</div>
                <div className="text-lg">₹ 1,250 – 1,850</div>
              </div>
              <button className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium hover:bg-white hover:text-black transition">
                Request Final Quote
              </button>
            </div>
          </div>

          {/* Perks */}
          <div className="grid gap-3 text-xs">
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
