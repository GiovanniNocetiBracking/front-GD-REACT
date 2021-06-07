import { useEffect, useState } from "react";
import { database } from "./firebaseConfig";

export default function Co() {
  const [co, setCo] = useState(null);
  useEffect(() => {
    const coData = database.ref("Sensor1/co");
    coData.on("value", (snapshot) => {
      setCo(snapshot.val());
    });
    return () => {
      setCo({});
    };
  }, []);
  return co;
}
