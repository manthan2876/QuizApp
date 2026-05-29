import { useEffect, useState } from 'react'
import quizData from './data/quiz.json'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import QuizCard from './components/QuizCard.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answerState, setAnswerState] = useState(null)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])
  const [timeLeft, setTimeLeft] = useState(60)
  const [finished, setFinished] = useState(false)

  const currentQuestion = quizData[currentIndex]
  const totalQuestions = quizData.length
  const hasAnswered = answerState !== null

  useEffect(() => {
    if (!started || finished || hasAnswered) {
      return
    }

    if (timeLeft <= 0) {
      handleAnswer(null, true)
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((value) => value - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [started, finished, hasAnswered, timeLeft])

  const resetQuiz = () => {
    setStarted(true)
    setCurrentIndex(0)
    setAnswerState(null)
    setScore(0)
    setResults([])
    setTimeLeft(60)
    setFinished(false)
  }

  const handleAnswer = (selectedIndex, expired = false) => {
    if (hasAnswered || finished) {
      return
    }

    const correctIndex = currentQuestion.answer
    const isCorrect = selectedIndex === correctIndex
    const nextScore = expired ? score - 1 : isCorrect ? score + 1 : score

    const selectedText = selectedIndex === null ? 'No answer' : currentQuestion.options[selectedIndex]
    const correctText = currentQuestion.options[correctIndex]

    setScore(nextScore)
    setAnswerState({ selectedIndex, correctIndex, expired, isCorrect })
    setResults((previous) => [
      ...previous,
      {
        question: currentQuestion.question,
        selectedText,
        correctText,
        isCorrect,
        expired,
      },
    ])
  }

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setFinished(true)
      setStarted(false)
      return
    }

    setCurrentIndex(currentIndex + 1)
    setAnswerState(null)
    setTimeLeft(60)
  }

  return (
    <div className="app-shell">
      <header className="header">
        <h1>QuizApp</h1>
        <p>Choose the right answer, see instant feedback, and complete the quiz.</p>
      </header>

      {!started && !finished && (
        <WelcomeScreen totalQuestions={totalQuestions} onStart={resetQuiz} />
      )}

      {started && !finished && (
        <QuizCard
          currentQuestion={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          score={score}
          timeLeft={timeLeft}
          hasAnswered={hasAnswered}
          answerState={answerState}
          onSelectAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}

      {finished && (
        <ResultsScreen
          score={score}
          totalQuestions={totalQuestions}
          results={results}
          onRestart={resetQuiz}
        />
      )}
    </div>
  )
}

export default App
