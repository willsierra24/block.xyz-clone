import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './assets/fonts/stylesheet.css'
import Navbar from './components/Navbar/Navbar'
import ShaderCanvas from './components/ShaderCanvas/ShaderCanvas'
import ThreeScene from './components/ThreeScene/ThreeScene'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
    <Navbar>
    </Navbar>
    <ShaderCanvas></ShaderCanvas>
    <ThreeScene></ThreeScene>   
    <Footer></Footer> 
    </>
  )
}

export default App
