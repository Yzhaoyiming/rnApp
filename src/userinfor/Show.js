import {StyleSheet,ScrollView,View,Text,
    Image,StatusBar,AsyncStorage,Dimensions,TouchableOpacity,ToastAndroid} from 'react-native';
import React, { Component } from 'react';
import {Actions} from "react-native-router-flux";
import Button from "react-native-button"

const {height} = Dimensions.get('window');
const h = height / 640;

export default class Show extends Component {
    constructor(){
        super();
        this.state = {
            tits: [],
            con:["待回复","已回复"],
            page:1,
            arr:[]
        }
    }
    // 下一页
    nextPage=()=>{
        this.setState({
            page:this.state.page+1
        })
    }
    // 上一页
    previousPage=()=>{
        this.setState({
            page:((this.state.page<=1)?(this.state.page=1):(this.state.page-1)),
            disabled:(this.state.page==1)?ToastAndroid.show('不能再点喽!', ToastAndroid.SHORT)&&(this.state.disabled=true):(this.state.disabled=false)
        })
    }
    // 随机产生待回复已回复
    reply=()=>{
        let brr = [];
        for(var i=0;i<10;i++){
            let content = this.state.con[parseInt(Math.random()*2)];
            brr.push({"ran":content})
        }
        console.log(brr);
        this.setState({arr:brr})
    }
    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+this.state.page)
            .then(res=>res.json())
            .then(res=>{
                this.setState({tits: res.data});
            })
        this.reply();
    }
    componentDidUpdate(){
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+this.state.page)
            .then(res=>res.json())
            .then(res=>{
                this.setState({tits: res.data});
            })
    }
    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="red"/>
                <ScrollView>
                    <View style={styles.tp}>  
                        <TouchableOpacity  style={{height:45,width:45}} onPress={() => Actions.pop()}>
                            <Image source={require("../assets/return.png")} style={{height:45,width:"60%"}}/>                       

                        </TouchableOpacity>                                                                                                        
                        <Text style={{color:"white",fontSize:19,marginLeft:"30%",marginRight:"30%"}}>我的发布</Text>
                        <Image source={require("../assets/menu.png")} style={{height:45,width:"6%"}}/>
                    </View>  
                    {
                        this.state.tits.map((item,idx)=>(
                            <View style={styles.me}>                               
                                <Text backgroundColor="red" style={{fontSize:17,width:300}}>{(item.title)?((item.title).length>15?(item.title).substring(0,15)+"...":(item.title)):""}</Text>                               
                                <Text style={{fontSize:17,marginRight:10}}>{(item.create_at).substring(0,10)}</Text>
                                <Text style={{fontSize:17}}>
                                    {
                                        this.state.arr[idx].ran=='待回复'
                                        ?<Text>{this.state.arr[idx].ran}</Text>
                                        :<Text style={{color:'red'}}>{this.state.arr[idx].ran}</Text>
                                    }
                                </Text>
                            </View>
                        ))
                    } 
                    <View style={styles.btm}>
                        <TouchableOpacity style={{
                            width:100,
                            height:35,
                            backgroundColor:'red',
                            alignItems:"center",
                            justifyContent:'center',
                            borderRadius:20,
                        }}
                            onPress={() => this.previousPage()}
                        >
                           <Text style={{color:"white"}}>上一页</Text>
                        </TouchableOpacity> 
                        <Text style={{marginLeft:100,marginRight:100}}>第 {this.state.page} 页</Text>
                        <TouchableOpacity style={{
                            width:100,
                            height:35,
                            backgroundColor:'red',
                            alignItems:"center",
                            justifyContent:'center',
                            borderRadius:20,
                        }}
                            onPress={() => this.nextPage()}
                        >
                           <Text style={{color:"white"}}>下一页</Text>
                        </TouchableOpacity> 
                    </View>                                   
                </ScrollView>              
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
    me:{
        width:"100%",
        height:37*h,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"white"
    },
    btm:{
        width:"100%",
        height:70,
        backgroundColor:"#fff",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"

    }
  });
  
  