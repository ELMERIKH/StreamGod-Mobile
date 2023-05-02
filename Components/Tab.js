import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomePage from './Home';
import MovieList from './MovieList';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'gold',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      }}
    >
       <Tab.Navigator tabBarOptions={{ activeTintColor: 'red', inactiveTintColor: 'green', backgroundColor:'black'}}>
      <Tab.Screen name="Home"   component={HomePage} />
      <Tab.Screen name="Search" component={MovieList} />
    
      </Tab.Navigator>
    </Tab.Navigator>
  );
}
export default MyTabs;