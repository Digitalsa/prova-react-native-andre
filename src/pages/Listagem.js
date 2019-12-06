import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import logo from '../assets/digitalsa.png';
import api from '../services/api'

function Listagem({ navigation }){

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers(){
      const response = await api.get('api/usuarios');
      console.log(response.data);
      await setUsers(response.data);
    }

    loadUsers();
  }, [])

  async function handleSair(){
    // limpar AsyncStorage
    await navigation.navigate('Login');
  }

  return (
    <View  style={styles.container}>
      <Text style={styles.title}>Usuários</Text>
      <TouchableOpacity style={styles.btnSair} onPress={() => handleSair()}>
        <Text style={{color: '#fff'}}>Sair</Text>
      </TouchableOpacity>
      <ScrollView style={styles.list}>
          <FlatList 
            data={users}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Text>Nome: {String(item.nome)}</Text>
                <Text>Email: {String(item.email)}</Text>
                <Text>Celular: {item.celular === '' ? 'Não informado.' : item.celular }</Text>
              </View>
              
            )}
          />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10
    },
    card: {
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#aaa',
      marginTop: 10,
      borderRadius: 10,
      padding: 10
    },
    list: {
      width: '90%'
    },
    btnSair: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#000',
      borderRadius: 10,
    }
})

export default Listagem;
