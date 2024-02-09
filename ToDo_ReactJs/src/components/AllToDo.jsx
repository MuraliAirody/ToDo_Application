import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import DoneAllIcon from "@mui/icons-material/DoneAll";

function AllToDo({allToDo,handleComplete,handleToDoDelete}){
    return(
        <div>
            {allToDo.map((item, index) => (
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
        </div>
    )
}

export default AllToDo;