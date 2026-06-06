import React from 'react'
import home from '../assets/home500.jpg'


const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
        {/* <h2>Home Page</h2> */}
        
      <div>
        <img src={home} alt = ""></img> 
        
      </div>

      
    </div>
  )
}

export default Home