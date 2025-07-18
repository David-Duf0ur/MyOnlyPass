import { useContext, useEffect, useState } from 'react'
import LeftSection from '../components/subcomponents/left-section'
import RightSection from '../components/subcomponents/right-section'
import type { ICredential } from '../types/interfaces'
import { UserContext } from '../context/UserContext';
import { FilterProvider } from '../context/FilterContext';

export interface ICredentialFields {
    setLog: (log: boolean) => void;
}

export default function Corps({ setLog }: ICredentialFields) {
    const { user } = useContext(UserContext);

    const [dataListFull, setDataListFull] = useState<ICredential[]>([])
    const [sortBy, setSortBy] = useState<'nom' | 'category' | 'mail'>('nom');
    const [refresh, setRefresh] = useState(false)
    const [itemFilter, setItemFilter] = useState<string>('all')
    const [_dataListFavorites, setDataListFavorites] = useState<ICredential[]>([]);

    const fetchDataCredentials = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/credentials/full/${userId}`)
            const dataFetch = await response.json()
            setDataListFull(dataFetch)
            console.log("Data fetched:", dataFetch);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error)
        }
    }

    const fetchDataFavorites = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/credentials/favorites/${userId}`)
            const dataFetch = await response.json()
            setDataListFavorites(dataFetch)
        } catch (error) {
            console.error("Erreur lors de la récupération :", error)
        }
    }

    useEffect(() => {
        fetchDataCredentials(user?.id_user || 0)
        fetchDataFavorites(user?.id_user || 0)
    }, [refresh])

    return (
        <div className='flex'>
            <FilterProvider>
                <>
                    <LeftSection itemFilter={itemFilter} setItemFilter={setItemFilter} />
                    <RightSection
                        dataListFull={dataListFull}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        setLog={setLog}
                    />
                </>
            </FilterProvider>
        </div>
    )
}

