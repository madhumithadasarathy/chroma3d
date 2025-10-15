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
  const { scene } = useGLTF("/natraj.glb"); // model in /public
  const clone = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
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

  return <primitive object={clone} scale={1.0} position={[-0.25, -0.15, 0]} />;
}

export default function ModelViewer() {
  return (
    <div
      className="
        flex items-center justify-center
        w-[240px] h-[260px]
        sm:w-[300px] sm:h-[320px]
        md:w-[340px] md:h-[380px]
        lg:w-[420px] lg:h-[480px]
        xl:w-[460px] xl:h-[520px]
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
            <Bounds fit clip observe margin={1.1}>
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

useGLTF.preload("/natraj.glb");
