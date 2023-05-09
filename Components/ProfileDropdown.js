import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
   
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDropdownOpen}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      {isOpen && (
        <DropDownPicker
          items={[
            { label: 'Edit Profile', value: 'edit' },
            { label: 'Change Password', value: 'password' },
            { label: 'Logout', value: 'logout' },
          ]}
          containerStyle={styles.dropdownContainer}
          itemStyle={styles.dropdownItem}
          labelStyle={styles.dropdownLabel}
          onChangeItem={(item) => {
            if (item.value === 'logout') {
              handleLogout();
            } else {
              // navigate to appropriate screen based on item value
            }
            setIsOpen(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    color : 'black'
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gold',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    zIndex: 1,
    width: 200,
    borderRadius: 4,
    elevation: 2,
    backgroundColor: 'black',
    color:'black'
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
   
  },
});

export default ProfileDropdown;
