import './App.css';
import chatGpt from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import messageIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/nouserlogo.png';
import chatGptLogo from './assets/chatgptlogo2.png';
import openai from './openai';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello, I am ChatGPT. Ask me anything.",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async() => {
    try {
      const text = input;
      setInput('');
      setMessages([
        ...messages,
        { text, isBot:false }
      ]);
      const response = await openai.completions.create({
        model: "davinci-002",
        prompt: text,
        temperature: 0.7,
        max_tokens: 5,
        top_p: 1,
        frequency_penalty: 0,
        presence_panealty: 0,
      });
      setMessages([
        ...messages,
        { text: text, isBot: false },
        { text: response, isBot: true }
      ]);
    } catch(error) {
      console.error(error);
    }
  };

  const handleEnter = async (e) => {
    if(e.key === 'Enter')
      await handleSend();
  };

  const handleQuery = async (e) => {
    try {
      const text = e.target.value;
      setInput('');
      setMessages([
        ...messages,
        { text, isBot:false }
      ]);
      const response = await openai.completions.create({
        model: "davinci-002",
        prompt: text,
        temperature: 0.7,
        max_tokens: 5,
        top_p: 1,
        frequency_penalty: 0,
        presence_panealty: 0,
      });
      setMessages([
        ...messages,
        { text: text, isBot: false },
        { text: response, isBot: true }
      ]);
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={chatGpt} alt="Logo" className="logo" />
            <span className="title">ChatGPT</span>
          </div>
          <button className="midBtn" onClick={() => {window.location.reload()}}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            <span className="brand">New Chat</span>
          </button>
          <div className="upperSideQuery">
            <button className="query" onClick={handleQuery} value={"What is programming?"}>
              <img src={messageIcon} alt="query" />What is programming?
            </button>
            <button className="query" onClick={handleQuery} value={"How to use an API?"}>
              <img src={messageIcon} alt="query" />How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="Home" className="listItemsImg" />Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Saved" className="listItemsImg" />Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="Upgrade Plan" className="listItemsImg" />Upgrade plan
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) =>
            <div key={i} className={!message.isBot ? "chat bot" : "chat"}>
              <img src={message.isBot ? chatGptLogo : userIcon} alt="" className="chatImg" />
              <p className="text">
                { message.text }
              </p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Message ChatGPT" value={input} onKeyDown={handleEnter} onChange={ (e) => {setInput(e.target.value)} } />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="SendBtn" />
            </button>
          </div>
          <p>
            ChatGPT can make mistakes. Check important info.
            </p>
        </div>
      </div>
    </div>
  );
}

export default App;
