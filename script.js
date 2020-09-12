var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;

var FPS = 40;

var canvas; 
var context;
var size_bar = 0; //wielkosc kulek
var howmany = 10; //ilosc kulek
var space_between = 0; //zmienna ktora kontroluje grubosc traila
var iscoloron = false; //zapomnailem xd
var ggg = 0; //niesamowicie nazwana zmienna do kontroli randomowej zmiany wielkosci
var dotlist = []; //tablica przechowujaca kuleczki (ktore zaraz dodam)
var trail_size = 0; //rozmiar traila
var colored = "rgb(169, 89, 191,"
var losowe=true, controlka = 0;




//Funckja Sparkle ~~ Tworzy kuleczke, ktora lata

function Sparkle(x, y, dx, dy) {
    this.x = x; //pozycja x
    this.y = y; //pozycja y
    this.dx = dx;   //destination x
    this.dy = dy;   //destination y    
    this.traile = []    //Traile -- kazda kuleczka przy tworzeniu dostaje wlasne traile
    
    //Funkcja zawarta w obiekcie Sparkle~~ Odpowiada za obliczenia x i y
    this.update = function () {
        //sprawdzam czy kuleczka nie wyleci poza ekran
        this.x += this.dx;
        this.y += this.dy;
        if (this.x >= CANVAS_WIDTH) {
            this.dx *= -1;
        }
        if (this.x <= 0) {
            this.dx *= -1;
        }
        if (this.y <= 0) {
            this.dy *= -1;
        }
        if (this.y >= CANVAS_HEIGHT) {
            this.dy *= -1;
        }
        //ilosc traila to space_betwen * 3 / (space_between/7)
        if(this.traile.length != space_between * 2.5 + 1){
            if(this.traile.length < space_between * 2.5 +1){
                for(let z = 0; z < space_between * 2.5 - this.traile.length + 1; z++){
                    this.traile.push(new trail());    
                }
            }else{
                for(let z = 0; z < this.traile.length + 1 - space_between * 2.5; z++){
                    this.traile.pop();
            }}
            
        }
        for(let x = 0; x < this.traile.length; x++){
            this.traile[x].update();    //trail sie updatuje
        }

    }
    //Funkcja draw w obiekcie Sparkle ~~ Odpowiada za rysowanie
    this.draw = function () {
        for(let x = 0; x < this.traile.length; x++){
            if(this.traile[x].time < 0){
                this.traile[x].x = this.x + space_between;
                this.traile[x].y = this.y + space_between;
                this.traile[x].time = space_between * 2.5 ;
                this.traile[x].size = size_bar;
                this.traile[x].color = colored;
                break;
            }
        
        }
       
        for(let x = 0; x < this.traile.length; x++){
            this.traile[x].draw();  
        }
        context.beginPath();
        context.fillStyle = colored + "0.9)"
        context.arc(this.x, this.y, size_bar, 0, Math.PI * 2, true);
        context.fill();
    }

}

//Funckja do traile ~~, czyli ogonka


function trail() {
    this.time = space_between * 2.5;
    this.color = colored;
    this.update = function () {
        this.fill = this.color + this.time/150 + ")";
        if(this.time > 0){
        this.time -= space_between/7;
        if(this.size - trail_size/35 > 0){
        this.size -= trail_size/40;
        }
        }
    }

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.fill;
        context.arc(this.x,this.y,this.size,0,Math.PI * 2, true);
        context.fill();
    }
}




function submitbg(){
    document.body.style.backgroundColor = "rgb("+ 
    document.getElementById("rgb1").value + "," +
    document.getElementById("rgb2").value + "," +
    document.getElementById("rgb3").value + ")";
}

function submitballs(){
    if(document.getElementById("randcolor").checked){
    losowe = false;
    }
    else
    {

    
    colored = "rgba("+ 
    document.getElementById("rgbb1").value + "," +
    document.getElementById("rgbb2").value + "," +
    document.getElementById("rgbb3").value + ",";
    losowe = true;}
}






