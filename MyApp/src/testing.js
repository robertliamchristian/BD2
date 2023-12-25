import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  const [birdedex, setBirdedex] = useState([]);
  const [userlists, setUserlists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/birdedex')
      .then(response => response.json())
      .then(data => setBirdedex(data))
      .catch(error => console.error(error));

    fetch('http://localhost:3000/userlists')
      .then(response => response.json())
      .then(data => setUserlists(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <Text>Birdedex:</Text>
      {birdedex.map((bird, index) => (
        <Text key={index}>{bird.bird}</Text>
      ))}

      <Text>Userlists:</Text>
      {userlists.map((list, index) => (
        <Text key={index}>{list.listid}</Text>
      ))}
    </View>
  );
};

export default App;