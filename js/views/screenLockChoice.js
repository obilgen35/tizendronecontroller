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
 
/*global define, document, history */
 
/**
 * Screen lock choice view module.
 *
 * @module views/screenLockChoice
 * @requires {@link helpers/dom}
 * @requires {@link helpers/page}
 * @namespace views/screenLockChoice
 */
define({
    name: 'views/screenLockChoice',
    requires: [
        'helpers/dom',
        'helpers/page'
    ],
    def: function screenLockChoiceDefine(req) {
        'use strict';
 
        /**
         * DOM helper module.
         *
         * @memberof views/screenLockChoice
         * @private
         * @type {Module}
         */
        var domHelper = req.helpers.dom,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/screenLockChoice
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Current screen lock setting value.
             *
             * @memberof views/screenLockChoice
             * @private
             * @type {string}
             */
            currentValue = 'None',
 
            /**
             * Page element.
             *
             * @memberof views/screenLockChoice
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles click on the list.
         *
         * @memberof views/screenLockChoice
         * @private
         * @param {Event} ev
         */
        function onListClick(ev) {
            var item = domHelper.closest(ev.target, 'li');
 
            if (!item) {
                return;
            }
 
            currentValue = item.getAttribute('data-value');
            history.back();
        }
 
        /**
         * Returns current screen lock setting value.
         *
         * @memberof views/screenLockChoice
         * @public
         * @returns {string}
         */
        function getCurrentValue() {
            return currentValue;
        }
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/screenLockChoice
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/screenLockChoice
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            page.querySelector('ul').addEventListener('click', onListClick);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/screenLockChoice
         * @public
         */
        function init() {
            page = document.getElementById('screen-lock-choice');
 
            bindEvents();
        }
 
        return {
            init: init,
            getCurrentValue: getCurrentValue
        };
    }
});