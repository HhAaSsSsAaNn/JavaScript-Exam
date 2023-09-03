let navItems =  $("#menu .nav-item");
let http = [];
let mealsDiv = $(".mealsDiv");
let CatsDiv = $(".categories");
let homeMealsDiv = $(".homeMealsDiv");
let areasDiv = $(".areasDiv");
let ingDiv = $(".ingDiv");

homeClicked()

function clearDivs(){
    mealsDiv.html("")
    CatsDiv.html("")
    homeMealsDiv.html("")
    areasDiv.html("")
    ingDiv.html("")
}

function catClicked(){
    $("#search").hide()
    $("#instructions").hide() 
    $("#home").hide() 
    $("#ingr").hide() 
    $("#area").hide() 
    
    clearDivs();
    
    $("#category").show()
    getCategories()
}

function homeClicked(){
    $("#search").hide()
    $("#instructions").hide() 
    $("#category").hide() 
    $("#ingr").hide() 
    $("#area").hide() 
    
    clearDivs();
    
    $("#home").show()
    homeNameData()
}

function areaClicked(){
    $("#search").hide()
    $("#instructions").hide() 
    $("#home").hide() 
    $("#ingr").hide() 
    $("#category").hide()  
    
    clearDivs();

    $("#area").show()
    getAreas()
}

function ingClicked(){
    $("#search").hide()
    $("#instructions").hide() 
    $("#home").hide() 
    $("#area").hide() 
    $("#category").hide()  
    
    clearDivs();

    $("#ingr").show()
    getIng()
}

function searchClicked(){
    $("#ara").hide()
    $("#instructions").hide() 
    $("#home").hide() 
    $("#ingr").hide() 
    $("#category").hide()

    clearDivs();

    $("#search").show()

}

async function getCategories(){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)).json();
    console.log(http);
    drawCats(http.categories);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}

async function getAreas(){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)).json();
    console.log(http);
    drawAreas(http.meals);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}
async function getIng(){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)).json();
    console.log(http);
    drawIngs(http.meals);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}

async function filterByCategories(name){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)).json();
    console.log(http);
    drawHomeMeals(http.meals);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}
async function filterBying(name){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)).json();
    console.log(http);
    drawHomeMeals(http.meals);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}
async function filterByareas(name){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`)).json();
    console.log(http);
    drawHomeMeals(http.meals);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}

async function searchByName(name=""){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)).json();
    console.log(http);
    drawMeals(http.meals);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}

async function homeNameData(name=""){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)).json();
    console.log(http);
    homeMealsDiv.show()
    drawHomeMeals(http.meals);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}
async function searchById(id){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
    console.log(http);
    drawMeals(http.meals);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}
async function searchByFirstLetter(char){
    try{
        http = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)).json();
    drawMeals(http.meals);
    }
    catch(ex){
        console.log(ex);
        alert("Error retreving data")
    }
    
}

$("#searchByName").on("input", function() {
    searchByName(this.value);
 });
$("#searchByFirstLetter").on("input", function() {
    searchByFirstLetter(this.value);
 });

$(".side-nav-menu li").click(function(){
    let choosenColor = $(this).css("backgroundColor");
    localStorage.setItem("cColor", choosenColor);

    $(":root").css("--mainColor", choosenColor)
})

$(".navDisplay").click(function(){
    toogleNavMenu()
})

function drawMeals(meals){
    let container = ""
    for (let i = 0; i < meals.length; i++) {
        container += `<div class="col-3">
        <div data-id="${i}" class="position-relative meal">
            <span data-id="${i}" hidden>${meals[i].idMeal}</span>
            <img data-id="${i}" class="w-100 meal-img" src="${meals[i].strMealThumb}" alt="" srcset="">
            <div id="${i}" class="position-absolute meal-name">
            <h3>${meals[i].strMeal}</h3>
            </div>
        </div>
    </div>`
        mealsDiv.html(container);
    }
    $(".meal").hover(
        function(){
            $(`.meal-name#${$(this).attr("data-id")}`).slideToggle()
        },
        function(){$(`.meal-name#${$(this).attr("data-id")}`).slideToggle()}
    )

    $(".meal-name").click(function(){
        $("#search").hide()
        $("#instructions").show()

        let inst =  `<div class="col-lg-4 text-center text-white">
        <img class="rounded w-100" src="${http.meals[$(this).attr("id")].strMealThumb}" alt="">
        <h3>${http.meals[$(this).attr("id")].strMeal}</h3>
    </div>
    <div class="col-lg-8 text-white">
        <h3>Instructions</h3>
        <p>${http.meals[$(this).attr("id")].strInstructions}</p>
        <h2>Area: ${http.meals[$(this).attr("id")].strArea}</h2>
        <h2>Category: ${http.meals[$(this).attr("id")].strCategory}</h2>
        <h2>Recipes : </h2>
        <div class="ingreds px-3 text-black"></div>
    </div>`;

    let ing = ""
        ing += http.meals[$(this).attr("id")].strMeasure1  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure1 + http.meals[$(this).attr("id")].strIngredient1}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure2  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure2 + http.meals[$(this).attr("id")].strIngredient2}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure3  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure3 + http.meals[$(this).attr("id")].strIngredient3}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure4  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure4 + http.meals[$(this).attr("id")].strIngredient4}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure5  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure5 + http.meals[$(this).attr("id")].strIngredient5}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure6  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure6 + http.meals[$(this).attr("id")].strIngredient6}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure7  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure7 + http.meals[$(this).attr("id")].strIngredient7}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure8  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure8 + http.meals[$(this).attr("id")].strIngredient8}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure9  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure9 + http.meals[$(this).attr("id")].strIngredient9}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure10 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure10 + http.meals[$(this).attr("id")].strIngredient10}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure11 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure11 + http.meals[$(this).attr("id")].strIngredient11}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure12 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure12 + http.meals[$(this).attr("id")].strIngredient12}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure13 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure13 + http.meals[$(this).attr("id")].strIngredient13}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure14 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure14 + http.meals[$(this).attr("id")].strIngredient14}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure15 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure15 + http.meals[$(this).attr("id")].strIngredient15}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure16 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure16 + http.meals[$(this).attr("id")].strIngredient16}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure17 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure17 + http.meals[$(this).attr("id")].strIngredient17}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure18 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure18 + http.meals[$(this).attr("id")].strIngredient18}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure19 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure19 + http.meals[$(this).attr("id")].strIngredient19}</span>`: ""
        ing += http.meals[$(this).attr("id")].strMeasure20 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[$(this).attr("id")].strMeasure20 + http.meals[$(this).attr("id")].strIngredient20}</span>`: ""


    $(".meal-details").html(inst)

    $(".ingreds").html(ing)
    })
}

