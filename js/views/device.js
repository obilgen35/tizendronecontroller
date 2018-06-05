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
 * Device view module.
 *
 * @module views/device
 * @requires {@link views/doublePressHomeKey}
 * @requires {@link views/gesture}
 * @requires {@link views/dateAndTime}
 * @requires {@link helpers/list}
 * @requires {@link helpers/page}
 * @namespace views/device
 */
define({
    name: 'views/device',
    requires: [
        'views/doublePressHomeKey',
        'views/gesture',
        'views/dateAndTime',
        'helpers/list',
        'helpers/page'
    ],
    def: function device(req) {
        'use strict';
 
        /**
         * List helper module instance.
         *
         * @memberof views/device
         * @private
         * @type {Module}
         */
        var listHelper = req.helpers.list,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/device
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Double press home key view module.
             *
             * @memberof views/device
             * @private
             * @type {Module}
             */
            doublePressHomeKeyView = req.views.doublePressHomeKey,
 
            /**
             * Gesture view module.
             *
             * @memberof views/device
             * @private
             * @type {Module}
             */
            gestureView = req.views.gesture,
 
            /**
             * Page element.
             *
             * @memberof views/device
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/device
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            page.querySelector('#double-press-home-key-value')
                .innerText = doublePressHomeKeyView.getCurrentValue();
            page.querySelector('#gesture-value')
                .innerText = gestureView.getCurrentValue() ? 'On' : 'Off';
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/device
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/device
         * @public
         */
        function init() {
            page = document.getElementById('device');
            listHelper.marquee(page.querySelector('.ui-listview'));
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});