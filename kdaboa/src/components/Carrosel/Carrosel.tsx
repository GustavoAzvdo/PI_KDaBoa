import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { dados } from "../../categorys/dados";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

export default function Carrosel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const { setCategories, setSearchText, setDate } = useSearch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setItemsPerView(2); // Telas 'xs'
      else if (width < 960) setItemsPerView(5); // Telas 'sm'
      else if (width < 1200) setItemsPerView(6); // Telas 'md'
      else if (width < 1536) setItemsPerView(8); // Telas 'lg'
      else setItemsPerView(9); // Telas 'xl' e maiores
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
     
      setCurrentIndex((prev) => (prev + 1) % dados.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, dados.length]); 


  return (
    <Box
      sx={{
        bgcolor: "white",
        width: "100%",
        margin: "0 auto",
        borderBottom: "1px solid #c9c9c990",
        overflow: "hidden", // Impede scroll horizontal
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Box sx={{ py: 1, width: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            gap: 2,
            width: `${(dados.length * 100) / itemsPerView}%`, 
            transform: `translateX(-${(currentIndex * 100) / dados.length}%)`,
         
          }}
        >
          {dados.map((category, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--notosans)",
                flexShrink: 0, 
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
                  setCategories([category.id.toString()]);
                  setSearchText("");
                  setDate("");
                  navigate("/search");
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