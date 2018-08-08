import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
var Dimensions = require('Dimensions');
var windowSize  = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';

type Props = {};
export default class App extends Component<Props> {
  
  constructor(props){
    super(props);
    this.state={
      imei: ''
    }
    
  }

  componentDidMount(){
    const uniqueId = DeviceInfo.getUniqueID();
    this.setState({
      imei: uniqueId
    });
  }

  displayNotification(){
  const notification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle('My notification title')
      .setBody('My notification body')
      .setData({
        key1: 'value1',
        key2: 'value2',
      });
    notification
      .android.setChannelId('channelId')
      .android.setSmallIcon('ic_launcher');
    firebase.notifications().displayNotification(notification);
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.imeiButton}>Unique ID : {this.state.imei}</Text>
      <TouchableOpacity style={styles.notificationButton} onPress={() => this.displayNotification()}>
            <Text style={{color: '#fff'}}>Send Notification</Text>
          </TouchableOpacity>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: windowSize.height/2
  },
  notificationButton:{
  backgroundColor: '#ff0004',
  padding: 10,
  paddingLeft: 20, 
  paddingRight: 20,
  marginBottom: 30
  },
  imeiButton:{
  backgroundColor: '#ff0004',
  padding: 10,
  paddingLeft: 20, 
  paddingRight: 20,
  marginBottom: 30,
  color: '#fff'
  }
});
