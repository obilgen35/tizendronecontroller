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
 * @module views/serviceConnection
 * @namespace views/main
 */
define({
    name: 'views/serviceConnection',
    requires: [],
    def: function serviceConnection() {
        'use strict';
 
        /**
         * Popup helper module instance.
         *
         * @memberof views/main
         * @private
         * @type {Module}
         */
        var 
            /**
             * Page element.
             *
             * @memberof views/main
             * @private
             * @type {HTMLElement}
             */
        	SAAgent,
        	SASocket,
        	connectionListener;
        
        function getSASocket()
        {
        	console.log("naber la");
        	return SASocket;
        }
        
        function createHTML(log_string)
        {
            var content = document.getElementById("toast-content");
            content.innerHTML = log_string;
            tau.openPopup("#toast");
        }
        
        connectionListener = {
        	    /* Remote peer agent (Consumer) requests a service (Provider) connection */
        	    onrequest: function (peerAgent) {

        	        createHTML("peerAgent: peerAgent.appName<br />" +
        	                    "is requsting Service conncetion...");

        	        /* Check connecting peer by appName*/
        	        if (peerAgent.appName === "HelloAccessoryConsumer") {
        	            SAAgent.acceptServiceConnectionRequest(peerAgent);
        	            createHTML("Service connection request accepted.");

        	        } else {
        	            SAAgent.rejectServiceConnectionRequest(peerAgent);
        	            createHTML("Service connection request rejected.");

        	        }
        	    },

        	    /* Connection between Provider and Consumer is established */
        	    onconnect: function (socket) {
        	        var onConnectionLost,
        	            dataOnReceive;
        	        
        	        createHTML("Service connection established");

        	        /* Obtaining socket */
        	        SASocket = socket;
        	        
        	        SASocket.sendData(SAAgent.channelIds[0], "Test String to first channel.");
        	        
        	        onConnectionLost = function onConnectionLost (reason) {
        	            createHTML("Service Connection disconnected due to following reason:<br />" + reason);
        	        };

        	        /* Inform when connection would get lost */
        	        SASocket.setSocketStatusListener(onConnectionLost);

        	        dataOnReceive =  function dataOnReceive (channelId, data) {
        	            var newData;

        	            if (!SAAgent.channelIds[0]) {
        	                createHTML("Something goes wrong...NO CHANNEL ID!");
        	                return;
        	            }
        	            
        	            console.log("data geldi" + data);
        	            if (data == 0)
        	        	{
        	            	//flydrone.serviceData("Land");
        	            	console.log("data geldi flightstate 0");
        	        		document.getElementById("flightState").innerText = "Land";
        	        	}
        	        	else
        	        	{
        	        		//flydrone.serviceData("Take Off");
        	        		console.log("data geldi flightstate 1");
        	        		document.getElementById("flightState").innerText = "Take Off";
        	        	}
        	            
        	            
        	            newData = data + " :: " + new Date();

        	            /* Send new data to Consumer */
        	            //SASocket.sendData(SAAgent.channelIds[0], newData);
        	            createHTML("Send massage:<br />" +
        	                        newData);
        	            
        	            //SASocket.sendData(SAAgent.channelIds[1], newData);
        	        };

        	        /* Set listener for incoming data from Consumer */
        	        SASocket.setDataReceiveListener(dataOnReceive);
        	        
        	    },
        	    onerror: function (errorCode) {
        	        createHTML("Service connection error<br />errorCode: " + errorCode);
        	    }
        	};
        /**
         * List helper module instance.
         * @type {Module}
         */
        function requestOnSuccess (agents) {
            var i = 0;

            for (i; i < agents.length; i += 1) {
                if (agents[i].role === "PROVIDER") {
                    createHTML("Service Provider found!<br />" +
                                "Name: " +  agents[i].name);
                    SAAgent = agents[i];
                    break;
                }
            }

            /* Set listener for upcoming connection from Consumer */
            console.log("request On success - oguz");
            SAAgent.setServiceConnectionListener(connectionListener);
        }

        function requestOnError (e) {
            createHTML("requestSAAgent Error" +
                        "Error name : " + e.name + "<br />" +
                        "Error message : " + e.message);
            
            console.log("" + e.name +"  " + e.message );
        }
        
        function initializeSASocket()
        {
        	/* Requests the SAAgent specified in the Accessory Service Profile */
        	console.log("SASocket");
        	webapis.sa.requestSAAgent(requestOnSuccess, requestOnError);	
        }
        
        
        /**
         * Initializes module.
         *
         * @memberof views/main
         * @public
         */
        function init() {
            console.log("serviceConnection yüklendi");    
            
            var toastPopup = document.getElementById('toast');

            toastPopup.addEventListener('popupshow', function(ev){
                setTimeout(function () {
                    tau.closePopup();
                }, 3000);
            }, false);
            
            initializeSASocket();
        }
 
        return {
            init: init
        };
    }
});