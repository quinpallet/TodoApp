import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen
          name="ホーム"
          component={HomeScreen}
          options={{ tabBarIcon: () => <Text>📋</Text> }}
        />
        <Tab.Screen
          name="設定"
          component={SettingsScreen}
          options={{ tabBarIcon: () => <Text>⚙️</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
