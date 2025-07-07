import type { IUser } from "../../types/interfaces";
import FormLogin from "../form/form-login";


export default function Login({ setLog, setUser, user }: { setLog: (value: boolean) => void, setUser: (user: IUser | null) => void, user: IUser | null }) {

    return (
        <div className='flex flex-col justify-center items-center gap-4 text-2xl h-full'>
            < FormLogin setLog={setLog} setUser={setUser} user={user} />
        </div>
    )
}