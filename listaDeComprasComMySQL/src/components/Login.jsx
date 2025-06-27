// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importe Link para o botão de registro
import { useAuth } from '../context/AuthContext';
import Input from './Input'; 
import Button from './Button'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth(); // Obtém funções e estados do AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Chama a função de login do contexto
            const userData = await login({ email, senha: password }); // O backend espera 'senha'

            if (userData) { // Se o login foi bem-sucedido (retornou dados)
                navigate('/'); // Redireciona para a página inicial
            }
        } catch (err) {
            console.error('Erro de login no componente:', err.message);
            // Opcional: exibir uma mensagem de erro específica para o usuário
            // alert(err.message); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Entrar</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        {loading ? 'Carregando...' : 'Entrar'}
                    </Button>
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Não tem uma conta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;