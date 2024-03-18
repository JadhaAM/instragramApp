import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ user }) => {
    console.log(user);
  return (
    <>
      {/* include ./partials/header.ejs */}
      <View style={{ backgroundColor: '#1a202c', paddingTop: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>{user.username}</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ fontSize: 14, color: 'white' }}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ fontSize: 14, color: 'white' }}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 6, paddingRight: '12vw', marginTop: 8 }}>
          <View style={{ width: '19vw', height: '19vw', backgroundColor: '#ebf8ff', borderRadius: '50%', overflow: 'hidden' }}>
            <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: `/images/updates/${user.profileImage}` }} />
          </View>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text>{user.posts ? user.posts.length : 0}</Text>
              <Text>Posts</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text>322</Text>
              <Text>Followers</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text>120</Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 6, marginTop: 5 }}>
          <Text style={{ fontSize: 16, marginBottom: 1 }}>{user.name}</Text>
          <Text style={{ fontSize: 10, opacity: 0.5 }}>{user.bio}</Text>
        </View>
        <View style={{ paddingHorizontal: 6, marginTop: 5 }}>
          <TouchableOpacity style={{ paddingHorizontal: 3, paddingVertical: 2, backgroundColor: '#1a202c', borderRadius: 4 }} onPress={() => {}}>
            <Text style={{ fontSize: 10, color: 'white' }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#1a202c', borderRadius: 4, marginTop: 5 }} onPress={() => {}}>
            <Text style={{ color: 'white' }}>Follow</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, paddingVertical: 2, marginTop: 5 }}>
          {/* user.posts.reverse().forEach(function(elem){ */}
          {user.posts.map((elem) => (
            <View key={elem.id} style={{ width: '32.5%', height: 32, backgroundColor: '#ebf8ff' }}>
              <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: `/images/updates/${elem.picture}` }} />
            </View>
          ))}
          {/* }) */}
        </View>
      </View>
      {/* include ./partials/footer.ejs */}
    </>
  );
};

export default ProfileScreen;
