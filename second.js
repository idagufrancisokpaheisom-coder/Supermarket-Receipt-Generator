/*
=========================================
SUPERMARKET RECEIPT GENERATOR
DOM VERSION
=========================================
*/

// Fixed supermarket products
let supermarketProducts = [
    "Rice",
    "Bread",
    "Milk",
    "Sugar",
    "Eggs",
    "Beans",
    "Oil",
    "Soap",
    "Biscuit",
    "Soft Drink"
];

// Fixed prices
let supermarketPrices = [
    4500,
    1200,
    3800,
    1700,
    3200,
    2800,
    5500,
    900,
    800,
    600
];

// Customer purchases
let productNames = [];
let productPrices = [];

let totalBill = 0;
let highestPrice = 0;
let lowestPrice = 0;
let mostExpensiveProduct = "";
let cheapestProduct = "";
let productsAbove3000 = 0;

const shoppingArea = document.getElementById("shoppingArea");
const output = document.getElementById("output");
const generateBtn = document.getElementById("generateBtn");

document.getElementById("startBtn").addEventListener("click", function(){

    shoppingArea.innerHTML = "";

    productNames = [];
    productPrices = [];

    let numberOfProducts = Number(document.getElementById("numberOfProducts").value);

    if(numberOfProducts <=0){

        alert("Enter a valid number.");

        return;
    }

    for(let i=0;i<numberOfProducts;i++){

        let div=document.createElement("div");

        div.className="productCard";

        let select=document.createElement("select");

        select.className="productSelect";

        supermarketProducts.forEach(function(product){

            let option=document.createElement("option");

            option.value=product;

            option.textContent=product;

            select.appendChild(option);

        });

        div.innerHTML="<label>Product "+(i+1)+"</label>";

        div.appendChild(select);

        shoppingArea.appendChild(div);

    }

    generateBtn.classList.remove("hidden");

});

generateBtn.addEventListener("click",function(){

    productNames=[];
    productPrices=[];

    totalBill=0;

    productsAbove3000=0;

    const selects=document.querySelectorAll(".productSelect");

    selects.forEach(function(select){

        let product=select.value;

        let found=false;

        for(let j=0;j<supermarketProducts.length;j++){

            if(product.toLowerCase()===supermarketProducts[j].toLowerCase()){

                productNames.push(supermarketProducts[j]);

                productPrices.push(supermarketPrices[j]);

                found=true;

                break;

            }

        }

    });

    highestPrice=productPrices[0];

    lowestPrice=productPrices[0];

    mostExpensiveProduct=productNames[0];

    cheapestProduct=productNames[0];

    let html="";

    html+="<div class='receipt'>";

    html+="<h2>Receipt</h2>";

    html+="<table>";

    html+="<tr><th>Product</th><th>Price</th></tr>";

    for(let i=0;i<productPrices.length;i++){

        html+="<tr>";

        html+="<td>"+productNames[i]+"</td>";

        html+="<td>₦"+productPrices[i]+"</td>";

        html+="</tr>";

        totalBill+=productPrices[i];

        if(productPrices[i]>highestPrice){

            highestPrice=productPrices[i];

            mostExpensiveProduct=productNames[i];

        }

        if(productPrices[i]<lowestPrice){

            lowestPrice=productPrices[i];

            cheapestProduct=productNames[i];

        }

        if(productPrices[i]>3000){

            productsAbove3000++;

        }

    }

    html+="</table>";

    html+="<div class='summary'>";

    html+="<h3>Total Bill : ₦"+totalBill+"</h3>";

    html+="<p><strong>Most Expensive:</strong> "+mostExpensiveProduct+" (₦"+highestPrice+")</p>";

    html+="<p><strong>Cheapest:</strong> "+cheapestProduct+" (₦"+lowestPrice+")</p>";

    html+="<p><strong>Products Above ₦3000:</strong> "+productsAbove3000+"</p>";

    html+="<p><strong>Products Below ₦2000:</strong></p>";

    for(let i=0;i<productPrices.length;i++){

        if(productPrices[i]<2000){

            html+="<p>"+productNames[i]+" - ₦"+productPrices[i]+"</p>";

        }

    }

    html+="</div>";

    html+="</div>";

    output.innerHTML=html;

});

