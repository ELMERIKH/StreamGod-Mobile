import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

import ProfileScreen from './Components/ProfileScreen';
import LoginPage from './Components/login';
import MovieList from './Components/MovieList';
import MovieDetails from './Components/Movie';
import HomePage from './Components/Home';
<<<<<<< HEAD
=======
import { registerRootComponent } from "expo";

>>>>>>> 30b1bbf4d63ab9201b23be267b25e9bb80bcd7cb
  const Stack = createStackNavigator();
  function App() {

    
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Movies" component={MovieList} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>
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