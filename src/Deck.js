import React, { Component } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';

class Deck extends Component {
  renderCards(){
    return this.props.data.map(item => {
      return this.props.renderCard(item);
    });
  }

  render() {
    return (
      <View>
        <Text>This is the deck</Text>
        {this.renderCards()}
      </View>
    );
  }
}



export default Deck;
