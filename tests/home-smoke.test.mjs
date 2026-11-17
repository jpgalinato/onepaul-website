import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync('index.html','utf8');
const css = readFileSync('home-redesign.css','utf8');
const js = readFileSync('home-redesign.js','utf8');
test('Home page has only new styles and script', () => {
 assert.match(html, /home-redesign\.css\?v=1/);
 assert.match(html, /home-redesign\.js\?v=1/);
 assert.doesNotMatch(html, /navigation\.css|onepaul-critical-nav/);
});
test('navigation is native closed by default and contains requested pages', () => {
 assert.equal((html.match(/<details class="nav-group/g)||[]).length, 2);
 assert.match(css, /\.nav-group:not\(\[open\]\)>\.nav-panel\{display:none!important\}/);
 for(const url of ['/about/team/','/about/solutions/','/about/industries/technology-startups/','/about/industries/finance-accounting/','/about/industries/health-insurance/','/resources/articles/','/resources/case-studies/','/resources/team-builder/','/careers/'])assert.ok(html.includes('href="'+url+'"'),url);
});
test('Home page key sections and on-page anchors exist', () => {
 for(const id of ['main','why','industries','disciplines','how','pricing','start'])assert.ok(html.includes('id="'+id+'"'),id);
 const hrefs=[...html.matchAll(/href="#([^"]+)"/g)].map(x=>x[1]);
 for(const id of hrefs)assert.ok(html.includes('id="'+id+'"'),id);
});
test('photo accessibility and disclaimers', () => {
 assert.ok((html.match(/<img /g)||[]).length>=6);
 assert.ok((html.match(/ alt="/g)||[]).length>=6);
 assert.match(html, /Illustrative stock photography/);
});
test('contact form requires consent and gated backend', () => {
 assert.match(html, /id="enquiry-form"/);
 assert.match(html, /name="consent" type="checkbox" value="yes" required/);
 assert.match(js, /\/api\/form-config/);
 assert.match(js, /submit\.disabled = true/);
 assert.ok(existsSync('functions/api/enquiry.js'));
 assert.ok(existsSync('functions/api/form-config.js'));
});
test('responsive styles exist', () => {
 assert.match(css, /max-width:820px/);assert.match(css,/max-width:620px/);
});
