import { useState } from 'react'
import './App.css'
import { router } from "./routes.jsx"
import { RouterProvider } from 'react-router'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { InterviewProvider } from './features/interview/interview.context.jsx'

function App() {


  
  return ( 
    <>
    <InterviewProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </InterviewProvider>

    </>
  )
}

export default App
