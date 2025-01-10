import React from 'react';
import { useWindowDimensions } from 'react-native';
import { StyleSheet, Text, View , Image} from 'react-native';

const CustomHeader = ({ title, islogo =false , imgPath , iconPath}) => {
    const useStyle = useStyles() ;
  return (
    <View style={styles.header}>
        {
            islogo ? <View style={{flexDirection: "row"}}>
             <Image source={iconPath} style={styles.icon}/>
             <Image source={imgPath} style={styles.img}/>
            </View>: <Text style={styles.title}>{title}</Text>
        }
      
    </View>
  );
};

export default CustomHeader;

function useStyles(){
    const { width: winwidth, height: winheight } = useWindowDimensions();
    return styles = StyleSheet.create({
        header: {
        //   position: 'absolute', // Makes it stick to the top
          width: winwidth, // Fixed width as per given properties
          height: 60,
          backgroundColor: '#3C3567',
          justifyContent: 'center',
          alignItems: 'flex-start',
        },
        title: {
          fontSize: 24,
          marginStart : 16, 
          color: '#FFFFFF', 
          fontWeight: '600',
        },
        icon : {
            height: 30 , 
            width: 36, 
            marginStart : 10

        },
        img: {
            height: 27, 
            width: 69, 
            marginStart: 20, 
        }
      });
}
