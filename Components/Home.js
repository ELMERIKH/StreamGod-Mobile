import React, { useState, useEffect } from 'react';
import { View, Text ,TouchableOpacity,Button,FlatList,StyleSheet,Image,ScrollView} from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper/src';

import { useNavigation } from '@react-navigation/native';
import ProfileDropdown from './ProfileDropdown';



function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0); 
  const [currentMovies, setCurrentMovies] = useState([]);
  const [categoryPages, setCategoryPages] = useState([]);

// current category index
const [movies, setMovies] = useState([]);
const [page, setPage] = useState(1); // current page number
const moviesPerPage = 20; 

  const navigation = useNavigation();
  const [showProfile, setShowProfile] = useState(false); // Add state to toggle profile view
  const categories = [
    { name: "Popular", endpoint: "https://api.themoviedb.org/3/movie/popular?api_key=152f41397d36a9af171b938124f0281c&page=" },
    { name: "Top Rated", endpoint: "https://api.themoviedb.org/3/movie/top_rated?api_key=152f41397d36a9af171b938124f0281c&page=" },
    { name: "Trending", endpoint: "https://api.themoviedb.org/3/movie/now_playing?api_key=152f41397d36a9af171b938124f0281c&page=" },
    // Add more categories as needed
  ];
  useEffect(() => {
    async function fetchPopularMovies(page) {
      const apiKey = '152f41397d36a9af171b938124f0281c';
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`);
      setPopularMovies(res.data.results);
    }

    fetchPopularMovies(1);
  }, []);
  
  useEffect(() => {
    async function fetchMovies() {
      const moviesData = [];
      const pagesData = [];

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const endpoint = category.endpoint + (categoryPages[i] || 1);

        const res = await axios.get(endpoint);
        const categoryMovies = res.data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
          overview: movie.overview,
          releaseDate: movie.release_date,
          category: i,
        }));
        moviesData.push(categoryMovies);
        pagesData.push(res.data.page);
      }
      setMovies(moviesData);
      setCategoryPages(pagesData);
    }

    fetchMovies();
  }, [categoryPages]);
  const handlePageChange = (pageIndex, nextPage) => {
    const updatedPages = [...categoryPages];
    updatedPages[pageIndex] = nextPage;
    setCategoryPages(updatedPages);
  };



  return (
    <View style={styles.container}>
      <View style={styles.navbar}> 
    
      <ProfileDropdown />
     
      </View>
      <ScrollView >
      <Text style={styles.titleText}>FEATURED MOVIES</Text>
      <Swiper slidesPerView={3} spaceBetween={20}>
        {popularMovies.map((movie) => (
          <View key={movie.id}>
                        <View style={styles.movieContainer}>
                        <TouchableOpacity  onPress={() => navigation.navigate('MovieDetails', { itemId : movie.id })}>

            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
              }}
              style={styles.poster}/>
                         <Text style={styles.title}>{movie.title}</Text>
                         </TouchableOpacity>
                         </View>

          </View>
        ))}
      </Swiper>
      <View style={styles.categoriesContainer}>
      {categories.map((category, index) => (
 <View key={index} style={styles.categoryContainer}>
 <Text style={styles.categoryTitle}>{category.name}</Text>
 {movies[index] && (
   <ScrollView horizontal>
     {movies[index].map((movie) => (
       <TouchableOpacity
         key={movie.id}
         style={styles.movieCard}
         onPress={() => navigation.navigate('MovieDetails', { itemId: movie.id })}
       >
         <Image source={{ uri: movie.image }} style={styles.movieImage} />
         <Text style={styles.movieTitle}>{movie.title}</Text>
         <Text style={styles.movieRating}>Rating: {movie.rating}</Text>
       </TouchableOpacity>
     ))}
   </ScrollView>
 )}
 <View style={styles.pagination}>
   <TouchableOpacity
     disabled={categoryPages[index] === 1}
     onPress={() => handlePageChange(index, categoryPages[index] - 1)}
     style={[styles.paginationButton, { marginRight: 10 }]}
   >
     <Text>Previous Page</Text>
   </TouchableOpacity>
   <Text>{categoryPages[index]}</Text>
   <TouchableOpacity
     disabled={movies[index] && categoryPages[index] >= Math.ceil(movies[index].length / moviesPerPage)}
     onPress={() => handlePageChange(index, categoryPages[index] + 1)}
     style={[styles.paginationButton, { marginLeft: 10 }]}
   >
     <Text>Next Page</Text>
   </TouchableOpacity>
 </View>
</View>
))}
</View>
</ScrollView>
</View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212A3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    height: 50,
    width: '100%',
    backgroundColor: '#394867',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#A5C0DD',
    borderRadius: 5,
    
  },
  navButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  titleText:{
    color:'#FFFFFF',
    marginTop: 7,
    fontSize: 30,
    fontWeight: 'bold',
  },
  poster: {
    width: 300,
    height: 450,
    marginTop:10,
    marginHorizontal: 55,

  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#FFFFFF'
    
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
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'gold',
    marginBottom: 10,
  },
  movieCard: {
    marginRight: 10,
    width: 150,
    alignItems: 'center',
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color:"white",

    textAlign: 'center',
  },
});
export default HomePage;