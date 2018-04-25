/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
  render(){
      return (
          <View style={styles.container}>
           <FlatList
             data={
                 [
                     {key: 'wang'},
                     {key: 'jia'},
                     {key: 'jia'},
                     {key: 'React'},
                     {key: 'Native'},
                 ]
             }
             renderItem = {
                 ({item}) => <Text style = {styles.item}>{item.key}</Text>
             }
           >
           </FlatList>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      paddingTop: 22,
  },

  sectionHeader:{
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
  },

  item:{
      padding: 10,
      fontSize: 18,
      height: 44,
      backgroundColor: '#FABE3B',
  },
})