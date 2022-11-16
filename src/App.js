// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Calendar } from './pages/Calendar';
import { Categories } from './pages/Categories';
import { Registration } from './pages/Registration';
import { Operations } from './pages/Operations';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Categories />} />
          <Route path='/operations' element={<Operations />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
    </div>
  );
}

export default App;
