class Controller {
     constructor(){
        
     }

     listen(input){
        
            if (input === 'd') this.movingRight = true;
            if (input === 'a') this.movingLeft = true;
            if (input === ' ') this.isHitting = true;
        
     }
}