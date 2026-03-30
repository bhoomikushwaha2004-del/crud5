import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function NoDataFound({ onReset }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assests/no-data.jpg')}
        style={styles.image}
      />

      <Text style={styles.title}>No Data Found </Text>

      <Text style={styles.subtitle}>
        Try changing filters 
      </Text>

      {/* 🔥 BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={onReset}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

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
    height: 200,
    width: 200,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },

  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },

  button: {
    marginTop: 20,
    backgroundColor: 'rgba(61, 110, 110, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});