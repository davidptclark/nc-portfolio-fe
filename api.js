export function handleUpload(file, setIsLoading, setImage) {
  if (file !== null) {
    setIsLoading(true);

    const url = `https://api.cloudinary.com/v1_1/ncfiveguysuk/auto/upload`;

    let newfile = {
      uri: file,
      type: `test/${file.split(".")[1]}`,
      name: `test.${file.split(".")[1]}`,
    };

    const formData = new FormData();
    formData.append("file", newfile);
    formData.append("upload_preset", "jycjtlpe");
    formData.append("tags", "test");

    fetch(url, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setImage(null);
        alert("Your video has been uploaded sucessfully!");
        console.log(data);
        console.log(data.asset_id);
      });
  }
}
