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
 * NFC view module.
 *
 * @module views/nfc
 * @requires {@link views/tapAndPay}
 * @requires {@link helpers/page}
 * @namespace views/nfc
 */
define({
    name: 'views/nfc',
    requires: [
        'views/tapAndPay',
        'helpers/page'
    ],
    def: function nfcDefine(req) {
        'use strict';
 
        /**
         * Page helper module instance.
         *
         * @memberof views/nfc
         * @private
         * @type {Module}
         */
        var pageHelper = req.helpers.page,
 
            /**
             * Page element.
             *
             * @memberof views/nfc
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * NFC toggle element.
             *
             * @memberof views/nfc
             * @private
             * @type {HTMLElement}
             */
            nfcToggleElement = null,
 
            /**
             * Tap and pay element.
             *
             * @memberof views/nfc
             * @private
             * @type {HTMLElement}
             */
            nfcTapAndPay = null,
 
            /**
             * Current nfc state.
             *
             * @memberof views/nfc
             * @private
             * @type {boolean}
             */
            currentValue = true;
 
        /**
         * Returns current value of nfc state.
         *
         * @memberof views/nfc
         * @public
         * @returns {boolean}
         */
        function getCurrentValue() {
            return currentValue;
        }
 
        /**
         * Sets status of the tap and pay element.
         *
         * @memberof views/nfc
         * @private
         */
        function setTapAndPayStatus() {
            if (currentValue) {
                nfcTapAndPay.classList.remove('disabled');
            } else {
                nfcTapAndPay.classList.add('disabled');
            }
        }
 
        /**
         * Handles "change" event.
         *
         * @memberof views/nfc
         * @private
         * @param {Event} ev
         */
        function onNfcToggleElementChanged(ev) {
            currentValue = ev.target.checked;
            setTapAndPayStatus();
        }
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/nfc
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            nfcToggleElement.checked = currentValue;
            setTapAndPayStatus();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/nfc
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            nfcToggleElement.addEventListener('change',
                onNfcToggleElementChanged);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/nfc
         * @public
         */
        function init() {
            page = document.getElementById('nfc');
            nfcToggleElement = page.querySelector('#nfc-toggle');
            nfcTapAndPay = page.querySelector('#nfc-tap-and-pay');
            bindEvents();
        }
 
        return {
            init: init,
            getCurrentValue: getCurrentValue
        };
    }
});