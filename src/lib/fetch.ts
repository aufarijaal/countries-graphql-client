export default function countriesServer(options: RequestInit) {
  try {
    return fetch("https://countries.trevorblades.com/", options);
  } catch (error) {
    throw error;
  }
}
