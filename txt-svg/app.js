const logo = document.querySelector("object");
const paths = logo.querySelectorAll("svg>path");

const checkPath = (paths) => {
  paths.forEach((path) => {
    console.log(path.getTotalLength());
  });
};

checkPath(paths);
