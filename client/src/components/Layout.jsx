import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-[76vh]">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}