var canvas = document.createElement('canvas'),
    a = document.getElementById('runner-container'),
    ctx = canvas.getContext('2d');
canvas.id = 'c';
canvas.width = 600;
canvas.height = 150;
a.appendChild(canvas);

//鍧愭爣
var spriteDefinition = {
        CACTUS_LARGE: {
            x: 332,
            y: 2
        }, //澶т粰浜烘帉
        CACTUS_SMALL: {
            x: 228,
            y: 2
        }, //灏忎粰浜烘帉
        CLOUD: {
            x: 86,
            y: 2
        }, //浜�
        HORIZON: {
            x: 2,
            y: 54
        }, //鍦伴潰
        MOON: {
            x: 484,
            y: 2
        }, //鏈堜寒
        PTERODACTYL: {
            x: 134,
            y: 2
        }, //缈奸緳
        RESTART: {
            x: 2,
            y: 2
        }, //閲嶆柊寮€濮嬫寜閽�
        TEXT_SPRITE: {
            x: 655,
            y: 2
        }, //鍒嗘暟
        TREX: {
            x: 848,
            y: 2
        }, //闇哥帇榫�
        STAR: {
            x: 645,
            y: 2
        } //鏄熸槦
    },
    FPS = 60,
    DEFAULT_WIDTH = 600,

    imgSprite = document.getElementById('sprite');

Runner.config = {
    ACCELERATION: 0.001,
    BG_CLOUD_SPEED: 0.2,
    BOTTOM_PAD: 10,
    CLEAR_TIME: 3000,
    CLOUD_FREQUENCY: 0.5,
    GAMEOVER_CLEAR_TIME: 750,
    GAP_COEFFICIENT: 0.6,
    GRAVITY: 0.6,
    INITIAL_JUMP_VELOCITY: 12,
    INVERT_FADE_DURATION: 10000, //澶滄櫄鎸佺画鏃堕棿
    INVERT_DISTANCE: 700, //姣�700璺濈杩涜鏄煎浜ゆ浛
    MAX_CLOUDS: 6, //浜戞渶澶ф暟閲�
    MAX_OBSTACLE_LENGTH: 3,
    MAX_OBSTACLE_DUPLICATION: 2,
    MAX_SPEED: 13,
    MIN_JUMP_HEIGHT: 35,
    MOBILE_SPEED_COEFFICIENT: 1.2,
    RESOURCE_TEMPLATE_ID: 'audio-resources',
    SPEED: 6,
    SPEED_DROP_COEFFICIENT: 3
};
Runner.defaultDimensions = {
    HEIGHT: 150,
    WIDTH: 600
};

Runner.classes = {
    CANVAS: 'runner-canvas',
    CONTAINER: 'runner-container',
    CRASHED: 'crashed',
    ICON: 'icon-offline',
    INVERTED: 'inverted',
    SNACKBAR: 'snackbar',
    SNACKBAR_SHOW: 'snackbar-show',
    TOUCH_CONTROLLER: 'controller'
};

Runner.sounds = {
    BUTTON_PRESS: 'offline-sound-press',
    HIT: 'offline-sound-hit',
    SCORE: 'offline-sound-reached'
};

Runner.keycodes = {
    JUMP: {
        '38': 1,
        '32': 1
    }, // Up, spacebar
    DUCK: {
        '40': 1
    }, // Down
    RESTART: {
        '13': 1
    } // Enter
};

Runner.events = {
    ANIM_END: 'webkitAnimationEnd',
    CLICK: 'click',
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
    MOUSEDOWN: 'mousedown',
    MOUSEUP: 'mouseup',
    RESIZE: 'resize',
    TOUCHEND: 'touchend',
    TOUCHSTART: 'touchstart',
    VISIBILITY: 'visibilitychange',
    BLUR: 'blur',
    FOCUS: 'focus',
    LOAD: 'load'
};

function Runner(outerContainerId, opt_config) {
    if (Runner.instance_) {
        return Runner.instance_;
    }
    Runner.instance_ = this;
    //this.outerContainerEl = document.querySelector(outerContainerId);
    this.containerEl = null;
    this.snackbarEl = null;
    //this.detailsButton = this.outerContainerEl.querySelector('#details-button');
    this.config = opt_config || Runner.config;
    this.dimensions = Runner.defaultDimensions;
    this.canvas = null;
    this.ctx = null;

    this.tRex = null;
    this.distanceMeter = null;
    this.distanceRan = 0;
    this.highestScore = 0;

    this.time = 0;
    this.runningTime = 0;
    this.msPerFrame = 1000 / FPS;
    this.currentSpeed = this.config.SPEED;

    this.obstacles = []; //闅滅鐗�

    this.started = false;
    this.activated = false;
    this.crashed = false;
    this.paused = false;
    this.inverted = false;
    this.invertTimer = 0;
    this.resizeTimerId_ = null;

    this.playCount = 0;

    // Sound FX.
    this.audioBuffer = null;
    this.soundFx = {};

    // Global web audio context for playing sounds.
    this.audioContext = null;

    // Images.
    this.images = {};
    this.imagesLoaded = 0;

    this.loadImages();
}

