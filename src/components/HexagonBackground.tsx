import { useState, useEffect, useCallback } from 'react';

export function HexagonBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [grid, setGrid] = useState<{ id: string; x: number; y: number; col: number; row: number }[]>([]);

  // Configuración de hexágonos FLAT-TOP
  const hexSize = 45;
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;
  const horizontalSpacing = hexWidth * 0.75;
  const verticalSpacing = hexHeight;

  // Radio de iluminación alrededor del cursor
  const glowRadius = 150;

  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth + hexWidth * 2;
      const height = window.innerHeight + hexHeight * 2;

      const cols = Math.ceil(width / horizontalSpacing) + 2;
      const rows = Math.ceil(height / verticalSpacing) + 2;

      const hexes: { id: string; x: number; y: number; col: number; row: number }[] = [];

      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const x = col * horizontalSpacing;
          const yOffset = col % 2 === 1 ? hexHeight / 2 : 0;
          const y = row * verticalSpacing + yOffset;

          hexes.push({
            id: `${row}-${col}`,
            x,
            y,
            col,
            row,
          });
        }
      }
      setGrid(hexes);
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, [hexWidth, hexHeight, horizontalSpacing, verticalSpacing]);

  // Seguir el mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Puntos del hexágono FLAT-TOP
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i;
    const x = hexSize * Math.cos(angle);
    const y = hexSize * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Calcular distancia del hexágono al cursor
  const getHexState = useCallback((hexX: number, hexY: number) => {
    // Ajustar por el offset del SVG
    const adjustedHexX = hexX - hexWidth / 2;
    const adjustedHexY = hexY - hexHeight / 2;

    const dx = mousePos.x - adjustedHexX;
    const dy = mousePos.y - adjustedHexY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < hexSize * 0.8) {
      return 'hovered'; // Cursor directamente encima
    } else if (distance < glowRadius) {
      return { type: 'near', intensity: 1 - (distance / glowRadius) };
    }
    return 'normal';
  }, [mousePos, hexWidth, hexHeight, glowRadius, hexSize]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: '#1a0000',
      }}
    >
      <svg
        width={typeof window !== 'undefined' ? window.innerWidth + hexWidth * 2 : '100%'}
        height={typeof window !== 'undefined' ? window.innerHeight + hexHeight * 2 : '100%'}
        style={{
          position: 'absolute',
          top: -hexHeight / 2,
          left: -hexWidth / 2,
        }}
      >
        <defs>
          {/* Gradiente base rojo puro */}
          <linearGradient id="hexBaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="50%" stopColor="#DD0000" />
            <stop offset="100%" stopColor="#BB0000" />
          </linearGradient>

          {/* Gradiente hover - naranja brillante */}
          <linearGradient id="hexHoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FF3300" />
          </linearGradient>

          {/* Gradiente cercano - verde EVA */}
          <linearGradient id="hexNearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF41" />
            <stop offset="100%" stopColor="#00AA2A" />
          </linearGradient>

          {/* Glow filter naranja */}
          <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glow filter verde */}
          <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {grid.map((hex) => {
          const state = getHexState(hex.x, hex.y);

          let fill = 'url(#hexBaseGradient)';
          let stroke = '#000000';
          let strokeWidth = 1.5;
          let filter = '';
          let opacity = 1;
          let isActive = false;

          if (state === 'hovered') {
            fill = 'url(#hexHoverGradient)';
            stroke = '#FF6B00';
            strokeWidth = 2;
            filter = 'url(#glowOrange)';
            isActive = true;
          } else if (typeof state === 'object' && state.type === 'near') {
            // Interpolar entre base y verde según la intensidad
            const intensity = state.intensity;
            if (intensity > 0.3) {
              fill = 'url(#hexNearGradient)';
              stroke = '#00FF41';
              strokeWidth = 1.5;
              filter = 'url(#glowGreen)';
              opacity = 0.5 + intensity * 0.5;
              isActive = true;
            }
          }

          return (
            <g
              key={hex.id}
              transform={`translate(${hex.x}, ${hex.y})`}
              style={{ cursor: 'none' }}
            >
              {/* Hexágono base */}
              <polygon
                points={hexPoints}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                filter={filter}
                opacity={opacity}
                style={{
                  transition: 'all 0.1s ease-out',
                }}
              />

              {/* Contenido normal */}
              {!isActive && (
                <>
                  {/* Triángulo de advertencia arriba */}
                  <polygon
                    points="0,-18 -10,2 10,2"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                  {/* Triángulo de advertencia abajo (invertido) */}
                  <polygon
                    points="0,22 -10,2 10,2"
                    fill="#000000"
                    opacity="0.6"
                  />
                  {/* Texto EMERGENCY */}
                  <text
                    x="0"
                    y="35"
                    textAnchor="middle"
                    fontSize="6"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="#000000"
                    opacity="0.8"
                  >
                    EMERGENCY
                  </text>
                </>
              )}

              {/* Contenido cuando está activo */}
              {isActive && (
                <>
                  <polygon
                    points="0,-12 -8,4 8,4"
                    fill="none"
                    stroke={state === 'hovered' ? '#FFaa00' : '#00FF41'}
                    strokeWidth="2"
                    opacity="0.9"
                  />
                  <text
                    x="0"
                    y="30"
                    textAnchor="middle"
                    fontSize="7"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill={state === 'hovered' ? '#FFFFFF' : '#00FF41'}
                  >
                    {state === 'hovered' ? 'ALERT' : 'ACTIVE'}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Overlay de viñeta */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Scanlines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          )`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
