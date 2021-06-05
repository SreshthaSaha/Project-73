import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,TextInput,KeyboardAvoidingView,Alert } from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class WriteStoryScreen extends Component{
    constructor(){
        super();
        this.state ={
          title :"",
          author:"",
          story:"",
        }
      }

      createUniqueId(){
        return Math.random().toString(36).substring(7);
      }
      submitStory =()=>{
        var randomRequestId = this.createUniqueId()
        db.collection('Stories').add({
            "title": this.state.title,
            "author":this.state.author,
            "story":this.state.story,
            "request_id"  : randomRequestId,
        })
    
        this.setState({
            title :'',
            author : '',
            story : ''
        })
        alert("The story has been submitted");
    }
    render(){
        return(
            <View>                
                <View>
                    <KeyboardAvoidingView style={styles.keyBoardStyle}>
                            <TextInput
                            style ={styles.formTextInput}
                            placeholder={"Title of the Story"}
                            onChangeText={(text)=>{
                                this.setState({
                                    title:text
                                })
                            }
                            }/>
                        <TextInput
                            style ={styles.formTextInput}
                            placeholder={"Author of the story"}
                            onChangeText={(text)=>{
                                this.setState({
                                    author:text
                                })
                            }
                            }/>
                        <TextInput
                            style ={styles.formTextInput}
                            multiline = {true}
                            placeholder={"Write Story"}
                            onChangeText={(text)=>{
                                this.setState({
                                    story:text
                                })
                            }
                            }/>
                        <TouchableOpacity style ={styles.button} onPress = {this.submitStory} >
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    keyBoardStyle : {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
        width:"25%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        marginLeft : 10,
        marginTop : 20,
        shadowOffset: {
           width: 0,
           height: 8,
        }
    }
})
