import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/pages/NavigationBar'
import Home from './components/pages/Home'
import Donate from './components/pages/Donate'
import Thankyou from './components/pages/Thankyou'
import NotFound from './components/pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/donate' element={ <Donate /> } />
        <Route path='/thankyou' element={ <Thankyou /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
