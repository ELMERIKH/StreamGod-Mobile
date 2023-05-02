import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

import ProfileScreen from './Components/ProfileScreen';
import LoginPage from './Components/login';
import MovieList from './Components/MovieList';
import MovieDetails from './Components/Movie';
import HomePage from './Components/Home';
import { registerRootComponent } from "expo";
import MyTabs from './Components/Tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const BottomTab=createBottomTabNavigator();
const Tab = createBottomTabNavigator();

  const Stack = createStackNavigator();
  function HomeStack() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
       
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    );
  }
  
  function App() {
    return (
      <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
  <BottomTab.Screen name="Home" component={HomeStack} />
  <BottomTab.Screen name="Search" component={MovieList} />
</BottomTab.Navigator>
      </NavigationContainer>
    );
  }
 
  export default App;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// npm start


// npx expo start --tunnel

/*   
      replace : const Stack = createStackNavigator();  --->  const Tab = createBottomTabNavigator();

      replace : import { createStackNavigator } from '@react-navigation/stack';   --->   import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

      ga3 dakchi lli wst return, replace with code below
      
      |
      |
      V

      <NavigationContainer>
      <Tab.Navigator tabBarOptions={{ activeTintColor: 'red', inactiveTintColor: 'green', backgroundColor:'black'}}>
      <Tab.Screen name="Home"   component={HomePage} />
      <Tab.Screen name="Search" component={MovieList} />
      </Tab.Navigator>
      </NavigationContainer>


*/