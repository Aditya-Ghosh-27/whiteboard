import { createContext } from "react";

const boardContext = createContext({
    activeToolItem: "",
    toolActionTypes: "",
    elements: [],
    history: [[]],
    index: 0,
    boardMouseDownHandler: () => {},
    changeToolHandler: () => {},
    boardMouseMoveHandler: () => {},
    boardMouseUpHandler: () => {},
})

export default boardContext;