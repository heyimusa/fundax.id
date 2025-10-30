
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Favicon from './components/Favicon.tsx'

createRoot(document.getElementById("root")!).render(
  <>
    <Favicon />
    <App />
  </>
);
