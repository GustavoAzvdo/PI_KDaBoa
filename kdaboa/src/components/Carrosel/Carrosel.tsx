import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { dados } from "../../categorys/dados";
import {  useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

export default function Carrosel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const [paused, setPaused] = useState(false);
  const { setCategories } = useSearch();
  const navigate = useNavigate();

  // Responsividade
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) setItemsPerView(2);
      else if (window.innerWidth < 960) setItemsPerView(5);
      else setItemsPerView(6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play com pausa
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dados.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  const extendedCategories = [...dados, ...dados, ...dados];

  return (
    <Box
      sx={{
        bgcolor: "white",
        width: "100%",
        maxWidth: "xl",
        margin: "0 auto",
        borderBottom: "1px solid #c9c9c990",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Box sx={{ py: 1 }}>
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            gap: 2,
            transform: `translateX(-${(currentIndex * 5) / itemsPerView}%)`,
            width: `${(extendedCategories.length * 100) / itemsPerView}%`,
          }}
        >
          {extendedCategories.map((category, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--notosans)",
              }}
            >
              <Button
                startIcon={category.icon}
                sx={{
                  px: 2,
                  color: "text.secondary",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#E2CFFC70",
                    color: "#6c15d5",
                  },
                }}
                onClick={() => {
                  navigate("/search", {state: {categories: [String(category.id)]}}); // navega pra search
             
                }}
              >
                {category.title}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
