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
import Realizacoes from './pages/Realizacoes'
import Contato from './pages/Contato'
import EmConstrucao from './components/EmConstrucao'

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
          <Route path="/contato" element={<Contato />} />
          <Route path="/festival" element={<EmConstrucao titulo="Festival" subtitulo="O Festival do Cavaquinho Brasileiro" />} />

          {/* Submenu Biblioteca — em construção */}
          <Route path="/biblioteca/metodos" element={<EmConstrucao titulo="Métodos" subtitulo="Biblioteca · Métodos de Cavaquinho" />} />
          <Route path="/biblioteca/pesquisas" element={<Pesquisas />} />
          <Route path="/biblioteca/acervo-digital" element={<EmConstrucao titulo="Acervo Digital" subtitulo="Biblioteca · Gravações e Fotografias" />} />

          {/* Submenu Realizações — em construção */}
          <Route path="/realizacoes/oficinas" element={<EmConstrucao titulo="Oficinas" subtitulo="Realizações · Oficinas" />} />
          <Route path="/realizacoes/homenagens" element={<EmConstrucao titulo="Homenagens" subtitulo="Realizações · Homenagens" />} />
          <Route path="/realizacoes/palestras" element={<EmConstrucao titulo="Palestras" subtitulo="Realizações · Palestras" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
