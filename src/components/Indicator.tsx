"use client";

import { useActivity } from "@/context/ActivityContext";

const Indicator = () => {
  const { isOnline } = useActivity();

  return (
    <div style={{ position: "absolute", zIndex: 1000 }}>
      {isOnline ? (
        <div
          style={{
            backgroundColor: "green",
            width: 10,
            height: 10,
            borderRadius: "50%",
          }}
          title="نشط"
        />
      ) : (
        <div
          style={{
            backgroundColor: "gray",
            width: 10,
            height: 10,
            borderRadius: "50%",
          }}
          title="غير نشط"
        />
      )}
    </div>
  );
};

export default Indicator;
