import React, { useRef, useEffect } from "react";

type MyCanvasCustomProps = {

}
declare interface MyCanvasProps {
  props?: MyCanvasCustomProps & React.ComponentPropsWithoutRef<"canvas">; 
  rootStyles?: React.CSSProperties; 
} 

export default function MyCanvas({rootStyles, props}: MyCanvasProps){
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext('2d')
    draw(context)
    return () => {
      // cleanup code if needed 
    }
  }, [draw])

  return (
    <div style={{...rootStyles}}>
      <canvas ref={canvasRef} width={400} height={300} {...props} />
    </div>
  )
} 

/**
 * Canvas renderer
 */
 const draw = (ctx: CanvasRenderingContext2D | null) => {
  if(ctx === null) return;
  
  /**
   * Draw canvas
   */
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.fill();
  ctx.beginPath();
  ctx.rect(20, 20, 150, 100);
  ctx.stroke();
}
