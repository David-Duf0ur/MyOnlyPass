import { useState } from "react";

interface FormPassGeneratorProps { }

interface IFormData {
    includeNumbers: boolean;
    includeSymbols: boolean;
    includeUppercase: boolean;
    includeLowercase: boolean;
    length: number;
}

export default function FormPassGenerator({ }: FormPassGeneratorProps) {
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [strength, setStrength] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const includeNumbers = formData.get('includeNumbers') === 'on';
        const includeSymbols = formData.get('includeSymbols') === 'on';
        const includeUppercase = formData.get('includeUppercase') === 'on';
        const includeLowercase = formData.get('includeLowercase') === 'on';
        const length = parseInt(formData.get('length') as string, 10);
        generatePassword({ includeNumbers, includeSymbols, includeUppercase, includeLowercase, length });
    };

    const generatePassword = (data: IFormData) => {
        setPassword('');
        setStrength(0);
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        let characters = '';
        let force = 0;
        if (data.includeNumbers) {
            characters += numbers;
            force++;
        }
        if (data.includeSymbols) {
            characters += symbols;
            force++;
        }
        if (data.includeUppercase) {
            characters += uppercase;
            force++;
        }
        if (data.includeLowercase) {
            characters += lowercase;
            force++;
        }
        if (data.includeNumbers && data.includeSymbols && data.includeUppercase && data.includeLowercase) {
            force += 1;
        }
        if (characters.length === 0) {
            setError('At least one character type must be selected');
            return;
        }
        if (data.length > 9 && data.length <= 10) {
            force++;
        }
        if (data.length > 10) {
            force += 2
        }

        setError(null);

        let pass = '';
        for (let i = 0; i < data.length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            pass += characters[randomIndex];
        }
        setPassword(pass);
        setStrength(force)
    }

    return (
        <>
            <form onSubmit={handleSubmit}
                className='flex flex-col items-center w-full max-w-xl mx-auto bg-white mb-6 gap-2'>
                <p className="text-gray-500 self-start ml-4">*One required</p>
                <div className="flex gap-4 w-1/2">
                    <input type="checkbox" name="includeNumbers" id="includeNumbers" />
                    <label htmlFor="includeNumbers">Include numbers</label>
                </div>
                <div className="flex gap-4 w-1/2">
                    <input type="checkbox" name="includeSymbols" id="includeSymbols" />
                    <label htmlFor="includeSymbols">Include symbols</label>
                </div>
                <div className="flex gap-4 w-1/2">
                    <input type="checkbox" name="includeUppercase" id="includeUppercase" />
                    <label htmlFor="includeUppercase">Include uppercase</label>
                </div>
                <div className="flex gap-4 w-1/2">
                    <input type="checkbox" name="includeLowercase" id="includeLowercase" />
                    <label htmlFor="includeLowercase">Include lowercase</label>
                </div>
                <div className="flex gap-4 ">
                    <label htmlFor="length">Password length:</label>
                    <input type="number" name="length" id="length" min="8" max="64" defaultValue="8" className="border rounded p-1 w-20" />
                </div>
                <button className="mt-4 bg-blue-400 hover:bg-blue-500 text-white p-2 rounded cursor-pointer">Generate</button>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center gap-2 mt-4">
                    <input type="text" id="generatedPassword" value={password} name="generatedPassword" readOnly className="border rounded p-1 w-full" />
                    <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593s1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.6 3.6 0 0 0 15.24 2" /><path fill="currentColor" d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847S21 8.671 21 11.397v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936z" /></svg>
                </div>
                {strength > 0 && (
                    <div className="flex gap-2 m-4 p-4 bg-gray-100 justify-center items-center w-1/2 rounded-lg">
                        <p>Strength: </p>
                        {strength <= 4 && (
                            <div className="bg-red-500 w-2/3 rounded-2xl">
                                <p className="text-center text-white">Weak</p>
                            </div>
                        )}
                        {strength === 5 && (
                            <div className="bg-orange-500 w-2/3 rounded-2xl">
                                <p className="text-center text-white">Medium</p>
                            </div>
                        )}
                        {strength > 5 && (
                            <div className="bg-green-500 w-2/3 rounded-2xl">
                                <p className="text-center text-white">Strong</p>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </>
    )
}