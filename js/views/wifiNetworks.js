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
 
/*global define, document, setInterval, clearInterval*/
 
/**
 * Wi-fi networks view module.
 *
 * @module views/wifiNetworks
 * @namespace views/wifiNetworks
 */
define({
    name: 'views/wifiNetworks',
    requires: [],
    def: function wifiNetworks() {
        'use strict';
 
        /**
         * Scanning max time.
         *
         * @memberof views/wifiNetworks
         * @private
         * @const {number}
         */
        var SCANNING_MAX_TIME = 5,
 
            /**
             * Page element.
             *
             * @memberof views/wifiNetworks
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Scanning interval.
             *
             * @memberof views/wifiNetworks
             * @private
             * @type {object}
             */
            scanningInterval = null,
 
            /**
             * Scanning result element.
             *
             * @memberof views/wifiNetworks
             * @private
             * @type {HTMLElement}
             */
            scanningResult = null,
 
            /**
             * Footer button element.
             *
             * @memberof views/wifiNetworks
             * @private
             * @type {HTMLElement}
             */
            footerBtn = null,
 
            /**
             * Scanning counter.
             *
             * @memberof views/wifiNetworks
             * @private
             * @type {number}
             */
            scanningCounter = 0;
 
        /**
         * Updates UI.
         *
         * @memberof views/wifiNetworks
         * @private
         */
        function updateUI() {
            if (scanningInterval) {
                scanningResult.innerText = 'Scanning...';
                footerBtn.innerText = 'STOP';
            } else {
                scanningResult.innerText = 'None found';
                footerBtn.innerText = 'SCAN';
            }
        }
 
        /**
         * Stops scanning for Wi-Fi networks.
         *
         * @memberof views/wifiNetworks
         * @private
         */
        function stopScanning() {
            clearInterval(scanningInterval);
            scanningCounter = 0;
            scanningInterval = null;
        }
 
        /**
         * Increments scanning counter.
         *
         * @memberof views/wifiNetworks
         * @private
         */
        function incrementScanningCounter() {
            scanningCounter += 1;
 
            if (scanningCounter < SCANNING_MAX_TIME) {
                return;
            }
 
            stopScanning();
            updateUI();
        }
 
        /**
         * Starts scanning for Wi-Fi networks.
         *
         * @memberof views/wifiNetworks
         * @private
         */
        function startScanning() {
            scanningInterval = setInterval(incrementScanningCounter, 1000);
        }
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/wifiNetworks
         * @private
         */
        function onPageBeforeShow() {
            startScanning();
            updateUI();
        }
 
        /**
         * Handles "pagehide" event.
         *
         * @memberof views/wifiNetworks
         * @private
         */
        function onPageHide() {
            stopScanning();
        }
 
        /**
         * Handles click event on footer button.
         *
         * @memberof views/wifiNetworks
         * @private
         */
        function onFooterBtnClick() {
            if (scanningInterval) {
                stopScanning();
            } else {
                startScanning();
            }
            updateUI();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/wifiNetworks
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            page.addEventListener('pagehide', onPageHide);
            footerBtn.addEventListener('click', onFooterBtnClick);
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/wifiNetworks
         * @public
         */
        function init() {
            page = document.getElementById('wifi-networks');
            scanningResult = page.querySelector('#wifi-networks-result');
            footerBtn = page.querySelector('#wifi-networks-footer-btn');
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});