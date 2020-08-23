/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheet';

export type CssShadow = {
  horizontalOffset: number,
  verticalOffset: number,
  blurRadius?: number,
  color: ColorValue,
};

export type TextStyleShadow = $PropertyType<
  TextStyle,
  ['textShadowOffset', 'textShadowRadius', 'textShadowColor'],
>;
