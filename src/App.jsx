import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Details from './Pages/Details';
import Search from './Pages/Search';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details' element={<Details />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}

export default App
