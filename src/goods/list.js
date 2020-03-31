
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import React, { Component } from 'react'

export default class list extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>       
         <ScrollView>             
           <View style={{flexDirection:"row",justifyContent:"center",marginTop:10,marginBottom:10}}>
             <View
              style={{
                width:"85%",
                height:40,
              flexDirection:"row",
              alignItems:"center",
              paddingLeft:10,
              marginRight:10,
              backgroundColor:"#eeeeee",
              borderRadius:5,
              position:"relative"
            }}>
               <Image source={require("../assets/search.png")} style={{width:20,height:20,position:"absolute",right:10}}/>
               <TextInput placeholder="请输入商品名称"/>
             </View>
           </View>
           <View style={{
             width:"100%",
             height:40,
             flexDirection:"row",
              alignItems:"center",
              justifyContent:"center",
  
           }}>
             <View style={styles.texts}><Text style={{color:"red"}}>综合</Text></View>
             <View style={styles.texts}><Text>销量</Text></View>
             <View style={styles.texts}><Text>新品</Text></View>
             <View style={styles.texts}><Text>价格</Text></View>
             <View style={styles.texts}><Text>信用</Text></View>
  
           </View>
  
            <View style={{
              height:"100%",
              width:"100%",   
              backgroundColor:"#eeeeee",
              paddingTop:10
            }}>
           {/* FlatList */}
          <FlatList
          data={[
            {key: 'Oshi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳'},
            {key: 'Oshi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳'},
            {key: 'Oshi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳'},
          ]}
          renderItem={({item}) =>                    
            <View style={{
                  width:"95%",
                  height:"32%",  
                  marginLeft:12,
                  marginBottom:10,
                  flexDirection:"row",
                  justifyContent:"center",
                  
              }}>
                    {/* 最小框 */}
                    <View style={{
                        width:"45%",
                        height:220,    
                        marginRight:10, 
                        padding:10,  
                        alignItems:"center",
                        backgroundColor:"#fff",
                        justifyContent:"center",
  
                    }}>
                          <Image source={require('../assets/jia.png')} style={styles.img}/>
                          <Text>{item.key}</Text>
                          <View>
                          <Text style={{color:"red"}}>36.00</Text>
                          </View>
                      </View>
                      <View style={{
                        width:"45%",
                        height:220, 
                        padding:10,  
                        alignItems:"center",
                        backgroundColor:"#fff",
                        justifyContent:"center",
                      }}>
                          <Image source={require('../assets/shu.png')} style={styles.img}/>
                          <Text>{item.key}</Text>
                          <View>
                          <Text style={{color:"red"}}>36.00</Text>
                          </View>
                      </View>           
            </View>       
        }     
          />  
        </View>       
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  texts:{
    width:"20%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  img:{
    width:100,
    height:100,
    marginBottom:20,
  },
  box:{
    width:"40%",
    height:100,
    margin:10,
    backgroundColor:'blue',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});


