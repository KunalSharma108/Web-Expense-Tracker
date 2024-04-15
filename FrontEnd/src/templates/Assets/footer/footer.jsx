import React from 'react'
import propType from 'prop-types'
import { Link } from 'react-router-dom'

function Footer(props) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className='footer'>
      <div className="footer-content">

        <div className="top">
          <div className="hyperlinks">
            <a href={`#${props.Link0}`} className="hyperlink">{props.linkName0}</a>
            <a href={`#${props.Link1}`} className="hyperlink">{props.linkName1}</a>
            <a href={`#${props.Link2}`} className="hyperlink">{props.linkName2}</a>
            <a href={`#${props.Link3}`} className="hyperlink">{props.linkName3}</a>
            <a href={`#${props.Link4}`} className="hyperlink">{props.linkName4}</a>
            <a href={`#${props.Link5}`} className="hyperlink">{props.linkName5}</a>
            <a href={`#${props.Link6}`} className="hyperlink">{props.linkName6}</a>
            <Link to={'/'} onClick={scrollToTop}>Home</Link>
            <Link to={'/ContactUs'} onClick={scrollToTop}>Contact Us</Link>
            <Link to={'/expense-work'} onClick={scrollToTop}>Manage Expenses</Link>
            <Link to={'/Profile'} onClick={scrollToTop}>Profile</Link>
            <Link to={'/User-Guide'} onClick={scrollToTop}>User Guide</Link>
          </div>
          <div className="socials">
            <a href="" className="social"></a>
          </div>
        </div>

        <div className="bottom">
          <a href='' className="bottom-link"></a>
        </div>

      </div>
    </div>
  )
}

export default Footer
