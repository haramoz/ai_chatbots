import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import FileUploadButton from './components/FileUploadButton';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

/*const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Explain things like you're talking to a indian person, probably a student"
}*/



function App() {
  const [messages, setMessages] = useState([
    {
      message: "Guten Tag, ich bin der 7P Smart Agent! Stellen Sie mir gerne Ihre Fragen!",
      sentTime: "just now",
      sender: "7PAgent"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const reweProducts = [
    {
      name: "Organic Apples",
      category: "Fresh Produce",
      price: 2.99,
      origin: "Germany"
    },
    {
      name: "Whole Grain Bread",
      category: "Bakery",
      price: 1.49,
      origin: "Local Bakery"
    },
    {
      name: "Free-Range Eggs",
      category: "Dairy",
      price: 3.99,
      origin: "Germany"
    },
    // Add more product details here
    {
      name: "Fairtrade Coffee",
      category: "Beverages",
      price: 4.99,
      origin: "Various"
    }
  ];
  
  const reweProductsString = JSON.stringify(reweProducts);

  const prompt = "You are a REWE customer assistence agent, only reply in German. Your task is to help the answer or process the customer" + 
  "queries based on details of the products Rewe sells follow the details after delimeter ### " + reweProductsString + 
  " If the sentiment of the user sound negative, then please ask the user to contact kundenmanagement@rewe.de "


  const systemMessage = {
    role: "system",
    content: prompt
  };

  console.log(prompt);
  

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

  const handleFileUpload = (fileContent) => {
    console.log(fileContent);
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
      return { role: role, content: messageObject.message}
    });


    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  
        ...apiMessages 
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...apiRequestBody,
        temperature: 0,
      })
    }).then((data) => {
      return data.json();
    }).then((data) => {
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
      <FileUploadButton onFileUpload={handleFileUpload} />
      <div style={{ position: 'relative', height: '800px', width: '700px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="7PAgent is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} attachButton={false} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App
