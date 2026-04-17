// Post-build script: transform Next.js static export to GitHub Pages structure
// Moves root-level HTML files into their corresponding subdirectories

const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '..', 'out')

// Files that should stay at root
const rootFiles = new Set(['index.html', '404.html', '_not-found.html'])

// Move page HTML files into subdirectories
const files = fs.readdirSync(outDir)

for (const file of files) {
  if (!file.endsWith('.html')) continue
  if (rootFiles.has(file)) continue

  const src = path.join(outDir, file)
  const dirName = file.replace('.html', '')
  const destDir = path.join(outDir, dirName)

  // Create subdirectory
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  // Move file
  fs.renameSync(src, path.join(destDir, 'index.html'))
  console.log(`Moved ${file} → ${dirName}/index.html`)
}

console.log('GitHub Pages structure ready!')
