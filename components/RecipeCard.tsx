"use client"

import type React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"
import { Clock, Flame, Heart } from "lucide-react-native"

interface RecipeCardProps {
  title: string
  imageUrl: string
  prepTime: string
  calories: number
  isFavorite?: boolean
  onPress: () => void
  onFavoritePress: () => void
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  imageUrl,
  prepTime,
  calories,
  isFavorite = false,
  onPress,
  onFavoritePress,
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
      <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
        <Heart size={20} color={isFavorite ? "#FF3B30" : "white"} fill={isFavorite ? "#FF3B30" : "transparent"} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDark ? colors.dark.text : colors.light.text }]} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={16} color={colors.primary} />
            <Text style={[styles.metaText, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }]}>
              {prepTime}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Flame size={16} color={colors.primary} />
            <Text style={[styles.metaText, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }]}>
              {calories} cal
            </Text>
          </View>
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
    width: "48%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    height: 120,
    width: "100%",
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
})

export default RecipeCard

