import {BsBrightnessHigh} from 'react-icons/bs'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, changeTheme} = value
      const popupContainerStyle = isDark ? 'darkTheme' : ''
      const logoUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const onChangeTheme = () => {
        changeTheme()
      }
      const backgroundColor = isDark ? 'dark-back' : ''
      const color = isDark ? 'white' : ''
      const themeIcon = isDark ? (
        <BsBrightnessHigh className={`icons-header ${color}`} />
      ) : (
        <FaMoon className={`icons-header ${color}`} />
      )
      const logoutButton = isDark ? 'logout-button-dark' : 'logout-button-light'
      return (
        <nav className={`navbar-container ${backgroundColor}`}>
          <Link to="/">
            <img className="header-logo" src={logoUrl} alt="website logo" />
          </Link>
          <div className="navbar-container">
            <button
              className="button"
              data-testid="theme"
              onClick={onChangeTheme}
              type="button"
            >
              {themeIcon}
            </button>
            <img
              className="profile-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <button className={logoutButton} type="button">
                  Logout
                </button>
              }
            >
              {close => (
                <div className={`popup-container ${popupContainerStyle}`}>
                  <p>Are you sure, you want to logout</p>
                  <div>
                    <button
                      className="btn cancel-button"
                      type="button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn confirm-button"
                      type="button"
                      onClick={onLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
