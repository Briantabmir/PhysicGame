import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './VirtualKeyboard';  // Asegúrate de que la ruta de este archivo sea correcta

const physicsTerms = [
    { term: "RELATIVIDAD", info: "Albert Einstein desarrolló la teoría de la relatividad, que transformó nuestra comprensión del espacio, el tiempo y la gravedad.", hint: "Teoría de Einstein sobre el tiempo y espacio" },
    { term: "NEWTON", info: "Isaac Newton formuló las leyes de la mecánica y también hizo descubrimientos pioneros en óptica y cálculo.", hint: "Leyes de la mecánica" },
    { term: "CUANTICA", info: "La mecánica cuántica es una parte fundamental de la física que explica el comportamiento de la materia y la energía a escalas muy pequeñas.", hint: "Teoría sobre partículas muy pequeñas" },
    { term: "PASTEURIZACION", info: "Este proceso, nombrado en honor a Louis Pasteur, revolucionó la seguridad alimentaria en el siglo XIX al extender la vida útil de los alimentos y eliminar patógenos.", hint: "Proceso científico nombrado en honor a un microbiólogo francés, clave en la prevención de enfermedades transmitidas por alimentos." }
];

const hangmanImages = [
    'src/assets/img/Frame0.png',
    'src/assets/img/Frame1.png',
    'src/assets/img/Frame2.png',
    'src/assets/img/Frame3.png',
    'src/assets/img/Frame4.png',
    'src/assets/img/Frame5.png',
    'src/assets/img/Frame6.png'
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
        let newGuessedLetters = guessedLetters;
        if (!guessedLetters.includes(letter.toUpperCase())) {
            newGuessedLetters = [...guessedLetters, letter.toUpperCase()]; // Prepara el nuevo estado de las letras adivinadas
            setGuessedLetters(newGuessedLetters); // Actualiza el estado de las letras adivinadas
        }

        if (!currentTerm.term.includes(letter.toUpperCase())) {
            setErrors(prevErrors => prevErrors + 1); // Incrementa el error si la letra no está en la palabra
        }

        // Llama a checkWin después de actualizar guessedLetters
        setTimeout(() => checkWin(currentTerm.term, newGuessedLetters), 0);
    };

    const checkWin = (term, guessedLetters) => {
        const isWin = term.split('').every(letter => guessedLetters.includes(letter));
        if (isWin || errors >= 5) {
            setHasWon(isWin);
            setGameOver(true);
        }
    };

    const displayWord = currentTerm.term ? currentTerm.term.split('').map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ") : "";

    return (
        <div className="flex justify-center items-start h-screen">
            <div className="relative w-full max-w-screen-lg mx-auto flex flex-col items-center pt-12">
                <div className="w-full flex flex-row justify-center items-center bg-white bg-opacity-50 p-4 rounded-lg shadow">
                    <img src={hangmanImages[Math.min(errors, hangmanImages.length - 1)]} alt="Hangman" className="mb-4" />
                    <p className="text-2xl text-black font-semibold mt-4 bg-white bg-opacity-50 p-4 rounded-lg shadow">Errores: {errors}</p>
                </div>
                <div className="w-full flex flex-col items-center mt-1">
                    <p className="text-2xl font-bold text-black mt-2 mb-2 bg-white bg-opacity-50 p-4 rounded-lg shadow">Intenta adivinar la palabra: {displayWord}</p>
                    <p className="text-xl text-gray-800 mt-2 mb-2 bg-white bg-opacity-75 p-3 rounded-lg shadow">Pista: {currentTerm.hint}</p>
                    {!gameOver && (
                        <VirtualKeyboard onGuess={guessLetter} guessedLetters={guessedLetters} />
                    )}
                    {gameOver && (
                        <div className="flex flex-col items-center mt-2 bg-white bg-opacity-50 p-4 rounded-lg shadow">
                            <p className="text-2xl font-bold text-black">{hasWon ? "¡Felicidades!" : "Mejor suerte la próxima vez."}</p>
                            <p className="text-2xl text-black font-semibold mt-2">Curiosidad: {currentTerm.info}</p>
                            <button onClick={resetGame} className="bg-yellow-700 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-4 rounded self-center">Jugar de nuevo</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhysicsHangman;
