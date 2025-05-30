// src/options/components/design-options/DesignPreview.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider
} from '@mui/material';

// Menü-Vorschau Komponente mit interaktivem Floating Bar
const DesignPreview = ({ title, design, theme }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(1);
  const menuItemsRef = useRef([]);
  const menuContainerRef = useRef(null);
  const [menuItemsWidth, setMenuItemsWidth] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);

  const visibleMenuItems = [
    { id: 'showCommunity', label: 'Gemeinschaftsnetzwerk' },
    { id: 'showTrackTrace', label: 'Track & Trace' },
    { id: 'showWawi', label: 'WaWi' },
    { id: 'showFinance', label: 'Buchhaltung' },
    { id: 'showRooms', label: 'Raumverwaltung' },
    { id: 'showSecurity', label: 'Sicherheit' },
  ].filter(item => design.menuVisibility && design.menuVisibility[item.id] !== false);

  const getBackgroundColor = () => {
    if (design.darkMode) return '#121212';
    if (design.topbarColor && design.topbarColor.startsWith('#')) return design.topbarColor;
    if (design.topbarColor && theme.palette[design.topbarColor]?.main) return theme.palette[design.topbarColor].main;
    return '#4caf50';
  };

  useEffect(() => {
    if (menuContainerRef.current && menuItemsRef.current.length > 0) {
      setContainerWidth(menuContainerRef.current.offsetWidth);
      const widths = menuItemsRef.current.map(item => 
        item ? {
          width: item.offsetWidth,
          left: item.offsetLeft
        } : null
      );
      setMenuItemsWidth(widths);
    }
  }, [visibleMenuItems.length, design.menuSpacing, design.showDividers, design.menuFont]);

  useEffect(() => {
    menuItemsRef.current = menuItemsRef.current.slice(0, visibleMenuItems.length);
    while (menuItemsRef.current.length < visibleMenuItems.length) {
      menuItemsRef.current.push(null);
    }
  }, [visibleMenuItems.length]);

  const calculateBarStyle = () => {
    if (!design.floatingBar?.enabled || visibleMenuItems.length === 0) {
      return { opacity: 0 };
    }

    const activeIndex = hoveredItem !== null ? hoveredItem : 
                         selectedItem < visibleMenuItems.length ? selectedItem : 0;

    if (menuItemsWidth.length === 0 || !menuItemsWidth[activeIndex]) {
      return {
        width: `${100 / visibleMenuItems.length}%`,
        left: `${activeIndex * (100 / visibleMenuItems.length)}%`,
        opacity: 0.8
      };
    }

    return {
      width: `${menuItemsWidth[activeIndex].width}px`,
      left: `${menuItemsWidth[activeIndex].left}px`,
      opacity: hoveredItem !== null ? 1 : 0.8
    };
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        bgcolor: getBackgroundColor(),
        color: 'white',
        p: 2,
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 1,
        gap: 1,
        boxShadow: design.darkMode 
          ? '0 4px 8px rgba(0, 0, 0, 0.5)' 
          : '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
        <Typography 
          sx={{ 
            fontFamily: design.titleFont, 
            fontWeight: design.titleWeight, 
            fontStyle: design.titleStyle, 
            textDecoration: design.titleDecoration,
            color: design.titleColor,
          }}
        >
          {title || "cannaUNITY"}
        </Typography>

        <Box 
          ref={menuContainerRef}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            position: 'relative',
            height: '44px'
          }}
        >
          {visibleMenuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {index > 0 && design.showDividers && (
                <Divider 
                  orientation="vertical" 
                  flexItem 
                  sx={{ 
                    mx: 1, 
                    borderColor: design.menuColor,
                    opacity: 0.5,
                    height: '20px',
                    my: 'auto',
                    alignSelf: 'center'
                  }} 
                />
              )}
              <Box
                ref={el => menuItemsRef.current[index] = el}
                sx={{
                  cursor: 'pointer',
                  px: design.menuSpacing / 2,
                  py: 0.5,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%'
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedItem(index)}
              >
                <Typography 
                  sx={{ 
                    fontFamily: design.menuFont, 
                    fontWeight: selectedItem === index ? 'bold' : design.menuWeight, 
                    fontStyle: design.menuStyle, 
                    textDecoration: design.menuDecoration,
                    color: design.menuColor,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </React.Fragment>
          ))}

          {design.floatingBar?.enabled && visibleMenuItems.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                height: `${design.floatingBar?.height || 3}px`,
                backgroundColor: design.floatingBar?.color || '#ffffff',
                bottom: '0',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                ...calculateBarStyle()
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default DesignPreview;