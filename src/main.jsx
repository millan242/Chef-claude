import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Header'
import Form from './Form'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Form />
  </StrictMode>,
)
