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
 
/*global define, history, document, window, tau*/
 
/**
 * Application module.
 *
 * @module app
 * @requires {@link core/event}
 * @requires {@link core/application}
 * @requires {@link core/systeminfo}
 * @requires {@link helpers/page}
 * @requires {@link views/main}
 * @namespace app
 */
define({
    name: 'applib',
    requires: [
        'core/event',
        'core/application',
        'core/systeminfo',
        'helpers/page',
        'views/main'
    ],
    def: function initApp(req) {
        'use strict';
 
        /**
         * Event core module.
         *
         * @memberof app
         * @private
         * @type {Module}
         */
        var e = req.core.event,
 
            /**
             * Application core module.
             *
             * @memberof app
             * @private
             * @type {Module}
             */
            app = req.core.application,
 
            /**
             * SystemInfo core module.
             *
             * @memberof app
             * @private
             * @type {Module}
             */
            sysInfo = req.core.systeminfo,
 
            /**
             * List of images to preload.
             *
             * @memberof app
             * @private
             * @type {string[]}
             */
            imagesToPreload = [
                'images/brightness/b_settings_brightness_0.png',
                'images/brightness/b_settings_brightness_1.png',
                'images/brightness/b_settings_brightness_2.png',
                'images/brightness/b_settings_brightness_3.png',
                'images/brightness/b_settings_brightness_4.png',
                'images/brightness/b_settings_brightness_5.png',
                'images/brightness/b_settings_brightness_6.png',
                'images/brightness/b_settings_brightness_7.png',
                'images/brightness/b_settings_brightness_8.png',
                'images/brightness/b_settings_brightness_9.png'
            ];
 
        /**
         * Loads ui images.
         *
         * @memberof app
         * @private
         */
        function preloadImages() {
            var image = null,
                length = imagesToPreload.length,
                i = 0;
 
            for (i = 0; i < length; i += 1) {
                image = new window.Image();
                image.src = imagesToPreload[i];
            }
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof app
         * @private
         */
        function bindEvents() {
            document.addEventListener('tizenhwkey', function onTizenhwkey(e) {
                if (e.keyName === 'back') {
                    if (document.getElementsByClassName('ui-page-active')[0]
                            .id === 'main' && !tau.activePage
                            .querySelector('.ui-popup-active')) {
                        app.exit();
                    } else {
                        history.back();
                    }
                }
            });
            sysInfo.listenBatteryLowState();
        }
 
        /**
         * Handles low battery state.
         *
         * @memberof app
         * @private
         */
        function onLowBattery() {
            app.exit();
        }
 
        /**
         * Initializes module.
         *
         * @memberof app
         * @public
         */
        function init() {
            tau.engine.run();
            preloadImages();
            bindEvents();
            sysInfo.checkBatteryLowState();
            e.listeners({
                'core.systeminfo.battery.low': onLowBattery
            });
        }
 
        return {
            init: init
        };
    }
});