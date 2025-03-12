import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import toolboxContext from "./toolbox-context";
import { COLORS, TOOL_ITEMS, TOOLBOX_ACTIONS } from '../constants';

function toolboxReducer (state, action) {
    switch(action.type) {
        case TOOLBOX_ACTIONS.CHANGE_STROKE: {
            const newState = {...state};
            newState[action.payload.tool].stroke = action.payload.stroke;
            return newState;
        }
        case TOOLBOX_ACTIONS.CHANGE_FILL: {
            const newState = {...state};
            newState[action.payload.tool].fill = action.payload.fill;
            return newState;
        }
        default:
            return state;
    }
}

const initialToolboxState = {
    [TOOL_ITEMS.LINE]: {
        stroke: COLORS.BLACK,
        size: 1,
    },
    [TOOL_ITEMS.RECTANGLE]: {
        stroke: COLORS.BLACK,
        fill: null,
        size: 1
    },
    [TOOL_ITEMS.CIRCLE]: {
        stroke: COLORS.BLACK,
        fill: null,
        size: 1
    },
    [TOOL_ITEMS.ARROW]: {
        stroke: COLORS.BLACK,
        fill: null,
        size: 1
    },
}

const ToolboxProvider = ({ children }) => {
    const [toolboxState, dispatchToolboxAction] = useReducer(toolboxReducer, initialToolboxState);

    const changeStrokeHandler = (tool, stroke) => {
        dispatchToolboxAction({
            type: TOOLBOX_ACTIONS.CHANGE_STROKE,
            payload: {
                tool, 
                stroke,
            },
        });
    };

    const changeFillHandler = (tool, fill) => {
        dispatchToolboxAction({
            type: TOOLBOX_ACTIONS.CHANGE_FILL,
            payload: {
                tool,
                fill,
            },
        });
    };

    const toolboxContextValue = {
        toolboxState,
        changeStroke: changeStrokeHandler,
        changeFill: changeFillHandler,
    }
  return (
    <toolboxContext.Provider value={toolboxContextValue}>
        {children}
    </toolboxContext.Provider>
  );
};

ToolboxProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ToolboxProvider;