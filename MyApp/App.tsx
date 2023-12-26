import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {Picker} from '@react-native-picker/picker';
import LoginForm from './Login';
import SignupForm from './SignUp';

interface Birdedex {
  //userid: string;
  bird: string;
  sighting_time: string;
  //listid: string;
  //seen: string;
}

interface UserList {
  bird: string;
  sighting_time: string;
  // listid: string;
  // userid: string;
}

const App = () => {
  const [birdedex, setBirdedex] = useState<Bird[]>([]);
  const [userlists, setUserlists] = useState<UserList[]>([]);
  const [selectedList, setSelectedList] = useState('birdedex');

  useEffect(() => {
    fetch('http://localhost:3000/birdedex')
      .then(response => response.json())
      .then(data => setBirdedex(data))
      .catch(error => console.error('Error fetching birdedex:', error));

    fetch('http://localhost:3000/userlists')
      .then(response => response.json())
      .then(data => setUserlists(data))
      .catch(error => console.error('Error fetching userlists:', error));
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedList}
          onValueChange={itemValue => setSelectedList(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Birdedex" value="birdedex" />
          <Picker.Item label="Userlists" value="userlists" />
        </Picker>
      </View>
      <SignupForm />
      < LoginForm />
      {selectedList === 'birdedex' && (
        <View style={styles.listContainer}>
          <Text style={styles.headerText}>Birdedex:</Text>
          <Table borderStyle={styles.table}>
            <Row
              data={['Bird', 'Sighting Time']}
              style={styles.head}
              textStyle={styles.text}
            />
            {birdedex.map((rowData, index) => (
              <Row
                key={index}
                data={[rowData.bird, rowData.sighting_time]}
                style={styles.row}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </View>
      )}

      {selectedList === 'userlists' && (
        <View style={styles.listContainer}>
          <Text style={styles.headerText}>Userlists:</Text>
          <Table borderStyle={styles.table}>
            <Row
              data={['Bird', 'Sighting Time']}
              style={styles.head}
              textStyle={styles.text}
            />
            {userlists.map((rowData, index) => (
              <Row
                key={index}
                data={[rowData.bird, rowData.sighting_time]}
                style={styles.row}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  /* pickerContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: '100%',
  },*/
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
  listContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  table: {
    borderWidth: 2,
    borderColor: '#c8e1ff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  row: {
    backgroundColor: '#f9f9f9',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
});

export default App;
