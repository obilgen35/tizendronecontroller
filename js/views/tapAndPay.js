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
 * Tap and pay view module.
 *
 * @module views/tapAndPay
 * @requires {@link helpers/page}
 * @namespace views/tapAndPay
 */
define({
    name: 'views/tapAndPay',
    requires: [
        'helpers/page'
    ],
    def: function tapAndPayDefine(pageHelper) {
        'use strict';
 
        /**
         * Page element.
         *
         * @memberof views/tapAndPay
         * @private
         * @type {HTMLElement}
         */
        var page = null;
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/tapAndPay
         * @private
         */
        function onPageBeforeShow() {
            page.querySelector('.ui-scroller').setAttribute(
                'tizen-circular-scrollbar', ''
            );
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/tapAndPay
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/tapAndPay
         * @public
         */
        function init() {
            page = document.getElementById('tap-and-pay');
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});