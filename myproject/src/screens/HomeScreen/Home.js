import { View, Text ,StyleSheet} from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../../../context/authContext'
import FooterMenu from '../../components/Menus/FooterMenu';

const Home = () => {

  const [state] = useContext(AuthContext);
  return (
    <View style={styles.constainer}>
      <Text style={{fontSize:18,alignSelf:'center'}}>{JSON.stringify(state,null,4)}</Text>
      <FooterMenu/>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer:{
    flex:1,
    margin:10,
    justifyContent:'space-between',
    marginTop:40,
  }

})

export default Home