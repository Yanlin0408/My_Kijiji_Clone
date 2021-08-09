import React from 'react'
import ReactDOM from 'react-dom'
import './alert.css'

function Popup(props) {
    return  (props.trigger) ? (
        <div className = "worstbitch" id = "yobitch">
            <div className = "badbitch">
                <button className="close-btn" onClick ={()=>{window.location="/post/"+props.postId}}>
                     close
                </button>
                <h4 class="alert-heading">Well done!</h4>
                <a> Congraduation! Transaction Done!</a>
                <br/>
                <a> ${Math.round(props.balance)} remaining</a>
                <br/>
                <a href={'/post/'+props.postId}>stay</a>
                <a> or go back to </a> 
                <a href={"/"}>main page</a>
            </div>
        </div>    
            ): "";
}

export default Popup