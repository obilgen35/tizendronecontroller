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
 
/*global define, document */
 
/**
 * Wi-Fi view module.
 *
 * @module views/wifi
 * @requires {@link views/wifiNetworks}
 * @requires {@link helpers/page}
 * @namespace views/wifi
 */
define({
    name: 'views/wifi',
    requires: [
        'views/wifiNetworks',
        'helpers/page'
    ],
    def: function wifiDefine(req) {
        'use strict';
 
        /**
         * Page helper module instance.
         *
         * @memberof views/wifi
         * @private
         * @type {Module}
         */
        var pageHelper = req.helpers.page,
 
            /**
             * Disabled class.
             *
             * @memberof views/wifi
             * @private
             * @const {string}
             */
            DISABLED_CLASS = 'disabled',
 
            /**
             * Page element.
             *
             * @memberof views/wifi
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Wi-Fi toggle element.
             *
             * @memberof views/wifi
             * @private
             * @type {HTMLElement}
             */
            wifiToggleElement = null,
 
            /**
             * Wi-Fi network option element.
             *
             * @memberof views/wifi
             * @private
             * @type {HTMLElement}
             */
            wifiNetworksOption = null,
 
            /**
             * The flag that indicates whether the wifi is on.
             *
             * @memberof views/wifi
             * @private
             * @type {boolean}
             */
            turnedOn = false;
 
        /**
         * Returns information about the wifi state.
         *
         * @memberof views/wifi
         * @public
         * @returns {boolean}
         */
        function isTurnedOn() {
            return turnedOn;
        }
 
        /**
         * Handles "change" event.
         *
         * @memberof views/wifi
         * @private
         * @param {Event} ev
         */
        function onWifiToggleElementChanged(ev) {
            turnedOn = ev.target.checked;
            if (turnedOn) {
                wifiNetworksOption.classList.remove(DISABLED_CLASS);
            } else {
                wifiNetworksOption.classList.add(DISABLED_CLASS);
            }
        }
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/wifi
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            wifiToggleElement.checked = turnedOn;
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/wifi
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            wifiToggleElement.addEventListener('change',
                onWifiToggleElementChanged);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/wifi
         * @public
         */
        function init() {
            page = document.getElementById('wifi');
            wifiToggleElement = page.querySelector(
                '#wifi-toggle'
            );
            wifiNetworksOption = page.querySelector(
                '#wifi-networks-option'
            );
            bindEvents();
        }
 
        return {
            init: init,
            isTurnedOn: isTurnedOn
        };
    }
});