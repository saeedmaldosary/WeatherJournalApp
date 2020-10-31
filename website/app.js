// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const APIKey = '&APPID=92255ceb543d9450515e37c1aea94bd7&units=imperial';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getAPIData(url + zip + APIKey).then((data) => {
        //Add data to post request
        postData('/addData', {
            'date': newDate,
            'temp': data.main.temp,
            'content': feelings
        });
    }).then(() => {
        updateUI();
    });
}

/* Function to GET Web API Data*/
const getAPIData = async (url) => {
    const res = await fetch(url);

    try {
        let dataAPI = await res.json();
        console.log(dataAPI);
        return dataAPI;
    } catch (error) {
        console.log("error", error);
    }
}


/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

/* Function to GET Project Data */
const getData = async (url = '') => {
    const res = await fetch(url);
    try {
        let data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to update UI components */
const updateUI = async () => {
    try {
        let data = await getData('/all');
        document.getElementById('date').innerHTML = 'Date: ' + data.date;
        document.getElementById('temp').innerHTML = 'Temp: ' + data.temp;
        document.getElementById('content').innerHTML = 'Feeling: ' + data.content;
    } catch (error) {
        console.log('error', error);
    }
}