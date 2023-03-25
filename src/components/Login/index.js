import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('USERNAME', username)
    localStorage.setItem('PASSWORD', password)
  }

  onLoginFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrlApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrlApi, options)

    const fetchedData = await response.json()
    console.log(fetchedData)

    if (response.ok === true) {
      this.onLoginSuccess(fetchedData.jwt_token)
    } else {
      this.onLoginFailure(fetchedData.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          onChange={this.onChangeUserName}
          value={username}
          className="input-field"
          type="text"
          id="username"
          placeholder="rahul"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.onChangePassword}
          value={password}
          className="input-field"
          type="password"
          id="password"
          placeholder="rahul@2021"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-container">
          <img
            className="website-logo"
            alt="login website logo"
            src="https://res.cloudinary.com/ddry7fpzp/image/upload/v1662296727/Movies_Logo_vr3wvf.png"
          />
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <h1 className="heading-login">Login</h1>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default Login
