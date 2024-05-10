import React from 'react';

const VirtualKeyboard = ({ onGuess, guessedLetters }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="keyboard flex flex-wrap justify-center">
            {alphabet.map((letter) => (
                <button
                key={letter}
                onClick={() => onGuess(letter)}
                disabled={guessedLetters.includes(letter)}
                className="key m-1 relative"
                style={{
                    backgroundImage: `url(src/assets/keys/${letter}.png)`,
                    backgroundSize: 'cover',
                    width: '50px',  // Ajusta al tamaño real de tus imágenes
                    height: '50px', // Ajusta al tamaño real de tus imágenes
                    color: 'transparent',
                    border: 'none',
                }}
            >
                {letter}
            </button>
            
            ))}
        </div>
    );
};

export default VirtualKeyboard;
