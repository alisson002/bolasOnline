//O canvas é uma api do JS que está sendo usado aqui para desenhar as bolas
const canvas = document.querySelector('canvas');//referencia ao elemento <canvas> no arquivo html
const ctx = canvas.getContext('2d');//retorna um contexto da tel para que possamos desenhar
                                    //o '2d' define o desenho como bidimensional
                                    //ctx é o objeto que representa diretamente o desenho na tela

const width = canvas.width = window.innerWidth;//largura da tela
const height = canvas.height = window.innerHeight;//altura da tela

//função para gerar um numero aleatorio
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// função para selecionar a cor da bola
function cor(n) {
    switch (n) {
        case 1:
            return 'rgb(' + 255 + ',' + 8 + ',' + 0 + ')';//vermelho
            break;
    
         case 2:
            return 'rgb(' + 78 + ',' + 222 + ',' + 255 + ')';//azul
            break;
        
        case 3:
            return 'rgb(' + 51 + ',' + 255 + ',' + 106 + ')';//verde
            break;

        case 4:
            return 'rgb(' + 255 + ',' + 249 + ',' + 64 + ')';//amarelo
            break;
    }
}

class Ball {

   constructor(x, y, velX, velY, color, size) {
      //x e y são as coordenadas da bola e definem on ela vai começar na tela
      this.x = x;
      this.y = y;
      //velX e vellY são as velocidades da bola
      this.velX = velX;
      this.velY = velY;
      this.color = color;//para a cor da bola
      this.size = size;//para o tmanho da bola
   }

   desenhaBola() {//desenha bola
      ctx.beginPath();//declara que eu quero desenhar uma forma
      ctx.fillStyle = this.color;//define a cor da forma que vai ser desenhada
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);//traça um forma de acordo com parâmetros definidos no construtor
      ctx.fill();//termina o desenho e preenche a forma com a cor definida
   }

   attBola() {//atualiza os dados da bola, fazendo ela se mover a cada vez que esse método é chamado
      if ((this.x + this.size) >= width) {
         this.velX = -(this.velX);
      }

      if ((this.x - this.size) <= 0) {
         this.velX = -(this.velX);
      }

      if ((this.y + this.size) >= height) {
         this.velY = -(this.velY);
      }

      if ((this.y - this.size) <= 0) {
         this.velY = -(this.velY);
      }
      //esse 4 if's servem pra a verificar se a bola atingiu a borda da janela

      this.x += this.velX;//add velX a coordenada x da bola
      this.y += this.velY;//add velY a coordenada y da bola
   }

}

var balls = [];//armazena a bola

const size = 20;
let ball = new Ball(                 //definindo a bola, de acordo com o que está la no construtor
   random(0 + size,width - size),
   random(0 + size,height - size),
   random(7,7),
   random(7,7),
   cor(random(1,4)),
   size
);

while (balls.length < 1) {
   
   ball;

  balls.push(ball);//add no final do array
}

/*faz um loop da bola executando desenhaBola() e attBola
fazendo atualizações da posição e velocidade */
function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';   //cor d fundo da tela, e quando mais baixo o ultimo parâmetro, "rastro" a bola deixa
   ctx.fillRect(0, 0, width, height);      //preenche todo o fundo da tela

   for (let i = 0; i < balls.length; i++) {
     balls[i].desenhaBola();
     balls[i].attBola();
   }

   requestAnimationFrame(loop);
   /*aqui a função loop() é executada usando o método requestAnimationFrame(). Quando esse 
   método é executado constantemente e passa o mesmo nome de função, ele executará essa 
   função um número definido de vezes por segundo pra criar uma animação. 
   Isso geralmente é feito recursivamente, o que significa que a função está 
   chamando a si mesma toda vez que é executada, portanto, ela será executada repetidas vezes.*/
}

//contagem regressiva detector de tecla
function cronometro(duration, display, placar, tMedio) {

   var timer = duration, minutes, seconds;
   acertou = 0;
   errou = 0;
   var medio = 0, cont = 0, media = 0;
   
   //detecta a tecla pressionada e indica se acertou ou errou de acordo com a cor da bola
   document.querySelector('body').addEventListener('keydown', function(KeyboardEvent) {
 
      var tecla = KeyboardEvent.keyCode;

      switch (tecla) {
         case 86:
                        
            if (ball.color === cor(1)) {
               acertou++;
            }
            else{
               errou++;
            }

            //tempo medio
            medio = medio + duration - timer;//adiciona ao tempo de reação somente o tempo que passou entre o inicio do cronometro e pressionar uma tecla
            cont = cont + 1;
            media = medio/cont;

            timer = duration;//reseta o cronometro
            balls[0].color = this.color = cor(random(1,4));//muda a cor da bola
         
            break;

         case 66:
                        
            if (ball.color === cor(2)) {
               acertou++;
            }
            else{
               errou++;
            }

            medio = medio + duration - timer;
            cont = cont + 1;
            media = medio/cont;

            timer = duration;
            balls[0].color = this.color = cor(random(1,4));
         
            break;

         case 71:
                        
            if (ball.color === cor(3)) {
               acertou++;
            }
            else{
               errou++;
            }

            medio = medio + duration - timer;
            cont = cont + 1;
            media = medio/cont;

            timer = duration;
            balls[0].color = this.color = cor(random(1,4));
         
            break;

         case 65:
                        
            if (ball.color === cor(4)) {
               acertou++;
            }
            else{
               errou++;
            }

            medio = medio + duration - timer;
            cont = cont + 1;
            media = medio/cont;

            timer = duration;
            balls[0].color = this.color = cor(random(1,4));
         
            break;

      }

    
   })
   
   //settInterval atualiza dentro de um determinado tempo, 1s ne caso
   setInterval(function () {

       minutes = parseInt(timer / 60, 10);
       seconds = parseInt(timer % 60, 10);
       minutes = minutes < 10 ? "0" + minutes : minutes;
       seconds = seconds < 10 ? "0" + seconds : seconds;

       display.textContent = minutes + ":" + seconds;                 //contagem regressiva
       placar.textContent = acertou + ":acertou - errou:" + errou;    //placar
       tMedio.textContent = "Tempo médio: " + media.toFixed(2) + "s"; //tempo médio

       if (--timer < 0) 
      {
         medio = medio + duration;//se acabar o tempo, adiciona o tempo total da contagem regressiva como tempo de reação
         cont = cont + 1;
         media = medio/cont;

         errou++;//se acabar o tempo, considera que errou

         timer = duration;//reseta o cronometro
         balls[0].color = this.color = cor(random(1,4));//troca a cor da bola sempre que o tempo acaba
       }
       
   }, 1000);
}

//para mostrar a contagem regressiva
window.onload = function () {
   var duration = 3; // Converter para segundos
       display = document.querySelector('#timer'); // selecionando o timer para adiciona-lo ao arquivo html
       placar = document.querySelector('#_placar');
       tMedio = document.querySelector('#t_medio');
   cronometro(duration, display, placar, tMedio); // iniciando o timer
}


loop();//é preciso executar a função uma vez para iniciar a animação