import { useState } from "react";
import { clrs } from "./colorObj";

function App() {
  const [data, setData] = useState(clrs);
  const [val, setval] = useState("");
  const [message, setMessage] = useState("");
  const [colorpicked, setColorPicked] = useState("");
  const search = () => {
    const ans = {};
    Object.entries(data).forEach((color) => {
      if (color[0].includes(val) || color[1].includes(val)) {
        ans[color[0]] = color[1];
      }
    });
    console.log(ans);
    // setData({ ...ans });
    // Object.entries(ans).length > 0 ? setData({ ...ans }) : setData({ ...clrs });
  };
  const copyColor = (val, name) => {
    navigator.clipboard.writeText(val);
    setColorPicked(val);
    setMessage(`Color code for ${name} (${val}) copied to clipboard`);
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {message && (
        <div
          style={{
            padding: 10,
            background: colorpicked,
            color: clrs.Alabaster,
            position: "fixed",
            left: 20,
            top: 20,
            borderRadius: 10,
            paddingRight: 50,
          }}
          className={`p-4 bg-[#ffff000] text-[#fff] m-2 relative`}
        >
          <p
            style={{
              outlineColor: "#333",
              textShadow: "2px 2px 1px #333",
            }}
          >
            {message}
          </p>
          <div
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              cursor: "pointer",
              outlineColor: "#333",
              textShadow: "2px 2px 1px #333",
            }}
            onClick={() => setMessage("")}
          >
            <span>X</span>
          </div>
        </div>
      )}
      <h1 style={{ color: clrs["American Rose"], textAlign: "center" }}>
        Colors
      </h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        {/* <input
          type="text"
          onChange={(e) => {
            setval(e.target.value);
            search();
          }}
          style={{
            width: "320px",
            padding: "9px",
            border: "1px solid #ddd",
            borderRadius: "7px",
          }}
          placeholder="Search by Hex or Name . E.g (#000000 or Abbey)"
        /> */}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          padding: "10px 20px",
        }}
      >
        {Object.entries(data).map((color) => (
          <div
            style={{
              width: "100px",
              overflow: "hidden",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              cursor: "pointer",
            }}
          >
            <div
              onClick={() => copyColor(color[1], color[0])}
              style={{
                height: "50px",
                width: "100%",
                background: color[1],
                lineHeight: "3px",
              }}
            ></div>
            <h5 style={{ fontSize: 12 }}>{color[0]}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
