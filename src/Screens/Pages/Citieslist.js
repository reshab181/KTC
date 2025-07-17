import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
import Icon from 'react-native-vector-icons/EvilIcons';

const Citieslist = ({ route, navigation }) => {
  const { list = [], type = 'city_of_usage' } = route.params ?? {};
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(list);
  const dispatch = useDispatch();

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = list.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handleSelect = (selectedItem) => {
    dispatch(
      updateCorporateSlice({
        type: type,
        selectedItem: selectedItem,
      })
    );
    navigation.goBack();
  };

  const getTitle = () => {
    switch (type) {
      case 'rentalType':
        return 'Select Rental Type';
      case 'carGroup':
        return 'Select Car Group';
      case 'city':
        return 'Select City';
      default:
        return 'Select ' + type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getPlaceholderText = () => {
    switch (type) {
      case 'rentalType':
        return 'Search Rental Type';
      case 'carGroup':
        return 'Search Car Group';
      case 'city':
        return 'Search City';
      default:
        return 'Search';
    }
  };

  return (
    <SafeAreaView style={[styles.container, styles.baseBackground]}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.searchContainer, styles.baseHeader]}>
        <View style={styles.inputWrapper}>
          <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
          <TextInput
            style={[styles.input, styles.baseInput]}
            placeholder={getPlaceholderText()}
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
              <Icon name="close" size={22} color="#000" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                styles.baseItemContainer,
                index === filteredList.length - 1 && styles.lastItem,
              ]}
              key={index}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No {type === 'rentalType' ? 'rental types' : type === 'carGroup' ? 'car groups' : 'cities'} found
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseBackground: {
    backgroundColor: '#F8F8FA',
  },
  baseHeader: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 46,
  },
  baseInput: {
    backgroundColor: '#f2f2f2',
    color: '#333',
  },
  input: {
    flex: 1,
    height: 46,
    fontSize: 16,
    paddingLeft: 36,
    borderRadius: 8,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  clearButton: {
    padding: 8,
  },
  cancelButton: {
    marginLeft: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontSize: 16,
    color: '#3C3567',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  itemContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  baseItemContainer: {
    borderBottomColor: '#eee',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});

export default Citieslist;
