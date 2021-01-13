var dog,happyDog;
var dogImg;
var foodS,foodStock;
var database;

var feed;
var addFood

var fedTime,lastFed;

var foodObj;

var MILKimg;
var milk;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  MILKimg = loadImage("Milk.png");
}

function setup() {
  createCanvas(700,500);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  foodObj = new Food();

  feed = createButton("FEED YOUR PET");
  feed.position(750,60);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD FOR YOUR PET");
  addFood.position(550,60);
  addFood.mousePressed(addFoods);

  dog = createSprite(600,250,5,5);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val()
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("LAST FED : " + lastFed%12 + " PM",300,75);
  }else if(lastFed === 0){
    text("LAST FED : 12 AM",300,75);
  }else{
    text("LAST FED : " + lastFed + " AM",300,75);
  }

  drawSprites();

}

function feedDog(){

  dog.addImage(happyDog);

  if(foodS>0){
  milk = createSprite(550,300,70,70);
  milk.addImage(MILKimg);
  milk.scale = 0.09;
}

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}