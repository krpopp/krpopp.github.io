let sketch=function(t){var e,l,s,i,n,o,a,$,r,h,u,d,c,b,g,m,p=[],
    //objects names ordered by their filenames in /allobjects
    y=[
        "slide",
        "overripe tomato",
        "dirty ashtray",
        "packet of tulip seeds",
        "empty box",
        "one dozen eggs",
        "drop of a water",
        "bowl of plastic fruit",
        "the brooklyn bridge",
        "the mona lisa",
        "the letter q",
        "the sun",
        "flip phone",
        "teddy bear",
        "one old shoe",
        "CRT television",
        "matzo ball soup",
        "diamond ring",
        "squeaky chair",
        "broken tricycle",
        "fax machine",
        "heart shaped locket",
        "lost wallet",
        "bottle of water",
        "unicycle",
        "moustache",
        "one chop stick",
        "ikea lamp",
        "stop light"],
    //input schemes
    f=[
        "space bar + adjacent keys",
        "mouse movement (but no buttons)",
        "arrow keys (but CANNOT be more movement or direction)",
        "every letter key",
        "no input",
        "the mouse (but held upside down)",
        "a single column of keys on the keyboard",
        "SHIFT, T, WASD",
        "two arrow keys",
        "the mouse button (but not using the finger)",
        "mouse scroll wheel",
        "number keys",
        "three nonadjacent keys",
        "four keys (but NOT WASD or arrows)",
        "a microphone",
        "one button",
        "plus/minus keys",
        "hold down one button and do not let go",
        "three arrow keys",
        "a single row of keys on the keyboard"],
    //student names
    x=[
        "chase",
        "mia",
        "lukas",
        "dade",
        "crisen",
        "derek",
        "amber",
        "hari",
        "noel",
        "zoey",
        "jiahe",
        "sydney",
        "ruari",
        "william",
        "victor",
        "harper",
        "luis"],
k=[],_=0,w=0,j=0,v=[],S=0,R=5,z=null,A=!1,O=null,T=[],C=0,M=!1;t.preload=function(){e=window.innerWidth,l=window.innerHeight;for(var n=0;n<y.length;n++)p[n]=t.loadImage("allobjects/object"+n+".png");s=t.loadImage("inputbtns.png"),i=t.loadImage("objbtns.png"),u=t.loadFont("Daydream.ttf"),m=t.loadSound("select_001.ogg");for(var n=0;n<2;n++)T[n]=t.loadSound("result-"+n+".ogg")},t.setup=function(){t.createCanvas(e,l);for(var d=0;d<y.length;d++)k[d]=new t.ObjObj(p[d],y[d]);t.shuffle(k,!0),t.shuffle(f,!0),n=s.get(0,0,500,200),o=s.get(0,200,500,400),a=i.get(0,0,500,200),$=i.get(0,200,500,400),g=x[j],t.textFont(u),h=new t.ButtonObj(e/4,.1*l+700,a,$,"generate object"),r=new t.ButtonObj(.75*e,.1*l+700,n,o,"generate inputs"),h.letMake=!0},t.draw=function(){t.background(175,148,255),h.update(),h.draw(),r.update(),r.draw(),t.textAlign(t.CENTER),null==d&&A?(t.rollResults(k,w),null!=z&&t.image(z,e/4-250,.1*l)):null!=d&&null==b&&A&&(t.rollResults(f,_),null!=O&&(t.fill("white"),t.text(O,r.x,.1*l+250,500,500))),null!=d&&(t.image(d,e/4-250,.1*l),t.fill("black"),t.text(c,e/4,.1*l+550)),null!=b&&(t.fill("black"),t.text(b,r.x,.1*l+250,500,500)),t.textAlign(t.CENTER),t.fill("white");for(var s=j;s<x.length;s++)x[s]!==g||M?(x[s]===g||M)&&(t.textSize(8),t.fill("black")):(t.textSize(12),t.fill("white")),t.text(x[s],e/2-100,10+60*s,200,60);t.textSize(8),t.fill("black");for(var s=0;s<v.length;s++)t.text(v[s].name+"\n"+v[s].obj+"\n"+v[s].input,e/2-100,10+60*s,200,60)},t.mouseClicked=function(){1==h.state&&(A=!0,h.letMake=!1),1==r.state&&(A=!0,r.letMake=!1)},t.keyPressed=function(){"n"==t.key&&null!=b&&(t.storeAssignments(),h.letMake=!0)},t.rollResults=function(e,l){null==d&&S<=0?(m.play(),z=e[t.int(t.random(l,e.length-1))].pic,S=R,R+=1):null!=d&&null==b&&S<=0&&(m.play(),O=e[t.int(t.random(l,e.length-1))],S=R,R+=1),S-=3,R>=40&&(null==d?(h.generateObjResult(k,w),w+=1,r.letMake=!0):null!=d&&null==b&&(r.generateInputResult(f,_),_+=1),A=!1,S=0,R=5,z=null)},t.storeAssignments=function(){v[j]=new t.AssignedPrompt(200,.9*l,g,c,d,b),j+=1,g=x[j],b=null,d=null,c=null},t.ObjObj=class{constructor(t,e){this.pic=t,this.name=e}},t.ButtonObj=class{constructor(t,e,l,s,i){this.x=t-250,this.y=e-100,this.idle=l,this.hover=s,this.state=0,this.label=i,this.letMake=!1}draw(){t.textAlign(t.CENTER),0==this.state?(t.image(this.idle,this.x,this.y),t.fill("black"),t.textSize(28),t.text(this.label,this.x+250,this.y+95),t.fill("white"),t.textSize(28),t.text(this.label,this.x+250,this.y+100)):1==this.state?(t.image(this.hover,this.x,this.y),t.fill("white"),t.textSize(28),t.text(this.label,this.x+250,this.y+95),t.fill("black"),t.textSize(28),t.text(this.label,this.x+250,this.y+100)):2==this.state&&(t.tint(43,43,43),t.image(this.idle,this.x,this.y),t.fill("black"),t.textSize(28),t.text(this.label,this.x+250,this.y+95),t.fill(145,145,145),t.textSize(28),t.text(this.label,this.x+250,this.y+100),t.tint("white"))}update(){this.letMake?t.mouseX>this.x&&t.mouseX<this.x+500&&t.mouseY>this.y&&t.mouseY<this.y+200?this.state=1:this.state=0:this.state=2}generateObjResult(t,e){var l=t[e];d=l.pic,c=l.name,this.playResultSound()}generateInputResult(e,s){b=e[s],this.playResultSound(),j>=x.length-1&&(v[j]=new t.AssignedPrompt(200,.9*l,g,c,d,b),this.saveResults())}playResultSound(){T[C].play(),++C>=2&&(C=0)}saveResults(){M=!0;for(var e=t.createWriter("prototypeprompt2.txt"),l=0;l<v.length;l++)e.write(["\n"]+v[l].name+[" | "]+v[l].obj+[" | "]+v[l].input);e.close()}},t.AssignedPrompt=class{constructor(t,e,l,s,i,n){this.x=t,this.y=e,this.name=l,this.obj=s,this.img=i,this.input=n}}};