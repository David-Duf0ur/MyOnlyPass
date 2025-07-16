import './App.css'
import Footer from './components/subcomponents/footer'
import Corps from './components/corps'
import { useState } from 'react'
import Accueil from './components/accueil'
import { UserProvider } from './context/UserContext'


export default function App() {
  const [log, setLog] = useState<boolean>(false)

  return (
    <UserProvider>
      <div className='flex flex-col h-screen'>
        {log
          ?
          <Corps setLog={setLog} />
          :
          <Accueil setLog={setLog} />}
        <Footer />
      </div>
    </UserProvider>
  )
}

