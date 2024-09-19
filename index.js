const baseurl = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api"

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");



for(let select of dropdown){
    for (currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change" , (evt)=>{
        updateFlag(evt.target);
    })

}
const updateexchange = async() =>{
    let amount = document.querySelector(".amount input");
    let amountval = amount.value;
    if(amountval == "" || amountval <0){
        amountval =1;
        amount.value= "1";

    }
   
    const url = `${baseurl}/${fromcurr.value}_${tocurr.value}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    let finalamount = amountval*rate;
    msg.innerText = `${amountval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
}

const updateFlag = (element)=>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateexchange();
  });
window.document.addEventListener("load", ()=>{

    updateexchange();
} );