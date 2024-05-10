import React from 'react';
import './App.css';
import PhysicsHangman from './components/PhysicsHangman';
import clockGif from './assets/img/reloj.gif';  

function App() {
  return (
    <div className="app-container" style={{backgroundImage: `url('src/assets/img/fondo.jpg')`, backgroundSize: 'cover', position: 'relative'}}>
      <div style={{ position: 'absolute', top: '15%', right: '12%', width: '110px', height: '110px' }}>
        <img src={clockGif} alt="Clock" style={{ width: '100%', height: '100%' }} />
      </div>
      <h1 className='text-zinc-800 font-mono hover:font-serif text-7xl font-extrabold flex justify-center'>Physics Game Hangman</h1>
      <PhysicsHangman />
    </div>
  );
}

export default App;
