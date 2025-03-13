import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import '../dist/output.css';
import {v4} from 'uuid';

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async() => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        method: 'GET'
      });

    const data = await response.json();
    

    //Armazenar/Persisrtir esses dados no state do componente
    setTasks (data);
    };
    //Se quiser, você pode chamar uma API para buscar as tarefas
    //fetchTasks();
    
  }, []);

  function onTaskclick(taskId) {
    const newTasks = tasks.map((task) => {
      //preciso atualizar esta tarefa
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted};
      }
      //senão não preciso atualizar essa tarefa, mesma coisa se eu colocasse um else
      return task;
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);

  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false
    };

    setTasks([...tasks, newTask]);
  }    

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-slate-100 text-3xl font-bold text-center">Gerenciador de tarefas</h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks 
          tasks={tasks} 
          onTaskClick={onTaskclick} 
          onDeleteTaskClick = {onDeleteTaskClick}
          />
      </div>
    </div>
  );
}

export default App;
