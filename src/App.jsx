import React from 'react';
import './App.css';
import PhysicsHangman from './components/PhysicsHangman';

function App() {
  return (
    <div className="app-container" style={{backgroundImage: `url('src/assets/img/fondo.jpg')`, backgroundSize: 'cover'}}>
      <h1 className='text-red-500'>Physic Game Hangman</h1>
      <PhysicsHangman />
    </div>
  );
}

export default App;
