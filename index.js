var siteName = document.querySelector("#SiteName");
var siteURL = document.querySelector("#SiteURL");
var bookMark = [];
var editedURL;

if(localStorage.getItem("bookMark") == null){
    bookMark = [];
}else{
    bookMark = JSON.parse(localStorage.getItem("bookMark"));
    display(bookMark);
}

function validateURL(){
    if(siteURL.value == ""){
        document.querySelector("#emptyURL").classList.remove("d-none");
        return false;
    }
    else{
        return true;
    }
}
function addSite(){
    if(validateName() == true && validateURL() == true){
        var Sites = {
            Name: siteName.value,
            URL: siteURL.value, 
        }
    bookMark.push(Sites);
    display(bookMark);
    localStorage.setItem("bookMark" , JSON.stringify(bookMark));
    }
}
function display(bookMark){
    var cartona = ``;
    for(var i=0; i<bookMark.length;i++ ){
        cartona += `<tr>
        <td>${bookMark[i].Name}</td>
        <td>
            <button onclick="addHttp(${i})" class="btn btn-warning btn-sm">Visit</button>
        </td>
        <td>
            <button onclick="deleteSite(${i})" class="btn btn-danger btn-sm">Delete</button>
        </td>
    </tr>`
    }
    document.querySelector("#tBody").innerHTML= cartona;
}

function deleteSite(index){
    bookMark.splice(index , 1);
    localStorage.setItem("bookMark" , JSON.stringify(bookMark));
    display(bookMark);
}
function addHttp(index){
    if (bookMark[index].URL.search("http://") == -1 && bookMark[index].URL.search("https://") == -1)
       editedURL = "http://" + bookMark[index].URL;
    else{
        editedURL = bookMark[index].URL;
    }
    Visit(editedURL);
}
function Visit(editedURL){
    window.open(editedURL , "_blank");
}
function validateName(){
    var regex = /^[A-Z][a-z]{2,10}$/;
    if(regex.test(siteName.value) == true){
        siteName.style.border = "none";
        document.querySelector("#wrongName").classList.add("d-none");
        return true
    }else{
        siteName.style.border = "5px solid red";
        document.querySelector("#wrongName").classList.remove("d-none");
        return false
    }
    //return regex.test(siteName);
    
}
