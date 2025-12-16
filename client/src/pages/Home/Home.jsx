import React from 'react'
import Hero from './Hero'
import Features from './Features'

const Home = () => {
  return (
    <div className='container flex-row justify-center items-center w-screen'>
      <Hero/>
      <Features/>
    </div>
    
  )
}

export default Home