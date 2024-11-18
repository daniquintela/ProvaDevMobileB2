import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rhjdqjfjmrmiuicnbpbw.supabase.co';
const SUPABASE_ANON_KEY = 'SUPABASE_ANON_KEY'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuthAction = async () => {
    setErrorMessage('');
    if (isLoginView) {
      // Login
      try {
        const { error, user } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        Alert.alert('Sucesso', 'Usuário logado com sucesso!');
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      // Registro
      try {
        const { error, user } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        setIsLoginView(true); 
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
        <Text style={styles.buttonText}>{isLoginView ? 'Login' : 'Registrar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLoginView(!isLoginView)}>
        <Text style={styles.link}>
          {isLoginView ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#FFB6C1',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FF69B4',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    color: '#CA1187',
  },
});

export default App;
