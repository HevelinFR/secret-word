import { useState, useRef } from "react";
import PropTypes from 'prop-types';
import "./Game.css";

export const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedletters,
    wrongLetters,
    guesses,
    score,
}) => {
    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter);

        setLetter("");
        letterInputRef.current.focus();
    };
    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra</h1>
            <h3 className="tip">
                Dica sobe a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativas</p>
            <div className="wordContainer">
                {letters.map((letter, i) =>
                    guessedletters.includes(letter) ? (
                        <span className="letter" key={i}>
                            {letter}
                        </span>
                    ) : (
                        <span className="blankSquare" key={i}></span>
                    )
                )}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="letter"
                        maxLength={1}
                        required
                        onChange={(e) => setLetter(e.target.value)}
                        value={letter}
                        ref={letterInputRef}
                    />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, x) => ( 
                    <span key={x}>{letter}, </span>
                ))}
            </div>
        </div>
    );
};
