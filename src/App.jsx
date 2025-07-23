import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Details from './Pages/Details';
import { ItemsContextProvider } from './Components/Context/Item';
import Search from './Pages/Search';

function App() {
  return (
    <ItemsContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<Details />} />
        <Route path="/search" element={<Search />} /> 
      </Routes>
    </ItemsContextProvider>
  )
}

export default App
