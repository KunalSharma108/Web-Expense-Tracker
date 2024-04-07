import React from 'react'
import PropTypes from 'prop-types'
import HomePicturetop from './homePicturetop'
import About from './About'

function Home(props) {
  return (
    <div className='home-main'>
      <HomePicturetop cookie = {props.cookie}/>
      <About />
    </div>
  )
}

Home.propTypes = {

}

export default Home

