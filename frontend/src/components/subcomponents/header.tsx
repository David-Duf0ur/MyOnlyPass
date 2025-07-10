import { useState } from 'react';
import AdminPanel from '../modal/admin-panel';
import type { ICredential, IUser } from '../../types/interfaces';
import avatar1 from "../../assets/avatar/avatar1.jpg";
import avatar2 from "../../assets/avatar/avatar2.jpg";
import avatar3 from "../../assets/avatar/avatar3.jpg";
import avatar4 from "../../assets/avatar/avatar4.jpg";
import avatar5 from "../../assets/avatar/avatar5.jpg";
import avatar6 from "../../assets/avatar/avatar6.jpg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

interface HeaderProps {
  dataListFull: ICredential[];
  setData: (data: ICredential | undefined) => void;
  setLog: (log: boolean) => void;
  user: IUser | null;
  selectedAvatar: number;
  setSelectedAvatar: (avatar: number) => void;
}

export default function Header({ setLog, dataListFull, setData, user, selectedAvatar, setSelectedAvatar }: HeaderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 id='mainTitle' className='text-7xl  m-6'>My Only PASS</h1>
        <div className="flex flex-row gap-2 mr-2 items-center">
          <img onClick={() => {
            setShowModal(true)
            setData(undefined);
          }} src={avatars[selectedAvatar]} className='w-10 h-10 rounded-full object-cover border-2 border-white cursor-pointer hover:border-amber-300 hover:scale-110 transition-transform duration-200' />
          <button className='bg-amber-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-amber-300'>
            <svg onClick={() => setLog(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m22 12l-4-4v3h-8v2h8v3m2 2a10 10 0 1 1 0-12h-2.73a8 8 0 1 0 0 12Z" /></svg>
          </button>
        </div>
      </div>
      {showModal && (
        <AdminPanel setShowModal={setShowModal} dataListFull={dataListFull} user={user} selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} />
      )}
    </>
  )
}