"use client"
import { View, Text, StyleSheet, ScrollView, Image } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"
import SoloLevelingButton from "../components/SoloLevelingButton"
import ExerciseCard from "../components/ExerciseCard"
import RecipeCard from "../components/RecipeCard"
import ChallengeCard from "../components/ChallengeCard"

const HomeScreen = () => {
  const { isDark } = useTheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? colors.dark.background : colors.light.background }]}
    >
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: "https://example.com/solo-leveling-inspired-hero.jpg" }} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Level Up Your Fitness</Text>
          <Text style={styles.heroSubtitle}>Track, Challenge, Conquer</Text>
          <SoloLevelingButton title="Start Training" onPress={() => {}} style={styles.heroButton} />
        </View>
      </View>

      {/* Today's Workout */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.dark.text : colors.light.text }]}>
            Today's Workout
          </Text>
          <SoloLevelingButton
            title="View All"
            onPress={() => {}}
            variant="outline"
            style={styles.smallButton}
            textStyle={styles.smallButtonText}
          />
        </View>

        <ExerciseCard
          name="Chest & Arms"
          description="Build strength with this upper body workout focusing on chest and arms."
          imageUrl="https://example.com/chest-workout.jpg"
          duration="45 min"
          onPress={() => {}}
          onInfoPress={() => {}}
          onVideoPress={() => {}}
        />
      </View>

      {/* Meal Suggestions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.dark.text : colors.light.text }]}>
            Meal Suggestions
          </Text>
          <SoloLevelingButton
            title="View All"
            onPress={() => {}}
            variant="outline"
            style={styles.smallButton}
            textStyle={styles.smallButtonText}
          />
        </View>

        <View style={styles.recipeGrid}>
          <RecipeCard
            title="High Protein Breakfast Bowl"
            imageUrl="https://example.com/breakfast-bowl.jpg"
            prepTime="15 min"
            calories={320}
            onPress={() => {}}
            onFavoritePress={() => {}}
          />
          <RecipeCard
            title="Post-Workout Smoothie"
            imageUrl="https://example.com/smoothie.jpg"
            prepTime="5 min"
            calories={210}
            isFavorite={true}
            onPress={() => {}}
            onFavoritePress={() => {}}
          />
        </View>
      </View>

      {/* Active Challenges */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.dark.text : colors.light.text }]}>
            Active Challenges
          </Text>
          <SoloLevelingButton
            title="View All"
            onPress={() => {}}
            variant="outline"
            style={styles.smallButton}
            textStyle={styles.smallButtonText}
          />
        </View>

        <ChallengeCard
          title="30-Day Strength Challenge"
          description="Level up your strength with daily exercises. Complete all tasks to earn rewards."
          participants={24}
          daysLeft={18}
          progress={40}
          imageUrl="https://example.com/strength-challenge.jpg"
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroContainer: {
    height: 240,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  heroButton: {
    minWidth: 160,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  smallButtonText: {
    fontSize: 12,
  },
  recipeGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
})

export default HomeScreen

