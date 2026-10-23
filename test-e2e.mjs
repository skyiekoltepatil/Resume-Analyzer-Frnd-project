import assert from 'assert';

async function runTests() {
  console.log('🚀 Running Pathwise E2E API Verification Suite...\n');

  // Test 1: AI Test Diagnostic
  console.log('1. Testing /api/ai/test...');
  const res1 = await fetch('http://localhost:3000/api/ai/test');
  const data1 = await res1.json();
  assert.strictEqual(res1.status, 200, 'AI test endpoint should return 200');
  assert.strictEqual(data1.success, true, 'AI test should succeed');
  console.log('   ✓ AI Diagnostic operational. Model:', data1.diagnostic.model, 'Connected:', data1.diagnostic.connected);

  // Test 2: Verified Jobs Feed
  console.log('2. Testing /api/jobs...');
  const res2 = await fetch('http://localhost:3000/api/jobs');
  const data2 = await res2.json();
  assert.strictEqual(res2.status, 200, 'Jobs endpoint should return 200');
  assert.strictEqual(data2.success, true, 'Jobs endpoint should succeed');
  assert(data2.jobs.length > 0, 'Should return job listings');
  console.log(`   ✓ Loaded ${data2.jobs.length} jobs. Live feed active: ${data2.isLiveFeed}.`);

  // Test 3: Resume Parser
  console.log('3. Testing /api/resume/parse with pasted text...');
  const formData = new FormData();
  formData.append('manualText', 'Sarah Connor. Principal AI Systems Engineer. 8 years experience in Python, PyTorch, C++, CUDA, Docker, Kubernetes. Built distributed training clusters supporting 10B parameter models, reducing training time by 35%. sarah@example.com');
  const res3 = await fetch('http://localhost:3000/api/resume/parse', {
    method: 'POST',
    body: formData,
  });
  const data3 = await res3.json();
  assert.strictEqual(res3.status, 200, 'Parser should return 200');
  assert.strictEqual(data3.success, true, 'Parser should succeed');
  assert(data3.profile.skills.includes('Python'), 'Should detect Python');
  assert(data3.profile.skills.includes('PyTorch'), 'Should detect PyTorch');
  console.log(`   ✓ Parsed resume profile. Detected ${data3.profile.skills.length} skills: ${data3.profile.skills.join(', ')}`);

  // Test 4: AI Resume Analysis
  console.log('4. Testing /api/ai/analyze-resume...');
  const res4 = await fetch('http://localhost:3000/api/ai/analyze-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profile: data3.profile,
      targetRole: 'Principal Machine Learning Infrastructure Engineer',
    }),
  });
  const data4 = await res4.json();
  assert.strictEqual(res4.status, 200, 'Analyze endpoint should return 200');
  assert.strictEqual(data4.success, true, 'Analyze endpoint should succeed');
  assert(typeof data4.report.overallScore === 'number', 'Overall score must be numeric');
  assert(data4.report.bulletImprovements.length > 0, 'Must have Google XYZ improvements');
  assert(data4.report.roadmap.length === 3, 'Must have 3-tier roadmap');
  console.log(`   ✓ Analysis complete. Overall score: ${data4.report.overallScore}%, ATS: ${data4.report.atsScore}%, Model: ${data4.report.modelUsed}`);
  console.log(`     Google XYZ Rewrites: ${data4.report.bulletImprovements.length}`);
  console.log(`     Roadmap steps: ${data4.report.roadmap.map(r => r.timeframe).join(', ')}`);

  // Test 5: Job Match Analysis
  console.log('5. Testing /api/ai/match-job...');
  const res5 = await fetch('http://localhost:3000/api/ai/match-job', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      resumeText: data3.profile.rawText,
      jobTitle: 'Principal ML Engineer',
      jobDescription: 'Requirements: Python, PyTorch, C++, CUDA, Distributed Systems, Docker, and Kubernetes.',
      company: 'Anthropic',
    }),
  });
  const data5 = await res5.json();
  assert.strictEqual(res5.status, 200, 'Match endpoint should return 200');
  assert.strictEqual(data5.success, true, 'Match endpoint should succeed');
  assert(typeof data5.match.overallMatchScore === 'number', 'Match score must be numeric');
  console.log(`   ✓ Job match complete. Fit Score: ${data5.match.overallMatchScore}%, Matched requirements: ${data5.match.matchedRequirements.length}`);

  console.log('\n✨ All 5 Core API Modules Passed Verification with 100% Success!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
