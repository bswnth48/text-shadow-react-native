/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type CssShadow = {
  horizontalOffset: number,
  verticalOffset: number,
  blurRadius?: number,
  color: ColorValue,
};

export type TextStyleShadow = {
  textShadowOffset?: $ReadOnly<{|
    width: number,
    height: number,
  |}>,
  textShadowRadius?: number,
  textShadowColor?: ColorValue,
};
