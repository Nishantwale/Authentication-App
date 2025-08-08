import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AnimatedPopup({ visible, message, type, onClose }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } else {
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [visible]);
  if (!visible) return null;
  return (
    <Animated.View style={[styles.popup, type === 'success' ? styles.success : styles.error, { opacity: fadeAnim }]}> 
      <Text style={styles.popupText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  popup: { position: 'absolute', top: '40%', left: 30, right: 30, backgroundColor: '#fff', borderRadius: 10, padding: 24, alignItems: 'center', elevation: 10, zIndex: 100 },
  success: { borderColor: '#28a745', borderWidth: 2 },
  error: { borderColor: '#dc3545', borderWidth: 2 },
  popupText: { fontSize: 18, marginBottom: 12, color: '#222' },
  popupClose: { color: '#007bff', fontWeight: 'bold', fontSize: 16 }
});
