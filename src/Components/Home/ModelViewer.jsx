// src/Components/Home/ModelViewer.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import { Suspense } from "react";

function Sculpture() {
  const { scene } = useGLTF("/sculpture.glb"); // in /public
  return <primitive object={scene} scale={1.15} />; // ↑ slightly bigger
}

export default function ModelViewer() {
  return (
    // bigger viewport between the text columns
    <div className="hidden lg:flex items-center justify-center w-[480px] h-[560px] xl:w-[540px] xl:h-[640px]">
      <Canvas
        camera={{ fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}     // transparent canvas
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 6, 5]} intensity={1.2} />

        <Suspense fallback={null}>
          {/* Smaller margin => model frames larger */}
          <Bounds fit clip observe margin={0.8}>
            <Sculpture />
            <OrbitControls
              makeDefault
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1.6}

              // Lock vertical tilt: only left↔right orbit
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}

              // Optional: keep horizontal unrestricted (full 360°).
              // If you want to limit left-right range, set:
              // minAzimuthAngle={-Math.PI / 3}
              // maxAzimuthAngle={ Math.PI / 3}
            />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/sculpture.glb");
