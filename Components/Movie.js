import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';

function MovieDetails({route}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  

  const { itemId } = route.params;
  
  const [trailerKey, setTrailerKey] = useState(null);

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
      
    }
    fetchMovieDetails();
  }, [itemId]);

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
          <View style={styles.reviews}>
            <Text style={styles.reviewsTitle}>Reviews</Text>
            <TouchableOpacity style={styles.addReviewButton}>
              <Text style={styles.addReviewText}>Add Review</Text>
            </TouchableOpacity>
            <View style={styles.comments}>
              <Text style={styles.commentText}>No comments yet</Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  poster: {
    width: 120,
    height: 180,
  },
  headerText: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rating: {
    marginTop: 10,
    backgroundColor: 'gold',
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
    fontSize: 18,
    lineHeight: 24,
  },
  reviews: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
 
 
    addReviewButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 4,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
        },
        addReviewText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        },
        comments: {
        marginTop: 20,
        },
        commentText: {
        fontSize: 16,
        },
        });
        
      export default MovieDetails;