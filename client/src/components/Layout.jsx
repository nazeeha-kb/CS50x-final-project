import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className={`min-h-[79vh]  ${ isHome? "": "flex justify-center items-center"}`}>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}