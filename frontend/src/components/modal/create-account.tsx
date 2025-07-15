import type { ICredential } from "../../types/interfaces";
import FormCreateAccount from "../form/form-create-account";

interface CreateAccountProps {
  setShowModal: (show: boolean) => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  dataList: ICredential[];
  setData: (data: ICredential | undefined) => void;
}

export default function CreateAccount({ setShowModal, setRefresh, dataList, setData }: CreateAccountProps) {

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50">
        <div className="bg-white rounded-lg min-w-[400px]">
          <div className='flex items-center justify-between mb-6 p-2 relative bg-gray-200 rounded-t-lg'>
            <h2 className="text-lg font-bold">Create new account</h2>
            <button onClick={() => setShowModal(false)} className="px-[6px] py-[2px] bg-blue-500 hover:bg-red-400 text-white rounded cursor-pointer">X</button>
          </div>
          <div className='mt-6 mb-6'>
            <FormCreateAccount setShowModal={setShowModal} setRefresh={setRefresh} dataList={dataList} setData={setData} />
          </div>
          <p className='text-center bg-gray-200 p-1 rounded-b-lg'>MOP - 2025</p>
        </div>
      </div>
    </>
  )
}