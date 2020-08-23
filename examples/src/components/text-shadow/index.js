/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {View} from 'react-native';
import type {CssShadow, TextStyleShadow} from './types';
import {getListCssShadow} from './utils';
import type {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {TextShadowRecurse} from 'components/text-shadow/components';

type Props = {
  title?: string,
  textShadow: string,
  titleStyle?: $Diff<
    TextStyle,
    {
      textShadowOffset?: $ReadOnly<{|
        width: number,
        height: number,
      |}>,
      textShadowRadius?: number,
      textShadowColor?: ColorValue,
    },
  >,
};
export const TextShadow = ({
  title = 'Text Shadow',
  textShadow,
  titleStyle = {},
}: Props): React.Node => {
  const convertListCssShadowHaveRadiusIsZero: Array<CssShadow> = getListCssShadow(
    textShadow,
  ).map((item: CssShadow) => {
    if (item.blurRadius === 0 || item.blurRadius === undefined) {
      item.blurRadius = 1; // because 0 is not support by react native
    }
    return item;
  });
  const convertTextStyle: Array<TextStyleShadow> = convertListCssShadowHaveRadiusIsZero.map(
    (item: CssShadow) => {
      return {
        textShadowOffset: {
          width: item.horizontalOffset,
          height: item.verticalOffset,
        },
        textShadowColor: item.color,
        textShadowRadius: item.blurRadius,
      };
    },
  );
  return (
    <View>
      <TextShadowRecurse
        title={title}
        titleStyle={titleStyle}
        listStyleTextShadow={convertTextStyle}
      />
    </View>
  );
};
