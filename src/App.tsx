import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './shared/components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar onSearchClickMobile={(val: string) => {
        console.log("SETING :", val);
      }} />
      <Outlet />
    </div>
  )
}

export default App