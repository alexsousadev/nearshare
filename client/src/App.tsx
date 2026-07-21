import './App.css'
import env from './config/env'
import { useShare } from './hooks/useShare'

function App() {
  const connectionPath = env.connection_url
  const { peers, myDevice } = useShare(connectionPath)

  return (
    <div>
      <h1>NearShare</h1>
      <h2>Your device name: {myDevice?.name || 'Connecting...'}</h2>

      <div>
        <h3>Available devices:</h3>

        {peers.map((peer) => {
          console.log(peer)
          return (
            <button key={peer.id} className="peer-btn">
              {peer.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default App
