import { useEffect, useRef } from "react";

function App(){
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");

    context.fillStyle = "#FF0000";
    context.fillRect(0, 0, 150, 75);
  }, []);
  return(
    <div className="App">
      <canvas ref={canvasRef}/> 
    </div>
  );
}

export default App
