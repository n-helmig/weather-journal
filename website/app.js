/* eslint-env es6 */
/* eslint-disable no-console */

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let apiKey = 'de2ad0d1f68916050d35ea22a52079b4'
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const middleURL = ',us&appid='
// Event listener to add function to existing HTML DOM element


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    console.log("Hello");
const zip =  document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
getWeather(baseURL, zip, middleURL , apiKey)
    .then (function(data){
            console.log("Add data from api: ", data);
            postData("/addData", {
                date: newDate, 
                temp: data.main.temp, 
                response: feelings});
        })
    .then(() => updateUI());
}
const getWeather = async (baseURL, zip, middleUrl, apiKey)=>{

  const res = await fetch(baseURL+zip+ middleUrl+apiKey)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/* Function to POST data */

const postData = async (url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST', credentials: 'same-origin', headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log ("error", error);
    }
};

/* Function to GET Project Data */

/* Global Variables */

// Create a new date instance dynamically with JS

const updateUI = async () =>{
    const request = await fetch("/all");
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML = `${allData.date}`;
    document.getElementById('temp').innerHTML = `${allData.temp}+ 'degrees'`;
    document.getElementById('content').innerHTML = `${allData.content}`;
    
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
};