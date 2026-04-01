import './styles/App.scss'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Hobby from './components/Hobby'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <main className="content-wrap">
        <About />
        <Hobby />
      </main>
    </>
  )
}

export default App
