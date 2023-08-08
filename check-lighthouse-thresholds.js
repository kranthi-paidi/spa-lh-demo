const fs = require('fs');

const report = JSON.parse(fs.readFileSync('./lighthouse-report/lighthouse.report.json', 'utf8'));
const scores = {
  performance: report.categories.performance.score,
  accessibility: report.categories.accessibility.score,
  seo: report.categories.seo.score,
  pwa: report.categories.pwa.score,
  //... other metrics
};

const thresholds = {
  performance: 0.98,  // 90%
  accessibility: 0.98,
  seo: 0.98,
  pwa: 0.70,
  //... other metrics
};

for (const [metric, score] of Object.entries(scores)) {
  if (score < thresholds[metric]) {
    console.error(`Lighthouse ${metric} score of ${score * 100}% is below threshold of ${thresholds[metric] * 100}%`);
    process.exit(1);
  }
}
