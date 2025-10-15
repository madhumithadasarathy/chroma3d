// src/Components/Home/ModelViewer.jsx
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Bounds,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { Color } from "three";

function Sculpture() {
  // Load gazebo.glb from /public
  const { scene } = useGLTF("/gazebo.glb");
  const clone = useMemo(() => scene.clone(), [scene]);

  // Keep model’s original materials/colors, just scale up slightly
  return <primitive object={clone} scale={1.2} position={[0, -0.15, 0]} />;
}

export default function ModelViewer() {
  return (
    <div className="hidden lg:flex items-center justify-center w-[420px] h-[480px] xl:w-[460px] xl:h-[520px]">
      <Canvas
        camera={{ fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        shadows
      >
        {/* Studio lighting for neutral base reflections */}
        <Environment preset="studio" intensity={1} />

        {/* Key light to highlight shape */}
        <directionalLight position={[4, 6, 3]} intensity={0.6} castShadow />

        {/* 🔶 Orange brand accent lighting */}
        <pointLight
          position={[0, -2, 0]} // from below
          intensity={1.2}
          distance={10}
          color={new Color("#ff7a1a")}
        />
        <pointLight
          position={[2.5, 0.5, 2]} // warm side glow
          intensity={0.4}
          color={new Color("#ff7a1a")}
        />

        <Suspense fallback={null}>
          <Bounds fit clip observe margin={0.9}>
            <Sculpture />
          </Bounds>

          {/* Soft shadow on ground */}
          <ContactShadows
            opacity={0.35}
            scale={10}
            blur={2.5}
            far={5}
            resolution={1024}
          />

          {/* Horizontal-only gentle rotation */}
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

// Preload model for faster load
useGLTF.preload("/gazebo.glb");
