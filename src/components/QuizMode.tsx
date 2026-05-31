'use client';

import React, { useState } from 'react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  guidelineReference: string;
}

interface QuizModeProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export default function QuizMode({ questions, onComplete }: QuizModeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const question = questions[currentQuestion];

  const handleAnswer = (option: string) => {
    if (!answered) {
      setSelectedAnswer(option);
      setAnswered(true);
      if (option === question.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else if (onComplete) {
      onComplete(score + (selectedAnswer === question.correctAnswer ? 1 : 0), questions.length);
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-purple-600 rounded shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-purple-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="text-12 font-bold">📝 Knowledge Assessment — Case Completion Quiz</div>
          <div className="text-10">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div className="h-full bg-purple-600" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Question */}
          <div className="text-12 font-bold text-argus-navy">{question.question}</div>

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={`w-full text-left px-3 py-2 border-2 text-10 transition-all ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'bg-green-100 border-green-500 font-bold'
                      : 'bg-red-100 border-red-500 font-bold'
                    : answered && option === question.correctAnswer
                      ? 'bg-green-100 border-green-500 font-bold'
                      : 'bg-white border-argus-border hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-5 h-5 flex items-center justify-center border rounded text-8 ${
                      selectedAnswer === option
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : answered && option === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300'
                    }`}
                  >
                    {selectedAnswer === option && isCorrect && '✓'}
                    {selectedAnswer === option && !isCorrect && '✗'}
                    {answered && option === question.correctAnswer && !selectedAnswer && '✓'}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {answered && (
            <div className={`border-l-4 px-3 py-2 ${isCorrect ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
              <div className={`text-10 font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </div>
              <div className={`text-10 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{question.explanation}</div>
              <div className={`text-9 font-bold mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                📋 {question.guidelineReference}
              </div>
            </div>
          )}

          {/* Score */}
          <div className="bg-purple-50 border border-purple-300 px-3 py-2">
            <div className="text-10 text-purple-800">
              <span className="font-bold">Current Score:</span> {score + (answered && isCorrect ? 1 : 0)} of {currentQuestion + 1}
              correct
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-100 px-4 py-2 flex gap-2 justify-end border-t border-gray-200">
          <button
            onClick={handleNext}
            disabled={!answered}
            className="px-4 py-1 bg-purple-600 text-white text-10 disabled:opacity-50 hover:bg-purple-700 font-bold"
          >
            {currentQuestion === questions.length - 1 ? 'See Results →' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  );
}
