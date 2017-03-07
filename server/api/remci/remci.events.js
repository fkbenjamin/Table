/**
 * Remci model events
 */

'use strict';

import {EventEmitter} from 'events';
var RemciEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RemciEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Remci) {
  for(var e in events) {
    let event = events[e];
    Remci.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    RemciEvents.emit(event + ':' + doc._id, doc);
    RemciEvents.emit(event, doc);
  };
}

export {registerEvents};
export default RemciEvents;
