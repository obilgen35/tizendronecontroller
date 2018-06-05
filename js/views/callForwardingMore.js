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
 * Call forwarding - more settings view module.
 *
 * @module views/callForwardingMore
 * @requires {@link helpers/page}
 * @requires {@link views/callForwardingNumber}
 * @requires {@link core/event}
 * @namespace views/callForwardingMore
 */
define({
    name: 'views/callForwardingMore',
    requires: [
        'helpers/page',
        'views/callForwardingNumber',
        'core/event'
    ],
    def: function callForwardingMoreSettings(req) {
        'use strict';
 
        /**
         * Core events module.
         *
         * @memberof views/callForwardingMore
         * @private
         * @type {Module}
         */
        var ev = req.core.event,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/callForwardingMore
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Replacement for undefined number.
             *
             * @memberof views/callForwardingMore
             * @private
             * @const {string}
             */
            NO_NUMBER_TEXT = 'No number',
 
            /**
             * Page element.
             *
             * @memberof views/callForwardingMore
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Number value element.
             *
             * @memberof views/callForwardingMore
             * @private
             * @type {HTMLElement}
             */
            numberSettingValueElement =
                document.getElementById('number-settings-value');
 
        /**
         * Updates number value.
         *
         * @memberof views/callForwardingMore
         * @private
         */
        function onUpdateNumberValue() {
            numberSettingValueElement.innerHTML =
                req.views.callForwardingNumber.getValue() || NO_NUMBER_TEXT;
        }
 
        /**
         * Handles pagebeforeshow event on page element.
         *
         * @memberof views/callForwardingMore
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/callForwardingMore
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            ev.listeners({
                'views.callForwardingNumber.confirm': onUpdateNumberValue,
 
            });
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/callForwardingMore
         * @public
         */
        function init() {
            page = document.getElementById('call-forwarding-more-settings');
 
            bindEvents();
            onUpdateNumberValue();
        }
 
        return {
            init: init
        };
    }
});