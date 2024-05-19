import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [inputData, setInputData] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/username/${inputData}`);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [inputData]);

  return (
    <>
      {/* Include header component */}
      <View>
        <Header />
      </View>

      <View style={{ flex: 1, backgroundColor: '#000', paddingHorizontal: 4, paddingVertical: 5 }}>
        <View style={{ borderWidth: 2, borderColor: 'gray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 2, paddingVertical: 1, borderRadius: 8 }}>
          <Ionicons
            name="search"
            style={{ margin: 8 }}
            size={24}
            color="gray"
          />
          <TextInput style={{ color: 'gray' }}></TextInput>
          <TextInput
            style={{ marginLeft: 1, flex: 1, backgroundColor: '#000', color: '#ccc' }}
            placeholder="search username"
            value={inputData}
            onChangeText={setInputData}
          />
        </View>

        <View style={{ flex: 1 }}>
          {users.map((user) => (
            <TouchableOpacity key={user.id} onPress={() => handleUserPress(user)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <View style={{ width: '11vw', height: '11vw', borderRadius: '50%', overflow: 'hidden' }}>
                  <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: `/images/updates/${user.profileImage}` }} />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text>{user.username}</Text>
                  <Text style={{ fontSize: 12, opacity: 0.3, lineHeight: 1 }}>{user.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>


    </>
  );
};

export default SearchScreen;
