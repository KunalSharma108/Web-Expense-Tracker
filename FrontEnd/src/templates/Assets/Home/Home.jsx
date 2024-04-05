import React from 'react'
import PropTypes from 'prop-types'
import HomePicturetop from './homePicturetop'

function Home(props) {
  return (
    <div className='home-main'>
      <HomePicturetop cookie = {props.cookie}/>
    </div>
  )
}

Home.propTypes = {

}

export default Home

