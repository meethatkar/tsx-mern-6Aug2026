import { Outlet } from 'react-router-dom'
import Navbar from './shared/components/Navbar'

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex-1 bg-slate-950">
        <Outlet />
      </div>
    </div>
  )
}

export default App