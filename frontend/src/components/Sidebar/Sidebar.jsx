import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./Sidebar.module.css";
import boardContext from "../../store/board-context";

const Sidebar = () => {
  const [canvases, setCanvases] = useState([]);
  const token = localStorage.getItem("whiteboard_user_token");
  console.log(token);
  const {
    canvasId,
    setCanvasId,
    setElements,
    setHistory,
    isUserLoggedIn,
    setUserLoginStatus,
  } = useContext(boardContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (token && !isUserLoggedIn) {
      setUserLoginStatus(true);
    }
  }, [token, isUserLoggedIn, setUserLoginStatus]);

  useEffect(() => {
    if (isUserLoggedIn) {
      fetchCanvases();
    }
  }, [isUserLoggedIn]);



  // Sending a Request to Create a Canvas
  // On the frontend, we trigger a request when the user clicks a "New Canvas" button. This request creates a blank canvas and navigates the user to its page.
  const handleCreateCanvas = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3030/api/canvas/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      fetchCanvases();
      setCanvasId(response.data.canvasId);
      handleCanvasClick(response.data.canvasId);
      return response.data;
    } catch (error) {
      console.error("Error creating canvas: ", error);
      return null;
    }
  };

  // Sends a POST request to create a blank canvas.
  // If successful, redirects the user to the new canvas page using its ID.

  const fetchCanvases = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/api/canvas/list",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCanvases(response.data);
      console.log(response.data);

      if (response.data.length === 0) {
        const newCanvas = await handleCreateCanvas();
        if (newCanvas) {
          setCanvasId(newCanvas._id);
          handleCanvasClick(newCanvas._id);
        }
      } else if (!canvasId && response.data.length > 0) {
        if (!id) {
          setCanvasId(response.data[0]._id);
          handleCanvasClick(response.data[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching canvases:", error);
    }
  };

  const handleDeleteCanvas = async (id) => {
    try {
      // Prevent deleting the currently active canvas without proper cleanup
      if (id === canvasId) {
        // Clear current canvas context first
        setCanvasId(null);
        setElements([]);
        setHistory([]);
      }

      await axios.delete(
        `http://localhost:3030/api/canvas/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //   Refresh the canvas list
      fetchCanvases();

      if (id === canvasId) {
        if (canvases.length > 1) {
          // Navigate to first available canvas
          const remainingCanvases = canvases.filter((c) => c._id !== id);
          if (remainingCanvases.length > 0) {
            const nextId = remainingCanvases[0]._id;
            setCanvasId(nextId);
            navigate(`/${nextId}`);
          } else {
            navigate("/");
          }
        } else {
          // No canvases left, go home
          navigate("/");
        }
      }
    //   setCanvasId(canvases[0]._id);
    //   handleCanvasClick(canvases[0]._id);
    } catch (error) {
      console.error("Error deleting canvas:", error);
      console.error('Error details:', error.response?.data);
      console.error('Error status:', error.response?.status);
      // Revert any context changes on error
      if (id === canvasId) {
        await fetchCanvases();
      }
    }
  };

  const handleCanvasClick = (id) => {
    console.log("canvas click");
    setCanvasId(id);
    navigate(`/${id}`);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("whiteboard_user_token");
    localStorage.removeItem("canvas_id");
    setCanvases([]);
    setUserLoginStatus(false);
    navigate("/login");
    // navigate(0);
  };

  const handleShare = async () => {
    if (!email.trim()) {
      setError("Please enter an email");
      return;
    }

    try {
      setError(""); // Clear previous errors
      setSuccess(""); // Clear previous success message

      const response = await axios.put(
        `http://localhost:3030/api/canvas/share/${canvasId}`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to share canvas");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className={classes.sidebar}>
      <button
        className={classes.create_button}
        onClick={handleCreateCanvas}
        disabled={!isUserLoggedIn}
      >
        + Create New Canvas
      </button>
      <ul className={classes.canvas_list}>
        {canvases.map((canvas) => (
          <li
            key={canvas._id}
            className={`canvas_item ${
              canvas._id === canvasId ? "selected" : ""
            }`}
          >
            <button
              className={classes.canvas_name}
              onClick={() => handleCanvasClick(canvas._id)}
            >
              {canvas._id}
            </button>
            <button
              className={classes.delete_button}
              onClick={() => handleDeleteCanvas(canvas._id)}
            >
              del
            </button>
          </li>
        ))}
      </ul>

      <div className={classes.share_container}>
        <input
          type="email"
          placeholder="Enter the email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={classes.share_button}
          onClick={handleShare}
          disabled={!isUserLoggedIn}
        >
          Share
        </button>
        {error && <p className={classes.error_message}>{error}</p>}
        {success && <p className={classes.success_message}>{success}</p>}
      </div>
      {isUserLoggedIn ? (
        <button
          className={`${classes.auth_button} ${classes.logout_button}`}
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className={`{classes.auth_button} ${classes.login_button}`}
          onClick={handleLogin}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Sidebar;
