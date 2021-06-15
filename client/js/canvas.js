function calcDistance(a, b) {
    return Math.sqrt((a * a) + (b * b));
}
class Main{
    constructor(){ 
        this.canvas = document.createElement('canvas');
        document.getElementById('content').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d')
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
        window.requestAnimationFrame(this.animate.bind(this));
        window.addEventListener('mousemove', this.mouseMove.bind(this));
    }

    resize() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = document.getElementById('content').clientWidth;
        this.canvas.height = document.getElementById('content').clientHeight;
        this.ctx.width = this.canvas.width;
        this.ctx.height = this.canvas.height;
        this.drawBackground();
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
    }

    drawBackground(){
        this.ctx.save();
        this.circles = [];
        for(var x = 0; x < this.canvas.width; x+=15){
            for(var y = 0; y < this.canvas.height; y+=15){
                this.ctx.beginPath();
                this.ctx.strokeStyle = '#dddddd';
                this.ctx.arc(x, y, 2, 0, 360);
                this.ctx.stroke();
                this.circles.push({x:x, y:y, color:this.ctx.strokeStyle});
            }
        }
        this.ctx.restore();
    }
    mouseMove(e){
        this.circles.find((a,b)=>{
            if(a.x > e.offsetX-10 && a.x < e.offsetX + 10 && a.y > e.offsetY - 10 && a.y < e.offsetY + 10 && a.color=='#dddddd'){
                this.circles[b].color = '#aaaaaa';                
            }else{
                this.circles[b].color = '#dddddd';
            }
            this.ctx.strokeStyle = a.color;
            this.ctx.beginPath();
            this.ctx.arc(a.x, a.y, 2, 0, 360);
            this.ctx.stroke();
        })
    }

}


new Main();
