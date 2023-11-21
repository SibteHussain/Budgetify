import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const BeneficiaryCard = ({name, email, relation}) => {
  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>
        <Text style={styles.text}>{relation}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#6947cc', // Set background color for the card
    borderRadius: 16, // Add border radius for rounded corners
    padding: 16, // Add padding for spacing inside the card
    marginVertical: 10, // Add margin for spacing between cards
    shadowColor: '#000', // Add shadow for a lift effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: widthPercentageToDP(90),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {color: '#fff', fontFamily: 'inter_bold', fontSize: 15},
  emailText: {color: '#fff', fontFamily: 'inter_semibold', fontSize: 12},
  leftContainer: {
    flexDirection: 'column',
  },
});

export default BeneficiaryCard;
