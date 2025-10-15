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
import { Suspense, useEffect, useMemo } from "react";
import { MeshStandardMaterial } from "three";

function Sculpture({ bronze = true }) {
  const { scene } = useGLTF("/mahadev.glb"); // model in /public
  const clone = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (!bronze) return;
    const bronzeMat = new MeshStandardMaterial({
      color: "#cd7f32",     // bronze tone
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

  // Keep your slight left offset; Bounds will still frame it safely
  return <primitive object={clone} scale={1.0} position={[-0.25, -0.15, 0]} />;
}

export default function ModelViewer() {
  return (
    <div className="hidden lg:flex items-center justify-center w-[420px] h-[480px] xl:w-[460px] xl:h-[520px]">
      <Canvas
        camera={{ fov: 30 }}                  // a bit narrower FOV helps prevent edge clipping
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        shadows
      >
        {/* Neutral, consistent lighting */}
        <Environment preset="studio" intensity={1} />
        <directionalLight position={[4, 6, 3]} intensity={0.6} castShadow />

        <Suspense fallback={null}>
          {/* Center normalizes pivot; Bounds keeps it in-frame on resize */}
          <Center>
            <Bounds fit clip observe margin={1.1}>
              <Sculpture bronze />
            </Bounds>
          </Center>

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

// Preload the correct model
useGLTF.preload("/mahadev.glb");
