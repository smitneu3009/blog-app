import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import { FontAwesome5 } from '@expo/vector-icons'


const Headermenu = () => {
    const [state,setState] = useContext(AuthContext);
  return (
    <View>
      <TouchableOpacity>
        <FontAwesome5 name="sign-out-alt" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      margin: 10,
      justifyContent: 'space-between',
    },
    iconStyle: {
      fontSize: 24,
      color: 'black',
      marginBottom: 3,
    },
  });
  

export default Headermenu