import { mount } from 'enzyme';
import React from 'react';
import ScrollableDigit from './scrollableDigit.component';

jest.useFakeTimers();

function createProps() {
  return {
    type: 'minute',
    singleDigitStyle: {
      height: 100
    },
    value: 0,
    valueList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    containerStyle: {
      fontSize: '55px',
      width: '60px',
      padding: '8px 0 0 5px',
      textAlign: 'center',
      border: '1px solid black',
      overflow: 'hidden'
    },
    setValue: jest.fn()
  };
}

describe('<ScrollableDigit>', () => {
  it('should open a dialog and display correct hour digit', () => {

    const props = createProps();
    const newProps = {
      ...props,
      value: 9
    };


    const wrapper = mount(<ScrollableDigit {...createProps()} />);
    const scrollableDiv = wrapper.find('ScrollableDigit').childAt(0).childAt(0);

    wrapper.setProps(newProps);

    expect(scrollableDiv.getDOMNode().scrollTop).toBe(newProps.value * props.singleDigitStyle.height);
  });

  it('should change hour digit on scrolling (round up)', () => {

    const props = createProps();

    const wrapper = mount(<ScrollableDigit {...props} />);
    const scrollableDiv = wrapper.find('ScrollableDigit').childAt(0).childAt(0);
    scrollableDiv.getDOMNode().scrollTop = 150;
    scrollableDiv.simulate('scroll');

    jest.runAllTimers();

    expect(scrollableDiv.getDOMNode().scrollTop).toBe(200);
    expect(props.setValue).toHaveBeenCalledWith(2);
  });

  it('should change hour digit on scrolling (round down)', () => {

    const props = createProps();

    const wrapper = mount(<ScrollableDigit {...props} />);
    const scrollableDiv = wrapper.find('ScrollableDigit').childAt(0).childAt(0);
    scrollableDiv.getDOMNode().scrollTop = 149;
    scrollableDiv.simulate('scroll');

    jest.runAllTimers();

    expect(scrollableDiv.getDOMNode().scrollTop).toBe(100);
    expect(props.setValue).toHaveBeenCalledWith(1);
  });

});
