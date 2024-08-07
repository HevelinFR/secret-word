import "./StartScreen.css"
function StartScreen({startGame}) {
  return (
    <div>
        <div className="start">
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button onClick={startGame}>Começar o jogar</button>
      </div>
    </div>
  )
}

export default StartScreen