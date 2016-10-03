module.exports = function(data)
{
  //"background-image": "linear-gradient(rgba(47, 39, 39, 0.2) 50%, rgba(183, 54, 54, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(90deg, rgba(47, 39, 39, 0.2) 50%, rgba(183, 54, 54, 0) 50%, rgba(0, 0, 0, 0))"
  //var colors = ["#555", "#AAA"];
  var color = ["#000", "transparent"];
  var opacity = [".25", ".75"];
  var tileSize = 10;
  var backgroundImage = [
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop("+opacity[0]+", "+color[0]+"), color-stop("+opacity[0]+", "+color[1]+"))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop("+opacity[0]+", "+color[0]+"), color-stop("+opacity[0]+", "+color[1]+"))",
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop("+opacity[1]+", "+color[1]+"), color-stop("+opacity[1]+","+color[0]+"))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop("+opacity[1]+", "+color[1]+"), color-stop("+opacity[1]+", "+color[0]+"))"
  ].join(", ")+";";
  /*var backgroundImage = [
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop(.25, #000), color-stop(.25, transparent))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, #000), color-stop(.25, transparent))",
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop(.75, transparent), color-stop(.75, #000))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop(.75, transparent), color-stop(.75, #000))"
  ].join(",")+";";*/


  var styleMap = {
    "margin-right": "4px",
    "width": "60px",
    "max-height": "60px",
    "border": "2px solid #AAA",
    "box-sizing": "border-box",
    "background-size": tileSize+"px "+tileSize+"px",
    "-webkit-background-size": tileSize+"px "+(tileSize+1)+"px",
    "background-position": "0 0, "+(tileSize/2)+"px 0, "+(tileSize/2)+"px -"+(tileSize/2)+"px, 0px "+(tileSize/2)+"px",
    "background-image": backgroundImage,
    "background-color": "#555",
    "padding": "4px"
  };
  if(data.obj.title == data.obj.id)
  {
    return '<div><img src="'+data.obj.url+'" style="'+geodash.codec.formatCSS(styleMap)+'"><div style="display:inline-block;">' + data.obj.title + '</div></div>';
  }
  else
  {
    return '<div><img src="'+data.obj.url+'" style="'+geodash.codec.formatCSS(styleMap)+'"><div style="display:inline-block;"><b>' + data.obj.title + '</b><br>(' + data.obj.id + ')</div></div>';
  }
};
