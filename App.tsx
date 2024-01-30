import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Stepper from './src/screens/Stepper';
import MainForm from './src/screens/MainForm';

const App = () => {
  return (
    <SafeAreaView>
      <MainForm />
    </SafeAreaView>
  );
};

export default App;
