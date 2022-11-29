import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaGamepad} from 'react-icons/fa'
import {HiFire} from 'react-icons/hi'
import {MdPlaylistAdd} from 'react-icons/md'
import {Component} from 'react'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import {
  MediaLogo,
  SideBarPara,
  HomeContainer,
  SideContainer,
  UnorderedList,
  ListElement,
  ListItem,
  RightSideBottomContainer,
  Heading,
  NotFoundImage,
  Para,
} from './styledComponents'

const sideBarContent = [
  {id: 0, icon: <IoMdHome />, title: 'Home', link: '/'},
  {id: 1, icon: <HiFire />, title: 'Trending', link: '/trending'},
  {id: 2, icon: <FaGamepad />, title: 'Gaming', link: '/gaming'},
  {
    id: 3,
    icon: <MdPlaylistAdd />,
    title: 'Saved Videos',
    link: '/saved-videos',
  },
]

class NotFound extends Component {
  renderSideContainer = isDark => (
    <SideContainer
      width={20}
      isDark={isDark}
      height={65}
      justifyContent="space-between"
    >
      <nav>
        <UnorderedList>
          {sideBarContent.map(eachContent => {
            const {icon} = eachContent

            return (
              <Link className="link-style" to={eachContent.link}>
                <ListElement key={eachContent.id}>
                  {icon}
                  <ListItem isDark={isDark}>{eachContent.title}</ListItem>
                </ListElement>
              </Link>
            )
          })}
        </UnorderedList>
      </nav>
      <div>
        <SideBarPara isDark={isDark} className="contact-us">
          CONTACT US
        </SideBarPara>
        <div>
          <MediaLogo
            className="media-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <MediaLogo
            className="media-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <MediaLogo
            className="media-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </div>
        <SideBarPara isDark={isDark} className="contact-us">
          Enjoy! Now to see your channels and recommendations!
        </SideBarPara>
      </div>
    </SideContainer>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const imageUrl = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
          const backgroundColor = isDark ? '#0f0f0f' : '#f8fafc'
          const headingColor = isDark ? '#ffffff' : '#000000'
          const paraColor = isDark ? '#7e858e' : '#616e7c'
          return (
            <>
              <Header />
              <HomeContainer alignItem="flex-start">
                {this.renderSideContainer(isDark)}
                <SideContainer
                  justifyContent="flex-start"
                  width={80}
                  height={80}
                >
                  <RightSideBottomContainer
                    data-testid="videoItemDetails"
                    bgColor={backgroundColor}
                  >
                    <NotFoundImage src={imageUrl} alt="not found" />
                    <Heading color={headingColor}>Page Not Found</Heading>
                    <Para color={paraColor}>
                      we are sorry, the page you requested could not be found.
                    </Para>
                  </RightSideBottomContainer>
                </SideContainer>
              </HomeContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default NotFound
