import React,{ useState} from 'react';
import {Link} from 'react-router-dom';
// class Join extends Component{
//     constructor(props){
//         super(props);
//         this.state ={
//             name:'',
//             room:''
//         }
//         this.changeName = this.changeName.bind(this);
//         this.changeRoom = this.changeRoom.bind(this);
//     }
//     render(){
//         return( <h1>Join</h1>)
//     }
    
// }

const Join =()=>{
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    return( <div className="join-outer-container">
            <div className="join-inner-container">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="join-input " type="text" onChange={(event)=>setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="join-input mt-20" type="text" onChange={(event)=>setRoom(event.target.value)} /></div>
                <Link  onClick={event => (!name || !room)? event.preventDefault() :null}to={`/chat?name=${name}&room=${room}`}>
                <button className="btn-primary mt-20" type="submit">Sign In</button>
                </Link>
            </div>
    </div>)
}

export default Join;