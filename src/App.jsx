import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Partituras from './pages/Partituras'
import PartituraPerfil from './pages/PartituraPerfil'
import Compositores from './pages/Compositores'
import CompositorPerfil from './pages/CompositorPerfil'
import Missao from './pages/Missao'
import Historia from './pages/Historia'
import Equipe from './pages/Equipe'
import Biblioteca from './pages/Biblioteca'
import Pesquisas from './pages/Pesquisas'
import Metodos from './pages/Metodos'
import MetodoPerfil from './pages/MetodoPerfil'
import Realizacoes from './pages/Realizacoes'
import Contato from './pages/Contato'
import Festival from './pages/Festival'
import FestivalPerfil from './pages/FestivalPerfil'
import AcervoDigital from './pages/AcervoDigital'
import Homenagens from './pages/Homenagens'
import Palestras from './pages/Palestras'
import Colabore from './pages/Colabore'
import Oficinas from './pages/Oficinas'
import OficinaPerfil from './pages/OficinaPerfil'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partituras" element={<Partituras />} />
          <Route path="/partituras/:id" element={<PartituraPerfil />} />
          <Route path="/compositores" element={<Compositores />} />
          <Route path="/compositores/:id" element={<CompositorPerfil />} />
          <Route path="/missao" element={<Missao />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/realizacoes" element={<Realizacoes />} />
          <Route path="/colabore" element={<Colabore />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/festival" element={<Festival />} />
          <Route path="/festival/:id" element={<FestivalPerfil />} />

          {/* Submenu Biblioteca */}
          <Route path="/biblioteca/metodos" element={<Metodos />} />
          <Route path="/biblioteca/metodos/:id" element={<MetodoPerfil />} />
          <Route path="/biblioteca/pesquisas" element={<Pesquisas />} />
          <Route path="/biblioteca/acervo-digital" element={<AcervoDigital />} />

          {/* Submenu Realizações — em construção */}
          <Route path="/realizacoes/oficinas" element={<Oficinas />} />
          <Route path="/realizacoes/oficinas/:id" element={<OficinaPerfil />} />
          <Route path="/realizacoes/homenagens" element={<Homenagens />} />
          <Route path="/realizacoes/palestras" element={<Palestras />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
