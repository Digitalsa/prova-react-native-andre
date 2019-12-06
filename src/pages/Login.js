import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import logo from '../assets/digitalsa.png';
import api from '../services/api'

function Login({ navigation }){
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  async function handleLogin(){
    const response = await api.post('api/login', {
      email: email,
      password: pass
    })
    if(response.data.status === false){
      return Alert.alert('Erro ao fazer LOGIN', 'Email ou senha inválidos!')
    }
    navigation.navigate('Listagem');
  }

  return (
      <View style={styles.container}>
          <View style={styles.form}>
            <Image source={logo} style={styles.logo} />
              <Text style={styles.txtLogo}>DIGITAL SA</Text>
              <TextInput style={styles.inputs} 
                placeholder="Email" 
                placeholderTextColor="#fff"
                onChangeText={(email) => setEmail(email)}
                value={email}
              />
              <TextInput style={styles.inputs} 
                placeholder="Senha"
                placeholderTextColor="#fff"
                onChangeText={(pass) => setPass(pass)}
                value={pass}
                secureTextEntry={true}
              />
              <TouchableOpacity 
                style={(email === '' || pass === '') ? [styles.btnLogin, {opacity: 0.2}] : styles.btnLogin} 
                onPress={() => handleLogin()}
                disabled={(email === '' || pass === '') ? true : false}
                >
                <Text style={styles.txtLogin}>LOGIN</Text>
              </TouchableOpacity>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: '90%',
        height: '70%',
    },
    inputs: {
        borderRadius: 10,
        height: 40,
        width: '80%',
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#fff',
        color: '#fff',
        padding: 10,
        textAlign: 'center'
    },
    logo: {
      height: '30%',
      resizeMode: 'contain'
    },
    btnLogin: {
      width: '80%',
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: "center"
    },
    txtLogin: {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 'bold'
    },
    txtLogo: {
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff'
    }
})

export default Login;
