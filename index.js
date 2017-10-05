import React, { PureComponent } from 'react';
import { View, Platform, WebView, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class SVGImage extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    source: PropTypes.shape({
      uri: PropTypes.string,
    }).isRequired,
    showWebviewLoader: PropTypes.bool,
    height: PropTypes.number,
  };

  static defaultProps = {
    style: {},
    source: { uri: '' },
    showWebviewLoader: Platform.OS === 'android',
    height: null,
  };

  renderLoader = () => (
    <View style={[this.props.style, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
      <ActivityIndicator />
    </View>
  );

  render() {
    const { showWebviewLoader, source: { uri }, style, ...restOfProps } = this.props;
    const { height, width } = StyleSheet.flatten(style || []);

    const html = `
      <!DOCTYPE html>\n
      <html>
        <head>
          <style type="text/css">
            img {
              width: 100%;
              height: 100%;
              margin: 0 auto;
            }
            div {
              width: ${width ? width+'px' : 'auto'};
              height: ${height ? height+'px' : 'auto'};
            }
            body {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div>
            <img src="${uri}" align="middle" />
          </div>
        </body>
      </html>
    `;

    return (
      <WebView
        startInLoadingState={showWebviewLoader}
        renderLoading={showWebviewLoader ? this.renderLoader : null}
        scalesPageToFit={false}
        style={style}
        {...restOfProps}
        source={{ html }}
      />
    );
  }
}
