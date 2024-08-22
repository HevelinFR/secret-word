//Css
import "./App.css";
//React
import { useCallback, useEffect, useState } from "react";
//Data
import { wordsList } from "./data/words";
//Components
import StartScreen from "./components/StartScreen";
import { Game } from "./components/Game";
import { GameOver } from "./components/GameOver";

const stages = [
    {
        id: 1,
        name: "start",
    },
    {
        id: 2,
        name: "game",
    },
    {
        id: 3,
        name: "end",
    },
];

const guessesQty = 3;

function App() {
    const [gameStage, setGameStage] = useState(stages[0].name);
    const [words] = useState(wordsList);

    const [pickedWord, setPickedWord] = useState("");
    const [pickedCategory, setPickedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedletters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(guessesQty);
    const [score, setScore] = useState(0);

    const pickWordAndCategory = useCallback(() => {
        const categories = Object.keys(words);
        const category =
            categories[
                Math.floor(Math.random() * Object.keys(categories).length)
            ];
        const word =
            words[category][Math.floor(Math.random() * words[category].length)];

        return { word, category };
    }, [words]);
    //start the secret word game
    const startGame = useCallback(() => {
        //clear all letters
        clearLettersStates();
        //pick word and pick category
        const { word, category } = pickWordAndCategory();

        //create array of letters
        let wordLetters = word.split("");
        wordLetters = wordLetters.map((l) => l.toLowerCase());

        //fill states
        setPickedWord(word);
        setPickedCategory(category);
        setLetters(wordLetters);

        setGameStage(stages[1].name);
    }, [pickWordAndCategory]);

    //process the letter input
    const verifyLetter = (letter) => {
        const normalizeLetter = letter.toLowerCase();

        //check if letter has already been utilized
        if (
            guessedletters.includes(normalizeLetter) ||
            wrongLetters.includes(normalizeLetter)
        ) {
            return;
        }

        //push guessed letter or remove a guess
        if (letters.includes(normalizeLetter)) {
            setGuessedLetters((actualGuessedLetters) => [
                ...actualGuessedLetters,
                normalizeLetter,
            ]);
        } else {
            setWrongLetters((actualWrongLetters) => [
                ...actualWrongLetters,
                normalizeLetter,
            ]);
            setGuesses((actualGuesses) => actualGuesses - 1);
        }
    };
    const clearLettersStates = () => {
        setGuessedLetters([]);
        setWrongLetters([]);
    };
    useEffect(() => {
        if (guesses <= 0) {
            clearLettersStates();
            setGameStage(stages[2].name);
        }
    }, [guesses]);

    //check win condition
    useEffect(() => {
        const uniqueLetters = [...new Set(letters)];
        //win condition
        if (guessedletters.length != 0) {
            if (guessedletters.length === uniqueLetters.length) {
                //added score
                setScore((actualScore) => (actualScore += 100));
                //restar game
                startGame();
            }
        }
    }, [guessedletters, letters, startGame]);

    //restarts the game
    const retry = () => {
        setScore(0);
        setGuesses(guessesQty);
        setGameStage(stages[0].name);
    };

    return (
        <>
            <div className="App">
                {gameStage === "start" && (
                    <StartScreen startGame={startGame}></StartScreen>
                )}
                {gameStage === "game" && (
                    <Game
                        verifyLetter={verifyLetter}
                        pickedWord={pickedWord}
                        pickedCategory={pickedCategory}
                        letters={letters}
                        guessedletters={guessedletters}
                        wrongLetters={wrongLetters}
                        guesses={guesses}
                        score={score}
                    ></Game>
                )}
                {gameStage === "end" && (
                    <GameOver retry={retry} score={score}></GameOver>
                )}
            </div>
        </>
    );
}

export default App;
