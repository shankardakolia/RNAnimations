// components/Step2.js
import React from 'react';
import {View, TextInput, Button} from 'react-native';

const Step2 = ({onNext, onPrev, onChange, values}) => {
  return (
    <View>
      <TextInput
        placeholder="Enter email"
        value={values.email}
        onChangeText={text => onChange('email', text)}
      />
      <Button title="Prev" onPress={onPrev} />
      <Button title="Next" onPress={onNext} />
    </View>
  );
};

export default Step2;
