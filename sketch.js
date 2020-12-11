var dog,dogstand,doghappy;
var database,foodS,foodStock;
var fedTime,lastFed,foodObj;
var feed,addFood;

function preload()
{
dogstand=loadImage("images/dogImg.png")
doghappy=loadImage("images/dogImg1.png")
}

function setup() {
createCanvas(800,500);
//creating database
database=firebase.database();

// Creating Dog Sprite
dog=createSprite(650,250,50,50)  
dog.scale=0.15
dog.addAnimation("stand",dogstand)
dog.addAnimation("happy",doghappy)

//taking data from firebase
foodStock= database.ref('Food');
foodStock.on("value",readStock,showError);

foodObj=new Food();

// bulding two buttons
feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food")
addFood.position(800,95);
addFood.mousePressed(addFoods);
}

//to Take information from firebase console
function readStock(data){
foodS=data.val()
}

//to update the information in console
function writeStock(x){
if(x<=0){
x=0;
}else{
  x=x-1;
}

database.ref('/').update({
  Food:x
})
}

// show Error in console when code did'nt work
function showError(){
  console.log("Error in writing to the database");
}

//to update foodStock and lastfed time
function feedDog(){
  dog.changeAnimation("happy",dogstand)
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
  })
}
//to add food in stock
function addFoods(){

foodS++;
database.ref('/').update({
  Food:foodS
  })
}

function lastFed(){
  fedTime=database.ref('Feed Time');
  fedTime.on("value",function(data){
  lastFed=data.val();
  })
  }
  


function draw() {  
background(46,139,87)


foodObj.display();


drawSprites();
textSize(15)
fill(255,255,254);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 +"PM",200,30)
}else if(lastFed===0){
  text("Last Feed : 12 AM",50,30);
}else {
  text("Last Feed : "+ lastFed + "AM" ,350,30);
}

}




