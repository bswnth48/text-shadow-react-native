/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextShadow} from '@components/text-shadow';
const App = () => {
  return (
    <>
      <View style={styles.container}>
        <TextShadow
          title={'Preview'}
          textShadow={'4px 3px 0 #7A7A7A'}
          titleStyle={{fontSize: 60, color: '#ffffff'}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b8b8b8',
  },
});

export default App;
