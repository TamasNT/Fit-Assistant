"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { colors } from "../theme/colors"
import { Avatar } from "react-native-elements"
import ChallengeCard from "../components/ChallengeCard"
import SoloLevelingButton from "../components/SoloLevelingButton"
import { Search, UserPlus, Trophy, Users } from "lucide-react-native"
import { Input } from "react-native-elements"

const SocialScreen = () => {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("friends")

  const renderTabContent = () => {
    switch (activeTab) {
      case "friends":
        return <FriendsTab />
      case "challenges":
        return <ChallengesTab />
      default:
        return <FriendsTab />
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.dark.background : colors.light.background }]}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "friends" && [styles.activeTab, { borderBottomColor: colors.primary }]]}
          onPress={() => setActiveTab("friends")}
        >
          <Users
            size={20}
            color={activeTab === "friends" ? colors.primary : isDark ? colors.dark.text : colors.light.text}
          />
          <Text
            style={[
              styles.tabText,
              { color: isDark ? colors.dark.text : colors.light.text },
              activeTab === "friends" && { color: colors.primary },
            ]}
          >
            Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "challenges" && [styles.activeTab, { borderBottomColor: colors.primary }]]}
          onPress={() => setActiveTab("challenges")}
        >
          <Trophy
            size={20}
            color={activeTab === "challenges" ? colors.primary : isDark ? colors.dark.text : colors.light.text}
          />
          <Text
            style={[
              styles.tabText,
              { color: isDark ? colors.dark.text : colors.light.text },
              activeTab === "challenges" && { color: colors.primary },
            ]}
          >
            Challenges
          </Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </View>
  )
}

const FriendsTab = () => {
  const { isDark } = useTheme()

  const friends = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "https://example.com/alex.jpg",
      level: 12,
      status: "Just completed a 5K run!",
      lastActive: "2h ago",
    },
    {
      id: "2",
      name: "Sarah Williams",
      avatar: "https://example.com/sarah.jpg",
      level: 18,
      status: "New personal record: 15 pull-ups!",
      lastActive: "5h ago",
    },
    {
      id: "3",
      name: "Mike Chen",
      avatar: "https://example.com/mike.jpg",
      level: 9,
      status: "Starting a new diet plan today.",
      lastActive: "1d ago",
    },
    {
      id: "4",
      name: "Emma Davis",
      avatar: "https://example.com/emma.jpg",
      level: 15,
      status: "Joined the 30-day yoga challenge!",
      lastActive: "3h ago",
    },
  ]

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search friends"
          leftIcon={<Search size={20} color={isDark ? colors.dark.text : colors.light.text} />}
          inputContainerStyle={[
            styles.searchInputContainer,
            { backgroundColor: isDark ? colors.dark.card : colors.light.card },
          ]}
          inputStyle={{ color: isDark ? colors.dark.text : colors.light.text }}
          containerStyle={styles.searchWrapper}
        />
        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
          <UserPlus size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      {friends.map((friend) => (
        <View
          key={friend.id}
          style={[styles.friendCard, { backgroundColor: isDark ? colors.dark.card : colors.light.card }]}
        >
          <View style={styles.friendHeader}>
            <View style={styles.friendInfo}>
              <Avatar rounded source={{ uri: friend.avatar }} size={50} containerStyle={styles.avatar} />
              <View>
                <Text style={[styles.friendName, { color: isDark ? colors.dark.text : colors.light.text }]}>
                  {friend.name}
                </Text>
                <Text style={[styles.friendActive, { color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }]}>
                  {friend.lastActive}
                </Text>
              </View>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.levelText}>Lv.{friend.level}</Text>
            </View>
          </View>

          <Text style={[styles.statusText, { color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }]}>
            {friend.status}
          </Text>

          <View style={styles.actionButtons}>
            <SoloLevelingButton
              title="Message"
              onPress={() => {}}
              variant="outline"
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />
            <SoloLevelingButton
              title="Challenge"
              onPress={() => {}}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const ChallengesTab = () => {
  const { isDark } = useTheme()

  const challenges = [
    {
      id: "1",
      title: "30-Day Strength Challenge",
      description: "Complete daily strength exercises to level up your power. Earn rewards for consistency.",
      participants: 24,
      daysLeft: 18,
      progress: 40,
      imageUrl: "https://example.com/strength-challenge.jpg",
    },
    {
      id: "2",
      title: "10K Steps Daily",
      description: "Walk at least 10,000 steps every day for a month. Track your progress and compete with friends.",
      participants: 56,
      daysLeft: 25,
      progress: 15,
      imageUrl: "https://example.com/steps-challenge.jpg",
    },
    {
      id: "3",
      title: "Clean Eating Challenge",
      description: "Follow a clean eating plan for 21 days. Share recipes and meal ideas with participants.",
      participants: 32,
      daysLeft: 12,
      progress: 60,
      imageUrl: "https://example.com/eating-challenge.jpg",
    },
  ]

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.challengeHeader}>
        <Text style={[styles.challengeHeaderText, { color: isDark ? colors.dark.text : colors.light.text }]}>
          Active Challenges
        </Text>
        <SoloLevelingButton 
          title="Create New" 
          onPress={() => {}} 
          style={styles.createButton}
          textStyle={styles.createButtonText}
        />
      </View>
      
      {challenges.map(challenge => (
        <ChallengeCard 
          key={challenge.id}
          title={challenge.title}
          description={challenge.description}
          participants={challenge.participants}
          daysLeft={challenge.daysLeft}
          progress={challenge.progress}
          imageUrl={challenge.imageUrl}
          onPress={() => {}}
        />
      ))}
      
      <View style={styles.challengeHeader}>
        <Text style={[styles.challengeHeaderText, { color: isDark ? colors.dark.text : colors.light.text }]}>
          Recommended Challenges
        </Text>
      </View>
      
      <ChallengeCard 
        title="Yoga for Flexibility"
        description="Daily yoga sessions to improve flexibility and mindfulness. Perfect for beginners."
        participants={48}\
        daysLeft: 30,
        progress={0}
        imageUrl="https://example.com/yoga-challenge.jpg"
        onPress={() => {}}
      />
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  friendCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  friendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  friendActive: {
    fontSize: 12,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  statusText: {
    fontSize: 14,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 14,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  challengeHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  createButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  createButtonText: {
    fontSize: 12,
  },
})

export default SocialScreen

