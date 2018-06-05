/*
 *      Copyright (c) 2015 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */
 
/*global define, document*/
 
/**
 * Vibration view module.
 *
 * @module views/vibration
 * @requires {@link views/vibrationIntensity}
 * @requires {@link helpers/page}
 * @namespace views/vibration
 */
 
define({
    name: 'views/vibration',
    requires: [
        'views/vibrationIntensity',
        'helpers/page'
    ],
    def: function vibrationDefine(req) {
        'use strict';
 
        /**
         * Page helper module instance.
         *
         * @memberof views/vibration
         * @private
         * @type {Module}
         */
        var pageHelper = req.helpers.page,
 
            /**
             * Vibration intensity view module.
             *
             * @memberof views/vibration
             * @private
             * @type {Module}
             */
            vibrationIntensityView = req.views.vibrationIntensity,
 
            /**
             * Page element.
             *
             * @memberof views/vibration
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/vibration
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            page.querySelector('#vibration-intensity-value')
                .innerText = vibrationIntensityView.getCurrentValue();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/vibration
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/vibration
         * @public
         */
        function init() {
            page = document.getElementById('vibration');
 
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});