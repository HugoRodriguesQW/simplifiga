
export function isValidUrl(_string){
  const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matchPattern.test(_string);
}