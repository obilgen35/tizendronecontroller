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
 
/*global define, document, tau*/
 
/**
 * Call forwarding view module.
 *
 * @module views/callForwarding
 * @requires {@link helpers/popup}
 * @requires {@link helpers/page}
 * @requires {@link views/callForwardingMore}
 * @namespace views/callForwarding
 */
define({
    name: 'views/callForwarding',
    requires: [
        'helpers/popup',
        'helpers/page',
        'views/callForwardingMore'
    ],
    def: function callForwarding(req) {
        'use strict';
 
 
        /**
         * Popup helper module instance.
         *
         * @memberof views/callForwarding
         * @private
         * @type {Module}
         */
        var popupHelper = req.helpers.popup,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/callForwarding
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Page element.
             *
             * @memberof views/callForwarding
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Call forwarding auto element.
             *
             * @memberof views/callForwarding
             * @private
             * @type {HTMLElement}
             */
            callForwardingAuto = null,
 
            /**
             * Call forwarding auto popup element.
             *
             * @memberof views/callForwarding
             * @private
             * @type {HTMLElement}
             */
            callForwardingAutoPopup = null,
 
            /**
             * Call forwarding auto popup ok button.
             *
             * @memberof views/callForwarding
             * @private
             * @type {HTMLElement}
             */
            callForwardingAutoPopupOkBtn = null,
 
            /**
             * Call forwarding auto toggle switch element.
             *
             * @memberof views/callForwarding
             * @private
             * @type {HTMLElement}
             */
            callForwardingAutoToggleSwitch = null,
 
            /**
             * Call forwarding auto input element.
             *
             * @memberof views/callForwarding
             * @private
             * @type {HTMLElement}
             */
            callForwardingAutoInput = null;
 
        /**
         * Handles click event on call forwarding auto element.
         *
         * @memberof views/callForwarding
         * @private
         */
        function onCallForwardingAutoClick() {
            if (callForwardingAutoInput.checked) {
                callForwardingAutoToggleSwitch.click();
            } else {
                tau.openPopup(callForwardingAutoPopup);
            }
        }
 
        /**
         * Handles click event on call forwarding auto popup ok button.
         *
         * @memberof views/callForwarding
         * @private
         */
        function onCallForwardingAutoPopupOkBtnClick() {
            callForwardingAutoToggleSwitch.click();
        }
 
        /**
         * Handles click event on toggle switch element.
         *
         * @memberof views/callForwarding
         * @private
         */
        function onCallForwardingAutoToggleSwitchClick(e) {
            e.stopPropagation();
        }
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/callForwarding
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Returns true if call forwarding to gear device is enabled,
         * false otherwise.
         *
         * @memberof views/callForwarding
         * @public
         * @returns {boolean}
         */
        function isFwdToGearOn() {
            return callForwardingAutoInput.checked;
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/callForwarding
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            callForwardingAuto.addEventListener(
                'click',
                onCallForwardingAutoClick
            );
            callForwardingAutoToggleSwitch.addEventListener(
                'click',
                onCallForwardingAutoToggleSwitchClick
            );
            callForwardingAutoPopupOkBtn.addEventListener(
                'click',
                onCallForwardingAutoPopupOkBtnClick
            );
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/callForwarding
         * @public
         */
        function init() {
            page = document.getElementById('call-forwarding');
            callForwardingAuto = document.getElementById(
                'call-forwarding-auto'
            );
            callForwardingAutoPopup = document.getElementById(
                'call-forwarding-auto-popup'
            );
            callForwardingAutoPopupOkBtn = document.getElementById(
                'call-forwarding-auto-popup-ok-btn'
            );
            callForwardingAutoToggleSwitch = document.querySelector(
                '#call-forwarding-auto .ui-toggleswitch'
            );
            callForwardingAutoInput = document.getElementById(
                'call-forwarding-auto-input'
            );
 
            bindEvents();
 
            popupHelper.resetScrollBeforeOpen(callForwardingAutoPopup);
        }
 
        return {
            init: init,
            isFwdToGearOn: isFwdToGearOn
        };
    }
});