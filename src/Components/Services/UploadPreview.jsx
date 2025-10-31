// src/Components/Services/UploadPreview.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Bounds,
  Center,
  Grid,
  GizmoHelper,
  GizmoViewport,
  useGLTF,
} from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MeshStandardMaterial } from "three";
import { CloudUpload } from "lucide-react";

// ---------- Styling helpers (match your global background) ----------
const BG = () => (
  <>
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background:repeating-linear-gradient(90deg,transparent_0_20px,rgba(255,255,255,0.06)_21px,transparent_22px)]" />
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_45%,rgba(5,5,6,0.95)_0%,rgba(10,10,11,1)_60%,#000_100%)]" />
    <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl -z-10" />
    <div className="pointer-events-none absolute -right-24 bottom-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl -z-10" />
  </>
);

// ---------- Color palette ----------
const COLOR_SWATCHES = [
  { name: "Matte Black", value: "#111111" },
  { name: "Graphite", value: "#2f2f2f" },
  { name: "Pearl White", value: "#e5e7eb" },
  { name: "Signal Red", value: "#ef4444" },
  { name: "Chroma Orange", value: "#f97316" },
  { name: "Emerald", value: "#10b981" },
  { name: "Sky", value: "#38bdf8" },
  { name: "Royal Blue", value: "#3b82f6" },
  { name: "Violet", value: "#8b5cf6" },
];

// ---------- Material factory ----------
function makeMaterial(hex) {
  return new MeshStandardMaterial({
    color: hex,
    metalness: 0.1,
    roughness: 0.5,
  });
}

// ---------- GLTF/GLB model ----------
function GLTFModel({ url, color }) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);
  const material = useMemo(() => makeMaterial(color), [color]);

  useEffect(() => {
    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.material = material;
      }
    });
  }, [clone, material]);

  return <primitive object={clone} />;
}

// ---------- STL model ----------
function STLModel({ url, color }) {
  const geometry = useLoader(STLLoader, url);
  const material = useMemo(() => makeMaterial(color), [color]);

  // Center the mesh roughly via Center wrapper outside
  return <mesh geometry={geometry} material={material} castShadow receiveShadow />;
}

// ---------- OBJ model ----------
function OBJModel({ url, color }) {
  const group = useLoader(OBJLoader, url);
  const material = useMemo(() => makeMaterial(color), [color]);

  useEffect(() => {
    group.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.material = material;
      }
    });
  }, [group, material]);

  return <primitive object={group} />;
}

// ---------- Router that picks the correct loader ----------
function ModelRouter({ url, ext, color }) {
  if (!url) return null;
  if (ext === "glb" || ext === "gltf") return <GLTFModel url={url} color={color} />;
  if (ext === "stl") return <STLModel url={url} color={color} />;
  if (ext === "obj") return <OBJModel url={url} color={color} />;
  return null;
}

