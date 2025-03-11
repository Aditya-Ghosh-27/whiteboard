import React from 'react'
import classes from "./Toolbox.module.css"

const Toolbox = () => {
  return (
    <div className={classes.container}>
        <div className={classes.selectOptionContaienr}>
            <div className={classes.toolBoxLabel}>Stroke</div>
            <div className={classes.colorContainer}></div>
        </div>
    </div>
  )
}

export default Toolbox