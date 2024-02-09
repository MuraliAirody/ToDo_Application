import { useEffect, useState } from "react";
import "../css/ToDo.css";
import AllToDo from "./AllToDo";
import ActiveToDo from "./ActiveToDo";
import CompletedToDo from "./CompletedToDo";
import { useDispatch, useSelector } from "react-redux";
import { addToDoStore, completeToDoStore, removeToDoStore } from "../redux/reducer";

function ToDo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allToDo, setAllToDo] = useState([]);
  const [tab, setTab] = useState("ALL");
  const dispatch = useDispatch()
  const todo = useSelector((store)=>store.todo)

  useEffect(() => {
    setAllToDo(todo.todoList);
  }, [todo.todoList]);

  const getTime = () => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + minutes + ":" + ss;
    return finalDate;
  };

  const addToDo = () => {
    if (title.trim() === "" || description.trim() === "") {
      return;
    }
    let todoData = {
      title: title,
      description: description,
      status: "ACTIVE",
      addedTime: getTime(),
    };
     
    dispatch(addToDoStore(todoData))
    setTitle("");
    setDescription("");
  };

  function handleToDoDelete(index) {
    dispatch(removeToDoStore(index))
  }

  function handleComplete(index) {
    const data ={
      index:index,
      time:getTime()
    }
    dispatch(completeToDoStore(data))
  }

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button className="primary-btn" type="button" onClick={addToDo}>
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            onClick={() => setTab("ALL")}
            style={tab === "ALL" ? { background: "rgb(0, 230, 122)" } : {}}
          >
            ALL
          </button>
          <button
            onClick={() => setTab("ACTIVE")}
            style={tab === "ACTIVE" ? { background: "rgb(0, 230, 122)" } : {}}
          >
            ACTIVE
          </button>
          <button
            onClick={() => setTab("COMPLETED")}
            style={tab === "COMPLETED" ? { background: "rgb(0, 230, 122)" } : {}}
          >
            COMPLETED
          </button>
        </div>

        <div className="todo-list">
          {tab === "ALL" && (
            <AllToDo
              allToDo={allToDo}
              handleToDoDelete={handleToDoDelete}
              handleComplete={handleComplete}
            />
          )}

          {tab === "ACTIVE" && (
            <ActiveToDo
              allToDo={allToDo}
              handleToDoDelete={handleToDoDelete}
              handleComplete={handleComplete}
            />
          )}

          {tab === "COMPLETED" && (
            <CompletedToDo
              allToDo={allToDo}
              handleToDoDelete={handleToDoDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
