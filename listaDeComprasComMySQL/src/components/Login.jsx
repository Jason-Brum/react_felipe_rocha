import React, { useState, useEffect } from 'react'; // Importe useEffect
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from './Input'; // Seus componentes de Input
import Button from './Button'; // Seus componentes de Button
import { useTheme } from '../context/ThemeContext'; // Importe useTheme para estilização

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // NOVO ESTADO para o checkbox
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();
    const { theme, themes } = useTheme(); // Para estilização

    // NOVO useEffect para carregar o email do localStorage
    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true); // Marca o checkbox se o email foi lembrado
        }
    }, []); // Executa apenas uma vez no mount do componente

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ email, senha: password });

            if (userData) {
                // NOVO: Salvar/Remover email com base no checkbox
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                navigate('/');
            }
        } catch (err) {
            console.error('Erro de login no componente:', err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center"
             style={{ 
                 backgroundColor: themes[theme].primaryColor,
                 color: themes[theme].textColor,
                 backgroundImage: themes[theme].backgroundImage, // Opcional: Adicionar imagem de fundo aqui também se quiser
                 backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
             }}>
            <div className="p-8 rounded-lg shadow-lg w-full max-w-sm"
                 style={{ backgroundColor: themes[theme].primaryColor, color: themes[theme].textColor, borderColor: themes[theme].accentColor, borderWidth: '1px' }}> {/* Adicionado estilos baseados no tema */}
                <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ // Estilização baseada no tema para inputs
                            backgroundColor: themes[theme].selectBackgroundColor,
                            color: themes[theme].selectTextColor,
                            borderColor: themes[theme].accentColor,
                            '--tw-ring-color': themes[theme].accentColor // Define a cor do anel de foco
                        }}
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ // Estilização baseada no tema para inputs
                            backgroundColor: themes[theme].selectBackgroundColor,
                            color: themes[theme].selectTextColor,
                            borderColor: themes[theme].accentColor,
                            '--tw-ring-color': themes[theme].accentColor
                        }}
                    />

                    {/* NOVO: Checkbox Lembrar-me */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm">
                            Lembrar meu email
                        </label>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-md hover:brightness-110 transition duration-200"
                        style={{ // Estilização baseada no tema para botões
                            backgroundColor: themes[theme].accentColor,
                            color: themes[theme].textColor,
                        }}
                    >
                        {loading ? 'Carregando...' : 'Entrar'}
                    </Button>
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                </form>
                <p className="mt-6 text-center">
                    Não tem uma conta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline"
                          style={{ color: themes[theme].accentColor }}> {/* Cor de destaque para o link */}
                        Cadastre-se
                    </Link>
                </p>
                {/* NOVO: Botão ou link "Esqueci a senha?" - POR ENQUANTO APENAS VISUAL */}
                <p className="mt-2 text-center">
                    <Link to="/forgot-password" className="text-gray-500 hover:underline"
                          style={{ color: themes[theme].textColor }}> {/* Cor do texto do tema para o link */}
                        Esqueci minha senha?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;