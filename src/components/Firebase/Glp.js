import { useEffect, useState } from "react";
import { database } from "./firebaseConfig";

export default function Sensor() {
  const [glp, setGlp] = useState(null);
  useEffect(() => {
    const glpData = database.ref("Sensor1/lpg");
    glpData.on("value", (snapshot) => {
      setGlp(snapshot.val());
    });
    return () => {
      setGlp({}); // This worked for me
    };
  }, []);
  return glp;
}
