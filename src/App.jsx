import React, { useState } from "react";
import { clrs } from "./colorObj";
import chroma from "chroma-js";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const getRandomColor = () => chroma.random().hex();

const generatePalette = () => {
  let colors = [];
  while (colors.length < 6) {
    let color = getRandomColor();
    if (!colors.includes(color)) colors.push(color);
  }
  return colors;
};

const App = () => {
  const [data, setData] = useState(clrs);
  const [val, setVal] = useState("");
  const [message, setMessage] = useState("");
  const [colorPicked, setColorPicked] = useState("");
  const [palette, setPalette] = useState([]);
  const [open, setOpen] = useState(false);

  const search = () => {
    const filteredColors = Object.entries(clrs).reduce((acc, [name, hex]) => {
      if (name.toLowerCase().includes(val.toLowerCase()) || hex.includes(val)) {
        acc[name] = hex;
      }
      return acc;
    }, {});
    setData(filteredColors);
  };

  const copyColor = (hex, name) => {
    navigator.clipboard.writeText(hex);
    setColorPicked(hex);
    setMessage(`Color code for ${name} (${hex}) copied to clipboard`);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleGeneratePalette = () => {
    const newPalette = generatePalette();
    setPalette(newPalette);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <header
        style={{
          marginBottom: "20px",
          position: "fixed",
          zIndex: 1000,
          top: "0",
          left: "0",
          width: "100%",
          background: "#fff",
          padding: "10px",
        }}
      >
        {message && (
          <div
            style={{
              padding: "10px",
              background: "#007bff",
              color: clrs.Alabaster,
              position: "fixed",
              left: "20px",
              top: "20px",
              borderRadius: "10px",
              zIndex: 1001,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p style={{ margin: 0 }}>{message}</p>
            <IconButton
              style={{
                cursor: "pointer",
              }}
              onClick={() => setMessage("")}
            >
              <CloseIcon sx={{ color: clrs.Alabaster }} />
            </IconButton>
          </div>
        )}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#007bff",
            fontSize: "36px",
            fontFamily: "'Arial', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: "normal",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          Colors
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
            gap: "10px",
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1000,
            marginBottom: "20px",
            padding: "0 10px",
          }}
        >
          <input
            type="text"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              search();
            }}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "10px",
              fontFamily: "'Arial', sans-serif",
              color: "#333",
              backgroundColor: "#fff",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            placeholder="Search by Hex or Name (e.g., #000000 or Abbey)"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleGeneratePalette}
          >
            Generate Palette
          </Button>
        </div>
      </header>

      <div
        style={{
          marginTop: "200px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "10px",
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          position: "relative",
          zIndex: 999,
          marginBottom: "20px",
          padding: "0 10px",
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        {Object.entries(data).map(([name, hex]) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "5px",
              transition: "transform 0.3s ease-in-out",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => copyColor(hex, name)}
          >
            <div
              style={{
                width: "100%",
                height: "100px",
                borderRadius: "5px",
                backgroundColor: hex,
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
            ></div>
            <h5
              style={{
                margin: 0,
                fontWeight: "normal",
                textAlign: "center",
                color: "#333",
                fontFamily: "'Arial', sans-serif",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                transition: "color 0.3s ease-in-out",
                cursor: "pointer",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100px",
                textTransform: "capitalize",
                marginBottom: "5px",
              }}
            >
              {name}
            </h5>
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="palette-modal-title"
        aria-describedby="palette-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <Typography id="palette-modal-title" variant="h6" component="h2">
            Generated Palette
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "16px",
            }}
          >
            {palette.map((color, index) => (
              <div key={index}>
                <div
                  style={{
                    height: "50px",
                    width: "50px",
                    backgroundColor: color,
                    marginBottom: "8px",
                    borderRadius: "4px",
                  }}
                ></div>
                <Typography
                  variant="body2"
                  style={{ textAlign: "center", wordWrap: "break-word" }}
                >
                  {color}
                </Typography>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
