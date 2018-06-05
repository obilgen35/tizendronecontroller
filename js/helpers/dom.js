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
 
/*global define*/
 
/**
 * DOM helper module.
 *
 * @module helpers/dom
 * @namespace helpers/dom
 */
define({
    name: 'helpers/dom',
    requires: [],
    def: function def() {
        'use strict';
 
        /**
         * Returns closest element (parent) satisfying specified selector.
         * If element is not found, null is returned.
         *
         * @memberof helpers/dom
         * @public
         * @param {HTMLElement} element
         * @param {string} selector
         * @returns {HTMLElement}
         */
        function closest(element, selector) {
            do {
                if (element.webkitMatchesSelector(selector)) {
                    return element;
                }
 
                element = element.parentElement;
 
            } while (element !== null);
 
            return null;
        }
 
        return {
            closest: closest
        };
    }
});