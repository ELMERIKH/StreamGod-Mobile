import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

import { AppRegistry, Platform } from "react-native";
import { name as appName } from "./app.json";

import LoginPage from './Components/login';
import MovieList from './Components/MovieList';
import MovieDetails from './Components/Movie';
import HomePage from './Components/Home';
import { registerRootComponent } from "expo";
  const Stack = createStackNavigator();
  function App() {

    if (Platform.OS == "android") {
      registerRootComponent(App);
    } else {
      AppRegistry.registerComponent(appName, () => App);
    }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />

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