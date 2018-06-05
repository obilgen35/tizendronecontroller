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
 * Main view module.
 *
 * @module views/main
 * @requires {@link views/display}
 * @requires {@link views/sound}
 * @requires {@link views/call}
 * @requires {@link views/screenLock}
 * @requires {@link views/input}
 * @requires {@link views/gearInfo}
 * @requires {@link views/device}
 * @requires {@link views/connections}
 * @requires {@link views/accessibility}
 * @requires {@link helpers/popup}
 * @namespace views/main
 */
define({
    name: 'views/settingsDrone',
    requires: [
        'views/altDrone',
        'helpers/popup'
    ],
    def: function settingsDrones(req) {
        'use strict';
 
        /**
         * Popup helper module instance.
         *
         * @memberof views/main
         * @private
         * @type {Module}
         */
        var popupHelper = req.helpers.popup,
            altDrone = req.views.altDrone,
            /**
             * Page element.
             *
             * @memberof views/main
             * @private
             * @type {HTMLElement}
             */
            //myservice = req.views.serviceConnection,
            //drone = req.views.flyDrone,
        	altValue = 0,//document.getElementById("brightness-value").innerText,
            page = null;

        function toggleFlight()
        {
        	console.log("burada...");
        }
        
        function emergencyClick()
        {
        	console.log("burada2...");
        }
        
        function flyButtonClick()
        {
        	console.log("burada3...");
        	var somevalue;
        	
        	console.log("bright" + somevalue);
        }
        
        function onPageBeforeShow() {
        	console.log("settings onpagebeforeshow");
            //pageHelper.resetScroll(page);
        	altValue = altDrone.getBrightnessValue();
            
        }
        
        function onPageShow() {
        	console.log("settings pageshow");
        	//myservice.myFunction1();
        	document.getElementById("alt-value").innerText = altValue;//"deneme";//document.getElementById("brightness-value").innerText;

        }
        
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            page.addEventListener('pageshow', onPageShow);
        	console.log("settings yüklendi");
        }
        
        /**
         * Initializes module.
         *
         * @memberof views/main
         * @public
         */
        function init() {
            console.log("settings yüklendi");
        	page = document.getElementById('settings_drone');
        	bindEvents();
        	
        }
 
        return {
            init: init
        };
    }
});