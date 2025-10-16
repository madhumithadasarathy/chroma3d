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
  const { scene } = useGLTF("/natraj.glb"); // model in /public
  const clone = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    // ensure shadows
    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    // bronze override (optional)
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

  // 🟠 Slightly enlarged model and centered
  return <primitive object={clone} scale={1.25} position={[0, -0.15, 0]} />;
}

export default function ModelViewer() {
  const controlsRef = useRef(null);

  // force initial azimuth to center (0) on mount
  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.setAzimuthalAngle(0);
    controlsRef.current.update();
  }, []);

  return (
    <div
      className="
        flex items-center justify-center
        w-[260px] h-[280px]
        sm:w-[320px] sm:h-[340px]
        md:w-[380px] md:h-[420px]
        lg:w-[460px] lg:h-[520px]
        xl:w-[520px] xl:h-[580px]
      "
    >
      <Canvas
        camera={{ fov: 30 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        shadows
      >
        <Environment preset="studio" intensity={1} />
        <directionalLight position={[4, 6, 3]} intensity={0.6} castShadow />

        <Suspense fallback={null}>
          <Center>
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
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 10}  // restrict slight left
            maxAzimuthAngle={Math.PI / 10}   // restrict slight right
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/natraj.glb");
