import React from 'react';
import {Input, Modal} from 'native-base';
import {useFormik} from 'formik';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import moment from 'moment';
import SelectField from '../SelectField';
import {PayeeValidationSchema} from '../../utils/ValidationSchemas';
import useToastHook from '../../utils/useToastHook';

const generateRandomId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const AddPayee = ({showModal, setShowModal}) => {
  const {payees, setPayees} = useAppStateProvider();
  const {showToast} = useToastHook();
  const formik = useFormik({
    initialValues: {
      id: generateRandomId(),
      name: '',
      email: '',
      relation: '',
      date: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
    },
    onSubmit: async values => {
      try {
        PayeeValidationSchema.validateSync(values, {abortEarly: false});
        const newPayees = [...payees, values];
        setPayees(newPayees);

        await AsyncStorage.setItem('payees', JSON.stringify(newPayees));
        showToast('success', 'Payee added successfully', 'bottom');
        setShowModal(false);
      } catch (error) {
        const errorMessages = error.errors;
        errorMessages.forEach(errorMessage =>
          showToast('error', errorMessage, 'bottom'),
        );
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
            mb={'3%'}
            placeholder="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
          />
          <SelectField
            label="Relation"
            selectedValue={formik.values.relation}
            onValueChange={itemValue =>
              formik.setFieldValue('relation', itemValue)
            }
            items={[
              {label: 'Friend', value: 'Friend'},
              {label: 'Relative', value: 'Relative'},
              {label: 'Colleague', value: 'Colleague'},
              {label: 'Trade', value: 'Trade'},
              {label: 'Business', value: 'Business'},
            ]}
          />
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
