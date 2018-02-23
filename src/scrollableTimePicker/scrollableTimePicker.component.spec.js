import { shallow } from 'enzyme';
import React from 'react';
import { createMockMediaMatcher } from '../../setupTests';
import ScrollableTimePicker from './scrollableTimePicker.component';

function createProps() {
  return {
    onChange: jest.fn(),
    getDefaultValue: () => ({ hour: 12, minute: 0 }),
    disabled: false,
    floatingLabelText: 'LabelText',
    defaultValueLabel: 'DefaultLabelText'
  };
}

describe('<ScrollableTimePicker />', () => {
  beforeEach(() => {
    window.matchMedia = createMockMediaMatcher(false);
  });

  it('should render current time value in text field ', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:25+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);

    expect(wrapper.find('TextField').props().value).toBe('9:25 Uhr');
    expect(wrapper.find('Dialog').props().title).toBe(`${props.floatingLabelText} - 9:25 Uhr`);
  });


  it('should add an hour when clicking on top arrow', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:25+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);

    wrapper.find('TextField').simulate('click');
    wrapper.find('#sam-time-picker-add-hour').simulate('click');

    expect(wrapper.find('TextField').props().value).toBe('10:25 Uhr');
    expect(wrapper.find('Dialog').props().title).toBe(`${props.floatingLabelText} - 10:25 Uhr`);
  });

  it('should subtract an hour when clicking on bottom arrow', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:25+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);

    wrapper.find('TextField').simulate('click');
    wrapper.find('#sam-time-picker-subtract-hour').simulate('click');

    expect(wrapper.find('TextField').props().value).toBe('8:25 Uhr');
    expect(wrapper.find('Dialog').props().title).toBe(`${props.floatingLabelText} - 8:25 Uhr`);
  });

  it('should toggle minutes to 30 when clicking on top arrow and minutes are < 30', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:25+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);

    wrapper.find('TextField').simulate('click');
    wrapper.find('#sam-time-picker-subtract-minute').simulate('click');

    expect(wrapper.find('TextField').props().value).toBe('9:30 Uhr');
    expect(wrapper.find('Dialog').props().title).toBe(`${props.floatingLabelText} - 9:30 Uhr`);
  });

  it('should toggle minutes to 0 when clicking on top arrow and minutes are >= 30', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:30+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);

    wrapper.find('TextField').simulate('click');
    wrapper.find('#sam-time-picker-subtract-minute').simulate('click');

    expect(wrapper.find('TextField').props().value).toBe('9:00 Uhr');
    expect(wrapper.find('Dialog').props().title).toBe(`${props.floatingLabelText} - 9:00 Uhr`);
  });

  it('should toggle minutes to 30 when clicking on bottom arrow and minutes are < 30', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:25+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);

    wrapper.find('TextField').simulate('click');
    wrapper.find('#sam-time-picker-subtract-minute').simulate('click');

    expect(wrapper.find('TextField').props().value).toBe('9:30 Uhr');
    expect(wrapper.find('Dialog').props().title).toBe(`${props.floatingLabelText} - 9:30 Uhr`);
  });

  it('should toggle minutes to 0 when clicking on bottom arrow and minutes are >= 30', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:30+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);

    wrapper.find('TextField').simulate('click');
    wrapper.find('#sam-time-picker-subtract-minute').simulate('click');

    expect(wrapper.find('TextField').props().value).toBe('9:00 Uhr');
    expect(wrapper.find('Dialog').props().title).toBe(`${props.floatingLabelText} - 9:00 Uhr`);
  });

  it('should call onChange function when clicking on OK', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:30+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);

    wrapper.find('TextField').simulate('click');
    wrapper.find('Dialog').props().actions[1].props.onClick();

    expect(props.onChange).toBeCalledWith(new Date('2017-06-23T07:30:00.000Z'));
    expect(wrapper.find('TextField').props().value).toBe('9:30 Uhr');
  });

  it('should not call onChange function when clicking on Abbrechen', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:30+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);

    wrapper.find('TextField').simulate('click');
    wrapper.find('Dialog').props().actions[0].props.onClick();

    expect(props.onChange).not.toHaveBeenCalled();
  });

  it('should reset display value when clicking on Abbrechen', () => {
    const props = createProps();
    const newProps = {
      ...props,
      value: new Date('2017-06-23T09:30+0200')
    };

    const wrapper = shallow(<ScrollableTimePicker {...props} />);
    wrapper.setProps(newProps);
    wrapper.find('TextField').simulate('click');
    wrapper.find('#sam-time-picker-subtract-hour').simulate('click');

    expect(wrapper.find('TextField').props().value).toBe('8:30 Uhr');
    wrapper.find('Dialog').props().actions[0].props.onClick();
    wrapper.update();
    expect(wrapper.find('TextField').props().value).toBe('9:30 Uhr');
  });

  it('should clear display value when clicking on Abbrechen and no value was defined before', () => {
    const props = createProps();


    const wrapper = shallow(<ScrollableTimePicker {...props} />);

    wrapper.find('TextField').simulate('click');
    wrapper.find('#sam-time-picker-subtract-hour').simulate('click');
    expect(wrapper.find('TextField').props().value).toBe('11:00 Uhr');
    wrapper.find('Dialog').props().actions[0].props.onClick();
    wrapper.update();
    expect(wrapper.find('TextField').props().value).toBe('');
  });

  it('should change hour when arrow up / down is pressed', () => {
    const props = createProps();

    const wrapper = shallow(<ScrollableTimePicker {...props} />);

    wrapper.find('TextField').simulate('click');

    const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    window.dispatchEvent(arrowUpEvent);
    window.dispatchEvent(arrowUpEvent);
    wrapper.update();
    expect(wrapper.find('TextField').props().value).toBe('14:00 Uhr');

    const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    window.dispatchEvent(arrowDownEvent);
    wrapper.update();
    expect(wrapper.find('TextField').props().value).toBe('13:00 Uhr');
  });

  it('should change minute when arrow up / down is pressed', () => {
    const props = createProps();

    const wrapper = shallow(<ScrollableTimePicker {...props} />);

    wrapper.find('TextField').simulate('click');

    // change focus to minute input field
    const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    window.dispatchEvent(arrowRightEvent);

    const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    window.dispatchEvent(arrowUpEvent);
    wrapper.update();
    expect(wrapper.find('TextField').props().value).toBe('12:30 Uhr');

    const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    window.dispatchEvent(arrowDownEvent);
    wrapper.update();
    expect(wrapper.find('TextField').props().value).toBe('12:00 Uhr');
  });
});