function drawCats(cats){
    let container = ""
    for (let i = 0; i < cats.length; i++) {
        container += `<div class="col-3">
        <div data-id="${i}" class="position-relative cat">
            <span data-id="${i}" hidden>${cats[i].idCategory}</span>
            <img data-id="${i}" class="w-100 cat-img" src="${cats[i].strCategoryThumb}" alt="" srcset="">
            <div data-id="${i}" class="position-absolute cat-name">
            <h3 id="${i}">${cats[i].strCategory}</h3>
            <span>${cats[i].strCategoryDescription}</span>
            </div>
        </div>
    </div>`
    CatsDiv.html(container);
    }
    $(".cat").hover(
        function(){
            
            $(`.cat-name[data-id='${$(this).attr("data-id")}']`).slideToggle()
            console.log($(this).attr("data-id"))
        },
        function(){$(`.cat-name[data-id='${$(this).attr("data-id")}']`).slideToggle()}
    )

    $(".cat-name").click(async function(){
  
        $("#home").show()
        $("#category").hide()
        
        await filterByCategories($(`h3#${$(this).attr("data-id")}`).html())
        CatsDiv.html("")
       
    })
}

function drawAreas(areas){
    let container = ""
    for (let i = 0; i < areas.length; i++) {
        container += `<div class="col-3">
        <div data-id="${i}" class="position-relative area text-white">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h4 id="${i}">${areas[i].strArea}</h4>
        </div>
    </div>`
    areasDiv.html(container);
    }

    $(".area").click(async function(){
  
        $("#home").show()
        $("#category").hide()
        $("#area").hide()
        console.log($(`h4#${$(this).attr("data-id")}`), $(this).attr("data-id") )
        await filterByareas($(`h4#${$(this).attr("data-id")}`).html())
        areasDiv.html("")
       
    })
}
function drawIngs(ings){
    let container = ""
    for (let i = 0; i < ings.length; i++) {
        container += `<div class="col-3">
        <div data-id="${i}" class="position-relative ingrediance text-white">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h4 id="${i}">${ings[i].strIngredient}</h4>
            <p>${ings[i].strDescription}</p>
        </div>
    </div>`
    ingDiv.html(container);
    }

    $(".ingrediance").click(async function(){
  
        $("#home").show()
        $("#category").hide()
        $("#area").hide()
        $("#ingr").hide()
        console.log($(`h4#${$(this).attr("data-id")}`), $(this).attr("data-id") )
        await filterBying($(`h4#${$(this).attr("data-id")}`).html())
        ingDiv.html("")
       
    })
}

