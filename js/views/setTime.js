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
 
/*global define, document, tau */
 
/**
 * Set time view module.
 *
 * @module views/setTime
 * @requires {@link core/event}
 * @requires {@link helpers/dom}
 * @requires {@link helpers/faces}
 * @requires {@link helpers/date}
 * @requires {@link helpers/math}
 * @namespace views/setTime
 */
 
define({
    name: 'views/setTime',
    requires: [
        'core/event',
        'helpers/dom',
        'helpers/faces',
        'helpers/date',
        'helpers/math'
    ],
    def: function setTimeDefine(req) {
        'use strict';
 
        /**
         * Core events module.
         *
         * @memberof views/setTime
         * @private
         * @type {Module}
         */
        var e = req.core.event,
 
            /**
             * DOM helper module.
             *
             * @memberof views/setTime
             * @private
             * @type {Module}
             */
            domHelper = req.helpers.dom,
 
            /**
             * Faces helper module.
             *
             * @memberof views/setTime
             * @private
             * @type {Module}
             */
            facesHelper = req.helpers.faces,
 
            /**
             * Date helper module.
             *
             * @memberof views/setTime
             * @private
             * @type {Module}
             */
            dateHelper = req.helpers.date,
 
            /**
             * Math helper module.
             *
             * @memberof views/setTime
             * @private
             * @type {Module}
             */
            mathHelper = req.helpers.math,
 
            /**
             * Hour part of the time constant.
             *
             * @memberof views/setTime
             * @private
             * @const {string}
             */
            TIME_PART_HOUR = 'hour',
 
            /**
             * Minute part of the time constant.
             *
             * @memberof views/setTime
             * @private
             * @const {string}
             */
            TIME_PART_MINUTE = 'minute',
 
            /**
             * Time popup element reference.
             *
             * @memberof views/setTime
             * @private
             * @type {HTMLElement}
             */
            timePopup = null,
 
            /**
             * Current system time.
             *
             * @memberof views/setTime
             * @private
             * @type {Date}
             */
            systemTime = null,
 
            /**
             * Current view time object.
             *
             * @memberof views/setTime
             * @private
             * @type {Date}
             */
            currentTime = null,
 
            /**
             * Face layer context reference.
             *
             * @memberof views/setTime
             * @private
             * @type {CanvasRenderingContext2D}
             */
            faceLayerContext = null,
 
            /**
             * Hand layer element reference.
             *
             * @memberof views/setTime
             * @private
             * @type {HTMLElement}
             */
            handLayerElement = null,
 
            /**
             * Hand layer context reference.
             *
             * @memberof views/setTime
             * @private
             * @type {CanvasRenderingContext2D}
             */
            handLayerContext = null,
 
            /**
             * Current active part of the time.
             *
             * @memberof views/setTime
             * @private
             * @type {string}
             */
            activeTimePart = '',
 
            /**
             * Configuration object for hand face.
             * Used to draw hand face.
             *
             * @memberof views/setTime
             * @private
             * @type {object}
             */
            handFaceConfig = {
                size: 1,
                angle: 0,
                lengths: [24],
                colors: ['#ffad64'],
                lineWidths: [6]
            },
 
            /**
             * Configuration object for time face.
             * Used to draw month face.
             *
             * @memberof views/setTime
             * @private
             * @type {object}
             */
            timeFaceConfig = {
                size: 240,
                lengths: [20, 7, 7, 7, 7],
                colors: ['#ffffff', '#aeaeae', '#aeaeae', '#aeaeae', '#aeaeae',
                    '#aeaeae', '#aeaeae', '#aeaeae', '#aeaeae', '#aeaeae',
                    '#aeaeae', '#aeaeae', '#aeaeae', '#aeaeae', '#aeaeae',
                    '#aeaeae', '#aeaeae', '#aeaeae', '#aeaeae', '#aeaeae'],
                lineWidths: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1]
            },
 
            /**
             * Hand angle step (in degrees).
             *
             * @memberof views/setTime
             * @private
             * @type {number}
             */
            handAngleStep = 0,
 
            /**
             * Current value of hand angle (in degrees).
             *
             * @memberof views/setTime
             * @private
             * @type {number}
             */
            currentHandAngle = 0;
 
        /**
         * Sets value (in degrees) for hand angle.
         *
         * @memberof views/setTime
         * @private
         * @param {number} value
         * @fires "hand.angle.changed"
         */
        function setHandAngle(value) {
            var normalized = mathHelper.mod(currentHandAngle, 360),
                distanceCCW = 0,
                distanceCW = 0;
 
            if (normalized === value) {
                return;
            }
 
            if (value < normalized) {
                distanceCW = value + 360 - normalized;
                distanceCCW = normalized - value;
            } else {
                distanceCW = value - normalized;
                distanceCCW = normalized + 360 - value;
            }
 
            if (distanceCW <= distanceCCW) {
                currentHandAngle += distanceCW;
            } else {
                currentHandAngle -= distanceCCW;
            }
 
            e.fire('hand.angle.changed');
        }
 
        /**
         * Sets active part of the time.
         *
         * @memberof views/setTime
         * @private
         * @param {string} part
         * @fires "time.part.changed"
         * @fires "hour.part.activated"
         * @fires "minute.part.activated"
         */
        function setActiveTimePart(part) {
            if (activeTimePart === part) {
                return;
            }
 
            activeTimePart = part;
 
            e.fire('time.part.changed');
            e.fire(part + '.part.activated');
        }
 
        /**
         * Updates specified part of the time by specified value.
         *
         * @memberof views/setTime
         * @private
         * @param {string} timePart
         * @param {number} valueChange
         * @fires "time.changed"
         */
        function setCurrentTimePartRelative(timePart, valueChange) {
            var hour = currentTime.getHours(),
                minute = currentTime.getMinutes();
 
            if (timePart === TIME_PART_HOUR) {
                hour = mathHelper.mod(hour + valueChange, 24);
            } else if (timePart === TIME_PART_MINUTE) {
                minute = mathHelper.mod(minute + valueChange, 60);
            } else {
                return;
            }
 
            currentTime.setHours(hour);
            currentTime.setMinutes(minute);
 
            e.fire('time.changed');
        }
 
        /**
         * Updates whole time in the UI.
         *
         * @memberof views/setTime
         * @private
         */
        function updateTime() {
            timePopup.querySelector('.hour-value')
                .innerText = dateHelper.format(currentTime, 'HH');
            timePopup.querySelector('.minute-value')
                .innerText = dateHelper.format(currentTime, 'MM');
        }
 
        /**
         * Updates "clock" hand position basing on current date.
         *
         * @memberof views/setTime
         * @private
         */
        function updateHand() {
            var activePartElement = timePopup.querySelector('.active'),
                activePart = '',
                angle = 0;
 
            if (!activePartElement) {
                return;
            }
 
            activePart = activePartElement.getAttribute('data-time-part');
 
            if (activePart === TIME_PART_HOUR) {
                angle = currentTime.getHours() * handAngleStep;
            } else if (activePart === TIME_PART_MINUTE) {
                angle = currentTime.getMinutes() * handAngleStep;
            } else {
                return;
            }
 
            setHandAngle(angle);
        }
 
        /**
         * Handles current time change event.
         *
         * @memberof views/setTime
         * @private
         */
        function onCurrentTimeChanged() {
            updateTime();
            updateHand();
        }
 
        /**
         * Handles change of active part of the time.
         *
         * @memberof views/setTime
         * @private
         */
        function onActiveTimePartChanged() {
            var container = timePopup.querySelector(
                    '.time-container[data-time-part="' + activeTimePart + '"]'),
                currentActive = null;
 
            if (!container) {
                return;
            }
 
            currentActive = timePopup.querySelector('.active');
 
            if (currentActive) {
                currentActive.classList.remove('active');
            }
 
            container.classList.add('active');
        }
 
        /**
         * Handles "hour" part of the time activation event.
         *
         * @memberof views/setTime
         * @private
         */
        function onHourPartActivated() {
            // change step for 12 hours
            handAngleStep = 360 / 12;
            updateHand();
        }
 
        /**
         * Handles "minute" part of the time activation event.
         *
         * @memberof views/setTime
         * @private
         */
        function onMinutePartActivated() {
            // change step for 60 minutes
            handAngleStep = 360 / 60;
            updateHand();
        }
 
        /**
         * Handles hand angle change event.
         *
         * @memberof views/setTime
         * @private
         */
        function onHandAngleChanged() {
            handLayerElement.style.webkitTransform =
                'rotate(' + currentHandAngle + 'deg)';
        }
 
        /**
         * Handles "rotarydetent" event.
         *
         * @memberof views/setTime
         * @private
         * @param {Event} ev
         */
        function onRotaryDetent(ev) {
            var direction = ev.detail.direction,
                activePartElement = timePopup.querySelector('.active'),
                activePart = '';
 
            ev.stopPropagation();
 
            if (!activePartElement) {
                return;
            }
 
            activePart = activePartElement.getAttribute('data-time-part');
 
            if (direction === 'CW') {
                setCurrentTimePartRelative(activePart, 1);
            } else if (direction === 'CCW') {
                setCurrentTimePartRelative(activePart, -1);
            }
        }
 
        /**
         * Handles "popupbeforeshow" event for time popup.
         *
         * @memberof views/setTime
         * @private
         */
        function onPopupBeforeShow() {
            currentTime = new Date(systemTime.valueOf());
 
            facesHelper.drawFace(handLayerContext, handFaceConfig);
            facesHelper.drawFace(faceLayerContext, timeFaceConfig);
            updateTime();
            setActiveTimePart(TIME_PART_HOUR);
            document.addEventListener('rotarydetent', onRotaryDetent);
        }
 
        /**
         * Handles "popuphide" event for date popup.
         *
         * @memberof views/setTime
         * @private
         */
        function onPopupHide() {
            document.removeEventListener('rotarydetent', onRotaryDetent);
 
            // reset view
            setActiveTimePart(TIME_PART_HOUR);
        }
 
        /**
         * Handles click on popup's content.
         *
         * @memberof views/setTime
         * @private
         * @param {Event} ev
         */
        function onPopupContentClick(ev) {
            var container = domHelper.closest(ev.target, '.time-container'),
                timePart = '';
 
            if (!container) {
                return;
            }
 
            timePart = container.getAttribute('data-time-part');
 
            if (!timePart) {
                return;
            }
 
            setActiveTimePart(timePart);
        }
 
        /**
         * Handles "click" event on date confirm button.
         *
         * @memberof views/setTime
         * @private
         * @fires "system.time.changed"
         */
        function onTimeConfirmBtnClick() {
            systemTime.setTime(currentTime.getTime());
            e.fire('system.time.changed');
            tau.closePopup();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/setTime
         * @private
         */
        function bindEvents() {
            timePopup.addEventListener('popupbeforeshow',
                onPopupBeforeShow);
            timePopup.addEventListener('popuphide',
                onPopupHide);
            timePopup.querySelector('.ui-popup-content')
                .addEventListener('click', onPopupContentClick);
            timePopup.querySelector('#time-confirm-btn')
                .addEventListener('click', onTimeConfirmBtnClick);
 
            e.listeners({
                'views.setTime.time.part.changed': onActiveTimePartChanged,
                'views.setTime.hour.part.activated': onHourPartActivated,
                'views.setTime.minute.part.activated': onMinutePartActivated,
                'views.setTime.hand.angle.changed': onHandAngleChanged,
                'views.setTime.time.changed': onCurrentTimeChanged
            });
        }
 
        /**
         * Returns current system date.
         *
         * @memberof views/setTime
         * @public
         * @returns {Date}
         */
        function getTime() {
            return new Date(systemTime.valueOf());
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/setTime
         * @public
         */
        function init() {
            if (!systemTime) {
                systemTime = new Date();
            }
 
            timePopup = document.getElementById('time-popup');
            faceLayerContext = timePopup.querySelector('.face-layer canvas')
                .getContext('2d');
 
            handLayerElement = timePopup.querySelector('.hand-layer');
            handLayerContext = handLayerElement.querySelector('canvas')
                .getContext('2d');
 
            bindEvents();
        }
 
        return {
            getTime: getTime,
            init: init
        };
    }
});