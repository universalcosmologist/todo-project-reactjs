import React,{useState} from 'react'
import { useToDo } from '../contexts/ToDoContext'

function TodoItem({todo}) {

    const [todomsg,setTodoMsg]=useState(todo.todoTitle);

    const [istodoEditable,setIsTodoEditable]=useState(false);

   const {toggleComplete,updateToDo,deleteToDo}=useToDo();

   const toggle=(e)=>{
     toggleComplete(todo.id);
   }

   const editTodo=()=>{
     updateToDo(todo.id,{...todo,todoTitle:todomsg})
     setIsTodoEditable(false);
   }

  return (
    <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-white/50 duration-300 text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
        <input 
        type='checkbox'
        className='cursor-pointer'
        checked={todo.completed}
        onChange={toggle}
        />
        <input 
        type='text'
        className={`border outline-none w-full bg-transparent rounded-lg ${istodoEditable ? "border-black/10 px-2" : "border-transparent"}
        ${todo.completed ? "line-through" : ""}`}
        value={todomsg}
        onChange={(e)=>setTodoMsg(e.target.value)}
        readOnly={!istodoEditable}
        />
        <button
         className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
         onClick={()=>{
            if(todo.completed){
                return;
            }
            if(istodoEditable){
               editTodo();
            }
            else{
                setIsTodoEditable((prev)=>!prev);
            }
         }}
        disabled={todo.completed}>
         {istodoEditable ? "📁" : "✏️"}
        </button>
        <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'
        onClick={()=>deleteToDo(todo.id)}>
          ❌
        </button>
    </div>
  )
}

export default TodoItem