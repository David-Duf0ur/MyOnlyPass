import { createContext, useState, type JSX } from "react";

export const FilterContext = createContext({
    filter: 'all',
    setFilter: (_filter: string) => { },
    orderdBy: 'title',
    setOrderdBy: (_orderedBy: string) => { },
    search: '',
    setSearch: (_search: string) => { },
});

export function FilterProvider({ children }: { children: JSX.Element }): JSX.Element {
    const [filter, setFilter] = useState('all');
    const [orderdBy, setOrderdBy] = useState('title');
    const [search, setSearch] = useState('');

    return (
        <FilterContext.Provider value={{ filter, setFilter, orderdBy, setOrderdBy, search, setSearch }}>
            {children}
        </FilterContext.Provider>
    );
}
