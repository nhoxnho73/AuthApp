import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { AppNavigation } from './navigation/AppNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <AppNavigation></AppNavigation>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
