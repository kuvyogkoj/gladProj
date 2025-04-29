class GameManager {

    constructor(ctx) {
        this.ctx = ctx;
        this.lastHitTime = Date.now();
        this.hitCooldown = 750;
        this.isHitting = false;
        this.movingRight = false;
        this.movingLeft = false;
        this.gladOne = new GladiatorTestOne(100, 200);
        this.gladTwo = new GladiatorTestOne(400, 200);
        this.gladOne.setTarget(this.gladTwo);
        this.gladTwo.setTarget(this.gladOne);
        

        // Key down even
        document.addEventListener('keydown', (e) => {
            if (e.key === 'd' || e.key === 'D') {
                this.movingRight = true;
                this.gladOne.setRow(1, true);
            }
            if (e.key === 'a' || e.key === 'A') {
                this.movingLeft = true;
                this.gladOne.setRow(1, false);
            }
            if (e.key === ' ') this.isHitting = true;
            
            // Add other keys as needed
        });
            
        document.addEventListener('keyup', (e) => {
            if(e.key.toLowerCase() === 'd') {
                this.movingRight = false;
                this.gladOne.setRow(0, true);
            }
            if(e.key.toLowerCase() === 'a') {
                this.movingLeft = false;
                this.gladOne.setRow(0, false);
            }

        });
    }

    draw() {
        const ctx = this.ctx;
        
        this.gladOne.draw(ctx);
        this.gladOne.update();
        
        // Draw gladTwo (red)
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.gladTwo.getXPos() - this.gladTwo.getWidth()/2,
            this.gladTwo.getYPos() - this.gladTwo.getHeight()/2,
            this.gladTwo.getWidth(),
            this.gladTwo.getHeight()
        );
        
        // Draw HP bars
        ctx.fillStyle = 'green';
        ctx.fillRect(50, 20, this.gladOne.getHp(), 10);
        ctx.fillRect(650, 20, this.gladTwo.getHp(), 10);

        // Draw sword collision area
        ctx.strokeStyle = 'yellow';
        var facingRight = this.gladOne.getXPos() - this.gladTwo.getXPos() <= 0;
        ctx.strokeRect(
        this.gladOne.getXPos() + (facingRight ? this.gladOne.getWidth()/2 : -this.gladOne.getWidth()/2) - 20,
        this.gladOne.getYPos() - 25,
        40,
        50
        );

        if(this.movingRight) this.movement(2.5);
        if(this.movingLeft) this.movement(-2.5);
        if(this.isHitting) this.hit();



        
    }
        // Controls space logic
        hit(){
            const now = Date.now();
            this.hitCooldown = 500;
            if (this.isHitting && now - this.lastHitTime >= this.hitCooldown) {
                const dmg = this.gladOne.hit();
                this.lastHitTime = now;
                console.log("HIT FOR " + dmg + " TARGET hp = " + this.gladOne.target.getHp());   
            }
            
            this.isHitting = false;
        }

        // Controls movement logic
        movement(num){
            const X = this.gladOne.getXPos();
            if(X > 50 && X < 550){
            this.gladOne.setXPos(X + num);
            console.log(X + " " + this.gladOne.getXPos() + "  NUM: " + num);
            }
        }
}