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
 
/*global define, tau*/
 
/**
 * List helper module.
 *
 * @module helpers/list
 * @requires {@link helpers/dom}
 * @namespace helpers/list
 */
define({
    name: 'helpers/list',
    requires: [
        'helpers/dom'
    ],
    def: function list(domHelper) {
        'use strict';
 
        /**
         * Scrolled element.
         *
         * @memberof helpers/list
         * @private
         * @type {Widget}
         */
        var marqueeWidget = null;

        
        function onListSelected(ev) {
            var element = ev.target.querySelector('.ui-marquee');
 
            if (element) {
                marqueeWidget = tau.widget.Marquee(element);
            }
 
            if (marqueeWidget) {
                marqueeWidget.start();
            }
        }
 
        /**
         * Handles scrollstart event on list element.
         *
         * @memberof helpers/list
         * @private
         */
        function onListScrollStart() {
            if (marqueeWidget) {
                marqueeWidget.stop();
                marqueeWidget.reset();
            }
        }
 
        /**
         * Handles scrollend event on list element.
         *
         * @memberof helpers/list
         * @private
         */
        function onListScrollEnd() {
            marqueeWidget = null;
        }
 
        /**
         * Handles pagebeforehide event on list page element.
         *
         * @memberof helpers/list
         * @private
         */
        function onListPageBeforeHide() {
            marqueeWidget = null;
        }
 
        /**
         * Provides marquee functionality for list items.
         *
         * @memberof helpers/list
         * @public
         * @param {HTMLElement} list
         */
        function marquee(list) {
            list.addEventListener('selected', onListSelected);
            list.addEventListener('scrollstart', onListScrollStart);
            list.addEventListener('scrollend', onListScrollEnd);
            domHelper.closest(list, '.ui-page').addEventListener(
                'pagebeforehide',
                onListPageBeforeHide
            );
        }
        
        return {
            marquee: marquee
        };
    }
});