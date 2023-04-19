import React, { useState, useEffect,useRef  } from 'react';
import { StyleSheet,View, Text, Image, FlatList, TouchableOpacity,TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [Allmovies, setAllMovies] = useState([]);

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
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${i}`);
        const pageResults = res.data.results.slice(0, perPage);
        results = [...results, ...pageResults];
      }


      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`);
      const resul = res.data.results.slice(0, perPage);

     

      setMovies(resul);
      setAllMovies(results);
      
      setIsLoading(false);
    }
    fetchMovies();
  }, [page]);
  const handleSearch = (text) => {
    const filteredResults = Allmovies.filter((movie) => {
      return movie.title.toLowerCase().includes(text.toLowerCase());
    });
    setSearchQuery(text);
    setFilteredMovies(filteredResults);
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

  

  return (
    
<TouchableOpacity style={{ flexDirection: 'row', marginVertical: 10 }} onPress={() => navigation.navigate('MovieDetails', { itemId : item.id })}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={{ width: 80, height: 120 }} />
      <View  style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ fontSize: 16 }}>{item.release_date}</Text>
        <Text style={{ fontSize: 16 }}>{item.vote_average}/10</Text>
      </View>
      
    </TouchableOpacity>
  );

};
  const keyExtractor = item => item.id.toString();


  return (
    <View style={{ height: '100%', paddingBottom: 5 }}>
            <TextInput style={styles.input } placeholder="Search movies" onChangeText={handleSearch} />

      <FlatList
        ref={flatListRef}
        data={filteredMovies.length > 0 ? filteredMovies : movies}
        contentContainerStyle={{ paddingBottom: 20 }}

        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={isLoading && <Text style={{ textAlign: 'center', marginVertical: 10 }}>Loading...</Text>}
      />
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});


export default MovieList;
