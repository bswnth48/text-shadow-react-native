/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  title?: string,
  boxShadow: string,
};
export const TextShadow = ({
  title = 'Text Shadow',
  boxShadow,
}: Props): React.Node => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
