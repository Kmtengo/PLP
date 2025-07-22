import React, { useState } from 'react';
import { 
  Send, Paperclip, Search, Phone, Video, MoreVertical,
  Users, Circle, Check, CheckCheck, Mic, Smile
} from 'lucide-react';
import { chatData } from '../data/mockData';

const ConversationItem = ({ conversation, isActive, onClick }) => {
  const isGroup = conversation.type === 'group';
  
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-colors ${
        isActive ? 'bg-ksb-green bg-opacity-10 border-l-4 border-ksb-green' : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isGroup ? 'bg-blue-500' : 'bg-ksb-green'
          } text-white font-semibold`}>
            {isGroup ? <Users className="w-6 h-6" /> : conversation.name.charAt(0)}
          </div>
          <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 truncate">{conversation.name}</h3>
            <span className="text-xs text-gray-500">{conversation.time}</span>
          </div>
          {conversation.role && (
            <p className="text-xs text-gray-500">{conversation.role}</p>
          )}
          <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
        </div>
        {conversation.unread > 0 && (
          <div className="bg-ksb-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {conversation.unread}
          </div>
        )}
      </div>
    </div>
  );
};

const Message = ({ message }) => {
  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
        {!message.isOwn && (
          <p className="text-xs text-gray-500 mb-1">{message.sender}</p>
        )}
        <div className={`px-4 py-2 rounded-lg ${
          message.isOwn 
            ? 'bg-ksb-green text-white' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm">{message.content}</p>
          {message.attachment && (
            <div className="mt-2 flex items-center space-x-2">
              <Paperclip className="w-4 h-4" />
              <span className="text-xs underline">{message.attachment}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className="text-xs text-gray-500">{message.time}</span>
          {message.isOwn && (
            <CheckCheck className="w-4 h-4 text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  const [activeConversation, setActiveConversation] = useState(chatData.conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // Handle sending message
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ksb-green"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {chatData.conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={activeConversation.id === conversation.id}
              onClick={() => setActiveConversation(conversation)}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="bg-white px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeConversation.type === 'group' ? 'bg-blue-500' : 'bg-ksb-green'
            } text-white font-semibold`}>
              {activeConversation.type === 'group' ? <Users className="w-5 h-5" /> : activeConversation.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">{activeConversation.name}</h2>
              {activeConversation.role && (
                <p className="text-xs text-gray-500">{activeConversation.role}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Phone className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Video className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {chatData.messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="bg-white border-t px-6 py-4">
          <div className="flex items-center space-x-4">
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-ksb-green"
              />
              <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <Mic className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="bg-ksb-green text-white p-2 rounded-full hover:bg-ksb-light-green transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;