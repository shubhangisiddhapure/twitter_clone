 
import { Avatar, Button } from '@material-ui/core'
import React, { useState } from 'react'
import {Card} from 'react-bootstrap'
import './tweetbox.css'


function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState("");
    const [error, setError] = useState("");
   

    const sendTweet = async(e) => {
        e.preventDefault()
         setTweetMessage("")
    
    }

    return (
        <Card
      style={{ width: "50%",marginRight:"auto",marginLeft:"auto"} }
    >
        <div className = "tweetBox">
            <form>
                <div className = "tweetBox__input">
                    <Avatar
                        src = "https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg"
                    />
                    <input 
                        onChange = {(e) => setTweetMessage(e.target.value)}
                        value = {tweetMessage} 
                        placeholder = "What's happening" 
                        type = "text" 
                    />
                </div>
               
                <Button 
                onClick = { sendTweet }
                className = "tweetBox__tweetButton">Tweet</Button>
            </form>
        </div>
        </Card>
    )
}

export default TweetBox;