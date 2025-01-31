import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppEnrutador from './routers/Ejercicio4/AppEnrutador.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppEnrutador />
  </StrictMode>,
)
