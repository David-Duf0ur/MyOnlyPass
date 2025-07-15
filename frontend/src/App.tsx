import './App.css'
import Footer from './components/subcomponents/footer'
import Corps from './components/corps'
import { useState } from 'react'
import Accueil from './components/accueil'
import type { IUser } from './types/interfaces'
import { UserProvider } from './context/UserContext'


export default function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [log, setLog] = useState<boolean>(false)

  return (
    <UserProvider userContext={user}>
      <div className='flex flex-col h-screen'>
        {log
          ?
          <Corps setLog={setLog} />
          :
          <Accueil setLog={setLog} setUser={setUser} user={user} />}
        <Footer />
      </div>
    </UserProvider>
  )
}

