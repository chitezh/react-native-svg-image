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

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this.isComponentMounted = true;
  }

  componentDidMount() {
    this.getContent(this.props.source, content =>
     this.isComponentMounted && this.setState({ loading: false, content }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source) {
      const source = nextProps.source || {};
      const oldSource = this.props.source || {};
      if (source.uri !== oldSource.uri) {
        this.getContent(source);
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

  render() {
    const { style } = this.props;

    if (this.state.loading) {
      return (
        <View style={[style, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <WebView source={{ html: this.state.content }} style={style} />
    );
  }
}
