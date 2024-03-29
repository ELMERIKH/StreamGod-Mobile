import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Animated, Text, View,TouchableOpacity } from 'react-native';

import ProfileScreen from './Components/ProfileScreen';

import MovieList from './Components/MovieList';
import MovieDetails from './Components/Movie';
import HomePage from './Components/Home';
import { registerRootComponent } from "expo";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import TVHomePage from './Components/TVHome';
import TVDetails from './Components/TV';


const BottomTab=createBottomTabNavigator();
const Tab = createBottomTabNavigator();

const GradientBackground = () => (
  <LinearGradient
    colors={['#212A3E', '#212A2E', '#212A3E']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={StyleSheet.absoluteFill}
  />
);

  const Stack = createStackNavigator();
  function HomeStack() {
    return (
      <Stack.Navigator      initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage}options={{ headerShown: false}} />
        <Stack.Screen name="TVHome" component={TVHomePage}options={{ headerShown: false}} />
        <Stack.Screen name="TVDetails" component={TVDetails} options={{ headerShown: false}}/>

        <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ headerShown: false}}/>
      </Stack.Navigator>
    );
  }
  
  function App() {
    return (
      <NavigationContainer>
      <BottomTab.Navigator style={styles.B}
         tabBarOptions={{       
          activeTintColor: 'gold',
          inactiveTintColor: 'white',
          style: {
            backgroundColor: 'black',
            borderTopWidth: 10,
          },
          labelStyle: {
            fontWeight: 'bold',
            fontSize: 12,
          },
        }}
      
     
        screenOptions={({ route }) => ({ tabBarBackground:GradientBackground,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            }

            return <Ionicons name={iconName} size={size} color={color}  />;
          },
        })}
      >
  <BottomTab.Screen name="Home" component={HomeStack} options={{
          title: 'Home',
          
          headerStyle: {
            
            backgroundColor: '#FFD400',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
  <BottomTab.Screen name="Search" component={MovieList}  options={{title: 'Search',
          headerStyle: {
            backgroundColor: 'gold',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
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
  B:{
backgroundColor:'black'
  }
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