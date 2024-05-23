var meals=document.querySelectorAll('.nav-item a');
var recipes=[]
getRecipes('pizza');
 function getRecipes(meal){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    httpRequest.send();
    httpRequest.addEventListener('readystatechange',function(){
        if(httpRequest.readyState==4 & httpRequest.status==200){
            recipes=JSON.parse(httpRequest.response).recipes;
           displayData();    
        }
    })
}
async function getRecipeData(Id){
    var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${Id}`);
    var recipeData=await response.json();    
    recipeData=recipeData.recipe;
    var response=`
    <img class='w-100 recipe-img' src="${recipeData.image_url}"></img>
    <h3>${recipeData.publisher}</h3>
    `
    document.getElementById('recipe-info').innerHTML=response;
}
for(var i=0;i<meals.length;i++){

    meals[i].addEventListener('click',function(e){
        getRecipes(e.target.text);
    })
}
function displayData(){

    var cols='';
     for(var i=0;i<recipes.length;i++){
         cols+=` <div class='col-md-3'>
          <div class='receipe'> 
          <img class=" w-100 receipe-img" src="${recipes[i].image_url}">
           <h4 class='my-2'> ${recipes[i].title}</h4> 
           <h4> ${recipes[i].publisher}</h4> 
           <a target='_blank' href='${recipes[i].source_url}' class='btn btn-info'>source</a> 
           <a onclick='getRecipeData(${recipes[i].recipe_id})' class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#recipeData">details</a> 
           </div> </div> ` ;
        } 
        document.getElementById('receipesData').innerHTML=cols;
}