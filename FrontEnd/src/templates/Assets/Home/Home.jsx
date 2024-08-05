import React from 'react'
import PropTypes from 'prop-types'
import HomePicturetop from './homePicturetop'
import About from './About'
import WhyWET from './WhyWET'
import KeyFeatures from './KeyFeatures'
import GetStarted from './GetStarted'
import TechUsed from './TechUsed'

function Home(props) {
  return (
    <div className='home-main' id='home'>
      <HomePicturetop Data={props.Data} />
      <About />
      <WhyWET />
      <KeyFeatures />
      <GetStarted Data={props.Data} />
      <TechUsed />
    </div>
  )
}

Home.propTypes = {

}

export default Home

