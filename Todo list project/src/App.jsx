/*     https://itaskyourtasklist.netlify.app/     */

//in thi site I have host my app

import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toogleFinsihed = (params) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`The id is ${id}`);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      {/* <Navbar/>
      <div className="mx-3 md:container bg-violet-200 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-[40%]">
        <h1 className='font-bold text-center text-md md:text-3xl '>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>

          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
         <button onClick={handleAdd} disabled={todo.length<=3}  className='bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full   disabled:bg-violet-500 mx-2'>Save</button>  
         </div>
        </div>
        <input type="checkbox" id='show' checked={showFinished} onChange={toogleFinsihed} className='my-4'/> 
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
         <h2 className='text-2xl font-bold'>Your Todos</h2>
         <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos To Display</div> }
          {todos.map(item=>
            {
          return  (showFinished || !item.isCompleted) &&  <div key={item.id} className="todo flex  my-3 justify-between">
             <div className='flex gap-5 '>
               <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
               <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
            </div>
             <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}}  className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e , item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
             </div>
          </div> 
            }
          )}
        </div>
       
      </div> */}

      <Navbar />
      <div className="mx-3 md:container bg-violet-200 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-[40%]">
        <h1 className="font-bold text-center text-md md:text-3xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>

          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full disabled:bg-violet-500 mx-2"
            >
              Save
            </button>
          </div>
        </div>
        <input
          type="checkbox"
          id="show"
          checked={showFinished}
          onChange={toogleFinsihed}
          className="my-4"
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos To Display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex my-3 justify-between items-start"
                >
                  <div className="flex gap-5 w-full items-baseline">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div
                      className={`flex-grow ${
                        item.isCompleted ? "line-through" : ""
                      } break-words`}
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full items-start">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
