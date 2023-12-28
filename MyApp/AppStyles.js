import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#3D437E',
    },
     
    pickerContainer: {
      alignItems: 'flex-start',
      // If needed, add padding here to the container
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
    

     button: {
      backgroundColor: '#E8A3BE',
      alignSelf: 'flex-start',
    },



    listContainer: {
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      backgroundColor: '#F5EDDF',
      
      bordertopRadius: 0,
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
  });