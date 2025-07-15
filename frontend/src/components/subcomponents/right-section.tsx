import Content from "./content";
import Header from "./header";
import type { ICredential } from '../../types/interfaces'
import ContentNav from "./content-nav";
import bg1 from '../../assets/bg-1.jpg';
import bg2 from '../../assets/bg-2.jpg';
import FormSearch from "../form/form-search";

interface RightSectionProps {
  dataList: ICredential[];
  dataListFull: ICredential[];
  setData: (data: ICredential | undefined) => void;
  setDataList: React.Dispatch<React.SetStateAction<ICredential[]>>;
  data: ICredential | undefined;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  refresh: boolean;
  sortBy: 'nom' | 'category' | 'mail';
  setSortBy: React.Dispatch<React.SetStateAction<'nom' | 'category' | 'mail'>>;
  pagTotalItems: number;
  pagTotalPages: number;
  setLog: (value: boolean) => void;
}

export default function RightSection({ setLog, dataList, setDataList, setData, data, dataListFull, setRefresh, refresh, sortBy, setSortBy, pagTotalItems, pagTotalPages }: RightSectionProps) {

  return (
    <div style={{ backgroundImage: `url(${bg1})` }} className='basis-3/4 flex flex-col bg-cover bg-center bg-no-repeat flex-1 h-full'>
      <Header setLog={setLog} dataListFull={dataListFull} setData={setData} setRefresh={setRefresh} refresh={refresh} />
      <div className='flex flex-col'>
        <FormSearch dataListFull={dataListFull} setData={setData} />
        <div style={{ backgroundImage: `url(${bg2})` }}
          className='bg-cover bg-center bg-no-repeat flex m-4 rounded-lg border-1 border-white'>
          <ContentNav pagTotalItems={pagTotalItems} pagTotalPages={pagTotalPages} dataList={dataList} setDataList={setDataList} setData={setData} sortBy={sortBy} setSortBy={setSortBy} setRefresh={setRefresh} refresh={refresh} />
          <Content data={data} setData={setData} setRefresh={setRefresh} refresh={refresh} />
        </div>
      </div>
    </div>
  )
}