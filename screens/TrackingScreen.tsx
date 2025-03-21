"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"
import ProgressChart from "../components/ProgressChart"
import { Calendar, ChevronDown, Plus, Scale, Dumbbell, Flame } from "lucide-react-native"

const TrackingScreen = () => {
  const { isDark } = useTheme()

  const weightData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [80, 79, 78, 77, 76, 75],
  }

  const workoutData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [45, 0, 60, 0, 30, 90, 0],
  }

  const caloriesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [2100, 2200, 2050, 2150, 2300, 2500, 2200],
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? colors.dark.background : colors.light.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDark ? colors.dark.text : colors.light.text }]}>Tracking</Text>
        <TouchableOpacity style={styles.dateSelector}>
          <Calendar size={16} color={isDark ? colors.dark.text : colors.light.text} />
          <Text style={[styles.dateText, { color: isDark ? colors.dark.text : colors.light.text }]}>March 2023</Text>
          <ChevronDown size={16} color={isDark ? colors.dark.text : colors.light.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: isDark ? colors.dark.card : colors.light.card }]}>
          <Scale size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: isDark ? colors.dark.text : colors.light.text }]}>75 kg</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }]}>
            Current Weight
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: isDark ? colors.dark.card : colors.light.card }]}>
          <Dumbbell size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: isDark ? colors.dark.text : colors.light.text }]}>4</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }]}>
            Workouts This Week
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: isDark ? colors.dark.card : colors.light.card }]}>
          <Flame size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: isDark ? colors.dark.text : colors.light.text }]}>2,200</Text>
          <Text style={[styles.statLabel, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }]}>
            Avg. Daily Calories
          </Text>
        </View>
      </View>

      <ProgressChart title="Weight Progress" data={weightData.data} labels={weightData.labels} unit="kg" />

      <ProgressChart title="Workout Duration" data={workoutData.data} labels={workoutData.labels} unit="min" />

      <ProgressChart title="Calorie Intake" data={caloriesData.data} labels={caloriesData.labels} unit="cal" />

      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => {}}>
        <Plus size={24} color="#000000" />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    width: "31%",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})

export default TrackingScreen

