import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import axios from 'axios';

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
        {/* Header component */}
      </View>

      <View style={{ flex: 1, backgroundColor: '#000', paddingHorizontal: 4, paddingVertical: 5 }}>
        <View style={{ borderWidth: 2, borderColor: '#111', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 2, paddingVertical: 1, borderRadius: 8 }}>
          <Text style={{ color: '#fff' }}>Search</Text>
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

      {/* Include footer component */}
      <View>
        {/* Footer component */}
      </View>
    </>
  );
};

export default SearchScreen;
