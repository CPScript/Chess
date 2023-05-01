import React, { useState, useEffect } from 'react'

import Game from './Game'
import Sidebar from './Sidebar'

import { useParams, useNavigate } from 'react-router-dom'
import { useSocket } from '../contexts/SocketContext'
import { useGame } from '../contexts/GamesContext'
import { useUser } from '../contexts/UserContext'

import Modal from './Modal'

export default function GamePage() {
  const socket = useSocket()
  const [popup, setPopup] = useState()
  const { gameId } = useParams()
  const navigate = useNavigate()

  const { gameOver, orientation, initGame, players } = useGame()
  const { username } = useUser()
  const [isRematch, setIsRematch] = useState(0)

  useEffect(() => {
    if(!orientation) return
    if(gameOver != null) {
      let message = gameOver.winner != null ? ((gameOver.winner === 0 && orientation === 'white' || gameOver.winner === 1 && orientation === 'black') ? 'You Win!' : (gameOver.winner === 0 ? 'white' : 'black') + ' wins') : 'Draw'
      setPopup({
        message,
        extra: 'by ' + gameOver.reason,
        element: <button onClick={() => socket.emit('rematch', gameId)}>Rematch</button>
      })
      setIsRematch(0)
    }else {
      setPopup(null)
    }
  }, [gameOver, orientation])

  useEffect(() => {
    if(!socket) return
    return () => socket.emit('leave')
  }, [socket])

  useEffect(() => {
    if(!socket) return
    socket.on('leave', () => {
      navigate('/')
    })
    socket.on('player left', () => {
      setPopup({
        message: "Your oppenent left.",
        extra: "they may return..."
      })
    })
    socket.on('rematch', () => {
      setIsRematch(1)
    })
  }, [socket])

  // useEffect(() => {
  //   let local_games = localStorage.getItem('games')
  //   if(!local_games) return
  //   const games = JSON.parse(local_games)
  //   let game = games.find(g => g.id === gameId)
  //   if(!game) {
  //     games.push([{id: gameId}])
  //   }
  //   localStorage.setItem('games', games)
  // }, [])

  return (
    <div className='game-container'>
      <div className='board-container'>
        <Game gameId={gameId} />
      </div>
      <Sidebar gameId={gameId} />
      { popup && 
        <Modal onClose={() => {
          setPopup(null)
        }}>
          <Modal.Header>{ popup.message }</Modal.Header>
          <Modal.Body>
            <div style={{marginBottom: '1em'}}>{ popup.extra }</div>
            { popup.element }
          </Modal.Body>
        </Modal>
      }
    </div>
  )
}