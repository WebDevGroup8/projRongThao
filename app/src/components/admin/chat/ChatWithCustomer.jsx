import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { endpoint } from "@/conf/main";
import ax from "@/conf/ax";
import dayjs from "dayjs";
import useAuthStore from "@/store/store";

export default function ChatWithCustomer() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { user } = useAuthStore();

  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages(selectedUserId);
  }, [selectedUserId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // fetch user chats
  const fetchChats = async () => {
    try {
      const res = await ax.get(endpoint.admin.user.customer.queryMessage());
      const sortedChats = res.data.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createdAt),
      );
      setChats(sortedChats);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await ax.get(endpoint.admin.message.get(userId));
      const sortedMessages = res.data.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
      console.log(sortedMessages);
      setMessages(sortedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      data: { text: newMessage, sender: user.id, receiver: selectedUserId },
    };

    try {
      await ax.post(endpoint.admin.message.create(), messageData);
      setNewMessage("");
      fetchMessages(selectedUserId);
    } catch (error) {
      console.error("Sending error", error);
    }
  };
  console.log(messages);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat List */}
      <div className="w-96 border-r border-gray-300 bg-white">
        <div className="border-b border-gray-300 p-4">
          <h1 className="m-2.5 text-2xl font-semibold">Chat with customer</h1>
        </div>
        <div className="h-[calc(100vh-89px)] overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat);
                setSelectedUserId(chat.id);
              }}
              className={`cursor-pointer border-b border-gray-300 p-4 hover:bg-gray-50 ${selectedChat?.id === chat.id ? "bg-blue-50" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{chat.username}</h3>
                <span className="text-xs text-gray-500">
                  {dayjs(chat.messages.at(-1)?.createdAt).format(
                    "HH:mm DD/MM/YY",
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat && (
        <div className="flex flex-1 flex-col">
          <div className="border-b border-gray-300 bg-white p-4">
            <h2 className="text-lg font-semibold">{selectedChat.username}</h2>
            <p className="text-gray-500">{selectedChat.email}</p>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef} // ใช้ ref เพื่อเข้าถึงคอนเทนเนอร์นี้
            className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender.role.type === "admin" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex ${message.sender.role.type === "admin" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`felx w-full rounded-lg px-4 py-2 ${message.sender.role.type === "admin" ? "bg-blue-500 text-white" : "border border-gray-300 bg-white"}`}
                  >
                    <p>{message.text}</p>
                  </div>
                  <div className="m-2 self-end text-xs text-gray-500">
                    {dayjs(message.createdAt).format("HH:mm")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 bg-white p-4">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center space-x-4"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder=" Aa"
                className="flex-1 rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-tr from-cyan-600 to-purple-600 p-2 px-4 text-white hover:bg-blue-600"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
