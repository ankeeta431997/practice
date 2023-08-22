import logo from './logo.svg';
import './App.css';
import Calculator from './components/calculator/Calculator';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter , Routes, Route }from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
const App = () => {
  return (
    <div className="App">
     <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/calculator' element={<Calculator />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App
