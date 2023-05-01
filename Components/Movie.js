import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity,Button } from 'react-native';
import axios from 'axios';
import { WebView} from 'react-native-webview';
import Reviews from './Reviews';



function MovieDetails({route}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState({});
  const [url, setUrl] = useState('');


 
  const { itemId } = route.params;
  
  const [trailerKey, setTrailerKey] = useState(null);

  const [allowRedirect, setAllowRedirect] = useState(false);

  const handleShouldStartLoadWithRequest = (event) => {
    // Check if the request is a redirect
    if (event.navigationType === 'click' && !allowRedirect) {
      return false;
    }
    return true;
  };
  

  
  useEffect(() => {
    async function fetchTrailer() {
      const apiKey = '152f41397d36a9af171b938124f0281c';
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${itemId}/videos?api_key=${apiKey}`);
      const trailer = res.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    }
    fetchTrailer();
  }, [itemId]);
  useEffect(() => {
  
    async function fetchMovieDetails() {
 
      const apiKey = '152f41397d36a9af171b938124f0281c';
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${itemId}?api_key=${apiKey}`);
      setIsLoading(false);
      setMovie(res.data);
      setId(res.data.imdb_id)
      
    }
    fetchMovieDetails();
  }, [itemId]);
 
  
  
 
  const handleUrlChange = (prop) => {
    setUrl(prop);
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={styles.header}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} style={styles.poster} />
            <View style={styles.headerText}>
              <Text style={styles.title}>{movie.title}</Text>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>{movie.vote_average}</Text>
              </View>
            </View>
          </View>
          <View style={styles.trailer}>
          {trailerKey && <WebView source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }} style={{ width: 420, height: 120 }} />}
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{movie.overview}</Text>
          </View> 
          
          <View style={styles.trailer}>
      
          {url&&id&& <WebView  source={{ uri: `${url}${id}`  }}  allowsBackForwardNavigationGestures={false}       onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}

          style={{ width: 400, height: 120 }}   allowsFullscreenVideo={true} key={url}
          />} 
          </View>  
          
          <View style={styles.reviews}>
          <Button Style={styles.Button} title="Watch Movie Here" onPress={() => handleUrlChange('https://v2.vidsrc.me/embed/') } />
          </View>
        </>
      )}
    </ScrollView>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212A3E',
  },
  header: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  headerText: {
    flex: 1,
    color:'#FFFFFF',
    marginLeft: 20,
    justifyContent: 'center',
  },
  title: {
    color:'#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  rating: {
    marginTop: 10,
    backgroundColor: '#F3E99F',
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  ratingText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trailer: {
    marginTop: 20,
    height: 250,
  },
  description: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  descriptionText: {
    color:'#FFFFFF',
    fontSize: 20,
    lineHeight: 30,
  },
  reviews: {
    marginTop: 20,
    paddingBottom:20,
  },
  Button:{
    backgroundColor:'green'
  }
});
        
      export default MovieDetails;