import React, { useEffect, useRef, useState } from 'react';
import { getAllMessages, getUsers } from '../../services/chat';
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";

import moment from 'moment'

const socket = io('http://localhost:8000', {
  auth: { token: localStorage.getItem('token') },
});



function Chat() {


  const [username, setUsername] = useState('');
 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const messagesEndRef = useRef(null);

  const navigate = useNavigate()

  // const formattedTime = moment(timestamp).format('hh:mmA');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
     
    });

    socket.on('authenticated', ({ username }) => {
      console.log('authenticated socket', username);
      setUsername(username); // Update state with authenticated username
    });

   
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
     
    });

    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });


      socket.on('unauthorized', (error) => {
        navigate('/login');
      });

    return () => {
      socket.disconnect();
      
    };
  }, []);

  const getMessages = async () => {
    if (username) {
      const data = await getAllMessages(username);
      setMessages(data);
    }
  };

  const getUserList = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
      getUserList();
      getMessages();
  }, [ username]);

  const sendMessage = (e) => {
    e.preventDefault()
    try {
      let token = localStorage.getItem('token')
      if (!token) {
        console.error('User not authenticated');
        navigate('/login');
        return;
      }
      if (newMessage && selectedUser) {
        socket.emit('message', JSON.stringify({ receiver: selectedUser, text: newMessage }));
        setNewMessage('');
      }
    }
    catch (e) {

    }
  };

  const handleUserSelect = async (user) => {
    setSelectedUser(user.username);
    const data = await getAllMessages(user.username);
    setMessages(data);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  console.log('username', username)


  return (
   

    <div className='h-screen'>
    <div className='bg-blue-500 text-white p-4 flex items-center gap-x-2  w-full  fixed top-0 left-0 right-0'>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>
      <h1 className='text-2xl italic'>{username}</h1>
    </div>
    <div className="flex h-full mt-16">
      <div className="w-1/4 bg-gray-200 p-4 h-full overflow-auto border-r-2">
        <h3 className="text-lg font-bold mb-2">Users</h3>
        <div className="overflow-y-auto max-h-full">
          {users?.length > 0 ? (
            users?.filter((data) => data?.username !== username)?.map((user, index) => (
              <div
                key={index}
                onClick={() => handleUserSelect(user)}
                className={`cursor-pointer p-2 mb-2 rounded ${selectedUser === user.username ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {user.username}
              </div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col h-full bg-gray-100">
        {selectedUser ? (
          <>
            <div className='border sticky top-[77px] bg-white shadow p-4 flex items-center gap-x-2 rounded m-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
             <span> {selectedUser}</span>
            </div>
            <div className="flex-1 overflow-y-auto mb-10">
              {messages.map((msg, index) => (
                <>
                {msg.sender === username && (
                  <div className='w-full'>
                   <div className='flex items-center justify-end ' >
                    <div className='max-w-[400px]  justify-self-end bg-blue-500 text-white p-3 my-2 rounded-md mr-3'>
                    <strong>{msg.sender !== username && `${msg.sender}:`}</strong> {msg.message}{' '}
                    <em>{moment(msg.timestamp).format('hh:mm A')}</em>
                    </div>
                  </div>
                  </div>
                )}

               {msg.sender !== username && (
                  <div className='w-full'>
                   <div className='max-w-[400px] bg-gray-300 p-3 my-2 rounded-md ml-3'>
                    <strong>{msg.sender !== username && `${msg.sender}:`}</strong> {msg.message}{' '}
                    <em>{moment(msg.timestamp).format('hh:mm A')}</em>
                  </div>
                  </div>
                )}
                
                {/* <div
                  key={index}
                  className={`p-2 rounded mb-2 mt-1 ${msg.sender === username ? 'self-end bg-blue-500 text-white' : 'self-start bg-gray-300'}`}
                >
                  <div>
                    <strong>{msg.sender !== username && `${msg.sender}:`}</strong> {msg.message}{' '}
                    <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
                  </div>
                </div> */}
                </>
                
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center w-full sticky bottom-0">
              <form onSubmit={sendMessage} className="w-full flex items-center p-4 bg-white shadow-md">
                <input
                  autoFocus
                  className="flex-1 p-2 mr-2 border rounded"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  type='submit'
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center w-full mt-5'>
            <h1 className='text-blue-500 font-medium text-xl'>Hello {username}</h1>
            <p className='font-bold underline'>Please Click on the user to continue the chat</p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default Chat;

