import { Canvas } from "@react-three/fiber"
import { Sphere, Environment } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { type Group, Vector3 } from "three"

function AnimatedSpheres() {
  const group = useRef<Group>(null)
  const spheres = useRef<Vector3[]>([])

  // Initialize sphere positions
  if (spheres.current.length === 0) {
    for (let i = 0; i < 8; i++) {
      spheres.current.push(new Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2))
    }
  }

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.1
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group ref={group}>
      {spheres.current.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.2, 32, 32]}>
          <meshStandardMaterial color={i % 2 === 0 ? "#4f46e5" : "#7c3aed"} roughness={0.1} metalness={0.8} />
        </Sphere>
      ))}
    </group>
  )
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <Environment preset="city" />
        <AnimatedSpheres />
      </Canvas>
    </div>
  )
}

