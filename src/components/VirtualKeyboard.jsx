import React from 'react';

const VirtualKeyboard = ({ onGuess, guessedLetters }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="keyboard">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    onClick={() => onGuess(letter)}
                    disabled={guessedLetters.includes(letter)}
                    className="key"
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default VirtualKeyboard;