Runner.prototype = {
    loadImages: function() {
        this.spriteDef = spriteDefinition;
        this.init();
    },
    loadSounds: function() {
        this.audioContext = new AudioContext();
    },
    setSpeed: function(opt_speed) {
        if (opt_speed) this.currentSpeed = opt_speed;
    },
    init: function() {
        this.setSpeed();
        this.canvas = c;
        this.ctx = ctx;
        this.ctx.fillStyle = '#f7f7f7';
        this.ctx.fill();

        this.horizon = new Horizon(this.canvas, this.spriteDef, this.dimensions,
            this.config.GAP_COEFFICIENT);

        this.distanceMeter = new DistanceMeter(this.canvas, this.spriteDef.TEXT_SPRITE, this.dimensions.WIDTH);

        this.tRex = new Trex(this.canvas, this.spriteDef.TREX);

        this.startListening();
        this.update();
    },
    //寮€鍦哄姩鐢�
    playIntro: function() {
        if (!this.started && !this.crashed) {
            this.playingIntro = true;
            this.tRex.playingIntro = true;

            var keyframes = '@-webkit-keyframes intro { ' +
                'from { width:' + Trex.config.WIDTH + 'px }' +
                'to { width: ' + this.dimensions.WIDTH + 'px }' +
                '}';
            document.styleSheets[0].insertRule(keyframes, 0);
            this.containerEl = document.getElementById('runner-container');
            this.containerEl.addEventListener('webkitAnimationEnd',
                this.startGame.bind(this));

            this.containerEl.style.webkitAnimation = 'intro .4s ease-out 1 both';
            this.containerEl.style.width = this.dimensions.WIDTH + 'px';

            this.activated = true;
            this.started = true;
        } else if (this.crashed) {
            this.restart();
        }
    },
    startGame: function() {
        this.runningTime = 0;
        this.playingIntro = false;
        this.tRex.playingIntro = false;
        this.containerEl.style.webkitAnimation = '';
        this.playCount++;

        document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
        window.addEventListener('blur', this.onVisibilityChange.bind(this));
        window.addEventListener('focus', this.onVisibilityChange.bind(this));
    },
    clearCanvas: function() {
        this.ctx.clearRect(0, 0, this.dimensions.WIDTH, this.dimensions.HEIGHT);
    },
    //todo
    update: function() {
        this.drawPending = false;

        var now = getTimeStamp();
        var deltaTime = now - (this.time || now);
        this.time = now;

        if (this.activated) {

            this.clearCanvas();

            if (this.tRex.jumping) {
                this.tRex.updateJump(deltaTime);
            }

            this.runningTime += deltaTime;
            var hasObstacles = this.runningTime > this.config.CLEAR_TIME;
            //濡傛灉鏄涓€娆¤烦璺冨苟涓旀病鏈夋挱鏀惧紑鍦哄姩鐢伙紝鍒欐挱鏀惧紑鍦哄姩鐢�
            if (this.tRex.jumpCount == 1 && !this.playingIntro) {
                this.playIntro();
            }

            if (this.playingIntro) {
                this.horizon.update(0, this.currentSpeed, hasObstacles);
            } else {
                deltaTime = !this.started ? 0 : deltaTime;
                this.horizon.update(deltaTime, this.currentSpeed, hasObstacles,
                    this.inverted);
            }
            var collision = hasObstacles &&
                checkForCollision(this.horizon.obstacles[0], this.tRex);

            if (!collision) {
                this.distanceRan += this.currentSpeed * deltaTime / this.msPerFrame;

                if (this.currentSpeed < this.config.MAX_SPEED) {
                    this.currentSpeed += this.config.ACCELERATION;
                }
            } else {
                this.gameOver();
            }

            var playAchievementSound = this.distanceMeter.update(deltaTime,
                Math.ceil(this.distanceRan));

            if (playAchievementSound) {
                this.playSound(this.soundFx.SCORE);
            }
            //鑻ュ鏅氭寔缁椂闂村ぇ浜庤瀹氬€煎垯鍙樹负鐧藉ぉ
            if (this.invertTimer > this.config.INVERT_FADE_DURATION) {
                this.invertTimer = 0;
                this.invertTrigger = false;
                this.invert();
            } else if (this.invertTimer) {
                this.invertTimer += deltaTime;
            } else {
                var actualDistance =
                    this.distanceMeter.getActualDistance(Math.ceil(this.distanceRan));

                if (actualDistance > 0) {
                    this.invertTrigger = !(actualDistance %
                        this.config.INVERT_DISTANCE);

                    if (this.invertTrigger && this.invertTimer === 0) {
                        this.invertTimer += deltaTime;
                        this.invert();
                    }
                }
            }
        }
        if (!this.crashed) {
            this.tRex.update(deltaTime);
            this.raq();
        }
    },
    handleEvent: function(e) {
        return (function(evtType, events) {
            switch (evtType) {
                case events.KEYDOWN:
                case events.TOUCHSTART:
                case events.MOUSEDOWN:
                    this.onKeyDown(e);
                    break;
                case events.KEYUP:
                case events.TOUCHEND:
                case events.MOUSEUP:
                    this.onKeyUp(e);
                    break;
            }
        }.bind(this))(e.type, Runner.events);
    },
    startListening: function() {
        document.addEventListener(Runner.events.KEYDOWN, this);
        document.addEventListener(Runner.events.KEYUP, this);
        document.addEventListener(Runner.events.MOUSEDOWN, this);
        document.addEventListener(Runner.events.MOUSEUP, this);
    },
    stopListening: function() {
        document.removeEventListener(Runner.events.KEYDOWN, this);
        document.removeEventListener(Runner.events.KEYUP, this);
        document.removeEventListener(Runner.events.MOUSEDOWN, this);
        document.removeEventListener(Runner.events.MOUSEUP, this);
    },
    onKeyDown: function(e) {

        if (e.target != this.detailsButton) {
            if (!this.crashed && Runner.keycodes.JUMP[e.keyCode]) {
                e.preventDefault();
                if (!this.activated) {
                    this.loadSounds();
                    this.activated = true;
                }
                if (!this.tRex.jumping && !this.tRex.ducking) {
                    this.tRex.startJump(this.currentSpeed);
                }
            }
        }
        if (this.activated && !this.crashed && Runner.keycodes.DUCK[e.keyCode]) {

            e.preventDefault();
            if (this.tRex.jumping) {
                // Speed drop, activated only when jump key is not pressed.
                this.tRex.setSpeedDrop();
            } else if (!this.tRex.jumping && !this.tRex.ducking) {
                // Duck.
                this.tRex.setDuck(true);
            }
        }
    },
    onKeyUp: function(e) {
        var keyCode = String(e.keyCode);
        var isjumpKey = Runner.keycodes.JUMP[keyCode] ||
            e.type == Runner.events.TOUCHEND ||
            e.type == Runner.events.MOUSEDOWN;

        if (this.isRunning() && isjumpKey) {
            e.preventDefault();
            this.tRex.endJump();
        } else if (Runner.keycodes.DUCK[keyCode]) {
            e.preventDefault();
            this.tRex.speedDrop = false;
            this.tRex.setDuck(false);
        } else if (this.crashed) {
            e.preventDefault();
            // Check that enough time has elapsed before allowing jump key to restart.
            var deltaTime = getTimeStamp() - this.time;

            if (Runner.keycodes.RESTART[keyCode] || this.isLeftClickOnCanvas(e) ||
                (deltaTime >= this.config.GAMEOVER_CLEAR_TIME &&
                    Runner.keycodes.JUMP[keyCode])) {
                e.preventDefault();
                this.restart();
            }
        } else if (this.paused && isjumpKey) {
            // Reset the jump state
            e.preventDefault();
            this.tRex.reset();
            this.play();
        }
    },
    isLeftClickOnCanvas: function(e) {
        return e.button != null && e.button < 2 &&
            e.type == Runner.events.MOUSEUP && e.target == this.canvas;
    },
    raq: function() {
        if (!this.drawPending) {
            this.drawPending = true;
            this.raqId = requestAnimationFrame(this.update.bind(this));
        }
    },
    isRunning: function() {
        return !!this.raqId;
    },
    gameOver: function() {
        //this.playSound(this.soundFx.HIT);
        //vibrate(200);

        this.stop();
        this.crashed = true;
        this.distanceMeter.acheivement = false;

        this.tRex.update(100, Trex.status.CRASHED);

        // Game over panel.
        if (!this.gameOverPanel) {
            this.gameOverPanel = new GameOverPanel(this.canvas,
                this.spriteDef.TEXT_SPRITE, this.spriteDef.RESTART,
                this.dimensions);
        } else {
            this.gameOverPanel.draw();
        }

        // Update the high score.
        if (this.distanceRan > this.highestScore) {
            this.highestScore = Math.ceil(this.distanceRan);
            this.distanceMeter.setHighScore(this.highestScore);
        }

        // Reset the time clock.
        this.time = getTimeStamp();
    },
    stop: function() {
        this.activated = false;
        this.paused = true;
        cancelAnimationFrame(this.raqId);
        this.raqId = 0;
    },
    play: function() {
        if (!this.crashed) {
            this.activated = true;
            this.paused = false;
            this.tRex.update(0, Trex.status.RUNNING);
            this.time = getTimeStamp();
            this.update();
        }
    },
    restart: function() {
        if (!this.raqId) {
            this.playCount++;
            this.runningTime = 0;
            this.activated = true;
            this.crashed = false;
            this.distanceRan = 0;
            this.setSpeed(this.config.SPEED);
            this.time = getTimeStamp();
            this.containerEl.classList.remove(Runner.classes.CRASHED);
            this.clearCanvas();
            this.distanceMeter.reset(this.highestScore);
            this.horizon.reset();
            this.tRex.reset();
            //this.playSound(this.soundFx.BUTTON_PRESS);
            this.invert(true);
            this.update();
        }
    },
    onVisibilityChange: function(e) {
        if (document.hidden || document.webkitHidden || e.type == 'blur' ||
            document.visibilityState != 'visible') {
            this.stop();
        } else if (!this.crashed) {
            this.tRex.reset();
            this.play();
        }
    },
    playSound: function(soundBuffer) {
        if (soundBuffer) {
            var sourceNode = this.audioContext.createBufferSource();
            sourceNode.buffer = soundBuffer;
            sourceNode.connect(this.audioContext.destination);
            sourceNode.start(0);
        }
    },
    invert: function(reset) {
        if (reset) {
            a.classList.toggle(Runner.classes.INVERTED, this.invertTrigger);
            //document.body.classList.toggle(Runner.classes.INVERTED,false);
            this.invertTimer = 0;
            this.inverted = false;
        } else {
            this.inverted = a.classList.toggle(Runner.classes.INVERTED, this.invertTrigger);

            //this.inverted = document.body.classList.toggle(Runner.classes.INVERTED,this.invertTrigger);
        }
    }
};

