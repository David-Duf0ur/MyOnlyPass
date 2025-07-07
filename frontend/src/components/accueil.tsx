import Login from "./subcomponents/login";
import bg1 from '../assets/bg-1.jpg';
import Register from "./subcomponents/register";
import type { IUser } from "../types/interfaces";

export default function Accueil({ setLog, setUser, user }: { setLog: (value: boolean) => void, setUser: (user: IUser | null) => void, user: IUser | null }) {

    return (
        <>
            <div style={{ backgroundImage: `url(${bg1})` }} className='flex flex-col h-full'>
                <h1 id='mainTitle' className='text-9xl m-6 text-center pb-4'>My Only PASS</h1>
                <div className='flex gap-4 text-2xl items-center justify-center'>
                    <Login setLog={setLog} setUser={setUser} user={user} />
                    <Register setLog={setLog} />
                </div>
            </div>
        </>
    )
}