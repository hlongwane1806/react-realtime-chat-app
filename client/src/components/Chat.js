import React,{useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
import TextContainer from './TextContainer';

let socket;

const Chat =({location})=>{

    const [name,setName] = useState('');
    const [users, setUsers] = useState([]);
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(()=>{
        const{name,room} = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('join',{name,room},(error)=>{
            if(error) {
                alert(error);
              }
        });
        socket.on('roomData', ({ users }) => {
            setUsers(users);
          })

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT,location.search])

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message]);
        })
    },[messages])

    //send Messages
    const sendMessage = (event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message,()=>setMessage(''))
        }
    }

    
    return( <div className="outer-container">
        <div className="container">
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
           
        </div>
        <TextContainer users={users}/>
    </div>)
   
}
export default Chat;