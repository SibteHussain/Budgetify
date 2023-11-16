import React from 'react';
import {useFormik} from 'formik';
import {Input, View} from 'native-base';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const RegisterScreen = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      email: '',
    },
    onSubmit: values => {},
  });
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <Text style={styles.headingText}>Create Account</Text>
        <Text style={styles.text}>Name</Text>
        <Input
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
        />
        <Text style={styles.text}>Email</Text>
        <Input
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
        />
        <Text style={styles.text}>Password</Text>
        <Input
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
      </View>
      <TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Register</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    alignItems: 'center',
    paddingTop: '4%',
  },
  formContainer: {
    width: widthPercentageToDP(90),
    alignItems: 'center',
  },
  headingText: {color: '#000', fontFamily: 'inter_bold', fontSize: 35},
  subContainer: {width: widthPercentageToDP(100), marginLeft: '7%'},
  text: {
    color: '#000',
    fontFamily: 'inter_regular',
    fontSize: 15,
  },
  buttonContainer: {
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 90,
    backgroundColor: '#3E7C78',
    marginTop: '2%',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'inter_regular',
  },
});
export default RegisterScreen;
