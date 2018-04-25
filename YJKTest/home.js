import React, { Component } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import LiveList from './liveList'

export default class HomePage extends Component{
    render(){
        return (
            <NavigatorIOS initialRoute={{
                component: MyScene,
                 title: "首页"
              }}
              style = {{flex: 1}}
              >
            </NavigatorIOS>
        );
    }
}

class MyScene extends Component{
    onForward(){
        this.props.navigator.push({
           component: LiveList,
           title: '直播列表',
        })
    }

    render(){
        return(
          <View style = {{flex:1, alignItems:'center' , justifyContent: 'center', flexDirection: 'column'}}>
            <TouchableHighlight onPress={this.onForward.bind(this)}>
              <Text>点击进入直播列表</Text>
            </TouchableHighlight>
          </View>
        )
      }
}