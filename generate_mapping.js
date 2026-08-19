const fs = require('fs');
const parseCSV = () => {
  const content = fs.readFileSync('3d routing - Sheet1.csv', 'utf-8');
  
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (c === '\"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((c === '\n' || c === '\r') && !inQuotes) {
      if (c === '\r' && content[i+1] === '\n') {
        i++; // skip \n
      }
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += c;
    }
  }
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length > 3) {
      let fabStyle = row[3] || '';
      fabStyle = fabStyle.replace('*', '').trim();
      if (fabStyle.startsWith('FAB')) {
        const name = row[4] || 'Fabric';
        const sku = row[12] || row[11] || 'N/A';
        data.push({ fabStyle, name, sku });
      }
    }
  }
  return data;
};
const parsed = parseCSV();

const baseMapping = {};

parsed.forEach(p => {
  baseMapping[p.fabStyle] = { name: p.name, sku: p.sku };
});

fs.writeFileSync('lib/3d-fabric-mapping.ts', `
export const FABRIC_INFO: Record<string, { name: string; sku: string }> = ${JSON.stringify(baseMapping, null, 2)};

export const getFabricData = (fileName: string) => {
  const rawName = fileName.replace('.mp4', '');
  const fabMatch = rawName.match(/FAB (\\d+)/i);
  const fabKey = fabMatch ? \`FAB \${fabMatch[1]}\` : "FAB 1";
  
  const numMatch = rawName.match(/^(\\d+)$/);
  const finalFabKey = numMatch ? \`FAB \${numMatch[1]}\` : fabKey;
  
  return FABRIC_INFO[finalFabKey] || { name: "Premium Fabric", sku: "N/A" };
};
`);
console.log('Created lib/3d-fabric-mapping.ts');
