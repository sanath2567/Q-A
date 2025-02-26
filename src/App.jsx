
// import { useState } from "react";
// import ChatInput from "./ChatInput";
// //import './App.css'
// import  ChatResponse from "./ChatResponse";
// import { fetchChatResponse }  from "./api.jsx";
// function App() {
// const [response,setResponse]=useState(null);
// const [loading,setLoading]=useState(false);
// const handleQuestionSubmit=async (question)=>{
//   setLoading(true);
//   setResponse(null);
//   try{
//      const apiResponse=await fetchChatResponse(question);
//      setResponse(apiResponse);
//   }catch(error){
//     alert("failed to get response",error);
//   }finally{
//     setLoading(false);
//   }

// }

//   return (
//     <>
     
//    <div className="App">
//     <header className="bg-primary text-white text-center">
//       <h1>ChatBot</h1>
//     </header>
//     <ChatInput onSubmit={handleQuestionSubmit}/>
//     { loading && <h1>Loading....</h1>}
    
//     <ChatResponse response={response}/>
//    </div>
//     </>
//   )
// }

// export default App;

import { useState } from "react";
import './App.css'
function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");
`${backendUrl}/api/qna/ask`
    try {
      const response = await fetch(`${backendUrl}/api/qna/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();
      const extractedAnswer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response found.";
      
      setAnswer(extractedAnswer);
    } catch (err) {
      setError("Error fetching response. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Ask a Question</h1>
      <br/> 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <br/> <br/>
        <button type="ASK" disabled={loading}>
          {loading ? "Loading..." : "Ask"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {answer && (
        <div className="response-card">
          <h2>Answer</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;



