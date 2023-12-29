import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#3D437E',
    },
     
    pickerContainer: {
      position: 'absolute',
      zIndex: 1,
      width: '94.6%', // You may need to adjust this based on your layout
      backgroundColor: '#E8A3BE',
      borderTopRadius: 10,
      top: 240, 
      marginLeft: 10,
      marginRight: 10,
    },
    
    picker: {
      width: '94.6%', // Adjust the width as needed
      backgroundColor: '#E8A3BE',
      borderTopRadius: 10,
      ...Platform.select({
        ios: {
          marginStart:10,
          //marginright:300,
        },
        android: {
          marginStart: 0,
          marginEnd: 0,
        },
      }),
    },

 

    scrollView: {
      backgroundColor: '#3D437E',
      marginBottom: 10, 
    },
    
    
    absoluteContainer: {
      flex: 1, // Take up all available space
      position: 'relative', 
      backgroundColor: '#3D437E',
    },

     button: {
      backgroundColor: '#E8A3BE',
      alignSelf: 'flex-start',
    },

    buttonContainer: {
      backgroundColor: '#E8A3BE', // The background color you want for the button
      padding: 10,
      borderRadius: 0,
      marginLeft: 10,
      marginRight: 10,
      // ... any other styling you want for this button container
    },


    listContainer: {
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      backgroundColor: '#F5EDDF',
      bordertopRadius: 0,
      height: 50,
      
    },
    table: {
      borderWidth: 2,
      borderColor: '#F5EDDF',
    },
    head: {
      height: 60,
      backgroundColor: '#F5EDDF',
      fontWeight: 'bold',
    },
    row: {
      backgroundColor: '#F5EDDF',
    },
    text: {
      margin: 6,
      textAlign: 'left',
    },
    inputContainer: {
      
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      paddingTop: 30,
      marginTop: 60,
      backgroundColor: '#E8A3BE',
      borderStartStartRadius: 4,
      borderStartEndRadius: 4,
 

    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 10,
      padding: 5,
      
    },

    suggestionsContainer: {
      position: 'absolute',
      zIndex: 2, // Make sure this is above the FlatList but below the picker if both might appear at the same time
      width: '94.6%', // Adjust as needed
      // Position it right below the inputContainer
      top: 240/* The Y position where the suggestions should start, likely just below the input container */,
      left: 10,
      right: 0,
      backgroundColor: '#E8A3BE', // Or any color that fits your design
      padding: 10, // Add padding as needed
      // Add border, shadow, etc. to make it "pop out"
    },
  });