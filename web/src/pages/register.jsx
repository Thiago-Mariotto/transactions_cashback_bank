import { AxiosError } from 'axios';
import { ClipboardSignature, KeyRound, Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading';
import registerImage from '../assets/register-image.svg';
import ApiInstance from '../utils/apiInstance';

export default function Register() {
  const [accountType, setAccountType] = useState(1);
  const [document, setDocument] = useState('404.725.440-12');
  const [username, setUsername] = useState('thiago');
  const [email, setEmail] = useState('th@mail.com.br');
  const [password, setPassword] = useState('123456');
  const [checkPassword, setCheckPassword] = useState('123456');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setAccountType(1);
    setDocument('');
    setUsername('');
    setEmail('');
    setPassword('');
    setCheckPassword('');
  }

  const resetAlertMessage = () => {
    setAlertMessage('');
  }

  const verifyFields = (object) => {

    for (const key in object) {
      if (object[key] === '') {
        setAlertMessage('Preencha todos os campos');
        return false;
      }
    }

    resetAlertMessage();
    return true;
  }

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      const newAccount = {
        documentNumber: document,
        name: username,
        email,
        password,
        accountType
      }

      if (!verifyFields(newAccount)) return;

      setIsLoading(true);

      const response = await ApiInstance.post('/accounts', newAccount);

      if (response.status === 201) {
        alert('Conta criada com sucesso!');
        setIsLoading(false);
        return;
      }

      resetForm();
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertMessage(err.response?.data.message)
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (password !== checkPassword) {
      setAlertMessage('As senhas não conferem');
      return;
    }

    setAlertMessage('');
  }, [checkPassword, password]);

  return (
    <main className="flex items-center justify-center h-screen bg-gray-800">
      <div className="m-10 ">
        <img src={registerImage} alt="crie sua conta" width={750} height={750} />
      </div>

      <div className="m-10 bg-gray-700 rounded-3xl flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"> {/* toda a tela */}
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <form onSubmit={(e) => handleRegister(e)}>
              <div className="mb-4 text-center text-white">
                <p className="text-2xl">Criar nova conta</p>
              </div>

              <div className="mb-4">
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-cpf"
                        value="1"
                        type="radio"
                        defaultChecked={true}
                        name="account-type"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onClick={() => setAccountType(1)} />
                      <label htmlFor="horizontal-list-radio-cpf" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Conta física</label>
                    </div>
                  </li>

                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-cnpj"
                        value=""
                        type="radio"
                        name="account-type"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onClick={() => setAccountType(2)} />
                      <label htmlFor="horizontal-list-radio-cnpj" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Conta jurídica</label>
                    </div>

                  </li>
                </ul>
              </div>

              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <ClipboardSignature strokeWidth='1' color="black" className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Número do documento"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)} />
              </div>

              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <User strokeWidth='1' color="black" className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Seu nome"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Mail strokeWidth='1' color="black" className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <KeyRound strokeWidth='1' color="black" className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <KeyRound strokeWidth='1' color="black" className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Confirme a senha"
                  value={checkPassword}
                  onChange={(e) => setCheckPassword(e.target.value)} />
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
                    Cadastrar
                  </button>}
              </div>

              <div className="flex justify-center w-full leading-none text-yellow-300">
                <p>{alertMessage}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
