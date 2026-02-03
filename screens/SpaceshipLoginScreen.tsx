import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Rocket, User, Lock, Mail, Eye, EyeOff, Sparkles } from "lucide-react-native"
import { useAuth } from "../context/AuthContext"

const { width, height } = Dimensions.get("window")

// Star component for background
const Star: React.FC<{ delay: number; duration: number; left: number; top: number; size: number }> = ({
  delay,
  duration,
  left,
  top,
  size,
}) => {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: duration / 2,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    )
    animation.start()
    return () => animation.stop()
  }, [delay, duration, opacity])

  return (
    <Animated.View
      style={[
        styles.star,
        {
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          opacity,
        },
      ]}
    />
  )
}

// Generate random stars
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: Math.random() * 2000,
    duration: 2000 + Math.random() * 3000,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 3,
  }))
}

const SpaceshipLoginScreen: React.FC = () => {
  const { login, register, isLoading } = useAuth()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [stars] = useState(() => generateStars(50))

  // Animations
  const rocketAnimation = useRef(new Animated.Value(0)).current
  const formOpacity = useRef(new Animated.Value(0)).current
  const titleScale = useRef(new Animated.Value(0.5)).current

  useEffect(() => {
    // Rocket floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rocketAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rocketAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start()

    // Form fade in
    Animated.parallel([
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.spring(titleScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [rocketAnimation, formOpacity, titleScale])

  const rocketTranslateY = rocketAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  })

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error de Comandante", "Por favor ingresa todas las credenciales de acceso")
      return
    }

    if (!isLoginMode && !username) {
      Alert.alert("Error de Registro", "Por favor ingresa tu nombre de piloto")
      return
    }

    let success: boolean
    if (isLoginMode) {
      success = await login(email, password)
    } else {
      success = await register(email, password, username)
    }

    if (!success) {
      Alert.alert(
        "Acceso Denegado",
        isLoginMode
          ? "Credenciales invalidas. Verifica tu codigo de acceso."
          : "Error en el registro. Intenta nuevamente."
      )
    }
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setEmail("")
    setPassword("")
    setUsername("")
  }

  return (
    <View style={styles.container}>
      {/* Space Background */}
      <LinearGradient
        colors={["#0a0a1a", "#1a1a3a", "#0d0d2b"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <Star key={star.id} {...star} />
      ))}

      {/* Nebula effect */}
      <View style={styles.nebula1} />
      <View style={styles.nebula2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Rocket Logo */}
          <Animated.View
            style={[
              styles.rocketContainer,
              { transform: [{ translateY: rocketTranslateY }] },
            ]}
          >
            <View style={styles.rocketGlow} />
            <LinearGradient
              colors={["#00d4ff", "#0099cc", "#006699"]}
              style={styles.rocketBackground}
            >
              <Rocket size={50} color="#ffffff" strokeWidth={1.5} />
            </LinearGradient>
            <View style={styles.rocketTrail}>
              <View style={[styles.trailParticle, { opacity: 0.8 }]} />
              <View style={[styles.trailParticle, { opacity: 0.5, width: 6 }]} />
              <View style={[styles.trailParticle, { opacity: 0.3, width: 4 }]} />
            </View>
          </Animated.View>

          {/* Title */}
          <Animated.View style={[styles.titleContainer, { transform: [{ scale: titleScale }] }]}>
            <Text style={styles.title}>STELLAR</Text>
            <Text style={styles.subtitle}>COMMAND CENTER</Text>
            <View style={styles.titleLine} />
          </Animated.View>

          {/* Login Form */}
          <Animated.View style={[styles.formContainer, { opacity: formOpacity }]}>
            <View style={styles.formGlow} />

            <Text style={styles.formTitle}>
              {isLoginMode ? "INICIAR SESION" : "REGISTRO DE PILOTO"}
            </Text>
            <View style={styles.formTitleUnderline} />

            {/* Username field (only for register) */}
            {!isLoginMode && (
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <User size={20} color="#00d4ff" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de Piloto"
                  placeholderTextColor="#4a6fa5"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
                <View style={styles.inputGlow} />
              </View>
            )}

            {/* Email field */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Mail size={20} color="#00d4ff" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Correo Estelar"
                placeholderTextColor="#4a6fa5"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.inputGlow} />
            </View>

            {/* Password field */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Lock size={20} color="#00d4ff" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Codigo de Acceso"
                placeholderTextColor="#4a6fa5"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#00d4ff" />
                ) : (
                  <Eye size={20} color="#00d4ff" />
                )}
              </TouchableOpacity>
              <View style={styles.inputGlow} />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isLoading ? ["#333", "#222"] : ["#00d4ff", "#0099cc", "#0066aa"]}
                style={styles.submitGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <Animated.View style={styles.loadingDot} />
                    <Text style={styles.submitText}>CONECTANDO...</Text>
                  </View>
                ) : (
                  <View style={styles.buttonContent}>
                    <Sparkles size={20} color="#ffffff" style={{ marginRight: 8 }} />
                    <Text style={styles.submitText}>
                      {isLoginMode ? "ACCEDER AL SISTEMA" : "REGISTRAR PILOTO"}
                    </Text>
                  </View>
                )}
              </LinearGradient>
              <View style={styles.buttonGlow} />
            </TouchableOpacity>

            {/* Toggle Mode */}
            <TouchableOpacity style={styles.toggleButton} onPress={toggleMode}>
              <Text style={styles.toggleText}>
                {isLoginMode
                  ? "Nuevo piloto? Registrate aqui"
                  : "Ya tienes cuenta? Inicia sesion"}
              </Text>
            </TouchableOpacity>

            {/* Decorative elements */}
            <View style={styles.decorativeLine}>
              <View style={styles.lineSegment} />
              <View style={styles.lineDot} />
              <View style={styles.lineSegment} />
            </View>
          </Animated.View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>STELLAR COMMAND v2.0.26</Text>
            <Text style={styles.footerSubtext}>Sistema de Navegacion Intergalactica</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  star: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  nebula1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(0, 212, 255, 0.05)",
    top: -50,
    right: -100,
  },
  nebula2: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(138, 43, 226, 0.05)",
    bottom: 100,
    left: -80,
  },
  rocketContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  rocketGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0, 212, 255, 0.2)",
  },
  rocketBackground: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 212, 255, 0.5)",
  },
  rocketTrail: {
    flexDirection: "row",
    marginTop: 8,
    gap: 4,
  },
  trailParticle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff6b35",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#00d4ff",
    letterSpacing: 8,
    textShadowColor: "rgba(0, 212, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#4a6fa5",
    letterSpacing: 6,
    marginTop: 4,
  },
  titleLine: {
    width: 100,
    height: 2,
    backgroundColor: "#00d4ff",
    marginTop: 12,
    opacity: 0.5,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(10, 20, 40, 0.8)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.2)",
  },
  formGlow: {
    position: "absolute",
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.1)",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 3,
    marginBottom: 4,
  },
  formTitleUnderline: {
    width: 60,
    height: 2,
    backgroundColor: "#00d4ff",
    alignSelf: "center",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 30, 60, 0.6)",
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.2)",
    position: "relative",
  },
  inputIcon: {
    padding: 14,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    paddingVertical: 14,
    paddingRight: 14,
  },
  inputGlow: {
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: "rgba(0, 212, 255, 0.3)",
  },
  eyeIcon: {
    padding: 14,
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  buttonGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00d4ff",
    marginRight: 10,
  },
  toggleButton: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleText: {
    color: "#4a6fa5",
    fontSize: 14,
  },
  decorativeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    gap: 8,
  },
  lineSegment: {
    width: 40,
    height: 1,
    backgroundColor: "rgba(0, 212, 255, 0.3)",
  },
  lineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00d4ff",
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    color: "#4a6fa5",
    fontSize: 12,
    letterSpacing: 2,
  },
  footerSubtext: {
    color: "#2a4a75",
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 1,
  },
})

export default SpaceshipLoginScreen
