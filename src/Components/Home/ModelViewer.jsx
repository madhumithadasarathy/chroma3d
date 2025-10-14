import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Sculpture() {
  const { scene } = useGLTF("/sculpture.glb"); // file in public folder
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

export default function ModelViewer() {
  return (
    <div className="hidden lg:flex items-center justify-center w-[400px] h-[400px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Sculpture />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
