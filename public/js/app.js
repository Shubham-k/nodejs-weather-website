const form = document.querySelector(".form");
const search = document.querySelector("input");
const heading = document.querySelector(".heading");
const para1 = document.querySelector(".para1");
const para2 = document.querySelector(".para2");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          heading.innerHTML = data.error;
          console.log(data.error);
          return;
        }
        heading.innerHTML = data.address;
        para1.innerHTML = "Temprature:- " + data.cityData[0].Temp;
        para2.innerHTML = "Forecast:- " + data.cityData[0].WeatherToday;
        console.log(data.address);
        console.log("Temprature:- ", data.cityData[0].Temp);
        console.log("WeatherToday:- ", data.cityData[0].WeatherToday);
      });
    }
  );
  console.log(heading);
});
