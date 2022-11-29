import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaGamepad} from 'react-icons/fa'
import {HiFire} from 'react-icons/hi'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNow} from 'date-fns'
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
  VideoUnorderedList,
  VideoThumbNail,
  VideoListItem,
  TextContainer,
  Title,
  Text,
  EmptyViewImage,
  HeadingFail,
  EmptyViewContainer,
  TopContainer,
  LogoElement,
  Heading,
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

class SavedVideos extends Component {
  renderSideContainer = isDark => (
    <SideContainer
      width={20}
      isDark={isDark}
      height={80}
      justifyContent="space-between"
    >
      <nav>
        <UnorderedList>
          {sideBarContent.map(eachContent => {
            const {icon} = eachContent

            const isClick = eachContent.id === 3
            let activeBgColor = 'transparent'
            let activeColor = ''
            let fontWeight = 'normal'
            if (isClick) {
              activeBgColor = isDark ? '#424242' : '#f1f5f9'
              activeColor = 'red'
              fontWeight = 'bold'
            }

            return (
              <Link className="link-style" to={eachContent.link}>
                <ListElement
                  bgColor={activeBgColor}
                  key={eachContent.id}
                  color={activeColor}
                >
                  {icon}
                  <ListItem isDark={isDark} fontWeight={fontWeight}>
                    {eachContent.title}
                  </ListItem>
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

  renderEmptyView = isDark => {
    const color1 = isDark ? '#ffffff' : '#212121'
    const bgColor = isDark ? '#0f0f0f' : '#ebebeb'
    return (
      <EmptyViewContainer bgColor={bgColor}>
        <EmptyViewImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
        />
        <HeadingFail color={color1}>No saved videos found</HeadingFail>
        <p>You can save your videos while watching them</p>
      </EmptyViewContainer>
    )
  }

  renderSuccess = (isDark, savedVideosList) => {
    const isEmpty = savedVideosList.length === 0
    const backgroundColor = isDark ? '#0f0f0f' : '#f8fafc'
    return (
      <>
        {isEmpty ? (
          this.renderEmptyView(isDark)
        ) : (
          <SideContainer justifyContent="flex-start" width={80} height={80}>
            {this.renderTop(isDark)}
            <RightSideBottomContainer
              data-testid="savedVideos"
              bgColor={backgroundColor}
            >
              <VideoUnorderedList>
                {savedVideosList.map(eachVideo => {
                  const timeDifference = formatDistanceToNow(
                    new Date(eachVideo.publishedAt),
                  )
                  const {id} = eachVideo
                  const titleColor = isDark ? '#ffffff' : '#212121'
                  const textColor = isDark ? '#94a3b8' : '#64748b'

                  return (
                    <Link className="link-style" to={`/videos/${id}`}>
                      <VideoListItem key={eachVideo.id}>
                        <VideoThumbNail
                          src={eachVideo.thumbnailUrl}
                          alt="video thumbnail"
                        />
                        <TextContainer>
                          <Title color={titleColor}>{eachVideo.title}</Title>
                          <Text color={textColor}>
                            {eachVideo.channel.name}
                          </Text>
                          <Text color={textColor}>
                            {eachVideo.viewCount} views . {timeDifference} ago
                          </Text>
                        </TextContainer>
                      </VideoListItem>
                    </Link>
                  )
                })}
              </VideoUnorderedList>
            </RightSideBottomContainer>
          </SideContainer>
        )}
      </>
    )
  }

  renderTop = isDark => {
    const backgroundColor = isDark ? '#231f20' : '#ebebeb'
    const logoBgColor = isDark ? '#181818' : '#d7dfe9'
    const colorHeading = isDark ? '#ffffff' : '#212121'
    return (
      <TopContainer bgColor={backgroundColor}>
        <LogoElement bgColor={logoBgColor}>
          <HiFire />
        </LogoElement>
        <Heading color={colorHeading}>Saved Videos</Heading>
      </TopContainer>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, savedVideosList} = value

          return (
            <>
              <Header />
              <HomeContainer alignItem="flex-start">
                {this.renderSideContainer(isDark)}
                {this.renderSuccess(isDark, savedVideosList)}
              </HomeContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos