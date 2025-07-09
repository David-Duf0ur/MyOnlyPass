import { useState } from "react";
import type { ICredential } from "../../types/interfaces";


interface FormSearchProps {
    dataListFull: ICredential[];
    setData: (data: ICredential | undefined) => void;
}

export default function FormSearch({ dataListFull, setData }: FormSearchProps) {
    const [search, setSearch] = useState('');

    const filterBySearch = function (
        dataListFull: ICredential[],
        search: string
    ): ICredential[] {
        return dataListFull.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                const local = filterBySearch(dataListFull, search);
                setData(local[0]);
                setSearch('');
            }} className='bg-white flex items-center justify-between p-1 m-4 rounded-lg'>
                <input onChange={(e) => {
                    setSearch(e.target.value)
                }} placeholder="Search..." className='w-full p-1 mr-2' value={search} />
                <button className='bg-amber-200 p-2 rounded-full cursor-pointer hover:bg-amber-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" strokeWidth="1" /></svg>
                </button>
            </form>

        </>
    )
}