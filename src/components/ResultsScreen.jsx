function ResultsScreen({ score, totalQuestions, results, onRestart }) {
  return (
    <main className="results-card">
      <h2>Quiz complete</h2>
      <p>
        You scored <strong>{score}</strong> out of {totalQuestions}.
      </p>

      <div className="results-list">
        {results.map((result, index) => (
          <article
            className={`result-item ${result.isCorrect ? 'result-correct' : result.expired ? 'result-expired' : 'result-wrong'}`}
            key={index}
          >
            <h3>{index + 1}. {result.question}</h3>
            <p>
              Your answer: <strong>{result.selectedText}</strong>
            </p>
            <p>
              Correct answer: <strong>{result.correctText}</strong>
            </p>
          </article>
        ))}
      </div>

      <button className="primary-button" onClick={onRestart}>
        Restart Quiz
      </button>
    </main>
  )
}

export default ResultsScreen
