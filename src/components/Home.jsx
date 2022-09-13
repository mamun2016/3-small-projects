import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <Link to="/website">
        Restaurant website
      </Link>

      <Link to="/todo">
        Todo List
      </Link>
      
      <Link to="/weather">
        Weather
      </Link>
    </div>
  )
}

export default Home
