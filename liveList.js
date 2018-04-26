import React, { Component } from 'react';
import { FlatList, SectionList, StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;

export default class FlatListBasics extends Component {

    constructor(props){
        super(props)

        this.state = {
            list: []
        }
    }

    componentDidMount(){
        this.requestData()
    }

    async requestData(){
        try{
            let response = await fetch('http://restapi-test.ihaozhuo.com:82/video/live/v4120/appList',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json; text/html',
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    _from: 'yjk',
                    appId: '101',
                    appVersion: '4.16.0',
                    pageIndex: '1',
                    sign: 'ac47d9470d3e28b342ed5e4914a374d6',
                    token: 'c340e151608381f8866ee1cd09f748e9',
                    userId: 'f0121d64-31cb-4d1d-ab50-6e32fa6ffc73',
                    videoLiveStatus: '2'
                })
            });

            let responseJson = await response.json();
            
            this.setState( previousState => {
                return { list: responseJson.data.list};
            })
            console.log(responseJson)
        }catch(error){
            console.error(error);
        }
    }

  render(){
      return (
        <View style = {styles.container}>
        <SectionList
        //   sections = {
        //       [
        //           {data: ['Wang']},
        //           {data: ['Jia']},
        //       ]
        //   }
          sections = {this.state.list}
          renderItem={({item})=> <ItemView style={styles.item}></ItemView>}
          renderSectionFooter = {({section}) => <View style={styles.sectionHeader}></View>}
        >
        </SectionList>
      </View>
      );
  }
}

class ItemView extends Component{
    render(){
        return (
            <View style = {this.props.style}>
                <ImageBackground source={{uri: 'http://prod.image.ihaozhuo.com/2017/12/04/15123819528542152.jpg'}} style={styles.itemImage}>

                    <LinearGradient start = {{x:0, y:0.5}} end = {{x:1, y:0.5}} colors = {['#46DB32','#18B56C']} style={styles.itemLiveView}>
                        <Image source = {require('./ImageSource/live_status.gif')} style = {{marginRight: 4, width:10, height: 10}}></Image>
                        <Text style = {{color: "#FFFFFF", fontSize: 11}}>正在直播</Text>
                    </LinearGradient>

                    <LinearGradient style={styles.itemCoverView} colors = {['rgba(0,0,0,0)','rgba(0,0,0,0.3)']}>
                        <Image source = {require('./ImageSource/live_icon_audience.png')} style = {{marginRight: 4}}></Image>
                        <Text style = {{color: "#FFFFFF", marginRight: 15, fontSize: 12}}>4382</Text>
                    </LinearGradient>

                </ImageBackground>
                <Text style={styles.itemTitleLabel}>浙一医院主任医师: 听王医生讲悄悄话</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#F4F4F4',
  },

  sectionHeader:{
    height: 10,
    backgroundColor: '#F4F4F4',
  },

  item:{
      height: 195,
      backgroundColor: '#FFFFFF',
  },

  itemImage:{
    flex: 1,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0, 
    marginBottom: 12.5,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  itemTitleLabel:{
      height: 22.5,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15,
      fontSize: 16,
      color: '#353B38',
  },

  itemCoverView:{
    height: 35,
    width: ScreenWidth,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  itemLiveView:{
    position:'absolute', 
    left:16, 
    top:12, 
    width: 70, 
    height: 18, 
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',
    borderRadius: 3,
  },
})