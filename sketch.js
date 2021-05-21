var dog,sadDog,happyDog;
var addFood, feedPet;
var database;
var foodS=0;
var foodObj;
var milk;
var lastFed;
var fedTime;


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
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
   lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :" + lastFed%12 + "PM",350,30);
    
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : " + lastFed + "AM",350,30);
  }
  
  
  drawSprites();
}


//function to read food Stock


//function to update food stock and last fed time
function Feed(){
  dog.addImage(happyDog);
  
  foodS = foodObj.getFoodStock();
foodObj.updateFoodStock(foodS-1);
  database.ref('/').update({
    foodStock:foodObj.getFoodStock(),
    FeedTime:hour()
    
  })

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
