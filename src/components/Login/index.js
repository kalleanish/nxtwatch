import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import LoginButton from './styledComponents'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isShow: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({isShow: !prevState.isShow}))
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetail = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetail),
    }
    const fetchedLoginData = await fetch(apiUrl, option)
    if (fetchedLoginData.ok) {
      const data = await fetchedLoginData.json()
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const data = await fetchedLoginData.json()
      const errMsg = data.error_msg
      console.log(data)
      this.setState({errMsg})
    }
  }

  render() {
    const {username, password, isShow, errMsg} = this.state
    const isError = errMsg !== ''
    const typeAsPerShowPassword = isShow ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const backgroundColor = isDark ? 'darkBackground' : ''
          const backgroundInner = isDark ? 'darkBackgroundInner' : ''
          const shadow = isDark ? '' : 'box-shadow-for-form'
          const logoUrl = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          const darkColor = isDark ? 'color-dark' : ''
          return (
            <div className={`login-background ${backgroundColor}`}>
              <form
                className={`login-form-container ${shadow} ${backgroundInner}`}
                onSubmit={this.onSubmitForm}
              >
                <img className="login-logo" src={logoUrl} alt="website logo" />
                <div className="login-input-container">
                  <label
                    htmlFor="username"
                    className={`label-element ${darkColor}`}
                  >
                    USERNAME
                  </label>
                  <input
                    onChange={this.onChangeUsername}
                    id="username"
                    placeholder="Username"
                    className={`input-element-login-route ${darkColor}`}
                    type="text"
                    value={username}
                  />
                  <label
                    htmlFor="password"
                    className={`label-element ${darkColor}`}
                  >
                    PASSWORD
                  </label>
                  <input
                    onChange={this.onChangePassword}
                    id="password"
                    placeholder="Password"
                    className={`input-element-login-route ${darkColor}`}
                    type={typeAsPerShowPassword}
                    value={password}
                  />
                  <div>
                    <input
                      className="checkbox"
                      onClick={this.onShowPassword}
                      id="checkbox"
                      type="checkbox"
                    />
                    <label
                      className={`checkbox-label ${darkColor}`}
                      htmlFor="checkbox"
                    >
                      Show Password
                    </label>
                  </div>
                  <LoginButton type="submit" color="#ffffff">
                    Login
                  </LoginButton>
                  {isError && <p className="error-message">*{errMsg}</p>}
                </div>
              </form>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
