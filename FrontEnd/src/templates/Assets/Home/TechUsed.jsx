import React from 'react'
import PropTypes from 'prop-types'
import ReactLogo from '../images/react.svg'
import firebaseLogo from '../images/firebase.png'

function TechUsed(props) {
  return (
    <div className="tu-main keyf-main">
      <div className="tu-content keyf-content">
        <div className="tu-head keyf-head" id='techUsed'>
          Tech Used
        </div>
        <div className="tu-box-content keyf-box-content">
          <div className="tu-boxes keyf-boxes">
            <div className="logo-container">
              <div className="tu-logo react">
                <img src={`${ReactLogo}`} alt="React Logo" />
              </div>
            </div>
            <div className="tu-subhead keyf-box-head">Built with React</div>
            <div className="tu-p-content keyf-box-pcontent">
              Web Expense Tracker is crafted using React, a powerful JavaScript library for building user interfaces. React allows for the creation of interactive and dynamic user interfaces, ensuring a seamless experience for our users.
            </div>
          </div>
          <div className="tu-boxes keyf-boxes">
            <div className="logo-container">
              <div className="tu-logo firebase">
                <img src={`${firebaseLogo}`} alt="Firebase Logo" />
              </div>
            </div>
            <div className="tu-subhead keyf-box-head">Powered by Firebase</div>
            <div className="tu-p-content keyf-box-pcontent">
              Firebase is the backbone of Web Expense Tracker, providing authentication and real-time database management. With Firebase, we ensure secure user authentication and seamless data synchronization across devices.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

TechUsed.propTypes = {

}

export default TechUsed

