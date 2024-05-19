import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import {Icon} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


const FooterNav =()=>{
    const navigation = useNavigation();
    function saveScrollPositions(theForm) {
        if (theForm) {
            const scrolly = window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop;
            const scrollx = window.pageXOffset !== undefined ? window.pageXOffset : document.documentElement.scrollLeft;
            theForm.scrollx.value = scrollx;
            theForm.scrolly.value = scrolly;
        }
    }

    return (
       
    <View style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 10, backgroundColor: '#f3f3f3', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('/feed')}>
            <Icon name="home" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('/search')}>
            <Icon name="search" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('/upload')}>
            <Icon name="add-box" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('/profile')}>
            <View style={{ width: 24, height: 24, backgroundColor: '#f3f3f3', borderRadius: 12, overflow: 'hidden' }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: `/images/updates/${user.profileImage}` }} />
            </View>
        </TouchableOpacity>
    </View>
)}




 

export default FooterNav;