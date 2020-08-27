/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
export class TypeColorException extends SyntaxError {
  constructor(type: string | Array<string>) {
    super(`${[].concat(type).join(' or ')} is not valid`);
  }
}
export class CSSShadowException extends SyntaxError {
  constructor() {
    super('String Css Shadow is not valid');
  }
}
export class RedundantColorShadow extends SyntaxError {
  constructor() {
    super('Has too many property color in string');
  }
}
export class NotFoundColorShadow extends SyntaxError {
  constructor() {
    super('Not found color shadow in string');
  }
}
export class HorizontalOffsetRequired extends SyntaxError {
  constructor() {
    super('Horizontal offset is required');
  }
}
export class VerticalOffsetRequired extends SyntaxError {
  constructor() {
    super('Vertical offset is required');
  }
}
export class NotSupportUnitRem extends SyntaxError {
  constructor() {
    super('Not support rem unit. Current only support px or number');
  }
}

export class NotSupportUnitEm extends SyntaxError {
  constructor() {
    super('Not support em unit. Current only support px or number');
  }
}

export class NotSupportUnitPercent extends SyntaxError {
  constructor() {
    super('Not support percent. Current only support px or number');
  }
}
export class UnknownUnit extends SyntaxError {
  constructor() {
    super('Unknown unit you used. Current only support px or number');
  }
}

export class NotFoundWidthHeightOffset extends SyntaxError {
  constructor() {
    super('Not found width height offset please provide them.');
  }
}
