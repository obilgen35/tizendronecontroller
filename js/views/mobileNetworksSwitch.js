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
 
/*global define, document, tau */
 
/**
 * Mobile networks switch view module.
 *
 * @module views/mobileNetworksSwitch
 * @requires {@link views/callForwarding}
 * @requires {@link helpers/dom}
 * @requires {@link helpers/popup}
 * @requires {@link helpers/page}
 * @namespace views/mobileNetworksSwitch
 */
define({
    name: 'views/mobileNetworksSwitch',
    requires: [
        'views/callForwarding',
        'helpers/dom',
        'helpers/popup',
        'helpers/page'
    ],
    def: function mobileNetworksSwitch(req) {
        'use strict';
 
        /**
         * DOM helper module.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         * @type {Module}
         */
        var domHelper = req.helpers.dom,
 
            /**
             * Popup helper module instance.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {Module}
             */
            popupHelper = req.helpers.popup,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Call forwarding view module instance.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {Module}
             */
            callForwardingView = req.views.callForwarding,
 
            /**
             * Current value.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {string}
             */
            currentValue = 'Auto on/off',
 
            /**
             * Clicked item.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            clickedItem = null,
 
            /**
             * Page element.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Mobile networks switch auto on off element.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAutoOnOff = null,
 
            /**
             * Mobile networks switch auto on off popup.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAutoOnOffPopup = null,
 
            /**
             * Mobile networks switch auto on off fwd popup.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAutoOnOffFwdPopup = null,
 
            /**
             * Mobile networks switch auto on off popup ok button.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAutoOnOffPopupOkBtn = null,
 
            /**
             * Mobile networks switch auto on off fwd popup ok button.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAutoOnOffFwdPopupOkBtn = null,
 
            /**
             * Mobile networks switch auto on off input element.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAutoOnOffInput = null,
 
            /**
             * Mobile networks switch always on element.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOn = null,
 
            /**
             * Mobile networks switch always on popup.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOnPopup = null,
 
            /**
             * Mobile networks switch always on popup ok button.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOnPopupOkBtn = null,
 
            /**
             * Mobile networks switch always on input element.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOnInput = null,
 
            /**
             * Mobile networks switch always off element.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOff = null,
 
            /**
             * Mobile networks switch always off popup.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOffPopup = null,
 
            /**
             * Mobile networks switch always off fwd popup.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOffFwdPopup = null,
 
            /**
             * Mobile networks switch always off popup ok button.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOffPopupOkBtn = null,
 
            /**
             * Mobile networks switch always off fwd popup ok button.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOffFwdPopupOkBtn = null,
 
            /**
             * Mobile networks switch always off input element.
             *
             * @memberof views/mobileNetworksSwitch
             * @private
             * @type {HTMLElement}
             */
            mobileNetworksSwitchAlwaysOffInput = null;
 
        /**
         * Handles click on the list.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         * @param {Event} ev
         */
        function onListClick(ev) {
            var item = domHelper.closest(ev.target, 'li');
 
            if (!item) {
                clickedItem = null;
                return;
            }
 
            clickedItem = item.querySelector('input');
        }
 
        /**
         * Returns current value.
         *
         * @memberof views/mobileNetworksSwitch
         * @public
         * @returns {string}
         */
        function getCurrentValue() {
            return currentValue;
        }
 
        /**
         * Sets current value.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         */
        function setCurrentValue() {
            if (clickedItem) {
                currentValue = clickedItem.getAttribute('value');
            }
        }
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            page.querySelector('[value="' + currentValue + '"]').checked = true;
        }
 
        /**
         * Handles click event on mobile networks switch auto on off element.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         */
        function onMobileNetworksSwitchAutoOnOffClick() {
            if (!mobileNetworksSwitchAutoOnOffInput.checked) {
                if (callForwardingView.isFwdToGearOn()) {
                    tau.openPopup(mobileNetworksSwitchAutoOnOffFwdPopup);
                } else {
                    tau.openPopup(mobileNetworksSwitchAutoOnOffPopup);
                }
            }
        }
 
        /**
         * Handles click event on mobile networks switch auto on off popup
         * ok button.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         */
        function onMobileNetworksSwitchAutoOnOffPopupOkBtnClick() {
            setCurrentValue();
            mobileNetworksSwitchAutoOnOffInput.click();
            tau.closePopup();
        }
 
        /**
         * Handles click event on mobile networks switch always on element.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         */
        function onMobileNetworksSwitchAlwaysOnClick() {
            if (!mobileNetworksSwitchAlwaysOnInput.checked) {
                tau.openPopup(mobileNetworksSwitchAlwaysOnPopup);
            }
        }
 
        /**
         * Handles click event on mobile networks switch always on popup
         * ok button.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         */
        function onMobileNetworksSwitchAlwaysOnPopupOkBtnClick() {
            setCurrentValue();
            mobileNetworksSwitchAlwaysOnInput.click();
            tau.closePopup();
        }
 
        /**
         * Handles click event on mobile networks switch always off element.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         */
        function onMobileNetworksSwitchAlwaysOffClick() {
            if (!mobileNetworksSwitchAlwaysOffInput.checked) {
                if (callForwardingView.isFwdToGearOn()) {
                    tau.openPopup(mobileNetworksSwitchAlwaysOffFwdPopup);
                } else {
                    tau.openPopup(mobileNetworksSwitchAlwaysOffPopup);
                }
            }
        }
 
        /**
         * Handles click event on mobile networks switch always off popup
         * ok button.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         */
        function onMobileNetworksSwitchAlwaysOffPopupOkBtnClick() {
            setCurrentValue();
            mobileNetworksSwitchAlwaysOffInput.click();
            tau.closePopup();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/mobileNetworksSwitch
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            page.querySelector('ul').addEventListener('click', onListClick);
            mobileNetworksSwitchAutoOnOff.addEventListener(
                'click',
                onMobileNetworksSwitchAutoOnOffClick
            );
            mobileNetworksSwitchAutoOnOffPopupOkBtn.addEventListener(
                'click',
                onMobileNetworksSwitchAutoOnOffPopupOkBtnClick
            );
            mobileNetworksSwitchAutoOnOffFwdPopupOkBtn.addEventListener(
                'click',
                onMobileNetworksSwitchAutoOnOffPopupOkBtnClick
            );
            mobileNetworksSwitchAlwaysOn.addEventListener(
                'click',
                onMobileNetworksSwitchAlwaysOnClick
            );
            mobileNetworksSwitchAlwaysOnPopupOkBtn.addEventListener(
                'click',
                onMobileNetworksSwitchAlwaysOnPopupOkBtnClick
            );
            mobileNetworksSwitchAlwaysOff.addEventListener(
                'click',
                onMobileNetworksSwitchAlwaysOffClick
            );
            mobileNetworksSwitchAlwaysOffPopupOkBtn.addEventListener(
                'click',
                onMobileNetworksSwitchAlwaysOffPopupOkBtnClick
            );
            mobileNetworksSwitchAlwaysOffFwdPopupOkBtn.addEventListener(
                'click',
                onMobileNetworksSwitchAlwaysOffPopupOkBtnClick
            );
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/mobileNetworksSwitch
         * @public
         */
        function init() {
            page = document.getElementById('mobile-networks-switch');
            mobileNetworksSwitchAutoOnOff = document.getElementById(
                'mobile-networks-switch-auto-on-off'
            );
            mobileNetworksSwitchAutoOnOffPopup = document.getElementById(
                'mobile-networks-switch-auto-on-off-popup'
            );
            mobileNetworksSwitchAutoOnOffFwdPopup = document.getElementById(
                'mobile-networks-switch-auto-on-off-fwd-popup'
            );
            mobileNetworksSwitchAutoOnOffPopupOkBtn = document.getElementById(
                'mobile-networks-switch-auto-on-off-popup-ok-btn'
            );
            mobileNetworksSwitchAutoOnOffFwdPopupOkBtn =
                document.getElementById(
                    'mobile-networks-switch-auto-on-off-fwd-popup-ok-btn'
            );
            mobileNetworksSwitchAutoOnOffInput = document.getElementById(
                'mobile-networks-switch-auto-on-off-input'
            );
            mobileNetworksSwitchAlwaysOn = document.getElementById(
                'mobile-networks-switch-always-on'
            );
            mobileNetworksSwitchAlwaysOnPopup = document.getElementById(
                'mobile-networks-switch-always-on-popup'
            );
            mobileNetworksSwitchAlwaysOnPopupOkBtn = document.getElementById(
                'mobile-networks-switch-always-on-popup-ok-btn'
            );
            mobileNetworksSwitchAlwaysOnInput = document.getElementById(
                'mobile-networks-switch-always-on-input'
            );
            mobileNetworksSwitchAlwaysOff = document.getElementById(
                'mobile-networks-switch-always-off'
            );
            mobileNetworksSwitchAlwaysOffPopup = document.getElementById(
                'mobile-networks-switch-always-off-popup'
            );
            mobileNetworksSwitchAlwaysOffFwdPopup = document.getElementById(
                'mobile-networks-switch-always-off-fwd-popup'
            );
            mobileNetworksSwitchAlwaysOffPopupOkBtn = document.getElementById(
                'mobile-networks-switch-always-off-popup-ok-btn'
            );
            mobileNetworksSwitchAlwaysOffFwdPopupOkBtn =
                document.getElementById(
                    'mobile-networks-switch-always-off-fwd-popup-ok-btn'
            );
            mobileNetworksSwitchAlwaysOffInput = document.getElementById(
                'mobile-networks-switch-always-off-input'
            );
 
            bindEvents();
 
            popupHelper.resetScrollBeforeOpen(
                mobileNetworksSwitchAutoOnOffPopup
            );
            popupHelper.resetScrollBeforeOpen(
                mobileNetworksSwitchAutoOnOffFwdPopup
            );
            popupHelper.resetScrollBeforeOpen(
                mobileNetworksSwitchAlwaysOnPopup
            );
            popupHelper.resetScrollBeforeOpen(
                mobileNetworksSwitchAlwaysOffPopup
            );
            popupHelper.resetScrollBeforeOpen(
                mobileNetworksSwitchAlwaysOffFwdPopup
            );
        }
 
        return {
            init: init,
            getCurrentValue: getCurrentValue
        };
    }
});