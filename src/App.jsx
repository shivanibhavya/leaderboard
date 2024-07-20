import React from 'react'
import Leaderboard from './Leaderboard'
import "./App.css"
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Leaderboard</h1>
      </header>
      <main>
        <Leaderboard />
      </main>
      <footer className="App-footer">
        <p>Leaderboard App © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App