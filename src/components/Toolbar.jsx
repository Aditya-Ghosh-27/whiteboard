import { useState } from "react"
import classes from "./Toolbar.module.css"
import cx from "classnames";

const Toolbar = () => {
  const [activeToolItem, setActiveToolItem] = useState("A");
  return (
    <div className={classes.container}>
      <div 
        className={
          cx(classes.toolItem, {[classes.active]: activeToolItem === "A" })
          }
          onClick={() => setActiveToolItem("A")}>A</div>
      <div 
        className={
          cx(classes.toolItem, {[classes.active]: activeToolItem === "B" })
        }
        onClick={() => setActiveToolItem("B")}>B</div>
    </div>
  )
}

export default Toolbar