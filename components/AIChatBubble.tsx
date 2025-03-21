"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"

interface ChatBubbleProps {
  message: string
  isUser: boolean
  timestamp: string
}

const AIChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, timestamp }) => {
  const { isDark } = useTheme()

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      <View
        style={[
          styles.bubble,
          isUser
            ? [styles.userBubble, { backgroundColor: colors.primary }]
            : [styles.aiBubble, { backgroundColor: isDark ? "rgba(22, 23, 238, 0.2)" : "rgba(22, 23, 238, 0.1)" }],
        ]}
      >
        <Text style={[styles.message, { color: isUser ? "#000000" : isDark ? colors.dark.text : colors.light.text }]}>
          {message}
        </Text>
      </View>
      <Text style={[styles.timestamp, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }]}>
        {timestamp}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    maxWidth: "80%",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  aiContainer: {
    alignSelf: "flex-start",
  },
  bubble: {
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderBottomLeftRadius: 4,
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    marginHorizontal: 4,
  },
})

export default AIChatBubble

