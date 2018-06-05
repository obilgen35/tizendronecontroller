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
 * Accessibility view module.
 *
 * @module views/accessibility
 * @requires {@link views/vision}
 * @requires {@link views/hearing}
 * @requires {@link helpers/page}
 * @namespace views/accessibility
 */
define({
    name: 'views/accessibility',
    requires: [
        'views/vision',
        'views/hearing',
        'helpers/page'
    ],
    def: function accessibilityDefine(req) {
        'use strict';
 
        /**
         * Page helper module instance.
         *
         * @memberof views/accessibility
         * @private
         * @type {Module}
         */
        var pageHelper = req.helpers.page,
 
            /**
             * Page element.
             *
             * @memberof views/accessibility
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/accessibility
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/accessibility
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/accessibility
         * @public
         */
        function init() {
            page = document.getElementById('accessibility');
 
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});