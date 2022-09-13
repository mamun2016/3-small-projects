import React, { useState, useEffect } from 'react'
import "./todo.scss";


// Local storage get
const getLocalStorage = () => {
  let list = localStorage.getItem('todoList');
  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}

const Todo = () => {
  const [text, setText] = useState('');
  const [todo, setTodo] = useState(getLocalStorage());
  const [editId, setEditId] = useState('');
  const [editIcon, setEditIcon] = useState(false);

  const addItems = (e) => {
    e.preventDefault();
    
    if(!text) {
      alert("Please enter todo")
    } else if (text && editIcon) 
    {
      setTodo(
        todo.map(item => {
          if (item.id === editId) {
            return {...item, name: text};
          }
          return item;
        })
      )
      setText('');
      setEditIcon(false);
      setEditId('');
    } else {
      setTodo([...todo, {
        name: text,
        id: new Date().getTime().toString(),
      }]);
      setText('');
    }
  }

  const changeText = (e) => {
    setText(e.target.value);
  }

  const clearAll = () => {
    setTodo([])
  }

  const deleteItem = (id) => {
    const newTodos = todo.filter(item => item.id !== id);
    setTodo(newTodos);
  }

  const editItem = (id) => {
    const selItem = todo.find(item => {
      return (
        item.id === id
      )
    })
    setEditIcon(true);
    setText(selItem.name);
    setEditId(id);
  }

  // Local storage

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todo))
  }, [todo])

  return (
    <div className="todo">
      <h2 className="todo-title">Todo Project</h2>

      <div className="todo-list-holder">
        <form onSubmit={addItems}>
          <div className="todo-entry">
            <input type="text" className="input-field" onChange={changeText} value={text} placeholder="Enter todo's" />

            <button className="btn">
              {editIcon ? <img src="./images/icon_edit.svg" alt="icon" /> : <img src="./images/icon_add.svg" alt="icon" /> }
            </button>
          </div>
        </form>

        <div className="todo-list">
          <h3 className="todo-list-title">
            {todo.length > 0 ? <>My todo list <small>({todo.length})</small></> : "No todo items"}
          </h3>

          <ul>
            {todo.map(item => {
              const {name, id} = item;
              return (
                <li key={id}>
                  <span>{name}</span>
                  <span>
                    <button className="btn" onClick={() => editItem(id)}>
                      <img src="./images/icon_edit.svg" alt="icon" />
                    </button>

                    <button className="btn" onClick={() => deleteItem(id)}>
                      <img src="./images/icon_close.svg" alt="icon" />
                    </button>
                  </span>
                </li>
              )
            })}
          </ul>

          <div className="button-holder">
            {todo.length > 0 && <button className="button button-clear-all" onClick={clearAll}>
              <img src="./images/icon_trash.svg" alt="icon" /> &nbsp;
              Clear list
            </button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
