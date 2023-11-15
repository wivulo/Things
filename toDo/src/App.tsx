import { useState, useRef, useEffect } from 'react'
import {IoMdClose} from 'react-icons/io'
import {FaRegPenToSquare, FaCheck} from 'react-icons/fa6'
import {iListItemProps, iData as iTodo} from './interfaces.ts'
import {motion} from 'react-magic-motion'
import { getTodosAPI } from './api/getTodosAPI'


const Button = ({children, action}: any) => {
  return (
    <button className="px-2 py-1 text-white bg-transparent" onClick={action}>
      {children}
    </button>
  )
}

const ListItem = ({todo, onDelete, onMarkDone, hasEditedTodo}: iListItemProps) => {
  const [onEditeTodo, setOnEditeTodo] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>(todo.title)

  const handleEdit = () => {
    setOnEditeTodo(!onEditeTodo)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleEditedTodo = (e:any) => {
    if(e.key === 'Enter') {
      if (onEditeTodo && inputRef.current) {
        if (inputRef.current.value !== '') {
          let newValue = inputRef.current.value;
          hasEditedTodo && hasEditedTodo(todo.id, newValue)
        }
        setOnEditeTodo(false)
        inputRef.current.blur()
      }
    }
  }

  return (
    <motion.li
      initial={{opacity: 0, x: "-100%"}}
      animate={{opacity: 1, x: "0%"}}
      
      className="flex">

      <div className={`flex text-white gap-x-2 duration-500 linear 
        ${todo.completed? "scale-95 opacity-50 transition-transform" : "transition"}`}>

      <label htmlFor={todo.id.toString()} className="p-1 mx-4 border rounded-full border-zinc-300">
        <FaCheck className={`text-lg text-green-500 ${todo.completed? 'opacity-100' : 'opacity-0'}`}/>
        <input type="checkbox" name="isdone" className="hidden" 
          id={todo.id.toString()} 
          checked={todo.completed}
          onChange={onMarkDone}/>
      </label>

      <input 
          type="text" name="activite" 
          value={value} 
          className={`bg-transparent outline-none focus:border-b-2 border-zinc-600 text-zinc-300 
          font-bold ${todo.completed? 'line-through' : ''}`}
          readOnly={!onEditeTodo}
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleEditedTodo(e)}
        />

      <div className="flex gap-x-2">
        <Button action={handleEdit}>
          <FaRegPenToSquare/>
        </Button>

        <Button action={onDelete}>
          <IoMdClose />
        </Button>
      </div>

      </div>

    </motion.li>
  )
}

const showTodos = ({todos, handleMarkDone, handleDelete, handleEditedTodo}: any) => {
  if(todos.length === 0) {
    return (
      <div className='flex justify-center w-full h-full align-center'>
        <div className='w-8 h-8 border-l-2 border-white rounded-full animate-spin'></div>
      </div>
    )
  }else{
    return todos.map((todo: iTodo) => (
      <ListItem 
      key={todo.id} 
      todo={todo} 
      onDelete={() => handleDelete(todo.id)}
      onMarkDone={() => handleMarkDone(todo.id)}
      hasEditedTodo={handleEditedTodo}/>
    ))
  }
}

const App = () => {
  const [todos, setTodos] = useState<iTodo[]>([])
  const [newTodo, setNewTodo] = useState<string>('')
  
  useEffect(() => {

    const getTodos = async () => {
      const data = await getTodosAPI().catch(err => alert(err))
      if(data) {
        setTimeout(() => { // Simulando una petición a una API
          setTodos(data)
        }, 2000)
      }
    }

    getTodos()

  }, [])


  const handleMarkDone = (id: number) => {
    const newTodos = [...todos]
    newTodos.map(todo => {
        if(todo.id === id) todo.completed = !todo.completed
    })
    setTodos(newTodos)
  }

  const handleEditedTodo = (id: number, value: string) => {
   const newTodos = [...todos] 
   newTodos.map((todo) => {
     if (todo.id === id) {
       todo.title = value
     }
   })
   setTodos(newTodos)
  }

  const handleDelete = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id))
  }

  const handleAddTodo = () => {
    if (newTodo !== '') {
      setTodos(currentTodos => [...currentTodos, {
        id: currentTodos.length + 1,
        title: newTodo,
        completed: false
      }])
      setNewTodo('')
    }
  }
 
  return (
      <div className="relative flex justify-center w-full h-full bg-zinc-700">

        <div className='flex flex-col h-full overflow-y-auto w-[400px] align-center'>

          <h1 className="my-8 text-3xl text-center text-zinc-400">Lista de Actividades</h1>
          <ul className="w-[80%] m-4 flex flex-col gap-y-3">
            {showTodos({todos,handleMarkDone,handleDelete,handleEditedTodo})}
          </ul>

        <div className="z-20 flex w-full py-4 mt-4 border-t border-zinc-500 px-[10%]">
          <input type="text" name="newTodo" value={newTodo} 
            onChange={(e) => setNewTodo(e.currentTarget.value)}
            className='text-white bg-transparent border-b border-zinc-500 focus:outline-none'/>

          <button className="px-4 py-2 text-white rounded-full bg-zinc-400"
            onClick={handleAddTodo}>
            Adicionar
          </button>
        </div>

        </div>
    </div>
  )
}

export default App
