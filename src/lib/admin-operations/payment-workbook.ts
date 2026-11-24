import { strToU8, zipSync } from 'fflate';

type Cell = string | number;

const main = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
const relationships = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const packageRelationships = 'http://schemas.openxmlformats.org/package/2006/relationships';

function escapeXml(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g, '\uFFFD')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function makePaymentWorkbook(rows: Cell[][]): Blob {
  const lastColumn = String.fromCharCode(64 + rows[0].length);
  const sheetRows = rows.map((row, index) => `<row r="${index + 1}">${row.map((value, column) => {
    const ref = `${String.fromCharCode(65 + column)}${index + 1}`;
    return typeof value === 'number'
      ? `<c r="${ref}"><v>${value}</v></c>`
      : `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${escapeXml(value)}</t></is></c>`;
  }).join('')}</row>`).join('');
  const parts = {
    '[Content_Types].xml': '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/pagos.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
    '_rels/.rels': `<Relationships xmlns="${packageRelationships}"><Relationship Id="rId1" Type="${relationships}/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    'xl/workbook.xml': `<workbook xmlns="${main}" xmlns:r="${relationships}"><bookViews><workbookView/></bookViews><sheets><sheet name="Pagos" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    'xl/_rels/workbook.xml.rels': `<Relationships xmlns="${packageRelationships}"><Relationship Id="rId1" Type="${relationships}/worksheet" Target="worksheets/pagos.xml"/></Relationships>`,
    'xl/worksheets/pagos.xml': `<worksheet xmlns="${main}"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="${rows[0].length}" width="23" customWidth="1"/></cols><sheetData>${sheetRows}</sheetData><autoFilter ref="A1:${lastColumn}${rows.length}"/></worksheet>`,
  };
  const zip = zipSync(Object.fromEntries(Object.entries(parts).map(([path, content]) => [path, strToU8(content)])));
  return new Blob([new Uint8Array(zip)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}
