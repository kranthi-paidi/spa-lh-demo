const fs = require('fs');

const report = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));
const scores = {
  performance: report.categories.performance.score,
  accessibility: report.categories.accessibility.score,
  seo: report.categories.seo.score,
  //... other metrics
};

const thresholds = {
  performance: 0.5,  // 90%
  accessibility: 0.5,
  seo: 0.5,
  //... other metrics
};

for (const [metric, score] of Object.entries(scores)) {
  if (score < thresholds[metric]) {
    console.error(`Lighthouse ${metric} score of ${score * 100}% is below threshold of ${thresholds[metric] * 100}%`);
    process.exit(1);
  }
}