function getValue(){
    //Sprawdzanie czy jest wlaczone randomowe rozmiarowanie
    if(document.getElementById("myCheck").checked){
    ggg++;
    if(ggg > (document.getElementById("myRange").value) / 2){
    size_bar = Math.random() * 20 + 5
    ggg = 0;
    }
    }
    else{
    size_bar = (document.getElementById("myRange").value);
    }
    //space-between , czyli value do edycji ilosci trailowych kolek(ich "grubosci")
    space_between = (document.getElementById("mySpace").value) ;
    //howmany - ilosc kolek
    howmany = (document.getElementById("myAmount").value);
    //tutaj jest kod do zmiany ilosci obiektow kolka ~~ porownuje howmany do dlugosci tablicy kulek
    if(dotlist.length != howmany){
        if(dotlist.length < howmany){
            for(let z = 0; z < howmany - dotlist.length; z++){
                dotlist.push( new Sparkle(Math.random() * 1000, Math.random() * 500, Math.random() * 10, Math.random() * 8)); 
            }
        }
        else{
            for(let z = 0; z <= dotlist.length - howmany; z++){
                dotlist.pop();
            }
        }
    }

    //Zmiana koloru tla
    if(document.getElementById("myBgChange").checked){
        if(document.getElementById("Bg_Options").innerHTML == ""){
            document.getElementById("Bg_Options").innerHTML += "  <input type=\"text\" placeholder=\"bg red\" id=\"rgb1\"><input type=\"text\" placeholder=\"bg green\" id=\"rgb2\"><input type=\"text\" placeholder=\"bg blue\" id=\"rgb3\"><button onclick=\"submitbg()\">Submit</button>";
            
        }



    }
    else{
        document.getElementById("Bg_Options").innerHTML = "";
    }


    //zmiana koloru pilecek
    if(document.getElementById("myColorChange").checked){
        if(document.getElementById("ballcolor").innerHTML == ""){
            document.getElementById("ballcolor").innerHTML += "  <input type=\"text\" placeholder=\"red\" id=\"rgbb1\"><input type=\"text\" placeholder=\"green\" id=\"rgbb2\"><input type=\"text\" placeholder=\"blue\" id=\"rgbb3\"><button onclick=\"submitballs()\">Submit</button> <p>&&&<p>   <input type='checkbox' id='randcolor'><p>LOSOWE KOLORKI <br> wartosc jaka wpiszesz zamiast rgb <br>jest wartoscia jaka bedzie pomnozona razy losowa liczbe <br> z przedzialu od 0-1</p>";
            
        }



    }
    else{
        document.getElementById("ballcolor").innerHTML = "";
    }

    //sprawdzanie rozmiaru traila
    trail_size = (document.getElementById("myTrailSize").value) ;
    if(!losowe){
    controlka++;
        if(controlka == 10){
            controlka = 0;
            colored = "rgba("+ 
            Math.random() *document.getElementById("rgbb1").value+ "," +
            Math.random() *document.getElementById("rgbb2").value  + "," +
            Math.random() *document.getElementById("rgbb3").value  + ",";
        }
    }
}


//Init ~~ Jedyna funkcja, ktora wykonuje sie tylko raz, w niej zawiera sie kod poczatkowy
function init() {
    canvas = document.getElementById('canvas');
    document.getElementById("myTrailSize").value = 0;
    document.getElementById("myRange").value= 0.5;
    //funckja loop ~~ petla, w ktorej sie wszystko wykonje
    function loop() {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for(let g = 0; g < dotlist.length; g++){
            dotlist[g].update(); //funkcja Obiektu Sparkle ~~ uaktualnia pozycje 
            dotlist[g].draw();  //funckja obiektu Sparkle ~~ rysuje kuleczki
            };
    }

    if (canvas && canvas.getContext) {
        context = canvas.getContext('2d');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        setInterval(loop, 1000 / FPS);
        setInterval(getValue, 1000 / FPS);
    }
}

init();
