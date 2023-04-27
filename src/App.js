import './App.scss';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import { useRef , useState , useCallback , useEffect } from 'react';
import { useContext } from 'react';
const App = ()  =>{
  const [todos,setTodos] = useState([])
  const [userInput, setUseInput] = useState([""])

  const ref = useRef(null)

  const addTodoHandler = useCallback( () =>{
    const oldTodos = [...todos];

    if(userInput ===""){
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

  useEffect(() =>{
    ref.current.focus()
  })
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

              <div className='todos-container-parent'>
                {todos.map((todo , index) =>{
                  return <div key={todo.id}><h4 style={{color:'white',margin:"25px"}}>{todo.text}</h4></div>
                })}
              </div>
           </div>
        <Footer />
    </div>
  );
}

export default App;
