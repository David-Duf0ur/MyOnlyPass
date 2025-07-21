import { useContext } from "react";

import { FilterContext } from "../../context/FilterContext";
import type { ICredential } from "../../types/interfaces";
import { UserContext } from "../../context/UserContext";


interface FormSearchProps {
    setCredentialSelected: React.Dispatch<React.SetStateAction<ICredential>>;
    credentialSelected: ICredential;
}

export default function FormSearch({ setCredentialSelected, credentialSelected }: FormSearchProps) {
    const { user } = useContext(UserContext);
    const { search, setSearch } = useContext(FilterContext);

    const findName = async (name: string) => {
        try {
            const response = await fetch(`http://localhost:3000/credentials/closest/${user?.id_user}/${name}`);
            const data = await response.json();
            if (data.length > 0) {
                setCredentialSelected(data[0]);
            }
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.keys(credentialSelected).length === 0) {
            setSearch('Aucun résultat trouvée');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='bg-white flex items-center justify-between p-1 m-4 rounded-lg'>
                <input onClick={() => {
                    setCredentialSelected({} as ICredential);
                    setSearch('');
                }} onChange={(e) => {
                    setSearch(e.target.value)
                    findName(e.target.value);
                }} placeholder="Search..." className='w-full p-1 mr-2' value={search} />
                <button className='bg-amber-200 p-2 rounded-full cursor-pointer hover:bg-amber-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" strokeWidth="1" /></svg>
                </button>
            </form>
        </>
    )
}