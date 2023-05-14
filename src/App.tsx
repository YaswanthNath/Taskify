import React from 'react';
import './App.css';
import LoginForm from './Pages/LoginForm/LoginForm';
import AllTasks from './Pages/TasksHome/AllTasks';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/home' element={<AllTasks/>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
