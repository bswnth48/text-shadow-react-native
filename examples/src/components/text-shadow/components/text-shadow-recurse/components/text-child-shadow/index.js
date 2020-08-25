/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import type {ViewLayoutEvent} from 'react-native/Libraries/Components/View/ViewPropTypes';
import {View, Text} from 'react-native';
import * as React from 'react';
import type {
  TextStyle,
  ViewStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  containerStyle?: Array<?ViewStyle> | ?ViewStyle,
  textStyle?: Array<?TextStyle> | ?TextStyle,
  title?: string,
  bindingLayoutText?: Function,
};

export const TextChildShadow = ({
  containerStyle = {},
  textStyle = {},
  title = '',
  bindingLayoutText,
}: Props): React.Node => {
  const getLayoutText = (event: ViewLayoutEvent): void => {
    if (typeof bindingLayoutText === 'function') {
      bindingLayoutText(event.nativeEvent.layout.height);
    }
  };

  return (
    <View style={containerStyle}>
      <Text onLayout={getLayoutText} style={textStyle}>
        {title}
      </Text>
    </View>
  );
};
