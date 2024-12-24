'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

const subjects = [
  { id: 'math', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'computer_science', name: 'Computer Science' },
]

const mockExams = {
  math: [
    {
      question: 'What is the value of π (pi) to two decimal places?',
      options: ['3.14', '3.16', '3.12', '3.18'],
      correctAnswer: '3.14'
    },
    {
      question: 'What is the square root of 144?',
      options: ['10', '12', '14', '16'],
      correctAnswer: '12'
    },
    // Add more questions as needed
  ],
  physics: [
    {
      question: "What is Newton's First Law of Motion?",
      options: [
        "An object at rest stays at rest, and an object in motion stays in motion",
        "Force equals mass times acceleration",
        "For every action, there is an equal and opposite reaction",
        "Energy cannot be created or destroyed"
      ],
      correctAnswer: "An object at rest stays at rest, and an object in motion stays in motion"
    },
    {
      question: "What is the SI unit of electric current?",
      options: ["Volt", "Watt", "Ampere", "Ohm"],
      correctAnswer: "Ampere"
    },
    // Add more questions as needed
  ],
  // Add mock exams for other subjects
}

export default function OnlineExamPage() {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [examStarted, setExamStarted] = useState(false)
  const [examFinished, setExamFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (examStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      finishExam()
    }
  }, [timeLeft, examStarted])

  const startExam = () => {
    setExamStarted(true)
    setUserAnswers(new Array(mockExams[selectedSubject].length).fill(''))
  }

  const finishExam = () => {
    setExamFinished(true)
    setShowResults(true)
  }

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockExams[selectedSubject].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let score = 0
    mockExams[selectedSubject].forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score++
      }
    })
    return score
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  if (!examStarted) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Select a Subject for Online Exam</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => setSelectedSubject(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button onClick={startExam} disabled={!selectedSubject}>Start Exam</Button>
        </CardFooter>
      </Card>
    )
  }

  const currentExam = mockExams[selectedSubject]
  const currentQuestion = currentExam[currentQuestionIndex]

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{subjects.find(s => s.id === selectedSubject)?.name} Exam</CardTitle>
          <div className="text-right font-bold">Time Left: {formatTime(timeLeft)}</div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Question {currentQuestionIndex + 1} of {currentExam.length}
            </h3>
            <p>{currentQuestion.question}</p>
          </div>
          <RadioGroup
            value={userAnswers[currentQuestionIndex]}
            onValueChange={handleAnswerSelect}
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          {currentQuestionIndex === currentExam.length - 1 ? (
            <Button onClick={finishExam}>Finish Exam</Button>
          ) : (
            <Button onClick={goToNextQuestion}>Next</Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exam Results</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            You have completed the {subjects.find(s => s.id === selectedSubject)?.name} exam.
            <p className="font-bold mt-2">
              Your score: {calculateScore()} out of {currentExam.length}
            </p>
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => {
              setShowResults(false)
              setExamStarted(false)
              setExamFinished(false)
              setCurrentQuestionIndex(0)
              setSelectedSubject('')
              setTimeLeft(1800)
            }}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
