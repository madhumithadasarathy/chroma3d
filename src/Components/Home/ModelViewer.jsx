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
    // ensure shadows on all meshes
    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    // optional bronze override
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
  return <primitive object={clone} scale={1.15} position={[0, -0.15, 0]} />;
}

export default function ModelViewer() {
  const controlsRef = useRef(null);

  // start centered (no left/right offset)
  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.setAzimuthalAngle(0);
    controlsRef.current.update();
  }, []);

  return (
    <div
      className="
        flex items-center justify-center
        w-[200px] h-[220px]           /* phones */
        sm:w-[260px] sm:h-[280px]     /* small tablets */
        md:w-[320px] md:h-[340px]     /* tablets */
        lg:w-[420px] lg:h-[480px]     /* laptops/desktops */
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
            {/* tighter margin so the larger scale still fits without cropping */}
            <Bounds fit clip observe margin={1.08}>
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
            autoRotate={false}          /* no full spin; starts centered */
            enableDamping
            dampingFactor={0.08}
            /* lock vertical tilt */
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            /* limit left/right sweep around center (~±18°) */
            minAzimuthAngle={-Math.PI / 10}
            maxAzimuthAngle={ Math.PI / 10}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/natraj.glb");
