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
 * Input view module.
 *
 * @module views/input
 * @requires {@link helpers/page}
 * @namespace views/input
 */
define({
    name: 'views/input',
    requires: [
        'helpers/page'
    ],
    def: function input(pageHelper) {
        'use strict';
 
        /**
         * Page element.
         *
         * @memberof views/input
         * @private
         * @type {HTMLElement}
         */
        var page = null;
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/input
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/input
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/input
         * @public
         */
        function init() {
            page = document.getElementById('input');
 
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});