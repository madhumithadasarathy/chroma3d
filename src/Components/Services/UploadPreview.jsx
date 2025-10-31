import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
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
import { MeshStandardMaterial, Color } from "three";
import { motion } from "framer-motion";

/**
 * Chroma3D – Online 3D Printing Service (Preview Component)
 *
 * Design brief applied:
 * - "Cinematic precision meets engineered light" aesthetics
 * - Matte black base (#0a0a0b), Chroma Orange (#f97316) accents
 * - Layered depth (radial + grid + glow)
 * - 70/30 split: 3D viewer (70vw) full height; Controls (30vw)
 * - Color swatches incl. metallics (Bronze, Gunmetal, Silver, Graphite)
 * - Subtle motion via Framer Motion
 * - Grid + axes vibe using Drei Grid and glow halos
 *
 * Notes:
 * - Client-side only preview. Upload accepts .glb/.gltf/.stl/.obj and renders locally.
 * - Materials & Pricing, FAQs, and feature tiles mimic the referenced page structure ethically
 *   without copying proprietary copy.
 */

// ---------- Helpers ----------
const BG = ({ children }) => (
  <div className="min-h-screen w-full text-[#f1f1f1] bg-[#0a0a0b] relative overflow-hidden">
    {/* Layered depth: radial vignette */}
    <div className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_60%_at_50%_20%,rgba(5,5,6,0.8),rgba(5,5,6,0.98))]" />
    {/* Fine grid texture */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
         style={{
           backgroundImage:
             "repeating-linear-gradient(90deg,transparent 0 20px,rgba(255,255,255,0.6) 21px,transparent 22px)," +
             "repeating-linear-gradient(0deg,transparent 0 20px,rgba(255,255,255,0.6) 21px,transparent 22px)",
         }}
    />
    {/* Orange glow blobs */}
    <div className="pointer-events-none absolute -top-24 right-[-10%] h-[40rem] w-[40rem] bg-orange-500/10 blur-3xl rounded-full" />
    <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-[30rem] w-[30rem] bg-orange-500/10 blur-3xl rounded-full" />
    {children}
  </div>
);

const Section = ({ children, className = "" }) => (
  <section className={`w-[min(92vw,1100px)] mx-auto ${className}`}>{children}</section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs tracking-wide backdrop-blur-md">
    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
    {children}
  </span>
);

// Metallic / solid palette aligned to brief
const COLOR_PRESETS = [
  { key: "bronze", name: "Bronze", hex: "#cd7f32", metalness: 1.0, roughness: 0.35 },
  { key: "gunmetal", name: "Gunmetal", hex: "#2a2e35", metalness: 0.9, roughness: 0.5 },
  { key: "silver", name: "Silver", hex: "#d7d7d7", metalness: 1.0, roughness: 0.2 },
  { key: "graphite", name: "Graphite", hex: "#2f2f2f", metalness: 0.8, roughness: 0.6 },
  { key: "orange", name: "Chroma Orange", hex: "#f97316", metalness: 0.6, roughness: 0.4 },
  { key: "white", name: "Soft White", hex: "#f1f1f1", metalness: 0.2, roughness: 0.9 },
  { key: "gray", name: "Neutral Gray", hex: "#9ca3af", metalness: 0.3, roughness: 0.8 },
];

// ---------- 3D Loader ----------
function GenericModel({ file, colorCfg }) {
  const ext = useMemo(() => (file?.name || "").split(".").pop()?.toLowerCase(), [file]);
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  // Loaders per extension
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    if (!(ext === "glb" || ext === "gltf")) return; // guard
  });
  const obj = useLoader(OBJLoader, url, (loader) => {
    if (ext !== "obj") return;
  });
  const stl = useLoader(STLLoader, url, (loader) => {
    if (ext !== "stl") return;
  });

  // Unified scene graph
  const content = useMemo(() => {
    if (!file) return null;
    const mat = new MeshStandardMaterial({
      color: new Color(colorCfg.hex),
      metalness: colorCfg.metalness,
      roughness: colorCfg.roughness,
    });

    if (ext === "glb" || ext === "gltf") {
      const scene = gltf?.scene?.clone();
      scene?.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
          o.material = mat;
        }
      });
      return scene ? <primitive object={scene} /> : null;
    }
    if (ext === "obj") {
      const group = obj?.clone();
      group?.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
          o.material = mat;
        }
      });
      return group ? <primitive object={group} /> : null;
    }
    if (ext === "stl") {
      const geom = stl;
      if (!geom) return null;
      return (
        <mesh castShadow receiveShadow geometry={geom}>
          <meshStandardMaterial
            attach="material"
            color={colorCfg.hex}
            metalness={colorCfg.metalness}
            roughness={colorCfg.roughness}
          />
        </mesh>
      );
    }
    return null;
  }, [file, gltf, obj, stl, ext, colorCfg]);

  if (!file) return null;
  return (
    <Center>
      {content}
    </Center>
  );
}

