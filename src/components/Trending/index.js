import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaGamepad} from 'react-icons/fa'
import {HiFire} from 'react-icons/hi'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
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
  RetryButton,
  Reason,
  EmptyViewContainer,
  TopContainer,
  LogoElement,
  Heading,
  LoaderContainer,
} from './styledComponents'

const apiUrlStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

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

class Trending extends Component {
  state = {
    videoList: [],
    apiStatus: apiUrlStatusConstant.initial,
  }

  componentDidMount = () => {
    this.getData()
  }

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

            const isClick = eachContent.id === 1
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

  getData = async () => {
    this.setState({apiStatus: apiUrlStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchedData = await fetch(apiUrl, option)
    const data = await fetchedData.json()
    if (fetchedData.ok) {
      const updatedData = data.videos.map(eachVideo => ({
        channel: eachVideo.channel,
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        title: eachVideo.title,
      }))
      console.log(updatedData)
      this.setState({
        videoList: updatedData,
        apiStatus: apiUrlStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiUrlStatusConstant.failure,
      })
    }
  }

  renderLoader = isDark => {
    const color = isDark ? '#ffffff' : '#000000'
    return (
      <LoaderContainer data-testid="loader">
        <Loader type="ThreeDots" color={color} height="50" width="50" />
      </LoaderContainer>
    )
  }

  renderFailure = isDark => {
    const onClickRetry = () => {
      this.setState({apiStatus: apiUrlStatusConstant.inProgress}, this.getData)
    }
    const url = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <EmptyViewContainer>
        <EmptyViewImage src={url} alt="failure view" />
        <HeadingFail>Oops! Something Went Wrong</HeadingFail>
        <Reason>
          We are having some trouble to complete your request. Please try again
        </Reason>
        <RetryButton onClick={onClickRetry} type="button">
          Retry
        </RetryButton>
      </EmptyViewContainer>
    )
  }

  renderSuccess = isDark => {
    const {videoList} = this.state

    return (
      <VideoUnorderedList>
        {videoList.map(eachVideo => {
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
                  <Text color={textColor}>{eachVideo.channel.name}</Text>
                  <Text color={textColor}>
                    {eachVideo.viewCount} views {timeDifference} ago
                  </Text>
                </TextContainer>
              </VideoListItem>
            </Link>
          )
        })}
      </VideoUnorderedList>
    )
  }

  renderApiData = isDark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiUrlStatusConstant.success:
        return this.renderSuccess(isDark)
      case apiUrlStatusConstant.failure:
        return this.renderFailure(isDark)
      case apiUrlStatusConstant.inProgress:
        return this.renderLoader(isDark)
      default:
        return null
    }
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
        <Heading color={colorHeading}>Trending</Heading>
      </TopContainer>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const backgroundColor = isDark ? '#0f0f0f' : '#f8fafc'
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
                  {this.renderTop(isDark)}
                  <RightSideBottomContainer
                    data-testid="trending"
                    bgColor={backgroundColor}
                  >
                    {this.renderApiData(isDark)}
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

export default Trending
