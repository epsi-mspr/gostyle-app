import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './components/AccountScreen';
import HomeScreen from './components/HomeScreen';
import PromotionScreen from './components/PromotionScreen';
import Firebase from './config/firbaseConfig';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: (icon) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = icon.focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Account') {
              iconName = icon.focused ? 'person' : 'person-outline';
            } else if (route.name === 'Promotions') {
              iconName = icon.focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName} size={icon.size} color={icon.color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Promotions" component={PromotionScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
