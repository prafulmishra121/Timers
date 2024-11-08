import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Timer from '../Component/Timer';

import images from '../Component/Images';


const HomeScreen = () => {
  const [timers, setTimers] = useState([]);

  const addTimer = () => {
    if (timers.length < 5) {
      const newTimer = {id: timers.length + 1, time: 60, isRunning: false};
      setTimers([...timers, newTimer]);
    } else {
      Alert.alert('Limit Reached', 'You can only have up to 5 timers.');
    }
  };

  const updateTimer = (id, updatedTimer) => {
    setTimers(timers.map(timer => (timer.id === id ? updatedTimer : timer)));
  };

  const removeTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.Header}>TIMERS-HOME</Text>
        
        {timers.length === 0 ? (
          <View style={styles.imageContainer}>
            <Image
              source={images.wink} // Replace with your image path or variable
              style={styles.img}
            />
            <Text style={styles.noTimersText}>No timers available</Text>
          </View>
        ) : (
          <FlatList
            data={timers}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Timer timer={item} onUpdate={updateTimer} onRemove={removeTimer} />
            )}
          />
        )}
        
        <TouchableOpacity style={styles.fab} onPress={addTimer}>
          <Text style={styles.add}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor:"black"
  },
  imageContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
   // Add shadow for Android
  },
  Header:{
    fontSize: 20,
    fontWeight: 'bold',textAlign: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,color:"red",
    elevation: 5, // Add shadow for Android
  },
  add: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
  },
  img: {
    width: 100,
    height: 100,resizeMode:"contain",alignSelf:"center",marginTop:-100
  },
  fab: {
    position: 'absolute',

    backgroundColor: 'red', // Adjust to your preferred color
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '10%', // Distance from the bottom of the screen
    right: '8%', // Distance from the right side of the screen
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Add shadow for Android
  },
});

export default HomeScreen;
