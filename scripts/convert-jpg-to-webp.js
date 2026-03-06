const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.resolve('public');

function getNewImageDirs(rootDir) {
  if (!fs.existsSync(rootDir)) return [];

  return fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(rootDir, entry.name, 'new'))
    .filter((newDir) => fs.existsSync(newDir) && fs.statSync(newDir).isDirectory());
}

async function run() {
  const dirs = getNewImageDirs(publicDir);
  let converted = 0;
  let skipped = 0;
  let failed = 0;

  if (dirs.length === 0) {
    console.log('No public/*/new directories found.');
    return;
  }

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      continue;
    }

    const files = fs.readdirSync(dir).filter((file) => /\.jpe?g$/i.test(file));
    console.log(`Directory: ${path.relative(process.cwd(), dir)} (${files.length} JPG files)`);

    for (const file of files) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, `${path.basename(file, path.extname(file))}.webp`);

      try {
        if (fs.existsSync(outputPath)) {
          skipped += 1;
          console.log(`- Skipped existing: ${path.relative(process.cwd(), outputPath)}`);
          continue;
        }

        await sharp(inputPath)
          .webp({ quality: 72, effort: 6 })
          .toFile(outputPath);

        const inputSizeMb = (fs.statSync(inputPath).size / 1048576).toFixed(2);
        const outputSizeMb = (fs.statSync(outputPath).size / 1048576).toFixed(2);

        converted += 1;
        console.log(`+ ${path.relative(process.cwd(), inputPath)} -> ${path.relative(process.cwd(), outputPath)} (${inputSizeMb}MB -> ${outputSizeMb}MB)`);
      } catch (error) {
        failed += 1;
        console.log(`x ${path.relative(process.cwd(), inputPath)} -> ${error.message}`);
      }
    }
  }

  console.log('');
  console.log(`Summary: converted=${converted}, skipped=${skipped}, failed=${failed}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
