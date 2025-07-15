import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

interface FormLoginProps {
    setLog: (value: boolean) => void;
}

export default function FormLogin({ setLog }: FormLoginProps) {
    const { user, updateUser } = useContext(UserContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log('**********', data)
        if (!response.ok) {
            console.error("Login failed:", data);
            setLog(false);
            setErrorMessage("Login failed. Please try again.");
            return;
        }
        updateUser({ ...data });
        console.log('$$$$$$$$', user)
        setLog(true);
        setErrorMessage("");
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 bg-amber-200 p-4 rounded-lg border-2 border-white">
                <h2 className="text-3xl font-bold text-center border-b-1 border-black pb-2">Login</h2>
                <div className="flex flex-col">
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 p-2 rounded-lg mt-2" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 p-2 rounded-lg mt-2" />
                </div>
                <p className="text-red-500">{errorMessage}</p>
                <button className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white pt-1 pb-1 pr-4 pl-4 rounded-lg mt-4">Login</button>
                <p>
                    Don't have an account? <button className="cursor-pointer text-blue-500 hover:text-blue-700">Register here</button>
                </p>
            </form>
        </>
    )
}