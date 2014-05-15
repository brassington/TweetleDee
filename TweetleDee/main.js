//New fake tweet that I'll keep sending in to firebase the first time the page loads.
var tweet = {
    name: "Andrew",
    message: "I'm teaching an awesome class right now!"
};

// Example of adding something to session storage that will eventually get sent
// to firebase when the FirebaseService kicks off every 15 seconds.
if (sessionStorage.length) {
    sessionStorage.setItem(JSON.stringify(sessionStorage[sessionStorage.length]), JSON.stringify(tweet));
} else {
    sessionStorage.setItem(0, JSON.stringify(tweet));
}

// NOT REQUIRED: Example of reading values out of session storage, then looping through localstorage to show the latest from both session and local all at once.
//for (var propName in sessionStorage) {
//    document.getElementById("container").innerHTML +=
//    JSON.parse(sessionStorage[propName])["name"] +
//    ': ' +
//    JSON.parse(sessionStorage[propName])["message"] + "<br />";
//}

// Now reading values out of localstorage, so that it will eventually get updated from firebase when the FirebaseService kicks off every 15 seconds.
for (var propName in localStorage) {
    document.getElementById("container").innerHTML +=
    JSON.parse(localStorage[propName])["name"] +
    ': ' +
    JSON.parse(localStorage[propName])["message"] + "<br />";
}