window['Runner'] = Runner;

function decodeBase64ToArrayBuffer(base64String) {
    var len = (base64String.length / 4) * 3;
    var str = atob(base64String);
    var arrayBuffer = new ArrayBuffer(len);
    var bytes = new Uint8Array(arrayBuffer);

    for (var i = 0; i < len; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
}

GameOverPanel.dimensions = {
    TEXT_X: 0,
    TEXT_Y: 13,
    TEXT_WIDTH: 191,
    TEXT_HEIGHT: 11,
    RESTART_WIDTH: 36,
    RESTART_HEIGHT: 32
};

function GameOverPanel(canvas, textImgPos, restartImgPos, dimensions) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasDimensions = dimensions;
    this.textImgPos = textImgPos;
    this.restartImgPos = restartImgPos;
    this.draw();
}


GameOverPanel.prototype = {
    /**
     * Update the panel dimensions.
     * @param {number} width New canvas width.
     * @param {number} opt_height Optional new canvas height.
     */
    updateDimensions: function(width, opt_height) {
        this.canvasDimensions.WIDTH = width;
        if (opt_height) {
            this.canvasDimensions.HEIGHT = opt_height;
        }
    },

    /**
     * Draw the panel.
     */
    draw: function() {
        var dimensions = GameOverPanel.dimensions;

        var centerX = this.canvasDimensions.WIDTH / 2;

        // Game over text.
        var textSourceX = dimensions.TEXT_X;
        var textSourceY = dimensions.TEXT_Y;
        var textSourceWidth = dimensions.TEXT_WIDTH;
        var textSourceHeight = dimensions.TEXT_HEIGHT;

        var textTargetX = Math.round(centerX - (dimensions.TEXT_WIDTH / 2));
        var textTargetY = Math.round((this.canvasDimensions.HEIGHT - 25) / 3);
        var textTargetWidth = dimensions.TEXT_WIDTH;
        var textTargetHeight = dimensions.TEXT_HEIGHT;

        var restartSourceWidth = dimensions.RESTART_WIDTH;
        var restartSourceHeight = dimensions.RESTART_HEIGHT;
        var restartTargetX = centerX - (dimensions.RESTART_WIDTH / 2);
        var restartTargetY = this.canvasDimensions.HEIGHT / 2;


        textSourceX += this.textImgPos.x;
        textSourceY += this.textImgPos.y;

        // Game over text from sprite.
        this.ctx.drawImage(imgSprite,
            textSourceX, textSourceY, textSourceWidth, textSourceHeight,
            textTargetX, textTargetY, textTargetWidth, textTargetHeight);

        // Restart button.
        this.ctx.drawImage(imgSprite,
            this.restartImgPos.x, this.restartImgPos.y,
            restartSourceWidth, restartSourceHeight,
            restartTargetX, restartTargetY, dimensions.RESTART_WIDTH,
            dimensions.RESTART_HEIGHT);
    }
};


//鍦伴潰
function HorizonLine(canvas, spritePos) {
    this.spritePos = spritePos;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sourceDimensions = {};
    this.dimensions = HorizonLine.dimensions;
    this.sourceXPos = [this.spritePos.x, this.spritePos.x + this.dimensions.WIDTH];
    this.xPos = [];
    this.yPos = 0;
    this.bumpThreshold = 0.5; //鍦板舰绯绘暟

    this.setSourceDimesions();
    this.draw();
}

HorizonLine.dimensions = {
    WIDTH: 600, //瀹�600
    HEIGHT: 12, //楂�12鍍忕礌
    YPOS: 127 //鍦ㄧ敾甯冧腑鐨勪綅缃�
};

HorizonLine.prototype = {
    setSourceDimesions: function() {
        for (var dimension in HorizonLine.dimensions) {
            this.sourceDimensions[dimension] = HorizonLine.dimensions[dimension];
            this.dimensions[dimension] = HorizonLine.dimensions[dimension];
        }
        //鍦伴潰鍦ㄧ敾甯冧笂鐨勪綅缃�
        this.xPos = [0, HorizonLine.dimensions.WIDTH]; //0,600
        this.yPos = HorizonLine.dimensions.YPOS;
    },
    //闅忔満鍦板舰
    getRandomType: function() {
        return Math.random() > this.bumpThreshold ? this.dimensions.WIDTH : 0;
    },
    draw: function() {
        this.ctx.drawImage(imgSprite,
            this.sourceXPos[0], this.spritePos.y,
            this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
            this.xPos[0], this.yPos,
            this.dimensions.WIDTH, this.dimensions.HEIGHT);

        this.ctx.drawImage(imgSprite,
            this.sourceXPos[1], this.spritePos.y,
            this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
            this.xPos[1], this.yPos,
            this.dimensions.WIDTH, this.dimensions.HEIGHT);

    },
    updateXPos: function(pos, increment) {
        var line1 = pos,
            line2 = pos === 0 ? 1 : 0;

        this.xPos[line1] -= increment;
        this.xPos[line2] = this.xPos[line1] + this.dimensions.WIDTH;

        if (this.xPos[line1] <= -this.dimensions.WIDTH) {
            this.xPos[line1] += this.dimensions.WIDTH * 2;
            this.xPos[line2] = this.xPos[line1] - this.dimensions.WIDTH;
            this.sourceXPos[line1] = this.getRandomType() + this.spritePos.x;
        }
    },
    update: function(deltaTime, speed) {
        var increment = Math.floor(speed * (FPS / 1000) * deltaTime);
        if (this.xPos[0] <= 0) {
            this.updateXPos(0, increment);
        } else {
            this.updateXPos(1, increment);
        }
        this.draw();
    },
    reset: function() {
        this.xPos[0] = 0;
        this.xPos[1] = HorizonLine.dimensions.WIDTH;
    }
};


