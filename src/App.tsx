import Navbar from './shared/components/Navbar'
import Characters from './features/characters/pages/Characters'

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex-1 bg-slate-950">
        <Characters />
      </div>
    </div>
  )
}

export default App