import React from "react";

const noMatch = ({ msg }) => {
  const errorMessage = msg ? msg : "このページは存在しません";
  return (
    <div>
      <p style={styles.p}>{errorMessage}</p>
    </div>
  );
};

const styles = {
  p: {
    textAlign: "center",
    fontWeight: "bold",
    padding: "2em 0"
  }
};

export default noMatch;
