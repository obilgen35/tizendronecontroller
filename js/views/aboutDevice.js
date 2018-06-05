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
 * About device view module.
 *
 * @module views/aboutDevice
 * @requires {@link views/knoxVersion}
 * @requires {@link helpers/list}
 * @requires {@link helpers/popup}
 * @requires {@link helpers/page}
 * @namespace views/aboutDevice
 */
define({
    name: 'views/aboutDevice',
    requires: [
        'views/knoxVersion',
        'helpers/list',
        'helpers/popup',
        'helpers/page'
    ],
    def: function aboutDevice(req) {
        'use strict';
 
        /**
         * List helper module instance.
         *
         * @memberof views/aboutDevice
         * @private
         * @type {Module}
         */
        var listHelper = req.helpers.list,
 
            /**
             * Popup helper module instance.
             *
             * @memberof views/aboutDevice
             * @private
             * @type {Module}
             */
            popupHelper = req.helpers.popup,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/aboutDevice
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Default scrollbar position.
             *
             * @memberof views/aboutDevice
             * @private
             * @const {number}
             */
            DEFAULT_SCROLLBAR_POSITION = 50,
 
            /**
             * Page element.
             *
             * @memberof views/aboutDevice
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/aboutDevice
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/aboutDevice
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/aboutDevice
         * @public
         */
        function init() {
            page = document.getElementById('about-device');
 
            bindEvents();
 
            listHelper.marquee(page.querySelector('.ui-listview'));
            popupHelper.resetScrollBeforeOpen(
                page.querySelector('#open-source-licenses-popup'),
                DEFAULT_SCROLLBAR_POSITION
            );
        }
 
        return {
            init: init
        };
    }
});