import React, { useState, FormEvent } from 'react'
import AnimatedText from '../text'
import axios from 'axios'
import api from '../../utils/api'

const TeamCreation = () => {
  const [teamName, setTeamName] = useState('')
  const [teamCode, setTeamCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [joinCode, setJoinCode] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'create' | 'join'>('create')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (teamName.trim()) {
      console.log('Team name submitted:', teamName)
      const generatedCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()
      setTeamCode(generatedCode)
      setShowCode(true)
    }
  }

  const handleJoinSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (joinCode.trim()) {
      console.log('Joining team with code:', joinCode)
    }

    try {
      const response = await api.post('/auth/login', {
        name: 'NIGGESH123',
        password: 'NIGGA!@#'
      })

      console.log(response)

      if (response.status === 200) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.data.access_token)
          window.location.href = `${window.location.origin}/team-login`
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(err.response.data.msg_code.toString())
        }
      }
    }
  }

  const switchMode = () => {
    setMode(mode === 'create' ? 'join' : 'create')
    setShowCode(false)
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center font-neuebit">
      <div className="flex flex-row">
        <div className="mb-8 text-8xl text-enigma-green">
          {mode === 'create' ? 'CREATE A TEAM' : 'JOIN A TEAM'}
        </div>
      </div>

      {!showCode &&
        (mode === 'create' ? (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col items-center gap-4"
            >
              <input
                type="text"
                name="team_name"
                id="tname"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="ENTER TEAM NAME TO CREATE"
                className="w-full cursor-text border border-white bg-transparent p-4 text-2xl text-white transition-colors focus:border-blue-500 focus:outline-none"
                required
              />

              <div className="mt-4 flex gap-4">
                <button
                  type="submit"
                  className="rounded-none bg-white px-8 py-3 text-2xl font-semibold text-black transition-colors hover:bg-enigma-green"
                >
                  <AnimatedText
                    text={'CREATE TEAM'}
                    className="cursor-pointer"
                  />
                </button>
                <button
                  onClick={switchMode}
                  className="rounded-none bg-white px-8 py-3 text-2xl font-semibold text-black transition-colors hover:bg-enigma-green"
                >
                  <AnimatedText text={'JOIN TEAM'} className="cursor-pointer" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <form
            onSubmit={handleJoinSubmit}
            className="flex w-full max-w-md flex-col items-center gap-4"
          >
            <input
              type="text"
              name="join_code"
              id="jcode"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="ENTER TEAM CODE TO JOIN"
              className="w-full border border-white bg-transparent p-4 text-2xl text-white transition-colors focus:border-blue-500 focus:outline-none"
              required
            />

            <div className="mt-4 flex gap-4">
              <button
                type="submit"
                className="rounded-none bg-white px-8 py-3 text-2xl font-semibold text-black transition-colors hover:border-none hover:bg-enigma-green"
              >
                <AnimatedText text="JOIN TEAM" className="cursor-pointer" />
              </button>
              <button
                onClick={switchMode}
                className="rounded-none bg-white px-8 py-3 text-2xl font-semibold text-black transition-colors hover:border-none hover:bg-enigma-green"
              >
                <AnimatedText text="CREATE TEAM" className="cursor-pointer" />
              </button>
            </div>
          </form>
        ))}

      {showCode && (
        <div className="mt-8 text-white">
          <AnimatedText
            text={'TEAM CREATED! YOUR TEAM CODE IS: '}
            time={0.2}
            className="mb-8 text-5xl"
          />
          <p className="mb-8 text-6xl">{teamCode}</p>
        </div>
      )}
    </div>
  )
}

export default TeamCreation
