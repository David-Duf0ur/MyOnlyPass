import { useId } from "react";

interface IInputProps {
    labelName: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputType?: string;
    placeholder?: string;
    value?: string | number;
}

export default function Input({ labelName, onChange, inputType, placeholder, value }: IInputProps) {
    const id = useId();
    return (
        <div className='flex flex-col mb-4'>
            <label htmlFor={id} className="">{labelName}</label>
            <input onChange={(e) => onChange?.(e)} value={value} id={id} className="bg-amber-200 p-2 rounded-lg w-64" type={inputType} name={labelName} title={labelName} placeholder={placeholder}></input>
        </div>
    )
}