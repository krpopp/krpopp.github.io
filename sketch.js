let sketch = function (p) {

    var winWidth;
    var winHeight;

    var wasArr = "";
    var was = "was ";

    var wasTime = 0;
    var wasTimeReset = 0;
    
    var phase = 0;

    var textBoxX = 0;
    var textBoxY = 0;

    var wasInput;
    var wasButton;

    var wasSubmission = "";

    var wasObj = [];

    var wasWid;

    var changedWases = 0;
    var changedAWas = false;

    var isInput;
    var isButton;

    var isSubmission = "";

    var willBeInput;
    var willBeButton;

    var willBeSubmission = "";

    var changedIses = 0;
    var changedAnIs = false;

    p.preload = function () {
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
    }

    p.setup = function () {
        p.createCanvas(winWidth, winHeight);
        p.textSize(22);
        p.textWrap(p.CHAR);
        p.textFont('Times New Roman');
        p.textLeading(20);
        wasWid = p.textWidth('was ');
        var wasLine = "";
        for(var i = 0; i < winWidth; i += wasWid) {
            wasLine = wasLine.concat(was);
        }
        for(var i = 0; i < winHeight; i += 100) {
            wasArr = wasArr.concat(wasLine);
        }

        var wCount = 0;
        for(var y = 0; y < p.height; y += 20) {
            for(var x = 0; x < p.width - wasWid; x += wasWid) {
                wasObj[wCount] = new p.Word(x, y + 20, wCount);
                wCount+=1;
            }
        }

        textBoxX = p.width/2;
        textBoxY = p.height/2;

        wasInput = p.createElement("textarea");
        wasInput.position(textBoxX - 150, textBoxY - 100);
        wasInput.size(300, 200);

        wasButton = p.createButton("... is who I think I was");
        wasButton.position(textBoxX - 70, textBoxY + 120);
        wasButton.mousePressed(p.saveWas);

       

        p.background(255);
        p.rectMode(p.CORNER);
        p.fill('black');
        for(var i = 0; i < wasObj.length; i++) {
            wasObj[i].drawWord();
        }
        // p.text(wasArr,0,0, p.width);
        if(phase == 0) {
            p.rectMode(p.CENTER);
            p.fill(255);
            p.rect(textBoxX, textBoxY, 500, 300);
            p.fill(0);
            p.text("who were you?", textBoxX - p.textWidth("who were you?")/2, textBoxY - 110);
        }
    }

    
    p.draw = function () {
        if(phase == 1) {
            p.background(255);
            p.rectMode(p.CORNER);
            p.fill('black');
            for(var i = 0; i < wasObj.length; i++) {
                wasObj[i].drawWord();
                wasObj[i].colCheck();
                if(changedWases >= 20 && !changedAWas) {
                    changedAWas = wasObj[i].changeWord();
                }
            } 
            if(changedWases == 2) {
                phase = 2;
                isInput = p.createElement("textarea");
                isInput.position(textBoxX - 150, textBoxY - 100);
                isInput.size(300, 200);
        
                isButton = p.createButton("... is who I am");
                isButton.position(textBoxX - 70, textBoxY + 120);
                isButton.mousePressed(p.saveIs);
                p.rectMode(p.CENTER);
                p.fill(255);
                p.rect(textBoxX, textBoxY, 500, 300);
                p.fill(0);
                p.text("who are you?", textBoxX - p.textWidth("who are you?")/2, textBoxY - 110);
            }
            changedAWas = false;
        } else if(phase == 2) {
        } else if(phase == 3) {
            p.background(255);
            p.rectMode(p.CORNER);
            p.fill('black');
            willBeInput = p.createElement("textarea");
            willBeInput.position(textBoxX - 150, textBoxY - 100);
            willBeInput.size(300, 200);
            
            willBeButton = p.createButton("... is who I will be");
            willBeButton.position(textBoxX - 70, textBoxY + 120);
            willBeButton.mousePressed(p.saveWillBe);
            p.rectMode(p.CENTER);
            p.fill(255);
            p.rect(textBoxX, textBoxY, 500, 300);
            p.fill(0);
            p.text("who will you be?", textBoxX - p.textWidth("who will you be?")/2, textBoxY - 110);
            phase = 4;
        } else if(phase == 5){
            p.background(0);
        }
        
        console.log(phase);
    }

    p.addWas = function () {
        wasArr = wasArr.concat(was);
    }

    p.saveWas = function(){
        wasSubmission = wasInput.value();
        p.removeVerb();
    }

    p.saveIs = function(){
        isSubmission = isInput.value();
        p.removeVerb();
    }

    p.saveWillBe = function(){
        willBeSubmission = willBeInput.value();
        p.removeVerb();
        p.makeTextFile();
    }

    p.removeVerb = function() {
        p.removeElements();
        phase += 1;
    }

    p.makeTextFile = function() {
        w = window.open();
        w.document.write("<div align='center'><h1>Prompt #8</h1>" + "<br><br><br>");
        w.document.write("<div style='break-after:page'> </div>");
        w.document.write("<div align='center'><h1>Theme: Is/Was/Will Be</h1>" + "<br><br><br>");
        w.document.write("You were:" + "<br>" + wasSubmission + "<br><br><br>");
        w.document.write("You are:" + "<br>" +isSubmission + "<br><br><br>");
        w.document.write("You will be:" + "<br>" +willBeSubmission + "<br><br><br></div>");
        w.print();
    }

    p.Word = class {
        constructor(_x, _y, _i) {
            this.x = _x;
            this.y = _y;
            this.word = "was";
            this.index = _i;
            this.state = 0;
        }

        drawWord(){
            if(this.index == wasObj.length - 1) {
                p.fill("red");
                p.rect(this.x - wasWid + 7, this.y - 10, wasWid - 7, 10);
            }
            p.textAlign(p.RIGHT);
            p.fill('black');
            p.text(this.word, this.x, this.y);
        }

        colCheck() {
            if(p.mouseX > this.x - 20 && p.mouseX < this.x && 
                p.mouseY > this.y - 7 && p.mouseY < this.y + 17
            ) {
                this.changeWord();
            }
        }

        changeWord() {
            if(this.state == 0){
                this.word = "is";
                this.state = 1;
                changedWases += 1;
                return true;
            } {
                return false;
            }
        }
        
    }

}