import { createContext } from "react";

const boardContext = createContext({
    activeToolItem: "",
    elements: [],
    boardMouseDownHandler: () => {},
    changeToolHandler: () => {},
    boardMouseMoveHandler: () => {},
    boardMouseUpHandler: () => {},
})

export default boardContext;