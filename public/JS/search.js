
var resultBox= document.querySelector(".result-box");
var inputBox = document.querySelector("#search-input");

var options = [];

fetch("localhost://5000/data/searchbar")
.then( res => res.json())
.then( (result) => {
    options = result.map( obj => {

        var previewUrl = obj.image.url;
        previewUrl = previewUrl.replace("/upload","/upload/w_100");

        var ele = {
            title : obj.title,
            id : obj._id,
            country : obj.country,
            location : obj.location,
            url:previewUrl
        }
        return ele;
    });
    // console.log(options);
    inputBox.onkeyup = async () => {
        var res = []
        var input =  inputBox.value;
        
    
        if(input.length){
            res = options.filter( option => {
                return (option.title.toLowerCase().includes(input.toLowerCase()) ||
                        option.country.toLowerCase().includes(input.toLowerCase()) ||
                        option.location.toLowerCase().includes(input.toLowerCase())
                    );
            });

        }
        // console.log(res);
        displayResults(res);    
    }
})
.catch(err => {
    console.log(err);
});




var displayResults = (result) => {
    var content = result.map((ele)=>{
        return `<li>
                    <a href="/listings/${ele.id}" class="search-link">
                        <img class="search-image" src="${ele.url}" alt="">
                        <div class="search-info">
                            <h5>${ele.title}</h5>
                            <i class="fa-solid fa-location-dot"></i><i> : ${ele.location} </i><br>  
                            <i class="fa-solid fa-earth-americas"></i><i> : ${ele.country} </i>
                        </div>
                    </a>
                </li><hr>`; 
    })
    // var content = result.map((ele)=>{
    //     return `<li>
    //             <a href="/listings/${ele.id}"><h5>${ele.title}</h5>
    //             <i>Location : ${ele.location} </i><br>  
    //             <i>Country : ${ele.country} </i></a>
    //           </li><hr>`; 
    // })
    // console.log(result);
    if(result.length){
        resultBox.innerHTML = "<ul>" + content.join(" ") + "</ul>";
    }else{
        resultBox.innerHTML = `<p style="color:gray;"> No Results Found </p>`
    }
}

document.addEventListener("click", (event) => {
    if (!inputBox.contains(event.target) && !resultBox.contains(event.target)) {
        resultBox.innerHTML = "";
        inputBox.value = "";
    }
});