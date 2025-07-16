import FormLogin from "../form/form-login";


export default function Login({ setLog }: { setLog: (value: boolean) => void }) {

    return (
        <div className='flex flex-col justify-center items-center gap-4 text-2xl h-full'>
            < FormLogin setLog={setLog} />
        </div>
    )
}