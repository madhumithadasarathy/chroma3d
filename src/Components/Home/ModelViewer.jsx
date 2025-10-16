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
import { MeshStandardMaterial } from "three";

function Sculpture({ bronze = true }) {
  const { scene } = useGLTF("/ganesha.glb"); // model in /public
  const clone = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    // ensure shadows on all meshes
    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    if (bronze) {
      const bronzeMat = new MeshStandardMaterial({
        color: "#cd7f32",
        metalness: 1.0,
        roughness: 0.35,
      });
      clone.traverse((o) => {
        if (o.isMesh) o.material = bronzeMat;
      });
    }
  }, [bronze, clone]);

  // centered horizontally; slight down offset
  return <primitive object={clone} scale={1.35} position={[0, -0.15, 0]} />;
}

export default function ModelViewer() {
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    // start slightly top-down and centered
    controlsRef.current.setAzimuthalAngle(0);
    controlsRef.current.setPolarAngle(Math.PI / 2.5); // ~72°, a gentle tilt
    controlsRef.current.update();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start">
      {/* Canvas wrapper with responsive sizing */}
      <div
        className="
          relative flex items-center justify-center
          w-[240px] h-[260px]           /* phones */
          sm:w-[300px] sm:h-[320px]     /* small tablets */
          md:w-[360px] md:h-[380px]     /* tablets */
          lg:w-[460px] lg:h-[520px]     /* laptops/desktops */
          xl:w-[500px] xl:h-[560px]
        "
      >
        <Canvas
          camera={{ fov: 30, position: [0, 0.6, 3] }} // clear, flattering angle
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          shadows
        >
          {/* Lighting: soft fill + environment + key */}
          <ambientLight intensity={0.55} />
          <hemisphereLight intensity={0.35} groundColor="#1a1a1a" />
          <directionalLight
            position={[4, 6, 3]}
            intensity={0.6}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Environment preset="studio" intensity={0.7} />

          <Suspense fallback={null}>
            <Center>
              {/* Bounds frames the object nicely regardless of scale */}
              <Bounds fit clip observe margin={1.05}>
                <Sculpture bronze />
              </Bounds>
            </Center>

            <ContactShadows
              opacity={0.35}
              scale={10}
              blur={2.5}
              far={5}
              resolution={1024}
            />

            <OrbitControls
              ref={controlsRef}
              makeDefault
              enablePan={false}
              enableZoom={false}
              autoRotate={false}
              enableDamping
              dampingFactor={0.08}
              // allow a little vertical play (top-down-ish only)
              minPolarAngle={Math.PI / 2.8} // ~64°
              maxPolarAngle={Math.PI / 2.2} // ~82°
              // limit left/right sweep around center (~±18°)
              minAzimuthAngle={-Math.PI / 10}
              maxAzimuthAngle={Math.PI / 10}
              target={[0, 0.1, 0]} // nudge up a little so face/torso center nicely
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Subtle interaction hint */}
      <div className="mt-2 flex items-center gap-2 text-[10px] sm:text-xs text-white/60 select-none">
        {/* left arrow */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>

        <span>Hold &amp; drag to move</span>

        {/* right arrow */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}

useGLTF.preload("/ganesha.glb");
