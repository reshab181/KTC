import React, { useState } from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native'

interface HomeItemCardProps {
  title: string;
  image?: string | ImageSourcePropType; 
  description?: string;
  onPress?: () => void;
}


const HomeItemCard: React.FC<HomeItemCardProps> = ({ title, image, description = 'No description provided', onPress = () => {} }) => {

    return(<TouchableOpacity style={styles.moduleContainer} onPress={onPress} activeOpacity={0.9}>
          <View style={styles.module}>
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleHeaderText}>{title}</Text>
            </View>
            <View style={styles.moduleBody}>
              {/* <Image source={image} style={styles.moduleImage} /> */}
              {image}
              <Text style={styles.moduleBodyText}>{description}</Text>
            </View>
          </View>
        </TouchableOpacity>)
}

export default HomeItemCard;

const styles = StyleSheet.create({
  moduleContainer: {
    width: '100%',
    marginBottom: 24,
  },
  module: {
    width: '100%',
    height: 240,
    backgroundColor: '#FFF',
    elevation: 2,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15, 
  },
  moduleHeader: {
    height: '22%',
    backgroundColor: '#3C3567',
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleHeaderText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  moduleBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  moduleBodyText: {
    color: '#212121',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  moduleImage: {
    height: 80,
    resizeMode: 'cover',
  },
});