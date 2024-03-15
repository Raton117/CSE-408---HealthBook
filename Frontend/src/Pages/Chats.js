import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {
//   const [chatList, setChatList] = useState([]); // Holds the list of chats
//   const [currentChat, setCurrentChat] = useState(null); // Holds the currently selected chat
//   const [message, setMessage] = useState(''); // Holds the new message text

//   // Fetch chat list on component mount
//   useEffect(() => {
//     const fetchChats = async () => {
//       const response = await axios.get('/api/chats');
//       setChatList(response.data);
//     };
//     fetchChats();
//   }, []);

//   // Fetch current chat when a chat is selected
//   useEffect(() => {
//     const fetchCurrentChat = async () => {
//       if (currentChat) {
//         const response = await axios.get(`/api/chats/${currentChat.id}`);
//         setCurrentChat(response.data);
//       }
//     };
//     fetchCurrentChat();
//   }, [currentChat.id]);

//   const handleSendMessage = async () => {
//     // Send message to the backend
//     const response = await axios.post(`/api/chats/${currentChat.id}/messages`, {
//       message: message,
//     });
//     // Update current chat with new message
//     setCurrentChat({
//       ...currentChat,
//       messages: [...currentChat.messages, response.data],
//     });
//     setMessage(''); // Clear input after sending
//   };

  // Add more handlers and functionality as needed

  return (
    // <div className="flex h-screen">
    //   {/* Chat List */}
    //   <aside className="w-1/4 bg-gray-100 p-4">
    //     {/* Chat List items */}
    //     {chatList.map((chat) => (
    //       <div
    //         key={chat.id}
    //         className="p-2 hover:bg-gray-200 cursor-pointer"
    //         onClick={() => setCurrentChat(chat)}
    //       >
    //         {chat.name}
    //       </div>
    //     ))}
    //   </aside>

    //   {/* Chat Content */}
    //   <main className="w-3/4 bg-white p-4 flex flex-col">
    //     {/* Messages */}
    //     <div className="flex-grow overflow-auto">
    //       {currentChat && currentChat.messages.map((msg, index) => (
    //         <div key={index} className="p-2">
    //           {msg.text}
    //         </div>
    //       ))}
    //     </div>

    //     {/* Message Input */}
    //     <div className="mb-4 mt-2">
    //       <input
    //         type="text"
    //         className="border p-2 rounded-full w-full"
    //         placeholder="Write something..."
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //       />
    //       <button
    //         className="bg-blue-500 text-white p-2 rounded-full mt-2 hover:bg-blue-600"
    //         onClick={handleSendMessage}
    //       >
    //         Send
    //       </button>
    //     </div>
    //   </main>
    // </div>
    <div className="flex h-screen">
      {/* Chat List */}
      <aside className="w-1/4 bg-gray-100 p-4">
        {/* Static Chat List items */}
        <div className="p-2 hover:bg-gray-200 cursor-pointer">
          User 1
        </div>
        <div className="p-2 hover:bg-gray-200 cursor-pointer">
          User 2
        </div>
        <div className="p-2 hover:bg-gray-200 cursor-pointer">
          User 3
        </div>
        {/* Add more static users as needed */}
      </aside>

      {/* Chat Content */}
      <main className="w-3/4 bg-white p-4 flex flex-col">
        {/* Static Messages */}
        <div className="flex-grow overflow-auto">
          <div className="p-2">
            Hello, how are you?
          </div>
          <div className="p-2">
            I'm fine, thanks! And you?
          </div>
          {/* Add more static messages as needed */}
        </div>

        {/* Message Input */}
        <div className="mb-4 mt-2 flex justify-between items-center">
          <input
            type="text"
            className="border p-2 rounded-full w-full mr-2"
            placeholder="Write something..."
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
