import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface Filter {
  key: string;
  label: string;
}

interface LiquidFilterButtonsProps {
  filters: Filter[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function LiquidFilterButtons({ filters, activeFilter, onFilterChange }: LiquidFilterButtonsProps) {
  const { theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const colors = theme === 'light' ? {
    buttonBorder: 'border-black',
    liquidColor: '#000000',
    activeText: '#FFFFFF',
    inactiveText: '#000000',
  } : {
    buttonBorder: 'border-white',
    liquidColor: '#FFFFFF',
    activeText: '#000000',
    inactiveText: '#FFFFFF',
  };

  const handleFilterClick = (newFilter: string) => {
    if (newFilter === activeFilter || isAnimating) return;
    setIsAnimating(true);
    onFilterChange(newFilter);
    // Pequeño delay solo para la animación del botón
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="flex flex-wrap gap-4 relative">
      {/* Botones */}
      {filters.map((filter) => (
        <motion.button
          key={filter.key}
          onClick={() => handleFilterClick(filter.key)}
          className={`px-6 py-2 border ${colors.buttonBorder} font-mono text-sm`}
          style={{
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'transparent',
            zIndex: 1,
          }}
          whileHover={{ scale: isAnimating ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Fondo del botón activo con layoutId para animación fluida */}
          {activeFilter === filter.key && (
            <motion.div
              layoutId="liquid-background"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: colors.liquidColor,
                borderRadius: '4px',
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
          <span
            style={{
              position: 'relative',
              zIndex: 2,
              color: activeFilter === filter.key ? colors.activeText : colors.inactiveText,
              transition: 'color 0.2s ease',
            }}
          >
            {filter.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
