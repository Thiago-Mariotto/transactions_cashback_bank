import { AxiosError } from 'axios';
import { KeyIcon, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading';
import loginImage from '../assets/login-image.svg';
import ApiInstance from '../utils/apiInstance';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const response = await ApiInstance.post('/login', {
        email,
        password
      });

      if (response.data.token) {
        setAlertMessage('Login realizado com sucesso!');
        localStorage.setItem('token', response.data.token);
        navigate('/', { replace: true })
      }

    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message)
      }
    }
  }

  return (
    <main className="flex items-center h-screen bg-gray-800 flex-wrap justify-evenly">
      <div className="hidden lg:flex">
        <img src={loginImage} alt="crie sua conta" />
      </div>

      <div className=" bg-gray-700 rounded-3xl flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"> {/* toda a tela */}
        <div className="mx-auto max-w-sm lg:w-96">
          <form onSubmit={(e) => handleLogin(e)}>

            <div className="mb-4 text-center text-white">
              <p className="text-2xl">Quem é você?</p>
            </div>

            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Mail strokeWidth='1' color="black" className="w-4 h-4" />
              </div>

              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <KeyIcon strokeWidth='1' color="black" className="w-4 h-4" />
              </div>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="mb-4">
              {isLoading ?
                <div className="flex justify-center w-full py-4 px-8 leading-none text-white">
                  <UseAnimations
                    animation={loading}
                    size={48}
                    strokeColor="#fff"
                    className="inline-block w-full" />
                </div>
                :
                <button
                  className="inline-block w-full py-4 px-8 leading-none text-white bg-cyan-500 hover:bg-cyan-600 rounded shadow"
                >
                  Entrar
                </button>}
            </div>

            <div className="mb-4 flex flex-wrap flex-col lg:flex-row justify-around">
              <a href="/forgot-password" className="text-sm text-cyan-300 hover:text-cyan-400">Esqueceu sua senha?</a>
              <a href="/register" className="text-sm text-cyan-300 hover:text-cyan-400">Não tem uma conta? Crie uma!</a>
            </div>

            <div className="flex justify-center w-full leading-none text-yellow-300">
              <p>{alertMessage}</p>
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}