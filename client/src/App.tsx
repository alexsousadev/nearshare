import React, { useRef } from 'react'
import './App.css'
import env from './config/env'
import { useShare } from './hooks/useShare'

function App() {
  const connectionPath = env.connection_url
  const { peers, myDevice } = useShare(connectionPath)
  const selectPeerId = useRef<string | null>(null)
  const fileInput = useRef<HTMLInputElement | null>(null)

  const handlePeerClick = (peerId: string) => {
    selectPeerId.current = peerId;
    fileInput.current?.click(); // open the file selector
  }

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file || !selectPeerId.current) return

    console.log(`Arquivo escolhido: ${file.name} \n tipo: ${file.type} \n tamanho: ${file.size} bytes`)
  }

  return (
    <div>
      <h1>NearShare</h1>
      <h2>Your device name: {myDevice?.name || 'Connecting...'}</h2>

      <div>
        <h3>Available devices:</h3>

        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileSelected}
        />

        {peers.map((peer) => {
          console.log(peer)
          return (
            <button key={peer.id} className="peer-btn" onClick={() => handlePeerClick(peer.id)}>
              {peer.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default App
