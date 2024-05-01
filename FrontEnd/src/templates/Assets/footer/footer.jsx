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
        <div className="footer-head">
          Web Expense Tracker
        </div>
        <div className="top">
          <div className="hyperlinks">
            {props.linkName0 && props.Link0 ? (
              <a href={`#${props.Link0}`} className="hyperlink footer-font">{props.linkName0}</a>
            ) : null}

            {props.linkName1 && props.Link1 ? (
              <a href={`#${props.Link1}`} className="hyperlink footer-font">{props.linkName1}</a>
            ) : null}

            {props.linkName2 && props.Link2 ? (
              <a href={`#${props.Link2}`} className="hyperlink footer-font">{props.linkName2}</a>
            ) : null}

            {props.linkName3 && props.Link3 ? (
              <a href={`#${props.Link3}`} className="hyperlink footer-font">{props.linkName3}</a>
            ) : null}

            {props.linkName4 && props.Link4 ? (
              <a href={`#${props.Link4}`} className="hyperlink footer-font">{props.linkName4}</a>
            ) : null}

            {props.linkName5 && props.Link5 ? (
              <a href={`#${props.Link5}`} className="hyperlink footer-font">{props.linkName5}</a>
            ) : null}

            {props.linkName6 && props.Link6 ? (
              <a href={`#${props.Link6}`} className="hyperlink footer-font">{props.linkName6}</a>
            ) : null}

            <Link to={'/'} onClick={scrollToTop} className='hyperlink footer-font'>Home</Link>
            <Link to={'/ContactUs'} onClick={scrollToTop} className='hyperlink footer-font'>Contact Us</Link>
            <Link to={'/expense-work'} onClick={scrollToTop} className='hyperlink footer-font'>Manage Expenses</Link>
            <Link to={'/Profile'} onClick={scrollToTop} className='hyperlink footer-font'>Profile</Link>
            <Link to={'/User-Guide'} onClick={scrollToTop} className='hyperlink footer-font'>User Guide</Link>
          </div>
          <div className="socials">
            <a href="https://www.instagram.com/kunal_sharma108" className="social footer-font" target='_blank'>
              <div className="logo"><i className="fa-brands fa-instagram insta fa-lg"></i></div>
              <div className="social-name">Instagram</div>
            </a>
            <a href="https://www.linkedin.com/in/kunal-sharma-209435283/" className="social footer-font" target='_blank'>
              <div className="logo"><i className="fa-brands fa-linkedin linkedin fa-lg"></i></div>
              <div className="social-name">Linked In</div>
            </a>
            <a href="https://github.com/KunalSharma108" className="social footer-font" target='_blank'>
              <div className="logo"><i className="fa-brands fa-github github fa-lg"></i></div>
              <div className="social-name">Github</div>
            </a>
            <a href="https://www.fiverr.com/nalvo108" className="social footer-font" target='_blank'>
              <div className="logo fiverr-logo roboto-bold">fi</div>
              <div className="social-name">Fiverr</div>
            </a>
            <a href="mailto:kunalsharma0422@gmail.com" className="social footer-font" target='_blank'>
              <div className="logo"><i className="fa-regular fa-envelope email fa-lg"></i></div>
              <div className="social-name">Email</div>
            </a>
            <a href="https://codepen.io/KunalSharma108" className="social footer-font" target='_blank'>
              <div className="logo"><i className="fa-brands fa-codepen codepen fa-lg"></i></div>
              <div className="social-name">CodePen</div>
            </a>
          </div>
        </div>

        <div className="bottom">
          <a href='' className="bottom-link">
            <div className="bottom-icon"><i className="fa-solid fa-code-branch"></i></div>
            <div className="bottom-name footer-font">v1.0</div>
          </a>
        </div>

      </div>
    </div>
  )
}

export default Footer
