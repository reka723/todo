import { useState } from "react";
import DragAndDrop from "./Components/DragAndDrop";

function App() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? "dark" : "light";
  return (
    <div className={`App ${theme}`}>
      <DragAndDrop isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
}

export default App;
