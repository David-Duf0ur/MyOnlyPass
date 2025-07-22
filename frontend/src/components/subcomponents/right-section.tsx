import Content from "./content";
import Header from "./header";
import type { ICredential } from '../../types/interfaces'
import ContentNav from "./content-nav";
import bg1 from '../../assets/bg-1.jpg';
import bg2 from '../../assets/bg-2.jpg';
import FormSearch from "../form/form-search";
import { useState } from "react";

interface RightSectionProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  refresh: boolean;
  setLog: (value: boolean) => void;
}

export default function RightSection({ setLog, setRefresh, refresh }: RightSectionProps) {
  const [credentialSelected, setCredentialSelected] = useState<ICredential>({
    _id: '',
    vaultId: 0,
    title: '',
    iconify: '',
    url: '',
    userId: 0,
    mail: '',
    passwordEncrypted: '',
    category: '',
    favorite: false,
    createdAt: '',
    updatedAt: '',
  });


  return (
    <div style={{ backgroundImage: `url(${bg1})` }} className='basis-3/4 flex flex-col bg-cover bg-center bg-no-repeat flex-1 h-full'>
      <Header setLog={setLog} setRefresh={setRefresh} refresh={refresh} />
      <div className='flex flex-col'>
        <FormSearch setCredentialSelected={setCredentialSelected} credentialSelected={credentialSelected} />
        <div style={{ backgroundImage: `url(${bg2})` }}
          className='bg-cover bg-center bg-no-repeat flex m-4 rounded-lg border-1 border-white'>
          <ContentNav setRefresh={setRefresh} refresh={refresh} setCredentialSelected={setCredentialSelected} />
          <Content credentialSelected={credentialSelected} setCredentialSelected={setCredentialSelected} setRefresh={setRefresh} refresh={refresh} />
        </div>
      </div>
    </div>
  )
}