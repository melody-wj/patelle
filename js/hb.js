function palette(cobj,canvas){
	this.o=cobj;
    this.canvas=canvas;
    this.width=canvas.width;
    this.height=canvas.height;
    this.style="fill";
    this.type="polystar";
    this.lineWidth=1;
    this.bnum=5;
    this.jnum=6;
    this.strokeStyle="#000";
    this.fillStyle="#000";

    this.arr=[];
}
palette.prototype.init=function(){
	this.o.strokeStyle=this.strokeStyle;
	this.o.fillStyle=this.fillStyle;
	this.o.lineWidth=this.lineWidth;
}
palette.prototype.draw=function(){
	var that=this;
   this.canvas.onmousedown=function(e){
   	    that.init();
        var ox=e.offsetX;
        var oy=e.offsetY;
        document.onmousemove=function(e){
        	    that.o.clearRect(0,0,that.width,that.height);
             if (that.arr.length>0) {
             	that.o.putImageData(that.arr[that.arr.length-1],0,0,0,0,that.width,that.height)
             };
             var mx=e.offsetX;
             var my=e.offsetY;
             that[that.type](ox,oy,mx,my);
        }
        document.onmouseup=function(){
        	 that.arr.push(that.o.getImageData(0,0,that.width,that.height))
          this.onmousemove=null;
          this.onmouseup=null;
        }
   }

}
//绘制直线
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
}
// 绘制矩形
palette.prototype.rect=function(x1,y1,x2,y2){
    var w=x2-x1;
    var h=y2-y1;
    this.o.beginPath();
	this.o.rect(x1,y1,w,h);
	this.o.closePath();
    this.o[this.style]();
}
//绘制圆
palette.prototype.circle=function(x1,y1,x2,y2){
	var r=this.r(x1,y1,x2,y2);
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,Math.PI*2)
	this.o.closePath(); 
	this.o[this.style]();
}
//绘制三角形
palette.prototype.triangle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x1,y2);
	this.o.lineTo(y1,y2); 
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.r=function(x1,y1,x2,y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
//铅笔画
palette.prototype.pencile=function(){
	var that=this;
	this.canvas.onmousedown=function(){
		that.init();
		that.o.beginPath();
		document.onmousemove=function(e){
			var mx=e.offsetX;
	        var my=e.offsetY;
	        that.o.lineTo(mx,my);
	        that.o.stroke();
		}
		document.onmouseup=function(){;
			that.o.closePath();
      that.arr.push(that.o.getImageData(0,0,that.width,that.height));
			this.onmousemove=null;
			this.onmouseup=null;
		}
	}
}
//多边形
palette.prototype.poly=function(x1,y1,x2,y2){
  var r=this.r(x1,y1,x2,y2);
  var len=this.bnum;
  var ang=360/len;
  this.o.beginPath();
  for(var i=0;i<len;i++){
    this.o.lineTo(x1+Math.cos(i*ang*Math.PI/180)*r,y1+Math.sin(i*ang*Math.PI/180)*r);
  }
  this.o.closePath();
  this.o[this.style](); 
}
//多角形
palette.prototype.polystar=function(x1,y1,x2,y2){
  var r=this.r(x1,y1,x2,y2);
  var r1=r*0.35;
  var len=this.jnum;
  var ang=360/len/2;
  this.o.beginPath();
  for(var i=0;i<len*2;i++){
  	if (i%2==0) {
        this.o.lineTo(x1+Math.cos(i*ang*Math.PI/180)*r,y1+Math.sin(i*ang*Math.PI/180)*r);
  	}else{
  		this.o.lineTo(x1+Math.cos(i*ang*Math.PI/180)*r1,y1+Math.sin(i*ang*Math.PI/180)*r1);
  	}
    
  }
  this.o.closePath();
  this.o[this.style](); 
}
// 橡皮擦
palette.prototype.earser=function(){
    var that=this;
	this.canvas.onmousedown=function(){
		that.init();
		that.o.beginPath();
		document.onmousemove=function(e){
			var mx=e.offsetX;
	        var my=e.offsetY;
	        that.o.lineTo(mx,my);
	        that.o.stroke();
		}
		document.onmouseup=function(){
			that.o.closePath();
			this.onmousemove=null;
			this.onmouseup=null;
		}
	}

}



