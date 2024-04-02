import React from 'react'
import Sidebar from './Sidebar'

function Home() {
  return (
    <div className="home-content">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>this is the main content of the home page</h1>
      </div>
    </div>
  )
}

export default Home
