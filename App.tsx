import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import HomeScreen from './src/screens/HomeScreens'
import Users from './src/screens/Users'
import UpdateUser from './src/screens/UpdateUser' 
import HomeHeader from './src/components/HomeHeader'
import Filter from './src/screens/Filter' 
import Role from './src/screens/Role' 
import NotFound from './src/components/NoDataFound'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
// import { SearchBar } from 'react-native-screens'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{
        contentStyle:Styles.screen
      }}>

        <Stack.Screen 
          name='All Users' 
          component={HomeScreen}
          options={({navigation})=>({
            headerRight:()=>(
              <TouchableOpacity
                onPress={()=>navigation.navigate('User')}
                style={Styles.hdrbtn}
              >
                <Text>+</Text>
              </TouchableOpacity>
            ),
            header:()=> (
              <View>
                {/* <HomeHeader navigation={navigation} /> */}
              </View>
          )
            
          })}
        />

        <Stack.Screen 
          name='User' 
          component={Users}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen 
        name='Filter'
        component={Filter}
        options={{
          
        }}/>

        <Stack.Screen 
        name='Role'
        component={Role}
        options={{

        }}/>

        <Stack.Screen 
        name='NotFound'
        component={NotFound}
        options={{
          headerShown:false,
          // headerBackground:
        }}/>
      

      </Stack.Navigator>

    </NavigationContainer>
  )
}

const Styles = StyleSheet.create({
  btn:{
    flex:1,
    borderRadius:20
  },
  hdrbtn:{
    backgroundColor:"white",
    color:"grey",
    borderColor:"grey",
    height:20,
    width:20,
  },
  savebtn:{
    backgroundColor:'blue',
    // borderWidth:2,
    height:30,
    width:50,
    borderRadius:10,

  },
  screen:{
    backgroundColor:'white'
  }
})
