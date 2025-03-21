"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"
import AIChatBubble from "../components/AIChatBubble"
import { Input } from "react-native-elements"
import { Send, Mic, Image as ImageIcon } from "lucide-react-native"

const AIChatScreen = () => {
  const { isDark } = useTheme()
  const [message, setMessage] = useState("")

  const initialMessages = [
    {
      id: "1",
      text: "Hello! I'm your Fit Assistant AI. I can help you track your meals, workouts, and provide fitness advice. How can I assist you today?",
      isUser: false,
      timestamp: "10:00 AM",
    },
    {
      id: "2",
      text: "I just finished a 5K run in 25 minutes.",
      isUser: true,
      timestamp: "10:05 AM",
    },
    {
      id: "3",
      text: "Great job! I've logged your 5K run (25 minutes) to your workout history. That's approximately 300 calories burned. Would you like me to add this to your daily tracking?",
      isUser: false,
      timestamp: "10:05 AM",
    },
    {
      id: "4",
      text: "Yes, please add it to my tracking.",
      isUser: true,
      timestamp: "10:06 AM",
    },
    {
      id: "5",
      text: "Done! I've added the workout to your daily tracking. Your current stats for today: 1 workout completed, 300 calories burned, 25 minutes of exercise. Anything else you'd like to track or know?",
      isUser: false,
      timestamp: "10:06 AM",
    },
  ]

  const [messages, setMessages] = useState(initialMessages)

  const sendMessage = () => {
    if (message.trim() === "") return

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: "I've processed your message and updated your fitness data accordingly. Is there anything else you'd like to track or know?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prevMessages) => [...prevMessages, aiResponse])
    }, 1000)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={[styles.container, { backgroundColor: isDark ? colors.dark.background : colors.light.background }]}>
        <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
          {messages.map((msg) => (
            <AIChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
          ))}
        </ScrollView>

        <View style={[styles.inputContainer, { backgroundColor: isDark ? colors.dark.card : colors.light.card }]}>
          <TouchableOpacity style={styles.attachButton}>
            <ImageIcon size={24} color={isDark ? colors.dark.text : colors.light.text} />
          </TouchableOpacity>

          <Input
            placeholder="Type what you ate or your workout..."
            value={message}
            onChangeText={setMessage}
            inputContainerStyle={styles.inputField}
            containerStyle={styles.inputWrapper}
            inputStyle={{ color: isDark ? colors.dark.text : colors.light.text }}
            onSubmitEditing={sendMessage}
          />

          <TouchableOpacity style={styles.micButton}>
            <Mic size={24} color={isDark ? colors.dark.text : colors.light.text} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.primary }]} onPress={sendMessage}>
            <Send size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flex: 1,
    paddingHorizontal: 0,
    height: 50,
  },
  inputField: {
    borderBottomWidth: 0,
  },
  attachButton: {
    padding: 8,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
})

export default AIChatScreen

