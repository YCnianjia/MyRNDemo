import React, { Component } from 'react';
import {FlatList, SectionList, StyleSheet, Text, View, ImageBackground, Image, RefreshControl, ActivityIndicator} from 'react-native';
import { SortData, YJKSortBody } from "./RequestHelp";
import LinearGradient from 'react-native-linear-gradient'

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class FlatListBasics extends Component {

    constructor(props){
        super(props)

        this.state = {
            list: [],
            isRefreshing: false,
            isEmptyData: true,
            isLoadMore: false,
            isLoadAll:false,
            page: 1,
        }
    }

    componentDidMount(){
        this.requestData()
    }

    async requestData(){
        try{
            var MyBody = JSON.stringify(YJKSortBody({
                appVersion: '4.16.0',
                pageIndex: this.state.page,
                token: 'a0750455858137606627b57e1ea3a2a9',
                userId: 'f0121d64-31cb-4d1d-ab50-6e32fa6ffc73',
                videoLiveStatus: 2
            }))

            console.log(MyBody)

            let response = await fetch('http://restapi-test.ihaozhuo.com:82/video/live/v4120/appList',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json; text/html',
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: MyBody
            });

            let responseJson = await response.json();
            var requestData = []
            if (typeof (responseJson.data) == "object" && responseJson.data.list.length > 0){
                requestData = responseJson.data.list
            }

            if (this.state.page != 1){
                this.state.list = this.state.list.concat(requestData)
            }else{
                this.state.list = requestData
            }

            //不需要加载更多
            if (requestData.length < 10){
                this.state.isLoadMore =  false
                this.state.isLoadAll = true
            }else{
                this.state.isLoadMore =  true
                this.state.isLoadAll = false
            }

            if (this.state.list.length > 0){
                this.state.isEmptyData = false
            }else{
                this.state.isEmptyData = true
            }

            //刷新界面
            this.setState(previousState => {
                return {list: this.state.list,
                        isRefreshing: false,
                        isLoadMore: this.state.isLoadMore,
                        isEmptyData: this.state.isEmptyData};
            })

            console.log(responseJson)
        }catch(error){
            console.error(error);
        }
    }

    _onRefresh(){

        this.setState(previousState => {
            return {isRefreshing: true};
        })

        this.state.page = 1
        // alert(this.state.page)
        this.requestData()
    }

    _loadMore(){
        if (this.state.isRefreshing == false && !this.state.isLoadAll) {
            this.setState(previousState => {
                return {isLoadMore: true};
            })
            // 立即更改属性值 page+1
            this.state.page = this.state.page + 1
            // 网络请求数据
            this.requestData();
          }
    }

  render(){

    var mySections = [];
    for(let i in this.state.list){
        mySections.push({data: [this.state.list[i]]});
    }

    return (

        this.state.isEmptyData ? <Text style = {styles.empty} >当前没有直播，请观看精彩回放哦～</Text> :
        <View style = {styles.container}>
        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }

          sections = {mySections}
          renderItem={({item})=> <ItemView item = {item} style={styles.item}></ItemView>}
          renderSectionFooter = {({section}) => <View style={styles.sectionHeader}></View>}
          onEndReached={this._loadMore.bind(this)}
          onEndReachedThreshold={0}

          ListFooterComponent =  {
            <LoadMoreFooter isLoadAll={!this.state.isLoadMore} />
        }
        >
        </SectionList>
      </View>
    );
  }
}

class ItemView extends Component{
    constructor(props){
        super(props) 
    }

    render(){
        return (
            <View style = {this.props.style}>
                <ImageBackground source={{uri: this.props.item.subscribeImageUrl}} style={styles.itemImage}>

                    <LinearGradient start = {{x:0, y:0.5}} end = {{x:1, y:0.5}} colors = {['#46DB32','#18B56C']} style={styles.itemLiveView}>
                        <Image source = {require('./ImageSource/live_status.gif')} style = {{marginRight: 4, width:10, height: 10}}></Image>
                        <Text style = {{color: "#FFFFFF", fontSize: 11}}>正在直播</Text>
                    </LinearGradient>

                    <LinearGradient style={styles.itemCoverView} colors = {['rgba(0,0,0,0)','rgba(0,0,0,0.3)']}>
                        <Image source = {require('./ImageSource/live_icon_audience.png')} style = {{marginRight: 4}}></Image>
                        <Text style = {{color: "#FFFFFF", marginRight: 15, fontSize: 12}}>{this.props.item.peopleNumber}</Text>
                    </LinearGradient>

                </ImageBackground>
                <Text style={styles.itemTitleLabel}>{this.props.item.videoLiveName}</Text>
            </View>
        )
    }
}

class LoadMoreFooter extends Component{
    constructor(props){
        super(props) 
        this.props.isLoadAll = false
    }
    render(){
        return (
            <View style={styles.footer}>
                  <ActivityIndicator animating={!this.props.isLoadAll} />
                  <Text style={styles.footerTitle}>{this.props.isLoadAll ? '没有更多直播啦，可以先看看其他视频哦～' : '正在加载更多…'}</Text>
              </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#F4F4F4',
      marginTop: 64,
  },

  empty:{
    position:'absolute', 
    left: 0,
    top: (ScreenHeight - 40)/2.0,
    width: ScreenWidth,
    height: 40,
    color: '#ACB0AD',
    textAlign:'center',
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

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 76.5,
  },

  footerTitle: {
    fontSize: 12,
    color: '#707773'
  },

})