import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text,TouchableOpacity,StyleSheet, TextInput, Button, FlatList} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { styles } from './AppStyles'; 

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
  const [isPickerShown, setIsPickerShown] = useState(false);

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
    
      <View style={styles.absoluteContainer}>
        
        {/* Static Input Section */}
        <View style={styles.inputContainer}>
        <Text style={styles.title}>Birdedex</Text> 
 
          <TextInput
            value={birdName}
            onChangeText={handleInputChange}
            placeholder="Bird Name"
            style={styles.input}
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={addSighting}>
            <Text style={styles.buttonText}>Add Sighting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => setIsPickerShown(!isPickerShown)}>
            <Text style={styles.buttonText}>Change List</Text>
          </TouchableOpacity>
        </View>
    
        {/* Pop-out Bird Suggestions */}
        {suggestions.length > 0 && (
  <View style={styles.suggestionsContainer}>
    {suggestions.map((suggestion, index) => (
      <Text 
        key={index} 
        onPress={() => {
          setBirdName(suggestion);
          setSuggestions([]);
        }}
        style={{padding: 10, fontSize: 18}} // Add some style for better touch experience
      >
        {suggestion}
      </Text>
      
    ))}
  </View>
)}
    
        {/* Static Button Section */}
        
       
    
        {/* Scrollable List */}
        <FlatList
          style={styles.scrollView}
          data={selectedList === 'birdedex' ? birdedex : userlists}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <Table borderStyle={styles.table}>
                <Row
                  data={[item.birdid ,item.bird, item.sighting_time]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </Table>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
    
        {/* Overlay Picker */}
        {isPickerShown && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedList}
              onValueChange={itemValue => setSelectedList(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Birdedex" value="birdedex" />
              <Picker.Item label="Userlists" value="userlists" />
            </Picker>
          </View>
        )}
      </View>
    );
}

export default App;