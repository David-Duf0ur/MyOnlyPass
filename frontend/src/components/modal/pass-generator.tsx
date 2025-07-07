import FormPassGenerator from "../form/form-pass-generator";


interface PassGeneratorProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PassGenerator({ setShowModal }: PassGeneratorProps) {

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50">
        <div className="bg-white rounded-lg min-w-[400px]">
          <div className='flex items-center justify-between mb-6 p-2 relative bg-gray-200 rounded-t-lg'>
            <h2 className="text-lg font-bold">Pass generator</h2>
            <button onClick={() => setShowModal(false)} className="px-[6px] py-[2px] bg-blue-500 hover:bg-red-400 text-white rounded cursor-pointer">X</button>
          </div>
          <FormPassGenerator />
          <p className='text-center bg-gray-200 p-1 rounded-b-lg'>MOP - 2025</p>
        </div>
      </div>
    </>
  )
}