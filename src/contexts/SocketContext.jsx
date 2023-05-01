import React, { useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

import { useUser } from './UserContext'

export function SocketProvider({ children }) {
  const { username, id } = useUser()
  const [socket, setSocket] = useState()
  useEffect(() => {
    if(!id) return
    const newSocket = io('https://chess-server.jjroley.repl.co', { 
      query: { id }
    })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [id])
  useEffect(() => {
    if(!socket || !username) return
    socket.emit('username', username)
  }, [socket, username])
  useEffect(() => {
    if(!socket) return
    socket.on('disconnect', () => {
      console.error('socket disconnected')
      alert("You have been disconnected from the server. Refresh the page.")
    })
    socket.on('connect_error', err => {
      console.log("Connection error due to " + err)
    })
  }, [socket])
  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
  )
}