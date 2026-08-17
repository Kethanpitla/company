import { motion, useMotionValue, useSpring } from "framer-motion";

const MouseGlow = () => {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX,{
      stiffness:120,
      damping:20
  })

  const y = useSpring(mouseY,{
      stiffness:120,
      damping:20
  })

  return(

      <div
      onMouseMove={(e)=>{

          mouseX.set(e.clientX-250)
          mouseY.set(e.clientY-250)

      }}
      className="absolute inset-0">

          <motion.div

          style={{
              x,
              y
          }}

          className="absolute h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[160px]"
          />

      </div>

  )

}

export default MouseGlow