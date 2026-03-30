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

import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { createUser } from '../services/userApi';
import { useNavigation } from '@react-navigation/native';

export default function UserForm() {
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


  const handleSave = async values => {
    await createUser(values);
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
        onSubmit={handleSave}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.container}>
            <StatusBar hidden={true} />

            {/* HEADER */}
            <View style={styles.headview}>
              <Text onPress={() => navigation.navigate('All Users')}>
                Cancel
              </Text>

              <Text style={styles.heading}>Add User</Text>
            </View>
            <View style={{height:1,borderWidth:0.5, borderColor:'grey',width:"100%"}}/>

            <ScrollView>
              <View style={styles.editavt}>
                <Image
                  source={require('../assests/img1.jpg')}
                  style={styles.imgstl}
                />
              </View>

              
              {/* NAME */}
              <Text>Full Name</Text>
              <TextInput
                placeholder="John Smith"
                style={styles.input}
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {touched.name && errors.name && (
                <Text style={styles.err}>{errors.name}</Text>
              )}
              <View style={{height:1,borderWidth:0.5, borderColor:'grey'}}/>

              {/* EMAIL */}
              <Text>Email</Text>
              <TextInput
                placeholder="john@email.com"
                style={styles.input}
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.err}>{errors.email}</Text>
              )}
              <View style={{height:1,borderWidth:0.5, borderColor:'grey'}}/>

              {/* ROLE */}
              <View style={styles.row}>
                <Text>Role</Text>
                <View style={styles.dropdown}>
                  <Picker
                    selectedValue={values.role}
                    onValueChange={handleChange('role')}
                  >
                    <Picker.Item
                      label="Administrative"
                      value="Administrative"
                    />
                    <Picker.Item label="Manager" value="Manager" />
                    <Picker.Item label="Intern" value="Intern" />
                    <Picker.Item
                      label="Backend Developer"
                      value="Backend Developer"
                    />
                    <Picker.Item
                      label="Frontend Developer"
                      value="Frontend Developer"
                    />
                  </Picker>
                </View>
              </View>
              {touched.role && errors.role && (
                <Text style={styles.err}>{errors.role}</Text>
              )}
              <View style={{height:1,borderWidth:0.5, borderColor:'grey'}}/>

              {/* PHONE */}
              <View style={styles.row}>
                <Text>Phone</Text>
                <TextInput
                  placeholder="1234567890"
                  style={styles.smallInput}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={styles.err}>{errors.phone}</Text>
              )}
              <View style={{height:1,borderWidth:0.5, borderColor:'grey'}}/>

              {/* STATUS */}
              <View style={styles.row}>
                <Text>Status</Text>
                <View style={styles.dropdown}>
                  <Picker
                    selectedValue={values.status}
                    onValueChange={handleChange('status')}
                  >
                    <Picker.Item label="Active" value="Active" />
                    <Picker.Item label="Inactive" value="Inactive" />
                  </Picker>
                </View>
              </View>
              {touched.status && errors.status && (
                <Text style={styles.err}>{errors.status}</Text>
              )}
              <View style={{height:1,borderWidth:0.5, borderColor:'grey',marginBottom:10}}/>

              <TouchableOpacity style={styles.savebtn} onPress={handleSubmit}>
                <Text style={styles.saveText}>Save</Text>
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
    padding: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 130,
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
    borderRadius: 150,
  },

  headview: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation:50
  },

  savebtn: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 10,
  },

  saveText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  err: {
    color: 'red',
    marginBottom: 10,
  },
});