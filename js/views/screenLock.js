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
 * Screen lock view module.
 *
 * @module views/screenLock
 * @requires {@link views/screenLockChoice}
 * @requires {@link helpers/popup}
 * @requires {@link helpers/page}
 * @namespace views/screenLock
 */
define({
    name: 'views/screenLock',
    requires: [
        'views/screenLockChoice',
        'helpers/popup',
        'helpers/page'
    ],
    def: function screenLockDefine(req) {
        'use strict';
 
        /**
         * Popup helper module instance.
         *
         * @memberof views/screenLock
         * @private
         * @type {Module}
         */
        var popupHelper = req.helpers.popup,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/screenLock
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Screen lock choice view module.
             *
             * @memberof views/screenLock
             * @private
             * @type {Module}
             */
            screenLockChoiceView = req.views.screenLockChoice,
 
            /**
             * Page element.
             *
             * @memberof views/screenLock
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/screenLock
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            page.querySelector('#screen-lock-value')
                .innerText = screenLockChoiceView.getCurrentValue();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/screenLock
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/screenLock
         * @public
         */
        function init() {
            page = document.getElementById('screen-lock');
 
            bindEvents();
 
            popupHelper.resetScrollBeforeOpen(
                page.querySelector('#screen-lock-help')
            );
        }
 
        return {
            init: init
        };
    }
});