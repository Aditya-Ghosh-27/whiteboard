import React, { useReducer } from "react"
import PropTypes from 'prop-types'
import boardContext from './board-context'
import { TOOL_ITEMS } from '../constants'

const boardReducer = (state, action) => {
  switch(action.type){
    case "CHANGE_TOOL":
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    default:
      return state;
  }
}

const intialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  elements: [],
}

const BoardProvider = ({children}) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer, 
    intialBoardState
  );
    // const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);
    // const [elements, setElements] = useState([]);

    const handleToolItemClick = (tool) => {
        dispatchBoardAction({ type: "CHANGE_TOOL", payload: {
          tool,
        }})
    };
    
    const boardContextValue = {
        activeToolItem: boardState.activeToolItem, 
        handleToolItemClick, 
    };
  return (
    <boardContext.Provider
        value={boardContextValue}
    >
        {children}
    </boardContext.Provider>
  )
}
BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BoardProvider