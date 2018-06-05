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
 * Double press home key view module.
 *
 * @module views/doublePressHomeKey
 * @requires {@link helpers/list}
 * @requires {@link helpers/dom}
 * @requires {@link helpers/page}
 * @namespace views/doublePressHomeKey
 */
 
define({
    name: 'views/doublePressHomeKey',
    requires: [
        'helpers/list',
        'helpers/dom',
        'helpers/page'
    ],
    def: function doublePressHomeKeyDefine(req) {
        'use strict';
 
        /**
         * List helper module instance.
         *
         * @memberof views/doublePressHomeKey
         * @private
         * @type {Module}
         */
        var listHelper = req.helpers.list,
 
            /**
             * DOM helper module.
             *
             * @memberof views/doublePressHomeKey
             * @private
             * @type {Module}
             */
            domHelper = req.helpers.dom,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/doublePressHomeKey
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Current style value.
             *
             * @memberof views/doublePressHomeKey
             * @private
             * @type {string}
             */
            currentValue = 'Voice Memo',
 
            /**
             * Page element.
             *
             * @memberof views/doublePressHomeKey
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles click on the list.
         *
         * @memberof views/doublePressHomeKey
         * @private
         * @param {Event} ev
         */
        function onListClick(ev) {
            var item = domHelper.closest(ev.target, 'li');
 
            if (!item) {
                return;
            }
 
            item = item.querySelector('input');
            currentValue = item.getAttribute('value');
            history.back();
        }
 
        /**
         * Returns current value of double press home key.
         *
         * @memberof views/doublePressHomeKey
         * @public
         * @returns {string}
         */
        function getCurrentValue() {
            return currentValue;
        }
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/doublePressHomeKey
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            page.querySelector('[value="' + currentValue + '"]').checked = true;
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/doublePressHomeKey
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            page.querySelector('ul').addEventListener('click', onListClick);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/doublePressHomeKey
         * @public
         */
        function init() {
            page = document.getElementById('double-press-home-key');
 
            listHelper.marquee(page.querySelector('.ui-listview'));
            bindEvents();
        }
 
        return {
            init: init,
            getCurrentValue: getCurrentValue
        };
    }
});