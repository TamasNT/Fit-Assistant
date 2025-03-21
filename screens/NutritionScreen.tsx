"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"
import RecipeCard from "../components/RecipeCard"
import SoloLevelingButton from "../components/SoloLevelingButton"
import { Plus, Search, Calendar } from "lucide-react-native"
import { Input } from "react-native-elements"

const NutritionScreen = () => {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("recipes")

  const renderTabContent = () => {
    switch (activeTab) {
      case "recipes":
        return <RecipesTab />
      case "mealPlan":
        return <MealPlanTab />
      default:
        return <RecipesTab />
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.dark.background : colors.light.background }]}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "recipes" && [styles.activeTab, { borderBottomColor: colors.primary }]]}
          onPress={() => setActiveTab("recipes")}
        >
          <Text
            style={[
              styles.tabText,
              { color: isDark ? colors.dark.text : colors.light.text },
              activeTab === "recipes" && { color: colors.primary },
            ]}
          >
            Recipes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "mealPlan" && [styles.activeTab, { borderBottomColor: colors.primary }]]}
          onPress={() => setActiveTab("mealPlan")}
        >
          <Text
            style={[
              styles.tabText,
              { color: isDark ? colors.dark.text : colors.light.text },
              activeTab === "mealPlan" && { color: colors.primary },
            ]}
          >
            Meal Plan
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

const RecipesTab = () => {
  const { isDark } = useTheme()

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Protein", "Vegan"]
  const [activeCategory, setActiveCategory] = useState("All")

  const recipes = [
    {
      id: "1",
      title: "Protein Pancakes",
      imageUrl: "https://example.com/protein-pancakes.jpg",
      prepTime: "15 min",
      calories: 320,
      category: "Breakfast",
      isFavorite: true,
    },
    {
      id: "2",
      title: "Chicken & Quinoa Bowl",
      imageUrl: "https://example.com/chicken-quinoa.jpg",
      prepTime: "25 min",
      calories: 450,
      category: "Lunch",
      isFavorite: false,
    },
    {
      id: "3",
      title: "Salmon with Roasted Vegetables",
      imageUrl: "https://example.com/salmon.jpg",
      prepTime: "30 min",
      calories: 520,
      category: "Dinner",
      isFavorite: false,
    },
    {
      id: "4",
      title: "Greek Yogurt Parfait",
      imageUrl: "https://example.com/yogurt-parfait.jpg",
      prepTime: "5 min",
      calories: 210,
      category: "Snacks",
      isFavorite: true,
    },
  ]

  const filteredRecipes =
    activeCategory === "All" ? recipes : recipes.filter((recipe) => recipe.category === activeCategory)

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search recipes"
          leftIcon={<Search size={20} color={isDark ? colors.dark.text : colors.light.text} />}
          inputContainerStyle={[
            styles.searchInputContainer,
            { backgroundColor: isDark ? colors.dark.card : colors.light.card },
          ]}
          inputStyle={{ color: isDark ? colors.dark.text : colors.light.text }}
          containerStyle={styles.searchWrapper}
        />
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

      <View style={styles.recipeGrid}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            prepTime={recipe.prepTime}
            calories={recipe.calories}
            isFavorite={recipe.isFavorite}
            onPress={() => {}}
            onFavoritePress={() => {}}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const MealPlanTab = () => {
  const { isDark } = useTheme()

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const [activeDay, setActiveDay] = useState("Monday")

  const mealPlan = {
    Monday: [
      {
        id: "1",
        mealType: "Breakfast",
        title: "Protein Pancakes",
        imageUrl: "https://example.com/protein-pancakes.jpg",
        calories: 320,
      },
      {
        id: "2",
        mealType: "Lunch",
        title: "Chicken & Quinoa Bowl",
        imageUrl: "https://example.com/chicken-quinoa.jpg",
        calories: 450,
      },
      {
        id: "3",
        mealType: "Dinner",
        title: "Salmon with Roasted Vegetables",
        imageUrl: "https://example.com/salmon.jpg",
        calories: 520,
      },
      {
        id: "4",
        mealType: "Snack",
        title: "Greek Yogurt Parfait",
        imageUrl: "https://example.com/yogurt-parfait.jpg",
        calories: 210,
      },
    ],
  }

  const dayMeals = mealPlan[activeDay] || []
  const totalCalories = dayMeals.reduce((sum, meal) => sum + meal.calories, 0)

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.calendarHeader}>
        <Calendar size={20} color={isDark ? colors.dark.text : colors.light.text} />
        <Text style={[styles.calendarText, { color: isDark ? colors.dark.text : colors.light.text }]}>March 2023</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayChip,
              activeDay === day && { backgroundColor: colors.primary },
              { borderColor: colors.primary },
            ]}
            onPress={() => setActiveDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                activeDay === day ? { color: "#000000" } : { color: isDark ? colors.dark.text : colors.light.text },
              ]}
            >
              {day.substring(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.caloriesSummary}>
        <Text style={[styles.caloriesText, { color: isDark ? colors.dark.text : colors.light.text }]}>
          Total Calories: {totalCalories}
        </Text>
      </View>

      {dayMeals.map((meal) => (
        <View
          key={meal.id}
          style={[styles.mealCard, { backgroundColor: isDark ? colors.dark.card : colors.light.card }]}
        >
          <View style={styles.mealTypeTag}>
            <Text style={styles.mealTypeText}>{meal.mealType}</Text>
          </View>
          <View style={styles.mealContent}>
            <Text style={[styles.mealTitle, { color: isDark ? colors.dark.text : colors.light.text }]}>
              {meal.title}
            </Text>
            <Text style={[styles.mealCalories, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }]}>
              {meal.calories} calories
            </Text>
          </View>
          <SoloLevelingButton
            title="Change"
            onPress={() => {}}
            variant="outline"
            style={styles.smallButton}
            textStyle={styles.smallButtonText}
          />
        </View>
      ))}

      <SoloLevelingButton title="Add Meal" onPress={() => {}} style={styles.addMealButton} />
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
  recipeGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
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
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  calendarText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  daysContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dayChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
  },
  caloriesSummary: {
    marginBottom: 16,
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mealCard: {
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  mealTypeTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  mealTypeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000000",
  },
  mealContent: {
    flex: 1,
    marginLeft: 12,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  mealCalories: {
    fontSize: 14,
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  smallButtonText: {
    fontSize: 12,
  },
  addMealButton: {
    marginTop: 16,
  },
})

export default NutritionScreen

