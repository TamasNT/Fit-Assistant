"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"
import ExerciseCard from "../components/ExerciseCard"
import { Plus, Filter, Search } from "lucide-react-native"
import { Input } from "react-native-elements"

const WorkoutScreen = () => {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("routines")

  const renderTabContent = () => {
    switch (activeTab) {
      case "routines":
        return <RoutinesTab />
      case "exercises":
        return <ExercisesTab />
      default:
        return <RoutinesTab />
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.dark.background : colors.light.background }]}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "routines" && [styles.activeTab, { borderBottomColor: colors.primary }]]}
          onPress={() => setActiveTab("routines")}
        >
          <Text
            style={[
              styles.tabText,
              { color: isDark ? colors.dark.text : colors.light.text },
              activeTab === "routines" && { color: colors.primary },
            ]}
          >
            My Routines
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "exercises" && [styles.activeTab, { borderBottomColor: colors.primary }]]}
          onPress={() => setActiveTab("exercises")}
        >
          <Text
            style={[
              styles.tabText,
              { color: isDark ? colors.dark.text : colors.light.text },
              activeTab === "exercises" && { color: colors.primary },
            ]}
          >
            Exercise Library
          </Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}

      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => {}}>
        <Plus size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  )
}

const RoutinesTab = () => {
  const { isDark } = useTheme()

  const routines = [
    {
      id: "1",
      name: "Upper Body Strength",
      description: "Focus on chest, shoulders, and arms with this strength-building routine.",
      imageUrl: "https://example.com/upper-body.jpg",
      duration: "45 min",
    },
    {
      id: "2",
      name: "Core Crusher",
      description: "Intense core workout to build abdominal strength and endurance.",
      imageUrl: "https://example.com/core-workout.jpg",
      duration: "30 min",
    },
    {
      id: "3",
      name: "Leg Day",
      description: "Complete lower body workout focusing on quads, hamstrings, and calves.",
      imageUrl: "https://example.com/leg-day.jpg",
      duration: "50 min",
    },
  ]

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search routines"
          leftIcon={<Search size={20} color={isDark ? colors.dark.text : colors.light.text} />}
          inputContainerStyle={[
            styles.searchInputContainer,
            { backgroundColor: isDark ? colors.dark.card : colors.light.card },
          ]}
          inputStyle={{ color: isDark ? colors.dark.text : colors.light.text }}
          containerStyle={styles.searchWrapper}
        />
      </View>

      {routines.map((routine) => (
        <ExerciseCard
          key={routine.id}
          name={routine.name}
          description={routine.description}
          imageUrl={routine.imageUrl}
          duration={routine.duration}
          onPress={() => {}}
          onInfoPress={() => {}}
          onVideoPress={() => {}}
        />
      ))}
    </ScrollView>
  )
}

const ExercisesTab = () => {
  const { isDark } = useTheme()

  const categories = ["All", "Strength", "Cardio", "Flexibility", "Balance"]
  const [activeCategory, setActiveCategory] = useState("All")

  const exercises = [
    {
      id: "1",
      name: "Push-ups",
      description: "Classic bodyweight exercise for chest, shoulders, and triceps.",
      imageUrl: "https://example.com/pushups.jpg",
      category: "Strength",
    },
    {
      id: "2",
      name: "Squats",
      description: "Fundamental lower body exercise targeting quads, hamstrings, and glutes.",
      imageUrl: "https://example.com/squats.jpg",
      category: "Strength",
    },
    {
      id: "3",
      name: "Plank",
      description: "Core stabilizing exercise that engages multiple muscle groups.",
      imageUrl: "https://example.com/plank.jpg",
      category: "Strength",
    },
  ]

  const filteredExercises =
    activeCategory === "All" ? exercises : exercises.filter((ex) => ex.category === activeCategory)

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search exercises"
          leftIcon={<Search size={20} color={isDark ? colors.dark.text : colors.light.text} />}
          inputContainerStyle={[
            styles.searchInputContainer,
            { backgroundColor: isDark ? colors.dark.card : colors.light.card },
          ]}
          inputStyle={{ color: isDark ? colors.dark.text : colors.light.text }}
          containerStyle={styles.searchWrapper}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={isDark ? colors.dark.text : colors.light.text} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              activeCategory === category && { backgroundColor: colors.primary },
              { borderColor: colors.primary },
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category
                  ? { color: "#000000" }
                  : { color: isDark ? colors.dark.text : colors.light.text },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredExercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          name={exercise.name}
          description={exercise.description}
          imageUrl={exercise.imageUrl}
          onPress={() => {}}
          onInfoPress={() => {}}
          onVideoPress={() => {}}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchWrapper: {
    flex: 1,
    paddingHorizontal: 0,
  },
  searchInputContainer: {
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    borderBottomWidth: 0,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  categoriesContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
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

export default WorkoutScreen

