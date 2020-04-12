import React, {Component} from 'react'
import {socket} from './Login'
import "./Global"


class Room extends Component{
    constructor(){
        super();
        this.state = {
            numPlayers: 0,
            numPlayersMax: 2,
            listPlayers: [],
            rooms: []
        }
    }

    componentDidMount(){
        socket.on('userReady', nickname => {
            console.log('NICKNAME => ', nickname)
            global.username = nickname
        })
    }

    componentDidUpdate(){
        socket.on('createRoom', (lista) => {
            this.setState({
                rooms: [...this.state.rooms, lista]
            })
        })
        console.log(this.state.rooms)
    }

    getNumPlayersSelect = (e) => {
        //console.log(e.target.value);
        this.setState({numPlayersMax: e.target.value})
    }

    createRoom = () => {
        const maxPlayers = this.state.numPlayersMax
        console.log('MAX PLAYERS => ', maxPlayers)
        if(global.username === ''){
            console.log('IMPOSSIVEL CRIAR SALA. FALTANDO USER ID. VOLTE PARA A TELA INICIAL');
        }else{
            let lista = [];
            lista[0] = global.username
            lista[1] = maxPlayers            
            socket.emit('createRoom', lista)

            console.log('SALA CRIADA => ',global.username)         

            socket.on('connectedToRoom', data => {
                console.log(data)
            })
        }
    }


    
    render(){
        //console.log(this.state.numPlayersMax);
        return (
            <div className="m4">
                <span>Número máximo de jogadores: </span>
                <select onChange={this.getNumPlayersSelect}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
    
                <br/><button onClick={this.createRoom}>Criar Sala</button>
        
            </div>
        );
    }
}

export default Room