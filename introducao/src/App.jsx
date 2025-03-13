import { useState } from 'react';


function App() {

  const [message, setMessage] = useState("Testando o React usando uma variável JS dentro do JSX dentro do return");

  return (
    <div>
      <h1>Olá mundo</h1>
      <p>Estou tentando entneder o React, pela milésima vez. #agoravai</p>
      <p>Aqui temos uma função que retorna uma espécie de HTML, mas lembre-se que é JSX e conseguimos usar Javascript aqui dentro</p>
      <h2>
        {message} 
      </h2>
      <button onClick={() => setMessage('Clicou no botão')}>
        Mudar mensagem
      </button>
    </div>
  );
}

export default App;
