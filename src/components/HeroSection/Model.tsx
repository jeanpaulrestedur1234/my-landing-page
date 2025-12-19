import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/robot_playground.glb")

export default function Model() {
    const group = useRef<Group>(null)
    const { scene, animations } = useGLTF("/robot_playground.glb")
    const { actions } = useAnimations(animations, scene)
    const scroll = useScroll()
    const { viewport } = useThree() // 👈 CLAVE

    useEffect(() => {
        if (actions?.Experiment) {
            actions.Experiment.play()
            actions.Experiment.paused = true
        }
    }, [actions])

    useFrame(() => {
        if (actions?.Experiment) {
            actions.Experiment.time =
                (actions.Experiment.getClip().duration * scroll.offset) / 4
        }
    })

    return (
        <group
            ref={group}
            scale={viewport.width / 3} // 🔥 ocupa el espacio disponible
            position={[0, -viewport.height / 4, 0]} // centra verticalmente
        >
            <primitive object={scene} />
        </group>
    )
}
