import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AnimatedPopup from '../components/AnimatedPopup';

export default function WelcomeScreen() {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const { theme, toggleTheme, isDark } = useTheme();
  const [popup, setPopup] = useState({ visible: false, message: '', type: 'success' });
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <View style={styles.headerRow}>
        <Text style={[styles.appName, { color: theme.button }]}>Login & Signup App</Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Ionicons name={isDark ? 'sunny' : 'moon'} size={28} color={theme.button} />
        </TouchableOpacity>
      </View>
      <View style={[styles.card, { backgroundColor: theme.card, shadowColor: isDark ? '#000' : '#000' }]}> 
        <Image source={require('../../assets/images/react-logo.png')} style={styles.logo} />
        <Text style={[styles.title, { color: theme.text }]}>Hello, {username || 'User'}!</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Welcome to your professional login & signup app</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={() => {
          setPopup({ visible: true, message: 'Logged out successfully', type: 'success' });
          setTimeout(() => {
            setPopup(p => ({ ...p, visible: false }));
            router.replace('screens/LoginScreen');
          }, 1500);
        }}> 
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Logout</Text>
        </TouchableOpacity>
      </View>
      <AnimatedPopup
        visible={popup.visible}
        message={popup.message}
        type={popup.type}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 18,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  themeToggle: {
    padding: 6,
    borderRadius: 20,
  },
  card: {
    width: '90%',
    borderRadius: 16,
    padding: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
