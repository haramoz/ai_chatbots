import React from 'react';
import ChatAssistant from '../components/Chatbot'

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the HomePage!</h1>
      <p>This is the default home page of our React application.</p>
      <ChatAssistant/>
    </div>
  );
};

export default HomePage;