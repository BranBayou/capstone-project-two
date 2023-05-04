const appId = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default appId;