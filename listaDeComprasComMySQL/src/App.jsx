// App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import AddItem from "./components/AddItem";
import ListItems from "./components/listItems";
import "./index.css";
import { useTheme } from "./context/ThemeContext";
import themes from "./themes";

// Importa os componentes de Login e Register
import Login from "./components/Login";
import Register from "./components/Register";
import AddLista from "./components/AddLista"; // Componente para adicionar lista

// Componente para rotas protegidas
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth(); // Pega o estado de autenticação e carregamento

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p>Carregando autenticação...</p>
            </div>
        );
    }

    // Se não estiver autenticado, redireciona para a página de login
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};


// Componente principal que gerencia a lógica da lista (antes era todo o App.jsx)
function MainAppContent() {
    const { user, logout, isAuthenticated } = useAuth(); // Obter usuário e função de logout
    const idUsuario = user ? user.user.idUsuario : null; // Pega o id do usuário logado

    const [listId, setListId] = useState("");
    const [listas, setListas] = useState([]);
    const [triggerUpdate, setTriggerUpdate] = useState(0); 
    const { theme, showBackgroundImage } = useTheme();
    const navigate = useNavigate();

    // Buscar listas do backend
    function fetchListas() {
        if (!idUsuario) { // Não busca listas se não houver usuário logado
            setListas([]);
            return;
        }
        // Faz a requisição para buscar as listas do usuário
        // Adiciona o token de autenticação no header se o usuário estiver logado
        fetch(`http://localhost:3001/listas/${idUsuario}`, {
            headers: {
                'Authorization': user && user.token ? `Bearer ${user.token}` : ''
            }
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    logout(); // Desloga se o token for inválido/expirado
                    navigate('/login');
                    throw new Error('Não autorizado ou token expirado.');
                }
                return res.json();
            })
            .then((data) => setListas(data))
            .catch((err) => console.error("Erro ao buscar listas:", err));
    }

    useEffect(() => { 
        fetchListas();
    }, [idUsuario, triggerUpdate, isAuthenticated]); // Dependências atualizadas: idUsuario e isAuthenticated

    function handlePrint() {
        window.print();
    }

    function handleClearList() {
        if (!listId) {
            alert('Selecione uma lista para limpar.');
            return;
        }
        if (window.confirm("Tem certeza que deseja apagar todos os itens da lista?")) {
            fetch(`http://localhost:3001/items/lista/${listId}`, { 
                method: "DELETE",
                headers: {
                    'Authorization': user && user.token ? `Bearer ${user.token}` : ''
                }
            })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    logout(); 
                    navigate('/login');
                    throw new Error('Não autorizado ou token expirado.');
                }
                return res.json(); // Ou res.text() se não for JSON
            })
            .then(() => setTriggerUpdate((prev) => prev + 1)) 
            .catch((err) => console.error("Erro ao limpar items no backend:", err));
        }
    }

    function handleItemAdded(novoItem) {
        setListId(novoItem.idLista);
        setTriggerUpdate((prev) => prev + 1); 
    }

    return (
        <div
            className={`min-h-screen w-full flex justify-center p-4 md:p-6`}
            style={{
                backgroundImage: showBackgroundImage ? themes[theme].backgroundImage : "none",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: themes[theme].primaryColor,
                color: themes[theme].textColor,
            }}
        >
            <div className="w-full max-w-lg space-y-4">
                <div className="flex justify-between items-center">
                    {/* Botão de Logout */}
                    {isAuthenticated && (
                        <button
                            onClick={logout}
                            className="mr-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                        >
                            Sair
                        </button>
                    )}

                    <select
                        value={listId}
                        onChange={(e) => setListId(e.target.value)}
                        className="flex-1 border border-gray-300 px-4 py-2 rounded-md shadow-md text-xl md:text-2xl text-gray-800"
                    >
                        <option value="">Selecione uma lista</option>
                        {listas.map((lista) => (
                            <option key={lista.idLista} value={lista.idLista}>
                                {lista.nomeDaLista}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => navigate("/settings")}
                        className="ml-2 p-2 text-gray-600 hover:text-gray-800 rounded-xl"
                    >
                        ⚙️
                    </button>
                </div>

                <AddItem onItemAdded={handleItemAdded} 
                    idLista={listId}
                    userToken={user?.token} // Passa o token para AddItem
                />

                <div className="bg-white p-4 rounded-md shadow-md">
                    <ListItems 
                        idLista={listId} 
                        triggerUpdateChange={triggerUpdate} 
                        userToken={user?.token} // Passa o token para ListItems
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <button
                        onClick={handlePrint}
                        className="bg-opacity-80 text-white px-4 py-2 rounded-md w-full md:w-1/2 font-medium bg-blue-500" // Cores de exemplo
                    >
                        Imprimir Lista
                    </button>
                    <button
                        onClick={handleClearList} 
                        className="bg-opacity-80 text-white px-4 py-2 rounded-md w-full md:w-1/2 font-medium bg-orange-500" // Cores de exemplo
                    >
                        Limpar Lista 
                    </button>
                </div>
            </div>
        </div>
    );
}


// O componente App principal que configura as rotas
function App() {
    return (
        <Router>
            <AuthProvider> {/* O AuthProvider deve envolver todas as rotas que precisam de autenticação */}
                <Routes>
                    {/* Rotas Públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* ... (outras rotas públicas, se houver) */}

                    {/* Rotas Protegidas */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <MainAppContent /> {/* Conteúdo principal da aplicação */}
                            </PrivateRoute>
                        }
                    />
                     <Route
                        path="/add-lista" // Exemplo de rota para adicionar nova lista
                        element={
                            <PrivateRoute>
                                <AddLista /> {/* Componente para adicionar nova lista */}
                            </PrivateRoute>
                        }
                    />
                    {/* Exemplo de outras rotas protegidas */}
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                {/* Sua página de configurações aqui. Pode ser um componente para atualizar o perfil! */}
                                <div>Página de Configurações (Protegida)</div>
                            </PrivateRoute>
                        }
                    />

                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;