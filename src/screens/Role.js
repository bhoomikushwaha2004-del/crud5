import { useState } from 'react';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Role({ navigation }) {
  const [viewShow, setViewShow] = useState(false);

  const [roles, setRoles] = useState({
    Administrative: false,
    Manager: false,
    Intern: false,
    'Backend Developer': false,
    'Frontend Developer': false,
    'Software Tester': false,
  });

  const activeRoles = Object.keys(roles).filter(item => roles[item] === true);
  console.log(activeRoles, ' selected roles');

  const activeRolesLength=()=>{
    Object.values(roles).filter(item => roles[item] === true).length
  }

  const clearFilter = () => {
    setRoles({
      Administrative:false,
      Manager:false,
      Intern:false,
      "Backend Developer":false,
      "Frontend Developer":false,
      "Software Tester":false
    })
    setViewShow(false)
  }

  return (
    <>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setRoles(prev => ({ ...prev, Administrative: !prev.Administrative })),
              setViewShow(prev => !prev);
          }}
        >
          <Text style={styles.txt}>Administrative</Text>
          <Image
            source={
              roles.Administrative
                ? require('../assests/check-circle.png')
                : require('../assests/circle.png')
            }
            style={styles.circleimg}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setRoles(prev => ({ ...prev, Manager: !prev.Manager })),
              setViewShow(prev => !prev);
          }}
        >
          <Text style={styles.txt}>Manager</Text>
          <Image
            source={
              roles.Manager
                ? require('../assests/check-circle.png')
                : require('../assests/circle.png')
            }
            style={styles.circleimg}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setRoles(prev => ({ ...prev, Intern: !prev.Intern })),
              setViewShow(prev => !prev);
          }}
        >
          <Text style={styles.txt}>Intern</Text>
          <Image
            source={
              roles.Intern
                ? require('../assests/check-circle.png')
                : require('../assests/circle.png')
            }
            style={styles.circleimg}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setRoles(prev => ({
              ...prev,
              'Backend Developer': !prev['Backend Developer'],
            })),
              setViewShow(prev => !prev);
          }}
        >
          <Text style={styles.txt}>Backend Developer</Text>
          <Image
            source={
              roles['Backend Developer']
                ? require('../assests/check-circle.png')
                : require('../assests/circle.png')
            }
            style={styles.circleimg}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setRoles(prev => ({
              ...prev,
              'Frontend Developer': !prev['Frontend Developer'],
            })),
              setViewShow(prev => !prev);
          }}
        >
          <Text style={styles.txt}>Frontend Developer</Text>
          <Image
            source={
              roles['Frontend Developer']
                ? require('../assests/check-circle.png')
                : require('../assests/circle.png')
            }
            style={styles.circleimg}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setRoles(prev => ({
              ...prev,
              'Software Tester': !prev['Software Tester'],
            })),
              setViewShow(prev => !prev);
          }}
        >
          <Text style={styles.txt}>Software Tester</Text>
          <Image
            source={
              roles['Software Tester']
                ? require('../assests/check-circle.png')
                : require('../assests/circle.png')
            }
            style={styles.circleimg}
          />
        </TouchableOpacity>
      </View>

      {/* bottom view */}
      {/* {viewShow && ( */}
        <View style={styles.slctView}>
          <TouchableOpacity style={styles.btnSelect} onPress={clearFilter}>
            <Text style={styles.selectTxt}>Clear Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmbtn}
            onPress={() => {
              navigation.navigate({
                name: 'Filter',
                params: { activeRoles: activeRoles,activeRolesLength:activeRolesLength },
                merge: true,
              });
            }}
          >
            <Text style={styles.selectTxt}>Confirm</Text>
          </TouchableOpacity>
        </View>
      {/* // )} */}
    </>
  );
}

const styles = StyleSheet.create({
  txt: {
    borderWidth: 1,
    margin: 5,
    borderColor: 'pink',
    height: 40,
    width: 350,
    backgroundColor: 'rgba(61, 110, 110, 0.6)',
    // color:"rgba(134, 79, 127, 0.92)",
    borderRadius: 30,
    color: 'white',
    // marginTop:
    paddingTop: 10,
    paddingLeft: 10,
    elevation: 8,
  },
  content: {
    margin: 20,
    marginBottom: 35,
    // elevation:
  },
  tick: {
    height: 23,
    width: 23,
    position: 'absolute',
  },
  circleimg: {
    height: 22,
    width: 22,
    position: 'absolute',
    marginLeft: 300,
    marginTop: 12,
  },
  btn: {
    marginBottom: 40,
    position: 'absolute',
    // elevation:
    // justifyContent:
  },
  slctView: {
    height: 100,
    width: '100%',
    backgroundColor: 'rgba(61, 110, 110, 0.6)',
    marginTop: 370,
    borderRadius: 20,
    flexDirection: 'row',
    // elevation:8
  },
  btnSelect: {
    borderWidth: 1,
    height: 45,
    width: 150,
    borderRadius: 30,
    borderColor: 'white',
    // elevation:8,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 45,
  },
  confirmbtn: {
    borderWidth: 1,
    height: 45,
    width: 150,
    borderRadius: 30,
    borderColor: 'white',
    elevation: 5,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 45,
    backgroundColor: 'rgba(19, 108, 130, 0.6)',
  },
  selectTxt: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
});
