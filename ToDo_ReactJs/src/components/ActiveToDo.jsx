import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import DoneAllIcon from "@mui/icons-material/DoneAll";

function ActiveToDo({allToDo,handleComplete,handleToDoDelete}) {
  return (
    <div>
      {allToDo.map(
        (item, index) =>
          item.status === "ACTIVE" && (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>
                  {" "}
                  <i>created at {item.addedTime}</i>
                </p>
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
    </div>
  );
}

export default ActiveToDo;
