/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import type {CssShadow} from '../types';
import {
  CSSShadowException,
  HorizontalOffsetRequired,
  NotFoundColorShadow,
  NotSupportUnitEm,
  NotSupportUnitPercent,
  NotSupportUnitRem,
  RedundantColorShadow,
  TypeColorException,
  UnknownUnit,
  VerticalOffsetRequired,
} from '../errors';
const colorRegex = require('colors-regex');

export const getColorValid = (color: string): string => {
  if (color.includes('rgba')) {
    const isRgbaValid = colorRegex.rgba.strict.test(color);
    if (isRgbaValid === false) {
      throw new TypeColorException('rgba');
    }
  } else if (color.includes('rgb')) {
    const isRgbValid = colorRegex.rgb.strict.test(color);
    if (isRgbValid === false) {
      throw new TypeColorException('rgb');
    }
  } else if (color.includes('hsla')) {
    const isHslaValid = colorRegex.hsla.strict.test(color);
    if (isHslaValid === false) {
      throw new TypeColorException('hsla');
    }
  } else if (color.includes('hsl')) {
    const isHslValid = colorRegex.hsl.strict.test(color);
    if (isHslValid === false) {
      throw new TypeColorException('hsl');
    }
  } else if (color.includes('#')) {
    const isHexColor = colorRegex.hex.strict.test(color.toLowerCase());
    if (isHexColor === false) {
      throw new TypeColorException('hex');
    }
  }
  return color;
};
export const getCssShadow = (cssShadow: string): CssShadow => {
  const arrCssShadow = cssShadow.split(/ (?![^\(]*\))/);
  const arrCssShadowRemoveElemetWhiteSpace = arrCssShadow.filter(
    (item: string) => item !== '',
  );
  const [
    firstColor,
    ...restColor
  ] = arrCssShadowRemoveElemetWhiteSpace.filter((item: string): boolean =>
    ['rgb', 'rgba', 'hsl', 'hsla', '#'].some((typeColor: string): boolean =>
      item.startsWith(typeColor),
    ),
  );
  if (firstColor === undefined) {
    throw new NotFoundColorShadow();
  } else if (restColor.length > 0) {
    throw new RedundantColorShadow();
  }
  const arrCssShadowRemoveColor = arrCssShadowRemoveElemetWhiteSpace.filter(
    (item: string): boolean =>
      ['rgb', 'rgba', 'hsl', 'hsla', '#'].every(
        (typeColor: string): boolean => item.startsWith(typeColor) === false,
      ),
  );
  const [
    horizontalOffset,
    verticalOffset,
    blurRadius,
    ...rest
  ] = arrCssShadowRemoveColor
    .filter((item: string) => {
      if (item.includes('px')) {
        return !isNaN(parseInt(item.split('px')[0], 0));
      } else if (item.includes('rem')) {
        throw new NotSupportUnitRem();
      } else if (item.includes('em')) {
        throw new NotSupportUnitEm();
      } else if (item.includes('%')) {
        throw new NotSupportUnitPercent();
      } else if (item.match(/[^0-9]/)) {
        throw new UnknownUnit();
      }
      return !isNaN(parseInt(item, 0));
    })
    .map((item: string) => parseInt(item, 0));
  if (horizontalOffset === undefined) {
    throw new HorizontalOffsetRequired();
  } else if (verticalOffset === undefined) {
    throw new VerticalOffsetRequired();
  } else if (rest.length > 0) {
    throw new CSSShadowException();
  }

  return {
    color: getColorValid(firstColor),
    horizontalOffset: parseInt(horizontalOffset, 0),
    verticalOffset: parseInt(verticalOffset, 0),
    blurRadius: parseInt(blurRadius, 0) ?? 1,
  };
};
export const getListCssShadow = (boxShadow: string): Array<CssShadow> => {
  const listBoxShadow = boxShadow.split(/,(?![^\(]*\))/);
  return listBoxShadow.map((item: string) => getCssShadow(item));
};
