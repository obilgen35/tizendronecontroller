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
 * Connections view module.
 *
 * @module views/connections
 * @requires {@link views/bluetooth}
 * @requires {@link views/mobileNetworks}
 * @requires {@link views/wifi}
 * @requires {@link views/nfc}
 * @requires {@link helpers/page}
 * @namespace views/connections
 */
define({
    name: 'views/connections',
    requires: [
        'views/bluetooth',
        'views/mobileNetworks',
        'views/wifi',
        'views/nfc',
        'helpers/page'
    ],
    def: function connections(req) {
        'use strict';
 
        /**
         * Page helper module instance.
         *
         * @memberof views/connections
         * @private
         * @type {Module}
         */
        var pageHelper = req.helpers.page,
 
            /**
             * Bluetooth view module.
             *
             * @memberof views/connections
             * @private
             * @type {Module}
             */
            bluetoothView = req.views.bluetooth,
 
            /**
             * Wi-fi view module.
             *
             * @memberof views/connections
             * @private
             * @type {Module}
             */
            wifiView = req.views.wifi,
 
            /**
             * NFC view module.
             *
             * @memberof views/connections
             * @private
             * @type {Module}
             */
            nfcView = req.views.nfc,
 
            /**
             * Page element.
             *
             * @memberof views/connections
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/connections
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            page.querySelector('#bluetooth-value')
                .innerText = bluetoothView.getCurrentValue() ? 'On' : 'Off';
            page.querySelector('#wifi-value')
                .innerText = wifiView.isTurnedOn() ? 'On' : 'Off';
            page.querySelector('#nfc-value')
                .innerText = nfcView.getCurrentValue() ? 'On' : 'Off';
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/connections
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/connections
         * @public
         */
        function init() {
            page = document.getElementById('connections');
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});