import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsForm from './HatsForm';
import HatsList from './HatsList'
import ShoesForm from './ShoesForm';
import ShoesList from './ShoesList'

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/hats/" element = {<HatsForm/>}/>
          <Route path="/hatslist/" element={<HatsList />} />
          <Route path="/shoes" element={<ShoesForm />} />
          <Route path="/shoeslist" element={<ShoesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
