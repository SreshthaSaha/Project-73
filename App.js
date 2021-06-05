import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,Image} from 'react-native';
import WriteStoryScreen from './screens/WriteStoryScreen';
import ReadStoryScreen from './screens/ReadStoryScreen';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator } from 'react-navigation-tabs';

export default function App() {
  return (    
    <AppContainer/>
  );
}
const TabNavigator = createBottomTabNavigator({
  WriteStoryScreen : {
      screen :WriteStoryScreen , 
      navigationOptions : {
          tabBarIcon : <Image source={require("./Images/write.png")} style={{width:20, height:20}}/>,            
          tabBarLabel : "Write Story"
      }
  },
  ReadStoryScreen : {
      screen : ReadStoryScreen , 
      navigationOptions : {
          tabBarIcon : <Image source={require("./Images/read.png")} style={{width:20, height:20}}/>,
          tabBarLabel : "Read Story"          
      }
  }
})
const AppContainer = createAppContainer (TabNavigator)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
