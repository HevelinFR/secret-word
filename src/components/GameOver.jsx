import "./GameOver.css"

export const GameOver = ({retry}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <button onClick={retry}>Resetar Jogo</button>
    </div>
  )
}
