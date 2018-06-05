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
 * Gesture view module.
 *
 * @module views/gesture
 * @requires {@link helpers/listt}
 * @requires {@link helpers/popup}
 * @requires {@link helpers/page}
 * @namespace views/gesture
 */
define({
    name: 'views/gesture',
    requires: [
        'helpers/list',
        'helpers/popup',
        'helpers/page'
    ],
    def: function gesture(req) {
        'use strict';
 
        /**
         * List helper module instance.
         *
         * @memberof views/gesture
         * @private
         * @type {Module}
         */
        var listHelper = req.helpers.list,
 
            /**
             * Popup helper module instance.
             *
             * @memberof views/gesture
             * @private
             * @type {Module}
             */
            popupHelper = req.helpers.popup,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/gesture
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Page element.
             *
             * @memberof views/gesture
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Wake up gesture input.
             *
             * @memberof views/gesture
             * @private
             * @type {HTMLElement}
             */
            wakeUpGestureInput = null,
 
            /**
             * Current style value.
             *
             * @memberof views/gesture
             * @private
             * @type {boolean}
             */
            currentValue = false;
 
        /**
         * Returns current value of gesture.
         *
         * @memberof views/gesture
         * @public
         * @returns {string}
         */
        function getCurrentValue() {
            return currentValue;
        }
 
        /**
         * Handles "change" event.
         *
         * @memberof views/gesture
         * @private
         * @param {Event} ev
         */
        function wakeUpGestureInputChange(ev) {
            currentValue = ev.target.checked;
        }
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/gesture
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            wakeUpGestureInput.checked = currentValue;
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/gesture
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            wakeUpGestureInput.addEventListener(
                'change',
                wakeUpGestureInputChange
            );
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/gesture
         * @public
         */
        function init() {
            page = document.getElementById('gesture');
            wakeUpGestureInput = page.querySelector('#wake-up-gesture-input');
 
            bindEvents();
 
            listHelper.marquee(page.querySelector('.ui-listview'));
            popupHelper.resetScrollBeforeOpen(
                page.querySelector('#gesture-help-popup')
            );
        }
 
        return {
            init: init,
            getCurrentValue: getCurrentValue
        };
    }
});