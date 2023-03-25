import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <div className="header-sec">
        <Header />
      </div>
      <div className="account-container">
        <h1 className="heading">Account</h1>
        <hr className="hz-line" />
        <div className="membership-container">
          <p className="member-details">Member ship</p>
          <div className="user-details">
            <p className="username">madhu7544@gmail.com</p>
            <p className="password">Password: **********</p>
          </div>
        </div>
        <hr className="hz-line" />
        <div className="plan-details-container">
          <p className="member-details">Plan Details</p>
          <p className="username">Premium</p>
          <p className="plan-type">Ultra HD</p>
        </div>
        <hr className="hz-line" />
        <button onClick={onClickLogout} type="button" className="logout-btn">
          Logout
        </button>
      </div>
      <div className="footer-sec">
        <Footer />
      </div>
    </>
  )
}

export default Account
