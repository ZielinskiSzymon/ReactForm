import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Formularz from './components/Formularz'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Formularz />
	</StrictMode>
)
