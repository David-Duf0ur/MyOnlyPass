import { useContext, useEffect, useState } from 'react'
import LeftSection from '../components/subcomponents/left-section'
import RightSection from '../components/subcomponents/right-section'
import type { ICredential } from '../types/interfaces'
import { UserContext } from '../context/UserContext';

export interface ICredentialFields {
    setLog: (log: boolean) => void;
}

export default function Corps({ setLog }: ICredentialFields) {
    const { user } = useContext(UserContext);
    const [dataList, setDataList] = useState<ICredential[]>([])
    const [dataListFull, setDataListFull] = useState<ICredential[]>([])
    const [data, setData] = useState<ICredential | undefined>(undefined)
    const [sortBy, setSortBy] = useState<'nom' | 'category' | 'mail'>('nom');
    const [refresh, setRefresh] = useState(false)
    const [pagTotalItems, setPagTotalItems] = useState(4)
    const [pagTotalPages, setPagTotalPages] = useState(1)
    const [itemFilter, setItemFilter] = useState<string>('all')
    const [dataListFavorites, setDataListFavorites] = useState<ICredential[]>([]);

    const currentDataList = itemFilter === "favorites" ? dataListFavorites : dataList;
    const currentSetDataList = itemFilter === "favorites" ? setDataListFavorites : setDataList;

    const sortData = (data: ICredential[]) => {
        return data.sort((a, b) => {
            if (sortBy === 'nom') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'mail') {
                return a.mail.localeCompare(b.mail);
            }
            return a.category.localeCompare(b.category);
        });
    }

    const fetchDataPag = async (page: number, userId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/credentials/${page}/4/${userId}`)
            const dataFetch = await response.json()
            setDataList(dataFetch.results)
            setPagTotalItems(dataFetch.totalItems)
            setPagTotalPages(dataFetch.totalPages)
        } catch (error) {
            console.error("Erreur lors de la récupération :", error)
        }
    }

    const fetchDataCredentials = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/credentials/full/${userId}`)
            const dataFetch = await response.json()
            setDataListFull(dataFetch)
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
        fetchDataPag(1, user?.id_user || 0)
        fetchDataCredentials(user?.id_user || 0)
        fetchDataFavorites(user?.id_user || 0)
    }, [refresh])

    return (
        <div className='flex'>
            <LeftSection itemFilter={itemFilter} setItemFilter={setItemFilter} />
            <RightSection
                pagTotalItems={pagTotalItems}
                pagTotalPages={pagTotalPages}
                dataList={sortData(currentDataList)}
                setDataList={currentSetDataList}
                dataListFull={dataListFull}
                setData={setData}
                data={data}
                refresh={refresh}
                setRefresh={setRefresh}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setLog={setLog}
            />
        </div>
    )
}

