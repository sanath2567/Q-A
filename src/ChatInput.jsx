//import React from 'react'

import { useState } from "react";

function ChatInput({onSubmit }) {
    const [question,setQuestion]=useState("")
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(question.trim()){
            onSubmit(question);
            setQuestion("");

        }

    }
  return (
    <div className="container my-4">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="question">ASK a Question</label>

                <input type="text" className="form-control" id="question"
                placeholder="Enter your 
                Question" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
            </div>
        </form>
      <button type="submit" className="btn btn-primary mt-2">Submit</button>
    </div>
  )
}

export default ChatInput;
