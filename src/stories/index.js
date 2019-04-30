import React from 'react';
import ScrollableTimePicker from "../scrollableTimePicker/scrollableTimePicker.component";
import { storiesOf } from '@storybook/react';
import {MuiThemeProvider} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core";

const muiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
      }
});

const stories = storiesOf('material-scrollable-time-picker', module);

stories.add('TimePicker', () => (
 <MuiThemeProvider muiTheme={muiTheme}>
 <ScrollableTimePicker
    id="ID"
    floatingLabelText="gewählte Zeit"
    required
    getDefaultValue={(date) => ({hour: 9, minute: 30})}
    defaultValueLabel="gewählte Zeit"
    disabled={false}
    onChange={() => ("")}
    value={{hour: 9, minute: 30}}
    textFieldStyle={{}}
    textColor={'#000'}
    shadowColor={'#ddd'}
    focusedShadowColor={'#eee'}
    errorText="bla blub fehler fooo buh!"
    />
</MuiThemeProvider>
));