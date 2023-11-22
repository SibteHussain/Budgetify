import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import {useAppStateProvider} from '../providers/AppStateProvider';

const TransactionCard = ({
  name,
  amount,
  date,
  reason,
  transactionType,
  note,
  id,
  navigate,
}) => {
  const {expenses, setExpenses} = useAppStateProvider();
  const handleDelete = () => {
    const filtered = expenses.filter(expense => expense.id !== id);
    setExpenses(filtered);
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('ExpenseDetail', {
          transactionType: transactionType,
          amount: amount,
          name: name,
          date: date,
          reason: reason,
          note: note,
        })
      }>
      <View style={styles.mainContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.dateText}>
            {moment.utc(date).local().fromNow()}
          </Text>
        </View>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color: transactionType === 'Debit' ? '#25A969' : '#F95B51',
            fontFamily: 'inter_semibold',
            fontSize: 18,
          }}>
          {`$ ${amount}`}
        </Text>
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="trash-2" size={25} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP(90),
    marginVertical: '1%',
  },
  nameText: {color: '#000', fontFamily: 'inter_medium', fontSize: 16},
  buttonContainer: {
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 90,
    backgroundColor: '#3E7C78',
    marginTop: '2%',
  },
  nameContainer: {
    flexDirection: 'column',
  },
  dateText: {
    color: '#666666',
    fontFamily: 'inter_regular',
    fontSize: 13,
  },
});
export default TransactionCard;
