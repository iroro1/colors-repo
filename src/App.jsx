import { clrs } from "./colorObj";

function App() {
  return (
    <div>
      <h1 style={{ color: clrs["American Rose"], textAlign: "center" }}>
        Colors
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          padding: "10px 20px",
        }}
      >
        {Object.entries(clrs).map((color) => (
          <div
            style={{
              width: "100px",
              overflow: "hidden",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <div
              style={{
                height: "50px",
                width: "100%",
                background: color[1],
                lineHeight: "3px",
              }}
            ></div>
            <h5>{color[0]}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
