import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MovieList from './MovieList';
import Home from './Home';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
      },
    },
    MovieList: {
      screen: MovieList,
      navigationOptions: {
        title: 'Movies',
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
