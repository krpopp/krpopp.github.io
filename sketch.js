let sketch = function (p) {

    var winWidth;
    var winHeight;

    var objectSprites = [];
    var objectNames = [
        'slide',
        'overripe tomato',
        'dirty ashtray',
        'packet of tulip seeds',
        'empty box',
        'one dozen eggs',
        'drop of a water',
        'bowl of plastic fruit',
        'the brooklyn bridge',
        'the mona lisa',
        'the letter q',
        'the sun',
        'flip phone',
        'teddy bear',
        'one old shoe',
        'CRT television',
        'matzo ball soup',
        'diamond ring',
        'squeaky chair',
        'broken tricycle',
        'fax machine',
        'heart shaped locket',
        'lost wallet',
        'bottle of water',
        'unicycle',
        'moustache',
        'one chop stick',
        'ikea lamp',
        'stop light'
    ]

    var allInputs = [
        'space bar + adjacent keys',
        'mouse movement (but no buttons)',
        'arrow keys (but CANNOT be more movement or direction)',
        'every letter key',
        'no input',
        'the mouse (but held upside down)',
        'a single column of keys on the keyboard',
        'SHIFT, T, WASD',
        'two arrow keys',
        'the mouse button (but not using the finger)',
        'mouse scroll wheel',
        'number keys',
        'three nonadjacent keys',
        'four keys (but NOT WASD or arrows)',
        'a microphone',
        'one button',
        'plus/minus keys',
        'hold down one button and do not let go',
        'three arrow keys',
        'a single row of keys on the keyboard'
    ]

    var studentNames = [
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
        'jiahe',
        'sydney',
        'ruari',
        'william',
        'victor',
        'harper',
        'luis'
    ];

    var allObjects = [];

    var inputBtns;
    var objBtns;

    var greenBtn;
    var blueBtn;
    var orangeBtn;
    var pinkBtn;

    var inputButton;
    var objButton;

    var inputIndex = 0;
    var objIndex = 0;

    var font;

    var currentObjImg;
    var currentObjText;

    var currentInputText;

    var currentStudentText;

    var studentIndex = 0;

    var assignedStudents = [];
    var rollTimer = 0;
    var rollTimerReset = 5;

    var rollImg = null;
    var rolling = false;

    var rollText = null;

    var clickSound;
    var resultSound = [];

    var resultIndex = 0;

    p.preload = function () {
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
        for(var i = 0; i < objectNames.length; i++) {
            objectSprites[i] = p.loadImage('allobjects/object' + i + '.png');
        }
        inputBtns = p.loadImage('inputbtns.png');
        objBtns = p.loadImage('objbtns.png');
        font = p.loadFont('Daydream.ttf');
        clickSound = p.loadSound('select_001.ogg');
        for (var i = 0; i < 2; i++) {
            resultSound[i] = p.loadSound('result-' + i + '.ogg');
        }
    }

    p.setup = function () {
        p.createCanvas(winWidth, winHeight);
        for(var i = 0; i < objectNames.length; i++) {
            allObjects[i] = new p.ObjObj(objectSprites[i], objectNames[i]);
        }
        p.shuffle(allObjects, true);

        p.shuffle(allInputs, true);

        greenBtn = inputBtns.get(0, 0, 500, 200);
        blueBtn = inputBtns.get(0, 200, 500, 400);
        orangeBtn = objBtns.get(0, 0, 500, 200);
        pinkBtn = objBtns.get(0, 200, 500, 400);
        
        currentStudentText = studentNames[studentIndex];
        
        p.textFont(font);

        objButton = new p.ButtonObj(winWidth/4, winHeight * 0.1 + 700, orangeBtn, pinkBtn, "generate object");
        inputButton = new p.ButtonObj(winWidth * 0.75, winHeight * 0.1 + 700, greenBtn, blueBtn, "generate inputs");

        objButton.letMake = true;
    }

    p.draw = function () {
        p.background(175, 148, 255);
        objButton.update();
        objButton.draw();

        inputButton.update();
        inputButton.draw();

        p.textAlign(p.CENTER)

        if (currentObjImg == null && rolling) {
            p.rollResults(allObjects, objIndex);
            if (rollImg != null) {
                p.image(rollImg, winWidth / 4 - 250, winHeight * 0.1);
            }
            
        } else if (currentObjImg != null && currentInputText == null && rolling) {
            p.rollResults(allInputs, inputIndex);
            if (rollText != null) {
                p.fill('white');
                p.text(rollText, inputButton.x, winHeight * 0.1 + 250, 500, 500)
            }
        }
        if (currentObjImg != null) {
            p.image(currentObjImg, winWidth/4 - 250, winHeight * 0.1);
            p.fill('black');
            p.text(currentObjText, winWidth/4, winHeight * 0.1 + 550);
        }
        if (currentInputText != null) {
            p.fill('black');
            p.text(currentInputText, inputButton.x, winHeight * 0.1 + 250, 500, 500);
        }
        p.textAlign(p.CENTER)
        p.fill('white');
        for (var i = studentIndex; i < studentNames.length; i++) {
            if (studentNames[i] === currentStudentText) {
                p.textSize(12);
                p.fill('white');
            } else {
                p.textSize(8);
                p.fill('black');
            }
            p.text(studentNames[i], winWidth / 2 - 100, 10 + (i * 60), 200, 60);
        }
        p.textSize(8);
        p.fill('black');
        for (var i = 0; i < assignedStudents.length; i++){
            p.text(assignedStudents[i].name + '\n' + assignedStudents[i].obj + '\n' + assignedStudents[i].input,
                winWidth / 2 - 100, 10 + (i * 60),
                200,
                60);
        }
    }

    p.mouseClicked = function () {
        if (objButton.state == 1) {
            rolling = true;
            objButton.letMake = false;
        }
        if (inputButton.state == 1) {
            rolling = true;
            inputButton.letMake = false;
        }
    }
    
    p.keyPressed = function () {
        if (p.key == 'n' && currentInputText != null) {
            p.storeAssignments();
            objButton.letMake = true;
        }
    }

    p.rollResults = function (_array, _index){
        if (currentObjImg == null && rollTimer <= 0) {
            clickSound.play();
            var randImg = p.int(p.random(_index, _array.length - 1));
            rollImg = _array[randImg].pic;
            rollTimer = rollTimerReset;
            rollTimerReset += 1;
        } else if (currentObjImg != null && currentInputText == null && rollTimer <= 0) {
            clickSound.play();
            var randText = p.int(p.random(_index, _array.length - 1));
            rollText = _array[randText];
            rollTimer = rollTimerReset;
            rollTimerReset += 1;
        }
        rollTimer -= 3;
        if (rollTimerReset >= 40) {
            if (currentObjImg == null) {
                objButton.generateObjResult(allObjects, objIndex);
                objIndex += 1;
                inputButton.letMake = true;
            } else if (currentObjImg != null && currentInputText == null) {
                inputButton.generateInputResult(allInputs, inputIndex);
                inputIndex += 1;
            }
            rolling = false;
            rollTimer = 0;
            rollTimerReset = 5;
            rollImg = null;
        }
    }

    p.storeAssignments = function () {
        assignedStudents[studentIndex] = new p.AssignedPrompt(200, winHeight * 0.9, currentStudentText, currentObjText, currentObjImg, currentInputText);
        studentIndex += 1;
        currentStudentText = studentNames[studentIndex];
        currentInputText = null;
        currentObjImg = null;
        currentObjText = null;
    }

    p.ObjObj = class {
        constructor(_pic, _name) {
            this.pic = _pic;
            this.name = _name;
        }
    }
    
    p.ButtonObj = class {
        constructor(_x, _y, _upImg, _downImg, _label) {
            this.x = _x - 250;
            this.y = _y - 100;

            this.idle = _upImg;
            this.hover = _downImg;

            this.state = 0;

            this.label = _label;

            this.letMake = false;
        }

        draw() {
            p.textAlign(p.CENTER)
            if (this.state == 0) {
                p.image(this.idle, this.x, this.y);
                p.fill('black');
                p.textSize(28);
                p.text(this.label, this.x + 250, this.y + 95);
                p.fill('white');
                p.textSize(28);
                p.text(this.label, this.x + 250, this.y + 100);
            } else if (this.state == 1) {
                p.image(this.hover, this.x, this.y);
                p.fill('white');
                p.textSize(28);
                p.text(this.label, this.x + 250, this.y + 95);
                p.fill('black');
                p.textSize(28);
                p.text(this.label, this.x + 250, this.y + 100);
            } else if (this.state == 2) {
                p.tint(43, 43, 43);
                p.image(this.idle, this.x, this.y);
                p.fill('black');
                p.textSize(28);
                p.text(this.label, this.x + 250, this.y + 95);
                p.fill(145, 145, 145);
                p.textSize(28);
                p.text(this.label, this.x + 250, this.y + 100);
                p.tint('white');
            }
        }

        update() {
            if (this.letMake) {
                if (p.mouseX > this.x && p.mouseX < this.x + 500 && p.mouseY > this.y && p.mouseY < this.y + 200) {
                    this.state = 1;
                } else {
                    this.state = 0;
                }
            } else {
                this.state = 2;
            }
        }

        generateObjResult(_array, _index) {
            var assignedObj = _array[_index];
            currentObjImg = assignedObj.pic;
            currentObjText = assignedObj.name;
            this.playResultSound();
        }

        generateInputResult(_array, _index) {
            var assignedInpout = _array[_index];
            currentInputText = assignedInpout;
            this.playResultSound();
            if (studentIndex >= studentNames.length - 1) {
                assignedStudents[studentIndex] = new p.AssignedPrompt(200, winHeight * 0.9, currentStudentText, currentObjText, currentObjImg, currentInputText);
                this.saveResults();
            }
        }

        playResultSound() {
            resultSound[resultIndex].play();
            resultIndex++;
            if (resultIndex >= 2) {
                resultIndex = 0;
            }
        }

        saveResults() {
            var write = p.createWriter("prototypeprompt2.txt");
            for (var i = 0; i < assignedStudents.length; i++) {
                write.write(["\n"] + assignedStudents[i].name + [" | "] + assignedStudents[i].obj + [" | "] + assignedStudents[i].input)
            }
            write.close();
        }
    }

    p.AssignedPrompt = class {
        constructor(_x, _y, _name, _object, _image, _input) {
            this.x = _x;
            this.y = _y;
            this.name = _name;
            this.obj = _object;
            this.img = _image;
            this.input = _input;
        }
    }

}