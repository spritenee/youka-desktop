const cheerio = require("cheerio");
const rp = require("./request-promise");
const google = require("./google_site");

const name = "lyricsmint.com";

const provider = {
  name,
  supported: (lang) => ["hi", "pa", "en"].includes(lang),
  site: "https://www.lyricsmint.com/",
  site_re: /https:\/\/www\.lyricsmint\.com\/.*\/.*/,

  search: async (query, lang) => google.search(name, query, lang),

  lyrics: async (url) => {
    const html = await rp(url);
    const $ = cheerio.load(html);
    $("div.pt-4.pb-2 > .text-base").find("br").replaceWith("\n");
    const l = $("div.pt-4.pb-2 > .text-base").text().trim();
    return l;
  },
};

google.register(provider);

module.exports = provider;
