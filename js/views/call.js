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
 * Call view module.
 *
 * @module views/call
 * @requires {@link helpers/popup}
 * @requires {@link helpers/page}
 * @requires {@link views/callForwarding}
 * @namespace views/call
 */
define({
    name: 'views/call',
    requires: [
        'helpers/popup',
        'helpers/page',
        'views/callForwarding'
    ],
    def: function call(req) {
        'use strict';
 
        /**
         * Popup helper module instance.
         *
         * @memberof views/call
         * @private
         * @type {Module}
         */
        var popupHelper = req.helpers.popup,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/call
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Page element.
             *
             * @memberof views/call
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Voice control element.
             *
             * @memberof views/call
             * @private
             * @type {HTMLElement}
             */
            voiceControl = null,
 
            /**
             * Voice control popup element.
             *
             * @memberof views/call
             * @private
             * @type {HTMLElement}
             */
            voiceControlPopup = null,
 
            /**
             * Voice control popup ok button.
             *
             * @memberof views/call
             * @private
             * @type {HTMLElement}
             */
            voiceControlPopupOkBtn = null,
 
            /**
             * Voice control toggle switch element.
             *
             * @memberof views/call
             * @private
             * @type {HTMLElement}
             */
            voiceControlToggleSwitch = null,
 
            /**
             * Voice control input element.
             *
             * @memberof views/call
             * @private
             * @type {HTMLElement}
             */
            voiceControlInput = null;
 
        /**
         * Handles click event on watch always on element.
         *
         * @memberof views/call
         * @private
         */
        function onVoiceControlClick() {
            if (voiceControlInput.checked) {
                voiceControlToggleSwitch.click();
            } else {
                tau.openPopup(voiceControlPopup);
            }
        }
 
        /**
         * Handles click event on voice control popup ok button.
         *
         * @memberof views/call
         * @private
         */
        function onVoiceControlPopupOkBtnClick() {
            voiceControlToggleSwitch.click();
        }
 
        /**
         * Handles click event on toggle switch element.
         *
         * @memberof views/call
         * @private
         * @param {Event} e
         */
        function onVoiceControlToggleSwitchClick(e) {
            e.stopPropagation();
        }
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/call
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/call
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
 
            voiceControl.addEventListener('click', onVoiceControlClick);
            voiceControlToggleSwitch.addEventListener(
                'click',
                onVoiceControlToggleSwitchClick
            );
            voiceControlPopupOkBtn.addEventListener(
                'click',
                onVoiceControlPopupOkBtnClick
            );
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/call
         * @public
         */
        function init() {
            page = document.getElementById('call');
 
            voiceControl = document.getElementById('voice-control');
            voiceControlPopup = document.getElementById(
                'voice-control-popup'
            );
            voiceControlPopupOkBtn = document.getElementById(
                'voice-control-popup-ok-btn'
            );
            voiceControlToggleSwitch = document.querySelector(
                '#voice-control .ui-toggleswitch'
            );
            voiceControlInput = document.getElementById(
                'voice-control-input'
            );
 
            bindEvents();
 
            popupHelper.resetScrollBeforeOpen(voiceControlPopup);
        }
 
        return {
            init: init
        };
    }
});