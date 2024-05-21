import React,{useState} from 'react';
import { SafeAreaView,StyleSheet,Text } from 'react-native';

import Navigation from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  
  return (
    <NavigationContainer>
    <SafeAreaView style={styles.root}>
      <Navigation/>
    </SafeAreaView>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:"white"
  }
})


