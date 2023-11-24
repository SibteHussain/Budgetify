import React from 'react';

import {FlatList} from 'native-base';

import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import GeneralHeader from '../../components/GeneralHeader';
import MainViewWrapper from '../../components/MainViewWrapper';

import BeneficiaryCard from '../../components/Beneficiaries/BeneficiaryCard';
import NoDataAvailable from '../../components/NoDataAvailable';

const BeneficiaryScreen = ({navigation}) => {
  const {navigate} = navigation;
  const {payees} = useAppStateProvider();
  const renderItem = item => {
    return (
      <BeneficiaryCard
        name={item.item.name}
        relation={item.item.relation}
        id={item.item.id}
        date={item.item.date}
        navigate={navigate}
      />
    );
  };
  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <GeneralHeader bgColor={'#6947cc'} title={'BENEFICIARIES'} />
      {payees.length > 0 ? (
        <FlatList
          data={payees}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <NoDataAvailable />
      )}
    </MainViewWrapper>
  );
};

export default BeneficiaryScreen;
