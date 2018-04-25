import React, { Component } from 'react';
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
  render(){
      return (
        <View style = {styles.container}>
        <SectionList
          sections = {
              [
                  {data: ['Wang']},
                  {data: ['Jia']},
              ]
          }
          renderItem={({item})=> <ItemView></ItemView>}
          renderSectionFooter = {({section}) => <View style={styles.sectionHeader}></View>}
        >
        </SectionList>
      </View>
      );
  }
}

class ItemView extends Component{
    render(){
        
    }
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
  },

  sectionHeader:{
    height: 10,
    backgroundColor: '#F4F4F4',
  },

  item:{
      padding: 10,
      fontSize: 18,
      height: 195,
      backgroundColor: '#FABE3B',
  },
})