function Viewer({ file, colorCfg }) {
  // Keep canvas tall and narrow: 70% of viewport width, full viewport height
  return (
    <div className="relative h-[100svh] w-full">
      {/* Subtle halo behind model */}
      <div className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <Canvas shadows camera={{ position: [1.8, 1.2, 2.2], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        {/* Warm key + cool fill */}
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

      {/* Hint */}
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

// ---------- UI Blocks ----------
function Hero() {
  return (
    <Section className="pt-14 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center gap-6"
      >
        <Badge>Cinematic Engineering • Online 3D Printing</Badge>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-[0.3em] sm:tracking-[0.5em] uppercase">
          Online 3D Printing Service
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-[#9ca3af]">
          Upload your model, choose material/finish, and get cinematic‑grade parts—fast. Engineered light, molten precision, industrial elegance.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <a href="#quote" className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-medium hover:bg-white hover:text-black transition">
            Get Instant Quote
          </a>
          <a href="#upload" className="rounded-xl border border-white/10 bg-black/40 px-5 py-2.5 text-sm hover:border-white/30 transition">
            Upload Model
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

function FeatureTiles() {
  const items = [
    { t: "Rapid Lead Times", d: "24–72h dispatch for standard parts." },
    { t: "Materials", d: "PLA, ABS, PETG, TPU, Nylon (PA12), CF blends." },
    { t: "Quality", d: "0.12–0.28 mm layers, QA with dimensional checks." },
    { t: "Batch & Proto", d: "One‑offs to short‑run production." },
  ];
  return (
    <Section className="pb-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-5 hover:-translate-y-1 transition will-change-transform shadow-[0_0_20px_rgba(249,115,22,0.15)]"
          >
            <div className="text-lg mb-1">{it.t}</div>
            <div className="text-sm text-[#9ca3af]">{it.d}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function PricingMaterials() {
  return (
    <Section id="quote" className="pb-14">
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <h3 className="text-xl font-medium mb-2 tracking-widest uppercase">Materials & Finishes</h3>
            <ul className="text-sm text-[#c9c9c9] list-disc pl-5 space-y-1">
              <li>PLA / PLA+ – cost‑effective, prototypes, visual models</li>
              <li>PETG – strength + temperature resistance, enclosures</li>
              <li>ABS – functional parts, post‑processing friendly</li>
              <li>TPU (95A) – flexible, wearables, gaskets</li>
              <li>Nylon (PA12) / CF – robust, end‑use components</li>
            </ul>
            <p className="text-xs text-[#9ca3af] mt-3">Request metallic spray, sanding, vapor smoothing, or primer‑ready finish as add‑ons.</p>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-xl font-medium mb-2 tracking-widest uppercase">Indicative Pricing</h3>
            <div className="text-sm text-[#c9c9c9] grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 p-3">
                <div className="text-white">Standard (PLA/PETG)</div>
                <div className="text-[#9ca3af]">₹12–₹18/gram · 0.2 mm</div>
              </div>
              <div className="rounded-xl border border-white/10 p-3">
                <div className="text-white">ABS / Nylon</div>
                <div className="text-[#9ca3af]">₹20–₹35/gram · 0.2 mm</div>
              </div>
              <div className="rounded-xl border border-white/10 p-3">
                <div className="text-white">CF Blends</div>
                <div className="text-[#9ca3af]">₹35–₹60/gram</div>
              </div>
              <div className="rounded-xl border border-white/10 p-3">
                <div className="text-white">Finishes</div>
                <div className="text-[#9ca3af]">Sanding/Primer/Vapor: +₹199–₹1499</div>
              </div>
            </div>
            <p className="text-[11px] text-[#9ca3af] mt-3">* Final quote depends on volume, supports, infill, and lead time.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Which files are supported?",
      a: ".glb, .gltf, .stl, and .obj are supported for instant preview. For STEP/IGES, export to one of the supported formats.",
    },
    {
      q: "How is cost calculated?",
      a: "We estimate by material weight, print time, supports, and finishing. The final quote is confirmed after a quick DFM check.",
    },
    {
      q: "What layer heights do you offer?",
      a: "0.12 mm (fine), 0.2 mm (standard), 0.28 mm (draft) for FDM. Custom profiles are available on request.",
    },
    {
      q: "Do you ship?",
      a: "Yes, pan‑India shipping with protective packaging. Same‑day pickup available in Chennai for urgent jobs.",
    },
  ];
  return (
    <Section className="pb-24">
      <h3 className="text-xl font-medium mb-4 tracking-widest uppercase">FAQs</h3>
      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 overflow-hidden">
        {items.map((it, i) => (
          <details key={i} className="group bg-black/30">
            <summary className="cursor-pointer list-none p-4 hover:bg-white/5 flex items-center justify-between">
              <span className="text-sm">{it.q}</span>
              <span className="text-orange-400 group-open:rotate-45 transition">+</span>
            </summary>
            <div className="p-4 pt-0 text-sm text-[#9ca3af]">{it.a}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}

// ---------- Upload + Preview (70/30 split) ----------
function UploadPreview() {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [colorKey, setColorKey] = useState("bronze");
  const colorCfg = useMemo(() => COLOR_PRESETS.find((c) => c.key === colorKey)!, [colorKey]);

  const onDrop = (e) => {
    e.preventDefault();
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
    <div id="upload" className="w-full">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[70vw_minmax(0,1fr)]">
        {/* 3D VIEWER (70vw x 100vh) */}
        <div className="col-span-1 lg:col-auto">
          <Viewer file={file} colorCfg={colorCfg} />
        </div>

        {/* CONTROL PANEL (fills remaining width) */}
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
              <input type="file" accept=".glb,.gltf,.stl,.obj" onChange={onPick} className="hidden" />
              <span>Browse Files</span>
            </label>
            {file && (
              <div className="mt-3 text-xs text-[#9ca3af]">Selected: <span className="text-white">{file.name}</span></div>
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
                    colorKey === c.key ? "border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.25)]" : "border-white/10"
                  }`}
                >
                  <span
                    className="h-10 w-10 rounded-lg"
                    style={{ background: c.hex }}
                  />
                  <span className="text-[10px] text-[#9ca3af]">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Simple quote inputs (non-functional placeholders) */}
          <div className="mb-6">
            <div className="mb-2 text-sm tracking-widest uppercase">Quick Quote (Preview)</div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <select className="rounded-lg border border-white/10 bg-black/40 p-2">
                <option>Material: PLA</option>
                <option>PETG</option>
                <option>ABS</option>
                <option>TPU (95A)</option>
                <option>Nylon (PA12)</option>
                <option>CF‑Nylon</option>
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
                <option>Primer‑Ready</option>
                <option>Vapor (ABS)</option>
              </select>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
              <div>
                <div className="text-xs text-[#9ca3af]">Est. Price (illustrative)</div>
                <div className="text-lg">₹ 1,250 – 1,850</div>
              </div>
              <button className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium hover:bg-white hover:text-black transition">Request Final Quote</button>
            </div>
          </div>

          {/* Perks */}
          <div className="grid gap-3 text-xs">
            {["Design‑for‑Manufacture check","Support removal & cleanup","Dimensional QA report (on request)","Secure packaging & tracked shipping"].map((t,i)=>(
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

function CTA() {
  return (
    <Section className="pb-16">
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 text-center">
        <h4 className="text-lg mb-2 tracking-widest uppercase">Ready to print?</h4>
        <p className="text-sm text-[#9ca3af] mb-4">Upload your 3D model and get a precise quote with lead times today.</p>
        <a href="#upload" className="inline-block rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-medium hover:bg-white hover:text-black transition">Start Now</a>
      </div>
    </Section>
  );
}

export default function Online3DPrintingService() {
  return (
    <BG>
      <Hero />
      <FeatureTiles />
      <UploadPreview />
      <PricingMaterials />
      <FAQ />
      <CTA />
    </BG>
  );
}
