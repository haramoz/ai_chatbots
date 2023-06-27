import { useState } from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import FileUploadButton from './components/FileUploadButton';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

//import scrapeWebsite from './components/Webscrapper';


const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Guten Tag, ich bin der REWE customer assistence agent! Stellen Sie mir gerne Ihre Fragen!",
      sentTime: "just now",
      sender: "7PAgent"
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const reweProducts = [
    {
      "name": "Organic Bananas",
      "category": "Fresh Produce",
      "price": 1.99,
      "origin": "Ecuador"
    },
    {
      "name": "Organic Strawberries",
      "category": "Fresh Produce",
      "price": 3.49,
      "origin": "Spain"
    },
    {
      "name": "Organic Avocados",
      "category": "Fresh Produce",
      "price": 2.79,
      "origin": "Mexico"
    },
    {
      "name": "Organic Tomatoes",
      "category": "Fresh Produce",
      "price": 1.49,
      "origin": "Italy"
    },
    {
      "name": "Organic Spinach",
      "category": "Fresh Produce",
      "price": 2.29,
      "origin": "Unknown"
    }
  ]
  

  const reweProductsString = JSON.stringify(reweProducts);

  const prompt = "You are a REWE customer assistence agent, only reply in German. Your task is to help the answer or process the customer" + 
  "queries based on details of the products Rewe sells follow the details after delimeter ### " + reweProductsString + 
  " If the sentiment of the user sounds negative, then please ask the user to contact kundenmanagement@rewe.de";

  const [systemMessage, setSystemMessage] = useState({
    role: "system",
    content: prompt
  });
  
  /*async function fetchScrapedData(url) {
    const data = await scrapeWebsite(url);
    console.log(data);
  
    const jsonString = JSON.stringify(data);
    return jsonString;
  }*/
  
  

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const handlePromptUpload = (fileContent) => {
    console.log("Prompt changed!")
    console.log(fileContent);
    //alert('Prompt changed!');
    

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  
    if (urlPattern.test(fileContent)) {
      //var scrappedJsonString = fetchScrapedData(fileContent);
      //setSystemMessage({ role: "system", content: scrappedJsonString });

      setMessages([
        {
          message: "Functionality coming soon!!",
          sentTime: "just now",
          sender: "7PAgent"
        }
      ]);
    } else {
      //console.log("Not an URL, treating as a text prompt");
      setSystemMessage({ role: "system", content: fileContent });

      setMessages([
        {
          message: "Personality changed!",
          sentTime: "just now",
          sender: "7PAgent"
        }
      ]);

    }
  };
  
  async function processMessageToChatGPT(chatMessages) {
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "7PAgent") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages]
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...apiRequestBody,
        temperature: 0
      })
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "7PAgent"
        }]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <FileUploadButton onFileUpload={handlePromptUpload} buttonText="Personality change" />
      <FileUploadButton onFileUpload={handlePromptUpload} buttonText="Url configuration" />

      <div style={{ position: 'relative', height: '800px', width: '700px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="7PAgent is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} attachButton={false} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
