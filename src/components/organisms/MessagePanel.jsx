import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const MessagePanel = ({ messages, onSendMessage, currentUser = "agent" }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage({
        sender: currentUser,
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: true
      });
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ApperIcon name="MessageSquare" className="w-5 h-5 mr-2 text-primary" />
        Communication
      </h3>

      {/* Messages */}
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No messages yet</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === currentUser
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === currentUser ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {format(new Date(message.timestamp), "MMM d, h:mm a")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Send Message */}
      <div className="space-y-3">
        <FormField
          type="textarea"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={3}
        />
        <div className="flex justify-end">
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            <ApperIcon name="Send" className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MessagePanel;