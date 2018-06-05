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
 
/*global define, document, tau*/
 
/**
 * Brightness view module.
 *
 * @module views/altDrone
 * @namespace views/altDrone
 */
define({
    name: 'views/altDrone',
    requires: [],
    def: function altDrone() {
        'use strict';
 
        /**
         * Brightness icons.
         *
         * @memberof views/brightness
         * @private
         * @const {string[]}
         */
        var BRIGHTNESS_ICONS = ['brightness-level-icon-0',
                            'brightness-level-icon-1',
                            'brightness-level-icon-2',
                            'brightness-level-icon-3',
                            'brightness-level-icon-4',
                            'brightness-level-icon-5',
                            'brightness-level-icon-6',
                            'brightness-level-icon-7',
                            'brightness-level-icon-8',
                            'brightness-level-icon-9'],
 
            /**
             * Page element.
             *
             * @memberof views/brightness
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Slider element.
             *
             * @memberof views/brightness
             * @private
             * @type {HTMLElement}
             */
            sliderElement = null,
 
            /**
             * Brightness minus element.
             *
             * @memberof views/brightness
             * @private
             * @type {HTMLElement}
             */
            brightnessMinus = null,
 
            /**
             * Brightness value element.
             *
             * @memberof views/brightness
             * @private
             * @type {HTMLElement}
             */
            brightnessValue = null,
 
            /**
             * Brightness icon element.
             *
             * @memberof views/brightness
             * @private
             * @type {HTMLElement}
             */
            brightnessIcon = null,
 
            /**
             * Brightness plus element.
             *
             * @memberof views/brightness
             * @private
             * @type {HTMLElement}
             */
            brightnessPlus = null,
 
            /**
             * Circle slider widget.
             *
             * @memberof views/brightness
             * @private
             * @type {HTMLElement}
             */
            circleSlider = null;
 
        /**
         * Updates brightness value.
         *
         * @memberof views/brightness
         * @private
         * @param {number|string} value
         */
        function updateBrightnessValue(value) {
            brightnessValue.innerText = value;
        }
 
        function getBrightnessValue()
        {
        	console.log("getBr" + brightnessValue.innerText);
        	return brightnessValue.innerText;
        }
        /**
         * Updates brightness icon.
         *
         * @memberof views/brightness
         * @private
         * @param {number|string} value
         */
        function updateBrightnessIcon(value) {
            var i = 0,
                length = BRIGHTNESS_ICONS.length;
 
            for (i = 0; i < length; i += 1) {
                brightnessIcon.classList.remove(BRIGHTNESS_ICONS[i]);
            }
            brightnessIcon.classList.add('brightness-level-icon-' + value);
        }
 
        /**
         * Handles progresschange event on circle slide element.
         *
         * @memberof views/brightness
         * @private
         */
        function onCircleSliderChange() {
            updateBrightnessValue(circleSlider.value());
            updateBrightnessIcon(circleSlider.value());
        }
 
        /**
         * Handles pagebeforeshow event on page element.
         *
         * @memberof views/brightness
         * @private
         */
        function onPageBeforeShow() {
            circleSlider = tau.widget.Slider(sliderElement);
            updateBrightnessValue(circleSlider.value());
            updateBrightnessIcon(circleSlider.value());
            circleSlider.on('progresschange', onCircleSliderChange);
        }
 
        /**
         * Increases brightness value.
         *
         * @memberof views/brightness
         * @private
         */
        function increaseBrightness() {
            var currentBrightnessValue = parseInt(circleSlider.value(), 10);
 
            // temporary workaround, because slider widget cannot be set
            // to 0 value from any positive value. -1 value is needed.
            if (currentBrightnessValue === -1) {
                currentBrightnessValue += 1;
            }
 
            if (currentBrightnessValue < 9) {
                currentBrightnessValue += 1;
            }
 
            circleSlider.value(currentBrightnessValue);
        }
 
        /**
         * Decreases brightness value.
         *
         * @memberof views/brightness
         * @private
         */
        function decreaseBrightness() {
            var currentBrightnessValue = parseInt(circleSlider.value(), 10);
 
            if (currentBrightnessValue > 0) {
                currentBrightnessValue -= 1;
            }
 
            // temporary workaround, because slider widget cannot be set
            // to 0 value from any positive value. -1 value is needed.
            if (currentBrightnessValue === 0) {
                currentBrightnessValue -= 1;
            }
 
            circleSlider.value(currentBrightnessValue);
        }
 
        /**
         * Handles click event on brightness minus element.
         *
         * @memberof views/brightness
         * @private
         */
        function onBrightnessMinusClick() {
            decreaseBrightness();
        }
 
        /**
         * Handles click event on brightness plus element.
         *
         * @memberof views/brightness
         * @private
         */
        function onBrightnessPlusClick() {
            increaseBrightness();
        }
 
        /**
         * Register events.
         *
         * @memberof views/brightness
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            brightnessMinus.addEventListener('click', onBrightnessMinusClick);
            brightnessPlus.addEventListener('click', onBrightnessPlusClick);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/brightness
         * @public
         */
        function init() {
        	console.log("altdrone init");
            page = document.getElementById('alt_drone');
            sliderElement = page.querySelector('#circle');
            brightnessMinus = page.querySelector('#brightness-minus');
            brightnessValue = page.querySelector('#brightness-value');
            brightnessIcon = page.querySelector('#brightness-icon');
            brightnessPlus = page.querySelector('#brightness-plus');
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});