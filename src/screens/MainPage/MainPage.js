import React from 'react'
import {Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import ListComponent from '../../components/ListComponent'

export const MainPage = ({allData, onEndScrollHandler}) => {
    return(
        <View style={style.container}>
           <ListComponent allData={allData} onEndScrollHandler={onEndScrollHandler}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ffebcd'
    }
})