const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/songs`;

const fetchSongs = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.map(name => ({
      name: name.replace(/\.mp3$/, ''),
      src: `${process.env.REACT_APP_BACKEND_URL}/music/${name}`
    }));
  } catch (err) {
    console.error('Failed to load songs', err);
    return [];
  }
};

export default fetchSongs;