//浜�
Cloud.config = {
    HEIGHT: 14,
    MAX_CLOUD_GAP: 400,
    MAX_SKY_LEVEL: 30,
    MIN_CLOUD_GAP: 100,
    MIN_SKY_LEVEL: 71,
    WIDTH: 46
};

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTimeStamp() {
    return performance.now();
}

function Cloud(canvas, spritePos, containerWidth) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.spritePos = spritePos;
    this.containerWidth = containerWidth;
    this.xPos = containerWidth;
    this.yPos = 0;
    this.remove = false;
    //浜戦棿闅�
    this.cloudGap = getRandomNum(Cloud.config.MIN_CLOUD_GAP, Cloud.config.MAX_CLOUD_GAP);
    this.init();
}

Cloud.prototype = {
    init: function() {
        //浜戠殑楂樺害闅忔満
        this.yPos = getRandomNum(Cloud.config.MAX_SKY_LEVEL, Cloud.config.MIN_SKY_LEVEL);
        this.draw();
    },
    draw: function() {
        this.ctx.save();
        var sourceWidth = Cloud.config.WIDTH,
            sourceHeight = Cloud.config.HEIGHT;

        this.ctx.drawImage(imgSprite,
            this.spritePos.x, this.spritePos.y,
            sourceWidth, sourceHeight,
            this.xPos, this.yPos,
            sourceWidth, sourceHeight);

        this.ctx.restore();
    },
    update: function(speed) {
        if (!this.remove) {
            //鍚戝乏绉诲姩
            this.xPos -= Math.ceil(speed);
            this.draw();

            if (!this.isVisible()) {
                this.remove = true;
            }
        }
    },
    //鍒ゆ柇鏄惁绉诲嚭灞忓箷澶�
    isVisible: function() {
        return this.xPos + Cloud.config.WIDTH > 0;
    }
};

//澶滄櫄
//todo
NightMode.config = {
    FADE_SPEED: 0.035, //娣″叆娣″嚭閫熷害
    HEIGHT: 40, //鏈堜寒楂樺害
    MOON_SPEED: 0.25, //鏈堜寒绉诲姩閫熷害
    NUM_STARS: 2, //鏄熸槦鏁伴噺
    STAR_SIZE: 9, //鏄熸槦瀹藉害
    STAR_SPEED: 0.3, //鏄熸槦閫熷害
    STAR_MAX_Y: 70, //鏄熸槦鍦ㄧ敾甯冧笂鍑虹幇鐨勪綅缃�
    WIDTH: 20 //鍗婁釜鏈堝害瀹藉害
};
NightMode.phases = [140, 120, 100, 60, 40, 20, 0];

function NightMode(canvas, spritePos, containerWidth) {
    this.spritePos = spritePos;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.containerWidth = containerWidth;
    this.xPos = containerWidth - 50; //鏈堜寒鐨剎鍧愭爣
    this.yPos = 30; //鏈堜寒鐨剏鍧愭爣
    this.currentPhase = 0;
    this.opacity = 0;
    this.stars = []; //鐢ㄤ簬瀛樺偍鏄熸槦
    this.drawStars = false;
    this.placeStars(); //鏀剧疆鏄熸槦
}

NightMode.prototype = {
    update: function(activated) {
        if (activated && this.opacity == 0) {
            this.currentPhase++;
            if (this.currentPhase >= NightMode.phases.length) {
                this.currentPhase = 0;
            }
        }

        //娣″叆娣″嚭
        if (activated && (this.opacity < 1 || this.opacity == 0)) {
            this.opacity += NightMode.config.FADE_SPEED;
        } else if (this.opacity > 0) {
            this.opacity -= NightMode.config.FADE_SPEED;
        }

        //绉诲姩鏈堜寒
        if (this.opacity > 0) {
            this.xPos = this.updateXPos(this.xPos, NightMode.config.MOON_SPEED);

            //绉诲姩鏄熸槦
            if (this.drawStars) {
                for (var i = 0; i < NightMode.config.NUM_STARS; i++) {
                    this.stars[i].x = this.updateXPos(this.stars[i].x, NightMode.config.STAR_SPEED);
                }
            }
            this.draw();
        } else {
            this.opacity = 0;
            this.placeStars();
        }
        this.drawStars = true;
    },
    updateXPos: function(currentPos, speed) {
        if (currentPos < -NightMode.config.WIDTH) {
            currentPos = this.containerWidth;
        } else {
            currentPos -= speed;
        }
        return currentPos;
    },
    draw: function() {
        var moonSourceWidth = this.currentPhase == 3 ? NightMode.config.WIDTH * 2 :
            NightMode.config.WIDTH;
        var moonSourceHeight = NightMode.config.HEIGHT;
        var moonSourceX = this.spritePos.x + NightMode.phases[this.currentPhase];
        var moonOutputWidth = moonSourceWidth;
        var starSize = NightMode.config.STAR_SIZE;
        var starSourceX = spriteDefinition.STAR.x;

        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;

        if (this.drawStars) {
            for (var i = 0; i < NightMode.config.NUM_STARS; i++) {
                this.ctx.drawImage(imgSprite,
                    starSourceX, this.stars[i].sourceY,
                    starSize, starSize,
                    Math.round(this.stars[i].x), this.stars[i].y,
                    NightMode.config.STAR_SIZE, NightMode.config.STAR_SIZE);
            }
        }

        this.ctx.drawImage(imgSprite,
            moonSourceX, this.spritePos.y,
            moonSourceWidth, moonSourceHeight,
            Math.round(this.xPos), this.yPos,
            moonOutputWidth, NightMode.config.HEIGHT);

        this.ctx.globalAlpha = 1;
        this.ctx.restore();
    },
    placeStars: function() {
        var segmentSize = Math.round(this.containerWidth / NightMode.config.NUM_STARS);
        for (var i = 0; i < NightMode.config.NUM_STARS; i++) {
            this.stars[i] = {};
            this.stars[i].x = getRandomNum(segmentSize * i, segmentSize * (i + 1));
            this.stars[i].y = getRandomNum(0, NightMode.config.STAR_MAX_Y);
            this.stars[i].sourceY = spriteDefinition.STAR.y + NightMode.config.STAR_SIZE * i;
        }
    },
    reset: function() {
        this.currentPhase = 0;
        this.opacity = 0;
        this.update(false);
    }
};

Horizon.config = {
    BG_CLOUD_SPEED: 0.2,
    BUMPY_THRESHOLD: .3,
    CLOUD_FREQUENCY: .5,
    HORIZON_HEIGHT: 16,
    MAX_CLOUDS: 6
};

