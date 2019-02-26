import React from 'react';
import {
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListItem } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import { HTMLView} from 'react-native-htmlview'


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
  this.state = { isLoading: true }
  }



componentDidMount(){
  return fetch('https://talentrecap.com/wp-json/wp/v2/posts')
  .then((r)=>r.json())
  .then((responseJson) => {this.setState({
    isLoading: false,
    dataSource: responseJson
  });
})
}











  render() {
    if(this.state.isLoading){
  return(
    <View style={{flex: 1, padding: 20}}>
      <ActivityIndicator/>
    </View>
  )
}

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/logo.png')
                  : require('../assets/images/logo.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <FlatList style={styles.container,{ paddingTop: 40, paddingSide: 30}}
                  data={this.state.dataSource}
                  renderItem={({item}) => (
              <ListItem
              title={
                <View style={styles.title}>
                <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>{item.title.rendered}</Text>
              </View>
            }
              subtitle={
                <View style={styles.container}>
                <Image
                />
                <Text>{     (item.content.rendered.slice(item.content.rendered.indexOf('src='),item.content.rendered.indexOf('alt'))
              ).substr(4).replace('"','').replace('"','')}</Text>

                <Text style={{ fontFamily: 'Helvetica', textAlign: 'center' }}> {item.date}</Text>
                <Text style={{ fontFamily: 'Helvetica', textAlign: 'center' }}> {item.content.rendered} </Text>
                </View>
              }
              />


            )}
                />
              </ScrollView>
     </View>
    );
  }



  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
