import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import ScrollableDigit from '../scrollableDigit';

const propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  getDefaultValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool,
  errorText: PropTypes.string,
  floatingLabelText: PropTypes.string.isRequired,
  defaultValueLabel: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  shadowColor: PropTypes.string,
  focusedShadowColor: PropTypes.string
};

const defaultProps = {
  required: false,
  value: undefined,
  errorText: '',
  textColor: '#002878',
  shadowColor: '#525260',
  focusedShadowColor: '#1faaa1'
};

const controlElementStyle = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '20px'
};

class ScrollableTimePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      hour: undefined,
      minute: undefined,
      focusField: 'HOUR'
    };
  }

  componentWillMount() {
    window.addEventListener('keydown', this.keyboardEventListener);
    window.addEventListener('resize', this.detectLandscapeMode);

    this.detectLandscapeMode();

    if (this.props.value) {
      const dateValue = new Date(this.props.value);
      this.setState({
        hour: dateValue.getHours(),
        minute: dateValue.getMinutes()
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {

      const dateValue = new Date(nextProps.value);
      this.setState({
        hour: dateValue.getHours(),
        minute: dateValue.getMinutes()
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardEventListener);
    window.removeEventListener('resize', this.detectLandscapeMode);
  }


  setTimeValue = () => {
    const newDateValue = this.props.value ? new Date(this.props.value) : new Date();
    newDateValue.setHours(this.state.hour);
    newDateValue.setMinutes(this.state.minute);

    this.props.onChange(newDateValue);
  };

  doubleDigitalizeMinutes = (minute) => minute < 10 ? `0${minute}` : minute;

  detectLandscapeMode = () => {
    if (window.matchMedia('(max-height: 500px)').matches) {
      this.setState({
        landscape: true
      });
    } else {
      this.setState({
        landscape: false
      });
    }
  };

  keyboardEventListener = (event) => {
    if (this.state.open) {
      if (event.key.match(/.*Right$/) || event.key.match(/.*Left$/)) {
        this.setState({ focusField: this.state.focusField === 'HOUR' ? 'MINUTE' : 'HOUR' });
      }

      if (event.key.match(/.*Up$/)) {
        if (this.state.focusField === 'HOUR') {
          this.addHour();
        } else {
          this.toggleMinutes();
        }
      }

      if (event.key.match(/.*Down$/)) {
        if (this.state.focusField === 'HOUR') {
          this.subtractHour();
        } else {
          this.toggleMinutes();
        }
      }
    }
  };

  handleOpen = () => {
    this.setState({
      open: true,
      hour: this.state.hour ? this.state.hour : this.props.getDefaultValue(this.props.value).hour,
      minute: this.state.minute ? this.state.minute : this.props.getDefaultValue(this.props.value).minute
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  toggleMinutes = () => {
    this.setState({
      minute: this.state.minute >= 30 ? 0 : 30, focusField: 'MINUTE'
    });
  };

  addHour = () => {
    this.setState({ hour: this.state.hour > 22 ? 0 : this.state.hour + 1, focusField: 'HOUR' });
  };

  subtractHour = () => {
    this.setState({ hour: this.state.hour < 1 ? 23 : this.state.hour - 1, focusField: 'HOUR' });
  };

  resetTimeValue = () => {
    const dateValue = new Date(this.props.value);
    this.setState({
      hour: this.props.value ? dateValue.getHours() : undefined,
      minute: this.props.value ? dateValue.getMinutes() : undefined
    });
  };

  getErrorText = (errorText) => (
    <span style={{color: 'red'}}>{errorText}</span>
  );

  render() {
    const actions = [
      <Button
        variant="contained"
        style={{ marginRight: 10 }}
        label="Abbrechen"
        onClick={() => {
          this.handleClose();
          this.resetTimeValue();
        }}
      />,
      <Button
        variant="contained"
        style={{ marginLeft: 10 }}
        label="OK"
        primary
        onClick={() => {
          this.handleClose();
          this.setTimeValue();
        }}
      />
    ];
    const bodyStyle = { display: 'flex', flexDirection: 'column', justifyContent: 'center' };
    const contentStyle = { maxWidth: '300px' };
    const controlsContainerStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      color: this.props.textColor,
      fontSize: '25px'
    };

    const digitStyle = {
      fontSize: '55px',
      width: '60px',
      height: '55px',
      padding: '8px 0 0 5px',
      textAlign: 'center',
      border: '1px solid black',
      borderRadius: '3px',
      boxShadow: `0px 0px 10px ${this.props.shadowColor}`,
      overflow: 'hidden'
    };

    const singleDigitStyle = {
      height: 55,
      width: 55
    };

    let arrowStyle = {
      margin: '-5px',
      height: '50px',
      width: '50px'
    };

    if (this.state.landscape) {
      bodyStyle.flexDirection = 'row';
      bodyStyle.justifyContent = 'space-around';
      bodyStyle.alignItems = 'center';
      bodyStyle.padding = 24;
      bodyStyle.minHeight = 60;
      contentStyle.maxWidth = 500;
      singleDigitStyle.height = 20;
      digitStyle.fontSize = 20;
      digitStyle.height = 20;
      digitStyle.width = 55;
      digitStyle.padding = '4px 3px 0';
      controlsContainerStyle.fontSize = 20;
      controlsContainerStyle.width = 175;
      arrowStyle = {};
    }

    const digitStyleWithFocus = {
      ...digitStyle,
      boxShadow: `0px 0px 10px ${this.props.focusedShadowColor}`
    };

    return (
      <div>
        <TextField
          fullWidth
          onFocus={e => e.target.blur()}
          disabled={this.props.disabled}
          label={`${this.props.floatingLabelText}${this.props.required ? '*' : ''}`}
          value={isNaN(this.state.minute) || isNaN(this.state.hour) ? '' : `${this.state.hour}:${this.doubleDigitalizeMinutes(this.state.minute)} Uhr`}
          onClick={this.handleOpen}
          helperText={this.props.errorText ? this.getErrorText(this.props.errorText) : ''}
        />
        <Dialog
          open={this.state.open}
          onClose={() => {
            this.handleClose();
            this.resetTimeValue();
          }}
          classes={{paper: { shape: { borderRadius: 0}}}}
          PaperProps={{square: true}}
        >
          <DialogTitle>
            <div style={{ color: this.props.textColor }} id="title" >
              {`${this.props.floatingLabelText} - ${this.state.hour}:${this.doubleDigitalizeMinutes(this.state.minute)} Uhr`}
            </div>
          </DialogTitle>
          <DialogContent >
          <div
            className="time-picker-controls-container"
            id="time-picker-controls-container"
            style={controlsContainerStyle}
          >
            <div
              className="hour-navigation-container"
              id="hour-navigation-container"
              style={controlElementStyle}
            >
              <ExpandLess
                style={arrowStyle}
                id="sam-time-picker-add-hour"
                onClick={this.addHour}
              />
              <ScrollableDigit
                containerStyle={this.state.focusField === 'HOUR' ? digitStyleWithFocus : digitStyle}
                singleDigitStyle={singleDigitStyle}
                type="hour"
                valueList={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
                value={this.state.hour}
                setValue={(hour) => {
                  this.setState({ hour });
                }}
              />

              <ExpandMore
                style={arrowStyle}
                id="sam-time-picker-subtract-hour"
                onClick={this.subtractHour}
              />
            </div>
            {':'}
            <div className="minute-navigation-container" id="minute-navigation-container" style={controlElementStyle}>
              <ExpandLess style={arrowStyle} id="sam-time-picker-add-minute" onClick={this.toggleMinutes}/>
              <ScrollableDigit
                containerStyle={this.state.focusField === 'MINUTE' ? digitStyleWithFocus : digitStyle}
                singleDigitStyle={singleDigitStyle}
                type="minute"
                valueList={[0, 30]}
                value={this.state.minute}
                setValue={(minute) => {
                  this.setState({ minute });
                }}
              />
              <ExpandMore
                style={arrowStyle}
                id="sam-time-picker-subtract-minute"
                onClick={this.toggleMinutes}
              />
            </div>
            {'Uhr'}
          </div>
          <Button
            variant="raised"
            color="secondary"
            onClick={() => {
              const businessHour = this.props.getDefaultValue(this.props.value);
              this.setState({
                hour: businessHour.hour,
                minute: businessHour.minute
              });
            }}
          >
            Auf {this.props.defaultValueLabel} setzen
          </Button>
        </DialogContent>
        <DialogActions style={{ padding: '8px 0 15px 0', textAlign: 'center', justifyContent: 'center' }}>
            <Button
              id="cancelButton"
              variant="raised"
              style={{ marginRight: 10 }}
              label="Abbrechen"
              onClick={() => {
                this.handleClose();
                this.resetTimeValue();
              }}
            >
              Abbrechen
            </Button>
            <Button
              id="okButton"
              variant="raised"
              style={{ marginLeft: 10 }}
              color="primary"
              onClick={() => {
                this.handleClose();
                this.setTimeValue();
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ScrollableTimePicker.propTypes = propTypes;
ScrollableTimePicker.defaultProps = defaultProps;

export default ScrollableTimePicker;
