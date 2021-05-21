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
  
  foodS = foodObj.getFoodStock();    //added here
  
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

  foodS= foodObj.getFoodStock(); //added here
  if(foodS<= 0){
    foodObj.updateFoodStock(foodS*0);
  } else {
    foodObj.updateFoodStock(foodS-1);
  }
  foodS= foodObj.getFoodStock(); //added here
}

//function to add food in stock
function stockFood(){
  dog.addImage(sadDog);
  foodS= foodObj.getFoodStock();  //added here
  foodS=foodS+1;
  database.ref('/').update({
   foodStock:foodS
 });

}
