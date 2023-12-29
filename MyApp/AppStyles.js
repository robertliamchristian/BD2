import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#3D437E',
    },
     
    pickerContainer: {
      position: 'absolute',
      zIndex: 1,
      width: '100%', // You may need to adjust this based on your layout
      backgroundColor: '#E8A3BE',
      borderTopRadius: 10,
      bottom: 0,
      
     
    },
    
    picker: {
      width: '100%', // Adjust the width as needed
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
      padding: 5,  

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
      alignSelf: 'flex-start',
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
      borderTopLeftRadius: 10, // adjust the radius as needed
      borderTopRightRadius: 10, 
      
      
    },
    input: {
      height: 40,
      width: 250,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      alignSelf: 'flex-start',
      
    },

    suggestionsContainer: {
      position: 'absolute',
      zIndex: 2, // Make sure this is above the FlatList but below the picker if both might appear at the same time
      width: '94.6%', // Adjust as needed
      // Position it right below the inputContainer
      top: 180,
      marginLeft: 15,
      backgroundColor: '#E8A3BE', // Or any color that fits your design
      // Add border, shadow, etc. to make it "pop out"
    },

      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        paddingLeft: 10,
        paddingBottom: 10,
        marginbottom: 10,
        color: '#000000' , 
        position: 'absolute',
        
      },
  });


  