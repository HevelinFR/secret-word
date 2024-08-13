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

function App() {
    const [gameStage, setGameStage] = useState(stages[0].name);
    const [words] = useState(wordsList);

    const [pickedWord, setPickedWord] = useState("");
    const [pickedCategory, setPickedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedletters, setGuesseLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(3);
    const [score, setScore] = useState(0);

    const pickWordAndCategory = () => {
        const categories = Object.keys(words);
        const category =
            categories[
                Math.floor(Math.random() * Object.keys(categories).length)
            ];
        const word =
            words[category][Math.floor(Math.random() * words[category].length)];

        return { word, category };
    };
    //start the secret word game
    const startGame = () => {
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
    };

    //process the letter input
    const verifyLetter = () => {
        setGameStage(stages[2].name);
    };

    //restarts the game
    const retry = () => {
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
                {gameStage === "end" && <GameOver retry={retry}></GameOver>}
            </div>
        </>
    );
}

export default App;
