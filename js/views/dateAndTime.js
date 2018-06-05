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
 * Date and time view module.
 *
 * @module views/dateAndTime
 * @requires {@link core/event}
 * @requires {@link helpers/page}
 * @requires {@link helpers/date}
 * @requires {@link views/setDate}
 * @requires {@link views/setTime}
 * @namespace views/dateAndTime
 */
define({
    name: 'views/dateAndTime',
    requires: [
        'core/event',
        'helpers/page',
        'helpers/date',
        'views/setDate',
        'views/setTime'
    ],
    def: function dateAndTimeDefine(req) {
        'use strict';
 
        /**
         * Core events module.
         *
         * @memberof views/dateAndTime
         * @private
         * @type {Module}
         */
        var e = req.core.event,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/dateAndTime
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Date helper module.
             *
             * @memberof views/dateAndTime
             * @private
             * @type {Module}
             */
            dateHelper = req.helpers.date,
 
            /**
             * Set date view module.
             *
             * @memberof views/dateAndTime
             * @private
             * @type {Module}
             */
            setDateView = req.views.setDate,
 
            /**
             * Set time view module.
             *
             * @memberof views/dateAndTime
             * @private
             * @type {Module}
             */
            setTimeView = req.views.setTime,
 
            /**
             * CSS class name for disabled content.
             *
             * @memberof views/dateAndTime
             * @private
             * @type {string}
             */
            DISABLED_CLASS = 'disabled',
 
            /**
             * Page element.
             *
             * @memberof views/dateAndTime
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Reference to "Automatic" time toggle switch.
             *
             * @memberof views/dateAndTime
             * @private
             * @type {HTMLElement}
             */
            automaticTimeToggleSwitchElement = null;
 
        /**
         * Updates date value.
         *
         * @memberof views/dateAndTime
         * @private
         */
        function updateDate() {
            page.querySelector('#system-date-value').innerText =
                dateHelper.format(setDateView.getDate(), 'dd/mm/yyyy');
        }
 
        /**
         * Updates time value.
         *
         * @memberof views/dateAndTime
         * @private
         */
        function updateTime() {
            // update date value
            page.querySelector('#system-time-value').innerText =
                dateHelper.format(setTimeView.getTime(), 'HH:MM');
        }
 
        /**
         * Updates state of "Automatic" dependent options.
         *
         * @memberof views/dateAndTime
         * @private
         */
        function updateAutomaticDependantOptions() {
            var automaticChecked = automaticTimeToggleSwitchElement.checked,
                options = page.querySelectorAll('[data-automatic-off]'),
                i = 0,
                length = options.length;
 
            for (i = 0; i < length; i += 1) {
                if (automaticChecked) {
                    options[i].classList.add(DISABLED_CLASS);
                } else {
                    options[i].classList.remove(DISABLED_CLASS);
                }
            }
        }
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/dateAndTime
         * @private
         */
        function onPageBeforeShow() {
            updateDate();
            updateTime();
            updateAutomaticDependantOptions();
            pageHelper.resetScroll(page);
        }
 
        /**
         * Handles system date change event.
         *
         * @memberof views/dateAndTime
         * @private
         */
        function onSystemDateChanged() {
            updateDate();
        }
 
        /**
         * Handles system time change event.
         *
         * @memberof views/dateAndTime
         * @private
         */
        function onSystemTimeChanged() {
            updateTime();
        }
 
        /**
         * Handles "change" event on "Automatic" time toggle switch.
         *
         * @memberof views/dateAndTime
         * @private
         */
        function onAutomaticTimeToggleSwitchChanged() {
            updateAutomaticDependantOptions();
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/dateAndTime
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            automaticTimeToggleSwitchElement.addEventListener('change',
                onAutomaticTimeToggleSwitchChanged);
 
            e.listeners({
                'views.setDate.system.date.changed': onSystemDateChanged,
                'views.setTime.system.time.changed': onSystemTimeChanged
            });
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/dateAndTime
         * @public
         */
        function init() {
            page = document.getElementById('date-and-time');
            automaticTimeToggleSwitchElement = page
                .querySelector('#date-time-automatic');
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});