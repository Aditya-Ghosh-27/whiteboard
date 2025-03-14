import { useContext, useEffect, useRef, useLayoutEffect } from "react";
import rough from "roughjs";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../constants";
import boardContext from "../store/board-context";
import toolboxContext from "../store/toolbox-context";

function Board(){
    const canvasRef = useRef();
    const { elements, boardMouseDownHandler, boardMouseMoveHandler, boardMouseUpHandler, toolActionType } = useContext(boardContext);
    const { toolboxState, } = useContext(toolboxContext);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.save();
        let roughCanvas = rough.canvas(canvas);

        elements.forEach(element => {
            switch (element.type) {
                case TOOL_ITEMS.LINE:
                case TOOL_ITEMS.RECTANGLE:
                case TOOL_ITEMS.CIRCLE:
                case TOOL_ITEMS.ARROW:
                    roughCanvas.draw(element.roughEle);
                    break;
                case TOOL_ITEMS.BRUSH: {
                    context.fillStyle = element.stroke;
                    context.fill(element.path);
                    context.restore();
                    break;
                }
                default:
                    throw new Error("Type not recognized");
            }
        });

        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [elements])

    const handleMouseDown = (event) => {
        boardMouseDownHandler(event, toolboxState);
    };

    const handleMouseMove = (event) => {
        if(toolActionType === TOOL_ACTION_TYPES.DRAWING){
            boardMouseMoveHandler(event);
        }
    };

    const handleMouseUp = () => {
        boardMouseUpHandler();
    }
    return(
        <canvas ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}/>
    );
}

export default Board;