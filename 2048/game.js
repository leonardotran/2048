class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
        this.grid = [
            [0,0,0,0], 
            [0,0,0,0],
            [0,0,0,0], 
            [0,0,0,0]
        ];
        this.hasChange = false;
        this.addNum();
        this.addNum();
        this.draw();
        this.handle();

        

    }
    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 600;
        document.body.appendChild(this.canvas);
    }
    addNum() {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++){ 
                if(this.grid[i][j] == 0){
                    arr.push({x : i, y : j});
                }
            }
        }
        if (arr.length > 0){
            let randomXY = arr[Math.random() * arr.length >>0];
            let num = Math.floor(Math.random()* 4);
            if (num <3){
                this.grid[randomXY.x][randomXY.y] = 2;
            }
            else{
                this.grid[randomXY.x][randomXY.y] = 4;
            }
        }
    }
    draw(){
        this.context.clearRect(0, 0, 600, 600);
        for(let i = 1; i < 4; i++) {
            for(let j = 1; j < 4; j++) {
                this.context.beginPath();
                this.context.moveTo(i*150, 0);
                this.context.lineTo(i*150, 600);
                this.context.moveTo(0, i*150);
                this.context.lineTo(600, i*150);
                this.context.stroke();

            }
        }
    
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++) {
                if(this.grid[i][j] == 2){
                    this.context.fillStyle = '#F0F8FF';
                    this.context.fillRect(j * 150 +1 , i * 150 +1, 148, 148);
                } 
                else if (this.grid[i][j] == 4){
                    this.context.fillStyle = '#FFFFCC';
                    this.context.fillRect(j * 150 +1 , i * 150 +1, 148, 148);
                }
                else if (this.grid[i][j] == 8){
                    this.context.fillStyle = '#FFA500';
                    this.context.fillRect(j * 150 +1 , i * 150 +1, 148, 148);
                }
                else if (this.grid[i][j] == 16){
                    this.context.fillStyle = '#FF8C00';
                    this.context.fillRect(j * 150 +1 , i * 150 +1, 148, 148);
                }
                else if (this.grid[i][j] == 32){
                    this.context.fillStyle = '#FF4500';
                    this.context.fillRect(j * 150 +1 , i * 150 +1, 148, 148);
                }
                else if (this.grid[i][j] == 64){
                    this.context.fillStyle = '#B22222';
                    this.context.fillRect(j * 150 +1 , i * 150 +1, 148, 148);
                }else if (this.grid[i][j] == 128){
                    this.context.fillStyle = '#FFD700';
                    this.context.fillRect(j * 150 +1 , i * 150 +1, 148, 148);
                }
                else if (this.grid[i][j] == 256){
                    this.context.fillStyle = '#DAA520';
                    this.context.fillRect(j * 150 +1 , i * 150 +1, 148, 148);
                }
                else if (this.grid[i][j] == 512){
                    this.context.fillStyle = '#B8860B';
                    this.context.fillRect(j * 150 +1 , i * 150 +1, 148, 148);
                }
                if (this.grid[i][j] != 0){
                    this.context.font = '80px Arial';
                    this.context.fillStyle = 'black';
                    this.context.textAlign = 'center';
                    this.context.fillText(this.grid[i][j], j * 150 + 75, i * 150 + 100);
                }
                
            }
        }       
    }
    slideLeftOrUp(row){
        let arr = [];
        for(let i = 0; i<4; i++){
            if(row[i] != 0){
                arr.push(row[i]);
            }
        }
        for (let j = arr.length; j<4; j++){
            arr.push(0);
        }
        return arr;
    }
    slideRightOrDown(row){
        let arr = [];
        for(let i = 0; i<4; i++){
            if(row[i] == 0){
                arr.push(row[i]);
            }
        }
        for(let i = 0; i<4; i++){
            if(row[i] != 0){
                arr.push(row[i]);
            }
        }
        return arr;
    }
    hasChangeRC(arr1, arr2){
        for(let i = 0; i<4; i++){
            if(arr1[i] != arr2[i]){
                this.hasChange = true;
            }
        }
    }
    handle() {
        document.addEventListener('keydown', (e) => {
            this.hasChange = false;
            if (e.which == 37) {
                for (let i = 0; i<4; i++) {
                    let arr = this.grid[i];
                    this.grid[i] = this.slideLeftOrUp(this.grid[i]);
                    for(let j = 0; j < 3; j++){
                        if(this.grid[i][j] == this.grid[i][j+1]) {
                            this.grid[i][j] += this.grid[i][j+1];
                            this.grid[i][j+1] = 0;
                        }
                    }
                    this.grid[i] = this.slideLeftOrUp(this.grid[i]);
                    this.hasChangeRC(arr, this.grid[i]);
                }
            }
            else if (e.which == 38) {
                for (let i = 0; i < 4; i++) {
                    let arr =[];
                    for (let j = 0; j < 4; j++){
                        arr.push(this.grid[j][i]);
                    }
                    let arr1 = arr;
                    arr = this.slideLeftOrUp(arr);
                    for(let m = 0; m < 3; m++){
                        if(arr[m] == arr[m+1]) {
                            arr[m] += arr[m+1];
                            arr[m+1] = 0;
                        }
                    }
                    arr = this.slideLeftOrUp(arr);
                    for (let m = 0; m < 4; m++){
                        this.grid[m][i] = arr[m];
                    }
                    this.hasChangeRC(arr, arr1);
                }
            }
            else if (e.which == 39) {
                for (let i = 0; i<4; i++) {
                    let arr = this.grid[i];
                    this.grid[i] = this.slideRightOrDown(this.grid[i]);
                    for(let j = 3; j > 0; j--){
                        if(this.grid[i][j] == this.grid[i][j-1]) {
                            this.grid[i][j] += this.grid[i][j-1];
                            this.grid[i][j-1] = 0;
                        }
                    }
                    this.grid[i] = this.slideRightOrDown(this.grid[i]);
                    this.hasChangeRC(arr, this.grid[i]);
                } 
            }
            else if (e.which == 40) {
                for (let i = 0; i < 4; i++) {
                    let arr =[];
                    for (let j = 0; j < 4; j++){
                        arr.push(this.grid[j][i]);
                    }
                    let arr1 = arr;
                    arr = this.slideRightOrDown(arr);
                    for(let m = 3; m > 0; m--){
                        if(arr[m] == arr[m-1]) {
                            arr[m] += arr[m-1];
                            arr[m-1] = 0;
                        }
                    }
                    arr = this.slideRightOrDown(arr);
                    for (let m = 0; m < 4; m++){
                        this.grid[m][i] = arr[m];
                    }
                    this.hasChangeRC(arr,arr1);
                }
                
            }
            if(this.hasChange){
                this.addNum();
                }
            this.draw();
        });
        
        
    }
}
var g = new game()