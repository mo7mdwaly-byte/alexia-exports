#!/usr/bin/env node
/* Rebuilds index.html, ar.html, sitemap.xml and robots.txt from content.json.
   Usage: node tools/build.js   (run from the repository root) */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const builder = require(path.join(root, 'admin', 'builder.js'));
const content = JSON.parse(fs.readFileSync(path.join(root, 'content.json'), 'utf8'));
const files = builder.build(content);
Object.keys(files).forEach(function (name) {
  fs.writeFileSync(path.join(root, name), files[name], 'utf8');
  console.log('wrote', name);
});
