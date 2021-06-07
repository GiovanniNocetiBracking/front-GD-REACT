import { useEffect, useState } from "react";
import { database } from "./firebaseConfig";

export default function Smoke() {
  const [smoke, setSmoke] = useState(null);
  useEffect(() => {
    const smokeData = database.ref("Sensor1/smoke");
    smokeData.on("value", (snapshot) => {
      setSmoke(snapshot.val());
    });
    return () => {
      setSmoke({}); // This worked for me
    };
  }, []);
  return smoke;
}
