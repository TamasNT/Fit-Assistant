"use client"

import type React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"

interface ProgressChartProps {
  title: string
  data: number[]
  labels: string[]
  unit: string
}

const ProgressChart: React.FC<ProgressChartProps> = ({ title, data, labels, unit }) => {
  const { isDark } = useTheme()
  const screenWidth = Dimensions.get("window").width - 32

  const chartConfig = {
    backgroundGradientFrom: isDark ? colors.dark.card : colors.light.card,
    backgroundGradientTo: isDark ? colors.dark.card : colors.light.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 196, 18, ${opacity})`,
    labelColor: (opacity = 1) => (isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`),
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: colors.secondary,
    },
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        color: (opacity = 1) => `rgba(255, 196, 18, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.dark.card : colors.light.card,
          borderColor: isDark ? colors.dark.border : colors.light.border,
        },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? colors.dark.text : colors.light.text }]}>{title}</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        yAxisSuffix={unit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
})

export default ProgressChart

