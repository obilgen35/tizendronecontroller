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
 
/*global setTimeout, history, define, document */
 
/**
 * Call forwarding view module.
 *
 * @module views/callForwardingNumber
 * @requires {@link core/event}
 * @requires {@link helpers/math}
 * @namespace views/callForwardingNumber
 */
define({
    name: 'views/callForwardingNumber',
    requires: [
        'core/event',
        'helpers/math'
    ],
    def: function callForwardingNumberSettings(req) {
        'use strict';
 
        /**
         * Event core module.
         *
         * @memberof views/callForwardingNumber
         * @private
         * @type {Module}
         */
        var e = req.core.event,
 
            /**
             * Math helper module instance.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {Module}
             */
            mathHelper = req.helpers.math,
 
            /**
             * Count of parts the dial is divided for.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @const {number}
             */
            SEGMENTS_COUNT = 10,
 
            /**
             * Device radius in pixels.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @const {number}
             */
            DEVICE_RADIUS = 180,
 
            /**
             * Distance from center to indicator in pixels.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @const {number}
             */
            INDICATOR_DISTANCE = 149,
 
            /**
             * Indicator HTML class restore timeout in milliseconds.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @const {number}
             */
            INDICATOR_RESTORE_TIMEOUT = 500,
 
            /**
             * Page's HTML id attribute.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @const {string}
             */
            PAGE_ID = 'call-forwarding-more-number-settings',
 
            /**
             * Maximum users input length.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @const {number}
             */
            MAX_INPUT_LENGTH = 10,
 
            /**
             * Distance from center to clickable zone (in pixels).
             *
             * @memberof views/callForwardingNumber
             * @private
             * @const {number}
             */
            CLICKABLE_ZONE_DISTANCE = 110,
 
            /**
             * Page element.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Canvas element.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {HTMLElement}
             */
            canvas = null,
 
            /**
             * Canvas context holder.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {CanvasRenderingContext2D}
             */
            context = null,
 
            /**
             * User's input.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {number}
             */
            userInput = '',
 
            /**
             * Saved user's input.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {number}
             */
            savedUserInput = '',
 
            /**
             * User's input preview holder.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {HTMLElement}
             */
            userInputPreview = document
                .getElementById('call-gear-number'),
 
            /**
             * Tap indicator.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {HTMLElement}
             */
            dialIndicator = document
                .querySelector('.circular-dial .dial-indicator'),
 
            /**
             * Delete button HTML element.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {HTMLElement}
             */
            deleteButton = null,
 
            /**
             * Confirm button HTML element.
             *
             * @memberof views/callForwardingNumber
             * @private
             * @type {HTMLElement}
             */
            confirmButton = null;
 
        /**
         * Draws segments dividers.
         *
         * @memberof views/callForwardingNumber
         * @private
         */
        function drawSegmentsDividers() {
 
            /**
             * Angular width of segment.
             *
             * @type {number}
             */
            var segmentAngularWidth = 2 * Math.PI / SEGMENTS_COUNT,
 
                /**
                * First divider angle (radians).
                *
                * @type {number}
                */
                startAngle = -segmentAngularWidth / 2,
 
                /**
                * Full circle angle from first divider (radians).
                *
                * @type {number}
                */
                endAngle = startAngle + 2 * Math.PI,
 
                /**
                * Start angle (radians).
                *
                * @type {number}
                */
                angle = startAngle;
 
            for (angle; angle < endAngle; angle += segmentAngularWidth) {
                context.beginPath();
                context.moveTo(
                    (1 + Math.sin(angle)) * DEVICE_RADIUS,
                    (1 + Math.cos(angle)) * DEVICE_RADIUS
                );
                context.lineTo(
                    (1 + Math.sin(angle + Math.PI)) * DEVICE_RADIUS,
                    (1 + Math.cos(angle + Math.PI)) * DEVICE_RADIUS
                );
                context.stroke();
            }
        }
 
        /**
         * Initializes canvas elements.
         *
         * @memberof views/callForwardingNumber
         * @private
         */
        function prepareCanvasElement() {
            canvas = document.querySelector(
                '#call-forwarding-more-number-settings canvas'
            );
            context = canvas.getContext('2d');
 
            canvas.width = canvas.height = DEVICE_RADIUS * 2;
            context = canvas.getContext('2d');
            context.strokeStyle = '#001a33';
            context.lineWidth = 2;
            drawSegmentsDividers();
        }
 
        /**
         * Computes segment number by coordinates.
         *
         * @memberof views/callForwardingNumber
         * @private
         * @param {number} x Component's horizontal position.
         * @param {number} y Component's vertical position.
         * @returns {number} Segment number.
         */
        function getSegment(x, y) {
            /**
             * Segment's angular width (radians).
             * @type {number}
             */
            var angle = -2 * Math.PI / SEGMENTS_COUNT;
 
            return (
                Math.floor((Math.atan2(x, y) - 0.5 * angle) / angle) +
                    SEGMENTS_COUNT / 2 + 1
            ) % SEGMENTS_COUNT;
        }
 
        /**
         * User's input getter.
         *
         * @memberof views/callForwardingNumber
         * @public
         * @returns {string} User's input.
         */
        function getValue() {
            return userInput;
        }
 
        /**
         * Computes vector length.
         *
         * @memberof views/callForwardingNumber
         * @private
         * @param {number} x Component's horizontal vector.
         * @param {number} y Component's vertical vector.
         * @returns {number} Vector length.
         */
        function vectorLength(x, y) {
            x = Math.abs(x);
            y = Math.abs(y);
            return Math.sqrt(x * x + y * y);
        }
 
        /**
         * Updates user input preview element.
         *
         * @memberof views/callForwardingNumber
         * @private
         */
        function updateInput() {
            userInputPreview.innerText = userInput;
        }
 
        /**
         * Adds char at the end of user input.
         *
         * @memberof views/callForwardingNumber
         * @private
         * @param {number} button Pressed button number.
         */
        function addToInput(button) {
            if (userInput.length < MAX_INPUT_LENGTH) {
                userInput += button.toString();
                updateInput();
            }
        }
 
        /**
         * Computes position and shows indicator.
         *
         * @memberof views/callForwardingNumber
         * @private
         * @param {number} button Pressed button number.
         */
        function triggerIndicator(button) {
            /**
             * Angle between vertical axis and of line from center
             * to center of pressed button (radians).
             *
             * @type {number}
             */
            var angle = button * 2 * Math.PI / SEGMENTS_COUNT - Math.PI / 2;
 
            dialIndicator.classList.add('active');
 
            // compute position
            dialIndicator.style.left = mathHelper.truncate(
                Math.cos(angle) * INDICATOR_DISTANCE + DEVICE_RADIUS
            ) + 'px';
            dialIndicator.style.top = mathHelper.truncate(
                Math.sin(angle) * INDICATOR_DISTANCE + DEVICE_RADIUS
            ) + 'px';
 
            setTimeout(function removeClass() {
                dialIndicator.classList.remove('active');
            }, INDICATOR_RESTORE_TIMEOUT);
        }
 
        /**
         * Handles click on layer.
         *
         * @memberof views/callForwardingNumber
         * @private
         * @param {Event} event
         */
        function onLayerClick(event) {
            var x = event.clientX - DEVICE_RADIUS,
                y = event.clientY - DEVICE_RADIUS,
                button = null;
 
            if (vectorLength(x, y) > CLICKABLE_ZONE_DISTANCE) {
                button = getSegment(x, y);
                addToInput(button);
                triggerIndicator(button);
            }
        }
 
        /**
         * Removes last char from user's input.
         *
         * @memberof views/callForwardingNumber
         * @private
         */
        function onDeleteInput() {
            if (userInput.length) {
                userInput = userInput.split('');
                userInput.pop();
                userInput = userInput.join('');
            }
 
            deleteButton.classList.add('active');
            setTimeout(function removeClass() {
                deleteButton.classList.remove('active');
            }, INDICATOR_RESTORE_TIMEOUT);
 
            updateInput();
        }
 
        /**
         * Handles confirm button click.
         *
         * @memberof views/callForwardingNumber
         * @private
         */
        function onConfirmInput() {
            // fires an event with user's provided data.
            savedUserInput = getValue() || '';
            e.fire('confirm', savedUserInput);
            history.back();
        }
 
        /**
         * Handles pagebeforeshow event on page element.
         *
         * @memberof views/callForwardingNumber
         * @private
         */
        function onPageBeforeShow() {
            userInput = savedUserInput || '';
            updateInput();
        }
 
        /**
         * Adds listeners to elements.
         *
         * @memberof views/callForwardingNumber
         * @private
         */
        function bindElements() {
            document
                .querySelector('#' + PAGE_ID + ' .clickable-layer')
                    .addEventListener('click', onLayerClick);
 
            deleteButton.addEventListener('click', onDeleteInput);
            confirmButton.addEventListener('click', onConfirmInput);
 
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/callForwardingNumber
         * @public
         */
        function init() {
            page = document.getElementById(PAGE_ID);
 
            deleteButton = document
                .querySelector('#' + PAGE_ID + ' .delete-button');
 
            confirmButton = document
                .querySelector('#' + PAGE_ID + ' .confirm-button');
 
            prepareCanvasElement();
            bindElements();
        }
 
        return {
            init: init,
            getValue: getValue
        };
    }
});