import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 style={{color: 'white'}}>Lost Your Way ?</h1>
    <p className="description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>

    <Link to="/">
      <button type="button" className="go-home-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
