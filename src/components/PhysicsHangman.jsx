// PhysicsHangman.jsx
import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './VirtualKeyboard';  // Asegúrate de que la ruta de este archivo sea correcta

const physicsTerms = [
    { term: "RELATIVIDAD", info: "Albert Einstein desarrolló la teoría de la relatividad, que transformó nuestra comprensión del espacio, el tiempo y la gravedad." },
    { term: "NEWTON", info: "Isaac Newton formuló las leyes de la mecánica y también hizo descubrimientos pioneros en óptica y cálculo." },
    { term: "CUANTICA", info: "La mecánica cuántica es una parte fundamental de la física que explica el comportamiento de la materia y la energía a escalas muy pequeñas." }
];

// Rutas a las imágenes del ahorcado
const hangmanImages = [
    'https://karenkm521.github.io/JuegoDelAhorcado/imagenes/muneco0.png', 
    'https://karenkm521.github.io/JuegoDelAhorcado/imagenes/muneco1.png', 
    'https://karenkm521.github.io/JuegoDelAhorcado/imagenes/muneco2.png', 
    'https://karenkm521.github.io/JuegoDelAhorcado/imagenes/muneco3.png', 
    'https://karenkm521.github.io/JuegoDelAhorcado/imagenes/muneco4.png', 
    'https://karenkm521.github.io/JuegoDelAhorcado/imagenes/muneco5.png', 
    'https://karenkm521.github.io/JuegoDelAhorcado/imagenes/muneco6.png' // 7 error (juego terminado)
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
        <div className="physics-hangman">
            <img src={hangmanImages[Math.min(errors, hangmanImages.length - 1)]} alt="Hangman" />
            <p>Intenta adivinar la palabra: {displayWord}</p>
            {!gameOver && <VirtualKeyboard onGuess={guessLetter} guessedLetters={guessedLetters} />}
            {gameOver && (
                <div>
                    <p>{hasWon ? "¡Felicidades!" : "Mejor suerte la próxima vez."}</p>
                    <p>Curiosidad sobre el término: {currentTerm.info}</p>
                    <button onClick={resetGame}>Jugar de nuevo</button>
                </div>
            )}
            <p>Errores: {errors}</p>
        </div>
    );
};

export default PhysicsHangman;
