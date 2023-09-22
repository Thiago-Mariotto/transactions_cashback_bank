import { useEffect, useState } from 'react';
import ApiInstance from '../utils/apiInstance';
import { decodeToken, hasSession } from '../utils/auth';

export default function Extract() {
  const [extract, setExtract] = useState([]);

  useEffect(() => {
    if (!hasSession()) {
      alert('Você precisa estar logado para acessar essa página');
    }

    const token = localStorage.getItem('token');
    console.log('token', token);
    const { id: userId } = decodeToken(token);
    console.log(`/accounts/${userId}/ transactions`);

    ApiInstance
      .get(`/accounts/${userId}/transactions`, { headers: { Authorization: token } })
      .then((response) => {
        console.log(response.data);
        setExtract(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  const getDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <div className="flex flex-col m-10 mx-20 border">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Data</th>
                  <th scope="col" className="px-6 py-4">Valor</th>
                  <th scope="col" className="px-6 py-4">Cashback</th>
                  <th scope="col" className="px-6 py-4">Total cashback</th>
                  <th scope="col" className="px-6 py-4">Nº transação</th>
                </tr>
              </thead>
              <tbody>
                {
                  extract && extract.length !== 0 ?
                    extract.map(item => (
                      < tr key={item.id} className="border-b dark:border-neutral-500" >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{getDate(item.date)}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">R$ {item.amount}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{item.cashback ? item.cashback : 0.005 * 100} %</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">R$ {(item.cashback ? item.amount * item.cashback : item.amount * 0.005).toFixed(2)}</td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium"># {item.id}</td>
                      </tr>
                    ))
                    :
                    <tr>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">Sem dados</td>
                    </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}