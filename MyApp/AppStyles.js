import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#3D437E',
    },
     
    //Style picker to be drop down
    picker: {
     // width: 200,
      //height: 150,
      //marginTop: 50,
      backgroundColor: '#E8A3BE',
      bordertopRadius: 10, 
      marginStart: 10,
      marginEnd: 10,
      marginTop: 0
      //position: 'absolute',
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