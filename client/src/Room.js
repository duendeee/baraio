import React, { useEffect, useState } from 'react'
import {socket} from './Chat'
import uuid from 'uuid/v4'

const myId = uuid()

const Room = () => {
    const [roomName, updateRoomName] = useState('')
    const [rooms, updateRooms] = useState([])
    const [roomNameToJoin, updateRoomNameToJoin] = useState('')

    useEffect(() => {
        const handleNewRoomName = newRoomName =>
            updateRooms([...rooms, newRoomName])
  
        socket.on('createRoom', handleNewRoomName)

        return () => socket.off('createRoom', handleNewRoomName)
    }, [rooms])

    
    const handleFormSubmit = event => {
        event.preventDefault()
        if (roomName.trim()) {
            socket.emit('createRoom', {
                id: myId,
                roomName
            })
            updateRoomName('')
        }
    }


    const handleInputChange = event =>
        updateRoomName(event.target.value)


    const handleJoinRoom = event => {
        event.preventDefault()
        if(roomNameToJoin.trim()){
            if(socket.emit('joinRoom', roomNameToJoin)){
                console.log('joining room', roomNameToJoin)
            }
        }
    }

    const handleInputJoinRoomChange = event =>
        updateRoomNameToJoin(event.target.value)

    return (
        <div className="m4">
            <form className="form" onSubmit={handleFormSubmit}>
                <label>Nome da room:</label>
                <input
                    className="form__field"
                    onChange={handleInputChange}
                    placeholder=""
                    type="text"
                    value={roomName}
                />
            </form>

            <ul className="list">
                { rooms.map((m, idx) => (
                    <li key={idx}>
                        <span>
                            ID: { m.id }<br/>
                            Nome da room: { m.roomName }
                        </span>
                    </li>
                ))}
            </ul>

            <form className="p4" onSubmit={handleJoinRoom}>
                <label>Nome da room p/ entrar:</label>
                <input
                    className="form__field"
                    onChange={handleInputJoinRoomChange}
                    placeholder=""
                    type="text"
                    value={roomNameToJoin}
                />
            </form>
        </div>
    );
}



export default Room
