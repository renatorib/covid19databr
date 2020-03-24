const fetch = require("node-fetch");
const R = require("ramda");
const fs = require("fs");

const getBRGeoJson = () =>
  fetch(
    "https://servicodados.ibge.gov.br/api/v2/malhas/BR?resolucao=0&formato=application/vnd.geo+json"
  ).then((r) => r.json());

const getAllCounties = () =>
  fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
  ).then((r) => r.json());

const getAllCountiesGeoJSON = () =>
  fetch(
    "https://servicodados.ibge.gov.br/api/v2/malhas/BR?resolucao=5&formato=application/vnd.geo+json"
  ).then((r) => r.json());

const getAllStates = () =>
  fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  ).then((r) => r.json());

const getAllStatesGeoJSON = () =>
  fetch(
    "https://servicodados.ibge.gov.br/api/v2/malhas/BR?resolucao=2&formato=application/vnd.geo+json"
  ).then((r) => r.json());

/* ---- */

const extractCountry = async () => {
  const geojson = await getBRGeoJson();
  const data = R.evolve({
    features: R.map(
      R.evolve({
        properties: (p) => ({
          type: "country",
          name: p.NOME,
          code: p.CODISO3166,
        }),
      })
    ),
  })(geojson);

  fs.writeFileSync("geojson/ibge/countries.json", JSON.stringify(data), "utf8");
};

const extractStates = async () => {
  const states = await getAllStates();
  const geojson = await getAllStatesGeoJSON();
  const data = R.evolve({
    features: R.map(
      R.evolve({
        properties: (p) => {
          const state = states.find((s) => s.id == p.codarea);
          return {
            type: "state",
            name: state.nome,
            code: state.sigla,
          };
        },
      })
    ),
  })(geojson);

  fs.writeFileSync("geojson/ibge/states.json", JSON.stringify(data), "utf8");
};

const extractCounties = async () => {
  const counties = await getAllCounties();
  const geojson = await getAllCountiesGeoJSON();
  const data = R.evolve({
    features: R.map(
      R.evolve({
        properties: (p) => {
          const county = counties.find((c) => c.id == p.codarea);
          return {
            type: "county",
            name: county.nome,
            code: null,
          };
        },
      })
    ),
  })(geojson);

  fs.writeFileSync("geojson/ibge/counties.json", JSON.stringify(data), "utf8");
};

extractCountry();
extractStates();
extractCounties();
