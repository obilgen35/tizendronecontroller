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
 * Math helper module.
 *
 * @module helpers/math
 * @namespace helpers/math
 */
 
define({
    name: 'helpers/math',
    def: function helpersMath() {
        'use strict';
 
        /**
         * Returns modulo of dividing two numbers.
         * For negative values it returns positive values.
         *
         * @memberof helpers/math
         * @public
         * @param {number} m
         * @param {number} n
         * @returns {number}
         */
        function mod(m, n) {
            return ((m % n) + n) % n;
        }
 
        /**
         * Rounds specified number towards zero.
         *
         * @memberof helpers/math
         * @public
         * @param {number} n
         * @returns {number}
         */
        function truncate(n) {
            if (n > 0) {
                return Math.floor(n);
            }
            return Math.ceil(n);
        }
 
        return {
            mod: mod,
            truncate: truncate
        };
    }
});