import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <NavBar />

      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Body