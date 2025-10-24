import { createContext } from "react";

const boardContext = createContext({
  isUserLoggedIn: false,
  activeToolItem: "",
  toolActionType: "",
  elements: [],
  history: [[]],
  index: 0,
  boardMouseDownHandler: () => {},
  setCanvasId: () => {},
  setElements: () => {},
  changeToolHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
  setUserLoginStatus: () => {},
  setHistory: () => {},
});

export default boardContext;