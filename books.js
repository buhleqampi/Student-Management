const myRequest = await Request ("https://www.googleapis.com/books/v1/{collectionName}/resourceID?parameters", {
    method: "GET",
    body: JSON.stringify({ name: "Buhle" }),
    headers: {
      "Content-Type": "application/json",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
        },},
  );

  const response = await fetch(myRequest);
