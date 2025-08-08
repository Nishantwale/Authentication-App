import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import AnimatedPopup from '../components/AnimatedPopup';
import { BASE_URL } from '../apiConfig';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: '', type: 'success' });
  const { theme, toggleTheme, isDark } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      setPopup({ visible: true, message: 'Email and password are required.', type: 'error' });
      setTimeout(() => setPopup(p => ({ ...p, visible: false })), 1500);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setPopup({ visible: true, message: 'Login successful!', type: 'success' });
        setTimeout(() => {
          setPopup(p => ({ ...p, visible: false }));
          router.replace({ pathname: 'screens/WelcomeScreen', params: { username: data.username } });
        }, 1500);
      } else {
        setPopup({ visible: true, message: data.message || 'Login failed.', type: 'error' });
        setTimeout(() => setPopup(p => ({ ...p, visible: false })), 1500);
      }
    } catch (error) {
      setPopup({ visible: true, message: 'Network error or server not reachable.', type: 'error' });
      setTimeout(() => setPopup(p => ({ ...p, visible: false })), 1500);
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={[styles.title, { color: theme.text }]}>Login</Text>
        <View style={[styles.inputContainer, { backgroundColor: theme.inputBg }]}> 
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
          />
        </View>
        <View style={[styles.inputContainer, { backgroundColor: theme.inputBg }]}> 
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
            {showPassword ? (
              <TextInput
                style={[styles.input, { color: theme.text, flex: 1 }]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={false}
                placeholderTextColor="#aaa"
                autoCorrect={false}
                autoCapitalize="none"
              />
            ) : (
              <TextInput
                style={[styles.input, { color: theme.text, flex: 1 }]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholderTextColor="#aaa"
                autoCorrect={false}
                autoCapitalize="none"
              />
            )}
            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={handleLogin} disabled={loading}>
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => router.push('screens/SignupScreen')} disabled={loading}>
          <Text style={[styles.linkText, { color: theme.link }]}>Don't have an account? Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => router.push('screens/ForgotPasswordScreen')} disabled={loading}>
          <Text style={[styles.linkText, { color: theme.link }]}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <AnimatedPopup
        visible={popup.visible}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, visible: false })}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 14,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
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
  link: {
    marginTop: 16,
  },
  linkText: {
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
});
