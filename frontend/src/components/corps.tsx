import { useEffect, useState } from 'react'
import LeftSection from '../components/subcomponents/left-section'
import RightSection from '../components/subcomponents/right-section'
import type { ICredential, IFields, IUser } from '../types/interfaces'

export interface ICredentialFields {
    setLog: (log: boolean) => void;
    setUser: (user: IUser | null) => void;
    user: IUser | null;
}

export default function Corps({ setLog, setUser, user }: ICredentialFields) {
    const [dataList, setDataList] = useState<ICredential[]>([])
    const [dataListFull, setDataListFull] = useState<ICredential[]>([])
    const [data, setData] = useState<ICredential | undefined>(undefined)
    const [sortBy, setSortBy] = useState<'nom' | 'category' | 'mail'>('nom');
    const [refresh, setRefresh] = useState(false)
    const [pagTotalItems, setPagTotalItems] = useState(4)
    const [pagTotalPages, setPagTotalPages] = useState(1)
    const [fieldsFull, setFieldsFull] = useState<IFields[]>([]);
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

    const fetchDataPag = async (page: number) => {
        try {
            const response = await fetch(`http://localhost:3000/credentials/${page}/4`)
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

    const fetchDataFavorites = async () => {
        try {
            const response = await fetch(`http://localhost:3000/credentials/favorites`)
            const dataFetch = await response.json()
            setDataListFavorites(dataFetch)
        } catch (error) {
            console.error("Erreur lors de la récupération :", error)
        }
    }

    const fetchDataFields = async () => {
        try {
            const response = await fetch(`http://localhost:3000/credentials/fields`)
            const dataFetch = await response.json()
            setFieldsFull(dataFetch)
        } catch (error) {
            console.error("Erreur lors de la récupération :", error)
        }
    }

    useEffect(() => {
        fetchDataPag(1)
        fetchDataCredentials(user?.id_user || 0)
        fetchDataFields()
        fetchDataFavorites()
    }, [refresh])

    return (
        <div className='flex'>
            <LeftSection itemFilter={itemFilter} setItemFilter={setItemFilter} />
            <RightSection
                fieldsFull={fieldsFull}
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
                setUser={setUser} user={user} />
        </div>
    )
}

