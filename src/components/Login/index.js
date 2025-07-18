import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', iserrorMsg: false, errorMsg: ''}

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({iserrorMsg: true, errorMsg})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, iserrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <form className="form-con" onSubmit={this.onLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image"
          />
          <label htmlFor="usern" className="user-label">
            USERNAME
          </label>
          <input
            id="usern"
            type="text"
            className="userInput"
            value={username}
            placeholder="username"
            onChange={this.onUsername}
          />
          <label htmlFor="userp" className="user-label">
            PASSWORD
          </label>
          <input
            id="userp"
            type="password"
            className="userInput"
            value={password}
            placeholder="password"
            onChange={this.onPassword}
          />
          <button type="submit" className="logbtn">
            Login
          </button>
          {iserrorMsg && <p>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
