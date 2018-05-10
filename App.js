import React, { Component } from 'react';
import { StyleSheet,
  Text, View,
  PanResponder } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Card #1',
  uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2',
  uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3',
  uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4',
  uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5',
  uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6',
  uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7',
  uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8',
  uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];


export default class App extends Component {
  constructor(props) {
    super(props);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      //this determines if a touch event clicks a component on screen will this
      //panresponder be responsible for response
      onPanResponderMove: (event, gesture) => {
        console.log(gesture);
      },
      //true callback called anytime a component starts to move around screen
      onPanResponderRelease: () => {}
      //called anytime a user presses down then lets go
    });

    this.state = { panResponder };
  }

  renderCard(item) {
    return (
      <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}
      >
        <Text style={{ marginBottom: 10 }}>
          Can I customize the card further.
        </Text>
        <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          title="View Now!"
        />
      </Card>
    );
  }

  render() {
    return (
        <View style={styles.container}>
          <Deck
          data={DATA}
          renderCard={this.renderCard}/>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
