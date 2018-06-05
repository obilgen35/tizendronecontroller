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
 * Font view module.
 *
 * @module views/font
 * @requires {@link views/fontStyle}
 * @requires {@link views/fontSize}
 * @requires {@link helpers/page}
 * @namespace views/font
 */
define({
    name: 'views/font',
    requires: [
        'views/fontStyle',
        'views/fontSize',
        'helpers/page'
    ],
    def: function font(req) {
        'use strict';
 
        /**
         * Page helper module instance.
         *
         * @memberof views/font
         * @private
         * @type {Module}
         */
        var pageHelper = req.helpers.page,
 
            /**
             * Font style view module.
             *
             * @memberof views/font
             * @private
             * @type {Module}
             */
            fontStyleView = req.views.fontStyle,
 
            /**
             * Font size view module.
             *
             * @memberof views/font
             * @private
             * @type {Module}
             */
            fontSizeView = req.views.fontSize,
 
            /**
             * Page element.
             *
             * @memberof views/font
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/font
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            page.querySelector('#font-style-value')
                .innerText = fontStyleView.getCurrentValue();
            page.querySelector('#font-size-value')
                .innerText = fontSizeView.getCurrentValue();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/font
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/font
         * @public
         */
        function init() {
            page = document.getElementById('font');
 
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});