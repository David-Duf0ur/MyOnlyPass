import { useState } from "react";
import type { ICredential, IFields, IUser } from "../../types/interfaces";
import avatar1 from "../../assets/avatar/avatar1.jpg";
import avatar2 from "../../assets/avatar/avatar2.jpg";
import avatar3 from "../../assets/avatar/avatar3.jpg";
import avatar4 from "../../assets/avatar/avatar4.jpg";
import avatar5 from "../../assets/avatar/avatar5.jpg";
import avatar6 from "../../assets/avatar/avatar6.jpg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

interface AdminPanelProps {
  setShowModal: (show: boolean) => void;
  dataListFull: ICredential[];
  user: IUser | null;
  selectedAvatar: number;
  setSelectedAvatar: (avatar: number) => void;
}

export default function AdminPanel({ setShowModal, dataListFull, user, selectedAvatar, setSelectedAvatar }: AdminPanelProps) {
  const [csvData, setCsvData] = useState<string>("");

  function convertToCSV(data: ICredential[] | IFields[]): string {
    if (data.length === 0) return "No data available";

    // On récupère tous les champs uniques présents dans les objets (pour gérer les champs optionnels)
    const headers = Array.from(
      data.reduce((acc, obj) => {
        Object.keys(obj).forEach(key => acc.add(key));
        return acc;
      }, new Set<string>())
    );

    const rows = data.map(row =>
      headers.map(field => JSON.stringify((row as any)[field] ?? "")).join(",")
    );
    return [headers.join(","), ...rows].join("\r\n");
  }



  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-600/60">
        <div className="bg-white rounded-lg w-[600px] h-[auto] shadow-lg">
          <div className='flex items-center justify-between p-2 relative bg-gray-200 rounded-t-lg'>
            <h2 className="text-lg font-bold">Admin panel</h2>
            <button onClick={() => setShowModal(false)} className="px-[6px] py-[2px] bg-blue-500 hover:bg-red-400 text-white rounded cursor-pointer">X</button>
          </div>
          <div className="h-full">
            <div className='flex flex-col gap-2 p-4'>
              <div className="flex flex-col gap-2 mb-4">
                <h3 className='text-lg font-semibold'>Select your avatar</h3>
                <div className="flex items-center justify-center mb-4 gap-2">
                  {avatars.map((avatar, index) => (
                    <div key={index} className='flex flex-col items-center'>
                      <img key={index} src={avatar} alt={`Avatar ${index + 1}`} className={`w-12 h-12 rounded-full inline-block transition-all duration-200 ${selectedAvatar === index ? "border-4 border-blue-500" : "border-2 border-transparent"}`} />
                      <input
                        type="radio"
                        name="avatar"
                        className='mt-2'
                        checked={selectedAvatar === index}
                        onChange={() => setSelectedAvatar(index)}
                      />
                    </div>
                  ))}
                </div>
                {/* <div className="flex flex-col items-center justify-between mt-4">
                  <button className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>Save</button>
                </div> */}
                <div className="border-b-2 border-black"></div>
                <h3 className='text-lg font-semibold'>User Information</h3>
                <p className='text-m'>Email: {user?.email || "Not logged in"}</p>
                <p className='text-m'>First Name: {user?.firstname || "N/A"}</p>
                <p className='text-m'>Last Name: {user?.lastname || "N/A"}</p>
                <div className="flex flex-col items-center justify-between mt-4">
                  <button className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>Delete account</button>
                </div>
              </div>
              <div className="border-b-2 border-black"></div>
              <h3 className='text-lg font-semibold'>Data List</h3>
              <ul className='pl-5'>
                {dataListFull.map((item, index) => (
                  <li key={index} className='text-m'>{item._id} - {item.title}</li>
                ))}
              </ul>
              <div className="flex items-center justify-center gap-2 mt-4">
                <button onClick={() => {
                  setCsvData(convertToCSV(dataListFull));
                }} className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
                  Export
                </button>
                <button className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
                  Import
                </button>
              </div>
              {csvData && (
                <>
                  <div className='mt-4'>
                    <h3 className='text-lg font-semibold'>CSV Data</h3>
                    <textarea
                      value={csvData}
                      readOnly
                      className='w-full h-48 p-2 border border-gray-300 rounded'
                    />
                  </div>
                  <div className="w-full flex items-center justify-center p-4 rounded-b-lg">
                    <button onClick={() => setCsvData("")} className='bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded'>
                      Clear
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <p className='text-center bg-gray-200 p-1 rounded-b-lg'>MOP - 2025</p>
        </div>
      </div >
    </>
  )
}