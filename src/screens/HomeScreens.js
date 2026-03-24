import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import NoDataFound from '../components/NoDataFound';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUsers } from '../services/userApi';
import HomeHeader from '../components/HomeHeader';
import { useRoute } from '@react-navigation/native';
import Loader from '../components/Loader'

export default function HomeScreens({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const[isLoader,setIsLoader] = useState(false)

  const route = useRoute();
  const isChoice = route.params?.isChoice || [];
  console.log(isChoice,"status on home")
  const activeRoles = route.params?.activeRoles || []
  console.log(activeRoles,"roles on home")

  useEffect(() => {
    getApi();
    setIsLoader(true)
  }, []);

  useEffect(() => {
    if(data.length>0) {
      applyFilter('')
    }
  },[data])

  const getApi = async () => {
    const result = await getUsers();
    setData(result);
    setFilteredData(result);
    setIsLoader(false)
  };


  const updnvg = item => {
    navigation.navigate('Update', { item });
  };

  const usrnvg = item => {
    navigation.navigate('User', { item });
  };

  const applyFilter = (input ) => {
    const filtered = data.filter(entry => {

      const handle = entry.name?.toLowerCase().includes(input.toLowerCase()) ||
    entry.email?.toLowerCase().includes(input.toLowerCase()) ||
    entry.role?.toLowerCase().includes(input.toLowerCase()) ||
    entry.status?.toLowerCase().includes(input.toLowerCase())

    const statusMatch = isChoice.length===0 || isChoice.includes(entry.status);

    const roleMatch = activeRoles.length===0 || activeRoles.includes(entry.role);

    return handle && statusMatch && roleMatch
    })

    setFilteredData(filtered);
  };
  console.log(applyFilter, 'applifilter')

  const handleSearch = input => {
    applyFilter(input)
  }

  if(isLoader) {
    return(
      <Loader />
    )
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      
      <HomeHeader
        data={data}
        filteredData={filteredData}
        handleSearch={handleSearch}
        navigation={navigation}
        applyFilter={applyFilter}
      />
      {filteredData.length===0 ? 
        <NoDataFound navigation={navigation} />
        :
        <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <GetUsers item={item} updnvg={updnvg} />}
      />
      }
      

      <TouchableOpacity style={styles.plsicon} onPress={usrnvg}>
        <Text style={styles.plstxt}>+ </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const GetUsers = ({ item, updnvg }) => {
  return (
    <View>
      <View style={styles.item}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avataredit} source={{ uri: item.avatar }} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.role}</Text>
          <Text>{item.email}</Text>
          <Text>{item.status} </Text>
        </View>

        <TouchableOpacity onPress={() => updnvg(item)}>
          <Text style={{ color: 'purple', fontSize: 30, marginRight: 10 }}>
            {'>'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    color: 'grey',
    borderColor: 'grey',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },

  avatarContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    height: 89,
    width: 89,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation:8
  },

  divider: {
    height: 0.5,
    backgroundColor: 'grey',
    margin: 10,
  },

  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  avataredit: {
    borderRadius: 100,
    height: 100,
    width: 97,
    elevation:5
  },
  plstxt: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 7,
    elevation:8
  },
  plsicon: {
    position: 'absolute',
    backgroundColor: 'rgba(61, 110, 110, 0.6)',
    height: 70,
    width: 70,
    borderRadius: 100,
    marginLeft: 300,
    marginTop: 750,
    elevation:8
  },
});
