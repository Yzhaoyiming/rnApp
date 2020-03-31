import {StyleSheet,ScrollView,View,Text,Label,
    Image,StatusBar,FlatList,Dimensions,Animated,TouchableOpacity,AsyncStorage} from 'react-native';
import React, { Component } from 'react';
import {Actions} from "react-native-router-flux";
import Button from "react-native-button"
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {myFetch} from '../utils'



const {height} = Dimensions.get('window');
const h = height / 640;
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};
const me = [
  {title: '账户管理',img: require('../assets/9.jpg')},
  {title: '收货地址',img: require('../assets/9.jpg')},
  {title: '我的信息',img: require('../assets/9.jpg')},
  {title: '我的订单',img: require('../assets/9.jpg')},
  {title: '我的二维码',img: require('../assets/9.jpg')},
  {title: '我的积分',img: require('../assets/9.jpg')},
  {title: '我的收藏',img: require('../assets/9.jpg')}, 
]
const activity = [
  {title: '居家维修保养',img: require('../assets/10.jpg')},
  {title: '出行接送',img: require('../assets/10.jpg')},
  {title: '我的受赠人',img: require('../assets/10.jpg')},
  {title: '我的住宿优惠',img: require('../assets/10.jpg')},
  {title: '我的活动',img: require('../assets/10.jpg')},
] 
export default class My extends Component {
    constructor(){
        super();
        let data = [];        
        this.state = {
            data,
            width: new Animated.Value(20),
            imageUrl:'',
            isFine:false,
            isloading:true,
        }
    }
    takephoto = ()=>{
        ImageCropPicker.openCamera({
            width:300,
            height:400,
            cropping:true,
        }).then(image => {
            this.setState({imageUrl:{uri:image.path,isFine:true}})
            this.storePhoto(this.state.imageUrl);
        })

    }
    storePhoto =(data)=>{
        AsyncStorage.setItem('data',JSON.stringify(data),
            ()=>{console.log('store success')}
        )
    }
    getPhoto = ()=>{
        AsyncStorage.getItem('data')
        .then((res)=>{
            this.setState({imageUrl:(res?JSON.parse(res):require('../assets/avatar.png'))})
            
        })
    }
    componentDidMount(){
        this.getPhoto()
    }
    backlogin=()=>{
        myFetch.get('/back')
            .then(res=>{
                // 清除数据
                // console.log("12")
                console.log(res)                
                AsyncStorage.setItem('user','')
                // console.log(res)
                    .then(()=>{
                    this.setState({isloading:false})
                    Actions.replace('login');
                })              
        })        
    }
    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="red"/>
                <ScrollView>
                    <View style={styles.tp}> 
                        <TouchableOpacity style={{height:130,width:130,alignItems:"center",justifyContent:"center",borderRadius:65,borderWidth:0.5,borderColor:"#ccc"}} onPress={()=>{this.takephoto()}}>
                            <Image source={this.state.imageUrl} style={{height:130,width:"100%",borderRadius:65}}/>
                        </TouchableOpacity>                                                         
                        <Text style={{color:"white",fontSize:19}}>BINNU DHILLON</Text>
                    </View>
                    <View style={{alignItems:"center",height:208*h,backgroundColor:"#fff"}}>
                        <View style={{width:"100%",paddingLeft:6,height:35*h,backgroundColor:"white",alignItems:"center",flexDirection:"row",borderBottomWidth:1,borderColor:"#ccc"}}>
                            <Image style={{width:"5%",height:"60%"}} source={require("../assets/s.jpg")}/>
                            <Text style={{marginLeft:10}}>我的个人中心</Text>                                                     
                        </View>
                        <FlatList 
                                data={me}
                                numColumns={3}
                                renderItem={({item})=>(
                                    <View style={styles.me}>
                                        <Image 
                                            resizeMode="contain"
                                            source={item.img} 
                                            style={{height:25}}                                          
                                        />
                                        <Text style={{marginTop:10}}>{item.title}</Text>                                      
                                    </View>
                                )}
                            />                       
                    </View>
                    <View style={{alignItems:"center",height:160*h,backgroundColor:"#fff",marginTop:10,position:"relative"}}>
                        <View style={{width:"100%",paddingLeft:6,height:35*h,backgroundColor:"white",alignItems:"center",flexDirection:"row",borderBottomWidth:1,borderColor:"#ccc"}}>
                            <Image style={{width:"5%",height:"60%"}} source={require("../assets/d.jpg")}/>
                            <Text style={{marginLeft:10}}>E族活动</Text>                           
                        </View>
                        <FlatList 
                                data={activity}
                                numColumns={3}
                                style={{marginBottom:5}}
                                renderItem={({item})=>(
                                    <View style={styles.me}>
                                        <Image 
                                            resizeMode="contain"
                                            source={item.img} 
                                            style={{height:25}}                                          
                                        />
                                        <Text style={{marginTop:10}}>{item.title}</Text>                                      
                                    </View>
                                )}
                            /> 
                            {/* 我的发布 */}
                            <TouchableOpacity style={styles.met} onPress={()=>{Actions.show()}}>
                                <View style={styles.mex}>
                                    <Image 
                                        resizeMode="contain"
                                        source={require('../assets/10.jpg')} 
                                        style={{height:25}}                                          
                                    />
                                    <Text style={{marginTop:10}}>我的发布</Text>                                      
                                </View>
                            </TouchableOpacity>
                                              
                    </View>
                    <TouchableOpacity style={{alignItems:"center",width:"100%",marginTop:20}} onPress={this.backlogin}>
                        <Text style={{fontSize:16,color:"red"}}>BINNU DHILLON | 退出登录</Text>
                    </TouchableOpacity>
                </ScrollView>              
            </View>
        )
    }
}
const styles = StyleSheet.create({
    btn:{
        width:200,
        height:40,
        textAlignVertical:"center",//垂直居中
        color:"red",
        backgroundColor:"pink",
        marginTop:10


    },
    tp:{
        height:165*h,
        width:"100%",
        backgroundColor:"red",
        alignItems:"center",
        justifyContent:"center"
    },
    me:{
        width:"33%",
        height:57*h,
        alignItems:"center",
        justifyContent:"center"

    },
    met:{
        width:"33%",
        height:57*h,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        bottom:15,
        right:4

    },
    mex:{
        width:"42%",
        height:57*h,
        alignItems:"center",
        justifyContent:"center"

    },
  });
  
  