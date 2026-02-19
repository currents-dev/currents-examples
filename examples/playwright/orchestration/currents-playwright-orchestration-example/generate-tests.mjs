import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { nanoid } from 'nanoid';
import { join } from 'path';
const specsDir = './tests';
if (!existsSync(specsDir)) {
  mkdirSync(specsDir);
}

const getContent = (i, waitTime) => `
import { test } from '@playwright/test';

test('spec ${i}', async () => {
  await new Promise((resolve) => setTimeout(resolve, ${waitTime}));
});
  `.trim();

const getRandomSpecName = () =>  nanoid(10);

function getRandomWaitTime(minMs = 30 * 1000, maxMs = 120 * 1000) {
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
}

const results = [];

// 20 long specs: 1.5-2m
for (let i = 1; i <= 20; i++) {
  const waitTime = getRandomWaitTime(90 * 1000, 120 * 1000);
  results.push({
    name: `${getRandomSpecName()}.spec.ts`,
    waitTime,
  });  
}
// 30 mid-length specs: 45-90s
for (let i = 1; i <= 30; i++) {
  const waitTime = getRandomWaitTime(45 * 1000, 90 * 1000);
   results.push({
    name: `${getRandomSpecName()}.spec.ts`,
    waitTime,
  });
}

// 50 short specs: 10-45s
for (let i = 1; i <= 50; i++) {
  const waitTime = getRandomWaitTime(10 * 1000, 45 * 1000);
   results.push({
    name: `${getRandomSpecName()}.spec.ts`,
    waitTime,
  });
}

for (const { name, waitTime } of results) {
  const filePath = join(specsDir, name);
  writeFileSync(filePath, getContent(name, waitTime), 'utf-8');
}


console.log(`Generated ${results.length} spec files in ./tests`);