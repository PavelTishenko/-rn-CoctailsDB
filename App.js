/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// Components
import MainPage from './src/screens/MainPage'
import FilterPage from './src/screens/FilterPage'
// Get methods from service
import { 
    getCategories, 
    getCocteils, 
    getMFS, 
    getCocoa, 
    getOrdinary, 
    getFilterData } from './services/getData'

// axios for getting data from api
import axios from 'axios'


const Stack = createStackNavigator()


const App = () => {
    // ****************State section**********************
    const [categories, setCategories] = useState()
    // Just test with ordinary
    const [ordinary, setOrdinary] = useState()
    // Set state of loaded data of coctails etc..
    const [loaded, setLoaded] = useState({
        Coctails:false,
        MFS: false,
        Cocoa: false
    })
    //  Set state of all data for rendering and filtering
    const [allData, setAllData] = useState([])
    // ***************************************************

    // Get first data to render
    const getOrdinary = async () => {
        return axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
                .then(res=>{
                    const Ordinary = res.data.drinks
                    setOrdinary(Ordinary)
                    setAllData([{
                        title: 'Ordinary',
                        arr: Ordinary,
                        filtered: false
                    }])
                })
    } 
    // Use hook for one time get first data and render it
    useEffect(()=>{
        getOrdinary()
        getCategories()
      .then(res=>{
        const categ = res.data.drinks
        setCategories(categ)
      })
    }, [])
    
    // When list is scrolled to end load new and set flag of loaded to true
    const onEndScrollHandler = () => {
        if(loaded.Coctails === false){
            getCocteils()
                .then(res => {
                    const Coctails = res.data.drinks
                    setAllData([
                        ...allData,
                        {   
                            title: 'Coctails',
                            arr: Coctails,
                            filtered: false
                        }
                    ])
                })
            // Set flag of loaded
            setLoaded((prev)=>{
            return {
                ...prev,
                Coctails: true,
                
            }
        })
        }
       
        // console.log(loaded);
        if(loaded.MFS === false && loaded.Coctails === true){
            getMFS()
                .then(res=>{
                    const mfs = res.data.drinks
                    setAllData([
                        ...allData,
                        {
                            title: 'Milk \/ Float \/ Shake',
                            arr: mfs,
                            filtered: false
                        }
                    ])
                })
            // Set flag of loaded
            setLoaded((prev)=>{
                return{
                    ...prev,
                    MFS: true
                }
            })       
        } 

        if(loaded.Cocoa === false && loaded.Coctails === true && loaded.MFS === true){
            getCocoa()
                .then(res=>{
                    const Cocoa = res.data.drinks
                    setAllData([
                        ...allData,
                        {
                            title: 'Cocoa',
                            arr: Cocoa,
                            filtered: false
                        }
                    ])
                })
            // Set flag of loaded
            setLoaded((prev)=>{
                return{
                    ...prev,
                    Cocoa: true
                }
            })    
        }
    }
    //We have text value here from FilterPage, I need to do some filter with allData 
    const filterHandler = (item) => {
      getFilterData(item.strCategory)
        .then(res => {
          const newData = res.data.drinks
          setAllData([
            {
              title: item.strCategory,
              arr: newData,
              filtered: false
            }
          ])
        })
    }
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen 
          name='Main' 
          options={({navigation})=> ({
            headerTintColor: '#fff',
            headerStyle: styles.header,
            headerLeft: () => <Text style={styles.headerLeft}>DRINKS</Text>,
            headerRight: () => <Text 
                                onPress={()=> navigation.navigate('Filter')} 
                                style={styles.filter}
                                >FILTER
                              </Text>
            
          } ) }
        >
          {
            () => <MainPage allData={allData} onEndScrollHandler={onEndScrollHandler}/>
          }
        </Stack.Screen>
        <Stack.Screen
          name='Filter'
          options={({navigation}) => ({
            headerTintColor: '#fff',
            headerStyle: styles.header,
            headerLeft: () => <Text
                             style={styles.filterHeaderLeft}
                             onPress={()=> navigation.navigate('Main')} 
                             >BACK
                            </Text>
          })}
        >
          {
            ()=><FilterPage categories={categories} allData={allData} filterHandler={filterHandler}/>
          }
        </Stack.Screen>  
      </Stack.Navigator>    
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  filter: {
    marginRight: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20
  },
  header: {
    backgroundColor: '#61045f'
  },
  headerLeft: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginLeft: 20
  },
  filterHeaderLeft: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginLeft: 20
  }
});

export default App;
