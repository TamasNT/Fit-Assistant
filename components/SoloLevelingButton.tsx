"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle, ActivityIndicator } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"

interface ButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  loading?: boolean
  variant?: "primary" | "secondary" | "outline"
}

const SoloLevelingButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = "primary",
}) => {
  const { isDark } = useTheme()

  const getButtonStyles = () => {
    if (variant === "primary") {
      return {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      }
    } else if (variant === "secondary") {
      return {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
      }
    } else {
      return {
        backgroundColor: "transparent",
        borderColor: isDark ? colors.primary : colors.secondary,
      }
    }
  }

  const getTextColor = () => {
    if (variant === "outline") {
      return isDark ? colors.primary : colors.secondary
    }
    return "#000000" // Black text on colored buttons for better contrast
  }

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyles(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  disabled: {
    opacity: 0.6,
  },
})

export default SoloLevelingButton

