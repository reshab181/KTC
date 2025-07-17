import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ActivityIndicator} from 'react-native-paper';


const CustomCarGrouptile = ({title, onPress, iconName, loader}) => {
  const theme = useColorScheme();
  const iconColor = theme === 'dark' ? '#A9A9A9' : '#000000';
  return (
    <TouchableOpacity onPress={onPress} style={styles.contianer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text 
          style={{
            color: theme === 'dark' ? '#A9A9A9' : '#A9A9A9',
            flexShrink: 1, 
          }}
          numberOfLines={2}  
          ellipsizeMode="tail"  
        >
          {title}
        </Text>
        <View style={{marginRight: 16}}>
          {!loader ? (
            <Icon name={iconName} color={iconColor} />
          ) : (
            <ActivityIndicator size={15} color="#000" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCarGrouptile;

const styles = StyleSheet.create({
  contianer: {
    paddingStart: 16,
    justifyContent: 'center',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#666666',
    elevation: 2,
    height: 48,
    marginTop: 10,
    borderRadius: 4,
  },
});
