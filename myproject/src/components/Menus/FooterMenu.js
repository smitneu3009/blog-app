import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FooterMenu = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Post':
            iconName = 'plus-square';
            break;
          case 'MyPosts':
            iconName = 'file-text';
            break;
          default:
            iconName = 'user';
            break;
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
          >
            <View style={styles.iconContainer}>
              <FontAwesome name={iconName} style={[styles.iconStyle, isFocused ? styles.iconActive : styles.iconInactive]} />
              <Text style={[styles.textStyle, isFocused ? styles.textActive : styles.textInactive]}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    paddingVertical: 10,
    paddingTop: 16,
  },
  button: {
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24, // Adjust marginBottom as needed
    marginLeft: 17,
  },
  iconStyle: {
    fontSize: 23,
    marginBottom:5,
  },
  iconActive: {
    color: 'white',
  },
  iconInactive: {
    color: 'gray',
  },
  textStyle: {
    fontSize: 11,
  },
  textActive: {
    color: 'white',
  },
  textInactive: {
    color: 'gray',
  },
});

export default FooterMenu;
