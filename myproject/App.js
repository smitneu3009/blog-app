import React,{useState} from 'react';
import { SafeAreaView,StyleSheet,Text } from 'react-native';

import Navigation from './src/navigation';

export default function App() {
  
  return (
    <SafeAreaView style={styles.root}>
      <Navigation/>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:'#F9FBFC'
  }
})


