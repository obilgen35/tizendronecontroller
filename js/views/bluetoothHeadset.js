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
 * Bluetooth headset view module.
 *
 * @module views/bluetoothHeadset
 * @namespace views/bluetoothHeadset
 */
define({
    name: 'views/bluetoothHeadset',
    requires: [],
    def: function bluetoothHeadset() {
        'use strict';
 
        /**
         * Scanning max time.
         *
         * @memberof views/bluetoothHeadset
         * @private
         * @const {number}
         */
        var SCANNING_MAX_TIME = 5,
 
            /**
             * Page element.
             *
             * @memberof views/bluetoothHeadset
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Scanning interval.
             *
             * @memberof views/bluetoothHeadset
             * @private
             * @type {object}
             */
            scanningInterval = null,
 
            /**
             * Bluetooth headset result element.
             *
             * @memberof views/bluetoothHeadset
             * @private
             * @type {HTMLElement}
             */
            bluetoothHeadsetResult = null,
 
            /**
             * Bluetooth headset footer button element.
             *
             * @memberof views/bluetoothHeadset
             * @private
             * @type {HTMLElement}
             */
            bluetoothHeadsetFooterBtn = null,
 
            /**
             * Scanning counter.
             *
             * @memberof views/bluetoothHeadset
             * @private
             * @type {number}
             */
            scanningCounter = 0;
 
        /**
         * Updates UI.
         *
         * @memberof views/bluetoothHeadset
         * @private
         */
        function updateUI() {
            if (scanningInterval) {
                bluetoothHeadsetResult.innerText = 'Scanning...';
                bluetoothHeadsetFooterBtn.innerText = 'STOP';
            } else {
                bluetoothHeadsetResult.innerText = 'None found';
                bluetoothHeadsetFooterBtn.innerText = 'SCAN';
            }
        }
 
        /**
         * Stops scanning for bluetooth devices.
         *
         * @memberof views/bluetoothHeadset
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
         * @memberof views/bluetoothHeadset
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
         * Starts scanning for bluetooth devices.
         *
         * @memberof views/bluetoothHeadset
         * @private
         */
        function startScanning() {
            scanningInterval = setInterval(incrementScanningCounter, 1000);
        }
 
        /**
         * Handles "pagebeforeshow" event.
         *
         * @memberof views/bluetoothHeadset
         * @private
         */
        function onPageBeforeShow() {
            startScanning();
            updateUI();
        }
 
        /**
         * Handles "pagehide" event.
         *
         * @memberof views/bluetoothHeadset
         * @private
         */
        function onPageHide() {
            stopScanning();
        }
 
        /**
         * Handles click event on bluetooth headset footer button.
         *
         * @memberof views/bluetoothHeadset
         * @private
         */
        function onBluetoothHeadsetFooterBtnClick() {
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
         * @memberof views/bluetoothHeadset
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            page.addEventListener('pagehide', onPageHide);
            bluetoothHeadsetFooterBtn.addEventListener(
                'click',
                onBluetoothHeadsetFooterBtnClick
            );
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/bluetoothHeadset
         * @public
         */
        function init() {
            page = document.getElementById('bluetooth-headset');
            bluetoothHeadsetResult = page.querySelector(
                '#bluetooth-headset-result'
            );
            bluetoothHeadsetFooterBtn = page.querySelector(
                '#bluetooth-headset-footer-btn'
            );
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});