# Mr. Do!

<img width="222" height="286" alt="image" src="https://github.com/user-attachments/assets/30200eb4-cb52-483f-b4a5-7cd359774a77" />


## Introduccion

Esto es una recreacion de **Mr. Do!**, un juego creado en 1982 por la compañia japonesa Universal Entertainment, en SDL con fines puramente acádemicos.

En **Mr. Do!** el jugador controla a un payaso cuyo objectivo aumentar su puntuacion es conseguir cerezas cavando tuneles mientras se defiende de los enemigos *creeps* que recorren los túneles lanzandoles 
una pelota que rebota por los tuneles hasta que vuelve a Mr. Do. Se pasa al siguiente nivel cuando: todas las cerezas sean recogidas, todos los enemigos matados, la palabra *EXTRA* deletreada 
o un diamante encontrado.

## Jugabilidad

### Mr. Do

<img width="156" height="156" alt="image" src="https://github.com/user-attachments/assets/804153c4-4423-49bd-9eed-0d704c6240bd" />

El personaje principal controlado por el jugador. Este se puede mover verticalmente y horizontalmente, si se mueve por una casilla con tierra abrirá un túnel y el unicó bloqueo que tiene son 
las manzanas que impediran su paso y los enemigos que lo mataran al contacto, quitandole una vida, que cuando llegan a 0 la partida se da por terminada.

Este se defenderá lanzado una pelota que ira rebotando por los pasillos hasta impactar con un enemigo o ser agarrado de vuelta por Mr. Do, si impacta con el enemigo tardará un rato antes de que el jugador 
pueda volver a usarlo

### Creep

<img width="315" height="258" alt="image" src="https://github.com/user-attachments/assets/e231af10-cfb7-428d-af30-8138c78b5754" />

El enemigo principal del juego, este se moverá por los túneles persiguiendo al *Mr. Do* ligeramente mas lento. De manera aleatoria entrá en un estado especial (indicado por la aceleracion de la musica) 
que dura unos pocos segundos donde ganará velocidad, volviendose brevemente mas rapido que *Mr. Do*.

Estos spawnearan un número especifico desde el centro de la pantalla de uno en uno separados por unos pocos segundos, cuando sale el último su spawn es ocupado por una porción de tarta que *Mr. Do* podrá comer.

Matarlos dan 500 puntos.

 ### Manzana

<img width="193" height="218" alt="image" src="https://github.com/user-attachments/assets/ae9186c7-9463-49a5-b417-940564fc70b7" />

Este objecto es colocado al principio de cada ronda en lugares predefinidos. Son objectos que *Mr. Do* puede empujar lentamente. Si estos tienen la casilla debajo suya desocupada caeran a ella, 
matando a todo aquello que se cruce en su camino, si la caida es de mas de 2 casillas la manzana se rompe, con una probabilidad del 5% de dejar un diamante tras de si.
