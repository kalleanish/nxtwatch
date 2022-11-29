import styled from 'styled-components/macro'

export const HomeContainer = styled.div`
  display: flex;
  background-image: url(${props => props.bgImage});
  background-size: 100% 100%;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItem};
`

export const MediaLogo = styled.img`
  height: 35px;
  width: 35px;
  margin-left: 20px;
`

export const SideBarPara = styled.p`
  color: ${props => (props.isDark === true ? '#f4f4f4' : '#231f20')};
  font-weight: bold;
  margin-bottom: 30px;
  font-size: 20px;
  padding-left: 20px;
`
export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justifyContent};
  min-height: ${props => props.height}vw;
  padding-top: 20px;
  padding-right: 0;
  width: ${props => props.width}vw;
  padding-top: 0;
  background-color: ${props => (props.isDark === true ? '#181818' : '#ffffff')};
  position: sticky;
`
export const UnorderedList = styled.ul`
  padding-left: 0;
  margin-left: 0;
`

export const ListElement = styled.li`
  display: flex;
  list-style: none;
  align-items: center;
  padding-left: 20px;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
`

export const ListItem = styled.p`
  margin-left: 20px;
  font-weight: ${props => props.fontWeight};
  color: ${props => (props.isDark === true ? '#ffffff' : '#383838')};
`

export const RightSideBottomContainer = styled.div`
  width: 80vw;
  min-height: 100vh;
  background-color: ${props => props.bgColor};
  padding-left: 20px;
`

export const VideoListItem = styled.li`
  list-style: none;
  display: flex;
  margin-left: 40px;
  margin-top: 40px;
`
export const VideoThumbNail = styled.img`
  height: 200px;
  width: 350px;
`
export const VideoUnorderedList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`
export const TextContainer = styled.div`
  margin-left: 20px;
  width: 400px;
`
export const Title = styled.p`
  color: ${props => props.color};
  font-size: 22px;
  font-weight: bold;
`

export const Text = styled.p`
  color: ${props => props.color};
  margin-top: 5px;
  margin-bottom: 5px;
`
export const EmptyViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 165vh;
  background-color: ${props => props.bgColor};
`
export const EmptyViewImage = styled.img`
  height: 400px;
  width: 550px;
  margin-top: 20px;
`
export const HeadingFail = styled.h1`
  color: #212121;
`
export const RetryButton = styled.button`
  height: 36px;
  width: 100px;
  background-color: #4f46e5;
  border: none;
  color: white;
`
export const TopContainer = styled.div`
  height: 150px;
  background-color: ${props => props.bgColor};
  display: flex;
  align-items: center;
`
export const LogoElement = styled.div`
  background-color: ${props => props.bgColor};
  height: 80px;
  width: 80px;
  border-radius: 40px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: red;
  margin-left: 50px;
`
export const Heading = styled.h1`
  color: ${props => props.color};
`
