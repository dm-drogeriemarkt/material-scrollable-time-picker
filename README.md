# Material-Ui Scrollable Time Picker

[![dmTECH](https://opensourcelogos.aws.dmtech.cloud/dmTECH_opensource_logo%401x.png)](https://dmtech.de)

This is a time picker component where hours and minutes can be selected via scrolling.
It uses Material-UI and is perfectly embeddable in the Material-UI landscape.

![Material-Ui Scrollable Time Picker Screenshot](screenshot.png)

## Using the Component

```
<ScrollableTimePicker
  id="MyScrollableTimePicker"
  floatingLabelText="gewählte Zeit"
  required
  getDefaultValue={(date) => getDefaultValue(date)}
  defaultValueLabel="Standart"
  disabled={false}
  onChange={() => doSomeThingOnChange()}
  value={value}
  errorText="Your Error Text"
  textFieldStyle={textFieldStyle}
  textColor={textColor}
  shadowColor={shadowColor}
  focusedShadowColor={focusedShadowColor}
/>
```
## Building the Component
```
$ npm run build
```
## Testing the Component
```
$ npm run test-watch
```
## License

Copyright (c) 2017-2018 , dmTech GmbH https://www.dmTECH.de

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
