import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsForm from './HatsForm';
import ShoeForm from './ShoeForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/hats/" element = {<HatsForm/>}/>
          <Route path="/shoes" element={<ShoeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
