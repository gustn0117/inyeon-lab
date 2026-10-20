// Run after `npm run build`. Uses an isolated in-memory backend; never touches live applications.
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const sharp = require('sharp');
const compiled = ts.transpileModule(await readFile(new URL('../src/lib/coaching.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const coaching = { exports: {} };
vm.runInNewContext(compiled, { exports: coaching.exports, module: coaching });
const { DEFAULT_PROGRAMS, calculateDiagnosis } = coaching.exports;
assert.equal(calculateDiagnosis(Array(10).fill(0)).comfortable, true);
assert.equal(calculateDiagnosis([0, 2, 2, 0, 0, 0, 0, 0, 2, 0]).programId, 'conversation');
assert.equal(calculateDiagnosis([0, 0, 0, 2, 0, 0, 2, 0, 0, 0]).programId, 'intensive');
assert.equal(calculateDiagnosis([0, 0, 0, 0, 2, 0, 0, 2, 0, 2]).programId, 'premium');
assert.throws(() => calculateDiagnosis([1, 2]));
assert.throws(() => calculateDiagnosis(Array(10).fill(3)));
assert.throws(() => calculateDiagnosis(Array(10).fill(NaN)));
assert.throws(() => calculateDiagnosis(Array(10)));
console.log('PASS: diagnosis scenarios and invalid answers');

const objects = new Map();
let programs = null;
let bucket = null;
let sequence = 0;
const password = '8642';
const apiKey = 'isolated-qa-service-key';
const mock = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://mock');
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks);
  const json = (status, value) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(value)); };
  if (req.headers.authorization !== `Bearer ${apiKey}`) return json(401, { error: 'not authorized' });
  if (url.pathname === '/rest/v1/admin_settings') {
    if (req.method === 'POST') { programs = JSON.parse(JSON.parse(body.toString()).value); return json(201, {}); }
    return json(200, url.searchParams.get('key') === 'eq.admin_pw' ? [{ value: password }] : programs ? [{ value: JSON.stringify(programs) }] : []);
  }
  if (url.pathname.startsWith('/rest/v1/')) return json(200, []);
  if (url.pathname === '/storage/v1/bucket' && req.method === 'POST') { bucket = JSON.parse(body.toString()); return json(200, bucket); }
  if (url.pathname.startsWith('/storage/v1/bucket/')) return json(bucket ? 200 : 404, bucket ?? { error: 'not found' });
  const bucketPrefix = '/storage/v1/object/inyeon-coaching-private';
  if (url.pathname.startsWith('/storage/v1/object/list/')) {
    const query = JSON.parse(body.toString());
    const items = [...objects.entries()].filter(([key]) => key.startsWith(`${query.prefix}/`)).sort((a, b) => b[1].seq - a[1].seq).slice(query.offset, query.offset + query.limit).map(([key]) => ({ name: key.split('/').at(-1) }));
    return json(200, items);
  }
  if (url.pathname === bucketPrefix && req.method === 'DELETE') { for (const key of JSON.parse(body.toString()).prefixes) objects.delete(key); return json(200, {}); }
  if (url.pathname.startsWith(bucketPrefix + '/')) {
    const key = url.pathname.slice(bucketPrefix.length + 1);
    if (req.method === 'POST') {
      if (objects.has(key) && req.headers['x-upsert'] !== 'true') return json(409, { error: 'already exists' });
      objects.set(key, { body, type: req.headers['content-type'], seq: objects.get(key)?.seq ?? ++sequence });
      return json(200, { Key: key });
    }
    const object = objects.get(key);
    if (!object) return json(404, { error: 'not found' });
    res.writeHead(200, { 'content-type': object.type }); res.end(object.body); return;
  }
  json(404, { error: 'not found' });
});
mock.listen(0, '127.0.0.1');
await once(mock, 'listening');
const backendUrl = `http://127.0.0.1:${mock.address().port}`;
const free = http.createServer(); free.listen(0, '127.0.0.1'); await once(free, 'listening'); const port = free.address().port; await new Promise(resolve => free.close(resolve));
const base = `http://127.0.0.1:${port}`;
let output = '';
const app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], { cwd: new URL('..', import.meta.url), env: { ...process.env, SUPABASE_URL: backendUrl, SUPABASE_SERVICE_ROLE_KEY: apiKey, ADMIN_PASSWORD: '' }, stdio: ['ignore', 'pipe', 'pipe'] });
app.stdout.on('data', data => { output += data.toString(); });
app.stderr.on('data', data => { output += data.toString(); });
let ip = 0;
const auth = { 'x-admin-password': password };
const post = async (overrides = {}, file = null, headers = {}) => {
  const fields = { requestId: randomUUID(), kind: 'consultation', name: 'QA 테스트', phone: '01012345678', concern: '소개팅에서 대화를 이어가는 방법을 알고 싶어요.', privacyConsent: 'true', adultConsent: 'true', ...overrides };
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  if (file) form.set('photo', new Blob([file.buffer], { type: file.type }), file.name);
  const response = await fetch(base + '/api/coaching/applications', { method: 'POST', body: form, headers: { 'x-forwarded-for': `192.0.2.${++ip}`, ...headers } });
  return { status: response.status, data: await response.json(), id: fields.requestId };
};
const call = async (path, method = 'GET', data, useAuth = true) => {
  const res = await fetch(base + path, { method, headers: { ...(useAuth ? auth : {}), ...(data ? { 'Content-Type': 'application/json' } : {}) }, ...(data ? { body: JSON.stringify(data) } : {}) });
  return { status: res.status, data: await res.json() };
};

