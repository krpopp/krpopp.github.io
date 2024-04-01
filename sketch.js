let sketch = function (p) {

    var winWidth;
    var winHeight;

    var patch;

    //var cellSprites = []
    //var dot;
    var bgHoles = [];
    var holes = [];

    var skin;

    var bgHoleSize = [];
    var holeSize = [];

    var resize = [.5, .6, .7, 1]

    p.preload = function () {
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
        // for(var i = 0; i < 7; i++) {
        //     cellSprites[i] = p.loadImage("cell" + i + ".png");
        // }
        for (var i = 0; i < 11; i++) {
            var num = i + 1;
            bgHoles[i] = p.loadImage("bg" + num + ".png");
            holes[i] = p.loadImage("hole" + num + ".png");
        }
        skin = p.loadImage("skin.png");
    }

    p.setup = function () {
        p.createCanvas(winWidth, winHeight);
        p.imageMode(p.CENTER);
        for (var i = 0; i < bgHoles.length; i++) {
     
            bgHoleSize[i] = p.createVector(bgHoles[i].width, bgHoles[i].height);
            holeSize[i] = p.createVector(holes[i].width, holes[i].height);
        }
        patch = new p.Patch();
        for (var i = 0; i < 100; i++) {
            p.makeHole();
            // var rnd = p.round(p.random(0, resize.length));
            // var newSize = resize[rnd];
            // var sprite = i % 11;
            // var cell = new p.Cell(p.width/2, p.height/2, sprite, holeSize[sprite].x * newSize, holeSize[sprite].y * newSize, bgHoleSize[sprite].x * newSize, bgHoleSize[sprite].y * newSize);
            // patch.addCell(cell);
        }

    }

    p.draw = function () {
        p.image(skin, p.width / 2, p.height / 2);
        patch.run();
    }

    p.makeHole = function () {
        // var rnd = p.round(p.random(0, resize.length));
        // var newSize = resize[rnd];
        // var sprite = i % 11;
        var rndSize = p.round(p.random(0, 3));
        var newSize = resize[rndSize];
        var sprite = p.round(p.random(0, holeSize.length-1));
        console.log(sprite);
        var cell = new p.Cell(p.width/2, p.height/2, sprite, holeSize[sprite].x * newSize, holeSize[sprite].y * newSize, bgHoleSize[sprite].x * newSize, bgHoleSize[sprite].y * newSize);
        patch.addCell(cell);
    }

    p.Patch = class {
        constructor() {
            this.all = [];
        }

        addCell(cell) {
            this.all.push(cell);
        }

        run() {
            for(var i = 0; i < this.all.length; i++) {
                this.all[i].run(this.all);
            }
        }

    }

    p.Cell = class {
        constructor(_x, _y, _i, _bgW, _bgH, _hW, _hH) {
            this.accel = p.createVector(0,0);
            this.vel = p.createVector(p.random(-1,1), p.random(-1, 1));
            this.pos = p.createVector(_x, _y);
            //this.r = 40;
            this.r = _hW + 5;
            this.maxSpeed = .5;
            this.maxForce = 0.05;
            var rnd = p.round(p.random(0, 6));
            //console.log(rnd);
            //this.sprite = cellSprites[rnd];
            //this.sprite = dot;
            this.bgSprite = bgHoles[_i];
            this.sprite = holes[_i];
            this.frame = 0;
            this.animCount = 0;
            this.bgW = _bgW;
            this.bgH = _bgH;
            this.hW = _hW;
            this.hH = _hH;
        }

        run(array) {
            this.flock(array);
            this.update();
            this.borders();
            this.render();
        }

        applyForce(force) {
            this.accel.add(force);
        }

        flock(array) {
            var sep = this.separate(array);
            var ali = this.align(array);
            var coh = this.cohesion(array);
            //var avoid = this.avoidOther(array);
            sep.mult(10.5);
            ali.mult(1.0);
            coh.mult(1.0);
            //avoid.mult(1.0);
            this.applyForce(sep);
            this.applyForce(ali);
            this.applyForce(coh);
            //this.applyForce(avoid);
        }

        update() {
            this.vel.add(this.accel);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.accel.mult(0);
            this.avoidMouse();
        }

        seek(target) {
            var desired = p5.Vector.sub(target, this.pos);
            desired.normalize();
            desired.mult(this.maxSpeed);
            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        }

        animate() {
            this.animCount+=1;
            if(this.animCount > 5) {
                this.frame+=1;
                if(this.frame == 7) {
                    this.frame = 0;
                }
                this.sprite = cellSprites[this.frame];
                this.animCount = 0;
            }
        }

        render() {
           // var theta = this.vel.heading() + p.radians(90);
            //this.animate();
            
            // p.fill(232, 202, 176);
            // p.stroke(181, 159, 148);
            // p.ellipse(this.pos.x, this.pos.y, this.r);
           // p.push();
            //p.translate(this.pos.x, this.pos.y);
            //p.rotate(theta);
            
           
            
            p.image(this.sprite, this.pos.x, this.pos.y, this.bgW, this.bgH);
            p.image(this.bgSprite, this.pos.x, this.pos.y, this.hW, this.hH);
            
            // p.beginShape();
            // p.vertex(0, -this.r * 2);
            // p.vertex(-this.r, this.r * 2);
            // p.vertex(this.r, this.r * 2);
            // p.endShape(p.CLOSE);
            //p.pop();
        }

        borders() {
            if(this.pos.x < -this.r) {
                //this.vel.x *= -1;
                this.pos.x = p.width + this.r;
            }
            if(this.pos.y < -this.r) {
                //this.vel.y *= -1;
                this.pos.y = p.height + this.r;
            }
            if(this.pos.x > p.width + this.r) {
                //this.vel.x *= -1;
                this.pos.x = -this.r;
            }
            if(this.pos.y > p.height + this.r) {
                //this.vel.y *= -1;
                this.pos.y = -this.r;
            }
        }

        separate(array) {
            var sep = 38;
            var steer = p.createVector(0,0);
            var count = 0;
            for(var i = 0; i < array.length; i++) {
                var d = p5.Vector.dist(this.pos, array[i].pos);
                if((d > 0) && (d < sep)) {
                    var diff = p5.Vector.sub(this.pos, array[i].pos);
                    diff.normalize();
                    diff.div(d);
                    steer.add(diff);
                    count++;
                }
            }
            if(count > 0) {
                steer.div(count);
            }

            if(steer.mag() > 0) {
                steer.normalize();
                steer.mult(this.maxSpeed);
                steer.sub(this.vel);
                steer.limit(this.maxForce);
            }
            return steer;
        }

        avoidOther(array) {
            var dist = 20;
            var steer = p.createVector(0, 0, 0);
            for (var i = 0; i < array.length; i++) {
                var d = p5.Vector.dist(this.pos, array[i].pos);
                if (d > 0 && d < dist) {
                    //steer.sub(this.pos, array[i].pos);
                }
            }
            return steer;
        }

        align(array) {
            var dist = 500;
            var sum = p.createVector(0, 0);
            var count = 0;
            for(var i = 0; i < array.length; i++) {
                var d = p5.Vector.dist(this.pos, array[i].pos);
                if((d > 0) && (d < dist)) {
                    sum.add(array[i].vel);
                    count++;
                }
            }
            if(count > 0) {
                sum.div(count);
                sum.normalize();
                sum.mult(this.maxSpeed);
                var steer = p5.Vector.sub(sum, this.vel);
                steer.limit(this.maxForce);
                return steer;
            } else {
                return p.createVector(0, 0);
            }
        }

        cohesion(array) {
            var dist = 1000;
            var sum = p.createVector(0, 0);
            var count = 0;
            for(var i = 0; i < array.length; i++) {
                var d = p5.Vector.dist(this.pos, array[i].pos);
                if((d > 0) && (d < dist)) {
                    sum.add(array[i].pos);
                    count++;
                }
            }
            if(count > 0) {
                sum.div(count);
                return this.seek(sum);
            } else {
                return p.createVector(0, 0);
            }
        }

        avoidMouse() {
            var mousePos = p.createVector(p.mouseX, p.mouseY);
            var dist = p5.Vector.dist(this.pos, mousePos);
            //var dist = p.dist(this.pos.x, this.pos.y, p.mouseX, p.mouseY);
            if(dist < 50) {
                var rep = p.createVector(0,0);
                rep = p5.Vector.sub(this.pos, mousePos);
                var scale = 1.0/dist;
                rep.normalize();
                rep.mult((5000 * scale));
                this.vel = rep
            }
        }
    }

}