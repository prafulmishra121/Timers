import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Timer = ({ timer, onUpdate, onRemove }) => {
  const [timeLeft, setTimeLeft] = useState(timer.time);
  const [isRunning, setIsRunning] = useState(timer.isRunning);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date(0));

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      clearInterval(interval);
      if (isRunning) {
        Alert.alert(`Timer ${timer.id}`, 'Time is up!');
        setIsRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleConfirm = (event, selectedDate) => {
    if (event.type !== 'dismissed' && selectedDate) {
      setSelectedTime(selectedDate);
      const totalSeconds =
        selectedDate.getHours() * 3600 +
        selectedDate.getMinutes() * 60 +
        selectedDate.getSeconds();
      setTimeLeft(totalSeconds);
    }
    setShowPicker(false);
  };

  const handleStartPause = () => {
    if (!isRunning && selectedTime) {
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setTimeLeft(60); // Reset the time to 60 seconds (1:00)
    setIsRunning(false);
  };

  const handleRemove = () => {
    onRemove(timer.id); // Call the remove function passed from the parent
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.time_id}>Timer {timer.id}</Text>
      <Text style={styles.time}>{formatTimeDisplay(timeLeft)}</Text>
      <TouchableOpacity style={styles.btn1} onPress={() => setShowPicker(true)}>
        <Text style={styles.btnText}>Set Time</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="spinner"
          is24Hour={true}
          onChange={handleConfirm}
        />
      )}
      <TouchableOpacity style={[styles.btn1, { backgroundColor: isRunning ? 'red' : 'black' }]} onPress={handleStartPause}>
        <Text style={styles.btnText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn1} onPress={handleReset}>
        <Text style={styles.btnText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn1} onPress={handleRemove}>
        <Text style={styles.btnText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const formatTimeDisplay = (seconds) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
};

const styles = StyleSheet.create({
  timerContainer: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 2,
    width: "90%",
    alignSelf: "center",
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    width: 100,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btn1: {
    marginBottom: 10,
    width: '80%',
    borderRadius: 5,
    backgroundColor: Platform.OS === 'android' ? 'black' : 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  time: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginBottom: "5%",
  },
  time_id: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    textDecorationLine: "underline",
  },
});

export default Timer;