// src/Components/Home/ModelViewer.jsx
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Bounds,
  Environment,
  ContactShadows,
  Center,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { MeshStandardMaterial, MeshBasicMaterial, Color } from "three";

// --- Toggle this ON to verify canvas visibility quickly ---
const DEBUG = true;        // shows white sphere + axes/grid helpers
const FORCE_NORMAL = false; // set true to render model with MeshNormalMaterial (ignores PBR)

function Sculpture({ bronze = true }) {
  const { scene } = useGLTF("/ganesha.glb");
  const clone = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (FORCE_NORMAL) {
          // super-visible rainbow normals (unlit feel)
          o.material = new MeshBasicMaterial({ color: 0xffffff });
        }
      }
    });

    if (bronze && !FORCE_NORMAL) {
      // Warm bronze, slightly emissive so it never goes pitch-black
      const bronzeMat = new MeshStandardMaterial({
        color: new Color("#c67c36"),
        metalness: 0.8,
        roughness: 0.4,
        emissive: new Color("#2b1406"),
        emissiveIntensity: 0.35,
      });
      clone.traverse((o) => {
        if (o.isMesh) o.material = bronzeMat;
      });
    }
  }, [bronze, clone]);

  // Keep it centered and above the ground shadow
  return <primitive object={clone} scale={1.35} position={[0, -0.12, 0]} />;
}

export default function ModelViewer() {
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.setAzimuthalAngle(0);           // face camera
    controlsRef.current.setPolarAngle(Math.PI / 2.45);  // slight top-down
    controlsRef.current.update();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start">
      <div
        className="
          relative z-30 flex items-center justify-center
          w-[240px] h-[260px]
          sm:w-[300px] sm:h-[320px]
          md:w-[360px] md:h-[380px]
          lg:w-[460px] lg:h-[520px]
          xl:w-[500px] xl:h-[560px]
        "
      >
        <Canvas
          camera={{ fov: 30, position: [0, 0.6, 3.1], near: 0.1, far: 100 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          shadows
        >
          {/* Lighting layered so bronze reads on dark UI */}
          <ambientLight intensity={0.75} />
          <hemisphereLight intensity={0.5} groundColor="#1a1a1a" />
          <directionalLight
            position={[2.5, 3.5, 3]}
            intensity={1.15}
            color={"#fff9e8"}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          {/* warm rim */}
          <directionalLight position={[-3, 1.2, -2]} intensity={0.55} color={"#ff8c42"} />
          {/* cool fill */}
          <directionalLight position={[3, 0.6, -1.5]} intensity={0.35} color={"#9ec3ff"} />

          <Environment preset="studio" intensity={0.6} />

          <Suspense fallback={null}>
            <Center>
              <Bounds fit clip observe margin={1.05}>
                <Sculpture bronze />
              </Bounds>
            </Center>

            <ContactShadows
              opacity={0.4}
              scale={10}
              blur={2.5}
              far={5}
              resolution={1024}
              frames={1}
            />

            {/* DEBUG: if you can't see this white sphere, something is covering the Canvas */}
            {DEBUG && (
              <>
                {/* Unlit bright sphere (always visible) */}
                <mesh position={[0, -0.35, -0.1]}>
                  <sphereGeometry args={[0.25, 32, 32]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
                {/* Simple axes & grid to prove rendering */}
                <axesHelper args={[1.5]} />
                <gridHelper args={[10, 20, "#333", "#222"]} />
              </>
            )}

            <OrbitControls
              ref={controlsRef}
              makeDefault
              enablePan={false}
              enableZoom={false}
              autoRotate={false}
              enableDamping
              dampingFactor={0.08}
              minPolarAngle={Math.PI / 2.8}
              maxPolarAngle={Math.PI / 2.0}
              minAzimuthAngle={-Math.PI / 10}
              maxAzimuthAngle={Math.PI / 10}
              target={[0, 0.1, 0]}
            />
          </Suspense>
        </Canvas>

        {/* If some overlay is hiding the canvas, this z-index keeps it on top */}
      </div>

      <div className="mt-2 flex items-center gap-2 text-[10px] sm:text-xs text-white/60 select-none">
        <svg aria-hidden viewBox="0 0 24 24" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        <span>Hold &amp; drag to move</span>
        <svg aria-hidden viewBox="0 0 24 24" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}

useGLTF.preload("/ganesha.glb");
