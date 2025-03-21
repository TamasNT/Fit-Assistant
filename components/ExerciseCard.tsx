"use client"

import type React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"
import { Play, Info } from "lucide-react-native"

interface ExerciseCardProps {
  name: string
  description: string
  imageUrl: string
  duration?: string
  onPress: () => void
  onInfoPress: () => void
  onVideoPress: () => void
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  description,
  imageUrl,
  duration,
  onPress,
  onInfoPress,
  onVideoPress,
}) => {
  const { isDark } = useTheme()

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? colors.dark.card : colors.light.card,
          borderColor: isDark ? colors.dark.border : colors.light.border,
        },
      ]}
      onPress={onPress}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.playButton} onPress={onVideoPress}>
          <Play size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? colors.dark.text : colors.light.text }]}>{name}</Text>
          <TouchableOpacity onPress={onInfoPress}>
            <Info size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text
          style={[styles.description, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }]}
          numberOfLines={2}
        >
          {description}
        </Text>
        {duration && (
          <View style={styles.durationContainer}>
            <Text style={[styles.duration, { color: colors.primary }]}>{duration}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    height: 160,
    width: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  durationContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "rgba(255,196,18,0.1)",
  },
  duration: {
    fontSize: 12,
    fontWeight: "500",
  },
})

export default ExerciseCard

