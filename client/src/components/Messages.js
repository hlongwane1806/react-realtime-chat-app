import React from 'react';
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom';
const Messages = ({messages,name})=>{
    return(<ScrollToBottom className="messages">
        {messages.map((message,index)=><div key={index}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>)
}

export default Messages;