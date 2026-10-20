// Real-browser regression checks for the source's scroll and motion behavior.
// Read only: application submissions are covered by verify-coaching.mjs's fake backend.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const modulePath = process.env.COACHING_PLAYWRIGHT_MODULE;
if (!modulePath) throw new Error('Set COACHING_PLAYWRIGHT_MODULE to an installed Playwright module.');
const { chromium } = await import(pathToFileURL(modulePath).href);
const browser = await chromium.launch({ headless: true, ...(process.env.COACHING_BROWSER_EXECUTABLE ? { executablePath: process.env.COACHING_BROWSER_EXECUTABLE } : {}) });
const base = process.env.COACHING_DESIGN_URL ?? 'http://127.0.0.1:3000';
const dir = process.env.COACHING_DESIGN_ARTIFACTS ?? '/tmp/inyeon-fidelity-final';
await mkdir(dir, { recursive: true });
const errors = [];
const order = ['hero', 'brand', 'marquee', 'programs', 'recommend', 'services', 'value', 'consultation'];
const results = {};
const scroll = async (page, top) => { await page.evaluate(y => scrollTo({top:y,behavior:'instant'}), top); await page.waitForTimeout(80); };
const visibleTab = (page, name) => page.getByRole('tab', { name, exact: true }).filter({visible:true});
const matrix = async (page, axis) => page.locator(`[data-marquee-track=${axis}]`).evaluateAll(els => els.map(el => { const m = new DOMMatrixReadOnly(getComputedStyle(el).transform); return {x:m.m41,y:m.m42}; }));
try {
 for (const [name, width, height] of [['desktop',1440,1000], ['mobile',390,844]]) {
  const context = await browser.newContext({ viewport:{width,height}, deviceScaleFactor:1, isMobile:name==='mobile', hasTouch:name==='mobile', recordVideo:{dir:`${dir}/videos`,size:{width,height}} });
  await context.route(/facebook\.com|facebook\.net/, route=>route.abort());
  const page = await context.newPage(); page.on('pageerror', e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'networkidle'}); await page.waitForTimeout(3000);
  await page.getByRole('button',{name:'1번 코칭 소개 보기',exact:true}).click(); await page.waitForTimeout(900);
  await page.screenshot({path:`${dir}/${name}-hero.png`});
  const sections = await page.locator('[data-home-section]').evaluateAll(els=>els.map(el=>({id:el.dataset.homeSection,top:el.getBoundingClientRect().top+scrollY,height:el.getBoundingClientRect().height})));
  assert.deepEqual(sections.map(x=>x.id),order);
  const expected = name==='desktop'?[Math.max(height,720),556,594,1008.17,1314.58,202,878.38]:[Math.max(height,640),391.84,842,760.27,1093.09,186,784];
  // The compact brand panel stays in normal flow with fixed gaps. The next four sections keep their approved geometry; the human-coaching copy extends the value section.
  sections.slice(0,6).forEach((sec,i)=>assert.ok(Math.abs(sec.height-expected[i])<5,`${name} ${sec.id} ${sec.height} vs source ${expected[i]}`));
  results[name] = { sections };
  await page.getByRole('button',{name:'다음 코칭 소개',exact:true}).click(); await page.waitForTimeout(900);
  assert.equal(await page.getByRole('button',{name:'2번 코칭 소개 보기',exact:true}).getAttribute('aria-pressed'),'true');
  const imageState = await page.locator('[data-hero-image="1"]').evaluate(el=>({opacity:getComputedStyle(el).opacity,clip:getComputedStyle(el).clipPath,background:getComputedStyle(el).backgroundImage}));
  assert.equal(imageState.opacity,'1'); assert.match(imageState.background,/process-01-v2/); assert.match(imageState.clip,/0px|0%/);
  await page.screenshot({path:`${dir}/${name}-hero-next.png`});
  if(name==='desktop') { await page.waitForTimeout(4400); assert.equal(await page.getByRole('button',{name:'3번 코칭 소개 보기',exact:true}).getAttribute('aria-pressed'),'true'); }
  if(name==='mobile') {
   for(const i of [1,2,3,4,5]) {await page.getByRole('button',{name:`${i}번 코칭 소개 보기`,exact:true}).click();await page.waitForTimeout(20);const heroHeight=await page.locator('[data-home-section=hero]').evaluate(el=>el.getBoundingClientRect().height);assert.ok(Math.abs(heroHeight-sections[0].height)<2,'Mobile slide height stays stable');}
  }
  const brandPanel=await page.locator('[class*=brandPinned]').evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,header:parseFloat(getComputedStyle(el).getPropertyValue('--brand-header-height'))}));
  const brandStart=height-80,brandEnd=brandPanel.header+24;const brandGaps=[];
  for(const [progress,step] of [[0,0],[.4,1],[.7,2],[.9,3],[1.2,3],[.4,1],[0,0]]) {
   await scroll(page,brandPanel.top-brandStart+(brandStart-brandEnd)*progress); await page.waitForTimeout(120);
   assert.equal(await page.locator('[data-brand-step]').getAttribute('data-brand-step'),String(step));
   const gap=await page.evaluate(()=>{const hero=document.querySelector('[data-home-section=hero]').getBoundingClientRect(),panel=document.querySelector('[class*=brandPinned]').getBoundingClientRect(),next=document.querySelector('[data-home-section=marquee]').getBoundingClientRect();return {above:panel.top-hero.bottom,below:next.top-panel.bottom};});
   assert.ok(gap.above>0&&gap.below>0,'Brand panel has clear gaps on both sides');
   if(brandGaps.length)assert.ok(Math.abs(gap.above-brandGaps[0].above)<1&&Math.abs(gap.below-brandGaps[0].below)<1,'Brand section gaps remain stable during forward and reverse scroll');
   brandGaps.push(gap);
   await page.screenshot({path:`${dir}/${name}-brand-${progress}.png`});
  }
  results[name].brandGaps=brandGaps;
  await scroll(page,sections[2].top-(name==='desktop'?124:94));
  await page.getByRole('button',{name:'상담 안내 접기',exact:true}).click();
  const axis=name==='desktop'?'horizontal':'vertical';const before=await matrix(page,axis);await page.waitForTimeout(350);const after=await matrix(page,axis);
  const key=axis==='horizontal'?'x':'y';assert.ok((after[0][key]-before[0][key])*(after[1][key]-before[1][key])<0,'Opposite marquee directions');
  await page.waitForTimeout(500);await page.screenshot({path:`${dir}/${name}-marquee.png`});
  await scroll(page,sections[3].top-(name==='desktop'?124:94));await visibleTab(page,'전체 프로그램').click();await scroll(page,sections[3].top-(name==='desktop'?124:94));await page.waitForTimeout(2700);
  assert.equal(await page.locator('#home-program-slides article').count(),5);
  await page.screenshot({path:`${dir}/${name}-programs.png`});
  const left=await page.locator('#home-program-slides').evaluate(el=>el.scrollLeft);
  await page.getByRole('button',{name:'다음 프로그램',exact:true}).click();await page.waitForTimeout(850);
  assert.ok(await page.locator('#home-program-slides').evaluate(el=>el.scrollLeft)>left,'Program slide advances');
  if(name==='desktop') {
   const dragBefore=await page.locator('#home-program-slides').evaluate(el=>el.scrollLeft);
   const box=await page.locator('#home-program-slides').boundingBox();
   await page.mouse.move(box.x+450,box.y+180);await page.mouse.down();await page.mouse.move(box.x+240,box.y+180,{steps:16});await page.mouse.up();await page.waitForTimeout(500);
   assert.ok(await page.locator('#home-program-slides').evaluate(el=>el.scrollLeft)>dragBefore,'Desktop program drag scrolls');
   assert.equal(new URL(page.url()).pathname,'/');
  }
  await visibleTab(page,'집중 연애코칭').click();await page.waitForTimeout(800);assert.equal(await page.locator('#home-program-slides article').count(),2);
  await visibleTab(page,'무료로 시작하기').click();await page.waitForTimeout(800);assert.equal(await page.locator('#home-program-slides article').count(),3);
  assert.match(await page.locator('#home-program-slides').textContent(),/무료 첫인상 진단/);
  await scroll(page,sections[3].top-(name==='desktop'?124:94));await page.screenshot({path:`${dir}/${name}-programs-free.png`});
  await scroll(page,sections[4].top+360);await page.waitForTimeout(800);
  if(name==='desktop') {
   await page.getByRole('button',{name:'카톡과 이성 대화가 어려워요',exact:true}).hover();await page.waitForTimeout(1100);
   assert.match(await page.locator('#recommendation-result').textContent(),/카톡·말투 개선 코칭/);
  }
  const ring=await page.locator('[class*=orbitRing]').evaluate(el=>getComputedStyle(el).transform);
  await page.getByRole('button',{name:'첫인상과 스타일을 바꾸고 싶어요',exact:true}).click();await page.waitForTimeout(1100);
  assert.match(await page.locator('#recommendation-result').textContent(),/무료 첫인상 진단/);
  assert.notEqual(await page.locator('[class*=orbitRing]').evaluate(el=>getComputedStyle(el).transform),ring);
  assert.equal(await page.locator('#recommendation-result a').getAttribute('href'),'/apply?kind=impression');
  await page.screenshot({path:`${dir}/${name}-orbit.png`});
  await scroll(page,sections[6].top-(name==='desktop'?124:94));await page.waitForTimeout(2700);assert.equal(await page.locator('[data-coaching-count]').textContent(),'100');await page.screenshot({path:`${dir}/${name}-value.png`});
  await scroll(page,sections[7].top-(name==='desktop'?124:94));await page.waitForTimeout(1500);await page.screenshot({path:`${dir}/${name}-consultation.png`});
  assert.equal(await page.locator('#applicant-name').getAttribute('required'),'');assert.equal(await page.locator('#applicant-phone').getAttribute('required'),'');assert.ok(await page.locator('#photo').isVisible());
  await page.getByRole('button',{name:'무료 첫인상 진단',exact:true}).click();assert.equal(await page.locator('#photo').getAttribute('required'),'');
  await page.getByRole('button',{name:'전체 메뉴 열기',exact:true}).click();await page.waitForTimeout(550);await page.screenshot({path:`${dir}/${name}-menu.png`});
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'전체 메뉴 열기',exact:true}).getAttribute('aria-expanded'),'false');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(name==='mobile'){await page.getByRole('button',{name:'빠른 상담 펼치기',exact:true}).click();assert.ok(await page.getByRole('button',{name:'빠른 상담 접기',exact:true}).isVisible());await page.getByRole('button',{name:'빠른 상담 접기',exact:true}).click();}
  await context.close();
 }
 const context = await browser.newContext({reducedMotion:'reduce',viewport:{width:320,height:844}});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base,{waitUntil:'networkidle'});
 assert.equal(await page.locator('[class*=introInner]').count(),0);
 const before=await page.getByRole('button',{name:'1번 코칭 소개 보기',exact:true}).getAttribute('aria-pressed');await page.waitForTimeout(4500);assert.equal(before,await page.getByRole('button',{name:'1번 코칭 소개 보기',exact:true}).getAttribute('aria-pressed'));
 for(const width of [320,768,900,1024]) {await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${width}`);}
 await page.screenshot({path:`${dir}/reduced-motion-1024.png`});await context.close();
 assert.deepEqual(errors,[]);await writeFile(`${dir}/measurements.json`,JSON.stringify(results,null,2));console.log(`PASS: section geometry, stable brand gaps and forward/reverse text changes, image slides/autoplay, opposite marquees, program tabs/slides, orbit recommendation, inline form, menu, contact controls, responsive/reduced motion. Evidence: ${dir}`);
} finally { await browser.close(); }
