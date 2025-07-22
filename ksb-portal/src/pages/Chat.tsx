import React, { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Users, Bot, Pin, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isBot?: boolean;
  isMe?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

interface ChatGroup {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  type: 'individual' | 'group';
  members?: number;
}

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const chatGroups: ChatGroup[] = [
    {
      id: '1',
      name: 'Regional Managers',
      lastMessage: 'Production targets for Q4 have been updated',
      timestamp: '10:30 AM',
      unread: 3,
      online: true,
      type: 'group',
      members: 8
    },
    {
      id: '2',
      name: 'Field Officers',
      lastMessage: 'Farm inspection report submitted',
      timestamp: '9:45 AM',
      unread: 12,
      online: true,
      type: 'group',
      members: 24
    },
    {
      id: '3',
      name: 'Dr. Sarah Wanjiku',
      lastMessage: 'The compliance review is ready',
      timestamp: '9:15 AM',
      unread: 1,
      online: true,
      type: 'individual'
    },
    {
      id: '4',
      name: 'Mill Representatives',
      lastMessage: 'License renewal documentation complete',
      timestamp: 'Yesterday',
      unread: 0,
      online: false,
      type: 'group',
      members: 15
    },
    {
      id: '5',
      name: 'AI Assistant',
      lastMessage: 'Daily briefing is ready for review',
      timestamp: '6:00 AM',
      unread: 1,
      online: true,
      type: 'individual'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'David Kiplagat',
      content: 'Good morning team. The Western region production numbers are looking promising this month.',
      timestamp: '9:30 AM',
      priority: 'medium'
    },
    {
      id: '2',
      sender: 'Mary Ndung\'u',
      content: 'Confirmed. Mumias factory is now at 85% capacity. Should we schedule a visit?',
      timestamp: '9:35 AM',
      priority: 'high'
    },
    {
      id: '3',
      sender: 'You',
      content: 'Excellent progress. Let\'s schedule for next week. Mary, can you coordinate with the local team?',
      timestamp: '9:40 AM',
      isMe: true
    },
    {
      id: '4',
      sender: 'AI Assistant',
      content: 'Based on current trends, I recommend prioritizing the visit. Weather forecasts show optimal conditions for the next 10 days.',
      timestamp: '9:41 AM',
      isBot: true,
      priority: 'medium'
    },
    {
      id: '5',
      sender: 'David Kiplagat',
      content: 'The production targets for Q4 have been updated in the system. All mills have been notified.',
      timestamp: '10:30 AM',
      priority: 'low'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle message sending
      setNewMessage('');
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const filteredChats = chatGroups.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex bg-white">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Chat Groups */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat === chat.id ? 'bg-green-50 border-r-2 border-r-green-600' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                    chat.type === 'group' ? 'bg-blue-600' : chat.name === 'AI Assistant' ? 'bg-purple-600' : 'bg-green-600'
                  }`}>
                    {chat.type === 'group' ? <Users size={20} /> : chat.name === 'AI Assistant' ? <Bot size={20} /> : chat.name.charAt(0)}
                  </div>
                  {chat.online && chat.name !== 'AI Assistant' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {chat.name}
                      {chat.type === 'group' && (
                        <span className="ml-1 text-xs text-gray-500">({chat.members})</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{chat.timestamp}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                    chatGroups.find(c => c.id === selectedChat)?.type === 'group' ? 'bg-blue-600' : 
                    chatGroups.find(c => c.id === selectedChat)?.name === 'AI Assistant' ? 'bg-purple-600' : 'bg-green-600'
                  }`}>
                    {chatGroups.find(c => c.id === selectedChat)?.type === 'group' ? <Users size={20} /> : 
                     chatGroups.find(c => c.id === selectedChat)?.name === 'AI Assistant' ? <Bot size={20} /> : 
                     chatGroups.find(c => c.id === selectedChat)?.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {chatGroups.find(c => c.id === selectedChat)?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {chatGroups.find(c => c.id === selectedChat)?.type === 'group' ? 
                        `${chatGroups.find(c => c.id === selectedChat)?.members} members` : 
                        chatGroups.find(c => c.id === selectedChat)?.online ? 'Online' : 'Offline'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Video size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.isMe
                      ? 'bg-green-600 text-white'
                      : message.isBot
                      ? 'bg-purple-50 text-purple-900 border border-purple-200'
                      : 'bg-gray-100 text-gray-900'
                  } ${!message.isMe ? `border-l-4 ${getPriorityColor(message.priority)}` : ''}`}>
                    {!message.isMe && (
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="text-xs font-medium opacity-75">
                          {message.sender}
                        </p>
                        {message.priority === 'high' && (
                          <Pin className="text-red-500" size={12} />
                        )}
                        {message.isBot && (
                          <Bot className="text-purple-600" size={12} />
                        )}
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`