import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Add a state for userId

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      setIsLoggedIn(true);
      setUserId(response.data.userId); // Assuming backend sends userId in response
    } catch (error) {
      console.error('Error logging in', error);
      console.error('Error details', error.response);
    }
  };

  return (
    <View>
      {isLoggedIn ? (
        <Text>Logged in as {username}</Text>
      ) : (
        <>
          <Text>Username:</Text>
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder="Username"
          />
          <Text>Password:</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry
          />
          <Button title="Log in" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
};

export default LoginForm;