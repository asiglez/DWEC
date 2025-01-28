import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Tablero from "./components/Ejercicio1/Tablero.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tablero />
  </StrictMode>,
)
