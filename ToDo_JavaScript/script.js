const input = document.querySelector("input")
const addButton = document.querySelector(".add-button")
const todosUl = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
const deleteAllButton = document.querySelector(".delete-all")
const filters = document.querySelectorAll(".filter");
const filter1 = document.querySelector(".filter1");
const filter2 = document.querySelector(".filter2");

let todos = []

try {
  todos = JSON.parse(localStorage.getItem("todos")) || []
} catch (error) {
  todos=[]
}


let filter = ''

showAll()

addButton.addEventListener("click", () => {
    const inputValue = input.value.trim()
    if (!inputValue) {
        return
    }
    input.value = ''
    addTodo(inputValue)
    showAll()
})

function addTodo(name) {
    todos.unshift({ name: name, status: "pending" })
    localStorage.setItem("todos", JSON.stringify(todos))
}

function showAll() {
    const newtodos = filter?todos.filter((todo)=> todo.status === filter):todos

    console.log(newtodos);

    if (newtodos.length > 0) {
        emptyImage.style.display = "none"
        todosUl.innerHTML = ''
        newtodos.forEach((item, index) => {
            todosUl.appendChild(getList(item, index))
        })
    } else {
        todosUl.innerHTML = ''
        emptyImage.style.display = "block"
        return
    }
}

function getList(todo, index) {

    const list = document.createElement("li");
    list.setAttribute("class", "todo")

    const label = document.createElement("label")
    label.setAttribute("for", index)

    const inputEle = document.createElement("input");
    inputEle.setAttribute("id", index);
    inputEle.setAttribute("type", "checkbox");
    inputEle.checked = todo.status === "completed"
    inputEle.addEventListener("change", () => updateStatus(index, inputEle));

    const span = document.createElement("span");
    span.setAttribute("class", inputEle.getAttribute('checked') === 'true' ? 'checked' : '');
    span.innerHTML = todo.name;

    label.appendChild(inputEle)
    label.appendChild(span)

    const button = document.createElement("button");
    button.setAttribute("class", "delete-btn");
    button.setAttribute("data-index", index);
    button.addEventListener("click", () => remove(index));
    button.innerHTML = "<i class='fa fa-times'></i>";

    list.appendChild(label);
    list.appendChild(button);

    return list;
}


function updateStatus(index, inputEle) {
    console.log("update status", inputEle.checked);
    if (inputEle.checked) {
        console.log("checked status", index);

        inputEle.classList.add("checked");
        todos[index].status = 'completed'
    } else {
        console.log("unchecked status", index);

        inputEle.classList.remove("checked");
        todos[index].status = 'pending'
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}


function remove(index) {
    console.log("remove status", index);

    todos = todos.filter((todo, i) => index != i)
    showAll()
    localStorage.setItem("todos", JSON.stringify(todos));
}

deleteAllButton.addEventListener('click',()=>{
    todos=[]
    localStorage.setItem('todos',todos)
    showAll()
})


filter1.addEventListener('click', () => {
    console.log("filter inside completed", filter);
    filter = filter === 'completed' ? '' : 'completed'
    console.log("filter inside completed", filter);

    showAll()
})
filter2.addEventListener('click', () => {
    console.log("filter inside incompleted", filter);

    filter = filter === 'pending' ? '' : 'pending'
    console.log("filter inside incompleted", filter);

    showAll()
})