let browser = null;
try {
  for (let i = 0; i < 80; i++) {
    try { if ((await fetch(base + '/api/coaching/programs')).ok) break; } catch {}
    if (app.exitCode !== null) throw new Error('Next server exited: ' + output);
    if (i === 79) throw new Error('Next server did not become ready: ' + output);
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  for (const path of ['/', '/programs', ...DEFAULT_PROGRAMS.map(p => `/programs/${p.id}`), '/diagnosis', '/apply', '/checkout', '/privacy', '/terms', '/refund', '/sitemap.xml']) {
    const res = await fetch(base + path); assert.equal(res.status, 200, path);
  }
  for (const [path, destination] of [['/men', '/programs'], ['/women', '/programs'], ['/pricing', '/programs'], ['/ideal-match', '/diagnosis'], ['/contact', '/apply']]) {
    const res = await fetch(base + path, { redirect: 'manual' }); assert.equal(res.status, 308); const redirect = res.headers.get('location'); if (redirect) assert.equal(redirect, destination); else { const redirectBody = await res.text(); assert.ok(redirectBody.includes(destination), `Redirect destination for ${path}: ${JSON.stringify([...res.headers])} ${redirectBody.slice(0,800)}`); }
  }
  assert.equal((await fetch(base + '/programs/nonexistent')).status, 404);
  console.log('PASS: all pages, program details, metadata routes and legacy redirects');

  assert.equal((await call('/api/coaching/applications', 'GET', null, false)).status, 401);
  assert.equal((await call('/api/coaching/programs', 'PUT', { programs: DEFAULT_PROGRAMS }, false)).status, 401);
  assert.equal((await post({ name: '' }, null, { origin: base })).status, 400);
  assert.equal((await post({ phone: '1234' })).status, 400);
  assert.equal((await post({ privacyConsent: '' })).status, 400);
  assert.equal((await post({ adultConsent: '' })).status, 400);
  assert.equal((await post({ concern: '' })).status, 400);
  assert.equal((await post({ age: '18' })).status, 400);
  assert.equal((await post({ preferredAt: '2020-01-01T12:00' })).status, 400);
  assert.equal((await post({ kind: 'impression' })).status, 400);
  assert.equal((await post({}, null, { origin: 'https://unrelated.example' })).status, 403);
  const paidFields = { kind: 'paid', programId: 'consultation', expectedPrice: '19900', depositor: 'QA 입금자', termsConsent: 'true' };
  assert.equal((await post({ ...paidFields, expectedPrice: '1' })).status, 409);
  assert.equal((await post({ ...paidFields, termsConsent: '' })).status, 400);
  assert.equal((await post({ ...paidFields, depositor: '' })).status, 400);
  assert.equal(objects.size, 0, 'Invalid submissions must never be persisted');
  console.log('PASS: server validation, consent, origin checks and price tampering');

  const photoBytes = await sharp({ create: { width: 8, height: 8, channels: 3, background: '#742d40' } }).jpeg().withMetadata().toBuffer();
  const file = { name: 'qa-photo.jpg', type: 'image/jpeg', buffer: photoBytes };
  assert.equal((await post({ kind: 'impression' }, file)).status, 400);
  assert.equal((await post({ kind: 'impression', photoConsent: 'true' }, { ...file, buffer: Buffer.from('not a real photo') })).status, 400);
  const paid = await post(paidFields, null, { origin: base }); assert.equal(paid.status, 200);
  assert.equal((await post({ ...paidFields, requestId: paid.id })).status, 200);
  const impression = await post({ kind: 'impression', photoConsent: 'true' }, file); assert.equal(impression.status, 200);
  const freeApplication = await post({ requestedProgramId: 'conversation' }); assert.equal(freeApplication.status, 200);
  let applications = (await call('/api/coaching/applications')).data.applications;
  assert.equal(applications.length, 3, 'Repeated submission must be idempotent');
  assert.equal(applications.find(a => a.id === freeApplication.id).requestedProgramName, '카톡·말투 개선 코칭');
  assert.equal(applications.find(a => a.id === paid.id).status, 'received');
  assert.equal(applications.find(a => a.id === paid.id).price, 19900);
  assert.equal(bucket.public, false);
  const privatePhoto = await fetch(base + `/api/coaching/applications?photo=${impression.id}`, { headers: auth });
  assert.equal(privatePhoto.status, 200); assert.equal(privatePhoto.headers.get('cache-control'), 'private, no-store');
  const metadata = await sharp(Buffer.from(await privatePhoto.arrayBuffer())).metadata();
  assert.equal(metadata.format, 'webp'); assert.equal(metadata.exif, undefined);
  assert.equal((await fetch(base + `/api/coaching/applications?photo=${impression.id}`)).status, 401);
  assert.equal((await call('/api/coaching/applications', 'PATCH', { id: freeApplication.id, status: 'paid' })).status, 400);
  assert.equal((await call('/api/coaching/applications', 'PATCH', { id: paid.id, status: 'paid' })).status, 200);
  console.log('PASS: private photo storage, EXIF removal, idempotency, recommendation and manual payment status');

  const modified = JSON.parse(JSON.stringify(DEFAULT_PROGRAMS)); modified[0].price = 22900;
  assert.equal((await call('/api/coaching/programs', 'PUT', { programs: [] })).status, 400);
  assert.equal((await call('/api/coaching/programs', 'PUT', { programs: modified })).status, 200);
  assert.equal((await call('/api/coaching/programs', 'GET', null, false)).data.programs[0].price, 22900);
  assert.equal((await post(paidFields)).status, 409, 'Stale checkout price must require reconfirmation');
  applications = (await call('/api/coaching/applications')).data.applications;
  assert.equal(applications.find(a => a.id === paid.id).price, 19900, 'Historical price is preserved');
  assert.match(await (await fetch(base + '/programs/consultation')).text(), /22,900/);
  console.log('PASS: admin price updates propagate and historical application prices remain intact');

  programs = null; // Browser QA displays the supplied production prices, not the admin edit fixture.
  if (process.env.COACHING_PLAYWRIGHT_MODULE) {
    const { chromium } = await import(pathToFileURL(process.env.COACHING_PLAYWRIGHT_MODULE).href);
    browser = await chromium.launch({ headless: true, ...(process.env.COACHING_BROWSER_EXECUTABLE ? { executablePath: process.env.COACHING_BROWSER_EXECUTABLE } : {}) });
    const errors = [];
    const context = await browser.newContext();
    await context.route(/facebook\.com|facebook\.net/, route => route.abort());
    const page = await context.newPage(); page.on('pageerror', error => errors.push(error.message));
    const artifactDir = process.env.COACHING_QA_ARTIFACTS ?? '/tmp/inyeon-coaching-qa'; await mkdir(artifactDir, { recursive: true });
    for (const width of (process.env.COACHING_QA_FAST ? [] : [1440, 390, 320])) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['/', '/programs', '/apply', '/checkout?program=conversation', '/diagnosis', '/privacy']) {
        await page.goto(base + path, { waitUntil: 'networkidle' });
        const overflow = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, elements: [...document.querySelectorAll('main *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).slice(0,8).map(el => ({ tag: el.tagName, class: el.className, width: el.getBoundingClientRect().width })) })); assert.ok(overflow.width <= width, `Overflow at ${width}px on ${path}: ${JSON.stringify(overflow)}`);
        if (path === '/' && width !== 320) await page.screenshot({ path: `${artifactDir}/home-${width}.png`, fullPage: true });
        if (width === 390 && path.startsWith('/checkout')) await page.screenshot({ path: `${artifactDir}/checkout-mobile.png`, fullPage: true });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + '/');
    await page.getByRole('button', { name: '첫인상과 스타일을 바꾸고 싶어요' }).click();
    assert.match(await page.locator('#recommendation-result').textContent(), /무료 첫인상 진단/);
    await page.goto(base + '/programs#faq');
    await page.getByText('상담은 어떻게 진행되나요?', { exact: true }).click();
    assert.equal(await page.locator('details').first().getAttribute('open'), '');
    await page.goto(base + '/');
    await page.locator('#applicant-name').fill('메인 무료 상담 QA'); await page.locator('#applicant-phone').fill('010-1234-5678'); await page.locator('#concern').fill('소개팅 후 대화를 어떻게 이어갈지 궁금해요.');
    await page.locator('[name=adultConsent]').check(); await page.locator('[name=privacyConsent]').check();
    await page.getByRole('button', { name: '무료 상담 신청하기', exact: true }).click();
    await page.getByRole('heading', { name: /신청이 접수되었습니다/ }).waitFor();
    await page.goto(base + '/diagnosis');
    for (let i = 0; i < 10; i++) { await page.getByRole('radio').nth([0, 2, 2, 0, 0, 0, 0, 0, 2, 0][i]).check(); await page.getByRole('button', { name: i === 9 ? '내 결과 확인하기' : '다음 질문' }).click(); }
    await page.getByRole('heading', { name: '대화의 실마리를 찾는 탐색형' }).waitFor();
    await page.screenshot({ path: `${artifactDir}/diagnosis-mobile.png`, fullPage: true });
    await page.goto(base + '/apply?kind=impression');
    await page.locator('#applicant-name').fill('브라우저 QA'); await page.locator('#applicant-phone').fill('010-1234-5678'); await page.locator('#concern').fill('헤어스타일과 소개팅 복장이 궁금해요.');
    await page.locator('#photo').setInputFiles({ name: file.name, mimeType: file.type, buffer: file.buffer });
    await page.locator('[name=photoConsent]').check(); await page.locator('[name=adultConsent]').check(); await page.locator('[name=privacyConsent]').check();
    const invalidFields = await page.locator('form').evaluate(form => [...form.querySelectorAll(':invalid')].map(el => ({ tag: el.tagName, id: el.id, name: el.name, message: el.validationMessage })));
    assert.deepEqual(invalidFields, [], 'Photo form browser validation');
    const freeResponsePromise = page.waitForResponse(response => response.url().endsWith('/api/coaching/applications') && response.request().method() === 'POST', { timeout: 10000 });
    await page.getByRole('button', { name: '무료 첫인상 진단 신청하기' }).click();
    const freeResponse = await freeResponsePromise; const freeResult = await freeResponse.json();
    assert.equal(freeResponse.status(), 200, JSON.stringify(freeResult));
    assert.equal(freeResult.ok, true);
    await page.getByRole('heading', { name: /신청이 접수되었습니다/ }).waitFor();
    await page.goto(base + '/checkout?program=conversation');
    await page.locator('#applicant-name').fill('유료 브라우저 QA'); await page.locator('#applicant-phone').fill('010-1234-5678'); await page.locator('#depositor').fill('입금자 QA');
    await page.locator('[name=adultConsent]').check(); await page.locator('[name=privacyConsent]').check(); await page.locator('[name=termsConsent]').check();
    await page.getByRole('button', { name: '프로그램 신청서 제출하기' }).click();
    await page.getByRole('heading', { name: /신청이 접수되었습니다/ }).waitFor();
    assert.match(await page.getByRole('status').textContent(), /29,000원/);
    const queued = await page.evaluate(() => Array.from(window.fbq?.queue || []).map(args => Array.from(args)));
    assert.equal(queued.some(args => args[1] === 'Purchase'), false);
    assert.equal(JSON.stringify(queued).includes('01012345678'), false);
    const adminPage = await context.newPage(); adminPage.on('pageerror', error => errors.push(error.message));
    await adminPage.goto(base + '/admin'); await adminPage.getByPlaceholder('비밀번호', { exact: true }).fill(password); await adminPage.getByRole('button', { name: '로그인', exact: true }).click();
    await adminPage.getByRole('heading', { name: '무료 상담 · 첫인상 진단 · 유료 코칭 신청' }).waitFor();
    assert.equal(await adminPage.locator('#inyeon-meta-pixel').count(), 0);
    await adminPage.getByRole('button', { name: '프로그램·가격', exact: true }).click();
    await adminPage.getByRole('button', { name: '프로그램 정보 저장', exact: true }).waitFor();
    assert.deepEqual(errors, []);
    await browser.close();
    console.log(`PASS: responsive browser flows at 320/390/1440px, quiz, free photo form, paid checkout, admin and pixel isolation. Screenshots: ${artifactDir}`);
  }
  for (const [key] of [...objects]) {
    if (!key.startsWith('applications/')) continue;
    const id = key.split('/').at(-1).replace('.json', '');
    assert.equal((await call(`/api/coaching/applications?id=${id}`, 'DELETE')).status, 200);
  }
  assert.equal(objects.size, 0, 'Deletion removes both application records and photos');
  console.log('PASS: application and photo deletion; no live data was read or changed');
  console.log('All coaching checks passed.');
} catch (error) {
  console.error(error); console.error('Server diagnostic:', output.slice(-4500)); process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  app.kill('SIGTERM');
  await new Promise(resolve => mock.close(resolve));
}
