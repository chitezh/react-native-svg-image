# react-native-svg-image

## Load SVG images from network(It does not work with local svg files at the moment)

Simple SVG image renderer with progress loader

Ever had challenges loading SVGs from network using [react-native-svg](https://github.com/react-native-community/react-native-svg) or [react-native-svg-uri](https://github.com/matc4/react-native-svg-uri)?
This simple package is worth a try.

## Installation

```
npm install react-native-svg-image --save

```

## Props

| Prop | Type | Note |
|---|---|---|
| `source` | `ImageSource` | An object containing the svg image `uri`
| `style` | `WebView` style | This extends [WebView](https://facebook.github.io/react-native/docs/webview.html) styles
| `<any` | `WebView` props | Any other WebView prop(s)

## <a name="Usage">Usage</a>

```javascript
import SVGImage from 'react-native-svg-image';

const SVGImageComponent = () => (
  <View style={{ flex: 1 }}>
    <SVGImage
      style={{ width: 80, height: 80 }}
      source={{uri:'https://fluent-panda.appspot.com.storage.googleapis.com/dumbbell.svg'}}
    />
  </View>
);
```

## Shots

<img src="https://raw.githubusercontent.com/chitezh/react-native-svg-image/master/shots/react-native-svg.gif" width="280">

## Dev

Lint & test (todo)

```

npm test

```
