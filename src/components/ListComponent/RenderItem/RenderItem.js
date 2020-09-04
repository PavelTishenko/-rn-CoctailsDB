import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

export const RenderItem = ({item}) => {
    // console.log(item);
    return(
        <View style={style.container}>
        <LinearGradient
            colors={['#61045f', '#20011f']}
            style={style.gradient}
            >
            <View style={{flex: 1, alignItems: 'center', marginTop: 20, justifyContent: 'space-around'}}>
                <Text style={style.txt}>{item.strDrink}</Text>   
                <Image source={{uri: item.strDrinkThumb}} style={{height: 200, width: 200,borderRadius: 20}}/>
                <Button title='Drink that'/>
            </View>
        </LinearGradient>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#61045f',
        shadowOpacity: 1.0,
        marginRight: 20,
        marginLeft: 10
    },
    txt: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white'
    },
    gradient: {
        height: 400, 
        borderRadius: 20, 
        width: 390, 
        marginTop: 20
    }
})