//鍦板舰
function Horizon(canvas, spritePos, dimensions, gapCoefficient) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = Horizon.config;
    this.dimensions = dimensions;
    this.gapCoefficient = gapCoefficient;
    //闅滅鐗╁垪琛�
    this.obstacles = [];
    this.obstacleHistory = [];
    this.horizonOffsets = [0, 0];
    this.cloudFrequency = this.config.CLOUD_FREQUENCY;
    this.spritePos = spritePos;
    this.nightMode = null;

    //浜�
    this.clouds = [];
    this.cloudSpeed = this.config.BG_CLOUD_SPEED;

    //鍦伴潰
    this.horizonLine = null;
    this.init();
}

Horizon.prototype = {
    //鍒濆鍖栧湴骞抽潰锛屼簯
    init: function() {
        this.addCloud();
        this.horizonLine = new HorizonLine(this.canvas, this.spritePos.HORIZON);
        this.nightMode = new NightMode(this.canvas, this.spritePos.MOON, this.dimensions.WIDTH);
    },
    update: function(deltaTime, currentSpeed, updateObstacles, showNightMode) {
        this.runningTime += deltaTime;
        this.horizonLine.update(deltaTime, currentSpeed);
        this.nightMode.update(showNightMode);
        this.updateClouds(deltaTime, currentSpeed);

        if (updateObstacles) {
            this.updateObstacles(deltaTime, currentSpeed);
        }
    },
    updateClouds: function(deltaTime, speed) {
        var cloudSpeed = this.cloudSpeed / 1000 * deltaTime * speed;
        var numClouds = this.clouds.length;

        if (numClouds) {
            for (var i = numClouds - 1; i >= 0; i--) {
                this.clouds[i].update(cloudSpeed);
            }
            var lastCloud = this.clouds[numClouds - 1];
            if (numClouds < this.config.MAX_CLOUDS &&
                (this.dimensions.WIDTH - lastCloud.xPos) > lastCloud.cloudGap &&
                this.cloudFrequency > Math.random()) {
                this.addCloud();
            }

            this.clouds = this.clouds.filter(function(obj) {
                return !obj.remove;
            });
        } else {
            this.addCloud();
        }
    },
    updateObstacles: function(deltaTime, currentSpeed) {
        // Obstacles, move to Horizon layer.
        var updatedObstacles = this.obstacles.slice(0);

        for (var i = 0; i < this.obstacles.length; i++) {
            var obstacle = this.obstacles[i];
            obstacle.update(deltaTime, currentSpeed);

            // Clean up existing obstacles.
            if (obstacle.remove) {
                updatedObstacles.shift();
            }
        }
        this.obstacles = updatedObstacles;

        if (this.obstacles.length > 0) {
            var lastObstacle = this.obstacles[this.obstacles.length - 1];

            if (lastObstacle && !lastObstacle.followingObstacleCreated &&
                lastObstacle.isVisible() &&
                (lastObstacle.xPos + lastObstacle.width + lastObstacle.gap) <
                this.dimensions.WIDTH) {
                this.addNewObstacle(currentSpeed);
                lastObstacle.followingObstacleCreated = true;
            }
        } else {
            // Create new obstacles.
            this.addNewObstacle(currentSpeed);
        }
    },
    removeFirstObstacle: function() {
        this.obstacles.shift();
    },
    addNewObstacle: function(currentSpeed) {
        var obstacleTypeIndex = getRandomNum(0, Obstacle.types.length - 1);
        var obstacleType = Obstacle.types[obstacleTypeIndex];

        if (this.duplicateObstacleCheck(obstacleType.type) || currentSpeed < obstacleType.minSpeed) {
            this.addNewObstacle(currentSpeed);
        } else {
            var obstacleSpritePos = this.spritePos[obstacleType.type];
            this.obstacles.push(new Obstacle(this.ctx, obstacleType, obstacleSpritePos, this.dimensions,
                this.gapCoefficient, currentSpeed, obstacleType.width));

            this.obstacleHistory.unshift(obstacleType.type);
        }

        if (this.obstacleHistory.length > 1) {
            this.obstacleHistory.splice(Runner.config.MAX_OBSTACLE_DUPLICATION);
        }
    },
    duplicateObstacleCheck: function(nextObstacleType) {
        var duplicateCount = 0;

        for (var i = 0; i < this.obstacleHistory.length; i++) {
            duplicateCount = this.obstacleHistory[i] == nextObstacleType ? duplicateCount + 1 : 0;
        }
        return duplicateCount >= Runner.config.MAX_OBSTACLE_DUPLICATION;
    },
    reset: function() {
        this.obstacles = [];
        this.horizonLine.reset();
        this.nightMode.reset();
    },
    resize: function(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    },
    addCloud: function() {
        this.clouds.push(new Cloud(this.canvas, this.spritePos.CLOUD, this.dimensions.WIDTH));
    }
};


Obstacle.MAX_GAP_COEFFICIENT = 1.5;
Obstacle.MAX_OBSTACLE_LENGTH = 3;
Obstacle.types = [{
    type: 'CACTUS_SMALL',
    width: 17,
    height: 35,
    yPos: 105,
    multipleSpeed: 4,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [
        new CollisionBox(0, 7, 5, 27),
        new CollisionBox(4, 0, 6, 34),
        new CollisionBox(10, 4, 7, 14)
    ]
}, {
    type: 'CACTUS_LARGE',
    width: 25,
    height: 50,
    yPos: 90,
    multipleSpeed: 7,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [
        new CollisionBox(0, 12, 7, 38),
        new CollisionBox(8, 0, 7, 49),
        new CollisionBox(13, 10, 10, 38)
    ]
}, {
    type: 'PTERODACTYL',
    width: 46,
    height: 40,
    yPos: [100, 75, 50], // Variable height. 楂樸€佷腑銆佷綆涓夌楂樺害
    yPosMobile: [100, 50], // Variable height mobile.
    multipleSpeed: 999,
    minSpeed: 8.5,
    minGap: 150,
    collisionBoxes: [
        new CollisionBox(15, 15, 16, 5),
        new CollisionBox(18, 21, 24, 6),
        new CollisionBox(2, 14, 4, 3),
        new CollisionBox(6, 10, 4, 7),
        new CollisionBox(10, 8, 6, 9)
    ],
    numFrames: 2,
    frameRate: 1000 / 6,
    speedOffset: .8
}];

function Obstacle(ctx, type, spriteImgPos, dimensions, gapCoefficient, speed, opt_xOffset) {
    this.ctx = ctx;
    this.spritePos = spriteImgPos;
    //闅滅鐗╃被鍨�(浠欎汉鎺屻€佺考榫�)
    this.typeConfig = type;
    this.gapCoefficient = gapCoefficient;
    this.size = getRandomNum(1, Obstacle.MAX_OBSTACLE_LENGTH);
    this.dimensions = dimensions;
    this.remove = false;
    this.xPos = dimensions.WIDTH + (opt_xOffset || 0);
    this.yPos = 0;
    this.width = 0;
    this.collisionBoxes = [];
    this.gap = 0;
    this.speedOffset = 0;

    // For animated obstacles.
    this.currentFrame = 0;
    this.timer = 0;

    this.init(speed);
}

