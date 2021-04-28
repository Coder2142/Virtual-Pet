var dog,sadDog,happyDog;
var addFood, feedPet;
var database;
var foodS=0;
var foodObj;
var milk;



function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodObj = new Food(720,220,100,100);
  
  foodObj.getFoodStock();
  
  dog=createSprite(800,200,100,100);
  dog.addImage(sadDog);
  dog.scale=0.2;
  

  feedPet = createButton('feedPet');
  feedPet.position(200,50);
  feedPet.mousePressed(Feed);

  addFood = createButton('addFood');
  addFood.position(100,50);
  addFood.mousePressed(stockFood);

}

function draw() {
  background(46,139,87);

  foodObj.display();
  
  
  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function Feed(){
  dog.addImage(happyDog);

  var food_stock_val= foodObj.getFoodStock();
  if(food_stock_val<= 0){
    foodObj.updateFoodStock(food_stock_val*0);
  } else {
    foodObj.updateFoodStock(food_stock_val-1);
  }

}

//function to add food in stock
function stockFood(){
  dog.addImage(sadDog);
  foodS=foodS+1;
  database.ref('/').update({
   foodStock:foodS
 });
}