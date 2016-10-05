module.exports = function(tileSize, backgroundColor)
{
  tileSize = tileSize || 10;
  backgroundColor = backgroundColor || "#555";

  var color = ["#222", "transparent"];
  var opacity = [".25", ".75"];

  var backgroundImage = [
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop("+opacity[0]+", "+color[0]+"), color-stop("+opacity[0]+", "+color[1]+"))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop("+opacity[0]+", "+color[0]+"), color-stop("+opacity[0]+", "+color[1]+"))",
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop("+opacity[1]+", "+color[1]+"), color-stop("+opacity[1]+","+color[0]+"))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop("+opacity[1]+", "+color[1]+"), color-stop("+opacity[1]+", "+color[0]+"))"
  ].join(", ")+";";

  var styleMap = {
    "background-size": tileSize+"px "+tileSize+"px",
    "-webkit-background-size": tileSize+"px "+(tileSize+1)+"px",
    "background-position": "0 0, "+(tileSize/2)+"px 0, "+(tileSize/2)+"px -"+(tileSize/2)+"px, 0px "+(tileSize/2)+"px",
    "background-image": backgroundImage,
    "background-color": backgroundColor
  };
  return styleMap;
};
