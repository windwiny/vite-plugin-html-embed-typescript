const NAME = "vite-plugin-html-embed-typescript";
const includeRegex =
  /(<script\s+type\s*=\s*"?application\/typescript"?\s*>(?<tscode>.*?)<\/script\s*>)|(<script\s+[^\>]*title\s*=\s*"?(ts|typescript)"?[^\>]*>(?<tscode>.*?)<\/script\s*>)/gims;

import * as vite from "vite";
console.error(`loading ${NAME} ....`);

async function transformTS(tscode) {
  let tr;
  if (vite.transformWithOxc) {
    tr = vite.transformWithOxc(tscode, "", { lang: "ts" });
  } else if (vite.transformWithEsbuild) {
    tr = vite.transformWithEsbuild(tscode, "", { loader: "ts" });
  } else {
    console.warn(` NOT transformWith Oxc Esbuild`);
    tr = { code: tscode, warnings: [`No transform TS to JS`] };
  }
  return tr;
}

async function processTS(html) {
  let match;
  let newHtml = html;

  while ((match = includeRegex.exec(newHtml)) !== null) {
    const tscode = match.groups.tscode;

    const tr = await transformTS(tscode);
    let jscode = tr.code;
    const wa = tr.warnings.length
      ? tr.warnings
          .join("---")
          .split("\n")
          .map((x) => "// * " + x)
          .join("\n")
      : "";
    const summ = ` // ts(${tscode.length} bytes)->js(${jscode?.length} bytes) warn:${tr.warnings.length}`;
    jscode = `<SCRIPT>${summ}\n${wa ? wa + "\n" : ""}${jscode.trim()}\n</SCRIPT>`;

    newHtml = newHtml.replace(match[0], jscode);
  }
  return newHtml;
}

export default function htmlEmbedTS() {
  return {
    name: NAME,
    async transformIndexHtml(html, ctx) {
      const result = await processTS(html);
      return result;
    },
  };
}