Obstacle.prototype = {
    init: function(speed) {
        this.cloneCollisionBoxes();
        //鑻ultipleSpeed澶т簬绉诲姩閫熷害锛屽垯鍙嚭鐜颁竴涓殰纰嶇墿
        if (this.size > 1 && this.typeConfig.multipleSpeed > speed) {
            this.size = 1;
        }

        this.width = this.typeConfig.width * this.size;

        if (Array.isArray(this.typeConfig.yPos)) {
            var yPosConfig = this.typeConfig.yPos;
            this.yPos = yPosConfig[getRandomNum(0, yPosConfig.length - 1)];
        } else {
            this.yPos = this.typeConfig.yPos;
        }

        this.draw();

        if (this.size > 1) {
            this.collisionBoxes[1].width = this.width - this.collisionBoxes[0].width -
                this.collisionBoxes[2].width;

            this.collisionBoxes[2].x = this.width - this.collisionBoxes[2].width;
        }

        if (this.typeConfig.speedOffset) {
            this.speedOffset = Math.random() > 0.5 ? this.typeConfig.speedOffset :
                -this.typeConfig.speedOffset;
        }

        this.gap = this.getGap(this.gapCoefficient, speed);
    },
    draw: function() {
        var sourceWidth = this.typeConfig.width;
        var sourceHeight = this.typeConfig.height;
        var sourceX = (sourceWidth * this.size) * (0.5 * (this.size - 1)) +
            this.spritePos.x;

        // Animation frames.
        if (this.currentFrame > 0) {
            sourceX += sourceWidth * this.currentFrame;
        }
        this.ctx.drawImage(imgSprite,
            sourceX, this.spritePos.y,
            sourceWidth * this.size, sourceHeight,
            this.xPos, this.yPos,
            sourceWidth * this.size, sourceHeight);
    },
    update: function(deltaTime, speed) {
        if (!this.remove) {
            if (this.typeConfig.speedOffset) {
                speed += this.speedOffset;
            }
            this.xPos -= Math.floor((speed * FPS / 1000) * deltaTime);

            // Update frame
            if (this.typeConfig.numFrames) {
                this.timer += deltaTime;
                if (this.timer >= this.typeConfig.frameRate) {
                    this.currentFrame = this.currentFrame == this.typeConfig.numFrames - 1 ? 0 : this.currentFrame + 1;
                    this.timer = 0;
                }
            }
            this.draw();

            if (!this.isVisible()) {
                this.remove = true;
            }
        }
    },
    getGap: function(gapCoefficient, speed) {
        var minGap = Math.round(this.width * speed +
            this.typeConfig.minGap * gapCoefficient);
        var maxGap = Math.round(minGap * Obstacle.MAX_GAP_COEFFICIENT);
        return getRandomNum(minGap, maxGap);
    },
    isVisible: function() {
        return this.xPos + this.width > 0;
    },
    cloneCollisionBoxes: function() {
        var collisionBoxes = this.typeConfig.collisionBoxes;

        for (var i = collisionBoxes.length - 1; i >= 0; i--) {
            this.collisionBoxes[i] = new CollisionBox(collisionBoxes[i].x,
                collisionBoxes[i].y, collisionBoxes[i].width,
                collisionBoxes[i].height);
        }
    }
};

DistanceMeter.dimensions = {
    WIDTH: 10,
    HEIGHT: 13,
    DEST_WIDTH: 11
};
DistanceMeter.yPos = [0, 13, 27, 40, 53, 67, 80, 93, 107, 120];
DistanceMeter.config = {
    // Number of digits.
    MAX_DISTANCE_UNITS: 5,

    // Distance that causes achievement animation.
    ACHIEVEMENT_DISTANCE: 100,

    // Used for conversion from pixel distance to a scaled unit.
    COEFFICIENT: 0.025,

    // Flash duration in milliseconds.
    FLASH_DURATION: 1000 / 4,

    // Flash iterations for achievement animation.
    FLASH_ITERATIONS: 3
};

function DistanceMeter(canvas, spritePos, canvasWidth) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = imgSprite;
    this.spritePos = spritePos;
    this.x = 0;
    this.y = 5;

    this.currentDistance = 0;
    this.maxScore = 0;
    this.highScore = 0;
    this.container = null;

    this.digits = [];
    this.acheivement = false;
    this.defaultString = '';
    this.flashTimer = 0;
    this.flashIterations = 0;
    this.invertTrigger = false;

    this.config = DistanceMeter.config;
    this.maxScoreUnits = this.config.MAX_DISTANCE_UNITS;
    this.init(canvasWidth);
}

DistanceMeter.prototype = {
    init: function(width) {
        var maxDistanceStr = '';

        this.calcXPos(width);
        this.maxScore = this.maxScoreUnits;
        for (var i = 0; i < this.maxScoreUnits; i++) {
            this.draw(i, 0);
            this.defaultString += '0';
            maxDistanceStr += '9';
        }

        this.maxScore = parseInt(maxDistanceStr);
    },
    calcXPos: function(canvasWidth) {
        this.x = canvasWidth - (DistanceMeter.dimensions.DEST_WIDTH *
            (this.maxScoreUnits + 1));
    },
    draw: function(digitPos, value, opt_highScore) {
        var sourceWidth = DistanceMeter.dimensions.WIDTH;
        var sourceHeight = DistanceMeter.dimensions.HEIGHT;
        var sourceX = DistanceMeter.dimensions.WIDTH * value;
        var sourceY = 0;

        var targetX = digitPos * DistanceMeter.dimensions.DEST_WIDTH;
        var targetY = this.y;
        var targetWidth = DistanceMeter.dimensions.WIDTH;
        var targetHeight = DistanceMeter.dimensions.HEIGHT;

        sourceX += this.spritePos.x;
        sourceY += this.spritePos.y;

        this.ctx.save();

        if (opt_highScore) {
            // Left of the current score.
            var highScoreX = this.x - (this.maxScoreUnits * 2) *
                DistanceMeter.dimensions.WIDTH;
            this.ctx.translate(highScoreX, this.y);
        } else {
            this.ctx.translate(this.x, this.y);
        }
        this.ctx.drawImage(this.image, sourceX, sourceY,
            sourceWidth, sourceHeight,
            targetX, targetY,
            targetWidth, targetHeight
        );
        this.ctx.restore();
    },
    getActualDistance: function(distance) {
        return distance ? Math.round(distance * this.config.COEFFICIENT) : 0;
    },
    update: function(deltaTime, distance) {
        var paint = true;
        var playSound = false;

        if (!this.acheivement) {
            distance = this.getActualDistance(distance);
            // Score has gone beyond the initial digit count.
            if (distance > this.maxScore && this.maxScoreUnits == this.config.MAX_DISTANCE_UNITS) {
                this.maxScoreUnits++;
                this.maxScore = parseInt(this.maxScore + '9');
            } else {
                this.distance = 0;
            }

            if (distance > 0) {
                // Acheivement unlocked
                if (distance % this.config.ACHIEVEMENT_DISTANCE == 0) {
                    // Flash score and play sound.
                    this.acheivement = true;
                    this.flashTimer = 0;
                    playSound = true;
                }

                // Create a string representation of the distance with leading 0.
                var distanceStr = (this.defaultString +
                    distance).substr(-this.maxScoreUnits);
                this.digits = distanceStr.split('');
            } else {
                this.digits = this.defaultString.split('');
            }
        } else {
            // Control flashing of the score on reaching acheivement.
            if (this.flashIterations <= this.config.FLASH_ITERATIONS) {
                this.flashTimer += deltaTime;

                if (this.flashTimer < this.config.FLASH_DURATION) {
                    paint = false;
                } else if (this.flashTimer >
                    this.config.FLASH_DURATION * 2) {
                    this.flashTimer = 0;
                    this.flashIterations++;
                }
            } else {
                this.acheivement = false;
                this.flashIterations = 0;
                this.flashTimer = 0;
            }
        }

        // Draw the digits if not flashing.
        if (paint) {
            for (var i = this.digits.length - 1; i >= 0; i--) {
                this.draw(i, parseInt(this.digits[i]));
            }
        }

        this.drawHighScore();
        return playSound;
    },
    drawHighScore: function() {
        this.ctx.save();
        this.ctx.globalAlpha = .8;
        for (var i = this.highScore.length - 1; i >= 0; i--) {
            this.draw(i, parseInt(this.highScore[i], 10), true);
        }
        this.ctx.restore();
    },
    setHighScore: function(distance) {
        distance = this.getActualDistance(distance);
        var highScoreStr = (this.defaultString +
            distance).substr(-this.maxScoreUnits);

        this.highScore = ['10', '11', ''].concat(highScoreStr.split(''));
    },
    reset: function() {
        this.update(0);
        this.acheivement = false;
    }
};


