import { useState } from 'react'
import LeftSection from '../components/subcomponents/left-section'
import RightSection from '../components/subcomponents/right-section'
import { FilterProvider } from '../context/FilterContext';

export interface ICredentialFields {
    setLog: (log: boolean) => void;
}

export default function Corps({ setLog }: ICredentialFields) {

    const [refresh, setRefresh] = useState(false)

    return (
        <div className='flex'>
            <FilterProvider>
                <>
                    <LeftSection />
                    <RightSection
                        refresh={refresh}
                        setRefresh={setRefresh}
                        setLog={setLog}
                    />
                </>
            </FilterProvider>
        </div>
    )
}

