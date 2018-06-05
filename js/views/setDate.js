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
 * Set date view module.
 *
 * @module views/setDate
 * @requires {@link core/event}
 * @requires {@link helpers/dom}
 * @requires {@link helpers/faces}
 * @requires {@link helpers/date}
 * @requires {@link helpers/math}
 * @namespace views/setDate
 */
define({
    name: 'views/setDate',
    requires: [
        'core/event',
        'helpers/dom',
        'helpers/faces',
        'helpers/date',
        'helpers/math'
    ],
    def: function setDateDefine(req) {
        'use strict';
 
        /**
         * Core events module.
         *
         * @memberof views/setDate
         * @private
         * @type {Module}
         */
        var e = req.core.event,
 
            /**
             * DOM helper module.
             *
             * @memberof views/setDate
             * @private
             * @type {Module}
             */
            domHelper = req.helpers.dom,
 
            /**
             * Faces helper module.
             *
             * @memberof views/setDate
             * @private
             * @type {Module}
             */
            facesHelper = req.helpers.faces,
 
            /**
             * Date helper module.
             *
             * @memberof views/setDate
             * @private
             * @type {Module}
             */
            dateHelper = req.helpers.date,
 
            /**
             * Math helper module.
             *
             * @memberof views/setDate
             * @private
             * @type {Module}
             */
            mathHelper = req.helpers.math,
 
            /**
             * Day part of the date's constant.
             *
             * @memberof views/setDate
             * @private
             * @const {string}
             */
            DATE_PART_DAY = 'day',
 
            /**
             * Month part of the date's constant.
             *
             * @memberof views/setDate
             * @private
             * @const {string}
             */
            DATE_PART_MONTH = 'month',
 
            /**
            * Year part of the date's constant.
            *
            * @memberof views/setDate
            * @private
            * @const {string}
            */
            DATE_PART_YEAR = 'year',
 
            /**
             * Date popup element reference.
             *
             * @memberof views/setDate
             * @private
             * @type {HTMLElement}
             */
            datePopup = null,
 
            /**
             * Current system date.
             *
             * @memberof views/setDate
             * @private
             * @type {Date}
             */
            systemDate = null,
 
            /**
             * Current view date object.
             *
             * @memberof views/setDate
             * @private
             * @type {Date}
             */
            currentDate = null,
 
            /**
             * Stores date which was set when user has changed active part.
             *
             * @memberof views/setDate
             * @private
             * @type {Date}
             */
            historyDate = null,
 
            /**
             * Face layer context reference.
             *
             * @memberof views/setDate
             * @private
             * @type {CanvasRenderingContext2D}
             */
            faceLayerContext = null,
 
            /**
             * Hand layer element reference.
             *
             * @memberof views/setDate
             * @private
             * @type {HTMLElement}
             */
            handLayerElement = null,
 
            /**
             * Hand layer context reference.
             *
             * @memberof views/setDate
             * @private
             * @type {CanvasRenderingContext2D}
             */
            handLayerContext = null,
 
            /**
             * Current active part of the date.
             *
             * @memberof views/setDate
             * @private
             * @type {string}
             */
            activeDatePart = '',
 
            /**
             * Configuration object for hand face.
             * Used to draw hand face.
             *
             * @memberof views/setDate
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
             * Configuration object for month face.
             * Used to draw month face.
             *
             * @memberof views/setDate
             * @private
             * @type {object}
             */
            monthFaceConfig = {
                size: 12,
                lengths: [20],
                colors: ['#aeaeae'],
                lineWidths: [2]
            },
 
            /**
             * Configuration object for year face.
             * Used to draw year face.
             *
             * @memberof views/setDate
             * @private
             * @type {object}
             */
            yearFaceConfig = {
                size: 50,
                lengths: [15, 10, 10, 10, 10],
                colors: ['#aeaeae'],
                lineWidths: [2]
            },
 
            /**
             * Configuration object for day face.
             * Used to draw year face.
             * The size in face depends on the month.
             *
             * @memberof views/setDate
             * @private
             * @type {object}
             */
            dayFaceConfig = {
                size: 31,
                lengths: [15, 10],
                colors: ['#aeaeae'],
                lineWidths: [2]
            },
 
            /**
             * Hand angle step (in degrees).
             *
             * @memberof views/setDate
             * @private
             * @type {number}
             */
            handAngleStep = 0,
 
            /**
             * Current value of hand angle (in degrees).
             *
             * @memberof views/setDate
             * @private
             * @type {number}
             */
            currentHandAngle = 0;
 
        /**
         * Sets value (in degrees) for hand angle.
         *
         * @memberof views/setDate
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
         * Sets active part of the date.
         *
         * @memberof views/setDate
         * @private
         * @param {string} part
         * @fires "date.part.changed"
         * @fires "year.part.activated"
         * @fires "month.part.activated"
         * @fires "day.part.activated"
         */
        function setActiveDatePart(part) {
            if (activeDatePart === part) {
                return;
            }
 
            activeDatePart = part;
 
            e.fire('date.part.changed');
            e.fire(part + '.part.activated');
        }
 
        /**
         * Updates specified part of the date by specified value.
         *
         * @memberof views/setDate
         * @private
         * @param {string} datePart
         * @param {number} valueChange
         * @fires "date.changed"
         */
        function setCurrentDatePartRelative(datePart, valueChange) {
            var day = currentDate.getDate(),
                month = currentDate.getMonth(),
                year = currentDate.getFullYear(),
                daysInMonth = 0,
                newDate = null;
 
            if (datePart === DATE_PART_MONTH) {
 
                month = mathHelper.mod(month + valueChange, 12);
            } else if (datePart === DATE_PART_YEAR) {
                year += valueChange;
            } else if (datePart === DATE_PART_DAY) {
                daysInMonth = dateHelper.daysInMonth(month, year);
 
                day -= 1;
                day = mathHelper.mod(day + valueChange, daysInMonth);
                day += 1;
 
            } else {
                return;
            }
 
            if (historyDate && datePart !== DATE_PART_DAY) {
                daysInMonth = dateHelper.daysInMonth(month, year);
                if (historyDate.getDate() > daysInMonth) {
                    day = daysInMonth;
                } else {
                    day = historyDate.getDate();
                }
            }
 
            newDate = new Date(year, month, day);
            currentDate.setTime(newDate.getTime());
 
            e.fire('date.changed');
        }
 
        /**
         * Updates "clock" hand position basing on current date.
         *
         * @memberof views/setDate
         * @private
         */
        function updateHand() {
            var activePartElement = datePopup.querySelector('.active'),
                activePart = '',
                angle = 0;
 
            if (!activePartElement) {
                return;
            }
 
            activePart = activePartElement.getAttribute('data-date-part');
 
            if (activePart === DATE_PART_DAY) {
                angle = currentDate.getDate() * handAngleStep;
            } else if (activePart === DATE_PART_MONTH) {
                angle = (currentDate.getMonth() + 1) * handAngleStep;
            } else if (activePart === DATE_PART_YEAR) {
                angle = currentDate.getFullYear() %
                    yearFaceConfig.size * handAngleStep;
            } else {
                return;
            }
 
            setHandAngle(angle);
        }
 
        /**
         * Updates day value in the UI.
         *
         * @memberof views/setDate
         * @private
         */
        function updateDay() {
            datePopup.querySelector('.day-value')
                .innerText = dateHelper.format(currentDate, 'dd');
        }
 
        /**
         * Updates month value in the UI.
         *
         * @memberof views/setDate
         * @private
         */
        function updateMonth() {
            datePopup.querySelector('.month-value')
                .innerText = dateHelper.format(currentDate, 'mmm');
        }
 
        /**
         * Updates year value in the UI.
         *
         * @memberof views/setDate
         * @private
         */
        function updateYear() {
            datePopup.querySelector('.year-value')
                .innerText = dateHelper.format(currentDate, 'yyyy');
        }
 
        /**
         * Updates whole date in the UI.
         *
         * @memberof views/setDate
         * @private
         */
        function updateDate() {
            updateDay();
            updateMonth();
            updateYear();
        }
 
        /**
         * Handles current date change event.
         *
         * @memberof views/setDate
         * @private
         */
        function onCurrentDateChanged() {
            updateDate();
            updateHand();
        }
 
        /**
         * Handles change of active part of the date.
         *
         * @memberof views/setDate
         * @private
         */
        function onActiveDatePartChanged() {
            var container = datePopup.querySelector(
                    '.date-container[data-date-part="' + activeDatePart + '"]'),
                currentActive = null;
 
            if (!container) {
                return;
            }
 
            currentActive = datePopup.querySelector('.active');
 
            if (currentActive) {
                currentActive.classList.remove('active');
            }
 
            container.classList.add('active');
 
            // save current date
            historyDate = new Date(currentDate.valueOf());
        }
 
        /**
         * Handles "month" part of the date activation event.
         *
         * @memberof views/setDate
         * @private
         */
        function onMonthPartActivated() {
            // update face for month view
            facesHelper.drawFace(faceLayerContext, monthFaceConfig);
            handAngleStep = 360 / monthFaceConfig.size;
            updateHand();
        }
 
        /**
         * Handles "year" part of the date activation event.
         *
         * @memberof views/setDate
         * @private
         */
        function onYearPartActivated() {
            // update face for year view
            facesHelper.drawFace(faceLayerContext, yearFaceConfig);
            handAngleStep = 360 / yearFaceConfig.size;
            updateHand();
        }
 
        /**
         * Handles "day" part of the date activation event.
         *
         * @memberof views/setDate
         * @private
         */
        function onDayPartActivated() {
            // update size of the face (number of days in current month)
            dayFaceConfig.size = dateHelper.daysInMonth(
                currentDate.getMonth(), currentDate.getFullYear());
            handAngleStep = 360 / dayFaceConfig.size;
 
            // update face for day view
            facesHelper.drawFace(faceLayerContext, dayFaceConfig);
 
            updateHand();
        }
 
        /**
         * Handles hand angle change event.
         *
         * @memberof views/setDate
         * @private
         */
        function onHandAngleChanged() {
            handLayerElement.style.webkitTransform =
                'rotate(' + currentHandAngle + 'deg)';
        }
 
        /**
         * Handles "rotarydetent" event.
         *
         * @memberof views/setDate
         * @private
         * @param {Event} ev
         */
        function onRotaryDetent(ev) {
            var direction = ev.detail.direction,
                activePartElement = datePopup.querySelector('.active'),
                activePart = '';
 
            ev.stopPropagation();
 
            if (!activePartElement) {
                return;
            }
 
            activePart = activePartElement.getAttribute('data-date-part');
 
            if (direction === 'CW') {
                setCurrentDatePartRelative(activePart, 1);
            } else if (direction === 'CCW') {
                setCurrentDatePartRelative(activePart, -1);
            }
        }
 
        /**
         * Handles "popupbeforeshow" event for date popup.
         *
         * @memberof views/setDate
         * @private
         */
        function onPopupBeforeShow() {
            currentDate = new Date(systemDate.valueOf());
 
            facesHelper.drawFace(handLayerContext, handFaceConfig);
            updateDate();
            setActiveDatePart(DATE_PART_MONTH);
            document.addEventListener('rotarydetent', onRotaryDetent);
        }
 
        /**
         * Handles "popuphide" event for date popup.
         *
         * @memberof views/setDate
         * @private
         */
        function onPopupHide() {
            document.removeEventListener('rotarydetent', onRotaryDetent);
 
            // reset view
            setActiveDatePart(DATE_PART_MONTH);
        }
 
        /**
         * Handles click on popup's content.
         *
         * @memberof views/setDate
         * @private
         * @param {Event} ev
         */
        function onPopupContentClick(ev) {
            var container = domHelper.closest(ev.target, '.date-container');
 
            if (!container) {
                return;
            }
 
            setActiveDatePart(container.getAttribute('data-date-part'));
        }
 
        /**
         * Handles "click" event on date confirm button.
         *
         * @memberof views/setDate
         * @private
         * @fires "system.date.changed"
         */
        function onDateConfirmBtnClick() {
            systemDate.setTime(currentDate.getTime());
            e.fire('system.date.changed');
            tau.closePopup();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/setDate
         * @private
         */
        function bindEvents() {
            datePopup.addEventListener('popupbeforeshow',
                onPopupBeforeShow);
            datePopup.addEventListener('popuphide',
                onPopupHide);
            datePopup.querySelector('.ui-popup-content')
                .addEventListener('click', onPopupContentClick);
            datePopup.querySelector('#date-confirm-btn')
                .addEventListener('click', onDateConfirmBtnClick);
 
            e.listeners({
                'views.setDate.date.part.changed': onActiveDatePartChanged,
                'views.setDate.month.part.activated': onMonthPartActivated,
                'views.setDate.year.part.activated': onYearPartActivated,
                'views.setDate.day.part.activated': onDayPartActivated,
                'views.setDate.hand.angle.changed': onHandAngleChanged,
                'views.setDate.date.changed': onCurrentDateChanged
            });
        }
 
        /**
         * Returns current system date.
         *
         * @memberof views/setDate
         * @public
         * @returns {Date}
         */
        function getDate() {
            return new Date(systemDate.valueOf());
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/setDate
         * @public
         */
        function init() {
            if (!systemDate) {
                systemDate = new Date();
            }
 
            datePopup = document.getElementById('date-popup');
            faceLayerContext = datePopup.querySelector('.face-layer canvas')
                .getContext('2d');
 
            handLayerElement = datePopup.querySelector('.hand-layer');
            handLayerContext = handLayerElement.querySelector('canvas')
                .getContext('2d');
 
            bindEvents();
        }
 
        return {
            getDate: getDate,
            init: init
        };
    }
});