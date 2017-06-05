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
      <View style={{flex: 0.08, flexDirection: 'row'}}>
        <TextInput style={{flex: 0.8, borderWidth: 1, height: 40}} placeholder="Input query" onChangeText={(query) => props.queryChanged(query)}/>
        <TouchableHighlight style={{flex: 0.2, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center'}}
        title="search" onPress={() => props.fetchData(props.appData.query)}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>search</Text>
        </TouchableHighlight>
      </View>
      <View style={{flex: .8}}>
      <ScrollView>
      {
        props.appData.isFetching ? <Text style={{fontSize: 40}}>Loading</Text> : null
      }
      {
        props.appData.data.length > 0 ? (
              props.appData.data
              .slice(props.appData.page * 10, props.appData.data.length < (props.appData.page + 1) * 10 ? props.appData.data.length : (props.appData.page + 1) * 10)
              .map((record, i) => {
                console.log("RENDERING RECORD №" + i)
                return <View key={props.appData.page * 10 + i}>
                        <TouchableHighlight onPress={() => props.openLabel(props.appData.page * 10 + i)}>
                          <View style={{flexDirection: 'row', margin: 3}}>
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
      </View>
      <View style={{flex: 0.03}}>
        <Text> Page {props.appData.page}/{props.appData.max_page}</Text>
      </View>
      <View style={{flexDirection: 'row', flex: 0.1}}>
        <TouchableHighlight style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "cornflowerblue"}} onPress={() => props.pageBackward()}><Text>previous page</Text></TouchableHighlight>
        <TouchableHighlight style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "darkcyan"}}  onPress={() => props.pageForward()}><Text>next page</Text></TouchableHighlight>
      </View>
      {
        props.appData.labelOpened ? (
          <View style={{ position: 'absolute', left: '60%', top: 0, width: '40%', height: '100%', backgroundColor: "powderblue"}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{flex: 0.9}}>
                <ScrollView>
                  <Text>{JSON.stringify(props.appData.data[props.appData.labelIndex])}</Text>
                </ScrollView>
              </View>
              <Button style={{flex: 0.1}} title="close" onPress={() => props.closeLabel()}/>
            </View>
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
