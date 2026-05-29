function WelcomeScreen({ totalQuestions, onStart }) {
  return (
    <main className="welcome-card">
      <h2>Welcome to the quiz</h2>
      <p>
        You'll answer {totalQuestions} multiple choice questions.
        Correct answers earn points, and skipped timeouts deduct one point.
      </p>
      <button className="primary-button" onClick={onStart}>
        Start Quiz
      </button>
    </main>
  )
}

export default WelcomeScreen
