import React, { Component } from 'react';
import { View, Animated,
  StyleSheet, Text,
  PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MIN_TRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      //this determines if a touch event clicks a component on screen will this
      //panresponder be responsible for response
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      //true callback called anytime a component starts to move around screen
      onPanResponderRelease: (event, gesture) => {
        if ( gesture.dx > MIN_TRESHOLD ) {
          this.forceSwipe('right');
        } else if ( gesture.dx < -MIN_TRESHOLD ){
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
      //called anytime a user presses down then lets go
    });

    this.state = { panResponder, position, index: 0 };
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x , y: 0},
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction) );
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;

    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeRight(item);
    this.state.position.setValue({x:0, y: 0});
    this.setState({index: this.state.index + 1});
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards(){
    const firstCard = this.state.index;

    if ( firstCard >= this.props.data.length ) {
      return this.props.renderNoMoreCards();
    }
    
    return this.props.data.map((item, index) => {
      if (index < firstCard) {
        return null;
      } else if (index === firstCard) {
        return (
          <Animated.View
          key={item.id}
          style={this.getCardStyle()}
          {...this.state.panResponder.panHandlers}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}



export default Deck;
