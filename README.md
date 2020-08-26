# TextShadowComponent
Use css text-shadow for react native
Example Android                                             |  Example Ios
:-----------------------------------------------------------|:-----------------------------------------------------:
![](assets/android.gif) [examples/App.js](examples/App.js)  | ![](assets/ios.gif) [examples/App.js](examples/App.js)

# Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Basic Example](#basic-example)
* [Documentation](#documentation)   
* [Note](#note)
* [Inspired by](#inspired-by)
* [Contributing](#contributing)
* [Author](#author)
* [License](#license)
    
## Installation

If using yarn:

```
yarn add text-shadow-component
```

If using npm:

```
npm i text-shadow-component
```

## Usage

```
import { TextShadow } from 'text-shadow-component';
```

## Basic Example

```jsx
import {TextShadow} from 'text-shadow-component';
 <View
  style={{
    backgroundColor: '#232323', 
    width: '100%', 
    heigth: 300, 
    justifyContent: 'center', 
    alignItems: 'center'
  }}
  >
     <TextShadow
      title={'Preview'}
      textShadow={'0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18'}
      titleStyle={{fontSize: 60, color: '#FFFFFF'}}
     />
  </View>
```
## Documentation
### TextShadow Component
| Name          | Description                   | Default       | Type    |
|:-------------:|:-----------------------------:|:-------------:|:-------:|
| title         | String title of text          | Text Shadow   | String  |
| textShadow    | String css text shadow        | None          | String  |
| titleStyle    | Style of text                 | Object Empty  | Object [Text Style](https://reactnative.dev/docs/text-style-props) |

## Note
property `textShadow` still not support unit rem, em, percent. Only support px or none unit.
## Inspired by
[Text-shadow](https://html-css-js.com/css/generator/text-shadow/)
## Contributing
Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Author
Pham Minh Hai Au

## License
[MIT](./LICENSE)
