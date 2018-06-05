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
 * Knox version view module.
 *
 * @module views/knoxVersion
 * @requires {@link helpers/page}
 * @namespace views/knoxVersion
 */
define({
    name: 'views/knoxVersion',
    requires: [
        'helpers/page'
    ],
    def: function knoxVersion(pageHelper) {
        'use strict';
 
        /**
         * Page element.
         *
         * @memberof views/knoxVersion
         * @private
         * @type {HTMLElement}
         */
        var page = null;
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/knoxVersion
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/knoxVersion
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/knoxVersion
         * @public
         */
        function init() {
            page = document.getElementById('knox-version');
 
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});