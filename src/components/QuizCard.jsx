function QuizCard({
  currentQuestion,
  currentIndex,
  totalQuestions,
  score,
  timeLeft,
  hasAnswered,
  answerState,
  onSelectAnswer,
  onNext,
}) {
  const getOptionClass = (optionIndex) => {
    if (!hasAnswered) {
      return 'answer-button'
    }

    if (optionIndex === answerState.correctIndex) {
      return 'answer-button correct'
    }

    if (
      answerState.selectedIndex === optionIndex &&
      answerState.selectedIndex !== answerState.correctIndex
    ) {
      return 'answer-button wrong'
    }

    return 'answer-button disabled'
  }

  return (
    <main className="quiz-card">
      <div className="quiz-meta">
        <div className="meta-item">
          <span>Question</span>
          <strong>
            {currentIndex + 1} / {totalQuestions}
          </strong>
        </div>
        <div className="meta-item">
          <span>Score</span>
          <strong>{score}</strong>
        </div>
        <div className="meta-item timer">
          <span>Time left</span>
          <strong>{timeLeft}s</strong>
        </div>
      </div>

      <section className="question-card">
        <h2>{currentQuestion.question}</h2>
        <div className="answers-list">
          {currentQuestion.options.map((option, index) => (
            <button
              key={option}
              type="button"
              className={getOptionClass(index)}
              disabled={hasAnswered}
              onClick={() => onSelectAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="feedback">
          {hasAnswered ? (
            answerState.expired ? (
              <p>
                Time's up! The correct answer was{' '}
                <strong>{currentQuestion.options[answerState.correctIndex]}</strong>.
              </p>
            ) : answerState.isCorrect ? (
              <p>
                Great job! <strong>{currentQuestion.options[answerState.correctIndex]}</strong> was correct.
              </p>
            ) : (
              <p>
                Incorrect. The right answer is{' '}
                <strong>{currentQuestion.options[answerState.correctIndex]}</strong>.
              </p>
            )
          ) : (
            <p>Select an answer before the timer reaches 0.</p>
          )}
        </div>

        {hasAnswered && (
          <button className="secondary-button" onClick={onNext}>
            {currentIndex + 1 >= totalQuestions ? 'See results' : 'Next question'}
          </button>
        )}
      </section>
    </main>
  )
}

export default QuizCard
