import React, { useContext, useState } from "react";
import type { ICredential } from "../../types/interfaces";
import { UserContext } from "../../context/UserContext";


interface AddFieldProps {
  fields: { name: string; value: string }[];
  setFields: React.Dispatch<React.SetStateAction<{ name: string; value: string }[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: ICredential | undefined;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddField({ setShowModal, data, setRefresh }: AddFieldProps) {
  const { user } = useContext(UserContext);
  const [fieldName, setFieldName] = useState<string>('');
  const [fieldValue, setFieldValue] = useState<string>('');

  const handleClick = async (e: React.FormEvent, idCredential: string, idUser: number) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/credential/fields/${idCredential}/${idUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fieldName,
        value: fieldValue
      }),
    });
    setRefresh((prevRefresh) => !prevRefresh);
    setShowModal(false);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50">
        <div className="bg-white rounded-lg min-w-[400px]">
          <div className='flex items-center justify-between mb-6 p-2 relative bg-gray-200 rounded-t-lg'>
            <h2 className="text-lg font-bold">Add new field</h2>
            <button onClick={() => setShowModal(false)} className="px-[6px] py-[2px] bg-blue-500 hover:bg-red-400 text-white rounded cursor-pointer">X</button>
          </div>
          <div>
            <div className='flex flex-col gap-2 p-4'>
              <form className='flex flex-col items-center w-full max-w-xl mx-auto bg-white p-6'>
                <div className='flex flex-col mb-4'>
                  <label htmlFor="name_field" className="">Field name</label>
                  <input value={fieldName} onChange={e => setFieldName(e.target.value)} id="name_field" className="bg-amber-200 p-2 rounded-lg w-64" type="text" name="input-name" title="Account name" placeholder="Account name"></input>
                </div>
                <div className='flex flex-col mb-4'>
                  <label htmlFor="value_field" className="">Field value</label>
                  <input value={fieldValue} onChange={e => setFieldValue(e.target.value)} id="value_field" className="bg-amber-200 p-2 rounded-lg w-64" type="text" name="input-value" title="Account value" placeholder="fbx123456"></input>
                </div>
                <div className='flex flex-col mb-4'>
                  <button onClick={(e) => {
                    handleClick(e, data?._id || '', user?.id_user || 0);
                  }} className='bg-blue-400 hover:bg-blue-500 text-white pt-1 pb-1 pr-4 pl-4 rounded-lg'>Add</button>
                </div>
              </form>
            </div>
          </div>
          <p className='text-center bg-gray-200 p-1 rounded-b-lg'>MOP - 2025</p>
        </div>
      </div>
    </>
  )
}