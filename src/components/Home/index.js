import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {MdPlaylistAdd} from 'react-icons/md'
import {FaGamepad} from 'react-icons/fa'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
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
  BannerTitle,
  BannerLogo,
  BannerButton,
  CloseButton,
  RightSideBottomContainer,
  SearchBar,
  SearchInput,
  SearchButton,
  VideoUnorderedList,
  VideoThumbNail,
  VideoListItem,
  DetailContainer,
  Logo,
  TextContainer,
  Title,
  EmptyViewImage,
  HeadingFail,
  RetryButton,
  Reason,
  EmptyViewContainer,
  LoaderContainer,
} from './styledComponents'
import './index.css'

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

class Home extends Component {
  state = {
    searchInput: '',
    videoList: [],
    apiStatus: apiUrlStatusConstant.initial,
    showBanner: true,
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

            const isClick = eachContent.id === 0
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

  componentDidMount = () => {
    this.getData()
  }

  removeBanner = () => {
    this.setState({showBanner: false})
  }

  getData = async () => {
    this.setState({apiStatus: apiUrlStatusConstant.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

  renderEmptyView = isDark => {
    const onClickRetry = () => {
      this.setState({apiStatus: apiUrlStatusConstant.inProgress}, this.getData)
    }
    const color = isDark ? '#ffffff' : '#212121'
    return (
      <EmptyViewContainer>
        <EmptyViewImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <HeadingFail color={color}>No Search results found</HeadingFail>
        <Reason>Try different key words or remove search filter</Reason>
        <RetryButton onClick={onClickRetry} type="button">
          Retry
        </RetryButton>
      </EmptyViewContainer>
    )
  }

  renderFailureView = isDark => {
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

    const isEmpty = videoList.length === 0

    return (
      <VideoUnorderedList>
        {isEmpty
          ? this.renderEmptyView(isDark)
          : videoList.map(eachVideo => {
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
                    <DetailContainer>
                      <Logo
                        src={eachVideo.channel.profile_image_url}
                        alt="channel logo"
                      />
                      <TextContainer>
                        <Title color={titleColor}>{eachVideo.title}</Title>
                        <Title color={textColor}>
                          {eachVideo.channel.name}
                        </Title>
                        <Title color={textColor}>
                          {eachVideo.viewCount} views {timeDifference} ago
                        </Title>
                      </TextContainer>
                    </DetailContainer>
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
        return this.renderFailureView(isDark)
      case apiUrlStatusConstant.inProgress:
        return this.renderLoader(isDark)
      default:
        return null
    }
  }

  renderBanner = isDark => {
    const bannerImage =
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png'
    const bannerLogo = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

    return (
      <HomeContainer
        data-testid="banner"
        justifyContent="space-between"
        bgImage={bannerImage}
      >
        <div>
          <BannerLogo src={bannerLogo} alt="nxt watch logo" />
          <BannerTitle>
            Buy Nxt Watch Premium prepaid plans with <br /> UPI
          </BannerTitle>
          <BannerButton type="button">GET IT NOW</BannerButton>
        </div>
        <CloseButton
          data-testid="close"
          onClick={this.removeBanner}
          type="button"
        >
          <AiOutlineClose />
        </CloseButton>
      </HomeContainer>
    )
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getData)
  }

  render() {
    const {showBanner} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const backgroundColor = isDark ? '#181818' : '#f8fafc'
          const borderColor = isDark ? ' #606060' : '#d7dfe9'
          const color = isDark ? '#f1f1f1' : '#212121'

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
                  {showBanner && this.renderBanner(isDark)}
                  <RightSideBottomContainer
                    data-testid="home"
                    bgColor={backgroundColor}
                  >
                    <SearchBar>
                      <SearchInput
                        color={color}
                        borderColor={borderColor}
                        type="search"
                        onChange={this.changeSearchInput}
                        placeholder="Search"
                      />
                      <SearchButton
                        borderColor={borderColor}
                        type="button"
                        data-testid="searchButton"
                        onClick={this.onClickSearch}
                      >
                        <AiOutlineSearch />
                      </SearchButton>
                    </SearchBar>
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

export default Home