function drawHomeMeals(meals){
    clearDivs();
    let container = ""
    for (let i = 0; i < meals.length; i++) {
        container += `<div class="col-3">
        <div data-id="${i}" class="position-relative meal">
            <span data-id="${i}" hidden>${meals[i].idMeal}</span>
            <img data-id="${i}" class="w-100 meal-img" src="${meals[i].strMealThumb}" alt="" srcset="">
            <div id="${i}" class="position-absolute meal-name">
            <h3>${meals[i].strMeal}</h3>
            </div>
        </div>
    </div>`
        homeMealsDiv.html(container);
    }
    $(".meal").hover(
        function(){
            
            $(`.meal-name#${$(this).attr("data-id")}`).slideToggle()
            console.log($(this).attr("data-id"))
        },
        function(){$(`.meal-name#${$(this).attr("data-id")}`).slideToggle()}
    )

    $(".meal-name").click(async function(){
        $("#home").hide()
        $("#instructions").show()
        await searchById(http.meals[$(this).attr("id")].idMeal)

        console.log("hiiiiiii" ,http.meals[0])
        let inst =  `<div class="col-lg-4 text-center text-white">
        <img class="rounded w-100" src="${http.meals[0].strMealThumb}" alt="">
        <h3>${http.meals[0].strMeal}</h3>
    </div>
    <div class="col-lg-8 text-white">
        <h3>Instructions</h3>
        <p>${http.meals[0].strInstructions}</p>
        <h2>Area: ${http.meals[0].strArea}</h2>
        <h2>Category: ${http.meals[0].strCategory}</h2>
        <h2>Recipes : </h2>
        <div class="ingreds px-3 text-black"></div>
    </div>`;

    let ing = ""
        ing += http.meals[0].strMeasure1  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure1 + http.meals[0].strIngredient1}</span>`: ""
        ing += http.meals[0].strMeasure2  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure2 + http.meals[0].strIngredient2}</span>`: ""
        ing += http.meals[0].strMeasure3  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure3 + http.meals[0].strIngredient3}</span>`: ""
        ing += http.meals[0].strMeasure4  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure4 + http.meals[0].strIngredient4}</span>`: ""
        ing += http.meals[0].strMeasure5  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure5 + http.meals[0].strIngredient5}</span>`: ""
        ing += http.meals[0].strMeasure6  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure6 + http.meals[0].strIngredient6}</span>`: ""
        ing += http.meals[0].strMeasure7  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure7 + http.meals[0].strIngredient7}</span>`: ""
        ing += http.meals[0].strMeasure8  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure8 + http.meals[0].strIngredient8}</span>`: ""
        ing += http.meals[0].strMeasure9  != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure9 + http.meals[0].strIngredient9}</span>`: ""
        ing += http.meals[0].strMeasure10 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure10 + http.meals[0].strIngredient10}</span>`: ""
        ing += http.meals[0].strMeasure11 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure11 + http.meals[0].strIngredient11}</span>`: ""
        ing += http.meals[0].strMeasure12 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure12 + http.meals[0].strIngredient12}</span>`: ""
        ing += http.meals[0].strMeasure13 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure13 + http.meals[0].strIngredient13}</span>`: ""
        ing += http.meals[0].strMeasure14 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure14 + http.meals[0].strIngredient14}</span>`: ""
        ing += http.meals[0].strMeasure15 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure15 + http.meals[0].strIngredient15}</span>`: ""
        ing += http.meals[0].strMeasure16 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure16 + http.meals[0].strIngredient16}</span>`: ""
        ing += http.meals[0].strMeasure17 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure17 + http.meals[0].strIngredient17}</span>`: ""
        ing += http.meals[0].strMeasure18 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure18 + http.meals[0].strIngredient18}</span>`: ""
        ing += http.meals[0].strMeasure19 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure19 + http.meals[0].strIngredient19}</span>`: ""
        ing += http.meals[0].strMeasure20 != " " ? `<span class="bg-primary-subtle rounded p-1 mx-1">${http.meals[0].strMeasure20 + http.meals[0].strIngredient20}</span>`: ""


    $(".meal-details").html(inst)

    $(".ingreds").html(ing)
    })
}


function toogleNavMenu(){
    let totalWidth = $(".navMenu").outerWidth(true)
    // $(".navItems").replaceClass($(".side-nav-menu").css("left") == "0px"? "d-flex": "d-block", $(".side-nav-menu").css("left") == "0px"? "d-block": "d-flex" ); 
    navItems.toggleClass("slideItem")
    $("section").toggleClass("offset-slide")
    $(".form-field").toggleClass("col-lg-5 col-lg-6")
    if (navItems.hasClass("slideItem")) {
        navItems.animate({top: totalWidth},100);
    }
    else{
        let interval = setInterval(toggleNavItems,50)
        let counter = 0;
        function toggleNavItems(){
            navItems[counter].style.top = "0px";
            counter++;
            if (counter >= navItems.length) {
                clearInterval(interval);
            }
        }
    }
    
    
    $(".side-nav-menu").animate({left: $(".side-nav-menu").css("left") == "0px"? -totalWidth: "0px"}, 500)
}