/**
 * 纰版挒妫€娴嬬洅瀛�
 * @param x    {number} x鍧愭爣
 * @param y {number} y鍧愭爣
 * @param w    {number} 瀹藉害
 * @param h    {number} 楂樺害
 */
function CollisionBox(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}

function checkForCollision(obstacle, tRex, opt_canvasCtx) {
    var obstacleBoxXPos = Runner.defaultDimensions.WIDTH + obstacle.xPos;
    var tRexBox = new CollisionBox(
        tRex.xPos + 1,
        tRex.yPos + 1,
        tRex.config.WIDTH - 2,
        tRex.config.HEIGHT - 2);
    var obstacleBox = new CollisionBox(
        obstacle.xPos + 1,
        obstacle.yPos + 1,
        obstacle.typeConfig.width * obstacle.size - 2,
        obstacle.typeConfig.height - 2);

    if (opt_canvasCtx) {
        drawCollisionBoxes(opt_canvasCtx, tRexBox, obstacleBox);
    }
    if (boxCompare(tRexBox, obstacleBox)) {
        var collisionBoxes = obstacle.collisionBoxes;
        var tRexCollisionBoxes = tRex.ducking ?
            Trex.collisionBoxes.DUCKING : Trex.collisionBoxes.RUNNING;

        for (var t = 0; t < tRexCollisionBoxes.length; t++) {
            for (var i = 0; i < collisionBoxes.length; i++) {
                // Adjust the box to actual positions.
                var adjTrexBox =
                    createAdjustedCollisionBox(tRexCollisionBoxes[t], tRexBox);
                var adjObstacleBox =
                    createAdjustedCollisionBox(collisionBoxes[i], obstacleBox);
                var crashed = boxCompare(adjTrexBox, adjObstacleBox);

                // Draw boxes for debug.
                if (opt_canvasCtx) {
                    drawCollisionBoxes(opt_canvasCtx, adjTrexBox, adjObstacleBox);
                }

                if (crashed) {
                    return [adjTrexBox, adjObstacleBox];
                }
            }
        }
    }
    return false;
}

function createAdjustedCollisionBox(box, adjustment) {
    return new CollisionBox(
        box.x + adjustment.x,
        box.y + adjustment.y,
        box.width,
        box.height);
}


function boxCompare(tRexBox, obstacleBox) {
    var crashed = false;
    var tRexBoxX = tRexBox.x;
    var tRexBoxY = tRexBox.y;

    var obstacleBoxX = obstacleBox.x;
    var obstacleBoxY = obstacleBox.y;

    // Axis-Aligned Bounding Box method.
    if (tRexBox.x < obstacleBoxX + obstacleBox.width &&
        tRexBox.x + tRexBox.width > obstacleBoxX &&
        tRexBox.y < obstacleBox.y + obstacleBox.height &&
        tRexBox.height + tRexBox.y > obstacleBox.y) {
        crashed = true;
    }

    return crashed;
}

function drawCollisionBoxes(canvasCtx, tRexBox, obstacleBox) {
    canvasCtx.save();
    canvasCtx.lineWidth = 0.5;
    canvasCtx.strokeStyle = '#f00';
    canvasCtx.strokeRect(tRexBox.x + 0.5, tRexBox.y + 0.5, tRexBox.width, tRexBox.height);

    canvasCtx.strokeStyle = '#0f0';
    canvasCtx.strokeRect(obstacleBox.x + 0.5, obstacleBox.y + 0.5,
        obstacleBox.width, obstacleBox.height);
    canvasCtx.restore();
}

Trex.config = {
    DROP_VELOCITY: -5, //涓嬭惤閫熷害
    GRAVITY: 0.6, //閲嶅姏
    HEIGHT: 47, //绔欑珛鏃堕珮搴�
    HEIGHT_DUCK: 25, //闂翰鏃堕珮搴�
    INIITAL_JUMP_VELOCITY: -10, //鍒濆璧疯烦閫熷害
    INTRO_DURATION: 1500,
    MAX_JUMP_HEIGHT: 30, //鏈€澶ц捣璺抽珮搴�
    MIN_JUMP_HEIGHT: 30, //鏈€灏忚捣璺抽珮搴�
    SPEED_DROP_COEFFICIENT: 3,
    SPRITE_WIDTH: 262, //闆ⅶ鍥鹃湼鐜嬮緳閮ㄥ垎鐨勫搴�(涓嶅寘鍚棯閬垮姩浣�)
    START_X_POS: 50, //鍦ㄧ敾甯冪殑璧峰浣嶇疆
    WIDTH: 44, //绔欑珛鏃跺搴�
    WIDTH_DUCK: 59 //闂伩鏃跺搴�
};

Trex.status = {
    CRASHED: 'CRASHED', //纰板埌闅滅鐗�
    DUCKING: 'DUCKING', //闂伩
    JUMPING: 'JUMPING', //璺宠穬
    RUNNING: 'RUNNING', //璺戝姩
    WAITING: 'WAITING' //绛夊緟
};

Trex.BLINK_TIMING = 3000;

Trex.collisionBoxes = {
    DUCKING: [
        new CollisionBox(1, 18, 55, 25)
    ],
    RUNNING: [
        new CollisionBox(22, 0, 17, 16),
        new CollisionBox(1, 18, 30, 9),
        new CollisionBox(10, 35, 14, 8),
        new CollisionBox(1, 24, 29, 5),
        new CollisionBox(5, 30, 21, 4),
        new CollisionBox(9, 34, 15, 4)
    ]
};

