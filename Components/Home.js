import React, { useState, useEffect } from 'react';
import { View, Text ,TouchableOpacity,Button,FlatList,StyleSheet,Image} from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import ProfileDropdown from './ProfileDropdown';


function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const navigation = useNavigation();
  const [showProfile, setShowProfile] = useState(false); // Add state to toggle profile view

  useEffect(() => {
    async function fetchPopularMovies(page) {
      const apiKey = '152f41397d36a9af171b938124f0281c';
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`);
      setPopularMovies(res.data.results);
    }

    fetchPopularMovies(1);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}> 
      <ProfileDropdown />
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Movies')}>
          <Text style={styles.navButtonText}>Movie List</Text>
        </TouchableOpacity>
      </View>
      <Swiper slidesPerView={3} spaceBetween={20}>
        {popularMovies.map((movie) => (
          <View key={movie.id}>
                        <View style={styles.movieContainer}>

            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
              }}
              style={styles.poster}
            />
                         <Text style={styles.title}>{movie.title}</Text>
                         </View>
          </View>
        ))}
      </Swiper>
 
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    height: 50,
    width: '100%',
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'gold',
    borderRadius: 5,
    
  },
  navButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  poster: {
    width: 300,
    height: 450,
    marginHorizontal: 55,
    marginTop:175,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePopup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -100 }],
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gold',
  },
  profileAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
export default HomePage;