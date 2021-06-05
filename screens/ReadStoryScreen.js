import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';

export default class ReadStoryScreen extends Component{
    constructor(){
        super();
        this.state = {
            search: '',
            allStories : [],
            lastVisibleStories: null ,
        }
    }
    componentDidMount = async ()=>{
        const query = await db.collection("Stories").limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allStories: [],
            lastVisibleStories: doc
          })
        })
      } 
      searchStories= async(text) =>{
        var enteredText = text.split("")  
        if (enteredText[0].toUpperCase() ==='B'){
          const story =  await db.collection("Stories").where('title','==',text).get()
          story.docs.map((doc)=>{
            this.setState({
                allStories:[...this.state.allStories,doc.data()],
              lastVisibleStories: doc
            })
          })
        }
      }
    retriveStory = async ()=>{
        var text = this.state.search.toUpperCase()
        var enteredText = text.split("")    
        
        if (enteredText[0].toUpperCase() ==='B'){
        const query = await db.collection("Stories").where('title','==',text).startAfter(this.state.lastVisibleStories).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allStories: [...this.state.allStories, doc.data()],
            lastVisibleStories: doc
          })
        })
      }
        else if(enteredText[0].toUpperCase() === 'S'){
          const query = await db.collection("Stories").where('title','==',text).startAfter(this.state.lastVisibleStories).limit(10).get()
          query.docs.map((doc)=>{
            this.setState({
                allStories: [...this.state.allStories, doc.data()],
              lastVisibleStories: doc
            })
          })
        }
    }
     
    updateSearch=(search)=>{
        this.setState({search});
    }
    render(){
        const {search} = this.state;
        return(
            <View>
                <View>
                    <SearchBar
                    placeholder = "Type Here"
                    onChangeText = {this.updateSearch}
                    value = {search}
                    style = {{}}
                    />
                </View>                
                <View>
                    <ScrollView
                        style={{flex:1}}
                        data = {this.state.allStories}
                        renderItem = {({item}) => (
                        <View style={{borderBottomWidth: 2, marginTop:50}}>
                                <Text>{"title: " + item.title}</Text>
                                <Text>{"author: " + item.author}</Text>
                                <Text>{"story: " + item.story}</Text>
                                
                            </View>
                        )}
                    

                        keyExtractor= {(item, index)=> index.toString()}
                        onEndReached ={this.retriveStory}
                        onEndReachedThreshold={0.7}
                    >
        
                    </ScrollView> 
                </View>
            </View>

        );
    }
}