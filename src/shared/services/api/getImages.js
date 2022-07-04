import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
  key: '28388619-fdad95b8db048ebd006fb8ba8',
  per_page: 12,
  image_type: 'photo',
  orientation: 'horizontal',
  }
});

export async function getImagesList(q, page = 1) {
  const data = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
    return data;
}
