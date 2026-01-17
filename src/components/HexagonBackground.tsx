import { useState, useEffect, useCallback } from 'react';

export function HexagonBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [grid, setGrid] = useState<{ id: string; x: number; y: number; col: number; row: number }[]>([]);

  // Configuración de hexágonos FLAT-TOP (colores invertidos - blanco)
  const hexSize = 45;
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;
  const horizontalSpacing = hexWidth * 0.75;
  const verticalSpacing = hexHeight;
  const glowRadius = 150;

  // Generar grid de hexágonos
  useEffect(() => {
    const updateGrid = () => {
      const cols = Math.ceil(window.innerWidth / horizontalSpacing) + 2;
      const rows = Math.ceil(window.innerHeight / verticalSpacing) + 2;
      const newGrid: { id: string; x: number; y: number; col: number; row: number }[] = [];

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const x = col * horizontalSpacing;
          const yOffset = col % 2 === 1 ? hexHeight / 2 : 0;
          const y = row * verticalSpacing + yOffset;

          newGrid.push({
            id: `${col}-${row}`,
            x,
            y,
            col,
            row,
          });
        }
      }
      setGrid(newGrid);
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, [hexWidth, hexHeight, horizontalSpacing, verticalSpacing]);

  // Seguimiento del mouse
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

  // Calcular estado del hexágono basado en distancia al cursor
  const getHexState = useCallback((hexX: number, hexY: number) => {
    const adjustedHexX = hexX;
    const adjustedHexY = hexY;
    const dx = mousePos.x - adjustedHexX;
    const dy = mousePos.y - adjustedHexY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < hexSize * 0.8) {
      return 'hovered';
    } else if (distance < glowRadius) {
      return { type: 'near', intensity: 1 - (distance / glowRadius) };
    }
    return 'normal';
  }, [mousePos, glowRadius, hexSize]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: '#F5F5F5',
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <defs>
          {/* Gradiente base - misma paleta que el sitio */}
          <linearGradient id="hexBaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8E8E8" />
            <stop offset="50%" stopColor="#F0F0F0" />
            <stop offset="100%" stopColor="#F5F5F5" />
          </linearGradient>

          {/* Gradiente hover - negro (invertido) */}
          <linearGradient id="hexHoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#1f1f1f" />
          </linearGradient>

          {/* Gradiente cercano - gris oscuro (invertido) */}
          <linearGradient id="hexNearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#777777" />
            <stop offset="100%" stopColor="#999999" />
          </linearGradient>

          {/* Filtro de brillo negro */}
          <filter id="blackGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Filtro de brillo gris */}
          <filter id="grayGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {grid.map((hex) => {
          const state = getHexState(hex.x, hex.y);
          const isHovered = state === 'hovered';
          const isNear = typeof state === 'object' && state.type === 'near';
          const intensity = isNear ? (state as { type: string; intensity: number }).intensity : 0;
          const isActive = isHovered || isNear;

          let fill = 'url(#hexBaseGradient)';
          let stroke = '#FFFFFF';
          let strokeWidth = 1.5;
          let filter = '';
          let opacity = 0.7;
          let textColor = '#FFFFFF';
          let statusText = 'EMERGENCY';

          if (isHovered) {
            fill = '#000000';
            stroke = '#000000';
            strokeWidth = 2.5;
            filter = '';
            opacity = 1;
            textColor = '#FFFFFF';
            statusText = 'ALERT';
          } else if (isNear) {
            fill = 'url(#hexNearGradient)';
            stroke = '#555555';
            strokeWidth = 1.5;
            filter = 'url(#grayGlow)';
            opacity = 0.6 + intensity * 0.4;
            textColor = '#FFFFFF';
            statusText = 'ACTIVE';
          }

          return (
            <g
              key={hex.id}
              transform={`translate(${hex.x}, ${hex.y})`}
              style={{
                transition: 'all 0.1s ease-out',
              }}
            >
              {/* Hexágono principal */}
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

              {/* Contenido activo (hovered o near) */}
              {isActive && (
                <>
                  {/* Texto de estado */}
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill={textColor}
                    opacity={isHovered ? 1 : intensity}
                  >
                    {statusText}
                  </text>
                </>
              )}

              {/* Contenido normal */}
              {!isActive && (
                <>
                  {/* Triángulo de advertencia arriba */}
                  <polygon
                    points="0,-18 -10,2 10,2"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                  {/* Triángulo de advertencia abajo (invertido) */}
                  <polygon
                    points="0,22 -10,2 10,2"
                    fill="#FFFFFF"
                    opacity="0.4"
                  />
                  {/* Texto EMERGENCY */}
                  <text
                    x="0"
                    y="35"
                    textAnchor="middle"
                    fontSize="6"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="#FFFFFF"
                    opacity="0.6"
                  >
                    EMERGENCY
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
