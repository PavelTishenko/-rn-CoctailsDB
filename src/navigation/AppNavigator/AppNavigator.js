import React from 'react'
import { Text } from 'react-native'
// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// Components
import MainPage from '../../screens/MainPage/'
const Stack = createStackNavigator()

export const AppNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Main' screenOptions={{title: 'hello'}}>
                <Stack.Screen 
                    name='Main' 
                    component={MainPage}
                    options={{
                            title: 'Hello',
                            headerShown: true
                       }}/>
            </Stack.Navigator>    
        </NavigationContainer>
    )
}