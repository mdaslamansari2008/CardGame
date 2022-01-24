import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Cards from './views/cards';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Cards />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  subContainer: {
    flex: 1,
    margin: 3,
  },
  cardContainer: {
    backgroundColor: 'black',
  }
});

export default App;

