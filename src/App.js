import React, {useState, useEffect} from 'react';
import List from "./components/List";
import Alert from "./components/Alert";
import { BsListStars } from "react-icons/bs";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if(list) {
    return (list = JSON.parse(localStorage.getItem("list")))
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIdEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: "", type: ""});
  const [done, setDone] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [sortDoneFirst, setSortDoneFirst] = useState(true);

  useEffect(() =>{
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      showAlert(true, "danger", "Please enter a task name");
    } else if(name && isEditing) {
      setList(
        list.map((item) => {
          if(item.id === editID) {
            return {...item, title: name}
          }
          return item
        })
      );
      setName("");
      setEditID(null);
      setIdEditing(false);
      showAlert(true, "success", "Task name changed");
    } else {
      showAlert(true, "success", "Task added to the list");
      const newItem = {id: new Date().getTime().toString(), title: name, done: done};
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg});
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Task removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIdEditing(true);
    setEditID(id);
    setName(editItem.title);
  };
  const clearList = () => {
    showAlert(true, "danger", "Empty tasks list");
    setList([]);
  };
  const doneItem = (id) => {
    console.log(list);
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done }
      }
      return item;
    });
  
    setList(newList);
    showAlert(true, "success", "Task status changed");
    console.log(list);
  };
  const sortItems = () => {
    const sortedList = [...list].sort((a, b) => {
        if (sortAsc) {
            return parseInt(a.id) - parseInt(b.id);
        } else {
            return parseInt(b.id) - parseInt(a.id);
        }
    });
    setList(sortedList);
    setSortAsc(!sortAsc);
};
const sortItemsByDoneStatus = () => {
  const sortedList = [...list].sort((a, b) => {
      if (sortDoneFirst) {
          return (a.done === b.done) ? 0 : a.done ? -1 : 1;
      } else {
          return (a.done === b.done) ? 0 : a.done ? 1 : -1;
      }
  });
  setList(sortedList);
  setSortDoneFirst(!sortDoneFirst);
};

return (
  <section className="section-center">
  <div class="card text-center">
  <div class="card-header">
    <h1> <BsListStars />  Task Manager</h1>
  </div>
  <div class="card-body">
  {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
    <h5 class="card-title">
    <form onSubmit={handleSubmit}>
    <div className="input-group mb-3">
    <input 
        type="text" 
        className="form-control" 
        placeholder="Your Task" 
        onChange={(e) => setName(e.target.value)}
        value={name}
        style={{ marginRight: '10px' }}
    />
    <div className="input-group-append">
        <button type="submit" className="btn btn-success ml-2">
            {isEditing ? "Edit" : "Submit"}
        </button>
    </div>
</div>
  </form>
    </h5>
    {list.length > 0 && (
      <div style={{marginTop: "2rem"}}>
        <List items={list} removeItem={removeItem} editItem={editItem} doneItem={doneItem} sortItems={sortItems}/>
        <div classname="text-center">
          <br></br> 
          <button className="btn btn-danger" onClick={clearList} style={{ marginRight: '10px', marginBottom: '10px' }}>
            Clear Items
            </button>
            <button className="btn btn-primary" onClick={sortItems} style={{ marginRight: '10px', marginBottom: '10px' }}>
                Sort by Date {sortAsc ? "Desc" : "Asc"}
            </button>
            <button className="btn btn-primary" onClick={sortItemsByDoneStatus} style={{ marginBottom: '10px' }}>
                Sort by Status
            </button>
        </div>
      </div>
    )}
  </div>
  <div class="card-footer text-muted">
    autor: Jakub Mazur 64109
  </div>
</div>
</section>
        
)

}

export default App;
