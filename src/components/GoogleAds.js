import {Component} from 'react'

class GoogleAds extends Component {

  componentDidMount() {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
      return (
              <ins className="adsbygoogle"
                  style={this.props.style}
                  data-ad-client="ca-pub-9364972557220794"
                  data-ad-slot="8953066911"
              >
              </ins>
      );
  }
}

export default GoogleAds;