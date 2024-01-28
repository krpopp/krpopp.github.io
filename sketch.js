let sketch = function (p) {

    var horniness = 0;
    var hornyLabel;

    var womenLabel;

    var sexButton;

    var outerDiv;
    var topDiv;
    var bottomDiv;

    var athens;
    var sparta;

    var timer = 1000;
    var hornyInc = timer;

    var noSexButton;

    var testShake;

    var timeSinceSex = 0;

    var showNoSex = false;

    var title;

    var battleTimeMin = 5000;
    var battleTimeMax = 10000;

    var nextBattleTime = p.random(battleTimeMin, battleTimeMax);
    var nextBattleTimer = nextBattleTime;

    var battleTypes = ["land", "water", "seige"];
    var groups;

    var phase = 0;

    var sexInt = 0;
    var settingInt = 0;

    var statJson;

    p.preload = function ()
    {
        statJson = p.loadJSON('states.json');
    }

    p.setup = function () {
        outerDiv = p.createDiv();
        outerDiv.style('max-width', '500px');
        outerDiv.style('margin', 'auto');
        //outerDiv.style('margin-top', '-50px');
        outerDiv.style('text-align', 'center');
        outerDiv.id('game')
        if (window.innerWidth < 480) {
            var warning = p.createSpan("<u>Hey this game is difficult to play on mobile, just FYI</u>")
            warning.parent('game');
        }
        title = p.createSpan('<h1>End the Peloponnesian War.</h1> <br><br>');
        title.parent('game')

        topDiv = p.createDiv();
        topDiv.id('toppest');
        topDiv.parent('game');

        bottomDiv = p.createDiv();
        bottomDiv.style('margin-top', '100px');
        bottomDiv.style('display', 'flex');
        bottomDiv.style('justify-content', 'center');
        bottomDiv.id('bottomest');
        bottomDiv.parent('game');

        womenLabel = p.createSpan('Women<br><br>');
        womenLabel.parent('toppest');

        hornyLabel = p.createSpan('Restlessness: ' + horniness + '<br><br>');
        hornyLabel.parent('toppest')
        hornyLabel.hide();

        sexButton = p.createButton('Have sex');
        sexButton.parent('toppest')
        sexButton.mousePressed(() => {
            p.havingSex();
        });
        sexButton.touchStarted(() => {
            p.havingSex();
        });
        sexButton.mouseReleased(() => {
            p.reverseChange();
        })
        sexButton.touchEnded(() => {
            p.reverseChange();
        })
        sexButton.hide();
        
        var btnBrk = p.createSpan('<br><br>');
        btnBrk.parent('toppest');

        testShake = p.createDiv();
        if (window.innerWidth > 480) {
            testShake.addClass('shake-crazy shake-freeze');
        }
        testShake.parent('toppest')
        testShake.id("test")

        noSexButton = p.createButton("DO NOT HAVE SEX");
        noSexButton.parent('test');
        noSexButton.mousePressed(() => { 
            pressedNoSex = true;
            p.notHavingSex();
        })
        noSexButton.touchStarted(() => { 
            pressedNoSex = true;
            p.notHavingSex();
        })
        noSexButton.touchEnded(() => {
            p.havingSex();
        })
        noSexButton.hide();

        sparta = new p.State(0, "Peloponnesian League", "50px");
        athens = new p.State(1, "Delian League", "10px");
        groups = [athens, sparta];

        var credit = p.createA('https://kpopp.io/', 'made by karina popp');
        credit.style('bottom', '0');
        credit.style('position', 'fixed');
        credit.style('color', 'white');
    };

    p.draw = function () {
        var time = p.millis();
        if (phase < 4) {
            athens.simulatePassive();
            sparta.simulatePassive();
            if (time > nextBattleTimer) {
                p.battle();
                nextBattleTime = p.random(battleTimeMin, battleTimeMax);
                nextBattleTimer = time + nextBattleTime;
            }
        }

        switch (phase) {
            case 0:
                if (athens.bodies.amount < 2300 || sparta.bodies.amount < 2300) {
                    p.increasePhase();
                }
                break;
            case 1:
                if (p.millis() > hornyInc)
                {
                    p.increaseHorniness();
                    hornyInc = p.millis() + timer;
                }
                if (athens.erections.amount > 10 || sparta.erections.amount > 10) {
                    p.increasePhase();
                }
                break;
            case 2:
                if (p.millis() > hornyInc)
                {
                    p.increaseHorniness();
                    hornyInc = p.millis() + timer;
                }
                if (horniness > 20) 
                {
                    p.increasePhase();    
                }
                break;
            case 3:
                if (p.millis() > hornyInc)
                {
                    p.havingSex();
                    hornyInc = p.millis() + timer;
                }
                if (athens.gold.amount == 0 && sparta.gold.amount == 0) {
                    p.increasePhase();
                }
                break;
        }
    }
        
        p.increasePhase = function(){
            phase++;
            if (phase == 1) {
                sexButton.show();
                sexButton.style('display', 'inline')
            } if (phase == 2) {
                athens.erections.unhide();
                sparta.erections.unhide();
            } if (phase == 3) {
                hornyLabel.show();
                sexButton.hide();
                noSexButton.show();
                noSexButton.style('display', 'inline');
            } if (phase == 4) {
                noSexButton.hide();
                title.html("<h1>You ended the Peloponessian War!</h1> <br><br>");
            }
        }
    
        p.increaseHorniness = function () {
            horniness += 1;
            hornyLabel.html('Restlessness: ' + horniness + '<br><br>');
        }

        p.decreaseHorniness = function () {
            if (horniness > 0) {
                horniness -= 1;
            }
            hornyLabel.html('Restlessness: ' + horniness + '<br><br>');
        }

        p.havingSex = function () {
            p.decreaseHorniness();
            athens.erections.changeAmt = -1;
            sparta.erections.changeAmt = -1;
            timeSinceSex = 0;
        }
    
        p.reverseChange = function () {
            athens.erections.changeAmt = 1;
            sparta.erections.changeAmt = 1;
        }
         
        p.notHavingSex = function () {
            p.increaseHorniness();
            if (athens.erections.amount == 0) {
                athens.erections.amount = 1;
                athens.erections.tarAmount = 2;
            }
            if (sparta.erections.amount == 0) {
                sparta.erections.amount == 1;
                sparta.erections.tarAmount = 2;
            }
            athens.erections.changeAmt = 1;
            sparta.erections.changeAmt = 1;
            hornyInc = p.millis() + timer;
        }

    p.battle = function () {
        p.shuffle(battleTypes);
        var setting = battleTypes[settingInt];
        if (settingInt >= battleTypes.length-1) {
            settingInt = 0;
        } else {
            settingInt++;
        }
        //var setting = p.random(battleTypes);
        var aggressor = p.random(groups);
        var defender;
        if (aggressor == athens) {
            defender = sparta;
        } else {
            defender = athens
        }
        
        if (aggressor.score(setting) > defender.score(setting)) {
            var diff = (1 - (defender.score(setting) / (aggressor.score(setting) + defender.score(setting))));
            aggressor.winBattle(setting, diff);
            defender.loseBattle(setting, diff);
        } else {
            var diff = 1 - (aggressor.score(setting) / (defender.score(setting) + aggressor.score(setting)))
            defender.winBattle(setting, diff);
            aggressor.loseBattle(setting, diff);
        }
    }

    p.Resource = class {
        //constructor(_name, _amt, _cost, _currency, _changeAmt, _rateMin, _rateMax, _minAmt, _priority, _parent, _passive, _eFact, _eLimit) {
        constructor(_name, _data, _parent, _currency) {
            this.name = _name;
            this.amount = _data.count;
            this.tarAmount = _data.count;
            this.cost = _data.cost;
            this.changeAmt = _data.baseIncrease;

            this.currency = _currency;

            this.minAmt = _data.minAmount;
            this.priority = _data.priority;

            this.rateMin = _data.minIncreaseRate;
            this.rateMax = _data.maxIncreaseRate;

            this.rate = p.random(_data.minIncreaseRate, _data.maxIncreaseRate);
            this.timer = this.rate;

            this.buyRate = p.random(_data.minIncreaseRate, _data.maxIncreaseRate);
            this.buyTimer = this.rate;

            this.title;
            this.parentDiv = _parent;

            this.r = 0;
            this.g = 0;

            this.waitToBuy = false;
            this.show = true;

            this.canGenerate = _data.passiveIncrease;
            this.needed = false;

            this.erectionEffected = _data.erectionEffect;

            //this.erectionFactor = _eFact;
           // this.erectionLimit = _eLimit;
            this.tooManyErrections = false;

            this.makeDom();

            if (_name == "Erections")
            {
                this.hide();
            }
        }

        makeDom() {
            this.title = p.createSpan(this.name + ": " + this.amount + '<br>');
            this.title.style('background-color', 'rgb(' + this.r + ',' + this.g + ', 0)');
            this.title.parent(this.parentDiv);
        }

        passive(_erectionCount) {
            var time = p.millis();
            if (time > this.timer && this.canGenerate) {
                if (_erectionCount > 10 &&  this.erectionEffected) {
                    this.tarAmount -= (this.changeAmt * (_erectionCount * 2))
                } else {
                    this.tarAmount += this.changeAmt;
                }
                this.rate = p.random(this.rateMin, this.rateMax);
                this.timer = time + this.rate;
                if (this.amount < 0) {
                    this.amount = 0;
                }
                if (this.tarAmount < 0) {
                    this.tarAmount = 0;
                }
            }
            if (this.amount > this.tarAmount)
            {
                if (this.name == "Erections") {
                    console.log("why");
                }
                this.g = 0;
                this.r = p.abs(this.amount - this.tarAmount) * 20;
                var addamnt = 1;
                this.amount -= addamnt;
                if (this.amount < 0) {
                    this.amount = 0;
                }
            } else if (this.amount < this.tarAmount)
            {
                this.r = 0;
                this.g = p.abs(this.amount - this.tarAmount) * 10;
                var addamt = p.round(.1 * p.abs(this.amount - this.tarAmount));
                if (addamt < 1) {
                    addamt = 1
                }
                this.amount += addamt;
            } 
            this.updateHTML();
        }

        updateHTML()
        {
            this.title.style('background-color', 'rgb(' + this.r + ',' + this.g + ', 0)');
            this.title.html(this.name + ": " + this.amount + '<br>');
        }
    
        startBuy()
        {
            this.rate = p.random(this.rateMin, this.rateMax);
            this.buyTimer = p.millis() + this.buyRate;
            this.waitToBuy = true;
        }

        buy()
        {
            var time = p.millis();
            if (time > this.buyTimer)
            {
                this.tarAmount += this.changeAmt;
                this.currency.tarAmount -= this.cost;
                this.updateHTML();
                this.waitToBuy = false;
            }
        }

        hide()
        {
            this.show = false;
            this.title.hide();
        }

        unhide()
        {
            this.show = true;
            this.title.show();
        }

        reduce(_amtToReduce) { 
            if (this.tarAmount > _amtToReduce) {
                this.tarAmount -= _amtToReduce;
            } else if (this.tarAmount > 0) {
                this.tarAmount = 0;
            } 
        }
        
        erectionEffect() {
            //this.tooManyErrections = true;
        }

        undoErectionEffect() {
           // this.tooManyErrections = false;
        }
    };

    p.State = class {
        constructor(_jsonArr, _name, _r) {

            this.jData = statJson.states[_jsonArr];
            this.name = this.jData.name;

            this.buyTimeMin = 1000;
            this.buyTimeMax = 3000;

            this.buyTime = p.random(this.buyTimeMin, this.buyTimeMax);
            this.buyTimer = this.buyTime;

            this.windFallMin = 1000;
            this.windFallMax = 5000;

            this.windowFallTime = p.random(this.windFallMin, this.windFallMax);
            this.windFallTimer = this.windowFallTime;

            this.waitingForWindfall = false;

            this.margin_r = _r;

            this.div;

            this.title;
            this.bodies;
            this.gold;
            this.iron;
            this.wood;
            this.ships;
            this.weapons;
            this.erections;

            this.purchasingShips = false;

            this.wins = 0;
            this.loses = 0;
            this.windFalls = 0;

            this.allResources = [];

            this.debugWins;
            this.debugLoses;
            this.debugWindfalls;

            this.makeDom();
        }

        makeDom() {
            this.div = p.createDiv();
            this.div.style('margin-right', this.margin_r)
            this.div.id = this.name;
            this.div.parent('bottomest');

            this.title = p.createSpan(this.name + '<br><br>');
            this.title.parent(this.div);
            
            // this.bodies = new p.Resource("Bodies", 2500, -1, "non", -1, 900, 9000, 100, 0, this.div, true, 0, 0);
            // this.gold = new p.Resource("Gold", 1200, -1, "non", 1, 500, 10000, 1000, 0, this.div, true, -20, 50);
            // this.food = new p.Resource("Food", 5000, 20, this.gold, 1, 100, 10000, 500, 2, this.div, true, 0, 0);
            // this.iron = new p.Resource("Iron", 100, 100, this.gold, 1, 4000, 8000, 10, 4, this.div, true, -2, 30);
            // this.wood = new p.Resource("Wood", 200, 20, this.gold, 1, 1000, 1000, 20, 5, this.div, true, 0, 0);
            // this.ships = new p.Resource("Ships", 20, 40, this.wood, 1, 2000, 5000, 10, 3, this.div, false, -1, 30);
            // this.weapons = new p.Resource("Weapons", 2000, 50, this.iron, 1, 7000, 10000, 800, 1, this.div, false, -1, 20);
            // this.erections = new p.Resource("Erections", 0, -1, "non", 0.5, 800, 1000, 0, 0, this.div, true, 0, 0);
            
            this.bodies = new p.Resource("Bodies", this.jData.bodies, this.div, "non");
            this.gold = new p.Resource("Gold", this.jData.gold, this.div, "non");
            this.food = new p.Resource("Food", this.jData.food, this.div, this.gold);
            this.iron = new p.Resource("Iron", this.jData.iron, this.div, this.gold);
            this.wood = new p.Resource("Wood", this.jData.wood, this.div, this.gold);
            this.ships = new p.Resource("Vessels", this.jData.ships, this.div, this.wood);
            this.weapons = new p.Resource("Swords", this.jData.weapons, this.div, this.iron);
            this.erections = new p.Resource("Erections", this.jData.erections, this.div, "non");
            

            // this.debugWins = p.createSpan("wins: " + this.wins);
            // this.debugWins.parent(this.div);
            // this.debugLoses = p.createSpan("loses: " + this.loses);
            // this.debugLoses.parent(this.div);
            // this.debugWindfalls = p.createSpan("windfalls: " + this.windFalls);
            // this.debugWindfalls.parent(this.div);

            this.allResources = [this.bodies, this.food, this.gold, this.iron, this.wood, this.ships, this.weapons, this.erections];
            
        }

        simulatePassive() {
            var time = p.millis();
            for (var i = 0; i < this.allResources.length; i++)
            {
                this.allResources[i].passive(this.erections.amount);
                // if (this.allResources[i].erectionLimit < this.erections.amount) {
                //     this.allResources[i].erectionEffect();
                // } else {
                //     this.allResources[i].undoErectionEffect();
                // }
                // if (this.allResources[i].waitToBuy)
                // {
                //     this.allResources[i].buy();
                // }
            }
            if (time > this.buyTimer) {
                this.buyPhase();
            }
            if (this.loses - this.wins > 0 && !this.waitingForWindfall) {
                this.windowFallTime = p.random(this.windFallMin, this.windFallMax);
                this.windFallTimer = time + this.windowFallTime;
                this.waitingForWindfall = true;
            }

            if (this.waitingForWindfall && time > this.windFallTimer && this.erections.amount < 15) {
                this.windFall();
                this.waitingForWindfall = false;
            }
            // this.debugWins.html("wins: " + this.wins);
            // this.debugLoses.html("loses: " + this.loses);
            // this.debugWindfalls.html("windfalls: " + this.windFalls);
        }

        buyPhase() {
            var topBuy = null;
            for (var i = 0; i < this.allResources.length; i++){
                if (this.allResources[i].cost > -1) {
                    if (this.allResources[i].amount < this.allResources[i].minAmt && !this.allResources[i].waitToBuy) {
                        if (this.allResources[i].currency == this.gold) {
                            if (this.allResources[i].priority > topBuy) {
                                topBuy = this.allResources[i];
                            }
                        }
                        else {
                            if (this.allResources[i].currency.tarAmount > this.allResources[i].cost) {
                                this.allResources[i].startBuy();
                            }
                        }
                    }
                }
            }
            if (topBuy != null) {
                topBuy.startBuy();
            }
            this.buyTime = p.random(this.buyTimeMin, this.buyTimeMax);
            this.buyTimer = p.millis() + this.buyTime;
        }

        score(_type) {
            switch (_type)
            {
                case "land":
                    return (this.bodies.amount + (this.weapons.amount * 2) + (this.food.amount / 2));
                case "water":
                    return (this.ships.amount + (this.weapons.amount / 2) + (this.bodies.amount / 2));
                case "seige":
                    return (this.bodies.amount + (this.food.amount * 2) + this.wood.amount);
            }
        }

        winBattle(_type, _diff) {
            switch (_type) {
                case "land":
                    this.bodies.reduce(p.round(10 * _diff));
                    this.weapons.reduce(p.round(5 * _diff));
                    this.gold.tarAmount += (p.round(50 * _diff));
                    this.iron.tarAmount += (p.round(10 * _diff));
                    break;
                case "water":
                    this.bodies.reduce(p.round(55 * _diff));
                    this.ships.reduce(p.round(2 * _diff));
                    this.gold.tarAmount += (p.round(100 * _diff));
                    break;
                case "seige":
                    this.bodies.reduce(p.round(20 * _diff));
                    this.weapons.reduce(p.round(10 * _diff));
                    this.gold.tarAmount += (p.round(150 * _diff));
                    this.iron.tarAmount += (p.round(50 * _diff));
                    this.food.tarAmount += (p.round(20 * _diff));
                    this.ships.tarAmount += (p.round(5 * _diff));
                    break;
            }
            this.wins++;
        }

        loseBattle(_type, _diff) {
            switch (_type) {
                case "land":
                    this.bodies.reduce(p.round(100 * _diff));
                    this.weapons.reduce(p.round(50 * _diff));
                    this.gold.reduce(p.round(100 * _diff));
                    this.iron.reduce(p.round(20 * _diff));
                    break;
                case "water":
                    this.bodies.reduce(p.round(100 * _diff));
                    this.ships.reduce(p.round(6 * _diff));
                    this.gold.reduce(p.round(200 * _diff));
                    break;
                case "seige":
                    this.bodies.reduce(p.round(150 * _diff));
                    this.weapons.reduce(p.round(20 * _diff));
                    this.gold.reduce(p.round(150 * _diff));
                    this.iron.reduce(p.round(50 * _diff));
                    this.food.reduce(p.round(20 * _diff));
                    this.ships.reduce(p.round(5 * _diff));
                    break;
            }
            this.loses++;
        }

        windFall() {
            for (var i = 0; i < this.allResources.length -1 ; i++)
            {
                if (this.allResources[i].tarAmount <= 0) {
                    this.allResources[i].tarAmount = 0;
                }
                if (this.allResources[i].tarAmount < this.allResources[i].minAmt / 4) {
                    var addAmt = p.round((this.allResources[i].minAmt * (this.loses / (this.loses + this.wins))));
                    this.allResources[i].tarAmount += addAmt
                }
               //console.log( this.allResources[i].tarAmount);
            }
            this.windFalls++;
            //console.log(this.name + "windfall");
        }
        
    };
}