import countriesServer from "../lib/fetch";

export async function getCountries() {
  try {
    const result = await countriesServer({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            countries {
              name,
              emoji
            }
          }
        `,
      }),
    });

    const countries = await result.json();

    return countries.data.countries;
  } catch (error) {
    throw error;
  }
}

export async function findCountries(name: string) {
  try {
    const result = await countriesServer({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            countries(filter: {
              name: {
                regex: "${name}"
              }
            }) {
              name,
              emoji
            }
          }
        `,
      }),
    });

    const countries = await result.json();

    return countries.data.countries;
  } catch (error) {
    throw error;
  }
}
