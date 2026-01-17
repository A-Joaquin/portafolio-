import React, { useEffect, useState, useCallback, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
}

export function NervCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const lastPointRef = useRef<TrailPoint | null>(null);

  const updateTrail = useCallback((x: number, y: number) => {
    const newPoint = { x, y };

    // Solo agregar punto si hay suficiente distancia del último (para suavidad)
    if (lastPointRef.current) {
      const dx = x - lastPointRef.current.x;
      const dy = y - lastPointRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Agregar puntos intermedios para trazo más suave
      if (distance > 3) {
        const steps = Math.ceil(distance / 3);
        const newPoints: TrailPoint[] = [];

        for (let i = 1; i <= steps; i++) {
          newPoints.push({
            x: lastPointRef.current.x + (dx * i) / steps,
            y: lastPointRef.current.y + (dy * i) / steps,
          });
        }

        setTrail(prevTrail => [...newPoints, ...prevTrail].slice(0, 50));
      }
    } else {
      setTrail(prevTrail => [newPoint, ...prevTrail].slice(0, 50));
    }

    lastPointRef.current = newPoint;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      updateTrail(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
      lastPointRef.current = null;
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [updateTrail]);

  // Desvanecer gradualmente el trail
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prevTrail => {
        if (prevTrail.length > 0) {
          return prevTrail.slice(0, -2); // Quitar puntos del final
        }
        return prevTrail;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Generar el path SVG para el trazo continuo
  const generateSmoothPath = () => {
    if (trail.length < 2) return '';

    let path = `M ${trail[0].x} ${trail[0].y}`;

    for (let i = 1; i < trail.length; i++) {
      const current = trail[i];
      const prev = trail[i - 1];

      // Usar curvas cuadráticas para suavizar
      const midX = (prev.x + current.x) / 2;
      const midY = (prev.y + current.y) / 2;

      path += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
    }

    return path;
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Trail SVG - Trazo continuo tipo pincel */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      >
        <defs>
          {/* Gradiente para el trazo */}
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF0033" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF3300" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </linearGradient>

          {/* Filtro de glow */}
          <filter id="trailGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Capa de glow exterior */}
        {trail.length >= 2 && (
          <path
            d={generateSmoothPath()}
            fill="none"
            stroke="rgba(255, 0, 51, 0.4)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#trailGlow)"
            style={{
              opacity: 0.6,
            }}
          />
        )}

        {/* Trazo principal */}
        {trail.length >= 2 && (
          <path
            d={generateSmoothPath()}
            fill="none"
            stroke="url(#trailGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Núcleo brillante del trazo */}
        {trail.length >= 2 && (
          <path
            d={generateSmoothPath()}
            fill="none"
            stroke="rgba(255, 150, 100, 0.8)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* Cursor principal - Logo NERV simplificado */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        {/* Logo NERV SVG */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(255, 0, 51, 0.8)) drop-shadow(0 0 15px rgba(255, 107, 0, 0.5))',
          }}
        >
          {/* Hoja/Media hoja de NERV */}
          <path
            d="M50 5
               C 25 5, 10 25, 10 50
               C 10 75, 25 95, 50 95
               C 50 95, 50 50, 50 5
               Z"
            fill="#FF0033"
            stroke="#FF6B00"
            strokeWidth="2"
          />
          <path
            d="M50 5
               C 75 5, 90 25, 90 50
               C 90 75, 75 95, 50 95
               C 50 95, 50 50, 50 5
               Z"
            fill="#8B0000"
            stroke="#FF6B00"
            strokeWidth="2"
          />
          {/* Línea central */}
          <line
            x1="50"
            y1="15"
            x2="50"
            y2="85"
            stroke="#FF6B00"
            strokeWidth="3"
          />
          {/* Triángulo superior */}
          <polygon
            points="50,20 35,45 65,45"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Círculo central */}
          <circle
            cx="50"
            cy="55"
            r="8"
            fill="#FF6B00"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Glow exterior animado */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 0, 51, 0.4)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9997,
          animation: 'pulse 1.5s ease-in-out infinite',
          boxShadow: '0 0 20px rgba(255, 0, 51, 0.3)',
        }}
      />

      {/* Estilos de animación */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
}
