// PhysicsHangman.jsx
import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './VirtualKeyboard';  // Asegúrate de que la ruta de este archivo sea correcta

const physicsTerms = [
    { term: "RELATIVIDAD", info: "Albert Einstein desarrolló la teoría de la relatividad, que transformó nuestra comprensión del espacio, el tiempo y la gravedad." },
    { term: "NEWTON", info: "Isaac Newton formuló las leyes de la mecánica y también hizo descubrimientos pioneros en óptica y cálculo." },
    { term: "CUANTICA", info: "La mecánica cuántica es una parte fundamental de la física que explica el comportamiento de la materia y la energía a escalas muy pequeñas." }
];


const hangmanImages = [
    'src/assets/img/plataforma.png',
    'src/assets/img/Group 1.png',
    'src/assets/img/Group 2.png',
    'src/assets/img/Group3.png',
    'src/assets/img/Group4.png',
    'src/assets/img/Group5.png',
    'src/assets/img/Group6.png'
];

const PhysicsHangman = () => {
    const [currentTerm, setCurrentTerm] = useState({});
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [errors, setErrors] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [hasWon, setHasWon] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        const newTerm = physicsTerms[Math.floor(Math.random() * physicsTerms.length)];
        setCurrentTerm(newTerm);
        setGuessedLetters([]);
        setErrors(0);
        setGameOver(false);
        setHasWon(false);
    };

    const guessLetter = (letter) => {
        if (!currentTerm.term.includes(letter.toUpperCase())) {
            setErrors(prevErrors => prevErrors + 1);  // Incrementa el error si la letra no está en la palabra
        }
        if (!guessedLetters.includes(letter.toUpperCase())) {
            setGuessedLetters(prev => [...prev, letter.toUpperCase()]);  // Agrega la letra a las adivinadas
            checkWin(currentTerm.term, guessedLetters, letter);
        }
    };

    const checkWin = (term) => {
        const isWin = term.split('').every(letter => guessedLetters.includes(letter));
        if (isWin || errors >= 6) {
            setHasWon(isWin);
            setGameOver(true);
        }
    };

    const displayWord = currentTerm.term ? currentTerm.term.split('').map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ") : "";

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="physics-hangman bg-white bg-opacity-80 p-8 rounded-lg shadow-md">
                <img src={hangmanImages[Math.min(errors, hangmanImages.length - 1)]} alt="Hangman" className="mb-4" />
                <p className="text-xl">Intenta adivinar la palabra: {displayWord}</p>
                {!gameOver && <VirtualKeyboard onGuess={guessLetter} guessedLetters={guessedLetters} />}
                {gameOver && (
                    <div className="mt-4">
                        <p className="text-xl">{hasWon ? "¡Felicidades!" : "Mejor suerte la próxima vez."}</p>
                        <p className="text-lg mt-2">Curiosidad sobre el término: {currentTerm.info}</p>
                        <button onClick={resetGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">Jugar de nuevo</button>
                    </div>
                )}
                <p className="text-lg mt-4">Errores: {errors}</p>
            </div>
        </div>



    );
};

export default PhysicsHangman;
