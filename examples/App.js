/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextShadow} from './src/components/text-shadow';
const App = () => {
  return (
    <>
      <View style={styles.container}>
        <TextShadow boxShadow={'adsdadsada'} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
