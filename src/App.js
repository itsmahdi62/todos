import './App.scss';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import { useRef , useState , useCallback , useEffect } from 'react';
import {MdEdit , MdDelete} from "react-icons/md"
import { FALSE } from 'node-sass';
const App = ()  =>{
  const [todos,setTodos] = useState([])
  const [userInput, setUseInput] = useState([""])
  const [todoIndex , setTodoIndex] = useState(null)
  const [editText , setEditText] = useState("")
  const [editing , setEditing] = useState(false)

  const ref = useRef(null)

  const addTodoHandler = useCallback( () =>{
    const oldTodos = [...todos];

    if(userInput === ""){
      return;
    }else{
      const newTodo = {
        id: Math.floor(Math.random() * 1000),
        text : userInput
      };
      const newTodos = oldTodos.concat(newTodo)
      setTodos(newTodos)
    }
    
    setUseInput("")
  } , [todos , userInput])

  const deleteTodoHandler = useCallback((id) =>{
      const oldTodos = [...todos];
      const newTodos = oldTodos.filter((todo) => todo.id !== id)
      setTodos(newTodos)
      setEditing(true)

  },[todos]
  )

  const saveEditTodoHandler = useCallback((id) => {
    setEditing(false)
    setTodoIndex(null)

    const oldTodos = [...todos]    

    const newTodos = oldTodos.map((todo) =>{
      if(todo.id === id){
        if(editText !== ''){
          todo.text = editText
        }else{
          return todo
        }
      }
       return todo 
    })
    setTodos(newTodos)
  },[editText , todos])

  const editTodoHandler = useCallback((index) => {
     setTodoIndex(index)
     setEditing(true)
  },[])

  useEffect(() =>{
    ref.current.focus()
  },[])
  return (
    <div className="App">
        <Navbar />
           <div className='container'>
              <span className='total'>Total todos : {todos.length}</span>
              <div className='input-container'>
                <input 
                  type='text'
                  value={userInput}
                  onChange={(e) => setUseInput(e.target.value)}
                  ref={ref}
                />
                <button onClick={addTodoHandler}>Add</button>
              </div>
              {todos.length === 0 && <h2 style={{color:'white',fontWeight:'bold',marginTop:"15px"}}>Start Adding todos ...</h2>}
              <div className='todos-container-parent'>
                {todos.map((todo , index) =>{
                  return <div key={todo.id} className='todos-container-child'>
                  {editing &&  todoIndex !== index ? ( 
                      <div className='editer'>
                        <input type='text' defaultValue={todo.text} onChange={(e) => setEditText(e.target.value) }/>
                        <button onClick={()=>saveEditTodoHandler(todo.id)}>Save</button>
                      </div>) : 
                      (<>
                        <h4 className='todo-text'>{todo.text}</h4>
                         <div className='iconContainer'>
                           <MdDelete onClick={() => deleteTodoHandler(todo.id)} style={{marginRight:'10px'}}/>
                           <MdEdit onClick={() => editTodoHandler(todo.id)}/>
                         </div>
                      </>)
                  }
                  </div>
                })}
              </div>
           </div>
        <Footer />
    </div>
  );
}

export default App;
