// SelectField.js
import React from 'react';
import {Select} from 'native-base';

const SelectField = ({label, selectedValue, onValueChange, items}) => {
  return (
    <Select
      selectedValue={selectedValue}
      minWidth={200}
      accessibilityLabel={`Choose ${label}`}
      placeholder={`Choose ${label}`}
      _selectedItem={{bg: '#6947cc'}}
      onValueChange={onValueChange}>
      {items.map(item => (
        <Select.Item label={item.label} value={item.value} key={item.value} />
      ))}
    </Select>
  );
};

export default SelectField;
