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
 * Reset gear view module.
 *
 * @module views/resetGear
 * @requires {@link helpers/popup}
 * @requires {@link helpers/page}
 * @namespace views/resetGear
 */
define({
    name: 'views/resetGear',
    requires: [
        'helpers/popup',
        'helpers/page'
    ],
    def: function knoxVersion(req) {
        'use strict';
 
        /**
         * Popup helper module instance.
         *
         * @memberof views/resetGear
         * @private
         * @type {Module}
         */
        var popupHelper = req.helpers.popup,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/resetGear
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Page element.
             *
             * @memberof views/resetGear
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/resetGear
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/resetGear
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/resetGear
         * @public
         */
        function init() {
            page = document.getElementById('reset-gear');
 
            bindEvents();
 
            popupHelper.resetScrollBeforeOpen(
                page.querySelector('#light-reset-popup')
            );
            popupHelper.resetScrollBeforeOpen(
                page.querySelector('#factory-reset-popup')
            );
        }
 
        return {
            init: init
        };
    }
});