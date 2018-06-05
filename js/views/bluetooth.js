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
 * Bluetooth view module.
 *
 * @module views/bluetooth
 * @requires {@link views/bluetoothHeadset}
 * @requires {@link helpers/list}
 * @requires {@link helpers/page}
 * @namespace views/bluetooth
 */
define({
    name: 'views/bluetooth',
    requires: [
        'views/bluetoothHeadset',
        'helpers/list',
        'helpers/page'
    ],
    def: function bluetooth(req) {
        'use strict';
 
        /**
         * List helper module instance.
         *
         * @memberof views/bluetooth
         * @private
         * @type {Module}
         */
        var listHelper = req.helpers.list,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/bluetooth
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Disabled class.
             *
             * @memberof views/bluetooth
             * @private
             * @const {string}
             */
            DISABLED_CLASS = 'disabled',
 
            /**
             * Page element.
             *
             * @memberof views/bluetooth
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Bluetooth switch input.
             *
             * @memberof views/bluetooth
             * @private
             * @type {HTMLElement}
             */
            bluetoothSwitchInput = null,
 
            /**
             * Bluetooth headset option.
             *
             * @memberof views/bluetooth
             * @private
             * @type {HTMLElement}
             */
            bluetoothHeadsetOption = null,
 
            /**
             * Current style value.
             *
             * @memberof views/bluetooth
             * @private
             * @type {boolean}
             */
            currentValue = false;
 
        /**
         * Returns current value of gesture.
         *
         * @memberof views/bluetooth
         * @public
         * @returns {string}
         */
        function getCurrentValue() {
            return currentValue;
        }
 
        /**
         * Handles "change" event.
         *
         * @memberof views/bluetooth
         * @private
         * @param {Event} ev
         */
        function bluetoothSwitchChange(ev) {
            currentValue = ev.target.checked;
            if (currentValue) {
                bluetoothHeadsetOption.classList.remove(DISABLED_CLASS);
            } else {
                bluetoothHeadsetOption.classList.add(DISABLED_CLASS);
            }
        }
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/bluetooth
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            bluetoothSwitchInput.checked = currentValue;
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/bluetooth
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            bluetoothSwitchInput.addEventListener(
                'change',
                bluetoothSwitchChange
            );
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/bluetooth
         * @public
         */
        function init() {
            page = document.getElementById('bluetooth');
            bluetoothSwitchInput = page.querySelector(
                '#bluetooth-switch-input'
            );
            bluetoothHeadsetOption = page.querySelector(
                '#bluetooth-headset-option'
            );
 
            listHelper.marquee(page.querySelector('.ui-listview'));
            bindEvents();
        }
 
        return {
            init: init,
            getCurrentValue: getCurrentValue
        };
    }
});