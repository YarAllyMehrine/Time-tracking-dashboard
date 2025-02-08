const cardContainer = document.getElementById("card-container");

const fetchData = async() => {
    try {
        const res = await fetch("https://yarallymehrine.github.io/Time-tracking-dashboard/data.json")
        if (!res.ok) {
            const message = `An error has occurred: ${res.status}`;
            throw new Error(message);
        }
        const data = await res.json()
        return data;
    } 
    catch(err)  {
        console.error(err.message);
    };
}

const colorMapping = {
    "Work" : "hsl(15, 100%, 70%)",
    "Play" : "hsl(195, 74%, 62%)",
    "Study" : "hsl(348, 100%, 68%)",
    "Exercise" : "hsl(145, 58%, 55%)",
    "Social" : "hsl(264, 64%, 52%)",
    "Self Care" : "hsl(43, 84%, 65%)",
}

const cardFn = (data, timeframe) => {
    cardContainer.innerHTML = "";
    data.map(({title, timeframes}) => {
        const color = colorMapping[title];

        return cardContainer.innerHTML += `
        <div style="background-color: ${color};" class="card flex flex-col  rounded-xl">
            <div  class="card-bg flex justify-end rounded-t-lg">
                <img class="card-img size-10" src="./images/icon-${title.toLowerCase().replace(/\s+/g, '-')}.svg" alt="" />
            </div>
            <div class="card-content rounded-xl cursor-pointer">
                <div class="card-title flex items-center justify-between">
                    <h2 class="text-white font-medium"> ${title} </h2>
                    <img class="card-icon" src="./images/icon-ellipsis.svg" alt=""/>
                </div>

                <div class="card-time flex items-center justify-between md:flex-col items-start">
                    <h2 class="current-time text-2xl text-white font-light"> ${timeframes[timeframe].current}hrs </h2>
                    <p class="previous-text-time text-sm">${textTime(timeframe)} - 
                        <span class="previous-time"> ${timeframes[timeframe].previous}hrs </span>
                    </p>
                </div>
            </div>
        </div>
        `
    })
}

const handleButton = (timeframe) => {
    fetchData().then((data) => {
        return cardFn(data, timeframe);
    });  
}

const textTime = (timeframe) => {
    if (timeframe === "daily") {
        return "Yesterday";
    } else if (timeframe === "weekly") {
        return "Last week";
    } else {
        return "Last month"
    }
}

// Event listeners for buttons
$("#daily").click(() => handleButton("daily"));
$("#weekly").click(() => handleButton("weekly"));
$("#monthly").click(() => handleButton("monthly"));

// Initial default fetch (weekly) 
fetchData().then((data) => {
    cardFn(data, "weekly");
});

