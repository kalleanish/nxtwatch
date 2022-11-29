import React from 'react'

const ThemeContext = React.createContext({
  isDark: '',
  changeTheme: () => {},
  savedVideosList: [],
  addToSaveVideos: () => {},
})

export default ThemeContext
