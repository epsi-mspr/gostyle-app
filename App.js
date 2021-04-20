import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/screen/HomeScreen';
import PromotionScreen from './components/screen/PromotionScreen';
import AccountScreen from './components/screen/AccountScreen';

export default function App() {
  const Tab = createBottomTabNavigator();

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
            const {
              size,
              color
            } = icon;
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Promotions" component={PromotionScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
