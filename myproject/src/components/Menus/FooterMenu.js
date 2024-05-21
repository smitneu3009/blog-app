import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FooterMenu = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="home" style={styles.iconStyle} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
      <FontAwesome name="plus-square" style={styles.iconStyle} />
        <Text>Post</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button}>
      <FontAwesome name="info-circle" style={styles.iconStyle} />
        <Text>About</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button}>
      <FontAwesome name="user" style={styles.iconStyle} />

        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    marginLeft:39,
    marginRight:30,
  },
  button: {
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 21,
    color: 'black',
    marginBottom: 3,
  },
});

export default FooterMenu;
