import logo from '../../assets/logo.svg';
import bg2 from '../../assets/bg-2.jpg';
import { useState } from 'react';
import PassGenerator from '../modal/pass-generator';


interface ILeftSectionProps {
  itemFilter: string;
  setItemFilter: (filter: string) => void;
}

export default function LeftSection({ itemFilter, setItemFilter }: ILeftSectionProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={{ backgroundImage: `url(${bg2})` }}
        className=' bg-amber-200 p-2 border-r-1 border-black-300 flex flex-col bg-cover bg-center bg-no-repeat h-auto basis-1/4'>
        <div className='flex justify-between border-b-1 border-black-300 p-2'>
          <a href="http://localhost:5173" rel="noopener noreferrer">
            <img src={logo} alt="logo" />
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m14 17l-5-5l5-5z" /></svg>
        </div>
        <ol className='mt-[100px]'>
          <li className='text-3xl'>Navigation</li>
          <ol className='mb-4'>
            <li onClick={() => setItemFilter("all")}
              className={
                'flex content-center items-center gap-2 ml-4 mt-4 cursor-pointer' +
                (itemFilter === "all" ? ' underline' : '')
              }>
              <svg className='hover:w-[30px] hover:h-[30px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-5h2v3h3v2zm13 0v-2h3v-3h2v5zm-4-2q-2.9 0-4.95-2.05T5 12t2.05-4.95T12 5t4.95 2.05T19 12t-2.05 4.95T12 19M3 8V3h5v2H5v3zm16 0V5h-3V3h5v5z" /></svg>
              <p className='text-2xl'>All items</p>
            </li>
            <li onClick={() => setItemFilter("favorites")}
              className={
                'flex content-center items-center gap-2 ml-4 mt-4 cursor-pointer' +
                (itemFilter === "favorites" ? ' underline' : '')
              }>
              <svg className='hover:w-[30px] hover:h-[30px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 9.67a1 1 0 0 0-.86-.67l-5.69-.83L12.9 3a1 1 0 0 0-1.8 0L8.55 8.16L2.86 9a1 1 0 0 0-.81.68a1 1 0 0 0 .25 1l4.13 4l-1 5.68a1 1 0 0 0 1.47 1.08l5.1-2.67l5.1 2.67a.93.93 0 0 0 .46.12a1 1 0 0 0 .59-.19a1 1 0 0 0 .4-1l-1-5.68l4.13-4A1 1 0 0 0 22 9.67m-6.15 4a1 1 0 0 0-.29.88l.72 4.2l-3.76-2a1.06 1.06 0 0 0-.94 0l-3.76 2l.72-4.2a1 1 0 0 0-.29-.88l-3-3l4.21-.61a1 1 0 0 0 .76-.55L12 5.7l1.88 3.82a1 1 0 0 0 .76.55l4.21.61Z" /></svg>
              <p className='text-2xl'>Favorites</p>
            </li>
            <li onClick={() => setItemFilter("category")} className='flex content-center items-center gap-2 ml-4 mt-4 cursor-pointer hover:underline'>
              <svg className='hover:w-[30px] hover:h-[30px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m4.5 1.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m6 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0" /></svg>
              <p className='text-2xl'>Category</p>
            </li>
          </ol>
          <li className='text-3xl mt-12'>Tools</li>
          <ol>
            <li onClick={() => setShowModal(true)} className='flex content-center items-center gap-1 ml-4 mt-2 cursor-pointer hover:underline'>
              <svg className='hover:w-[30px] hover:h-[30px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z" /></svg>
              <p className='text-2xl'>Pass generator</p>
            </li>
          </ol>
        </ol>
      </div >
      {showModal && (
        <PassGenerator setShowModal={setShowModal} />
      )
      }
    </>
  )
}