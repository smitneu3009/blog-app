import React,{useState} from 'react';
import { SafeAreaView,StyleSheet,Text, View } from 'react-native';

import Navigation from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  
  return (
    <NavigationContainer>
    <View style={styles.root}>
      <Navigation/>
    </View>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:"white",
  }
})


