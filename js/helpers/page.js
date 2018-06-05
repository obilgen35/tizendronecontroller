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
 
/*global define, window, document*/
 
/**
 * Page helper module.
 *
 * @module helpers/page
 * @namespace helpers/page
 */
define({
    name: 'helpers/page',
    requires: [],
    def: function pageHelper() {
        'use strict';
 
        /**
         * Indicates whether history back occurs.
         *
         * @memberof helpers/page
         * @private
         * @type {boolean}
         */
        var historyBack = false;
 
        /**
         * Handles popstate event on window element.
         *
         * @memberof helpers/page
         * @private
         */
        function onWindowPopstate() {
            historyBack = true;
        }
 
        /**
         * Handles pageshow event on document element.
         *
         * @memberof helpers/page
         * @private
         */
        function onPageShow() {
            historyBack = false;
        }
 
        /**
         * Resets scroll position of the given page.
         *
         * @memberof helpers/page
         * @public
         * @param {HTMLElement} page
         */
        function resetScroll(page) {
            if (!historyBack) {
                page.querySelector('.ui-scroller').scrollTop = 0;
            }
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof helpers/page
         * @private
         */
        function bindEvents() {
            window.addEventListener('popstate', onWindowPopstate, true);
            document.addEventListener('pageshow', onPageShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof helpers/page
         * @public
         */
        function init() {
            bindEvents();
        }
 
        return {
            init: init,
            resetScroll: resetScroll
        };
    }
});