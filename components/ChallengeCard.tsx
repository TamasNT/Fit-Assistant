"use client"

import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"
import { Trophy, Users, Calendar } from "lucide-react-native"
import { LinearGradient } from "expo-linear-gradient"

interface ChallengeCardProps {
  title: string
  description: string
  participants: number
  daysLeft: number
  progress: number
  imageUrl: string
  onPress: () => void
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  participants,
  daysLeft,
  progress,
  imageUrl,
  onPress,
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
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.gradient} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Trophy size={20} color={colors.primary} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Users size={16} color={colors.primary} />
            <Text style={styles.metaText}>{participants} participants</Text>
          </View>
          <View style={styles.metaItem}>
            <Calendar size={16} color={colors.primary} />
            <Text style={styles.metaText}>{daysLeft} days left</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: colors.primary }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
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
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 160,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "bold",
  },
})

export default ChallengeCard

