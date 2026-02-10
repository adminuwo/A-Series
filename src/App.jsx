import './App.css'
import NavigationProvider from './Navigation.Provider'
import { RecoilRoot } from 'recoil'

import { ThemeProvider } from './context/ThemeContext'

import { PersonalizationProvider } from './context/PersonalizationContext'

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <PersonalizationProvider>
          <NavigationProvider />
        </PersonalizationProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
