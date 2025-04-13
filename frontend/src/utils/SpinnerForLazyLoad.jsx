import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const SpinnerForLazyLoad = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
      <ClipLoader
        size={200}
        color="#f76060"
        aria-label="LOADING..."
        cssOverride={{
          borderWidth: "18px", // Adjust thickness by modifying border-width
        }}
      />
    </div>
  );
};

export default SpinnerForLazyLoad;
