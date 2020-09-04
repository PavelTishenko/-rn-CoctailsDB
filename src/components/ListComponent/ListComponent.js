import React, {useState, useEffect} from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import RenderItem from './RenderItem'

export const ListComponent = ({allData, onEndScrollHandler}) => {
    return(
        <>
            <FlatList
                data={allData}
                onEndReached={onEndScrollHandler}
                onEndReachedThreshold={0.1}
                renderItem={({item})=>{
                    return(
                        <FlatList
                            ListHeaderComponent={()=>{
                                return(
                                    <View style={style.listHeaderContainer}>
                                        <Text style={style.listHeader}>{item.title}</Text>
                                    </View>
                                )
                            }}
                            data={item.arr}
                            keyExtractor={(item, index)=>index.toString()}
                            renderItem={({item})=>{
                                return(
                                    <>
                                        <RenderItem item={item}/>
                                    </>
                                )
                            }}
                        />
                    )
                    
                }}
                keyExtractor={(item, index )=>index.toString()}
            />
        </>
    )
}

const style = StyleSheet.create({
    listHeaderContainer: {
        flexDirection: 'row'
    },
    listHeader: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 30,

    }
    
})