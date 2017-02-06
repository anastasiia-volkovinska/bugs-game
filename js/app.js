class Enemy {
    constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y + 55;
        this.width = 99;
        this.height = 67;
    }
    update(dt) {
        this.x += 3;
        if (this.x > 101 * 5) {
            let deltaX = Math.floor(Math.random() * 101) + 100;
            let deltaY = Math.floor(Math.random() * 3) + 1;
            this.x = -deltaX;
            this.y = 83 * deltaY + 55;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x + 20;
        this.y = y + 60;
        this.width = 59;
        this.height = 65;
        this.delta = 0.1;
        this.winImage = 'images/win.png';
        this.loseImage = 'images/lose.png';
        this.win = false;
        this.lose = false;
        document.addEventListener('keyup', (e) => {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };
            this.handleInput(allowedKeys[e.keyCode]);
        });
    }
    update(dt) {
        if (this.direction) {

            if (this.direction == 'up') {
                this.y = this.y - 83;
                if (this.y < 0) {
                    this.y = 83 * 5;
                }
                if (this.y < 83) {
                    this.win = true;
                }
            }
            if (this.direction == 'down') {
                this.y = this.y + 83;
                if (this.y > 83 * 5) {
                    this.y = 83 * 5 + 60;
                }
            }
            if (this.direction == 'left') {
                this.x = this.x - 101;
                if (this.x < 0) {
                    this.x = 0 + 20;
                }
            }
            if (this.direction == 'right') {
                this.x = this.x + 101;
                if (this.x > 101 * 4) {
                    this.x = 101 * 4 + 20;
                }
            }
            this.direction = null;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        if (this.win && !this.lose) {
            ctx.drawImage(Resources.get(this.winImage), 101 * 2 -30, 83 * 3);
        }
        if (this.lose && !this.win) {
            ctx.drawImage(Resources.get(this.loseImage), 101 * 2 -30, 83 * 3);
        }
    }
    handleInput(key) {
        this.direction = key;
    }
}
