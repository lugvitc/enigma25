import React, { useEffect, useState } from 'react'
import CTFDescription from '../components/CTFDescription'
import CTFList from '../components/CTFList'
import getTypesFromMask from '../assets/functions/CTF_type'
import AnimatedText from '../components/text'
import Header from '../components/Header'
import api from '../utils/api'
import axios from 'axios'

// For now, the Question interface is basic, when you guys integrate it with the backend, you need to only change the interface here, as everywhere else it is just used to send the required data, like the questionId, the question, the description and the questionType.
interface Question {
  id: string
  name: string
  description: string
  tags: number
  points: number
  // solved: number
  author: string
}

const CTFs = () => {
  const [hoveredQuestionId, setHoveredQuestionId] = React.useState<string>('')
  const [selectedQuestionType, setSelectedQuestionType] =
    React.useState<string>('')

  const [error, setError] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])

  // So this selected question ID contains whatever you click, I will create a function below that logs the current selected question ID in the console so that during backend integration, it will be easy for you. Everything else happens on its own in the individual components.
  const [selectedQuestionId, setSelectedQuestionId] = React.useState<string>('')

  const doAction = (questionId: string) => {
    console.log('Selected question ID: ', questionId)
  }

  useEffect(() => {
    doAction(selectedQuestionId)
  }, [selectedQuestionId])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('/ctf/list')
        if (response.status === 200) {
          setQuestions(response.data)
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(err.response.data.msg_code.toString())
          }
        }
      }
    }

    getData()
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col font-neuebit">
      <Header
        links={[
          { text: 'Leaderboard', path: '/leaderboard' },
          { text: 'Challenges', path: '#' },
          { text: 'Team', path: '/team' }
        ]}
      />
      <div className="mt-4 flex w-screen flex-row justify-center overflow-visible text-3xl">
        <div className="scrollbar-hide flex w-[80%] overflow-visible whitespace-nowrap">
          {/* You should update these tags if you update the challengeTypes in the CTF_type.tsx file */}
          {[
            { label: 'ALL', value: '' },
            { label: 'Web', value: 'Web' },
            { label: 'OSINT', value: 'OSINT' },
            { label: 'Binary', value: 'Binary' },
            { label: 'Reversing', value: 'Reversing' },
            { label: 'Forensics', value: 'Forensics' },
            { label: 'Crypto', value: 'Crypto' },
            { label: 'Miscellaneous', value: 'Miscellaneous' }
          ].map((type) => (
            <span
              key={type.value}
              className={`pointy border border-white px-8 py-4 transition-all hover:-translate-y-4 hover:translate-x-2 hover:bg-white hover:text-black ${
                selectedQuestionType === type.value
                  ? 'bg-white text-black'
                  : 'text-white'
              }`}
              onClick={() => setSelectedQuestionType(type.value)}
            >
              <AnimatedText text={`${type.label}`} />
            </span>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-grow flex-row justify-center">
        <CTFList
          ctfList={questions.filter((question) =>
            selectedQuestionType
              ? getTypesFromMask(question.tags).includes(selectedQuestionType)
              : true
          )}
          onHover={setHoveredQuestionId}
          onClick={setSelectedQuestionId}
        />
        <CTFDescription
          description={
            questions.find((question) => question.id === hoveredQuestionId)
              ?.description || ''
          }
          points={
            questions.find((question) => question.id === hoveredQuestionId)
              ?.points || 0
          }
          author={
            questions.find((question) => question.id === hoveredQuestionId)
              ?.author || ''
          }
          tags={
            getTypesFromMask(
              questions.find((question) => question.id === hoveredQuestionId)
                ?.tags || 0
            ) || []
          }
        />
      </div>
    </div>
  )
}

export default CTFs
