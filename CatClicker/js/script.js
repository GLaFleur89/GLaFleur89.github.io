
var click1 = 0;
var click2 = 0;
function cat(name,url) {
  this.name = name;
  this.url = url;
};

var bob = new cat("bob","http://placeskull.com/170/170");
var tony = new cat("tony","http://placeskull.com/170/170");

var cats = [bob,tony];

for (i=0; i<cats.length ; i++) {
  $(".catPic").append( "<div id="+cats[i].name+"><h1>"+cats[i].name+"</h1><img src='" + cats[i].url + "'><div class='"+cats[i].name+"count'>"+cats[i].name+"'s clicks: </div></div>" );
}

$("#bob").click(function(e) {
  click1 = click1 + 1;
  $(".bobcount").html("bob's clicks: "+click1);
});

$("#tony").click(function(e) {
  click2 = click2 + 1;
  $(".tonycount").html("tony's clicks: "+click2);
});