Trex.animFrames = {
    WAITING: {
        frames: [44, 0],
        msPerFrame: 1000 / 3
    },
    RUNNING: {
        frames: [88, 132],
        msPerFrame: 1000 / 12
    },
    CRASHED: {
        frames: [220],
        msPerFrame: 1000 / 60
    },
    JUMPING: {
        frames: [0],
        msPerFrame: 1000 / 60
    },
    DUCKING: {
        frames: [262, 321],
        msPerFrame: 1000 / 8
    }
};

function Trex(canvas, spritePos) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.spritePos = spritePos;
    this.xPos = 0;
    this.yPos = 0;
    //绔欑珛鏃剁殑Y杞村潗鏍�
    this.groundYPos = 0;
    this.currentFrame = 0;
    this.currentAnimFrames = [];
    this.blinkDelay = 0;
    this.animStartTime = 0;
    this.timer = 0;
    this.msPerFrame = 1000 / FPS;
    this.config = Trex.config;
    //褰撳墠鐨勫姩浣滀负绛夊緟鐘舵€�
    this.status = Trex.status.WAITING;

    this.jumping = false; //鏄惁璺宠穬
    this.ducking = false; //鏄惁闂伩
    this.jumpVelocity = 0;
    this.reachedMinHeight = false;
    this.speedDrop = false;
    this.jumpCount = 0;
    this.jumpspotX = 0; //绌洪檷鐫€闄嗙偣

    this.init();
}

Trex.prototype = {
    init: function() {
        this.blinkDelay = this.setBlinkDelay();
        this.groundYPos = Runner.defaultDimensions.HEIGHT - this.config.HEIGHT -
            Runner.config.BOTTOM_PAD;
        this.yPos = this.groundYPos;

        this.minJumpHeight = this.groundYPos - this.config.MIN_JUMP_HEIGHT;
        this.draw(0, 0);
        this.update(0, Trex.status.WAITING);
    },
    setJumpVelocity: function(setting) {
        this.config.INIITAL_JUMP_VELOCITY = -setting;
        this.config.DROP_VELOCITY = -setting / 2;
    },
    update: function(deltaTime, opt_status) {
        this.timer += deltaTime;
        if (opt_status) {
            this.status = opt_status;
            this.currentFrame = 0;
            this.msPerFrame = Trex.animFrames[opt_status].msPerFrame;
            this.currentAnimFrames = Trex.animFrames[opt_status].frames;

            if (opt_status == Trex.status.WAITING) {
                this.animStartTime = getTimeStamp();
                this.setBlinkDelay();
            }
        }
        if (this.playingIntro && this.xPos < this.config.START_X_POS) {
            this.xPos += Math.round((this.config.START_X_POS /
                this.config.INTRO_DURATION) * deltaTime);
        }

        if (this.status == Trex.status.WAITING) {
            this.blink(getTimeStamp());
        } else {
            this.draw(this.currentAnimFrames[this.currentFrame], 0);
        }

        if (this.timer >= this.msPerFrame) {
            this.currentFrame = this.currentFrame == this.currentAnimFrames.length - 1 ? 0 : this.currentFrame + 1;
            this.timer = 0;
        }

        if (this.speedDrop && this.yPos == this.groundYPos) {
            this.speedDrop = false;
            this.setDuck(true);
        }
    },
    setBlinkDelay: function() {
        this.blinkDelay = Math.ceil(Math.random() * Trex.BLINK_TIMING);
    },
    blink: function(time) {
        var deltaTime = time - this.animStartTime;

        if (deltaTime >= this.blinkDelay) {
            this.draw(this.currentAnimFrames[this.currentFrame], 0);

            if (this.currentFrame == 1) {
                // Set new random delay to blink.
                this.setBlinkDelay();
                this.animStartTime = time;
            }
        }
    },
    startJump: function(speed) {
        if (!this.jumping) {
            this.update(0, Trex.status.JUMPING);
            this.jumpVelocity = this.config.INIITAL_JUMP_VELOCITY - (speed / 10);
            this.jumping = true;
            this.reachedMinHeight = false;
            this.speedDrop = false;
        }
    },
    endJump: function() {
        if (this.reachedMinHeight && this.jumpVelocity < this.config.DROP_VELOCITY) {
            this.jumpVelocity = this.config.DROP_VELOCITY;
        }
    },
    updateJump: function(deltaTime, speed) {
        var msPerFrame = Trex.animFrames[this.status].msPerFrame;
        var framesElapsed = deltaTime / msPerFrame;

        if (this.speedDrop) {
            this.yPos += Math.round(this.jumpVelocity *
                this.config.SPEED_DROP_COEFFICIENT * framesElapsed);
        } else {
            this.yPos += Math.round(this.jumpVelocity * framesElapsed);
        }

        this.jumpVelocity += this.config.GRAVITY * framesElapsed;

        if (this.yPos < this.minJumpHeight || this.speedDrop) {
            this.reachedMinHeight = true;
        }
        if (this.yPos < this.config.MAX_JUMP_HEIGHT || this.speedDrop) {
            this.endJump();
        }

        if (this.yPos > this.groundYPos) {
            this.reset();
            this.jumpCount++;
        }

        this.update(deltaTime);
    },
    setSpeedDrop: function() {
        this.speedDrop = true;
        this.jumpVelocity = 1;
    },
    setDuck: function(isDucking) {
        if (isDucking && this.status != Trex.status.DUCKING) {
            this.update(0, Trex.status.DUCKING);
            this.ducking = true;
        } else if (this.status == Trex.status.DUCKING) {
            this.update(0, Trex.status.RUNNING);
            this.ducking = false;
        }
    },
    draw: function(x, y) {
        var sourceX = x;
        var sourceY = y;
        var sourceWidth = this.ducking && this.status != Trex.status.CRASHED ?
            this.config.WIDTH_DUCK : this.config.WIDTH;
        var sourceHeight = this.config.HEIGHT;
        sourceX += this.spritePos.x;
        sourceY += this.spritePos.y;

        if (this.ducking && this.status != Trex.status.CRASHED) {
            this.ctx.drawImage(imgSprite, sourceX, sourceY,
                sourceWidth, sourceHeight,
                this.xPos, this.yPos,
                this.config.WIDTH_DUCK, this.config.HEIGHT);
        } else {
            if (this.ducking && this.status == Trex.status.CRASHED) {
                this.xPos++;
            }

            this.ctx.drawImage(imgSprite, sourceX, sourceY,
                sourceWidth, sourceHeight,
                this.xPos, this.yPos,
                this.config.WIDTH, this.config.HEIGHT);
        }
    },
    reset: function() {
        this.yPos = this.groundYPos;
        this.jumpVelocity = 0;
        this.jumping = false;
        this.ducking = false;
        this.update(0, Trex.status.RUNNING);
        this.midair = false;
        this.speedDrop = false;
        this.jumpCount = 0;
    }
};


var now = getTimeStamp();

//涓嶅啓onload鏂规硶灏辨樉绀轰笉鍑哄浘鐗�
window.onload = function() {
    var runner = new Runner('.interstitial-wrapper');
};