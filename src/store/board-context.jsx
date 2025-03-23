import { createContext } from "react";

const boardContext = createContext({
    activeToolItem: "",
    toolActionTypes: "",
    elements: [],
    boardMouseDownHandler: () => {},
    changeToolHandler: () => {},
    boardMouseMoveHandler: () => {},
    boardMouseUpHandler: () => {},
})

export default boardContext;