// ---------- Main Upload + Preview ----------
export default function UploadPreview() {
  const [objectURL, setObjectURL] = useState(null);
  const [ext, setExt] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("#f97316"); // default: Chroma Orange

  // clean up blob URL
  useEffect(() => {
    return () => {
      if (objectURL) URL.revokeObjectURL(objectURL);
    };
  }, [objectURL]);

  const onFiles = useCallback((file) => {
    if (!file) return;
    const e = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["glb", "gltf", "stl", "obj"];
    if (!allowed.includes(e)) {
      setError("Unsupported format. Please upload .glb/.gltf, .stl, or .obj");
      return;
    }
    setError("");
    if (objectURL) URL.revokeObjectURL(objectURL);
    const blobUrl = URL.createObjectURL(file);
    setObjectURL(blobUrl);
    setExt(e);
    setFileName(file.name);
  }, [objectURL]);

  const onInputChange = (e) => {
    const f = e.target.files?.[0];
    if (f) onFiles(f);
  };

  // drag & drop
  const dropRef = useRef(null);
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    const prevent = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
    };
    const onDrop = (ev) => {
      prevent(ev);
      const f = ev.dataTransfer?.files?.[0];
      if (f) onFiles(f);
    };
    ["dragenter", "dragover", "dragleave", "drop"].forEach((name) =>
      el.addEventListener(name, prevent)
    );
    el.addEventListener("drop", onDrop);
    return () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((name) =>
        el.removeEventListener(name, prevent)
      );
      el.removeEventListener("drop", onDrop);
    };
  }, [onFiles]);

  return (
    <section className="relative py-12 text-white">
      <BG />

      {/* Header */}
      <div className="relative mx-auto w-[min(92vw,1100px)] pb-6 text-center">
        <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] text-orange-500/80">
          <span className="h-[1px] w-8 bg-orange-500/60" />
          UPLOAD & PREVIEW
          <span className="h-[1px] w-8 bg-orange-500/60" />
        </div>
        <h2
          className="mt-2 text-3xl md:text-4xl font-semibold"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          See Your Model in <span className="text-orange-500">Color</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-neutral-400">
          Upload a 3D file (.glb/.gltf, .stl, .obj), inspect on an X-Y-Z grid, and preview finishes.
        </p>
      </div>

      {/* Bento: Left panel (Uploader + Color) and Right panel (Canvas) */}
      <div className="relative mx-auto grid w-[min(92vw,1100px)] gap-4 md:gap-6 sm:grid-cols-5">
        {/* Left: Upload + Options */}
        <div className="sm:col-span-2 space-y-4">
          {/* Dropzone */}
          <label
            ref={dropRef}
            className="
              group relative block rounded-2xl border border-white/12 bg-black/40
              backdrop-blur p-5 md:p-6 cursor-pointer overflow-hidden
              ring-0 focus-within:ring-2 focus-within:ring-orange-500/50
              "
          >
            <div className="flex items-start gap-3">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-orange-500/15 ring-1 ring-orange-500/30">
                <CloudUpload className="h-5 w-5 text-orange-400" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold">Upload 3D Model</div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Drag & drop or click to choose (.glb, .gltf, .stl, .obj)
                </div>
                {fileName ? (
                  <div className="mt-2 text-[12px] text-neutral-300">
                    Selected: <span className="text-white">{fileName}</span>
                  </div>
                ) : null}
              </div>
            </div>
            <input
              type="file"
              accept=".glb,.gltf,.stl,.obj"
              className="hidden"
              onChange={onInputChange}
            />
            <span className="pointer-events-none absolute -inset-x-10 top-0 h-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
            <div className="pointer-events-none absolute inset-x-12 -bottom-5 h-10 rounded-full bg-orange-500/20 blur-2xl" />
          </label>

          {/* Error */}
          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 px-3 py-2 text-sm">
              {error}
            </div>
          ) : null}

          {/* Color palette */}
          <div className="rounded-2xl border border-white/12 bg-black/40 backdrop-blur p-4">
            <div className="text-sm font-medium mb-3">Color Options</div>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_SWATCHES.map((c) => (
                <button
                  key={c.value}
                  title={c.name}
                  onClick={() => setColor(c.value)}
                  className={`
                    h-9 rounded-lg border
                    ${color === c.value ? "border-white/80" : "border-white/10"}
                  `}
                  style={{ background: c.value }}
                />
              ))}
            </div>
            <div className="mt-3 text-[11px] text-neutral-400">
              Tip: This is a visual approximation of filament/finish.
            </div>
          </div>
        </div>

        {/* Right: 3D Canvas */}
        <div className="sm:col-span-3 rounded-2xl border border-white/12 bg-black/40 backdrop-blur p-2">
          {/* 9:16 viewport (good for Insta Story preview); scales on larger screens */}
          <div className="relative mx-auto w-full max-w-[560px] aspect-[9/16]">
            <Canvas
              dpr={[1, 2]}
              shadows
              camera={{ fov: 35, position: [2.2, 1.6, 2.2] }}
              gl={{ antialias: true, alpha: true }}
            >
              {/* Lights & environment */}
              <Environment preset="studio" intensity={1} />
              <directionalLight position={[3, 6, 4]} intensity={0.8} castShadow />
              <ambientLight intensity={0.35} />

              {/* Grid & axes */}
              <Grid
                args={[20, 20]}
                cellColor="#333"
                sectionColor="#444"
                sectionThickness={1.2}
                cellSize={0.5}
                infiniteGrid
                fadeDistance={18}
                fadeStrength={2}
              />
              <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport axisColors={["#ff6b6b", "#4ade80", "#60a5fa"]} labelColor="white" />
              </GizmoHelper>

              {/* Model */}
              <Suspense fallback={null}>
                {objectURL ? (
                  <Center>
                    <Bounds fit clip observe margin={1.2}>
                      <ModelRouter url={objectURL} ext={ext} color={color} />
                    </Bounds>
                  </Center>
                ) : null}
              </Suspense>

              {/* Controls */}
              <OrbitControls
                makeDefault
                enablePan={false}
                enableDamping
                dampingFactor={0.08}
                minDistance={0.5}
                maxDistance={6}
              />
            </Canvas>

            {/* Empty-state hint */}
            {!objectURL ? (
              <div className="absolute inset-0 grid place-items-center text-center">
                <div className="text-neutral-400 text-sm px-6">
                  Upload a model to preview it on the grid. Use the color swatches to try finishes.
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

// drei needs this for dynamic GLTFs
useGLTF.preload("/dummy.glb");
