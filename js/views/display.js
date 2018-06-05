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
 * Display view module.
 *
 * @module views/display
 * @requires {@link views/brightness}
 * @requires {@link views/font}
 * @requires {@link helpers/list}
 * @requires {@link helpers/popup}
 * @requires {@link helpers/page}
 * @namespace views/display
 */
define({
    name: 'views/display',
    requires: [
        'views/brightness',
        'views/font',
        'helpers/list',
        'helpers/popup',
        'helpers/page'
    ],
    def: function display(req) {
        'use strict';
 
        /**
         * List helper module instance.
         *
         * @memberof views/display
         * @private
         * @type {Module}
         */
        var listHelper = req.helpers.list,
 
            /**
             * Popup helper module instance.
             *
             * @memberof views/display
             * @private
             * @type {Module}
             */
            popupHelper = req.helpers.popup,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/display
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Page element.
             *
             * @memberof views/display
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Watch always on element.
             *
             * @memberof views/display
             * @private
             * @type {HTMLElement}
             */
            watchAlwaysOn = null,
 
            /**
             * Watch always on popup element.
             *
             * @memberof views/display
             * @private
             * @type {HTMLElement}
             */
            watchAlwaysOnPopup = null,
 
            /**
             * Watch always on popup ok button.
             *
             * @memberof views/display
             * @private
             * @type {HTMLElement}
             */
            watchAlwaysOnPopupOkBtn = null,
 
            /**
             * Watch always on toggle switch element.
             *
             * @memberof views/display
             * @private
             * @type {HTMLElement}
             */
            watchAlwaysOnToggleSwitch = null,
 
            /**
             * Watch always on input element.
             *
             * @memberof views/display
             * @private
             * @type {HTMLElement}
             */
            watchAlwaysOnInput = null;
 
        /**
         * Handles click event on watch always on element.
         *
         * @memberof views/display
         * @private
         */
        function onWatchAlwaysOnClick() {
            if (watchAlwaysOnInput.checked) {
                watchAlwaysOnToggleSwitch.click();
            } else {
                tau.openPopup(watchAlwaysOnPopup);
            }
        }
 
        /**
         * Handles click event on watch always on popup ok button.
         *
         * @memberof views/display
         * @private
         */
        function onWatchAlwaysOnPopupOkBtnClick() {
            watchAlwaysOnToggleSwitch.click();
        }
 
        /**
         * Handles click event on toggle switch element.
         *
         * @memberof views/display
         * @private
         * @param {Event} e
         */
        function onWatchAlwaysOnToggleSwitchClick(e) {
            e.stopPropagation();
        }
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/display
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/display
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            watchAlwaysOn.addEventListener('click', onWatchAlwaysOnClick);
            watchAlwaysOnToggleSwitch.addEventListener(
                'click',
                onWatchAlwaysOnToggleSwitchClick
            );
            watchAlwaysOnPopupOkBtn.addEventListener(
                'click',
                onWatchAlwaysOnPopupOkBtnClick
            );
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/display
         * @public
         */
        function init() {
            page = document.getElementById('display');
            watchAlwaysOn = document.getElementById('watch-always-on');
            watchAlwaysOnPopup = document.getElementById(
                'watch-always-on-popup'
            );
            watchAlwaysOnPopupOkBtn = document.getElementById(
                'watch-always-on-popup-ok-btn'
            );
            watchAlwaysOnToggleSwitch = document.querySelector(
                '#watch-always-on .ui-toggleswitch'
            );
            watchAlwaysOnInput = document.getElementById(
                'watch-always-on-input'
            );
 
            bindEvents();
 
            listHelper.marquee(page.querySelector('.ui-listview'));
            popupHelper.resetScrollBeforeOpen(
                page.querySelector('#watch-always-on-popup')
            );
        }
 
        return {
            init: init
        };
    }
});