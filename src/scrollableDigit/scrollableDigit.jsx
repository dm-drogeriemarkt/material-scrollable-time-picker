import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  type: PropTypes.string.isRequired,
  singleDigitStyle: PropTypes.object.isRequired,
  value: PropTypes.number,
  valueList: PropTypes.array.isRequired,
  containerStyle: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired
};

const defaultProps = {
  value: 0
};

class ScrollableDigit extends Component {

  componentDidMount() {
    if (this.scrollableDiv) {
      this.scrollableDiv.scrollTop = this.props.value * this.props.singleDigitStyle.height;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.scrollableDiv && (this.props.value !== nextProps.value)) {
      this.scrollableDiv.scrollTop = nextProps.value * this.props.singleDigitStyle.height;
    }
  }

  doubleDigitalizeMinutes = (minute) => minute < 10 ? `0${minute}` : minute

  handleScrollEvent = (event) => {
    const element = event.target;
    clearTimeout(this.scrollDigitTimeOut);
    this.scrollDigitTimeOut = setTimeout(() => {
      const currentScrollPosition = element.scrollTop;
      const value = Math.round(currentScrollPosition / this.props.singleDigitStyle.height);

      this.props.setValue(this.props.valueList[value]);
      element.scrollTop = value * this.props.singleDigitStyle.height;
    }, 200);

  }

  render() {
    const valueList = [];
    this.props.valueList.forEach((element) => {
      valueList.push(<div key={element} style={this.props.singleDigitStyle}>
        {this.props.type === 'minute' ? this.doubleDigitalizeMinutes(element) : element}
      </div>
      );
    });

    return (
      <div
        style={this.props.containerStyle}
      >
        <div
          ref={(scrollableDiv) => { this.scrollableDiv = scrollableDiv; }}
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '100%',
            width: '100%',
            paddingRight: '17px'
          }}
          onScroll={this.handleScrollEvent}
        >
          {valueList}
        </div>
      </div>
    );
  }
}

ScrollableDigit.propTypes = propTypes;
ScrollableDigit.defaultProps = defaultProps;

export default ScrollableDigit;
