import React, {useState} from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
// import { Icon } from 'react-native-vector-icons/Icon'
import Icon from 'react-native-vector-icons/FontAwesome'
export const FilterPage = ({categories, filterHandler}) => {
    const [styleHandler, setStyleHandler] = useState(false)
    return(
        <>
            <FlatList
                data={categories}
                renderItem={({item})=>
                    <View style={styleHandler ? style.borderF : style.border}>
                    <Text
                        ref={item.strCategory} 
                        style={style.listOfCateg}
                        onPress={()=>{
                            setStyleHandler(true)
                            filterHandler(item)
                        }}
                        >{item.strCategory}
                    </Text>
                    <Icon name='angle-down'/>
                    </View>
                    }
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    )
}

const style = StyleSheet.create({
    listOfCateg: {
        marginLeft: 20,
        marginTop: 20,
        color: '#7E7E7E'
    },
    border: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#61045f',
    },
    borderF: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#61045f',
        opacity: 0.5
    }
})