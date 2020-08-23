/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import type {CssShadow} from 'components/text-shadow/types';
import type {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type {ViewLayoutEvent} from 'react-native/Libraries/Components/View/ViewPropTypes';

type Props = {
  title: string,
  listStyleTextShadow: CssShadow | Array<CssShadow>,
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
export const TextShadowRecurse = ({
  title,
  listStyleTextShadow,
  titleStyle = {},
}: Props): React.Node => {
  const [layoutExpect, setLayoutExpect] = React.useState(0);
  const size = listStyleTextShadow.length;
  const getMaxBlurRadius = listStyleTextShadow.reduce(
    (prev: CssShadow, next: CssShadow) =>
      prev.blurRadius > next.blurRadius ? prev : next,
  );
  if (size === 1) {
    return <Text style={listStyleTextShadow[0]}>{title}</Text>;
  }
  const getLayout = (event: ViewLayoutEvent) => {
    const {
      nativeEvent: {
        layout: {width, height},
      },
    } = event;

    if (width !== 0 && height !== 0) {
      const widthIncludeRadius = Math.ceil(
        width + getMaxBlurRadius.textShadowRadius,
      );
      const heightIncludeRadius = Math.ceil(
        height + getMaxBlurRadius.textShadowRadius,
      );
      setLayoutExpect({
        width: widthIncludeRadius,
        height: heightIncludeRadius,
      });
    }
  };
  return (
    <View style={[styles.positionRelative]}>
      <View
        onLayout={getLayout}
        style={[styles.positionAbsolute, {opacity: 0}]}>
        <Text style={[titleStyle, {zIndex: size + 1}, listStyleTextShadow[0]]}>
          {title}
        </Text>
      </View>
      <View>
        <Text
          style={[
            titleStyle,
            {zIndex: size + 1},
            listStyleTextShadow[0],
            {
              width: layoutExpect.width,
              height: layoutExpect.height,
              transform: [
                {
                  translateX: layoutExpect.width / 6,
                },
                {
                  translateY: layoutExpect.height / 4,
                },
              ],
            },
          ]}>
          {title}
        </Text>
      </View>

      {listStyleTextShadow.slice(1).map((item: CssShadow, index: number) => {
        return (
          <View style={[styles.positionAbsolute]} key={index}>
            <Text
              style={[
                titleStyle,
                {zIndex: size - index},
                item,
                {
                  width: layoutExpect.width,
                  height: layoutExpect.height,
                  transform: [
                    {
                      translateX: layoutExpect.width / 6,
                    },
                    {
                      translateY: layoutExpect.height / 4,
                    },
                  ],
                },
              ]}>
              {title}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  positionRelative: {
    position: 'relative',
  },
  positionAbsolute: {
    position: 'absolute',
    borderWidth: 2,
  },
});
