const fs = require('fs');
const path = require('path');

const dirToSearch = [
  'app',
  'components',
  'json',
  'package.json',
  'README.md',
  'next.config.js'
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const replacements = [
    { regex: /Rishabh Pawar/g, replacement: 'Ujjawal Sharma' },
    { regex: /rishabh pawar/gi, replacement: 'ujjawal sharma' },
    { regex: /RISHABH-PAWAR/g, replacement: 'UJJAWAL-SHARMA' },
    { regex: /rishabh-pawar/gi, replacement: 'ujjawal-sharma' },
    { regex: /rishabhpawar/gi, replacement: 'ujjawalsharma' },
    { regex: /Rishabh/g, replacement: 'Ujjawal' },
    { regex: /rishabh/g, replacement: 'ujjawal' },
    { regex: /RISHABH/g, replacement: 'UJJAWAL' }
  ];

  let newContent = content;
  for (const { regex, replacement } of replacements) {
    newContent = newContent.replace(regex, replacement);
  }

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const stat = fs.statSync(dir);
  if (stat.isFile()) {
    if (dir.match(/\.(js|jsx|json|md)$/)) {
      replaceInFile(dir);
    }
    return;
  }
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    walkDir(fullPath);
  }
}

for (const dir of dirToSearch) {
  walkDir(path.join(__dirname, dir));
}
console.log('Done!');
