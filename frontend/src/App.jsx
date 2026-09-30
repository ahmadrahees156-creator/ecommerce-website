import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          E-Commerce Website
        </h1>
      </div>

      <Footer />
    </>
  )
}

export default App