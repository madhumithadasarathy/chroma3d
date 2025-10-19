// src/Components/Home/ModelViewer.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center, Bounds } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Color, MeshStandardMaterial } from "three";

/**
 * ModelViewer
 * - Defaults to /natraj.glb (in /public)
 * - Keeps model’s original materials by default (set overrideBronze=true to force bronze)
 */
export default function ModelViewer({ src = "/natraj.glb", overrideBronze = false }) {
  const controls = useRef(null);

  useEffect(() => {
    if (!controls.current) return;
    controls.current.setAzimuthalAngle(0);
    controls.current.setPolarAngle(Math.PI / 2.45);
    controls.current.update();
  }, [src]);

  return (
    <div className="flex flex-col items-center justify-start">
      <div
        className="
          relative z-[120] flex items-center justify-center
          w-[240px] h-[260px]
          sm:w-[300px] sm:h-[320px]
          md:w-[360px] md:h-[380px]
          lg:w-[460px] lg:h-[520px]
          xl:w-[500px] xl:h-[560px]
        "
      >
        <Canvas
          className="relative z-[120]"
          camera={{ fov: 30, position: [0, 0.6, 3.1], near: 0.1, far: 100 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          shadows
        >
          {/* Lights tuned for dark UI */}
          <ambientLight intensity={0.8} />
          <hemisphereLight intensity={0.6} groundColor="#1a1a1a" />
          <directionalLight position={[2.5, 3.5, 3]} intensity={1.2} color="#fff9e8" castShadow />
          <directionalLight position={[-3, 1.2, -2]} intensity={0.55} color="#ff8c42" />
          <directionalLight position={[3, 0.6, -1.5]} intensity={0.35} color="#9ec3ff" />
          <Environment preset="studio" intensity={0.65} />

          <Suspense fallback={null}>
            <Center>
              <Bounds fit clip observe margin={1.05} key={src}>
                <Sculpture url={src} overrideBronze={overrideBronze} />
              </Bounds>
            </Center>
          </Suspense>

          <OrbitControls
            ref={controls}
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
        </Canvas>
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

function Sculpture({ url, overrideBronze }) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    // Optional bronze override (set overrideBronze=true on ModelViewer to use)
    const bronze = new MeshStandardMaterial({
      color: new Color("#c67c36"),
      metalness: 0.8,
      roughness: 0.4,
      emissive: new Color("#2b1406"),
      emissiveIntensity: 0.35,
    });

    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (overrideBronze) o.material = bronze;
      }
    });
  }, [clone, overrideBronze]);

  return <primitive object={clone} position={[0, -0.12, 0]} scale={1.3} />;
}

// Preload your natraj model
useGLTF.preload("/natraj.glb");
