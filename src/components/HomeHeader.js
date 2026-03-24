import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeHeader({ navigation, handleSearch} ) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  

  const fltnvg = () => {
    navigation.navigate('Filter');
  };

  

  return (
    <>
      <View style={styles.hdr}>
        <Text style={styles.txt}>All Users</Text>
        <TouchableOpacity onPress={() => setIsSearchActive(true)}>
          <Text style={styles.srch}>🔍 </Text>
        </TouchableOpacity>
        <Text style={styles.line}> | </Text>
        <TouchableOpacity onPress={fltnvg}>
          <Image
            source={require('../assests/filter.png')}
            style={styles.fltr}
          />
        </TouchableOpacity>
        <Text style={styles.line}> | </Text>
        <View style={styles.divider} />
      </View>


      {isSearchActive && (
        <View style={{ backgroundColor: '#F1F1F3', flexDirection: 'row' }}>
          <TextInput
            placeholder="  🔍   Search User"
            style={styles.input}
            clearButtonMode="always"
            onChangeText={(text) =>handleSearch(text)}
          />

          <TouchableOpacity onPress={() => setIsSearchActive(false)}>
            <Image
              source={require('../assests/close.png')}
              style={styles.close}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  hdr: {
    height: 58,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor:'rgba(61, 110, 110, 0.6)',
    borderColor:'pink',
    borderRadius:10,
    borderEndColor:'pink'
    // elevation:10
  },
  txt: {
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 20,
    // marginBottom:20,
    fontSize: 21,
    fontWeight: 'bold',
    
  },
  srch: {
    marginTop: 15,
    marginLeft: 180,
    fontSize: 20,
  },
  fltr: {
    height: 20,
    width: 20,
    marginTop: 20,
  },
  line: {
    fontSize: 22,
    marginTop: 15,
    // marginBottom:5
  },
  input: {
    color: 'grey',
    borderColor: 'grey',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    width: 330,
  },
  close: {
    height: 30,
    width: 20,
    marginTop: 20,
    fontSize: 0,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'grey',
    marginVertical: 10,
  },
});
