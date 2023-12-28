import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

interface Bird {
  bird: string;
  sighting_time: string;
}

interface UserList {
  bird: string;
  sighting_time: string;
}

const App = () => {
  const [birdedex, setBirdedex] = useState<Bird[]>([]);
  const [userlists, setUserlists] = useState<UserList[]>([]);
  const [selectedList, setSelectedList] = useState('birdedex');
  const [birdName, setBirdName] = useState('');
  const [sightingTime, setSightingTime] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);


  const addSighting = () => {
    axios.post('http://localhost:3000/user_sighting', {
      bird: birdName
    })
    .then(response => {
      console.log(response.data);
      setBirdName('');
    })
    .catch(error => {
      console.error('Error adding sighting:', error);
    });
  };

  const fetchSuggestions = (input: string) => {
    axios.get(`http://localhost:3000/suggestions/${input}`)
      .then(response => {
        setSuggestions(response.data.map((row: { bird: string }) => row.bird));
      })
      .catch(error => {
        console.error('Error fetching suggestions:', error);
      });
  };

  const handleInputChange = (input: string) => {
    setBirdName(input);
    if (input === '') {
      setSuggestions([]);
    } else {
      fetchSuggestions(input);
    }
  };

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
    <>
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
        
        <View style={styles.inputContainer}>
            <TextInput
            value={birdName}
            onChangeText={handleInputChange} // Call handleInputChange instead of setBirdName
            placeholder="Bird Name"
            style={styles.input}
            />
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              renderItem={({ item }) => <Text>{item}</Text>}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
          <TextInput
            value={sightingTime}
            onChangeText={setSightingTime}
            placeholder="Sighting Time (Optional)"
            style={styles.input}
          />
          <Button title="Add Sighting" onPress={addSighting} />
        </View>
  
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
    </>
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
  inputContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

export default App;