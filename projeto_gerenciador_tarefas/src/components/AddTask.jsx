import { useState } from "react";
import Input from './Input'; 



function AddTask({onAddTaskSubmit}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      
      <Input 
        type="text" 
        placeholder="Digite o título da tarefa" 
        value={title}
        onChange={(event) => setTitle(event.target.value)} 
        
      />

      <Input 
        type="text" 
        placeholder="Digite a descrição da tarefa" 
        value={description} 
        onChange={(event) => setDescription(event.target.value)}
      />


      <button onClick={() => {
        //Verifica se o título ou a descrição estão vazios
        if (!title.trim() || !description.trim()) {
          alert("Por favor, preencha todos os campos");
          return;
        }
        //Chama a função onAddTaskSubmit passando o título e a descrição
        onAddTaskSubmit (title, description);
        setDescription("");
        setTitle("");
      }}
      className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium">Adicionar</button>

    </div>
  );
}

export default AddTask;