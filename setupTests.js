import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const createMockMediaMatcher = (matches) => () => ({
    matches,
    addListener: () => {
    },
    removeListener: () => {
    }
  });