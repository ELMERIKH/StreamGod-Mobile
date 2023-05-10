import React, { useState, useEffect, useRef  } from 'react';
import { StyleSheet,View, Text, Image, FlatList, TouchableOpacity,TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [Allmovies, setAllMovies] = useState([]);
  const [filteredTVShows, setFilteredTVShows] = useState([]);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const navigation = useNavigation(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);


  useEffect(() => {
    async function fetchMovies() {
   
      const apiKey = '152f41397d36a9af171b938124f0281c';
      setIsLoading(true);
      
      const perPage = 20;
      const totalPages = 100;

      let results = [];

      for (let i = 1; i <= totalPages; i++) {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${i}`);
        const pageResults = res.data.results.slice(0, perPage);
        results = [...results, ...pageResults];
      }


      const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}`);
      const resul = res.data.results.slice(0, perPage);

     

      setMovies(resul);
      setAllMovies(results);
      
      setIsLoading(false);
    }
    fetchMovies();
  }, [page]);
  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      const apiKey = '152f41397d36a9af171b938124f0281c';

      // Search for movies
      const movieRes = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${text}`);
      const movieResults = movieRes.data.results;

      // Search for TV shows
      const tvShowRes = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${text}`);
      const tvShowResults = tvShowRes.data.results;

      setFilteredMovies(movieResults);
      setFilteredTVShows(tvShowResults);
    } else {
      setFilteredMovies([]);
      setFilteredTVShows([]);
    }
  };

  const handleNextPage = () => {
  if (!isLoading) {
    setPage(prevPage => prevPage + 1);
  }
};

const handlePrevPage = () => {
  if (!isLoading && page > 1) {
    setPage(prevPage => prevPage - 1);
  }
};


const renderItem = ({ item, }) => {  
  const isMovie = item.hasOwnProperty('title'); // Check if it's a movie or TV show
    const title = isMovie ? item.title : item.name;
    const releaseDate = isMovie ? item.release_date : item.first_air_date;
    const itemType = isMovie ? 'Movie' : 'TV Show';



  return (
    
<TouchableOpacity style={{ flexDirection: 'row', marginVertical: 10}} onPress={() => navigation.navigate('MovieDetails', { itemId : item.id })}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={styles.image} />
      <View  style={{ marginLeft: 10 }}>
        <Text style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>{title}</Text>
        <Text style={[styles.title, { fontSize: 16 }]}>{releaseDate}</Text>
        <Text style={[styles.title,{ fontSize: 16 }]}>{itemType}</Text>
        <Text style={[styles.title,{ fontSize: 16 }]}>{item.vote_average}⭐</Text>
      </View>
    </TouchableOpacity>
  );

};
  const keyExtractor = item => item.id.toString();


  return (
    <View style={{ height: '100%'}}>
            <TextInput style={[styles.input, { textAlign: 'center' }]} placeholder="Search movies ..." onChangeText={handleSearch} />

      <FlatList style={styles.container}
        ref={flatListRef}
        data={[...filteredMovies, ...filteredTVShows]}
        contentContainerStyle={{ paddingBottom: 20 }}

        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={isLoading && <Text style={{ textAlign: 'center', marginVertical: 10, color:'#FFFFFF' }}>Loading Movies...</Text>}
      />
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#212A3E'
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    marginLeft:20,
    borderRadius:20,
  },
  title: {
    color:'white',
    textTransform:'uppercase',
    marginBottom:10,
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});


export default MovieList;
