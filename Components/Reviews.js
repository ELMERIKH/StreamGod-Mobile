import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios';


function Reviews  ({ movieId })  {
    const [reviews, setReviews] = useState([]);
    const [limit, setLimit] = useState(3);
  
    useEffect(() => {
      fetchReviews();
    }, [movieId]);
  
    const fetchReviews = async () => {
      try {
        
  
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=152f41397d36a9af171b938124f0281c`
        );
        if (response.status === 200) {
            setReviews(response.data.results);
          } else {
            console.log("Request failed with status code", response.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
    const renderItem = ({ item }) => {
      return (
        <View style={styles.reviewContainer}>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      );
    };
  
    const handleLoadMore = () => {
      setLimit(limit + 3);
    };
  
    return (
        <View style={styles.container}>
          <FlatList
            data={reviews.slice(0, limit)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text>No reviews found</Text>}
            ListFooterComponent={
              limit < reviews.length ? (
                <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                  <Text style={styles.loadMoreButtonText}>Load More</Text>
                </TouchableOpacity>
              ) : null
            }
          />
        </View>
      );
    };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    reviewContainer: {
      padding: 10,
      backgroundColor: '#f9f9f9',
      marginBottom: 10,
    },
    author: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    content: {
      fontSize: 16,
      lineHeight: 24,
    },
    loadMoreButton: {
      backgroundColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      alignSelf: 'center',
      marginTop: 10,
    },
    loadMoreButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
  export default Reviews;
  