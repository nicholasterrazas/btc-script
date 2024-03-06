import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Construct from './components/Construct';
import Test from './components/Test';
import About from './components/About';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element ={<Home/>} />
        <Route path="/construct" element={<Construct/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
}

export default App;
