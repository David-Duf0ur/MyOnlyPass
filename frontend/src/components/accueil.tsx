import Login from "./subcomponents/login";
import bg1 from '../assets/bg-1.jpg';
import Register from "./subcomponents/register";

export default function Accueil({ setLog }: { setLog: (value: boolean) => void }) {

    return (
        <>
            <div style={{ backgroundImage: `url(${bg1})` }} className='flex flex-col h-full'>
                <h1 id='mainTitle' className='text-9xl m-6 text-center pb-4'>My Only PASS</h1>
                <div className='flex gap-4 text-2xl items-center justify-center'>
                    <Login setLog={setLog} />
                    <Register setLog={setLog} />
                </div>
            </div>
        </>
    )
}