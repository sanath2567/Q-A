//import React from 'react'

function ChatResponse({response}) {
    if(!response){
        return null;
    }
    const {candidates,useMetadata }=response;
 
  return (
    <div className="container my-4">
       <h3>Response</h3>
       {candidates.map((candidate,index)=>(
      <div className="card" key={index}>
      
      <div className="card-body">
        <h5 className="card-title">Candidate{index+1}</h5>
        <p className="card-text">{candidate.content.parts[0].text}</p>
       <h6>citations</h6>
       <ul>
        {candidate?.citationMetdata?.citationSources.map((source,idx)=>(
            <li key={idx}>
              <a href={source.url} target="_blank" rel="noopener noreferrer ">
                {source.url}
              </a>{" "}
              (Indexes:{source.startIndex}-{source.endIndex})

            </li>
        ))}
       </ul>
      </div>
    </div>
       ))}
       <h4>usage Metadata</h4>
       <p>Total Tokens:{useMetadata.promptTokenCount}</p>


    </div>
  )
}

export default ChatResponse;
