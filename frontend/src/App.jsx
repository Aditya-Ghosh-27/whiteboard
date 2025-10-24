import Board from "./components/Board/Board";
import Toolbar from "./components/Toolbar/Toolbar";
import Toolbox from "./components/Toolbox/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
// import { useContext } from "react";
// import boardContext from "./store/board-context";

function HomePage(){
  const { id } = useParams();
  return (
    <div className="">
      <Toolbar />
      <Board id={id}/>
      <Toolbox />
      <Sidebar />
    </div>
  )
}

function App() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default App;