interface IButtonProps {
    buttonName: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: "blue" | "red"
}

export default function Button({ buttonName, onClick, variant = "blue" }: IButtonProps) {
    const baseStyle = "w-24 text-white font-bold py-2 px-4 rounded mt-2"
    const variantStyle = variant === "blue" ? "bg-blue-400 hover:bg-blue-500" : "bg-red-400 hover:bg-red-500";
    return (
        <button onClick={(e) => onClick?.(e)} className={`${baseStyle} ${variantStyle}`}>{buttonName}</button>
    )
}