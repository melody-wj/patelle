$(function(){
	var can,cobj,palt;
	$(".add").click(function(){
	        
	    var w=prompt('请输入画板宽度(像素):',800);
	    var h=prompt('请输入画板高度(像素):',600);
	    can=$("<canvas id='can' width="+w+" height="+h+"></canvas>")[0];
	    $(".hb")[0].innerHTML="";
	    // copy=$('<div class="copy"></div>');
	    $(can).prependTo(".hb");
	    // copy.css({width:w,height:h});
	    cobj=can.getContext("2d");
	    palt=new palette(cobj,can);
	    draw();
	    palt.pencile(); 
      $(".save").click(function(){
        var o=can.toDataURL();
        location.href=o.replace('image/png','image/octet-stream');
      })
	})
    
    function draw(){
       $('.line').click(function(e){
           e.preventDefault();
     	   palt.type="line";
           palt.draw();
       })
       $('.pencile').click(function(e){
           e.preventDefault();
           palt.pencile();
       })
       $('.rect').click(function(e){
       	   e.preventDefault();
       	   palt.type="rect";
       	   palt.draw();
       })
       $('.circle').click(function(e){
       	   e.preventDefault();
       	   palt.type="circle";
       	   palt.draw();
       })
       $('.poly').click(function(e){
       	   e.preventDefault();
       	   palt.bnum=prompt('请输入多边形边数',5);
       	   palt.type="poly";
       	   palt.draw();
       })
       $('.polystar').click(function(e){
       	   e.preventDefault();
       	   palt.jnum=prompt('请输入多角形角数',5);
       	   palt.type="polystar";
       	   palt.draw();
       })
       $('.tc').click(function(e){
           e.preventDezyfault();
           palt.style='fill';
       })
       $('.mb').click(function(e){
           e.preventDefault();
           palt.style='stroke';
       })
       $('.style .color').change(function(){
       	   palt.strokeStyle=this.value;
       	   palt.fillStyle=this.value;
       })
       $('.style .range').change(function(){
       	   palt.lineWidth=this.value;
       })
       $(".cx").click(function(e){
           e.preventDefault();
           palt.arr.pop();
           if(palt.arr.length>0){
           palt.o.putImageData(palt.arr[palt.arr.length-1],0,0,0,0,palt.width,palt.height);
       }else{
           palt.o.clearRect(0,0,palt.width,palt.height);
           alert("画板已清除干净,请重新绘图");
       }   
       })
       $('save').click(function(e){
       	   e.preventDefault();
           location.href=can.toDataURL().replace('image/png','image/octet-stream');
       })
       $('.clear').click(function(e){
           e.preventDefault();
           cobj.clearRect(0,0,palt.width,palt.height);
           return;
       })
    }


})