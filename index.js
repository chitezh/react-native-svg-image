import React, { PropTypes, PureComponent } from 'react';
import { View, Platform, WebView, ActivityIndicator } from 'react-native';

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
    const { showWebviewLoader, source: { uri }, height, ...restOfProps } = this.props;

    const html = `
      <!DOCTYPE html>\n
      <html>
        <head>
          <style type="text/css">
            img {
                max-width: 100%;
                max-height: 100%;
                margin: 0 auto;
            }
            body { margin: 0; }
          </style>
        </head>
        <body>
          <img src="${uri}" height="${height}" align="middle" />
        </body>
      </html>
    `;

    return (
      <WebView
        startInLoadingState={showWebviewLoader}
        renderLoading={showWebviewLoader ? this.renderLoader : null}
        {...restOfProps}
        source={{ html }}
      />
    );
  }
}
