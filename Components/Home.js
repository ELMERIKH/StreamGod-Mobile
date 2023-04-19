import React, { useState, useEffect,useRef  } from 'react';
import { StyleSheet,View, Text, Image, FlatList, TouchableOpacity,TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function Home() {
const [page, setPage] = useState(1);
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


  return (
    
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Movie reviews</Text>
        <Text style={styles.subtitle}>rate and discuss all your favorite movies.</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={{ padding: 10, marginRight: 10 }} onPress={handlePrevPage} disabled={isLoading || page === 1}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: page === 1 ? 'gray' : 'black' }}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }} onPress={handleNextPage} disabled={isLoading}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Next</Text>
        </TouchableOpacity>
      </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Home;
