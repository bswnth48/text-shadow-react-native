/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import type {CssShadow, TextStyleShadow} from 'components/text-shadow/types';
import type {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type {ViewLayoutEvent} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {Layout} from 'react-native/Libraries/Types/CoreEventTypes';
import {TextChildShadow} from './components';
import {findCssShadowMax} from 'components/text-shadow/utils';
type Props = {
  title: string,
  listStyleTextShadow: TextStyleShadow | Array<TextStyleShadow>,
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
  const [layoutExpect, setLayoutExpect] = React.useState<
    $Diff<Layout, {x: number, y: number}>,
  >({width: 0, height: 0});
  const [paddingVerticalText, setPaddingVerticalText] = React.useState<number>(
    0,
  );
  const convertListStyleTextShadowToArray = [].concat(listStyleTextShadow);
  const size = convertListStyleTextShadowToArray.length;
  const getMaxCssShadow = findCssShadowMax(
    [].concat(convertListStyleTextShadowToArray),
  );
  if (size === 1) {
    return (
      <Text style={[titleStyle, convertListStyleTextShadowToArray[0]]}>
        {title}
      </Text>
    );
  }
  const getLayout = (event: ViewLayoutEvent): void => {
    const {
      nativeEvent: {
        layout: {width, height},
      },
    } = event;
    if (width !== 0 && height !== 0) {
      const widthIncludeRadius = Math.ceil(width + getMaxCssShadow * 2);
      const heightIncludeRadius = Math.ceil(height + getMaxCssShadow * 2);
      setLayoutExpect({
        width: widthIncludeRadius,
        height: heightIncludeRadius,
      });
    }
  };
  const getLayoutText = (height: number): void => {
    setPaddingVerticalText(height);
  };
  return (
    <View style={[styles.positionRelative]}>
      <View
        onLayout={getLayout}
        style={[styles.positionAbsolute, {opacity: 0}]}>
        <Text
          style={[
            titleStyle,
            {zIndex: size + 1},
            convertListStyleTextShadowToArray[0],
          ]}>
          {title}
        </Text>
      </View>
      <TextChildShadow
        containerStyle={[
          styles.containerCenter,
          {
            width: layoutExpect.width,
            height: layoutExpect.height,
          },
        ]}
        textStyle={[
          titleStyle,
          {zIndex: size + 1},
          convertListStyleTextShadowToArray[0],
        ]}
        title={title}
      />

      {convertListStyleTextShadowToArray
        .slice(1)
        .map((item: TextStyleShadow, index: number) => {
          return (
            <TextChildShadow
              key={index}
              containerStyle={[
                styles.positionAbsolute,
                {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                },
              ]}
              textStyle={[
                titleStyle,
                {zIndex: size - index},
                item,
                {
                  width: layoutExpect.width,
                  height: layoutExpect.height,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  // borderWidth: 1,
                  // borderColor: 'yellow',
                  lineHeight:
                    Platform.OS === 'android' ? null : paddingVerticalText,
                },
              ]}
              bindingLayoutText={getLayoutText}
              title={title}
            />
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
  },
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
