//var acceleroSensor = tizen.sensorservice.getDefaultSensor("LINEAR_ACCELERATION");
var gravitySensor = tizen.sensorservice.getDefaultSensor("GRAVITY");

var maxAltitude = 0;

var maxVertSpeed = 0;

var maxPitch = 0;

var maxRotation = 0;

var maxTilt = 0;

var flightState = 0;

function toggleFlight()
{	
	console.log("toggleFlight" + flightState);
	
    var flightStateData = {tag: "flightState",
    		               state: flightState};
	/* Add behavior for detent detected event with a direction value */
    SASocket.sendData(SAAgent.channelIds[0], JSON.stringify(flightStateData));
}


document.addEventListener('rotarydetent', function(ev) {
    
	var direction = ev.detail.direction;
    console.log("rotate: " + direction);
    var rotaryData = {tag: "rotary",
    		          direction: direction};
	/* Add behavior for detent detected event with a direction value */
    
    var page = document.getElementsByClassName('ui-page-active')[0];
    
    switch (page.id) 
    {
		case "alt_drone":
		{
			console.log("alt_drone rotary event");
	    	if (direction == "CW")
	    	{
	    		maxAltitude++;
	    	}
	    	else if (maxAltitude != 0)
	    	{
	    		maxAltitude--;
	    	}
	    	document.getElementById("altitude-value").innerText = maxAltitude;
	    	document.getElementById("alt-value-secondline").innerText = maxAltitude;
			break;
		}
		
		case "vert_drone":
		{
			console.log("vert_drone rotary event");
	    	if (direction == "CW")
	    	{
	    		maxVertSpeed++;
	    	}
	    	else if (maxVertSpeed != 0)
	    	{
	    		maxVertSpeed--;
	    	}
	    	document.getElementById("vertspeed-value").innerText = maxVertSpeed;
	    	document.getElementById("vertspeed-value-secondline").innerText = maxVertSpeed;
			break;
		}
		
		case "pitch_drone":
		{
			console.log("pitch_drone rotary event");
	    	if (direction == "CW")
	    	{
	    		maxPitch++;
	    	}
	    	else if (maxPitch != 0)
	    	{
	    		maxPitch--;
	    	}
	    	document.getElementById("pitch-value").innerText = maxPitch;
	    	document.getElementById("pitch-value-secondline").innerText = maxPitch;
			break;
		}
		
		case "rotate_drone":
		{
			console.log("rotate_drone rotary event");
	    	if (direction == "CW")
	    	{
	    		maxRotation++;
	    	}
	    	else if (maxRotation != 0)
	    	{
	    		maxRotation--;
	    	}
	    	document.getElementById("rotate-value").innerText = maxRotation;
	    	document.getElementById("rotate-value-secondline").innerText = maxRotation;
			break;
		}
		
		case "tilt_drone":
		{
			console.log("tilt_drone rotary event");
	    	if (direction == "CW")
	    	{
	    		maxTilt++;
	    	}
	    	else if (maxTilt != 0)
	    	{
	    		maxTilt--;
	    	}
	    	document.getElementById("tilt-value").innerText = maxTilt;
	    	document.getElementById("tilt-value-secondline").innerText = maxTilt;
			break;
		}
		
		case "fly_drone":
		{
			console.log("rotary fly drone" + direction); 
			SASocket.sendData(SAAgent.channelIds[0], JSON.stringify(rotaryData));
			break;
		}
		

		default:
			break;
	}
    
	});

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
    /*if (flightState ==1)
    {
    	//SASocket.sendData(SAAgent.channelIds[0], JSON.stringify(mysensorData)); //Number((sensorData.x).toFixed(3)));	
    }*/
    SASocket.sendData(SAAgent.channelIds[0], JSON.stringify(mysensorData)); //Number((sensorData.x).toFixed(3)));
}

function emergencyClick()
{
	console.log("emergencyClick");
	
    var emergency = {tag: "emergency",
    		         something: "called"};
	/* Add behavior for detent detected event with a direction value */
    SASocket.sendData(SAAgent.channelIds[0], JSON.stringify(emergency));
}


var SAAgent,
    SASocket,
    connectionListener,
    responseTxt = document.getElementById("responseTxt");

/* Make Provider application running in background */
tizen.application.getCurrentApplication().hide();

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
            
            flightState = data;
            console.log("data geldi" + data);
            if (flightState == 0)
        	{
            	console.log("data geldi flightstate 0");
        		document.getElementById("flightState").innerText = "Land";
        		document.getElementById("fly_drone").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
        	}
        	else
        	{
        		console.log("data geldi flightstate 1");
        		document.getElementById("flightState").innerText = "Take Off";
        		document.getElementById("fly_drone").style.backgroundColor = "rgba(0, 0, 255, 0.3)";
        	}
            newData = data + " :: " + new Date();

            /* Send new data to Consumer */
            //SASocket.sendData(SAAgent.channelIds[0], newData);
            //createHTML("Send massage:<br />" +
            //            newData);
            
            //SASocket.sendData(SAAgent.channelIds[1], newData);
        };

        /* Set listener for incoming data from Consumer */
        SASocket.setDataReceiveListener(dataOnReceive);
              
        gravitySensor.setChangeListener(onAcceleroChangedCB);
        gravitySensor.start(onSuccessfulAcceleroCB, onErrorAcceleroCB);
        
    },
    onerror: function (errorCode) {
        createHTML("Service connection error<br />errorCode: " + errorCode);
    }
};

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
    SAAgent.setServiceConnectionListener(connectionListener);
};

function requestOnError (e) {
    createHTML("requestSAAgent Error" +
                "Error name : " + e.name + "<br />" +
                "Error message : " + e.message);
};

/* Requests the SAAgent specified in the Accessory Service Profile */
webapis.sa.requestSAAgent(requestOnSuccess, requestOnError);


(function () {
    /* Basic Gear gesture & buttons handler */
    window.addEventListener('tizenhwkey', function(ev) {
        var page,
            pageid;

        if (ev.keyName === "back") {
            page = document.getElementsByClassName('ui-page-active')[0];
            pageid = page ? page.id : "";
            console.log("page:" + page + "pageid: " + page.id);
            if (pageid === "main") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {
                }
            } 
            else if ( pageid == "fly_drone")
            {
            	window.location = "#main";
            }
            else {
                window.history.back();
            }
        }
    });
}());

(function(tau) {
    var toastPopup = document.getElementById('toast');

    toastPopup.addEventListener('popupshow', function(ev){
        setTimeout(function () {
            tau.closePopup();
        }, 3000);
    }, false);
})(window.tau);