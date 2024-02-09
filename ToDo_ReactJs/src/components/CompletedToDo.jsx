import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function CompletedToDo({allToDo,handleToDoDelete}){
    return(
        <div>
            {allToDo.map(
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
                        onClick={() => handleToDoDelete(index)}
                      />
                    </div>
                  </div>
                )
            )}
        </div>
    )
}

export default CompletedToDo;