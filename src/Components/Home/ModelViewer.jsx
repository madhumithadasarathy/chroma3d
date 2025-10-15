// src/Components/Home/ModelViewer.jsx
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Bounds,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo } from "react";
import { MeshStandardMaterial } from "three";

function Sculpture({ bronze = true }) {
  const { scene } = useGLTF("/sculpture.glb"); // in /public
  const clone = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (!bronze) return;
    const bronzeMat = new MeshStandardMaterial({
      color: "#cd7f32", // bronze
      metalness: 1.0,
      roughness: 0.35,
    });
    clone.traverse((o) => {
      if (o.isMesh) {
        o.material = bronzeMat;
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, [bronze, clone]);

  // Slightly smaller model
  return <primitive object={clone} scale={1.0} position={[0, -0.15, 0]} />;
}

export default function ModelViewer() {
  return (
    // Reduced viewport height to balance layout
    <div className="hidden lg:flex items-center justify-center w-[420px] h-[480px] xl:w-[460px] xl:h-[520px]">
      <Canvas
        camera={{ fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        shadows
      >
        {/* Studio lighting for consistent reflections */}
        <Environment preset="studio" intensity={1} />
        <directionalLight position={[4, 6, 3]} intensity={0.6} castShadow />

        <Suspense fallback={null}>
          <Bounds fit clip observe margin={0.9}>
            <Sculpture bronze />
          </Bounds>

          {/* Soft ground shadow */}
          <ContactShadows
            opacity={0.35}
            scale={10}
            blur={2.5}
            far={5}
            resolution={1024}
          />

          {/* Horizontal-only rotation */}
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.3}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/Zeus.glb");
