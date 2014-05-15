// Firebase url: https://luminous-fire-7183.firebaseio.com/
// This is a service that runs every 15 seconds to update sessionStorage and localStorage from firebase
// You can add any object to sessionStorage and it will get sent the next time the service runs.
// Read out the latest firebase objects from localStorage (anything written to localstorage will be erased
//   every 15 seconds)

//Function which handles sending new sessionStorage objects to Firebase
var postTweet = function () {
    for (var i = 0; i < sessionStorage.length; i++) {
        var request = new XMLHttpRequest();
        request.open("POST", "https://luminous-fire-7183.firebaseio.com/.json", true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                //Successful
                var data = JSON.parse(this.response);
                console.log(data);
                sessionStorage.clear();
            } else {
                //Request failed
                console.log(this.response);
            }
        };
        request.onerror = function () {
            //Connection fails
            console.log("Whoops, connection failed!");
        };


        request.send(sessionStorage[i]);
    }
}

// Function which handles updating our localStorage from firebase every 15 seconds
var getFireBaseData = function () {
    var request = new XMLHttpRequest();
    request.open("GET", "https://luminous-fire-7183.firebaseio.com/.json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            //Successful
            var data = JSON.parse(this.response);
            localStorage.clear();
            for (var propName in data) {
                localStorage.setItem(propName, JSON.stringify(data[propName]))
            }
        } else {
            //Request failed
            console.log(this.response);
        }
    };
    request.onerror = function () {
        //Connection fails
        console.log("Whoops, connection failed!");
    };
    request.send();
}

// Timer function which calls itself using setTimeout every 15 seconds. It sends objects from sessionStorage,
// clears both session and local storage, then gets the latest objects from Firebase.
var scheduleNextUpdate = function () {
    postTweet();
    getFireBaseData();
    setTimeout(scheduleNextUpdate, 15000)
}
scheduleNextUpdate();