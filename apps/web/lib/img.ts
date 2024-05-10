export function arrayBufferToImgSrc(arrayBuffer: ArrayBuffer): string {
  const blob = new Blob([arrayBuffer], { type: "image/jpeg" }); // change 'image/jpeg' to the actual type of the image if necessary
  console.log("blob", blob);
  const url = URL.createObjectURL(blob);
  return url;
}
