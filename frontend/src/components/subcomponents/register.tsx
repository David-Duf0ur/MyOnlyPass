import FormRegister from "../form/form-register";



export default function Register({ setLog }: { setLog: (value: boolean) => void }) {

    return (
        <div className='flex flex-col justify-center items-center gap-4 text-2xl'>
            < FormRegister setLog={setLog} />
        </div>
    )
}