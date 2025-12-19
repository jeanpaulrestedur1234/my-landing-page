import { Canvas, useThree } from "@react-three/fiber"
import Model from "./Model"
import { Suspense } from "react"
import { useProgress, Html, ScrollControls } from "@react-three/drei"
import './Heroillustration.css';

function Loader() {
  const { progress, active } = useProgress()

  return <Html center>{progress.toFixed(1)} % loaded</Html>
}


export const HeroIllustration = () => {

  return (
    <div className="illustration-wrapper">
      <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
        <directionalLight position={[-5, -5, 5]} intensity={4} />
        <Suspense fallback={<Loader />}>
          <ScrollControls damping={0.5} pages={3} style={{ scrollbarWidth: "none" }}>
            <Model />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
};

