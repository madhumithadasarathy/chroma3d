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
import { MeshStandardMaterial, Color } from "three";

function Sculpture({ bronze = true }) {
  // Load the new model
  const { scene } = useGLTF("/Zeus.glb"); // <- swapped to Zeus
  // Clone so we can override materials safely
  const clone = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (!bronze) return;
    const bronzeMat = new MeshStandardMaterial({
      color: "#cd7f32",   // bronze tone
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

  // Same scale/position as before
  return <primitive object={clone} scale={1.25} position={[0, -0.2, 0]} />;
}

export default function ModelViewer() {
  return (
    // Same viewport sizing between text columns
    <div className="hidden lg:flex items-center justify-center w-[480px] h-[560px] xl:w-[540px] xl:h-[640px]">
      <Canvas
        camera={{ fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}   // transparent canvas
        style={{ background: "transparent" }}
        shadows
      >
        {/* Even, consistent base lighting */}
        <Environment preset="studio" intensity={1} />

        {/* Neutral key light to shape the form */}
        <directionalLight position={[4, 6, 3]} intensity={0.6} castShadow />

        {/* Brand orange under-glow (subtle, from below) */}
        <pointLight
          position={[0, -2, 0]}
          intensity={1.2}
          distance={10}
          color={new Color("#ff7a1a")}
        />
        {/* Optional warm rim from the right for extra pop */}
        <pointLight
          position={[2.5, 0.5, 2]}
          intensity={0.4}
          color={new Color("#ff7a1a")}
        />

        <Suspense fallback={null}>
          {/* Keep same framing behavior */}
          <Bounds fit clip observe margin={0.8}>
            <Sculpture bronze />
          </Bounds>

          {/* Soft shadow that still works on transparent bg */}
          <ContactShadows
            opacity={0.35}
            scale={10}
            blur={2.5}
            far={5}
            resolution={1024}
          />

          {/* Horizontal-only rotation; no zoom/pan; gentle auto-rotate */}
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.4}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            // If you want to limit left↔right sweep, uncomment:
            // minAzimuthAngle={-Math.PI / 3}
            // maxAzimuthAngle={ Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the new model
useGLTF.preload("/Zeus.glb");
