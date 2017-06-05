import React from 'react'
import { Button, TextInput, TouchableHighlight, View, Text,
  ScrollView, Image, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import { fetchData, queryChanged, pageForward, pageBackward, openLabel, closeLabel } from './actions'

let styles

const App = (props) => {
  const {
    container,
    text,
    button,
    buttonText,
    mainContent
  } = styles

  console.log("APP RENDERED")
  props.appData.data.length > 0 && (
    console.log("ABOUT TO RENDER SCROLL"),
    console.log("name: " + props.appData.data[0].artistName)
  )
  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}} >
      <View style={{flex: 0.1, flexDirection: 'row'}}>
        <TextInput style={{flex: 0.8, borderWidth: 1, height: 40}} placeholder="Input query" onChangeText={(query) => props.queryChanged(query)}/>
        <Button style={{flex: 0.2}} title="search" onPress={() => props.fetchData(props.appData.query)}/>
      </View>
      <ScrollView>
      {
        props.appData.isFetching ? <Text>Loading</Text> : null
      }
      {
        props.appData.data.length > 0 ? (
              props.appData.data
              .slice(props.appData.page, props.appData.data.length < (props.appData.page + 1) * 10 ? props.appData.data.length : (props.appData.page + 1) * 10)
              .map((record, i) => {
                console.log("RENDERING RECORD №" + i)
                return <View key={props.appData.page * 10 + i}>
                        <TouchableHighlight onPress={() => props.openLabel(props.appData.page * 10 + i)}>
                          <View style={{flexDirection: 'row'}}>
                            <Image source={{uri: record.artworkUrl100}} style={{width: 100, height: 100}} />
                            <View>
                                <Text> Artist: {record.artistName}</Text>
                                <Text> Track: {record.trackName} </Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                       </View>
              })
        ) : null
      }
      </ScrollView>
      {
        props.appData.data.lentgh > 0 ? (
          <View style={{flexDirection: 'row', height: 50}}>
            <TouchableHighlight title="previous page" color="cornflowerblue" onPress={() => props.pageBackward()}/>
            <TouchableHighlight title="next page" color="darkcyan" onPress={() => props.pageForward()}/>
          </View>
        ) : null
      }
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  text: {
    textAlign: 'center'
  },
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  }
})

function mapStateToProps(state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (query) => dispatch(fetchData(query)),
    queryChanged: (query) => dispatch(queryChanged(query)),
    pageForward: () => dispatch(pageForward()),
    pageBackward: () => dispatch(pageBackward()),
    openLabel: (index) => dispatch(openLabel(index)),
    closeLabel: () => dispatch(closeLabel()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
