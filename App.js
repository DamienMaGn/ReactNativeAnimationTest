import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: false,
      targetX: 50,
      fadeAnim: new Animated.Value(500),  // Initial value for opacity: 0
    }
}

// The event 'ev' is of type 'GestureResponderEvent'. Documentation for ev.nativeEvent:
// https://facebook.github.io/react-native/docs/gesture-responder-system.html
onTouchEvent(ev) {
    this.setState({view: true})
    let targetX = ev.nativeEvent.locationX
    this.setState({targetX})

    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        duration: 400,              // Make it take a while
      }
    ).start(() => {
      this.setState({ view: false, fadeAnim: new Animated.Value(500)});
    });
}

displayView = () => {
  if (this.state.view) {
    return (
      <Animated.View style={{marginTop: this.state.fadeAnim, marginLeft: this.state.targetX, backgroundColor: 'red', width:25, height:25}}></Animated.View>
    )
  }
}

render() {
  console.log(this.state.view, this.state.fadeAnim)
    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={(ev) => true}
            onResponderGrant={(ev) => this.onTouchEvent(ev)}
        >
        {this.displayView()}
        </View>
    );
}
}

const styles = StyleSheet.create({
container: {
    position: 'relative',
    height: "100%",
    width: "100%",
    backgroundColor: 'orange'
}
});
