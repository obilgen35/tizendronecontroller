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
 * Sound view module.
 *
 * @module views/sound
 * @requires {@link views/soundMode}
 * @requires {@link views/ringtones}
 * @requires {@link views/vibration}
 * @requires {@link views/volume}
 * @requires {@link helpers/page}
 * @namespace views/sound
 */
define({
    name: 'views/sound',
    requires: [
        'views/soundMode',
        'views/ringtones',
        'views/vibration',
        'views/volume',
        'helpers/page'
    ],
    def: function display(req) {
        'use strict';
 
        /**
         * Page helper module instance.
         *
         * @memberof views/sound
         * @private
         * @type {Module}
         */
        var pageHelper = req.helpers.page,
 
            /**
             * Sound mode view module.
             *
             * @memberof views/sound
             * @private
             * @type {Module}
             */
            soundModeView = req.views.soundMode,
 
            /**
             * Ringtones view module.
             *
             * @memberof views/sound
             * @private
             * @type {Module}
             */
            ringtonesView = req.views.ringtones,
 
            /**
             * Page element.
             *
             * @memberof views/sound
             * @private
             * @type {HTMLElement}
             */
            page = null;
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/sound
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
            page.querySelector('#sound-mode-value')
                .innerText = soundModeView.getCurrentValue();
            page.querySelector('#ringtone-value')
                .innerText = ringtonesView.getCurrentValue();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/sound
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/sound
         * @public
         */
        function init() {
            page = document.getElementById('sound');
 
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});