fetch("./data.json")
    .then((res) => {
        if(res.ok) {
            return console.log("Data not fetched!")
        }
        return res.json();
    })
    .then((data) => {
        console.log(data);
    })