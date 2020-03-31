import React, { Component } from 'react'
import {View,Button,Text,Image,Dimensions,TextInput,AsyncStorage,TouchableOpacity,StyleSheet} from "react-native"
import {Actions} from "react-native-router-flux"
import {Icon} from '@ant-design/react-native';
import {myFetch} from '../utils'

const {height} = Dimensions.get('window');
const h = height / 640;
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    login = ()=>{      
        this.setState({isloading:true})
        myFetch.post('/login',{           
            username:this.state.username,
            pwd:this.state.pwd}
        ).then(res=>{
        // 存储数据
            AsyncStorage.setItem('user',JSON.stringify(res.data))
            // console.log(res)
                .then(()=>{
                    this.setState({isloading:false})
                    Actions.homePage();
                })
        })
    } 
    register = ()=>{       
        Actions.register();        
    } 
    render() {
        return (
            <View style={{flex:1,alignItems:"center"}}>
                <View style={styles.tp}>                                                                                                               
                    <Text style={{color:"white",fontSize:19,marginLeft:"30%",marginRight:"30%"}}>登录</Text>                    
                </View> 
                <View style={{height:"80%",width:"100%",justifyContent:"center",alignItems:"center"}}>
                
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <View
                        style={{
                        width:"70%",
                        height:40,
                        flexDirection:"row",
                        alignItems:"center",
                        paddingLeft:10,
                        marginRight:10,
                        borderBottomWidth:1
                    }}>
                        <Icon name="user" color="red"/>
                        {/* <Image source={require("../assets/icon/use.png")} style={{width:20,height:20}}/> */}
                        <TextInput placeholder="用户名" onChangeText={this.userhandle}/>
                        </View>                   
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <View
                        style={{
                        width:"70%",
                        height:40,
                        flexDirection:"row",
                        alignItems:"center",
                        paddingLeft:10,
                        marginRight:10, 
                        marginBottom:30,                                   
                        borderBottomWidth:1
                    }}>
                        <Icon name="user" color="red"/>
                        {/* <Image source={require("../assets/icon/use.png")} style={{width:20,height:20}}/> */}
                        <TextInput onChangeText={this.pwdhandle}
                            placeholder="密码" 
                            secureTextEntry={true}/>
                        </View>                    
                    </View>
                    <View style={{width:"100%",alignItems:"center"}}>
                        <TouchableOpacity
                            style={{width:"60%",height:40,alignItems:"center",justifyContent:"center",borderRadius:20,borderWidth:1,marginTop:10,marginBottom:20}}
                            onPress={this.login}><Text style={{fontSize:20}}>登录</Text></TouchableOpacity>
                            <TouchableOpacity
                            style={{width:"60%",height:40,alignItems:"center",justifyContent:"center",borderRadius:20,borderWidth:1,marginTop:10,marginBottom:10}}
                            onPress={this.register}><Text style={{fontSize:20}}>注册新账号</Text></TouchableOpacity>
                    </View>
                    {
                        this.state.isloading
                        ?<View><Text>正在登录,请稍候……</Text></View>
                        :null
                    }
                </View>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    tp:{
        height:40*h,
        width:"100%",
        backgroundColor:"red",
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center"
    },
    
  });