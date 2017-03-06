'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('tableApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
