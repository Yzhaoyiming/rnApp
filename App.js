import React,{useState,useEffect} from 'react';
import {BackHandler,ToastAndroid,AsyncStorage,View} from 'react-native';
import {Router,Scene,Overlay, Tabs,Lightbox,Modal,Actions}from 'react-native-router-flux';
import {Icon} from '@ant-design/react-native';
import list from './src/goods/list';
import Sever from './src/home/Sever';
import My from './src/userinfor/My';
import Show from './src/userinfor/Show';
import Login from './src/common/Login';
import Register from './src/common/Register';
import SwiperPage from './src/common/SwiperPage';
import SplashScreen from 'react-native-splash-screen'

console.disableYellowBox = true;
const App = () => { 
  let [isLogin,setLogin] = useState(false);
	let [isInstall,setInstall] = useState(true);
	let now = 0;
	let init = ()=>{
		AsyncStorage.getItem('isInstall')
      .then(res=>{
        console.log('isinstall',res)
        if(res){
          setInstall(false);
        }
      })
		AsyncStorage.getItem('user')
      .then(res=>{
        let user = JSON.parse(res)
        console.log(user)
        if(!user){
          SplashScreen.hide();
        }
        if(user&&user.token){
          setLogin(true);
          SplashScreen.hide();
        }
    })
	}
	useEffect(()=>{
    init();
    BackHandler.addEventListener('hardwareBackPress',onBackAndroid);
  },[])
  function onBackAndroid(){
    console.log("44")
    if(Actions.currentScene != 'home'&& Actions.currentScene != 'login'){
      Actions.pop();
      return true;
    }else{
      if(new Date().getTime()-now<2000){
        BackHandler.exitApp();
      }else{
        ToastAndroid.show('确定要退出吗',100);
        now = new Date().getTime();
        return true;
      }
    }    
  }
	let afterInstall = ()=>{
		console.log('after install')
		setInstall(false)
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}
  //实现tabs
  return (
    <Router backAndroidHandler={onBackAndroid}>
        <Overlay>
        <Modal key="modal" hideNavBar>
          <Lightbox>
            <Scene key='root'>
            <Tabs key='tabbar'
            hideNavBar
            activeTintColor='red'
            inactiveTintColor="gray"
            tabBarStyle={{backgroundColor:"#fff"}}
            >
              <Scene 
                  key='homePage'
                  title='首页'
                  hideNavBar
                  icon={
                    
                    ({focused})=><Icon 
                    color={focused?'red':'gray'}
                    name="home"/>
                    }
              >
                <scene key='home' component={Sever}></scene>
              </Scene>
              {/* 列表栏 */}
              <Scene 
              key='list'
              title='分类'
              hideNavBar
              icon={
                    
                ({focused})=><Icon 
                color={focused?'red':'gray'}
                name="appstore"/>
                }
              >
                <scene key='list' component={list}></scene>
              </Scene>
              {/* 个人中心栏 */}
              <Scene 
              key='my'
              title='个人中心'
              hideNavBar
              icon={                    
                ({focused})=><Icon 
                color={focused?'red':'gray'}
                name="user"/>
                }
              >
                <scene key='my' component={My}></scene>
              </Scene>

            </Tabs>
            <Scene key="show" title='我的发布' hideNavBar component={Show}/>
            </Scene>       
        </Lightbox>
        <Scene initial={!isLogin} key='login' component={Login}/>
        <Scene  key='register' component={Register}/>


      </Modal>
      </Overlay>
    </Router>
  );
};

export default App;
