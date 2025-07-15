import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

interface FormRegisterProps {
    setLog: (value: boolean) => void;
}

export default function FormRegister({ setLog }: FormRegisterProps) {
    const { updateUser } = useContext(UserContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setLog(false);
            return;
        }
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, firstname, lastname }),
        });
        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data.error || "Registration failed");
            setLog(false);
            return;
        }
        updateUser({ ...data });
        setLog(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-amber-200 p-4 rounded-lg border-2 border-white">
                <h2 className="text-3xl font-bold text-center border-b-1 border-black pb-2">Register</h2>
                <div className="flex flex-col">
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 p-2 rounded-lg mt-2" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 p-2 rounded-lg mt-2" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Confirm password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-gray-200 p-2 rounded-lg mt-2" />
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="">Firstname</label>
                        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="bg-gray-200 p-2 rounded-lg mt-2" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Lastname</label>
                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="bg-gray-200 p-2 rounded-lg mt-2" />
                    </div>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white pt-1 pb-1 pr-4 pl-4 rounded-lg mt-4">Register</button>
                <p>
                    You already have an account? <button className="cursor-pointer text-blue-500 hover:text-blue-700">Login here</button>
                </p>
            </form>
        </>
    )
}