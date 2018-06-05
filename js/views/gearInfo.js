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
 
/*global define, document, tau, setTimeout*/
 
/**
 * Gear info view module.
 *
 * @module views/gearInfo
 * @requires {@link views/aboutDevice}
 * @requires {@link views/resetGear}
 * @requires {@link helpers/list}
 * @requires {@link helpers/popup}
 * @requires {@link helpers/page}
 * @namespace views/gearInfo
 */
define({
    name: 'views/gearInfo',
    requires: [
        'views/aboutDevice',
        'views/resetGear',
        'helpers/list',
        'helpers/popup',
        'helpers/page'
    ],
    def: function gearInfo(req) {
        'use strict';
 
        /**
         * List helper module instance.
         *
         * @memberof views/gearInfo
         * @private
         * @type {Module}
         */
        var listHelper = req.helpers.list,
 
            /**
             * List helper module instance.
             *
             * @memberof views/gearInfo
             * @private
             * @type {Module}
             */
            popupHelper = req.helpers.popup,
 
            /**
             * Page helper module instance.
             *
             * @memberof views/gearInfo
             * @private
             * @type {Module}
             */
            pageHelper = req.helpers.page,
 
            /**
             * Page element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            page = null,
 
            /**
             * Report diagnostic element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            reportDiagnostic = null,
 
            /**
             * Report diagnostic popup element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            reportDiagnosticPopup = null,
 
            /**
             * Report diagnostic toggle switch element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            reportDiagnosticToggleSwitch = null,
 
            /**
             * Report diagnostic input element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            reportDiagnosticInput = null,
 
            /**
             * Report diagnostic popup ok button.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            reportDiagnosticPopupOkBtn = null,
 
            /**
             * Report diagnostic popup see all button.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            reportDiagnosticPopupSeeAllBtn = null,
 
            /**
             * Debugging element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            debugging = null,
 
            /**
             * Debugging popup element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            debuggingPopup = null,
 
            /**
             * Debugging toggle switch element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            debuggingToggleSwitch = null,
 
            /**
             * Debugging input element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            debuggingInput = null,
 
            /**
             * Debugging popup ok button.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            debuggingPopupOkBtn = null,
 
            /**
             * Debugging see all popup element.
             *
             * @memberof views/gearInfo
             * @private
             * @type {HTMLElement}
             */
            reportDiagnosticSeeAllPopup = null,
 
            /**
             * Indicates whether see all button has been clicked.
             *
             * @memberof views/gearInfo
             * @private
             * @type {boolean}
             */
            seeAllClicked = false,
 
            /**
             * Indicates whether see all popup has been closed.
             *
             * @memberof views/gearInfo
             * @private
             * @type {boolean}
             */
            seeAllClosed = false;
 
        /**
         * Handles click event on report diagnostic element.
         *
         * @memberof views/gearInfo
         * @private
         */
        function onReportDiagnosticClick() {
            if (reportDiagnosticInput.checked) {
                reportDiagnosticToggleSwitch.click();
            } else {
                tau.openPopup(reportDiagnosticPopup);
            }
        }
 
        /**
         * Handles click event on report diagnostic popup ok button.
         *
         * @memberof views/gearInfo
         * @private
         */
        function onReportDiagnosticPopupOkBtnClick() {
            reportDiagnosticToggleSwitch.click();
        }
 
        /**
         * Handles click event on report diagnostic popup see all button.
         *
         * @memberof views/gearInfo
         * @private
         */
        function onReportDiagnosticPopupSeeAllBtnClick() {
            seeAllClicked = true;
            tau.closePopup();
        }
 
        /**
         * Handles click event on toggle switch element.
         *
         * @memberof views/gearInfo
         * @private
         * @param {Event} e
         */
        function onReportDiagnosticToggleSwitchClick(e) {
            e.stopPropagation();
        }
 
        /**
         * Handles click event on debugging element.
         *
         * @memberof views/gearInfo
         * @private
         */
        function onDebuggingClick() {
            if (debuggingInput.checked) {
                debuggingToggleSwitch.click();
            } else {
                tau.openPopup(debuggingPopup);
            }
        }
 
        /**
         * Handles click event on debugging popup ok button.
         *
         * @memberof views/gearInfo
         * @private
         */
        function onDebuggingPopupOkBtnClick() {
            debuggingToggleSwitch.click();
        }
 
        /**
         * Handles click event on toggle switch element.
         *
         * @memberof views/gearInfo
         * @private
         * @param {Event} e
         */
        function onDebuggingToggleSwitchClick(e) {
            e.stopPropagation();
        }
 
        /**
         * Resets report diagnostic popup element scroll position.
         *
         * @memberof views/gearInfo
         * @private
         */
        function resetReportDiagnosticPopupPosition() {
            reportDiagnosticPopup.querySelector('.ui-popup-wrapper')
                .scrollTop = 0;
        }
 
        /**
         * Handles popupbeforeshow event on report diagnostic popup element.
         *
         * @memberof views/gearInfo
         * @private
         */
        function onReportDiagnosticPopupBeforeShow() {
            if (seeAllClosed) {
                seeAllClosed = false;
            } else {
                setTimeout(resetReportDiagnosticPopupPosition, 0);
            }
        }
 
        /**
         * Handles popuphide event on report diagnostic popup element.
         *
         * @memberof views/gearInfo
         * @private
         */
        function onReportDiagnosticPopupHide() {
            if (seeAllClicked) {
                seeAllClicked = false;
                tau.openPopup(reportDiagnosticSeeAllPopup);
            }
        }
 
        /**
         * Handles popuphide event on report diagnostic see all popup element.
         *
         * @memberof views/gearInfo
         * @private
         */
        function onReportDiagnosticSeeAllPopupHide() {
            seeAllClosed = true;
            tau.openPopup(reportDiagnosticPopup);
        }
 
        /**
         * Handles pagebeforeshow event page element.
         *
         * @memberof views/gearInfo
         * @private
         */
        function onPageBeforeShow() {
            pageHelper.resetScroll(page);
        }
 
        /**
         * Registers event listeners.
         *
         * @memberof views/gearInfo
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            reportDiagnostic.addEventListener('click', onReportDiagnosticClick);
            reportDiagnosticToggleSwitch.addEventListener(
                'click',
                onReportDiagnosticToggleSwitchClick
            );
            reportDiagnosticPopupOkBtn.addEventListener(
                'click',
                onReportDiagnosticPopupOkBtnClick
            );
            reportDiagnosticPopupSeeAllBtn.addEventListener(
                'click',
                onReportDiagnosticPopupSeeAllBtnClick
            );
            debugging.addEventListener('click', onDebuggingClick);
            debuggingToggleSwitch.addEventListener(
                'click',
                onDebuggingToggleSwitchClick
            );
            debuggingPopupOkBtn.addEventListener(
                'click',
                onDebuggingPopupOkBtnClick
            );
            reportDiagnosticPopup.addEventListener(
                'popupbeforeshow',
                onReportDiagnosticPopupBeforeShow
            );
            reportDiagnosticPopup.addEventListener(
                'popuphide',
                onReportDiagnosticPopupHide
            );
            reportDiagnosticSeeAllPopup.addEventListener(
                'popuphide',
                onReportDiagnosticSeeAllPopupHide
            );
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/gearInfo
         * @public
         */
        function init() {
            page = document.getElementById('gear-info');
            reportDiagnostic = document.getElementById('report-diagnostic');
            reportDiagnosticPopup = document.getElementById(
                'report-diagnostic-popup'
            );
            reportDiagnosticPopupOkBtn = document.getElementById(
                'report-diagnostic-popup-ok-btn'
            );
            reportDiagnosticPopupSeeAllBtn = document.getElementById(
                'report-diagnostic-popup-see-all-btn'
            );
            reportDiagnosticToggleSwitch = reportDiagnostic.querySelector(
                '.ui-toggleswitch'
            );
            reportDiagnosticInput = document.getElementById(
                'report-diagnostic-input'
            );
            debugging = document.getElementById('debugging');
            debuggingPopup = document.getElementById(
                'debugging-popup'
            );
            debuggingPopupOkBtn = document.getElementById(
                'debugging-popup-ok-btn'
            );
            debuggingToggleSwitch = debugging.querySelector(
                '.ui-toggleswitch'
            );
            debuggingInput = document.getElementById(
                'debugging-input'
            );
            reportDiagnosticSeeAllPopup = document.getElementById(
                'report-diagnostic-see-all-popup'
            );
 
            bindEvents();
 
            listHelper.marquee(page.querySelector('.ui-listview'));
            popupHelper.resetScrollBeforeOpen(reportDiagnosticSeeAllPopup);
            popupHelper.resetScrollBeforeOpen(debuggingPopup);
        }
 
        return {
            init: init
        };
    }
});