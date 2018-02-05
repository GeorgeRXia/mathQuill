import { createSelector } from 'reselect';

/**
 * Direct selector to the shortAnswer state domain
 */
const selectShortAnswerDomain = (state) => state.get('shortAnswer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ShortAnswer
 */

const makeSelectShortAnswer = () => createSelector(
  selectShortAnswerDomain,
  (substate) => substate.toJS()
);

export default makeSelectShortAnswer;
export {
  selectShortAnswerDomain,
};
