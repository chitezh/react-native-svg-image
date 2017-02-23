import React, { PropTypes, Component } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';

export default class SVGImage extends Component {
  static propTypes = {
    style: PropTypes.any,
    source: PropTypes.shape({
      uri: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    style: {},
    source: { uri: '' },
  };

  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.getContent(this.props.source, this.updateContent);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source) {
      const source = nextProps.source || {};
      const oldSource = this.props.source || {};
      if (source.uri !== oldSource.uri) {
        this.getContent(source, this.updateContent);
      }
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  getContent = async (source, onLoaded) => {
    const { uri } = source;
    try {
      const response = await fetch(uri);
      const content = await response.text();
      if (onLoaded) onLoaded(content);
    } catch (e) {
      console.error('error', e);
    }
  }

  updateContent = content =>
    this.isComponentMounted && this.setState({ loading: false, content });

  renderLoader = () => (
    <View style={[this.props.style, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
      <ActivityIndicator />
    </View>
  );

  render() {
    const { style } = this.props;

    if (this.state.loading) {
      return this.renderLoader();
    }

    return (
      <WebView
        source={{ html: this.state.content }}
        style={style}
        startInLoadingState
        renderLoading={this.renderLoader}
      />
    );
  }
}
