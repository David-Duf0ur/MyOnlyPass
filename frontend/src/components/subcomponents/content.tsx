import { useEffect, useState } from 'react';
import type { ICredential, IFields, IUser } from '../../types/interfaces'
import AddField from '../modal/add-field';
import FormAccount from '../form/form-account';

interface ContentProps {
  data: ICredential | undefined;
  setData: (data: ICredential | undefined) => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  refresh: boolean;
  user: IUser | null;
}

export default function Content({ data, setData, setRefresh, refresh, user }: ContentProps) {
  const [showModal, setShowModal] = useState(false);
  const [fields, setFields] = useState<IFields[]>([]);

  const deleteCredential = async (idCredential: string, idUser: number) => {
    await fetch(`http://localhost:3000/credential/delete/${idCredential}/${idUser}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const toggleFavorite = async (idCredential: string, favorite: boolean, userId: number) => {
    await fetch(`http://localhost:3000/credential/favorite/${idCredential}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorite: favorite }),
    });
    setData(data && { ...data, favorite: !data.favorite });
    setRefresh((prevRefresh) => !prevRefresh);
  }

  const fetchFieldsConfig = async (idCredential: string, idUser: number) => {
    try {
      const response = await fetch(`http://localhost:3000/fields/${idUser}/${idCredential}`);
      const fieldsData = await response.json();
      setFields(fieldsData[0].fieldConfig);
    } catch (error) {
      console.error("Erreur lors de la récupération des champs :", error);
    }
  }

  useEffect(() => {
    setFields([]);
    fetchFieldsConfig(data?._id || '', user?.id_user || 0);
  }, [data, refresh]);

  return (
    <>
      {data ? (
        <div className='basis-2/3 flex flex-col justify-between m-4 bg-gray-100 items-center rounded-lg border-2 border-amber-300 shadow-lg'>
          <div className="mt-2 pl-4 pr-4 flex justify-between w-full">
            <svg onClick={() => {
              deleteCredential(data._id, data.userId || 0);
              setRefresh((prevRefresh) => !prevRefresh);
              setData(undefined);
            }} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" /></svg>
            <p className='bg-green-500 pt-1 pb-1 pr-2 pl-2 rounded-xl'>{data?.category}</p>
            {data.favorite ? (
              <>
                <svg onClick={() => {
                  toggleFavorite(data._id, false, data.userId || 0);
                }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
              </>
            ) : (
              <>
                <svg onClick={() => {
                  toggleFavorite(data._id, true, data.userId || 0);
                }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.919 10.127a1 1 0 0 0-.845-1.136l-5.651-.826l-2.526-5.147a1.037 1.037 0 0 0-1.795.001L8.577 8.165l-5.651.826a1 1 0 0 0-.556 1.704l4.093 4.013l-.966 5.664a1.002 1.002 0 0 0 1.453 1.052l5.05-2.67l5.049 2.669a1 1 0 0 0 1.454-1.05l-.966-5.665l4.094-4.014a1 1 0 0 0 .288-.567m-5.269 4.05a.5.5 0 0 0-.143.441l1.01 5.921l-5.284-2.793a.5.5 0 0 0-.466 0L6.483 20.54l1.01-5.922a.5.5 0 0 0-.143-.441L3.07 9.98l5.912-.864a.5.5 0 0 0 .377-.275L12 3.46l2.64 5.382a.5.5 0 0 0 .378.275l5.913.863z" /></svg>
              </>
            )}
          </div>
          <div className='mt-6 mb-6'>
            < FormAccount user={user} setRefresh={setRefresh} setFields={setFields} data={data} fields={fields} />
          </div>
          <div onClick={() => setShowModal(true)} className='flex items-center gap-2 mb-4 cursor-pointer hover:underline'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z" /></svg>
            <p>New field</p>
          </div>
        </div>
      ) : (
        <div className='flex-1 flex items-center justify-center'>
          <p className='text-gray-500'>Select an item to view details</p>
        </div>
      )}
      {showModal && (
        <AddField user={user} data={data} fields={fields} setFields={setFields} setShowModal={setShowModal} setRefresh={setRefresh} />
      )}
    </>
  )
}