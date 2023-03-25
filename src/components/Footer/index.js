import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <button type="button" className="anchor-btn">
        <FaGoogle className="icon" />
      </button>
      <button type="button" className="anchor-btn">
        <FaTwitter className="icon" />
      </button>
      <button type="button" className="anchor-btn">
        <FaInstagram className="icon" />
      </button>
      <button type="button" className="anchor-btn">
        <FaYoutube className="icon" />
      </button>
    </div>

    <p className="contact-us"> Contact us</p>
  </>
)

export default Footer
