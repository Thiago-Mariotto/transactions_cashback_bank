import { LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { decodeToken } from '../utils/auth/index';
export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const logout = () => {
    localStorage.removeItem('token');
    if (window.location.pathname === '/') {
      navigate('/', { replace: true, });
      navigate(0)
    }
    navigate('/', { replace: true, });
  }

  const register = () => {
    navigate('/register', { replace: true });
  }

  const login = () => {
    navigate('/login', { replace: true });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(decodeToken(token));
    }
  }, []);

  return (
    <div className="bg-gray-200 h-20 p-4 flex flex-1 items-center flex-row text-slate-600">
      <div className="w-1/3 h-max px-4 flex">
        <img src={logo} width={120} alt="logo" />
      </div>

      <div className="w-1/3 flex justify-around" >
        <Link to="/" className="hover:text-gray-400">Início</Link>
        <Link to="/extract" className="hover:text-gray-400">Extrato</Link>
        <Link to="#" className="hover:text-gray-400">Lorem</Link>
        <Link to="#" className="hover:text-gray-400">Lorem</Link>
      </div>

      <div className="w-1/3 px-4 mr-10 flex justify-end">
        {
          user.name ?
            <ul className='flex flex-col'>
              <div className='flex m-1'>
                <li className='font-thin flex flex-row'><User className='mr-1' />Olá {user.name.toUpperCase()}</li>
              </div>
              <div className='m-1'>
                <li className='cursor-pointer flex flex-row' onClick={logout}><LogOut className='mr-1' /> Sair?</li>
              </div>
            </ul> :
            <ul>
              <li className='cursor-pointer' onClick={login} >Entrar</li>
              <li className='cursor-pointer' onClick={register}>Cadastrar</li>
            </ul>
        }
      </div>
    </div>
  )
}