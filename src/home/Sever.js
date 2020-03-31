import {TouchableOpacity,StyleSheet,ScrollView,View,Text,
    Image,StatusBar,TextInput,FlatList,Dimensions,} from 'react-native';
import React, { Component } from 'react';

const {width,height} = Dimensions.get('window');
const h = height / 640;
const goods = [
  {
      title: '居家维修保养',
      img: require('../assets/1.jpg')
  },
  {
      title: '住宿优惠',
      img: require('../assets/2.jpg')
  },
  {
    title: '出行接送',
    img: require('../assets/3.jpg')
  },
  {
    title: 'E族活动',
    img: require('../assets/4.jpg')
  },
  
]
export default class Sever extends Component {
  constructor(){
    super();
    this.state = {
        tits: []
    }
  }
  render() {   
    return (
      <View style={{flex:1}}> 
        {/* 状态栏 */}
        <StatusBar backgroundColor="red"/>
        {/* 主要内容 */}
        <ScrollView>             
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",paddingTop:10,paddingBottom:7,backgroundColor:"red"}}>
            <View
              style={styles.nav}>
              <Image source={require("../assets/search.png")} style={{width:20,height:20,position:"absolute",left:20}}/>
              <TextInput placeholder="请输入商品名称" placeholderTextColor="white"/>
            </View>
            <Image source={require("../assets/shop.jpg")} style={{width:25,height:25,}}/>
          </View>
          {/* 轮播图 */}
            <ScrollView 
                pagingEnabled={true}
                horizontal={true}
                style={{height:300,marginBottom:10}}
            >
                <View style={styles.slide}>
                  <Image source={require("../assets/c1.jpg")} style={{height:"100%",width:"100%"}}/>
                </View>
                <View style={styles.slide}>
                  <Image source={require("../assets/c2.jpg")} style={{height:"100%",width:"100%"}}/>
                </View>                    
            </ScrollView>
          {/* 选择功能  */}
               <FlatList 
                    data={goods}
                    renderItem={({item})=>(
                        <View style={{width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                          <View style={{backgroundColor:"white",width:"96%",height:55*h,flexDirection:"row",alignItems:"center",margin:2}}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:"80%",marginRight:10}}
                            />
                            <Text style={{color:"gray",fontSize:15,width:"65%",paddingRight:10}}>{item.title}</Text>
                            <Text style={{color:"#ccc"}}>></Text>
                            
                          </View>  
                        </View>
                    )}
                />
          {/* 发布按钮 */}
          <View style={{width:"100%",height:70*h,alignItems:"center",justifyContent:"center"}}>
            <TouchableOpacity
              style={{width:"70%",height:50,alignItems:"center",justifyContent:"center",borderRadius:10,backgroundColor:"red"}}
            >
              <Text style={{fontSize:20,color:"white"}}>发布商家</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
      </View>
      
    )
  }
}
const styles = StyleSheet.create({
  slide:{
    width:width,
    height:300,
    marginTop:10,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
 },
 nav:{
    width:"85%",
    height:27*h,
    paddingLeft:40,
    marginRight:10,
    backgroundColor:"#fff",
    opacity:0.8,
    borderRadius:17,
    position:"relative",
    alignItems:"center",
    flexDirection:"row"
 } 
});

