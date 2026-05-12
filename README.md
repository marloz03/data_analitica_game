# Reinicia el Servidor — Banco Guayaquil

Juego móvil HTML5 (Phaser 3) ambientado en el piso de **Data & Analítica del Banco Guayaquil**. El servidor cayó, tu misión es abrirte paso por la oficina hasta el cuarto de TI y reiniciarlo. Cuidado con los enemigos de **Arquitectura de Software** y **Seguridad de la Información**, y prepárate para el boss final: **Fernando Vargas**, Gerente de Arquitectura de Datos.

## Cómo jugar

1. Instala cualquier servidor estático y sirve la raíz del repo. Ejemplos:
   ```bash
   # Python 3
   python3 -m http.server 8000

   # o Node
   npx serve .
   ```
2. Abre `http://localhost:8000` en el navegador.
3. Para probar en el móvil con el mismo Wi-Fi:
   ```bash
   # averigua tu IP local
   hostname -I        # Linux
   ipconfig getifaddr en0   # macOS
   ```
   Luego abre `http://<TU-IP>:8000` desde el teléfono.

No requiere `npm install` ni build — Phaser se carga vía CDN.

## Controles

- **Desktop**: ← → o A/D para mover, Espacio / ↑ / W para saltar, J o X para atacar.
- **Móvil**: botones táctiles en pantalla (D-pad izquierdo, salto y ataque a la derecha).

## Recorrido del nivel

El nivel atraviesa cuatro zonas de un piso de la oficina, separadas por puertas corporativas estilo Banco Guayaquil (azul + naranja):

1. **Data & Analítica** — escritorios con dashboards, máquina de café, pizarra de KPIs.
2. **Arquitectura de Software** — pasillo con enemigos `Arquitecto` que lanzan diagramas UML.
3. **Seguridad de la Información** — área oscura con racks y enemigos `Oficial de Seguridad` que persiguen.
4. **TI · Cuarto de Servidores** — arena del boss **Fernando Vargas** (cabello gris, calva incipiente, traje azul oscuro con corbata roja). Derrótalo y pulsa el botón rojo **REINICIAR SERVIDOR** para ganar.

## Estructura

```
index.html
src/
  main.js                  — config de Phaser y registro de escenas
  art/textures.js          — sprites pixel-art generados por código
  level/level1.js          — diseño del nivel (zonas, plataformas, spawns)
  scenes/
    BootScene.js
    MenuScene.js
    GameScene.js           — gameplay principal
    HUDScene.js            — HP + controles táctiles
    VictoryScene.js
    GameOverScene.js
  entities/
    Player.js
    Enemy.js
    ArchitectEnemy.js
    SecurityEnemy.js
    Boss.js                — Fernando Vargas (3 fases)
```

## Tecnología

- [Phaser 3](https://phaser.io/) (vía CDN `cdn.jsdelivr.net`).
- ES modules nativos del navegador — sin webpack/vite/npm.
- Pixel art procedural: cada sprite se dibuja en runtime con `Phaser.Graphics.generateTexture()`.

## Paleta corporativa

Inspirada en la identidad de Banco Guayaquil (referencias: casa matriz remodelada por Gómez Platero):

- Azul corporativo `#003D7A`
- Naranja `#FF6B00`
- Blanco / hueso para señalética
