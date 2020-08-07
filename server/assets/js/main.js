import "../scss/styles.scss";

const haha = {
  ha: "ha",
  ho: "ho",
};

const as = async () => {
  const com = await setTimeout(() => {
    "end";
  }, 2000);

  const result = haha?.ha + haha?.ho + com;
  console.log("this is static~");
  return result;
};
