/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  getColorValid,
  getCssShadow,
  getListCssShadow,
} from '@components/text-shadow/utils';
import {
  NotFoundColorShadow,
  NotSupportUnitEm,
  NotSupportUnitPercent,
  NotSupportUnitRem,
  RedundantColorShadow,
  RedundantInsetShadow,
  TypeColorException,
  UnknownUnit,
} from 'components/text-shadow/errors';
describe('Test function getColorValid', () => {
  it('Test rgb color', async () => {
    const testCaseOne = getColorValid('rgb(255, 255, 255)');
    expect(testCaseOne).toEqual('rgb(255, 255, 255)');
    expect(() => {
      getColorValid('rgb(255, 255, 255, 0)');
    }).toThrow(new TypeColorException('rgb'));
  });
  it('Test rgba color', async () => {
    const testCaseOne = getColorValid('rgba(255, 255, 255, 0)');
    expect(testCaseOne).toEqual('rgba(255, 255, 255, 0)');
    expect(() => {
      getColorValid('rgba(255, 255, 255, 0, 100)');
    }).toThrow(new TypeColorException('rgba'));
  });
  it('Test hsl color', async () => {
    const testCaseOne = getColorValid('hsl(360, 100%, 100%)');
    expect(testCaseOne).toEqual('hsl(360, 100%, 100%)');
    expect(() => {
      getColorValid('hsl(360, 100%, 100%, 10)');
    }).toThrow(new TypeColorException('hsl'));
  });
  it('Test hsla color', async () => {
    const testCaseOne = getColorValid('hsla(360, 100%, 100%, 1.0)');
    expect(testCaseOne).toEqual('hsla(360, 100%, 100%, 1.0)');
    expect(() => {
      getColorValid('hsla(360, 100%, 100%, -1.0)');
    }).toThrow(new TypeColorException('hsla'));
  });
  it('Test hex color', async () => {
    const testCaseOne = getColorValid('#fff');
    expect(testCaseOne).toEqual('#fff');
    const testCaseTwo = getColorValid('#ffffff');
    expect(testCaseTwo).toEqual('#ffffff');
    const testCaseThree = getColorValid('#CE5937');
    expect(testCaseThree).toEqual('#CE5937');
    expect(() => {
      getColorValid('#fffffff');
    }).toThrow(new TypeColorException('hex'));
  });
});
describe('Test function getCssShadow', () => {
  it('Test css shadow valid', async () => {
    const testCaseOne = getCssShadow('2px 2px 2px #CE5937');
    const expectObjectOne = {
      horizontalOffset: 2,
      verticalOffset: 2,
      blurRadius: 2,
      spreadRadius: 0,
      color: '#CE5937',
      inset: false,
    };
    expect(typeof testCaseOne).toBe('object');
    expect(testCaseOne).toEqual(expect.objectContaining(expectObjectOne));
    const testCaseTwo = getCssShadow('2px 2px #CE5937');
    const expectObjectTwo = {
      horizontalOffset: 2,
      verticalOffset: 2,
      blurRadius: 0,
      spreadRadius: 0,
      color: '#CE5937',
      inset: false,
    };
    expect(typeof testCaseTwo).toBe('object');
    expect(testCaseTwo).toEqual(expect.objectContaining(expectObjectTwo));
  });
  it('Test css shadow should throw new RedundantInsetShadow if have too much inset', async () => {
    expect(() => {
      getCssShadow('2px 2px #CE5937 inset inset');
    }).toThrowError(new RedundantInsetShadow());
  });
  it('Test css shadow should throw new NotFoundColorShadow if not exists color', async () => {
    expect(() => {
      getCssShadow('2px 2px 20 20');
    }).toThrowError(new NotFoundColorShadow());
  });
  it('Test css shadow should throw new RedundantColorShadow if have too must color', async () => {
    expect(() => {
      getCssShadow('2px 2px 20 20 #fff rgb(255,255,255)');
    }).toThrow(new RedundantColorShadow());
  });
  it('Test css shadow throw new NotSupportUnitRem if use rem unit', async () => {
    expect(() => {
      getCssShadow('2px 2rem 20 20 #fff');
    }).toThrow(new NotSupportUnitRem());
  });
  it('Test css shadow throw new NotSupportUnitEm if use em unit', async () => {
    expect(() => {
      getCssShadow('2px 2em 20 20 #fff');
    }).toThrow(new NotSupportUnitEm());
  });
  it('Test css shadow throw new NotSupportUnitPercent if use percent unit', async () => {
    expect(() => {
      getCssShadow('2px 2% 20 20 #fff');
    }).toThrow(new NotSupportUnitPercent());
  });
  it('Test css shadow throw new UnknownUnit if use not valid unit', async () => {
    expect(() => {
      getCssShadow('2px 2sadsas 20 20 #fff');
    }).toThrow(new UnknownUnit());
  });
});
describe('Test function getListCssShadow', () => {
  it('Test multiple shadow', async () => {
    const listTestShadowOne = getListCssShadow(
      '0 1px #808d93, -1px 0 #cdd2d5, -1px 2px #808d93',
    );
    expect(Array.isArray(listTestShadowOne)).toBeTruthy();
    listTestShadowOne.forEach((item) => {
      expect(typeof item).toBe('object');
    });
    expect(listTestShadowOne).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          horizontalOffset: 0,
          verticalOffset: 1,
          blurRadius: 0,
          spreadRadius: 0,
          color: '#808d93',
          inset: false,
        }),
      ]),
    );
    expect(listTestShadowOne).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          horizontalOffset: -1,
          verticalOffset: 0,
          blurRadius: 0,
          spreadRadius: 0,
          color: '#cdd2d5',
          inset: false,
        }),
      ]),
    );
    expect(listTestShadowOne).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          horizontalOffset: -1,
          verticalOffset: 2,
          blurRadius: 0,
          spreadRadius: 0,
          color: '#808d93',
          inset: false,
        }),
      ]),
    );
  });
});
