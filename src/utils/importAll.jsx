const importAll = (r) => {
  const files = {};
  r.keys().map((file) => (files[file.replace("./", "")] = r(file)));
  return files;
};

export default importAll;
