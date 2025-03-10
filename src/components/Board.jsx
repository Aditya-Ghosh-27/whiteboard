import { useEffect, useRef } from "react";
import rough from "roughjs";

function Board(){
    const canvasRef = useRef();
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let roughCanvas = rough.canvas(canvas);
        let generator = roughCanvas.generator;
        let rect1 = generator.rectangle(10, 10, 100, 100);
        let rect2 = generator.rectangle(10, 120, 100, 100, { fill: "blue" });
        roughCanvas.draw(rect1);
        roughCanvas.draw(rect2);
    }, []);
    return(
        <canvas ref={canvasRef}/>
    );
}

export default Board;