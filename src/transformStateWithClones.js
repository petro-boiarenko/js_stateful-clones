'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const addProperties = 'addProperties';
const removeProperties = 'removeProperties';
const clear = 'clear';

function transformStateWithClones(state, actions) {
  const STATES = [];
  let CURRENT_STATE = { ...state };

  for (const action of actions) {
    let NEXT_STATE;

    switch (action.type) {
      case clear:
        NEXT_STATE = {};
        break;

      case addProperties:
        NEXT_STATE = { ...CURRENT_STATE, ...action.extraData };
        break;
      case removeProperties:
        NEXT_STATE = { ...CURRENT_STATE };

        for (const key of action.keysToRemove) {
          delete NEXT_STATE[key];
        }
        break;

      default:
        continue;
    }

    STATES.push(NEXT_STATE);
    CURRENT_STATE = NEXT_STATE;
  }

  return STATES;
}

module.exports = transformStateWithClones;
