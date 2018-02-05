
import { fromJS } from 'immutable';
import shortAnswerReducer from '../reducer';

describe('shortAnswerReducer', () => {
  it('returns the initial state', () => {
    expect(shortAnswerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
