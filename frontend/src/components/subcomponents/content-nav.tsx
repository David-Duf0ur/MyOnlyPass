import { useState } from 'react';
import type { ICredential } from '../../types/interfaces'
import CreateAccount from '../modal/create-account';

interface ContentNavProps {
  dataList: ICredential[];
  setData: (data: ICredential | undefined) => void;
  setDataList: React.Dispatch<React.SetStateAction<ICredential[]>>;
  sortBy: 'nom' | 'category' | 'mail';
  setSortBy: React.Dispatch<React.SetStateAction<'nom' | 'category' | 'mail'>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  refresh: boolean;
  pagTotalItems: number;
  pagTotalPages: number;
}

export default function ContentNav({ dataList, setDataList, setData, sortBy, setSortBy, setRefresh, pagTotalPages }: ContentNavProps) {
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:3000/credentials/${page}/4`)
      const dataFetch = await response.json()
      setDataList(dataFetch.results)
    } catch (error) {
      console.error("Erreur lors de la récupération :", error)
    }
  }

  return (
    <>
      <div className="flex flex-col basis-1/3">
        <div className="flex gap-2 justify-center m-4">
          <select className="w-full" value={sortBy} onChange={(e) => {
            setSortBy(e.target.value as 'nom' | 'category' | 'mail')
            setRefresh((prevRefresh) => !prevRefresh);
          }}>
            <option value="nom">Par nom</option>
            <option value="mail">Par mail</option>
            <option value='category'>Par category</option>
          </select>
          <svg onClick={() => {
            setShowModal(true)
            setData(undefined);
          }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z" /></svg>
        </div>
        <div className="flex flex-col flex-1 basis-1/3 gap-1 m-2 p-2 rounded-lg h-2/3">
          {dataList.map((item) => (
            <button className="flex border-1 items-center cursor-pointer border-white bg-indigo-400 hover:scale-110 transition-transform duration-200 focus:bg-indigo-600 focus:outline-indigo-600 hover:bg-indigo-600 active:bg-indigo-700 m-2 p-2 rounded-lg text-white font-bold"
              key={item._id}
              onClick={() => setData(item)}>
              <div className='w-18 h-18 max-w-[48px] max-h-[48px] overflow-hidden flex items-center justify-center' dangerouslySetInnerHTML={{ __html: item.iconify }} />
              <div className="flex flex-col ml-2 w-full">
                <div className='flex items-center justify-between'>
                  <p className='text-2xl'>{item.title}</p>
                  <p className="text-xs bg-green-500 p-1 rounded-lg">{item.category}</p>
                </div>
                <p className='text-start'>{item.mail}</p>
                <p className='text-start'>{item._id}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          {<div className='flex flex-wrap gap-2 justify-center m-4'>
            {Array.from({ length: pagTotalPages }).map((_, idx) => (
              <button
                onClick={() => fetchData(idx + 1)}
                className='cursor-pointer focus:underline focus:text-3xl active:text-3xl text-1xl' key={idx}>
                {idx + 1}
              </button>
            ))}
          </div>}
        </div>
      </div>
      {showModal && (
        <CreateAccount
          setShowModal={setShowModal}
          setRefresh={setRefresh}
          dataList={dataList}
          setData={setData}
        />
      )}
    </>
  )
}