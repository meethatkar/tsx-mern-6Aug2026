import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.route.tsx'
import { CharacterProvider } from './features/characters/character.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CharacterProvider>
      <RouterProvider router={router} />
    </CharacterProvider>
  </StrictMode>,
)
