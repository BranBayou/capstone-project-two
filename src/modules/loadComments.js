const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const APP_ID = 'KoGu1gXtHfNFhhQlUFNu';

const fetchComment = async (itemid) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${APP_ID}/comments?item_id=${itemid}`,
    );
    if (response.ok) {
      const data = response.json();
      return data;
    }
    return [];
  } catch (err) {
    return err;
  }
};

export default fetchComment;