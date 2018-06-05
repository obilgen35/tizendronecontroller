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
 
/*global define, setTimeout*/
 
/**
 * Popup helper module.
 *
 * @module helpers/popup
 * @namespace helpers/popup
 */
define({
    name: 'helpers/popup',
    requires: [],
    def: function popupHelper() {
        'use strict';
 
        /**
         * Resets scroll of the popup element.
         *
         * @memberof helpers/popup
         * @private
         * @param {number} [position=0]
         */
        function resetScroll(position) {
            /*jshint validthis:true*/
            var self = this;
 
            setTimeout(function onTimeout() {
                self.querySelector('.ui-popup-wrapper')
                    .scrollTop = position || 0;
            }, 0);
        }
 
        /**
         * Handles popupbeforeshow event on given popup element.
         *
         * @memberof helpers/popup
         * @public
         * @param {HTMLElement} popup
         * @param {number} [position=0]
         */
        function resetScrollBeforeOpen(popup, position) {
            popup.addEventListener(
                'popupbeforeshow',
                resetScroll.bind(popup, position)
            );
        }
 
        return {
            resetScrollBeforeOpen: resetScrollBeforeOpen
        };
    }
});