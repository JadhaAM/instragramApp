import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>InstaLive</Text>
            <View style={styles.icons}>
                <AntDesign
                    style={{ marginLeft: 8 }}
                    name="hearto"
                    size={25}
                    color="white"
                />
                <MaterialCommunityIcons

                    style={{ marginLeft: 8 }}
                    name="chat"
                    size={24}
                    color="white"
                    
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
        backgroundColor: '#000',
    },
    logo: {
        color: '#fff',
        fontSize: 24,

    },
    icons: {
        flexDirection: 'row',
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 20,
        color: '#fff',
        
    },
});

export default Header;
