import React from 'react'
import PropTypes from 'prop-types'

function mainContent(props) {
  return (
    <div className="home-main">
      <div className="main-content" style={{ height: "2000px", overflowY: "auto" }}>
        <h1>This is the main content of the home page</h1>
      </div>
    </div>
  )
}

mainContent.propTypes = {

}

export default mainContent

