import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './VirtualKeyboard'; 

const physicsTerms = [
    { term: "RELATIVIDAD", info: "Albert Einstein desarrolló la teoría de la relatividad, que transformó nuestra comprensión del espacio, el tiempo y la gravedad.", hint: "Teoría de Einstein sobre el tiempo y espacio" },
    { term: "NEWTON", info: "Isaac Newton formuló las leyes de la mecánica y también hizo descubrimientos pioneros en óptica y cálculo.", hint: "Leyes de la mecánica" },
    { term: "CUANTICA", info: "La mecánica cuántica es una parte fundamental de la física que explica el comportamiento de la materia y la energía a escalas muy pequeñas.", hint: "Teoría sobre partículas muy pequeñas" },
    { term: "PASTEURIZACION", info: "Este proceso, nombrado en honor a Louis Pasteur, revolucionó la seguridad alimentaria en el siglo XIX al extender la vida útil de los alimentos y eliminar patógenos.", hint: "Proceso científico nombrado en honor a un microbiólogo francés, clave en la prevención de enfermedades transmitidas por alimentos." },
    { term: "TERMODINAMICA", info: "La termodinámica es el estudio de la transferencia de energía en forma de calor y trabajo en procesos químicos y físicos.", hint: "Estudio de la transferencia de energía" },
    { term: "ELECTROMAGNETISMO", info: "Estudio de las fuerzas eléctricas y magnéticas, que llevó al desarrollo de tecnologías como el motor eléctrico y la radio.", hint: "Teoría sobre fuerzas eléctricas y magnéticas" },
    { term: "MECANICA CLASICA", info: "Rama de la física que se ocupa del movimiento de cuerpos bajo la influencia de sistemas de fuerzas.", hint: "Estudio del movimiento de cuerpos bajo fuerzas" },
    { term: "ENTROPIA", info: "Medida de desorden o aleatoriedad en un sistema, clave en el segundo principio de la termodinámica.", hint: "Medida de desorden en un sistema" },
    { term: "PLASMA", info: "Uno de los cuatro estados fundamentales de la materia, consistente en un gas ionizado con carga eléctrica neta neutra.", hint: "Estado de la materia con gas ionizado" },
    { term: "NEUTRINO", info: "Partícula elemental casi sin masa y que apenas interactúa con la materia, lo que la hace extremadamente difícil de detectar.", hint: "Partícula elemental difícil de detectar" },
    { term: "FOTOLISIS", info: "Proceso químico por el cual la energía de la luz se utiliza para romper enlaces químicos, como en la fotosíntesis.", hint: "Proceso donde la luz rompe enlaces químicos" },
    { term: "VACUNACION", info: "Louis Pasteur desarrolló el concepto de vacunas para prevenir enfermedades. Sus investigaciones sobre la rabia condujeron a la creación de la primera vacuna para esta enfermedad en humanos.", hint: "Desarrollo de inmunizaciones para prevenir enfermedades por Pasteur" }

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

const CongratulationsModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="mt-4" style={{ fontSize: '20px', color: 'black' }}>{content}</p>
                <div className="flex justify-center mt-4">
                    <button onClick={onClose} className="bg-yellow-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

const PhysicsHangman = () => {
    const [currentTerm, setCurrentTerm] = useState({});
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [errors, setErrors] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [wordsPlayed, setWordsPlayed] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(3);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        if (wordsPlayed < 5 && totalAttempts > 0) {
            const newTerm = physicsTerms[Math.floor(Math.random() * physicsTerms.length)];
            setCurrentTerm(newTerm);
            setGuessedLetters([]);
            setErrors(0);
            setGameOver(false);
            setHasWon(false);
            setIsModalOpen(false);
        } else {
            const score = Math.round((correctAnswers / 5) * 10);
            setModalTitle("Juego Completado");
            setModalContent(`Tu puntuación final es: ${score} sobre 10`);
            setIsModalOpen(true);
            setWordsPlayed(0);
            setTotalAttempts(3);
            setCorrectAnswers(0);
        }
    };

    const guessLetter = (letter) => {
        const upperLetter = letter.toUpperCase();
        if (!guessedLetters.includes(upperLetter)) {
            setGuessedLetters(prevLetters => [...prevLetters, upperLetter]);
            if (!currentTerm.term.includes(upperLetter)) {
                setErrors(prevErrors => {
                    const newErrors = prevErrors + 1;
                    if (newErrors >= 6) {
                        setGameOver(true);
                        setHasWon(false);
                        setTotalAttempts(prev => prev - 1);
                        setWordsPlayed(prev => prev + 1);
                        if (totalAttempts <= 1) {
                            const score = Math.round((correctAnswers / 5) * 10);
                            setModalTitle("Juego Completado");
                            setModalContent(`Tu puntuación final es: ${score} sobre 10`);
                            setIsModalOpen(true);
                            setWordsPlayed(0);
                            setTotalAttempts(3);
                            setCorrectAnswers(0);
                        } else {
                            setModalTitle("Mejor suerte la próxima vez.");
                            setModalContent("Intenta con otra palabra!");
                            setIsModalOpen(true);
                        }
                        return newErrors;
                    }
                    return newErrors;
                });
            } else {
                setTimeout(() => checkWin(currentTerm.term, [...guessedLetters, upperLetter]), 0);
            }
        }
    };

    const checkWin = (term, guessedLetters) => {
        const isWin = term.split('').every(letter => guessedLetters.includes(letter));
        if (isWin) {
            setGameOver(true);
            setHasWon(true);
            setCorrectAnswers(prev => prev + 1);
            setModalTitle("¡Felicidades!");
            setModalContent(`Curiosidad: ${currentTerm.info}`);
            setIsModalOpen(true);
            setWordsPlayed(prev => prev + 1);
            if (wordsPlayed >= 4) {
                const score = Math.round((correctAnswers / 5) * 10);
                setModalTitle("Juego Completado");
                setModalContent(`Tu puntuación final es: ${score} sobre 10`);
                setIsModalOpen(true);
                setWordsPlayed(0);
                setTotalAttempts(3);
                setCorrectAnswers(0);
            }
        }
    };

    const displayWord = currentTerm.term ? currentTerm.term.split('').map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ") : "";

    return (
        <div className="flex justify-center items-start h-screen">
            <div className="relative w-full max-w-screen-lg mx-auto flex flex-col items-center pt-12">
                <div className="w-full flex flex-row justify-center items-center bg-white bg-opacity-50 p-4 rounded-lg shadow">
                    <img src={hangmanImages[Math.min(errors, hangmanImages.length - 1)]} alt="Hangman" className="mb-4" />
                    <p className="text-2xl text-black font-semibold mt-4">Errores: {errors}</p>
                </div>
                <div className="w-full flex flex-col items-center mt-1">
                    <p className="text-2xl font-bold text-black mt-2 mb-2 bg-white bg-opacity-50 p-4 rounded-lg shadow">Intenta adivinar la palabra: {displayWord}</p>
                    <p className="text-xl text-gray-800 mt-2 mb-2 bg-white bg-opacity-75 p-3 rounded-lg shadow">Pista: {currentTerm.hint}</p>
                    {!gameOver && (
                        <VirtualKeyboard onGuess={guessLetter} guessedLetters={guessedLetters} />
                    )}
                    {gameOver && (
                        <div className="flex flex-col items-center mt-2 bg-white bg-opacity-50 p-4 rounded-lg shadow">
                            <button onClick={resetGame} className="bg-yellow-700 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-4 rounded self-center">Jugar de nuevo</button>
                        </div>
                    )}
                </div>
            </div>
            <CongratulationsModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    if (gameOver) {
                        resetGame();
                    }
                }}
                title={modalTitle}
                content={modalContent}
            />
        </div>
    );
};

export default PhysicsHangman;
