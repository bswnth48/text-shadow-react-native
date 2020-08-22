/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type CssShadow = {
  horizontalOffset: number,
  verticalOffset: number,
  blurRadius?: number,
  spreadRadius?: number,
  color: ColorValue,
  inset?: boolean,
};
