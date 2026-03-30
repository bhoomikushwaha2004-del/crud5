import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

export default function UpdateUser({  route }) {
  const navigation = useNavigation();
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
      .required('Phone is required'),
    role: Yup.string().required('Role is required'),
    status: Yup.string().required('Status is required'),
  });

  const { item } = route.params;

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'Active',
  });

  useEffect(() => {
    if (item) {
      setUser(item);
    }
  }, []);

  const handleChangeValue = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const updateUser = async () => {
    const url = `https://69a7bb832cd1d055269167fa.mockapi.io/api/v1/users/${item.id}`;

    let result = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    result = await result.json();
    if (result) {
      navigation.navigate('All Users');
    }
  };

  const deleteUser = async () => {
    const url = `https://69a7bb832cd1d055269167fa.mockapi.io/api/v1/users/${item.id}`;
    await fetch(url, { method: 'DELETE' });
    navigation.navigate('All Users');
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          role: '',
          status: 'Active',
        }}
        validationSchema={validationSchema}
        onSubmit={updateUser}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.container}>
            <StatusBar hidden={true} />

            <View style={styles.headview}>
              <Text onPress={() => navigation.navigate('All Users')}>
                Cancel
              </Text>

              <Text style={{ fontSize: 20 }}>Edit User</Text>

              <TouchableOpacity style={styles.savebtn} onPress={updateUser} >
                <Text style={{ color: 'white' }}>Update</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.editavt}>
                <Image source={{ uri: item.avatar }} style={styles.imgstl} />
              </View>

              <Text>Full Name</Text>
              <TextInput
                style={styles.input}
                value={user.name}
                onChangeText={text => handleChangeValue('name', text)}
              />
              {touched.name && errors.name && (
                <Text style={styles.err}>{errors.name}</Text>
              )}

              <Text>Email</Text>
              <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={text => handleChangeValue('email', text)}
              />
              {touched.email && errors.email && (
                <Text style={styles.err}>{errors.email}</Text>
              )}

              <View style={styles.row}>
                <Text>Role</Text>
                <View style={styles.dropdown}>
                  <Picker
                    selectedValue={user.role}
                    onValueChange={val => handleChangeValue('role', val)}
                  >
                    <Picker.Item
                      label="Administrative"
                      value="Administrative"
                    />
                    <Picker.Item label="Manager" value="Manager" />
                  </Picker>
                </View>
              </View>
              {touched.role && errors.role && (
                <Text style={styles.err}>{errors.role}</Text>
              )}

              <View style={styles.row}>
                <Text>Phone</Text>
                <TextInput
                  style={styles.smallInput}
                  value={user.phone}
                  onChangeText={text => handleChangeValue('phone', text)}
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={styles.err}>{errors.phone}</Text>
              )}

              <View style={styles.row}>
                <Text>Status</Text>
                <View style={styles.dropdown}>
                  <Picker
                    selectedValue={user.status}
                    onValueChange={val => handleChangeValue('status', val)}
                  >
                    <Picker.Item label="Active" value="Active" />
                    <Picker.Item label="Inactive" value="Inactive" />
                  </Picker>
                </View>
              </View>
              {touched.status && errors.status && (
                <Text style={styles.err}>{errors.status}</Text>
              )}

              <TouchableOpacity style={styles.btn} onPress={deleteUser}>
                <Text style={styles.btnText}>Delete User</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },

  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    width: 170,
  },

  smallInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    width: 170,
    padding: 10,
  },

  btn: {
    backgroundColor: 'red',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },

  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  editavt: {
    backgroundColor: '#D9D9D9',
    borderRadius: 150,
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },

  imgstl: { 
    height: 150, 
    width: 150, 
    borderRadius: 150 
  },

  headview: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  savebtn: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 10,
  },
});