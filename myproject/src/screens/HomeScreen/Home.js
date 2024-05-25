import { View, Text, StyleSheet} from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import FooterMenu from '../../components/Menus/FooterMenu';
import Headermenu from '../../components/Menus/Headermenu';

const Home = () => {
  const [state] = useContext(AuthContext);
  const UserName = state?.user?.name;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {UserName}</Text>
        <Headermenu style={styles.headerMenu} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginTop:30,
    marginHorizontal:5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerMenu: {
    alignSelf: 'flex-end',
  },
  stateText: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default Home;
