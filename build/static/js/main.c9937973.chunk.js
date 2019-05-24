(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{152:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),o=a(4),s=a.n(o),r=(a(95),a(26)),l=a(27),c=a(86),h=a(76),m=a(87),v=a(85),d=a(157),f=a(156),u=a(154),y=a(155),b=(a(96),a(97),function(){function e(t,a,n,i){Object(r.a)(this,e),this.x1=t,this.y1=a,this.speed1=n,this.first1=i,this.average=0}return Object(l.a)(e,[{key:"setRandomSymbol",value:function(e){var t=Math.floor(95*Math.random());this.value=e[t][1]}},{key:"setToVideoSymbol",value:function(e){this.value=e[this.average]}},{key:"getBrightness",value:function(e){for(var t=1,a=0,n=0;n<e.data.length;n+=4)a+=.2126*e.data[n]+.7152*e.data[n+1]+.0722*e.data[n+2],t++;return[a,t]}},{key:"animate",value:function(e){this.y1=this.y1>=e?0:this.y1+=this.speed1}}]),e}()),g=function(){function e(t,a){Object(r.a)(this,e),this.symbols=[],this.totalSymbols=t/a,this.speed=6*Math.random()+2,this.first=1===Math.round(3*Math.random())}return Object(l.a)(e,[{key:"generateSymbols",value:function(e,t,a,n){for(var i=0;i<=this.totalSymbols;i++){var o=new b(e,t,this.speed,this.first,n);o.setRandomSymbol(n),this.symbols.push(o),t-=a,this.first=!1}}},{key:"render",value:function(e,t){this.symbols.forEach(function(a){a.first?e.fillStyle="#09ff08":e.fillStyle="#00a800",e.fillText(a.value,a.x1,a.y1),a.animate(t)})}}]),e}(),p=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).state={video:!1,hover:!1},a.setUp=function(){a.setUpVideo(a.video),a.getSymbols();for(var e=0,t=0;t<=a.canvas.width/a.sfontSize;t++){var n=new g(a.canvas.height,a.sfontSize);n.generateSymbols(e,Math.random()-500,a.sfontSize,a.symbolData),a.streams.push(n),e+=a.sfontSize}},a.setUpVideo=function(e){navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:!0,audio:!1}).then(function(t){console.log(t),e.srcObject=t,e.play(),a.setState({video:!0}),console.log(a.state.video)}).catch(function(e){console.error("Please enable your webcam",e),console.log(a.state.video)})},a.getSymbols=function(){a.ctx.font="11px monospace",a.ctx.fillStyle="#00BB00";for(var e,t=0,n=0,i=10,o=0;o<96;o++){e=String.fromCharCode(12448+o),12*n+20>a.canvas.width&&(n=0,i+=10),t=12*n+20,a.ctx.fillText(e,t,i);for(var s=a.ctx.getImageData(t,i-10,7,a.sfontSize-1),r=0,l=0;l<s.data.length;l+=4)r+=s.data[l]+s.data[l+1]+s.data[l+2];var c=new Array(2);c[0]=r,c[1]=e,a.symbolData.push(c),n++}a.symbolData.sort(function(e,t){return e[0]-t[0]});for(var h=Math.floor(a.symbolData.length/a.symbols.length),m=0,v=0;v<a.symbols.length-1&&m<a.symbolData.length;v++)a.symbols[v]=a.symbolData[m][1],a.ctx.fillText(a.symbols[v],10*v+20,90),m+=h;a.symbols[a.symbols.length-1]=a.symbolData[a.symbolData.length-1][1]},a.paintToCanvas=function(){a.ctx.drawImage(a.video,0,0),a.matrixify(),requestAnimationFrame(a.paintToCanvas)},a.matrixify=function(){var e=a.canvas.height,t=a.ctx,n=a.symbols,i=a.sfontSize;a.streams.forEach(function(e){e.symbols.forEach(function(a){var o=t.getImageData(a.x1,a.y1,7,i),s=a.getBrightness(o),r=s[0]/s[1];a.average=Math.ceil(r/e.symbols.length),a.setToVideoSymbol(n)})}),t.clearRect(0,0,a.canvas.width,e),a.streams.forEach(function(a){a.render(t,e)})},a.takePhoto=function(){var e=a.canvas.toDataURL("image/jpeg");console.log(e);var t=document.createElement("a");t.href=e,t.setAttribute("download","matrix"),t.innerHTML='<img src="'.concat(e,'"/>'),a.strip.insertBefore(t,a.strip.firstChild),document.querySelector(".strip").scrollIntoView({behavior:"smooth"})},a.handleVisibleChange=function(e){console.log("handleHoverChange"),a.setState({hover:e})},a.sfontSize=11,a.symbols=new Array(25),a.symbolData=[],a.streams=[],a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.video=this.refs.video,this.canvas=this.refs.canvas,this.strip=this.refs.strip,this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.setUp(),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.font="11px monospace",this.ctx.fillStyle="#00BB00"}},{key:"render",value:function(){var e=i.a.createElement("div",null,"Please Enable Your Webcam!");return i.a.createElement("div",null,i.a.createElement("header",{className:"main"},i.a.createElement("a",{href:"App.js"},"MatrixVision"),i.a.createElement("nav",{className:"navbar"},i.a.createElement("ul",null,i.a.createElement("li",null,i.a.createElement("a",{href:"https://github.com/SteveLeong",target:"_blank",rel:"noopener noreferrer"},i.a.createElement(v.a,{type:"github",className:"navicons"}))),i.a.createElement("li",null,i.a.createElement("a",{href:"https://www.linkedin.com/in/steven-leong/",target:"_blank",rel:"noopener noreferrer"},i.a.createElement(v.a,{type:"linkedin",className:"navicons"}))),i.a.createElement("li",null,i.a.createElement("a",{href:"https://steveleong.github.io/Portfolio/",target:"_blank",rel:"noopener noreferrer"},i.a.createElement(v.a,{type:"folder-open",className:"navicons"})))))),i.a.createElement("div",{className:"content"},i.a.createElement(d.a,{style:{height:"100%"}},i.a.createElement(f.a,{span:16},i.a.createElement("canvas",{ref:"canvas",width:"640",height:"480",className:"canvas"})),i.a.createElement(f.a,{span:8,style:{height:"80vh"}},i.a.createElement("video",{ref:"video",className:"video"}),i.a.createElement("div",{className:"controller"},i.a.createElement(d.a,{className:"row"},i.a.createElement(f.a,{span:24,gutter:16,className:"col"},i.a.createElement("div",null,i.a.createElement(u.a,{content:e,trigger:"hover",placement:"bottom",visible:this.state.hover,onVisibleChange:this.state.video?"":this.handleVisibleChange},i.a.createElement(y.a,{onClick:this.paintToCanvas,disabled:!this.state.video},"Matrixify")))),i.a.createElement(f.a,null,i.a.createElement(y.a,{onClick:this.takePhoto},"Take Photo")))))),i.a.createElement("div",{ref:"strip",className:"strip"}),i.a.createElement("div",{className:"footer"},i.a.createElement("div",{className:"description"},"For my Final Net Art Project I decided to do an Interactive Artwork inspired by the movie 'Matrix'. In the movie, there is a scene where the main character sees 'code' in his vision, overlayed on top of reality. I thought it would be cool to recreate this effect using a webcam.",i.a.createElement("br",null)," Originally this was done entirely in JavaScript, but I decided to convert it to a React application."))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},90:function(e,t,a){e.exports=a(152)},95:function(e,t,a){},97:function(e,t,a){}},[[90,1,2]]]);
//# sourceMappingURL=main.c9937973.chunk.js.map