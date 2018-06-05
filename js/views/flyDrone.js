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
 
/*global define, document, history */
 
/**
 * Font style view module.
 *
 * @module views/flyDrone
 * @requires {@link helpers/page}
 * @namespace views/flyDrone
 */

define({
    name: 'views/flyDrone',
    requires: [
        'helpers/list',
        'helpers/page'
    ],
    def: function flyDrone(req) {
        'use strict';
 
        /**
         * Page helper module instance.
         *
         * @memberof views/fly_drone
         * @private
         * @type {Module}
         */
        var pageHelper = req.helpers.page,
        
            SASocket,
        	/**
         	* Page element.
         	*
         	* @memberof views/fly_drone
         	* @private
         	* @type {HTMLElement}
         	*/
            page = null;

        function setSASocket(socket){
        	console.log(socket + "flydrone set socket");
        	//SASocket = socket;	
        }
        
        function onSuccessfulAcceleroCB()
        {
        	console.log("Accelero sensor start");
        }

        function onErrorAcceleroCB(error)
        {
        	console.log("Accelero error occurred");
        }

        function onAcceleroChangedCB(sensorData) {
        	//console.log("x:" + sensorData.x);
        	//console.log("y:" + sensorData.y);
        	//console.log("z:" + sensorData.z);
            var mysensorData = { tag: "accelero",
            					 x: Number((sensorData.x).toFixed(3)), 
            		             y: Number((sensorData.y).toFixed(3)), 
            		             z: Number((sensorData.z).toFixed(3)) };
            //SASocket.sendData(SAAgent.channelIds[0], JSON.stringify(mysensorData)); //Number((sensorData.x).toFixed(3)));
        }
        
        function onPageBeforeShow() {
        	console.log("fly_drone onpagebeforeshow");
            pageHelper.resetScroll(page);
            
            var acceleroSensor = tizen.sensorservice.getDefaultSensor("LINEAR_ACCELERATION");
            acceleroSensor.setChangeListener(onAcceleroChangedCB);
            acceleroSensor.start(onSuccessfulAcceleroCB, onErrorAcceleroCB);
        }
        
        function onPageShow() {
        	console.log("nowww");
        	//myservice.myFunction1();
        }
 
        /**
         * Registers module's event listeners.
         *
         * @memberof views/fly_drone
         * @private
         */
        function bindEvents() {
            page.addEventListener('pagebeforeshow', onPageBeforeShow);
            page.addEventListener('pageshow', onPageShow);
        	console.log("fly yüklendi");
        }
 
        /**
         * Initializes module.
         *
         * @memberof views/fly_drone
         * @public
         */
        function init() {
            console.log("fly drone init");
        	page = document.getElementById('fly_drone');
        	document.getElementById("fly-cancel-button").addEventListener("click", emergencyClick);
            bindEvents();
        }
 
        return {
            init: init
        };
    }
});