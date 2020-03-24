exports.seed = async function (db) {
  const { id: location_id } = await db("locations")
    .first(["id"])
    .where({ name: "Curitiba" });

  return db("cases").insert([
    {
      location_id,
      date: "2020-03-12",
      cases: 5,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_12032020.pdf",
    },
    {
      location_id,
      date: "2020-03-13",
      cases: 5,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_13032020.pdf",
    },
    {
      location_id,
      date: "2020-03-14",
      cases: 5,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_13032020.pdf",
    },
    {
      location_id,
      date: "2020-03-15",
      cases: 5,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_13032020.pdf",
    },
    {
      location_id,
      date: "2020-03-16",
      cases: 5,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_13032020.pdf",
    },
    {
      location_id,
      date: "2020-03-17",
      cases: 7,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_17032020.pdf",
    },
    {
      location_id,
      date: "2020-03-18",
      cases: 8,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_18032020.pdf",
    },
    {
      location_id,
      date: "2020-03-19",
      cases: 17,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_19032020.pdf",
    },
    {
      location_id,
      date: "2020-03-20",
      cases: 27,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_20032020.pdf",
    },
    {
      location_id,
      date: "2020-03-21",
      cases: 31,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_21032020.pdf",
    },
    {
      location_id,
      date: "2020-03-22",
      cases: 31,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_22032020.pdf",
    },
    {
      location_id,
      date: "2020-03-23",
      cases: 34,
      deaths: 0,
      recovered: 0,
      source: "http://www.saude.pr.gov.br/arquivos/File/CORONA_23032020.pdf",
    },
  ]);
};
