'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './remci.events';

var RemciSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(RemciSchema);
export default mongoose.model('Remci', RemciSchema);
