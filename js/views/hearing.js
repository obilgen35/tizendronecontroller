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
 * Hearing view module.
 *
 * @module views/hearing
 * @requires {@link helpers/list}
 * @requires {@link helpers/page}
 * @namespace views/hearing
 */
define({
    name: 'views/hearing',
    requires: [
        'helpers/list',
        'helpers/page'
    ],
    def: function hearingDefine(req) {
        'use strict';
 
        /**
         * List helper module instance.
         *
         * @memberof views/hearing
         * @private
         * @type {Module}
         */
        var listHelper = req.helpers.list,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/hearing
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Page element.
             *
             * @memberof views/hearing
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/hearing
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/hearing
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/hearing
         * @public
         */
        function init() {
            page = document.getElementById('hearing');
 
            bindEvents();
 
            listHelper.marquee(page.querySelector('.ui-listview'));
        }
 
        return {
            init: init
        };
    }
});