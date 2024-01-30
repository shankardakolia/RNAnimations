// components/Step3.js
import React from 'react';
import {View, Text, Button} from 'react-native';

const Step3 = ({onPrev, onSubmit, values}) => {
  return (
    <View>
      <Text>Name: {values.name}</Text>
      <Text>Email: {values.email}</Text>
      <Button title="Prev" onPress={onPrev} />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

export default Step3;
