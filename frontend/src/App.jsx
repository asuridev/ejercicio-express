import './App.css'
import { Provider } from './context/AppContext'
import { MainRoter } from './routes/MainRoter'

function App() {
  
  return (
    <Provider>
      <MainRoter/>
    </Provider>
  )
}

export default App
