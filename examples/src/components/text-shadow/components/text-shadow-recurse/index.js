/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import type {CssShadow} from 'components/text-shadow/types';
import type {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type {ViewLayoutEvent} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {Layout} from 'react-native/Libraries/Types/CoreEventTypes';

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

const TextChildShadow = (props) => {
  const {containerStyle, textStyle, title, bindingLayoutText} = props;
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
  const size = listStyleTextShadow.length;
  const getMaxBlurRadius = listStyleTextShadow.reduce(
    (prev: CssShadow, next: CssShadow) =>
      prev.blurRadius > next.blurRadius ? prev : next,
  );
  const maxTextShadowRadius =
    getMaxBlurRadius.textShadowRadius === 1
      ? 0
      : getMaxBlurRadius.textShadowRadius;
  if (size === 1) {
    return <Text style={[titleStyle, listStyleTextShadow[0]]}>{title}</Text>;
  }
  const getLayout = (event: ViewLayoutEvent): void => {
    const {
      nativeEvent: {
        layout: {width, height},
      },
    } = event;
    if (width !== 0 && height !== 0) {
      const widthIncludeRadius = Math.ceil(width + maxTextShadowRadius);
      const heightIncludeRadius = Math.ceil(height + maxTextShadowRadius);
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
        <Text style={[titleStyle, {zIndex: size + 1}, listStyleTextShadow[0]]}>
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
        textStyle={[titleStyle, {zIndex: size + 1}, listStyleTextShadow[0]]}
        title={title}
      />

      {listStyleTextShadow.slice(1).map((item: CssShadow, index: number) => {
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
                borderWidth: 1,
                borderColor: 'yellow',
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
