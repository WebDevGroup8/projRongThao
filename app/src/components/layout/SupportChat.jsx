import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { endpoint } from "@/conf/main";
import ax from "@/conf/ax";
import useAuthStore from "@/store/store";
import dayjs from "dayjs";

export default function SupportChat() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const chatContainerRef = useRef(null);

  const fetchChats = async () => {
    try {
      const res = await ax.get(endpoint.customer.message.get(user.id));
      const sortedChats = res.data.data.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      setChats(sortedChats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChats();
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      data: { text: message, sender: user.id },
    };

    try {
      await ax.post(endpoint.customer.message.create(), newMessage);
      setMessage("");
      fetchChats();
    } catch (error) {
      console.error("sending error", error);
    }
  };

  return (
    user && (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
            isOpen
              ? "bg-red-500"
              : "bg-gradient-to-r from-cyan-600 to-purple-600"
          } text-white`}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>

        {isOpen && (
          <div className="fixed right-6 bottom-24 w-11/12 rounded-xl border-gray-200 bg-white shadow-xl md:w-96">
            <div className="flex items-center space-x-4 rounded-t-xl bg-gradient-to-r from-cyan-600 to-purple-600 p-3">
              <img
                src="/admin-icon.png"
                alt="Support"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-medium text-white">
                  Support Service
                </h3>
              </div>
            </div>

            <div className="h-80 space-y-4 overflow-hidden p-2">
              <div
                ref={chatContainerRef}
                className="no-scrollbar h-full space-y-4 overflow-y-auto p-2"
              >
                {chats.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender?.id === user.id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`w-full ${
                        msg.sender?.id === user.id
                          ? "flex flex-row-reverse"
                          : "flex flex-row"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl px-4 py-1.5 ${
                          msg.sender?.id === user.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <p className="mb-0.5 text-sm">{msg.text}</p>
                        </div>
                      </div>
                      <div className="mb-1.5 flex flex-col-reverse">
                        <span className="mx-2 text-xs text-gray-500">
                          {dayjs(msg.createdAt).format("HH:mm")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex border-t-2 border-gray-300 p-3">
              <input
                type="text"
                placeholder=" Aa"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="focus:border-bg-cyan-500 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 h-10 w-10 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:bg-cyan-700"
              >
                <Send className="ml-1.5 h-5 w-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}
