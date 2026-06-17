import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Partituras from './pages/Partituras'
import Compositores from './pages/Compositores'
import Missao from './pages/Missao'
import Historia from './pages/Historia'
import Equipe from './pages/Equipe'
import Biblioteca from './pages/Biblioteca'
import Realizacoes from './pages/Realizacoes'
import Contato from './pages/Contato'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partituras" element={<Partituras />} />
          <Route path="/compositores" element={<Compositores />} />
          <Route path="/missao" element={<Missao />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/realizacoes" element={<Realizacoes />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
