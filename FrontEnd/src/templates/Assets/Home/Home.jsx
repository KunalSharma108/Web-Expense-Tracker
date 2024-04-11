import React from 'react'
import PropTypes from 'prop-types'
import HomePicturetop from './homePicturetop'
import About from './About'
import WhyWET from './WhyWET'

function Home(props) {
  return (
    <div className='home-main'>
      <HomePicturetop cookie = {props.cookie}/>
      <WhyWET />
      <About />
    </div>
  )
}

Home.propTypes = {

}

export default Home

