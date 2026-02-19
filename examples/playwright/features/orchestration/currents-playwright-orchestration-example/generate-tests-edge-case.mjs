import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { nanoid } from 'nanoid';
import { join } from 'path';
const specsDir = './edge-case-tests';
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

// 40 long specs: 110-120s
for (let i = 1; i <= 40; i++) {
  const waitTime = getRandomWaitTime(110 * 1000, 120 * 1000);
  results.push({
    name: `a_${getRandomSpecName()}.spec.ts`,
    waitTime,
  });  
}

// 40 short spec: 10-30s
for (let i = 1; i <= 40; i++) {
  const waitTime = getRandomWaitTime(10 * 1000, 30 * 1000);
   results.push({
    name: `b_${getRandomSpecName()}.spec.ts`,
    waitTime,
  });
}

for (const { name, waitTime } of results) {
  const filePath = join(specsDir, name);
  writeFileSync(filePath, getContent(name, waitTime), 'utf-8');
}


console.log(`Generated ${results.length} spec files in ./tests`);