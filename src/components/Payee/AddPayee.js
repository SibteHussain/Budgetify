import React from 'react';
import {Input, Modal, Select} from 'native-base';
import {useFormik} from 'formik';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import moment from 'moment';

const generateRandomId = () => {
  // Generate a random alphanumeric id, e.g., using Date.now()
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const AddPayee = ({showModal, setShowModal}) => {
  const {setPayees} = useAppStateProvider();
  const formik = useFormik({
    initialValues: {
      id: generateRandomId(), // Add id field with a random id
      name: '',
      email: '',
      relation: '',
      date: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
    },
    onSubmit: async values => {
      try {
        // Retrieve existing payees from AsyncStorage
        const existingPayeesJSON = await AsyncStorage.getItem('payees');
        let existingPayees = [];

        if (existingPayeesJSON) {
          existingPayees = JSON.parse(existingPayeesJSON);
          if (!Array.isArray(existingPayees)) {
            existingPayees = [];
          }
        }

        // Add the new payee to the existing payees array
        const newPayees = [...existingPayees, values];
        setPayees(newPayees);

        // Save the updated payees array back to AsyncStorage
        await AsyncStorage.setItem('payees', JSON.stringify(newPayees));

        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Add Beneficiary</Modal.Header>
        <Modal.Body>
          <Input
            placeholder="Name"
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
          />
          <Input
            mt={'3%'}
            placeholder="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
          />
          <Select
            selectedValue={formik.values.relation}
            minWidth="200"
            accessibilityLabel="Select Relation"
            placeholder="Select Relation"
            _selectedItem={{
              bg: 'teal.600',
            }}
            mt={1}
            onValueChange={itemValue =>
              formik.setFieldValue('relation', itemValue)
            }>
            <Select.Item label="Relative" value="Relative" />
            <Select.Item label="Friend" value="Friend" />
            <Select.Item label="Business" value="Business" />
            <Select.Item label="Trade" value="Trade" />
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={formik.handleSubmit}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Add</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flex: 1,
  },
  text: {color: '#000', fontFamily: 'inter_bold', fontSize: 45},
  buttonContainer: {
    borderRadius: 40,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#6947cc',
    marginTop: '2%',
    width: '100%',
  },
  footerContainer: {width: '100%'},
});

export default AddPayee;
