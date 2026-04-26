# Mr. Do!

<img width="222" height="286" alt="image" src="https://github.com/user-attachments/assets/30200eb4-cb52-483f-b4a5-7cd359774a77" />


# Introduccion

Esto es una recreacion de **Mr. Do!**, un juego creado en 1982 por la compañia japonesa Universal Entertainment, en SDL con fines puramente acádemicos.

En **Mr. Do!** el jugador controla a un payaso cuyo objectivo aumentar su puntuacion es conseguir cerezas cavando tuneles mientras se defiende de los enemigos *creeps* que recorren los túneles lanzandoles 
una pelota que rebota por los tuneles hasta que vuelve a Mr. Do. Se pasa al siguiente nivel cuando: todas las cerezas sean recogidas, todos los enemigos matados, la palabra *EXTRA* deletreada 
o un diamante encontrado.

# Jugabilidad

## Jugador

### Mr. Do

<img width="156" height="156" alt="image" src="https://github.com/user-attachments/assets/804153c4-4423-49bd-9eed-0d704c6240bd" />

El personaje principal controlado por el jugador. Este se puede mover verticalmente y horizontalmente, si se mueve por una casilla con tierra abrirá un túnel y el unicó bloqueo que tiene son 
las manzanas que impediran su paso y los enemigos que lo mataran al contacto, quitandole una vida, que cuando llegan a 0 la partida se da por terminada.

Este se defenderá lanzado una pelota que ira rebotando por los pasillos hasta impactar con un enemigo o ser agarrado de vuelta por Mr. Do, si impacta con el enemigo tardará un rato antes de que el jugador 
pueda volver a usarlo.

### Controles

**Juego:**

WASD: Mover el personaje en una dirección

Z: Lanzar pelota

X: Pausar / Despausar

**Menús:**

WASD: Mover la selección en los menús

Z: Confirmar selección

X: Retroceder

## Enemigos

Matar cualquier enemigo siempre da 500 puntos excepto si es matado por una manzana, en la que dara 1000.

### Creep

<img width="315" height="258" alt="image" src="https://github.com/user-attachments/assets/e231af10-cfb7-428d-af30-8138c78b5754" />

El enemigo principal del juego, este se moverá por los túneles persiguiendo al *Mr. Do* ligeramente mas lento. De manera aleatoria entrá en un estado especial (indicado por la aceleracion de la musica) 
que dura unos pocos segundos donde ganará velocidad, volviendose brevemente mas rapido que *Mr. Do*.

Estos spawnearan un número especifico desde el centro de la pantalla de uno en uno separados por unos pocos segundos, cuando sale el último su spawn es ocupado por un bonus item que *Mr. Do* podrá coger.

### Alphamonsters

<img width="139" height="123" alt="image" src="https://github.com/user-attachments/assets/0e58d043-d998-45ff-a526-267a99a6fed6" />

Enemigo que actua de forma identica al *Creep* excepto que aparece solo cuanto tu puntuacion llega a un multiplo de 5000 o cojes el bonus item, en este ultimo caso aparecera acompañado por 3 *munchers*.

Matarlos otorga la letra que contienen dentro suya y 500 puntos.

### Muncher

<img width="343" height="361" alt="image" src="https://github.com/user-attachments/assets/0f8a4897-c99a-4bce-b690-43b188307856" />

Enemigo similar al *Creep* excepto que puede comer manzanas.

## Elementos del mapa

### Manzana

<img width="193" height="218" alt="image" src="https://github.com/user-attachments/assets/ae9186c7-9463-49a5-b417-940564fc70b7" />

Este objecto es colocado al principio de cada ronda en lugares predefinidos. Son objectos que *Mr. Do* puede empujar lentamente. Si estos tienen la casilla debajo suya desocupada caeran a ella, 
matando a todo aquello que se cruce en su camino, si la caida es de mas de 2 casillas la manzana se rompe, con una probabilidad del 5% de dejar un diamante tras de si.

### Bonus item

<img width="90" height="90" alt="image" src="https://github.com/user-attachments/assets/8e825661-74e9-409c-b58f-457f15a27563" />

Objeto que aparece cuando los *Creeps* terminan de spawnear en el sitio desde el que spawnean. Si Mr. Do se lo come aparecera un *Alphamonster* acompañado de 3 *Munchers* y todos los *Creeps*
se congelaran en su sitio hasta que todos los *Munchers* y el *Alphamonster* mueran. Si el alphamonster muere todos los munchers morirán junto a este.
