import { createSlice } from "@reduxjs/toolkit";

const todoReducer=createSlice({
    name:'todo',
    initialState:{
        todoList:JSON.parse(localStorage.getItem("todoList")) || []
    },
    reducers:{
        addToDoStore:(state,action)=>{
            state.todoList.push(action.payload);
            localStorage.setItem("todoList", JSON.stringify(state.todoList));
        },
        removeToDoStore:(state,action)=>{
            state.todoList.splice(action.payload, 1);

            localStorage.setItem("todoList", JSON.stringify(state.todoList));
        },
        completeToDoStore:(state,action)=>{
            const updatedToDoList = state.todoList.map((item, i) => {
                if (action.payload.index === i) {
                  return {
                    ...item,
                    status: "COMPLETED",
                    completedOn: action.payload.time,
                  };
                }
                return item;
              });
              state.todoList = updatedToDoList
              localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
        }
    }
})

export default todoReducer.reducer
export const { addToDoStore, removeToDoStore, completeToDoStore } = todoReducer.actions;

