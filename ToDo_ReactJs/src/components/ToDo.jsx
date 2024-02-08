import { useEffect, useState } from "react";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import "../css/ToDo.css";

function ToDo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allToDo, setAllToDo] = useState([]);
  const [tab, setTab] = useState("ALL");

  useEffect(() => {
    setAllToDo(JSON.parse(localStorage.getItem("todoList")) || []);
  }, []);

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
    let todoArr = [...allToDo, todoData];
    setAllToDo(todoArr);

    console.log(todoArr);

    localStorage.setItem("todoList", JSON.stringify(todoArr));
    setTitle("");
    setDescription("");
  };

  function handleToDoDelete(index) {
    const updatedToDoList = [...allToDo];
    updatedToDoList.splice(index, 1);

    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
    setAllToDo(updatedToDoList);
  }

  function handleComplete(index) {
    const updatedToDoList = allToDo.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          status: "COMPLETED",
          completedOn: getTime(),
        };
      }
      return item;
    });

    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
    setAllToDo(updatedToDoList);
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
          <button onClick={() => setTab("ALL")}>ALL</button>
          <button onClick={() => setTab("ACTIVE")}>ACTIVE</button>
          <button onClick={() => setTab("COMPLETED")}>Completed</button>
        </div>
        <div className="todo-list">
          {tab === "ALL" &&
            allToDo.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    {" "}
                    <i>
                      {item.status === "ACTIVE"
                        ? "Created at " + item.addedTime
                        : "Completed at " + item.completedOn}
                    </i>
                  </p>
                </div>
                <div>
                  <DeleteSweepIcon
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete(index)}
                  />
                  {item.status === "ACTIVE" ? (
                    <DoneAllIcon
                      title="Completed?"
                      className=" check-icon"
                      onClick={() => handleComplete(index)}
                    />
                  ) : (
                    <RemoveDoneIcon className=" uncheck-icon" />
                  )}
                </div>
              </div>
            ))}

          {tab === "ACTIVE" &&
            allToDo.map(
              (item, index) =>
                item.status === "ACTIVE" && (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <DeleteSweepIcon
                        title="Delete?"
                        className="icon"
                        onClick={() => handleToDoDelete(index)}
                      />
                      <DoneAllIcon
                        title="Completed?"
                        className=" check-icon"
                        onClick={() => handleComplete(index)}
                      />
                    </div>
                  </div>
                )
            )}

          {tab === "COMPLETED" &&
            allToDo.map(
              (item, index) =>
                item.status === "COMPLETED" && (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>
                        {" "}
                        <i>Completed at: {item.completedOn}</i>
                      </p>
                    </div>
                    <div>
                      <DeleteSweepIcon
                        className="icon"
                        onClick={() => handleCompletedTodoDelete(index)}
                      />
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
