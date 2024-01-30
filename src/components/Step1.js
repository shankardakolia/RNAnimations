// components/Step1.js
import React from 'react';
import {View, TextInput, Button} from 'react-native';

const Step1 = ({onNext, onChange, values}) => {
  return (
    <View>
      <TextInput
        placeholder="Enter name"
        value={values.name}
        onChangeText={text => onChange('name', text)}
      />
      <Button title="Next" onPress={onNext} />
    </View>
  );
};

export default Step1;
