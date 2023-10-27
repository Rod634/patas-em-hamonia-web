import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.tsx'
import { AuthProvider } from './contexts/auth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
)
