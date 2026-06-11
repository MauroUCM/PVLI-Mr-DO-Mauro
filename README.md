# Mr. Do!

<img width="222" height="286" alt="image" src="https://github.com/user-attachments/assets/30200eb4-cb52-483f-b4a5-7cd359774a77" />

## 1 - Información general

- Titulo: Mr. Do
- Género: Arcade / Acción
- Publico objetivo: Jugadores casuales de cualquier edad
- Plataforma: Navegador web (PC)

## 2 - Concepto

Esto es una recreacion de **Mr. Do!**, un juego creado en 1982 por la compañia japonesa Universal Entertainment, en SDL con fines puramente acádemicos.

En **Mr. Do!** el jugador controla a un payaso cuyo objectivo es aumentar su puntuacion recolectando cerezas mientras se defiende de los diferentes enemigos que recorren los túneles lanzandoles una pelota que rebota por los tuneles hasta que vuelve a Mr. Do o impacta con un enemigo. A parte de la pelota el jugador también tendrá la capacidad de modificar el terreno cavando túneles, lo cual añade una capa táctica para evadir a los enemigos. Se pasa al siguiente nivel cuando: todas las cerezas sean recogidas, todos los enemigos matados, la palabra *EXTRA* deletreada o un diamante encontrado.

### Loop principal
1. Iniciar partida.
2. Recoger cerezas y matar enemigos.
3. Cumplir cualquiera de los requisitos para pasar de nivel.
4. Repetir hasta que el número de vidas llega a 0.
5. Pantalla con la puntución y vuelta al paso 1.

## 3- Mecánicas principales
### Movimiento
- Movimiento 2D: *Mr. Do* se mueve a velocidad constante en 4 direcciones: arriba, abajo, derecha e izquierda
- Cuando *Mr Do* pasa a traves de una casilla ocupada por tierra el excavará en ella dejando la casilla vacia aunque se verá ligeramente ralentizado
### Combate
- El **arma principal** de *Mr. Do* es una pelota que rebota por los túneles hasta que vuelve a *Mr. Do* o impacta contra un enemigo matándolo.
  - La pelota no se podrá lanzar de vuelta hasta que vuelva hasta *Mr. Do* o pase un tiempo determinado tras impactar contra el enemigo. Este tiempo aumenta tras cada lanzamiento dejando a *Mr. Do* indefenso.
- **Las manzanas**, son objetos repartidos por el mapa, en un principio estáticos.
  - Estas pueden ser empujados horizontalmente por *Mr. Do*.
  - Si una manzana tiene una casilla vacia debajo suya caera aplastando tanto a *Mr. Do* como los enemigos. Si cae a una altura de por lo menos 2 casillas se romperá.
  - Al romperse existe la pequeña poosibilidad de que deje un diamante tras de si.

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

Si matas a todos pasas de nivel.

### Alphamonsters

<img width="139" height="123" alt="image" src="https://github.com/user-attachments/assets/0e58d043-d998-45ff-a526-267a99a6fed6" />

Enemigo que actua de forma identica al *Creep* excepto que aparece solo cuanto tu puntuacion llega a un multiplo de 5000 o cojes el bonus item, en este ultimo caso aparecera acompañado por 3 *munchers*.

Matarlos otorga la letra que contienen dentro suya, 500 puntos y pasas de nivel.

### Muncher

<img width="343" height="361" alt="image" src="https://github.com/user-attachments/assets/0f8a4897-c99a-4bce-b690-43b188307856" />

Enemigo similar al *Creep* excepto que puede comer manzanas.

## Elementos del mapa

### Cereza

<img width="118" height="130" alt="image" src="https://github.com/user-attachments/assets/c09a9e8c-4d1c-4307-b48a-f34975fa38dd" />

Este objecto aparece en grupos de 8 (4x2), son 50 puntos cada una y si coges 8 seguidas te dan un bonus de 500. Si coges todos pasas al siguiente nivel.

### Manzana

<img width="193" height="218" alt="image" src="https://github.com/user-attachments/assets/ae9186c7-9463-49a5-b417-940564fc70b7" />

Este objecto es colocado al principio de cada ronda en lugares predefinidos. Son objectos que *Mr. Do* puede empujar lentamente. Si estos tienen la casilla debajo suya desocupada caeran a ella, 
matando a todo aquello que se cruce en su camino, si la caida es de mas de 1 casilla la manzana se rompe, con una probabilidad del 5% de dejar un diamante tras de si.

### Bonus item

<img width="90" height="90" alt="image" src="https://github.com/user-attachments/assets/8e825661-74e9-409c-b58f-457f15a27563" />

Objeto que aparece cuando los *Creeps* terminan de spawnear en el sitio desde el que spawnean. Si Mr. Do se lo come aparecera un *Alphamonster* acompañado de 3 *Munchers* y todos los *Creeps*
se congelaran en su sitio hasta que todos los *Munchers* y el *Alphamonster* mueran. Si el alphamonster muere todos los munchers morirán junto a este.

### Diamante

<img width="94" height="81" alt="image" src="https://github.com/user-attachments/assets/48b55a71-86bf-4209-ad31-cf86d63e09d1" />

Puede spawnear con una probabilidad de 5% de una manzana y cogerla te otorga una vida extra y pasas al siquiente nivel.

# Mapas

<img width="1439" height="1920" alt="image" src="https://github.com/user-attachments/assets/b3b043ab-de89-46a6-9ab4-7db46fedc4a1" />
