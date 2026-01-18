import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

export function HexagonBackground() {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [grid, setGrid] = useState<{ id: string; x: number; y: number; col: number; row: number }[]>([]);

  // Configuración de hexágonos FLAT-TOP
  const hexSize = 45;
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;
  const horizontalSpacing = hexWidth * 0.75;
  const verticalSpacing = hexHeight;
  const glowRadius = 150;

  // Colores según el tema
  const colors = theme === 'light' ? {
    background: '#F5F5F5',
    baseGradient: ['#E8E8E8', '#F0F0F0', '#F5F5F5'],
    hoverFill: '#000000',
    hoverStroke: '#000000',
    nearGradient: ['#777777', '#999999'],
    normalStroke: '#FFFFFF',
    normalTriangle: '#FFFFFF',
    textColor: '#FFFFFF',
  } : {
    background: '#1a1a1a',
    baseGradient: ['#2a2a2a', '#222222', '#1a1a1a'],
    hoverFill: '#FFFFFF',
    hoverStroke: '#FFFFFF',
    nearGradient: ['#888888', '#666666'],
    normalStroke: '#000000',
    normalTriangle: '#000000',
    textColor: '#000000',
  };

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
        backgroundColor: colors.background,
        transition: 'background-color 0.3s ease',
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
          {/* Gradiente base */}
          <linearGradient id="hexBaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.baseGradient[0]} />
            <stop offset="50%" stopColor={colors.baseGradient[1]} />
            <stop offset="100%" stopColor={colors.baseGradient[2]} />
          </linearGradient>

          {/* Gradiente cercano */}
          <linearGradient id="hexNearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.nearGradient[0]} />
            <stop offset="100%" stopColor={colors.nearGradient[1]} />
          </linearGradient>

          {/* Filtro de brillo */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
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
          let stroke = colors.normalStroke;
          let strokeWidth = 1.5;
          let filter = '';
          let opacity = 0.7;
          let textColor = colors.textColor;
          let statusText = 'EMERGENCY';

          if (isHovered) {
            fill = colors.hoverFill;
            stroke = colors.hoverStroke;
            strokeWidth = 2.5;
            filter = '';
            opacity = 1;
            textColor = theme === 'light' ? '#FFFFFF' : '#000000';
            statusText = 'ALERT';
          } else if (isNear) {
            fill = 'url(#hexNearGradient)';
            stroke = theme === 'light' ? '#555555' : '#aaaaaa';
            strokeWidth = 1.5;
            filter = 'url(#glow)';
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
                    stroke={colors.normalTriangle}
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                  {/* Triángulo de advertencia abajo (invertido) */}
                  <polygon
                    points="0,22 -10,2 10,2"
                    fill={colors.normalTriangle}
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
                    fill={colors.normalTriangle}
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
