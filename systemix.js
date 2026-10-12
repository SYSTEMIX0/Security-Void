'use strict';
/**
 * Systemix — ملف واحد يحتوي كل شي (البوت + لوحة التحكم + لوحة المالك + الميزات + الشعار).
 * ملف مُولَّد تلقائياً من المشروع (npm run build). لا تعدّله يدوياً.
 *
 * التشغيل:
 *   1) npm install discord.js dotenv express
 *   2) node systemix.js        (أول مرة ينشئ لك ملف .env، عبّيه وشغّله مرة ثانية)
 */
const ASSETS = {"dashboard.html":"<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n<meta charset=\"UTF-8\"><meta name=\"robots\" content=\"noindex,nofollow\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<title>Systemix | لوحة التحكم</title>\n<link rel=\"icon\" href=\"/logo.webp\">\n<style>\n:root{--bg:#07040d;--card:#120a1f;--card2:#0c0716;--line:#2a1646;--p:#8b2fe8;--p2:#b46bff;--tx:#f1e9ff;--mu:#a592c4;--ok:#2ecc71;--bad:#ff4d6d}\n*{box-sizing:border-box;margin:0;font-family:Tahoma,\"Segoe UI\",sans-serif}\nbody{background:radial-gradient(900px 500px at 85% -10%,#3b0f73aa,transparent),radial-gradient(700px 500px at 0% 110%,#5a14a855,transparent),var(--bg);color:var(--tx);min-height:100vh}\nbutton{cursor:pointer;border:0;border-radius:10px;padding:9px 15px;background:var(--p);color:#fff;font-size:13px}\nbutton:hover{background:var(--p2)}button.g{background:#1e1233;border:1px solid var(--line)}button.d{background:var(--bad)}button.s{padding:6px 10px}\ninput,select,textarea{width:100%;background:var(--card2);border:1px solid var(--line);color:var(--tx);border-radius:10px;padding:9px;font-size:13px}\ntextarea{min-height:80px;resize:vertical}input[type=color]{height:40px;padding:3px}input[type=checkbox]{width:auto}\naside{position:fixed;top:0;right:0;bottom:0;width:250px;background:#0c0716f2;border-left:1px solid var(--line);padding:16px 12px;overflow-y:auto;z-index:5}\n.brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:20px;margin-bottom:12px}.brand img{width:40px;border-radius:50%}\n.srvcard{display:flex;align-items:center;gap:10px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:10px;margin-bottom:8px}\n.srvcard b{display:block;color:var(--p2);font-size:14px}.srvcard a{color:var(--mu);font-size:12px;text-decoration:none}\n.gt{color:var(--mu);font-size:11px;margin:14px 8px 4px;font-weight:700}\n.nv{display:flex;align-items:center;gap:10px;width:100%;text-align:right;background:transparent;color:var(--tx);padding:9px 10px;border-radius:10px;font-size:14px}\n.nv:hover,.nv.on{background:#2a1646}.nv.on{border:1px solid var(--p)}.nv i{font-style:normal;width:22px;text-align:center}.nv span{flex:1}.nv em{font-style:normal;color:#fff;background:var(--ok);border-radius:50%;width:18px;height:18px;font-size:11px;display:grid;place-items:center}\n.out{margin-top:16px;width:100%}\nmain{margin-right:250px;padding:22px;max-width:1150px}\n.top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:6px}.top h2{font-size:22px}\n.pd{color:var(--mu);font-size:13px;margin-bottom:16px}\n.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;margin-bottom:14px}\n.ch{display:flex;align-items:center;justify-content:space-between;gap:10px;border-bottom:1px solid var(--line);padding-bottom:10px;margin-bottom:8px}.ch h3{font-size:16px}\n.mu,small{color:var(--mu);font-size:12px;line-height:1.6}\n.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:14px}.grid .card{margin:0}.n{font-size:26px;font-weight:700;color:var(--p2);margin-top:4px}\n.row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid var(--line)}.row:last-child{border:0}\n.rl b{display:block;font-size:14px;font-weight:600}.rl small{display:block}.rc{display:flex;align-items:center;gap:8px}\n.fld{margin:12px 0}.fld>label{display:block;font-size:13px;color:var(--tx);margin-bottom:4px}.fld>small{display:block;margin-bottom:6px}\n.sw{position:relative;width:46px;height:26px;flex:none;display:inline-block}.sw input{display:none}\n.sw span{position:absolute;inset:0;background:#33224f;border-radius:20px;transition:.2s;cursor:pointer}\n.sw span:after{content:\"\";position:absolute;top:3px;right:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:.2s}\n.sw input:checked+span{background:var(--p)}.sw input:checked+span:after{right:23px}\n.pcard{display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:22px;border-radius:20px;margin-bottom:14px;background:linear-gradient(135deg,#2b0a3d,#12061f);border:1px solid #5a2a8f}\n.pcard.on{background:linear-gradient(135deg,#4a0a1a,#1f0510);border-color:var(--bad)}.pcard .t{flex:1;min-width:200px}\n.ring{width:70px;height:70px;border-radius:50%;display:grid;place-items:center;font-size:32px;background:#1e1233;border:2px solid var(--p);box-shadow:0 0 24px #8b2fe866}\n.pcard.on .ring{border-color:var(--bad);animation:pl 1.4s infinite}@keyframes pl{0%,100%{box-shadow:0 0 18px #ff4d6d66}50%{box-shadow:0 0 50px #ff4d6dcc}}\n.pbtn{padding:14px 26px;font-size:16px;font-weight:700;background:linear-gradient(135deg,#ff2d55,#b0123a)}.pcard.on .pbtn{background:linear-gradient(135deg,#2ecc71,#118a4a)}\n.tag{display:inline-flex;gap:8px;align-items:center;background:#241338;border:1px solid var(--line);padding:5px 10px;border-radius:20px;margin:3px;font-size:13px}.tag b{cursor:pointer;color:var(--bad)}\n.ip{display:flex;gap:8px;margin-top:8px}.wrap{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}\n.item{padding:10px 0;border-bottom:1px solid var(--line);font-size:14px}.item:last-child{border:0}.item small{display:block}\n.pv{background:var(--card2);border-right:4px solid var(--p);border-radius:8px;padding:12px;margin-top:10px;white-space:pre-wrap;font-size:13px}\n.ban{border-radius:14px;padding:12px 16px;margin-bottom:14px;font-size:14px}\n.lgrow{display:grid;grid-template-columns:46px 1fr minmax(120px,200px) auto;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}\n.cnt{color:var(--mu);font-size:12px;margin-inline-start:8px}\n#toast{position:fixed;bottom:20px;left:20px;background:var(--p);padding:12px 18px;border-radius:12px;display:none;z-index:50}\n#modal{position:fixed;inset:0;background:#000a;display:none;place-items:center;z-index:40;padding:16px}#modal .card{max-width:520px;width:100%;margin:0}\n.bar{display:none;position:sticky;top:0;z-index:6;background:#0c0716;border-bottom:1px solid var(--line);padding:8px}\n@media(max-width:860px){aside{position:static;width:auto;border:0;border-bottom:1px solid var(--line)}main{margin:0;padding:12px}.lgrow{grid-template-columns:46px 1fr}}\n</style>\n</head>\n<body>\n<aside>\n  <div class=\"brand\"><img src=\"/logo.webp\" alt=\"\"><span>Systemix</span></div>\n  <div class=\"srvcard\"><img src=\"/logo.webp\" width=\"38\" style=\"border-radius:50%\" alt=\"\"><div><b id=\"gname\">…</b><a href=\"/servers\">تغيير السيرفر ↩</a></div></div>\n  <a id=\"ownLink\" href=\"/owner\" style=\"display:none\"><button class=\"g\" style=\"width:100%;margin-top:6px\">👑 لوحة المالك</button></a>\n  <nav id=\"nav\"></nav>\n  <a href=\"/logout\"><button class=\"g out\">تسجيل الخروج</button></a>\n</aside>\n<main>\n  <div class=\"top\"><h2 id=\"title\"></h2><div id=\"master\" class=\"rc\"></div></div>\n  <div class=\"pd\" id=\"pdesc\"></div>\n  <div id=\"banner\"></div>\n  <div id=\"view\"></div>\n</main>\n<div id=\"toast\"></div>\n<div id=\"modal\"></div>\n\n<script>\n'use strict';\n/* ============ helpers ============ */\nconst $ = (s, r = document) => r.querySelector(s);\nconst $$ = (s, r = document) => [...r.querySelectorAll(s)];\nconst esc = (s) => String(s ?? '').replace(/[&<>\"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;' }[c]));\nconst get = (o, p) => p.split('.').reduce((a, k) => a?.[k], o);\nconst set = (o, p, v) => { const k = p.split('.'), l = k.pop(); k.forEach((x) => (o = o[x] ??= {})); o[l] = v; };\nconst toast = (m) => { const t = $('#toast'); t.textContent = m; t.style.display = 'block'; clearTimeout(toast.t); toast.t = setTimeout(() => (t.style.display = 'none'), 2500); };\nasync function api(path, body, method) {\n  try {\n    const r = await fetch(path, { method: method || (body ? 'POST' : 'GET'), credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });\n    return await r.json();\n  } catch { toast('تعذر الاتصال بالسيرفر'); return null; }\n}\nconst fmtD = (t) => new Date(t).toLocaleString('ar-SA');\nconst ok = (r, m = '✅ تم') => toast(r && r.ok ? m : (r && r.msg) || '❌ فشل');\n\n/* ============ defaults / state ============ */\nconst DEF = {\n  on: true, logCh: '', evCh: '', limit: 3, window: 10, punish: 'ban', altDays: 3, panicScore: 12, raidJoins: 8, raidMin: 5, raidAct: 'kick', maxMentions: 5, autoBackup: 0,\n  spamMsgs: 6, spamSec: 5, muteMin: 60, warnMax: 3, warnAct: 'timeout', capsOn: false, capsPct: 70, blockInvites: true, maxEmojis: 10, altAct: 'alert', allowInv: '', badWords: '', wordAction: 'timeout', badDomains: '',\n  autoPanic: false, dmPunish: false, honeypot: '', autorole: '', botrole: '', ar: [], stats: [], lg: {},\n  sec: { nuke: 1, ban: 1, chan: 1, role: 1, hook: 1, vanity: 1, esc: 1, alt: 1, emoji: 1, gset: 1, integ: 1, bots: 1, raid: 1, honey: 1, trust: 1, restore: 1, spam: 1, words: 1, link: 1, mention: 1, files: 1, emojis: 1 },\n  welcome: { on: true, ch: '', title: '', color: '#2ecc71', msg: 'حياك الله {user} في {server} 👋\\nأنت العضو رقم {count}', dm: false, dmMsg: '' },\n  leave: { on: false, ch: '', msg: '{user} غادر السيرفر 😢' },\n  lvl: { on: true, announce: true, ch: '', msg: '🎉 مبروك {user} وصلت لفل **{level}**', min: 15, max: 25, cd: 60, ignore: [], rewards: [] },\n  tk: { ch: '', cat: '', role: '' }, verify: { ch: '', role: '' },\n  star: { on: false, ch: '', n: 3, emoji: '⭐', self: false }, tv: { on: false, ch: '', cat: '', name: '🔊 {user}', limit: 0 },\n};\nlet S = JSON.parse(JSON.stringify(DEF)), ST = {}, cur = 'home', saveT;\nconst merge = (d, s) => { for (const k in s) d[k] = d[k] && typeof d[k] === 'object' && !Array.isArray(d[k]) && s[k] && typeof s[k] === 'object' ? merge(d[k], s[k]) : s[k]; return d; };\n\nasync function save(msg = '✅ حُفظ وطُبّق على البوت') {\n  const r = await api('/api/config', S, 'PUT');\n  if (r && r.ok) toast(msg);\n  else if (r && r.error === 'login') { toast('⚠️ انتهت الجلسة، سجّل الدخول من جديد'); setTimeout(() => (location.href = '/'), 1500); }\n  else if (r && r.error === 'sub') toast('⛔ اشتراك البوت متوقف في هذا السيرفر — تواصل مع المالك');\n  else toast('❌ لم يُحفظ — تأكد أن البوت شغّال');\n}\nconst autosave = () => { clearTimeout(saveT); saveT = setTimeout(() => save('✅ حُفظ تلقائياً وطُبّق'), 600); };\nasync function refresh() { const st = await api('/api/state'); if (st && !st.error) { ST = st; } return st; }\n\n/* ============ UI builders ============ */\nconst sw = (p, d = true) => `<label class=\"sw\"><input type=\"checkbox\" data-p=\"${p}\" ${(get(S, p) ?? d) ? 'checked' : ''}><span></span></label>`;\nconst row = (ic, l, d, ctl) => `<div class=\"row\"><div class=\"rl\"><b>${ic ? ic + ' ' : ''}${l}</b>${d ? `<small>${d}</small>` : ''}</div><div class=\"rc\">${ctl}</div></div>`;\nconst tog = (p, ic, l, d, def = true) => row(ic, l, d, sw(p, def));\nconst fld = (l, d, inner) => `<div class=\"fld\"><label>${l}</label>${d ? `<small>${d}</small>` : ''}${inner}</div>`;\nconst inp = (p, l, d, ph = '', type = 'text') => fld(l, d, `<input type=\"${type}\" data-v=\"${p}\" value=\"${esc(get(S, p) ?? '')}\" placeholder=\"${esc(ph)}\">`);\nconst num = (p, l, d, min, max, def) => fld(l, d, `<input type=\"number\" min=\"${min}\" max=\"${max}\" data-n=\"${p}\" value=\"${get(S, p) ?? def}\">`);\nconst area = (p, l, d, ph = '') => fld(l, d, `<textarea data-v=\"${p}\" placeholder=\"${esc(ph)}\">${esc(get(S, p) ?? '')}</textarea>`);\nconst sel = (p, l, d, opts) => fld(l, d, `<select data-v=\"${p}\">${opts.map(([v, n]) => `<option value=\"${v}\" ${String(get(S, p)) === String(v) ? 'selected' : ''}>${n}</option>`).join('')}</select>`);\nconst opts = (list, val, ph) => `<option value=\"\">${ph}</option>` + list.map((x) => `<option value=\"${x.id}\" ${x.id === val ? 'selected' : ''}>${esc(x.name)}</option>`).join('');\nconst pick = (p, l, d, list, ph = '— بدون —') => fld(l, d, `<select data-v=\"${p}\">${opts(list, get(S, p), ph)}</select>`);\nconst card = (ic, t, d, body, head = '') => `<section class=\"card\"><div class=\"ch\"><h3>${ic} ${t}</h3>${head}</div>${d ? `<p class=\"mu\" style=\"margin-bottom:6px\">${d}</p>` : ''}${body}</section>`;\nconst btn = (act, label, cls = '', extra = '') => `<button class=\"${cls}\" data-act=\"${act}\" ${extra}>${label}</button>`;\nconst SAVE = `<div class=\"wrap\">${btn('save', 'حفظ')}<small style=\"align-self:center\">الحفظ يتم تلقائياً أيضاً</small></div>`;\nconst chText = () => ST.channels || [], chVoice = () => ST.voices || [], roles = () => ST.roles || [], cats = () => ST.categories || [];\nconst chOpts = () => (ST.channels || []).map((c) => `<option value=\"${c.id}\">${esc(c.name)}</option>`).join('');\n\n/* ============ navigation ============ */\nconst NAV = [\n  ['عام', [['home', '📊', 'نظرة عامة'], ['srv', '⚙️', 'إعدادات السيرفر'], ['emb', '🧩', 'رسائل الإيمبد']]],\n  ['الأنظمة', [['wel', '👋', 'الترحيب والوداع'], ['ar', '💬', 'الردود التلقائية'], ['lvl', '🏆', 'نظام المستويات'], ['arole', '🎖️', 'الرتب التلقائية'], ['srole', '😀', 'رتب ذاتية'],\n    ['star', '⭐', 'لوحة النجوم'], ['tv', '➕', 'رومات مؤقتة'], ['stats', '📈', 'الإحصائيات'], ['tk', '🎫', 'التذاكر']]],\n  ['الإدارة والحماية', [['mod', '🔨', 'الإدارة'], ['logs', '📜', 'اللوقات'], ['auto', '🛡️', 'الحماية التلقائية'], ['raid', '🚨', 'مكافحة الهجمات'], ['bk', '💾', 'النسخ الاحتياطي'], ['bin', '♻️', 'سلة الاستعادة']]],\n  ['أخرى', [['top', '🥇', 'لوحة المتصدرين'], ['acts', '🗂️', 'سجل الإجراءات'], ['dlog', '🧾', 'سجل لوحة التحكم'], ['bot', '🤖', 'إعدادات البوت']]],\n];\nconst PD = {\n  home: 'نظرة سريعة على سيرفرك والبوت، مع زر الطوارئ.', srv: 'الإعدادات العامة للبوت داخل هذا السيرفر.', emb: 'أرسل رسالة إمبد منسّقة لأي قناة.',\n  wel: 'رسائل الترحيب بالأعضاء الجدد والوداع عند المغادرة.', ar: 'ردود يرسلها البوت تلقائياً عند كلمات معينة.', lvl: 'نقاط وفلات للأعضاء المتفاعلين مع رتب مكافآت.',\n  arole: 'رتب يعطيها البوت تلقائياً لكل داخل جديد.', srole: 'لوحة أزرار يأخذ منها الأعضاء رتبهم بأنفسهم.', star: 'الرسائل اللي تجمع نجوم كثيرة تُنشر في قناة مخصصة.',\n  tv: 'روم صوتي يُنشئ لكل عضو روماً خاصاً ويحذفه لما يفضى.', stats: 'رومات صوتية تعرض أرقام السيرفر وتتحدث تلقائياً.', tk: 'نظام الدعم الفني بالتذاكر.',\n  mod: 'إجراءات إدارية سريعة على الأعضاء والرومات.', logs: 'اختر الأحداث اللي يسجلها البوت، وقناة كل حدث، وشكل الرسالة.',\n  auto: 'فلاتر تلقائية للمحتوى: سبام، كلمات، روابط، منشن، دعوات.', raid: 'حمايات التخريب والغارات وقناة الفخ وبوابة التحقق والقائمة البيضاء.',\n  bk: 'احفظ نسخة من الرتب والرومات واستعدها وقت الحاجة.', bin: 'الرومات والرتب المحذوفة مؤخراً، تقدر ترجعها بضغطة.', top: 'أعلى الأعضاء نقاطاً في السيرفر.',\n  acts: 'سجل الإجراءات اللي نفذها البوت أو الإدارة على الأعضاء.', dlog: 'من غيّر ماذا في لوحة التحكم ومتى.', bot: 'حالة البوت، تصدير واستيراد الإعدادات.',\n};\nconst ENABLED = {\n  wel: () => S.welcome.on || S.leave.on, ar: () => S.ar.length > 0, lvl: () => S.lvl.on !== false, arole: () => !!(S.autorole || S.botrole), star: () => S.star.on, tv: () => S.tv.on,\n  stats: () => S.stats.length > 0, tk: () => !!S.tk.ch, logs: () => LOG_KEYS.some(lgOn), auto: () => ['spam', 'words', 'link', 'mention'].some((k) => S.sec[k]),\n  raid: () => ['nuke', 'raid', 'bots', 'esc'].some((k) => S.sec[k]),\n};\nfunction drawNav() {\n  $('#nav').innerHTML = NAV.map(([g, items]) => `<div class=\"gt\">${g}</div>` + items.map(([k, ic, n]) => `<button class=\"nv ${k === cur ? 'on' : ''}\" data-go=\"${k}\"><i>${ic}</i><span>${n}</span>${ENABLED[k]?.() ? '<em>✓</em>' : ''}</button>`).join('')).join('');\n}\nfunction drawTop() {\n  const label = NAV.flatMap((g) => g[1]).find((x) => x[0] === cur);\n  $('#title').textContent = label ? label[2] : '';\n  $('#pdesc').textContent = PD[cur] || '';\n  $('#master').innerHTML = `<small>${S.on !== false ? '🟢 البوت يعمل' : '🔴 البوت متوقف'}</small>${sw('on', true)}`;\n  const sb = ST.sub;\n  $('#banner').innerHTML = sb && (!sb.active || (sb.days !== null && sb.days <= 7))\n    ? `<div class=\"ban\" style=\"background:${sb.active ? '#2a2208' : '#2a0a12'};border:1px solid ${sb.active ? '#f1c40f' : '#ff4d6d'}\">${sb.active ? `⏰ اشتراك البوت ينتهي بعد ${sb.days} يوم.` : '⛔ اشتراك البوت متوقف أو منتهي في هذا السيرفر، والبوت لا يعمل حالياً.'} ${esc(sb.msg || '')} ${sb.contact ? '— ' + esc(sb.contact) : ''}</div>` : '';\n}\nasync function go(p) {\n  cur = p; location.hash = '#/' + p;\n  drawTop(); drawNav();\n  const v = $('#view');\n  v.innerHTML = '<p class=\"mu\">جاري التحميل…</p>';\n  if (P[p].load) await P[p].load();\n  v.innerHTML = P[p].render();\n  P[p].after?.();\n  window.scrollTo(0, 0);\n}\n\n/* ============ logs catalog ============ */\nconst LOGS = [\n  ['👤', 'الأعضاء', [['join', '📥', 'دخول عضو'], ['leave', '📤', 'خروج عضو'], ['nick', '🏷️', 'تغيير لقب'], ['mrole', '🎭', 'تغيير رتب عضو'], ['timeout', '🔇', 'كتم مؤقت'], ['ban', '🔨', 'حظر'], ['unban', '♻️', 'فك حظر']]],\n  ['💬', 'الرسائل', [['msgdel', '🗑️', 'حذف رسالة'], ['msgedit', '✏️', 'تعديل رسالة']]],\n  ['📁', 'الرومات', [['chcreate', '📁', 'إنشاء روم'], ['chdelete', '🗑️', 'حذف روم'], ['chupdate', '🛠️', 'تعديل روم (اسم، وصف، صلاحيات...)']]],\n  ['🎭', 'الرتب', [['rolecreate', '🎭', 'إنشاء رتبة'], ['roledelete', '🗑️', 'حذف رتبة'], ['roleupdate', '🛠️', 'تعديل رتبة (اسم، لون، صلاحيات...)']]],\n  ['🔊', 'الصوت', [['vjoin', '🔊', 'دخول روم صوتي'], ['vleave', '🔇', 'خروج من روم صوتي'], ['vmove', '🔀', 'انتقال بين الرومات']]],\n  ['⚙️', 'السيرفر', [['gupdate', '⚙️', 'تعديل إعدادات السيرفر'], ['emojiadd', '😀', 'إضافة إيموجي'], ['emojidel', '🗑️', 'حذف إيموجي'], ['invcreate', '🔗', 'إنشاء دعوة'], ['invdelete', '🔗', 'حذف دعوة']]],\n  ['🧩', 'الأنظمة', [['protect', '🛡️', 'الحماية التلقائية (تنبيهات الحماية)'], ['tkopen', '🎫', 'فتح تذكرة'], ['tkclose', '🔒', 'إغلاق تذكرة']]],\n];\nconst LOG_KEYS = LOGS.flatMap((c) => c[2].map((e) => e[0]));\nconst lgOn = (k) => (k === 'protect' ? S.lg?.[k]?.on !== false : S.lg?.[k]?.on === true);\n\n/* ============ pages ============ */\nconst P = {\n  home: {\n    render() {\n      const sub = ST.sub, protOn = Object.values(S.sec).filter(Boolean).length;\n      const subTxt = !sub ? '—' : sub.free ? 'بدون قيود' : sub.active ? (sub.plan || 'نشط') + (sub.days !== null ? ` — باقي ${sub.days} يوم` : ' — بدون انتهاء') : 'متوقف';\n      const st = Object.entries(ST.stats || {}).sort((a, b) => b[1] - a[1]).slice(0, 6);\n      return `<div class=\"pcard ${S.panic ? 'on' : ''}\"><div class=\"ring\">${S.panic ? '🔒' : '🛡️'}</div><div class=\"t\"><h3>${S.panic ? 'الطوارئ مفعّلة' : 'وضع الطوارئ'}</h3>\n        <p class=\"mu\">${S.panic ? 'السيرفر مقفل: الكتابة ممنوعة والانضمام موقوف.' : 'يقفل القنوات ويمنع الانضمام بضغطة واحدة.'}</p></div>${btn('panic', S.panic ? 'إيقاف الطوارئ' : 'تفعيل الطوارئ', 'pbtn')}</div>\n      <div class=\"grid\">\n        <div class=\"card\"><small>👥 الأعضاء</small><div class=\"n\">${ST.members ?? '—'}</div><small>عدد أعضاء السيرفر</small></div>\n        <div class=\"card\"><small>📡 سرعة البوت</small><div class=\"n\">${ST.ping ?? '—'}ms</div><small>الاستجابة مع ديسكورد</small></div>\n        <div class=\"card\"><small>🛡️ الحمايات المفعّلة</small><div class=\"n\">${protOn}/${Object.keys(S.sec).length}</div><small>من إجمالي الحمايات</small></div>\n        <div class=\"card\"><small>🎫 الاشتراك</small><div class=\"n\" style=\"font-size:18px\">${esc(subTxt)}</div><small>حالة اشتراك البوت ومدته</small></div>\n        <div class=\"card\"><small>📁 الرومات / الرتب</small><div class=\"n\">${ST.chCount} / ${ST.roleCount}</div><small>داخل السيرفر</small></div>\n        <div class=\"card\"><small>⏱️ مدة التشغيل</small><div class=\"n\">${Math.floor(ST.uptime / 3600)}س ${Math.floor((ST.uptime % 3600) / 60)}د</div><small>منذ آخر تشغيل</small></div></div>\n      ${card('📈', 'إحصائيات الأحداث الأمنية', 'أكثر الأحداث اللي سجلها البوت.', st.map(([k, v]) => `<div class=\"item\"><b>${esc(k)}</b> — ${v}</div>`).join('') || '<small>لا أحداث بعد</small>')}\n      ${card('🗂️', 'آخر الإجراءات', 'آخر ما نُفّذ على الأعضاء.', (ST.acts || []).slice(0, 5).map((a) => `<div class=\"item\"><b>${esc(a.type)}</b> — ${esc(a.uid || '')}<small>${esc(a.text)} • ${fmtD(a.t)}</small></div>`).join('') || '<small>لا إجراءات بعد</small>')}`;\n    },\n  },\n  srv: {\n    render() {\n      return card('🤖', 'اسم البوت في هذا السيرفر', 'يغيّر لقب البوت (Nickname) داخل سيرفرك فقط.', `<div class=\"ip\"><input id=\"nick\" placeholder=\"Systemix\">${btn('nick', 'تطبيق')}</div>`) +\n        card('📜', 'قنوات السجلات', 'القنوات الافتراضية لتنبيهات الحماية وسجلات الأحداث.',\n          pick('logCh', 'قناة اللوج الأساسية', 'تنرسل فيها تنبيهات الحماية مع أزرار الحظر والعزل.', chText(), '— اختر قناة —') + pick('evCh', 'الروم الافتراضي لسجلات الأحداث', 'تُستخدم لأي حدث ما حددت له قناة خاصة في صفحة اللوقات.', chText(), '— قناة اللوج الأساسية —')) +\n        card('⌨️', 'أوامر الإدارة', 'متوفرة لكل الأعضاء حسب صلاحياتهم داخل ديسكورد.', '<small>/ban /unban /kick /timeout /untimeout /warn /warnings /clear /lock /unlock /slowmode /userinfo /serverinfo /avatar /ping /help</small>') +\n        card('⚖️', 'العقوبات', '', tog('dmPunish', '✉️', 'إرسال رسالة خاصة للعضو عند العقوبة', 'يصل العضو سبب الحظر أو الطرد أو الكتم أو التحذير في الخاص.', false)) + SAVE;\n    },\n  },\n  emb: {\n    render() {\n      return card('🧩', 'إنشاء رسالة إمبد', 'اكتب الرسالة وشوف المعاينة مباشرة قبل الإرسال.',\n        fld('القناة', 'القناة اللي تنرسل فيها الرسالة.', `<select id=\"emCh\">${chOpts()}</select>`) + fld('العنوان', '', '<input id=\"emT\" data-pv>') + fld('النص', 'يدعم تنسيق ديسكورد (**غامق** و*مائل*).', '<textarea id=\"emD\" data-pv></textarea>') +\n        fld('اللون', 'لون الشريط الجانبي.', '<input id=\"emC\" type=\"color\" value=\"#8b2fe8\" data-pv>') + fld('رابط صورة كبيرة (اختياري)', '', '<input id=\"emI\" placeholder=\"https://...\">') +\n        fld('رابط صورة مصغرة (اختياري)', '', '<input id=\"emTh\" placeholder=\"https://...\">') + fld('التذييل (اختياري)', '', '<input id=\"emF\" data-pv>') +\n        `<div class=\"pv\" id=\"emPv\" style=\"border-color:#8b2fe8\"></div><div class=\"wrap\">${btn('embSend', '📤 إرسال')}</div>`);\n    },\n    after() { emPv(); },\n  },\n  wel: {\n    render() {\n      return card('👋', 'رسالة الترحيب', 'تُرسل للعضو الجديد في القناة المحددة.', tog('welcome.on', '✅', 'تفعيل الترحيب', 'تشغيل أو إيقاف رسالة الترحيب.') +\n        pick('welcome.ch', 'القناة', 'القناة اللي تنرسل فيها رسالة الترحيب.', chText(), '— اختر قناة —') + inp('welcome.title', 'عنوان الإمبد', 'العنوان أعلى بطاقة الترحيب.', 'أهلاً وسهلاً 👋') +\n        inp('welcome.color', 'لون الإمبد', 'لون الشريط الجانبي.', '', 'color') + area('welcome.msg', 'النص', '{user} تمنشن العضو، {server} اسم السيرفر، {count} عدد الأعضاء.') + '<div class=\"pv\" id=\"wpv\"></div>' +\n        tog('welcome.dm', '✉️', 'رسالة خاصة للعضو الجديد', 'يرسل البوت رسالة DM لكل عضو جديد.', false) + area('welcome.dmMsg', 'نص الرسالة الخاصة', 'يدعم نفس المتغيرات.')) +\n        card('😢', 'رسالة المغادرة', 'تُرسل لما يغادر عضو.', tog('leave.on', '✅', 'تفعيل رسالة المغادرة', 'تشغيل أو إيقاف رسالة الوداع.', false) + pick('leave.ch', 'القناة', 'القناة اللي تنرسل فيها رسالة المغادرة.', chText(), '— اختر قناة —') + area('leave.msg', 'النص', 'تقدر تستخدم {user} و{server} و{count}.')) + SAVE;\n    },\n    after() { wPv(); },\n  },\n  ar: {\n    render() {\n      return card('💬', 'الردود التلقائية', 'يرد البوت لما يكتب العضو كلمة معينة.',\n        (S.ar.map((a, i) => `<div class=\"row\"><div class=\"rl\"><b>${a.exact ? '=' : '∋'} ${esc(a.t)}</b><small>← ${esc(a.r)}</small></div>${btn('arDel', 'حذف', 'd s', `data-i=\"${i}\"`)}</div>`).join('') || '<small>لا ردود بعد</small>') +\n        fld('إذا كتب العضو', 'الكلمة اللي تشغّل الرد.', '<input id=\"arT\">') + fld('رد البوت', 'نص الرد.', '<textarea id=\"arR\"></textarea>') +\n        row('', 'تطابق كامل فقط', 'إذا فعّلته يرد فقط لما تكون الرسالة مطابقة تماماً للكلمة.', '<label class=\"sw\"><input type=\"checkbox\" id=\"arE\"><span></span></label>') + `<div class=\"wrap\">${btn('arAdd', 'إضافة رد')}</div>`);\n    },\n  },\n  lvl: {\n    render() {\n      return card('🏆', 'نظام المستويات', 'يعطي الأعضاء نقاط عن كل رسالة ويرفع مستواهم تلقائياً.',\n        tog('lvl.on', '✅', 'تفعيل المستويات', 'تشغيل أو إيقاف النظام كاملاً.') + tog('lvl.announce', '🎉', 'إعلان رفع المستوى', 'يرسل تهنئة لما يرتفع مستوى العضو.') +\n        pick('lvl.ch', 'قناة الإعلان', 'إذا تركتها فاضية يرسل في نفس قناة العضو.', chText(), '— نفس قناة العضو —') + area('lvl.msg', 'رسالة رفع المستوى', '{user} تمنشن العضو، {level} المستوى الجديد.') +\n        num('lvl.min', 'أقل نقاط للرسالة', 'أقل ما يكسبه العضو عن الرسالة.', 1, 500, 15) + num('lvl.max', 'أعلى نقاط للرسالة', 'أعلى ما يكسبه العضو عن الرسالة.', 1, 500, 25) +\n        num('lvl.cd', 'الانتظار بين الرسائل (ثواني)', 'المدة اللازمة بين رسالتين حتى تُحسب النقاط.', 1, 600, 60)) +\n        card('🚫', 'رومات بدون نقاط', 'الرسائل في هذه الرومات ما تعطي نقاط.', `<div>${chText().map((c) => `<label class=\"tag\"><input type=\"checkbox\" data-ign=\"${c.id}\" ${S.lvl.ignore.includes(c.id) ? 'checked' : ''}> ${esc(c.name)}</label>`).join('')}</div>`) +\n        card('🎖️', 'رتب المكافآت', 'رتب يستلمها العضو تلقائياً عند وصوله لفل معين.',\n          S.lvl.rewards.map((r, i) => `<span class=\"tag\">فل ${r.lvl} ← ${esc(r.role)} <b data-act=\"rwDel\" data-i=\"${i}\">✕</b></span>`).join('') +\n          `<div class=\"ip\"><input id=\"rwL\" type=\"number\" placeholder=\"الفل\"><select id=\"rwR\">${roles().map((r) => `<option>${esc(r.name)}</option>`).join('')}</select>${btn('rwAdd', 'إضافة')}</div>`) +\n        card('🧹', 'تصفير النقاط', '', btn('xpReset', 'تصفير كل النقاط', 'd') + '<br><small>يمسح نقاط جميع الأعضاء ولا يمكن التراجع.</small>');\n    },\n  },\n  arole: {\n    render() {\n      return card('🎖️', 'الرتب التلقائية', 'يعطي كل داخل جديد رتبة تلقائياً (للأعضاء وللبوتات).',\n        pick('autorole', 'رتبة الأعضاء', 'الرتبة اللي ياخذها كل عضو يدخل.', roles()) + pick('botrole', 'رتبة البوتات', 'الرتبة اللي ياخذها كل بوت يدخل.', roles())) + SAVE;\n    },\n  },\n  srole: {\n    render() {\n      return card('😀', 'لوحة رتب ذاتية', 'ينشر لوحة أزرار؛ العضو يضغط ياخذ الرتبة أو يسحبها. الرتب الإدارية ممنوعة لأمانك.',\n        fld('القناة', 'اللي تنشر فيها اللوحة.', `<select id=\"rrCh\">${chOpts()}</select>`) + fld('العنوان', '', '<input id=\"rrT\" placeholder=\"اختر رتبك\">') +\n        fld('الرتب', 'اختر الرتب اللي تظهر كأزرار.', `<div>${roles().map((r) => `<label class=\"tag\"><input type=\"checkbox\" class=\"rrc\" value=\"${r.id}\"> ${esc(r.name)}</label>`).join('')}</div>`) + `<div class=\"wrap\">${btn('rrPost', 'نشر اللوحة')}</div>`);\n    },\n  },\n  star: {\n    render() {\n      return card('⭐', 'لوحة النجوم', 'لما تجمع رسالة عدد معين من النجوم تُنشر في قناة اللوحة.', tog('star.on', '✅', 'تفعيل لوحة النجوم', 'تشغيل أو إيقاف النظام.', false) +\n        pick('star.ch', 'قناة اللوحة', 'القناة اللي تنتشر فيها الرسائل المميزة.', chText(), '— اختر قناة —') + num('star.n', 'عدد النجوم المطلوب', 'كم نجمة تحتاج الرسالة.', 1, 50, 3) +\n        sel('star.emoji', 'الإيموجي', 'التفاعل اللي يُحسب.', [['⭐', '⭐ نجمة'], ['🌟', '🌟 نجمة لامعة'], ['❤️', '❤️ قلب'], ['🔥', '🔥 نار']]) +\n        tog('star.self', '🙋', 'احتساب تفاعل صاحب الرسالة', 'إذا أطفيته ما يُحسب تفاعل كاتب الرسالة نفسه.', false)) + SAVE;\n    },\n  },\n  tv: {\n    render() {\n      return card('➕', 'رومات صوتية مؤقتة', 'العضو يدخل روم \"إنشاء\" فيُنشئ البوت له روم خاص ويحذفه لما يفضى.', tog('tv.on', '✅', 'تفعيل الرومات المؤقتة', 'تشغيل أو إيقاف النظام.', false) +\n        pick('tv.ch', 'روم الإنشاء (صوتي)', 'لما العضو يدخله يُنشأ له روم.', chVoice(), '— اختر روم صوتي —') + pick('tv.cat', 'الفئة', 'الفئة اللي تُنشأ فيها الرومات.', cats(), '— نفس فئة روم الإنشاء —') +\n        inp('tv.name', 'اسم الروم', '{user} اسم العضو.', '🔊 {user}') + num('tv.limit', 'حد الأعضاء', '0 = بدون حد.', 0, 99, 0)) + SAVE;\n    },\n  },\n  stats: {\n    render() {\n      return card('📈', 'رومات الإحصائيات', 'رومات صوتية تتحدث كل 10 دقايق. المتغيرات: {members} {humans} {bots} {channels} {roles} {boosts}.',\n        (S.stats.map((s, i) => `<div class=\"row\"><div class=\"rl\"><b>${esc((chVoice().find((c) => c.id === s.ch) || {}).name || s.ch)}</b><small>${esc(s.tpl)}</small></div>${btn('stDel', 'حذف', 'd s', `data-i=\"${i}\"`)}</div>`).join('') || '<small>لا رومات بعد</small>') +\n        fld('الروم الصوتي', 'اختر روم موجود أو أنشئ جديد.', `<select id=\"stCh\">${chVoice().map((c) => `<option value=\"${c.id}\">${esc(c.name)}</option>`).join('')}</select>`) + fld('الصيغة', '', '<input id=\"stT\" value=\"👥 الأعضاء: {members}\">') +\n        `<div class=\"wrap\">${btn('stAdd', 'إضافة')}${btn('stNew', 'إنشاء روم جديد', 'g')}${btn('stUp', 'تحديث الآن', 'g')}</div>`);\n    },\n  },\n  tk: {\n    render() {\n      return card('🎫', 'نظام التذاكر', 'العضو يضغط زر فيُفتح له روم خاص مع الإدارة.', pick('tk.ch', 'قناة اللوحة', 'القناة اللي يُنشر فيها زر فتح التذاكر.', chText(), '— اختر قناة —') +\n        pick('tk.cat', 'كاتيجوري التذاكر', 'الفئة اللي تُنشأ فيها رومات التذاكر.', cats()) + pick('tk.role', 'رتبة الدعم', 'الرتبة اللي ترى كل التذاكر وترد عليها.', roles()) +\n        `<div class=\"wrap\">${btn('save', 'حفظ')}${btn('tkPost', 'نشر اللوحة الآن', 'g')}</div>`);\n    },\n  },\n  mod: {\n    render() {\n      const B = (a, l, t, c = 'g') => `<button class=\"${c}\" data-md=\"${a}\" title=\"${t}\">${l}</button>`;\n      return card('👤', 'إجراءات على عضو', 'أدوات إدارة سريعة بالـ ID (كليك يمين على العضو ← Copy User ID).',\n        fld('ID العضو', '', '<input id=\"mdId\" placeholder=\"123456789012345678\">') + fld('السبب (اختياري)', 'يُسجّل مع الإجراء.', '<input id=\"mdR\">') + fld('مدة الكتم (دقائق)', 'للإجراء كتم.', '<input id=\"mdM\" type=\"number\" value=\"60\">') +\n        fld('رتبة', 'تُستخدم في إعطاء أو سحب الرتبة.', `<select id=\"mdRole\">${roles().map((r) => `<option value=\"${r.id}\">${esc(r.name)}</option>`).join('')}</select>`) + fld('لقب جديد', 'فاضي = إزالة اللقب.', '<input id=\"mdN\">') +\n        `<div class=\"wrap\">${B('ban', 'حظر', 'يمنع العضو من السيرفر نهائياً', 'd')}${B('unban', 'فك الحظر', 'يرجع السماح للعضو بالدخول')}${B('kick', 'طرد', 'يخرج العضو ويقدر يرجع برابط')}${B('strip', 'سحب كل الرتب', 'يسحب كل رتب العضو')}\n        ${B('timeout', 'كتم', 'يمنع العضو من الكتابة والكلام')}${B('untimeout', 'فك الكتم', 'يلغي الكتم')}${B('addrole', 'إعطاء الرتبة', 'يعطي الرتبة المختارة')}${B('rmrole', 'سحب الرتبة', 'يسحب الرتبة المختارة')}\n        ${B('nick', 'تغيير اللقب', 'يغيّر لقب العضو')}${B('warn', 'تحذير', 'يسجل تحذير؛ عند بلوغ الحد تُنفَّذ عقوبة')}${B('clearwarns', 'مسح التحذيرات', 'يصفّر تحذيرات العضو')}${btn('mdW', 'عرض التحذيرات', 'g')}</div><div id=\"mdWL\" class=\"mu\" style=\"margin-top:10px\"></div>`) +\n        card('⚖️', 'إعدادات العقوبات', 'تنطبق على التحذيرات والفلاتر.', num('warnMax', 'عدد التحذيرات قبل العقوبة', 'بعد هذا العدد تُنفَّذ العقوبة تلقائياً.', 1, 20, 3) +\n          sel('warnAct', 'عقوبة التحذيرات', 'ماذا يحصل عند بلوغ الحد.', [['timeout', 'كتم'], ['kick', 'طرد'], ['ban', 'حظر']]) + num('muteMin', 'مدة الكتم التلقائي (دقائق)', 'مدة الكتم لمخالفي الفلاتر والتحذيرات.', 1, 40320, 60)) +\n        card('📁', 'أدوات الرومات', 'تحكم سريع في القنوات النصية.', fld('القناة', '', `<select id=\"chSel\">${chOpts()}</select>`) + fld('القيمة', 'ثواني للسلو مود، أو عدد الرسائل للمسح (حتى 100).', '<input id=\"chV\" type=\"number\" value=\"5\">') +\n          fld('عنوان (اختياري)', 'إذا كتبت عنواناً تُرسل الرسالة كإمبد.', '<input id=\"chTi\">') + fld('نص الإعلان', '', '<textarea id=\"chT\"></textarea>') +\n          `<div class=\"wrap\"><button class=\"g\" data-ch=\"lock\" title=\"يمنع الجميع من الكتابة\">🔒 قفل</button><button class=\"g\" data-ch=\"unlock\" title=\"يرجع السماح بالكتابة\">🔓 فتح</button><button class=\"g\" data-ch=\"slow\" title=\"فاصل بين رسائل العضو\">سلو مود</button><button class=\"d\" data-ch=\"purge\" title=\"يمسح آخر الرسائل (أحدث من 14 يوم)\">مسح رسائل</button><button data-ch=\"say\" title=\"يرسل النص كإعلان\">📢 إرسال</button></div>`) +\n        card('⭐', 'نقاط عضو (XP)', 'تعديل نقاط عضو يدوياً.', fld('ID العضو', '', '<input id=\"xpId\">') + fld('النقاط', '', '<input id=\"xpVal\" type=\"number\" min=\"0\">') + `<div class=\"wrap\">${btn('xpSet', 'تعيين')}</div>`) + SAVE;\n    },\n  },\n  logs: {\n    render() {\n      const head = card('📜', 'القناة الافتراضية', 'الحدث اللي ما حددت له قناة يرسل هنا.', pick('evCh', 'الروم الافتراضي', '', chText(), '— قناة اللوج الأساسية —'));\n      return head + LOGS.map(([ic, name, evs]) => {\n        const n = evs.filter((e) => lgOn(e[0])).length;\n        return card(ic, name + `<span class=\"cnt\">${n}/${evs.length} مفعّل</span>`, '', evs.map(([k, eic, en]) => `<div class=\"lgrow\"><label class=\"sw\"><input type=\"checkbox\" data-lg=\"${k}\" ${lgOn(k) ? 'checked' : ''}><span></span></label>\n          <div class=\"rl\"><b>${eic} ${en}</b></div><select data-lgch=\"${k}\">${opts(chText(), S.lg?.[k]?.ch, 'الروم الافتراضي')}</select>${btn('lgEdit', '✏️', 'g s', `data-k=\"${k}\" title=\"تعديل شكل الرسالة\"`)}</div>`).join(''),\n          `<label class=\"sw\" title=\"تشغيل/إيقاف الكل\"><input type=\"checkbox\" data-lgcat=\"${name}\" ${n === evs.length ? 'checked' : ''}><span></span></label>`);\n      }).join('');\n    },\n  },\n  auto: {\n    render() {\n      return card('💬', 'منع سبام الرسائل', 'يحذف ويكتم من يرسل رسائل كثيرة بسرعة.', tog('sec.spam', '✅', 'تفعيل', 'تشغيل أو إيقاف منع السبام.') + num('spamMsgs', 'عدد الرسائل', 'كم رسالة تُعتبر سبام.', 3, 30, 6) + num('spamSec', 'خلال كم ثانية', 'المدة اللي تُحسب فيها الرسائل.', 2, 60, 5)) +\n        card('🤬', 'الكلمات الممنوعة', 'يحذف الرسائل اللي فيها كلمات من قائمتك.', tog('sec.words', '✅', 'تفعيل', 'تشغيل أو إيقاف الفلتر.') + area('badWords', 'الكلمات', 'كل كلمة بسطر أو افصل بفاصلة (حالة الأحرف لا تهم).') +\n          sel('wordAction', 'العقوبة', 'حذف الرسالة فقط أو حذفها مع كتم صاحبها.', [['timeout', 'حذف + كتم'], ['delete', 'حذف فقط']])) +\n        card('🔠', 'الحروف الكبيرة (EN)', 'يحذف الرسائل الإنجليزية المكتوبة بحروف كبيرة بشكل مبالغ.', tog('capsOn', '✅', 'تفعيل', 'تشغيل أو إيقاف الفلتر.', false) + num('capsPct', 'النسبة %', 'نسبة الحروف الكبيرة اللي تعتبر مخالفة.', 30, 100, 70)) +\n        card('🔗', 'درع الروابط والمنشن', 'يحذف الروابط الخطيرة والمنشن الجماعي.', tog('sec.link', '🔗', 'درع الروابط والتصيّد', 'يحذف الروابط المنتحلة لديسكورد وستيم والدومينات المحظورة ويعاقب ناشرها.') +\n          area('badDomains', 'دومينات محظورة', 'افصل بمسافة أو فاصلة، مثل evil.com.') + tog('sec.mention', '📢', 'منع سبام المنشن', 'يحذف الرسائل اللي فيها منشن جماعي أو @everyone من غير الموثوقين.') +\n          num('maxMentions', 'أقصى عدد منشنات في رسالة', 'أي رسالة فيها منشنات أكثر من هذا تُحذف.', 2, 50, 5)) +\n        card('📨', 'دعوات السيرفرات', 'يمنع نشر روابط دعوة سيرفرات ثانية.', tog('blockInvites', '🚫', 'منع روابط الدعوة', 'الأونر والقائمة البيضاء مستثنون.', true) + inp('allowInv', 'دعوات مسموحة', 'أكواد الدعوات المسموح نشرها، افصل بمسافة.')) +\n        card('📎', 'الملفات والإيموجي', 'يحذف الملفات الخطيرة والإيموجي المفرطة.', tog('sec.files', '☣️', 'منع الملفات الخطيرة', 'يحذف المرفقات التنفيذية (exe, bat, scr, jar, ps1...) ويكتم صاحبها.') +\n          tog('sec.emojis', '😵', 'منع الإيموجي المفرطة', 'يحذف الرسائل اللي فيها إيموجي أكثر من الحد.') + num('maxEmojis', 'أقصى عدد إيموجي في رسالة', 'أي رسالة فيها أكثر من هذا تُحذف.', 3, 50, 10)) + SAVE;\n    },\n  },\n  raid: {\n    render() {\n      const T = [['nuke', '💣', 'Anti-Nuke الشامل', 'المفتاح الرئيسي لحماية التخريب الجماعي؛ إذا أطفيته تتعطل حمايات الحذف والحظر والطرد.'], ['ban', '🔨', 'منع الحظر/الطرد الجماعي', 'يعاقب من يحظر أو يطرد عدة أعضاء بسرعة.'],\n        ['chan', '📁', 'منع حذف القنوات', 'يعاقب من يحذف أو ينشئ أو يعدّل رومات كثيرة بسرعة.'], ['role', '🎭', 'حماية الرتب', 'يعاقب من يحذف أو ينشئ أو يعدّل رتب كثيرة بسرعة، ويحمي الرتب الحساسة (اللي فيها صلاحيات إدارية) من أي تعديل أو حذف.'],\n        ['hook', '🪝', 'منع الويب هوكس الخبيثة', 'يحذف أي ويب هوك جديد ينشئه شخص غير موثوق.'], ['vanity', '🔗', 'مراقبة الرابط المميز', 'ينبهك ويعاقب الفاعل (ديسكورد ما يسمح للبوت يسترجعه).'],\n        ['esc', '⬆️', 'منع ترقية الصلاحيات الخطيرة', 'يسحب أي رتبة أو صلاحية خطيرة (Administrator, إدارة السيرفر/الرتب/الرومات...) تُعطى بدون إذن ويعاقب الفاعل.'], ['alt', '🕵️', 'كشف الحسابات الجديدة', 'ينبهك عند دخول حساب عمره أقل من عدد الأيام المحدد.'],\n        ['emoji', '😀', 'حماية الإيموجيات والملصقات', 'يعاقب من يحذف إيموجيات أو ملصقات كثيرة بسرعة.'], ['gset', '🏰', 'حماية إعدادات السيرفر', 'يتراجع عن تغيير الاسم أو الشعار أو مستوى التحقق ويعاقب الفاعل.'],\n        ['integ', '🔌', 'حماية التكاملات', 'يعاقب من يضيف أو يحذف تكاملات بدون صلاحية.'], ['bots', '🤖', 'القائمة البيضاء للبوتات', 'يطرد أي بوت ما أضافه الأونر أو شخص موثوق.'],\n        ['raid', '🌊', 'كشف الغارات', 'يكتشف دخول عدد كبير بثواني ويطردهم ويفعّل وضع الغارة.'], ['honey', '🍯', 'قناة الفخ', 'يعاقب أي عضو يكتب في قناة الفخ.'],\n        ['trust', '🕸️', 'القائمة السوداء المشتركة', 'يحظر تلقائياً أي شخص سبق أن حظره البوت.'], ['restore', '♻️', 'الاسترجاع التلقائي', 'يرجع فوراً الروم أو الرتبة اللي حذفها شخص غير موثوق (بدون الحاجة لنسخة احتياطية).']];\n      return card('🛡️', 'حمايات التخريب', 'شغّل أو أطفي كل حماية.', T.map(([k, ic, l, d]) => tog('sec.' + k, ic, l, d)).join('')) +\n        card('⚙️', 'إعدادات العقوبة', 'تنطبق على كل حمايات التخريب.', pick('logCh', 'قناة اللوج', 'تنبيهات الحماية مع أزرار الحظر والعزل.', chText(), '— اختر قناة —') + num('limit', 'العمليات المسموحة قبل العقوبة', 'كم عملية يسمح بها قبل أن يُعاقب الفاعل.', 1, 20, 3) +\n          num('window', 'خلال كم ثانية', 'المدة اللي تُحسب فيها العمليات.', 3, 120, 10) + sel('punish', 'العقوبة', 'ماذا يفعل البوت بالمخرب.', [['ban', 'حظر'], ['kick', 'طرد'], ['strip', 'سحب كل الرتب']]) + num('altDays', 'الحسابات الأصغر من (أيام)', 'الحسابات الأحدث من هذا العدد تُعتبر مشبوهة.', 1, 365, 3) + sel('altAct', 'ماذا يسوي مع الحساب الجديد', 'تنبيه فقط، أو كتم مؤقت، أو طرد فوراً عند الدخول.', [['alert', 'تنبيه في اللوج فقط'], ['timeout', 'كتم مؤقت + تنبيه'], ['kick', 'طرد فوراً']])) +\n        card('🌊', 'الغارات', 'إعدادات كشف الغارات.', num('raidJoins', 'عدد الداخلين خلال 10 ثواني = غارة', '', 3, 100, 8) + num('raidMin', 'مدة وضع الغارة (دقائق)', 'يُعاقب فيها كل داخل جديد.', 1, 120, 5) + sel('raidAct', 'عقوبة الداخلين وقت الغارة', '', [['kick', 'طرد'], ['ban', 'حظر']])) +\n        card('🧠', 'التحليل الاستباقي', 'يجمع نقاط خطر (عقوبات، غارات، فخاخ)، وإذا تجاوزت الحد خلال دقيقة يفعّل الطوارئ تلقائياً.', tog('autoPanic', '🚨', 'تفعيل الطوارئ التلقائي', 'يقفل السيرفر تلقائياً عند تراكم الخطر.', false) + num('panicScore', 'حد نقاط الخطر', 'كلما قلّ الرقم صار الإقفال أسرع.', 3, 100, 12)) +\n        card('🍯', 'قناة الفخ', 'قناة طعم؛ أي عضو يكتب فيها يُعاقب تلقائياً.', pick('honeypot', 'القناة', 'اختر قناة موجودة أو أنشئ جديدة.', chText(), '— بدون —') + `<div class=\"wrap\">${btn('hpNew', 'إنشاء قناة فخ جديدة', 'g')}</div>`) +\n        card('✅', 'بوابة التحقق', 'زر وسؤال بسيط يتأكد به البوت أن العضو إنسان ثم يعطيه رتبة.', pick('verify.ch', 'قناة نشر اللوحة', '', chText(), '— اختر قناة —') + pick('verify.role', 'الرتبة بعد التحقق', '', roles()) + `<div class=\"wrap\">${btn('vfPost', 'نشر لوحة التحقق', 'g')}</div>`) +\n        card('✅', 'القائمة البيضاء (Whitelist)', 'حسابات وبوتات موثوقة مستثناة من الحمايات. أدخل الـ ID.', `<div>${(ST.wl || []).map((id, i) => `<span class=\"tag\">${esc(id)} <b data-act=\"wlDel\" data-i=\"${i}\">✕</b></span>`).join('') || '<small>لا أحد</small>'}</div><div class=\"ip\"><input id=\"wlIn\" placeholder=\"User ID\">${btn('wlAdd', 'إضافة')}</div>`) +\n        card('🕸️', 'القائمة السوداء المشتركة', 'كل من يحظره البوت يُضاف هنا ويُحظر تلقائياً عند دخوله أي سيرفر يشغّله نفس البوت.', `<div>${(ST.bad || []).map((u) => `<span class=\"tag\" title=\"${esc(u.r)}\">${u.id} <b data-act=\"badDel\" data-id=\"${u.id}\">✕</b></span>`).join('') || '<small>فارغة</small>'}</div><div class=\"ip\"><input id=\"badId\" placeholder=\"User ID\">${btn('badAdd', 'إضافة')}</div>`) +\n        card('💾', 'نسخ احتياطي تلقائي', '', num('autoBackup', 'كل كم ساعة (0 = إيقاف)', 'الفاصل بين كل نسخة تلقائية وأخرى.', 0, 168, 0)) + SAVE;\n    },\n  },\n  bk: {\n    render() {\n      return card('💾', 'النسخ الاحتياطي', 'يحفظ الرتب والرومات وصلاحياتها ويعطيك رابط عرض للنسخة.', `<div class=\"wrap\">${btn('bkNew', '💾 نسخة احتياطية الآن')}</div><div id=\"lnk\"></div>` +\n        ((ST.backups || []).map((b) => `<div class=\"row\"><div class=\"rl\"><b>${fmtD(b.date)}</b><small>${b.roles} رتبة / ${b.channels} قناة</small></div><div class=\"rc\"><a href=\"/view/${b.id}\" target=\"_blank\"><button class=\"g s\">عرض</button></a>${btn('bkRs', 'استعادة', 'g s', `data-id=\"${b.id}\"`)}${btn('bkDel', 'حذف', 'd s', `data-id=\"${b.id}\"`)}</div></div>`).join('') || '<small>لا نسخ بعد</small>'));\n    },\n  },\n  bin: {\n    render() {\n      const L = ST.bin || [];\n      return card('♻️', 'سلة الاستعادة', 'آخر 50 روم أو رتبة انحذفت. \"استعادة\" ينشئها من جديد بنفس الإعدادات.', (L.length ? `<div class=\"wrap\">${btn('binClear', 'تفريغ السلة', 'd s')}</div>` : '') +\n        (L.map((e) => `<div class=\"row\"><div class=\"rl\"><b>${e.kind === 'ch' ? '📁' : '🎭'} ${esc(e.name)}</b><small>${fmtD(e.at)}</small></div><div class=\"rc\">${btn('binRs', 'استعادة', 's', `data-id=\"${e.id}\"`)}${btn('binDel', 'حذف نهائي', 'd s', `data-id=\"${e.id}\"`)}</div></div>`).join('') || '<small>السلة فاضية</small>'));\n    },\n  },\n  top: {\n    async load() { this.rows = (await api('/api/leaderboard')) || []; },\n    render() {\n      return card('🥇', 'أعلى 25 عضو', 'مرتبين حسب النقاط.', this.rows.map((u, i) => `<div class=\"row\"><div class=\"rc\"><b>#${i + 1}</b>${u.avatar ? `<img src=\"${esc(u.avatar)}\" width=\"34\" height=\"34\" style=\"border-radius:50%\" alt=\"\">` : ''}<div class=\"rl\"><b>${esc(u.name)}</b><small>${u.id}</small></div></div><div class=\"rl\" style=\"text-align:left\"><b>فل ${u.level}</b><small>${u.xp} XP</small></div></div>`).join('') || '<small>لا أحد بعد</small>');\n    },\n  },\n  acts: {\n    render() {\n      const B = (u) => (u ? `<button class=\"d s\" data-md=\"ban\" data-uid=\"${u}\">حظر</button> <button class=\"g s\" data-md=\"strip\" data-uid=\"${u}\">عزل</button>` : '');\n      return card('🗂️', 'سجل الإجراءات', 'آخر 100 إجراء على الأعضاء.', (ST.acts || []).slice(0, 100).map((a) => `<div class=\"item\"><b>${esc(a.type)}</b> — ${esc(a.uid || '')}<small>${esc(a.text)} • ${fmtD(a.t)}</small>${B(a.uid)}</div>`).join('') || '<small>لا إجراءات بعد</small>') +\n        card('🚨', 'تنبيهات الحماية الأخيرة', 'آخر تنبيهات الحماية منذ تشغيل البوت.', (ST.logs || []).map((l) => `<div class=\"item\"><b>${esc(l.t)}</b><small>${esc(l.d)} • ${fmtD(l.at)}</small>${B(l.u)}</div>`).join('') || '<small>لا تنبيهات</small>');\n    },\n  },\n  dlog: {\n    render() { return card('🧾', 'سجل لوحة التحكم', 'من غيّر ماذا ومتى (آخر 100).', (ST.dlog || []).map((d) => `<div class=\"item\"><b>${esc(d.who)}</b> — ${esc(d.text)}<small>${fmtD(d.t)}</small></div>`).join('') || '<small>لا تغييرات بعد</small>'); },\n  },\n  bot: {\n    render() {\n      const pr = ST.presence || {};\n      return card('🎮', 'حالة البوت (للمالك)', 'يغيّر حالة البوت ونشاطه الظاهر في ديسكورد.', (ST.isOwner ? '' : '<p class=\"mu\">لتفعيلها: ضع OWNER_ID (ايدي حسابك) في ملف .env وسجّل الدخول به.</p>') +\n        fld('الحالة', '', `<select id=\"prS\">${[['online', 'متصل'], ['idle', 'خامل'], ['dnd', 'مشغول'], ['invisible', 'مخفي']].map(([v, n]) => `<option value=\"${v}\" ${pr.status === v ? 'selected' : ''}>${n}</option>`).join('')}</select>`) +\n        fld('النشاط', '', `<select id=\"prT\">${[[0, 'يلعب'], [2, 'يستمع'], [3, 'يشاهد'], [5, 'ينافس']].map(([v, n]) => `<option value=\"${v}\" ${+pr.type === v ? 'selected' : ''}>${n}</option>`).join('')}</select>`) +\n        fld('النص', '', `<input id=\"prX\" value=\"${esc(pr.text || '')}\">`) + `<div class=\"wrap\">${btn('prApply', 'تطبيق')}</div>`) +\n        card('📦', 'تصدير / استيراد الإعدادات', 'انسخ إعداداتك أو انقلها لسيرفر ثاني.', '<textarea id=\"io\" style=\"min-height:160px\"></textarea>' + `<div class=\"wrap\">${btn('exp', 'تصدير', 'g')}${btn('imp', 'استيراد وحفظ', 'g')}${btn('rst', 'إعادة ضبط كل شي', 'd')}</div>`);\n    },\n  },\n};\n\n/* ============ live previews ============ */\nfunction emPv() {\n  const e = $('#emPv'); if (!e) return;\n  e.style.borderColor = $('#emC').value;\n  e.textContent = ($('#emT').value ? $('#emT').value + '\\n\\n' : '') + $('#emD').value + ($('#emF').value ? '\\n— ' + $('#emF').value : '');\n}\nfunction wPv() { const e = $('#wpv'); if (e) e.textContent = (S.welcome.msg || '').replace(/{user}/g, '@عضو').replace(/{server}/g, ST.guild || 'سيرفرك').replace(/{count}/g, ST.members || '1000'); }\n\n/* ============ log-event editor (modal) ============ */\nfunction openLg(k) {\n  const e = S.lg[k] || {}, m = $('#modal');\n  m.style.display = 'grid';\n  m.innerHTML = `<div class=\"card\"><div class=\"ch\"><h3>✏️ تعديل شكل الرسالة</h3></div><p class=\"mu\">اترك الحقول فاضية لاستخدام الشكل الافتراضي. استخدم {details} لإدخال تفاصيل الحدث.</p>\n    ${fld('العنوان', '', `<input id=\"lgT\" value=\"${esc(e.t || '')}\">`)}${fld('النص', '{details} = تفاصيل الحدث.', `<textarea id=\"lgD\">${esc(e.d || '')}</textarea>`)}${fld('اللون', '', `<input id=\"lgC\" type=\"color\" value=\"${e.c || '#7f8c8d'}\">`)}\n    <div class=\"wrap\">${btn('lgSave', 'حفظ', '', `data-k=\"${k}\"`)}${btn('lgReset', 'الافتراضي', 'g', `data-k=\"${k}\"`)}${btn('lgClose', 'إغلاق', 'g')}</div></div>`;\n}\nconst closeM = () => ($('#modal').style.display = 'none');\n\n/* ============ actions ============ */\nconst A = {\n  save: () => save(),\n  panic: async () => { if (!S.panic && !confirm('تفعيل وضع الطوارئ وقفل السيرفر؟')) return; const r = await api('/api/panic', { on: !S.panic }); if (r && r.ok) { S.panic = !S.panic; toast((S.panic ? '🔒 تم القفل' : '🔓 تم الفتح') + (r.bad ? ` — فشل ${r.bad} روم (صلاحيات البوت)` : '')); go('home'); } else ok(r); },\n  nick: async () => ok(await api('/api/botnick', { nick: $('#nick').value })),\n  embSend: async () => ok(await api('/api/embed', { channel: $('#emCh').value, title: $('#emT').value, desc: $('#emD').value, color: $('#emC').value, image: $('#emI').value, thumb: $('#emTh').value, footer: $('#emF').value }), '✅ أُرسلت'),\n  arAdd: () => { const t = $('#arT').value.trim(), r = $('#arR').value.trim(); if (!t || !r) return toast('اكتب الكلمة والرد'); S.ar.push({ t, r, exact: $('#arE').checked }); save(); go('ar'); },\n  arDel: (el) => { S.ar.splice(+el.dataset.i, 1); save(); go('ar'); },\n  rwAdd: () => { const l = +$('#rwL').value, r = $('#rwR').value; if (l > 0 && r) { S.lvl.rewards.push({ lvl: l, role: r }); save(); go('lvl'); } },\n  rwDel: (el) => { S.lvl.rewards.splice(+el.dataset.i, 1); save(); go('lvl'); },\n  xpReset: async () => { if (confirm('تصفير كل النقاط؟')) ok(await api('/api/xp/reset', {})); },\n  xpSet: async () => ok(await api('/api/xp/set', { id: $('#xpId').value.trim(), xp: +$('#xpVal').value })),\n  rrPost: async () => ok(await api('/api/rrpanel', { channel: $('#rrCh').value, title: $('#rrT').value, roles: $$('.rrc:checked').map((x) => x.value) }), '✅ نُشرت اللوحة'),\n  tkPost: async () => { if (!S.tk.ch) return toast('اختر القناة أولاً'); await save(); ok(await api('/api/ticketpanel', { channel: S.tk.ch }), '✅ نُشرت اللوحة'); },\n  vfPost: async () => { if (!S.verify.ch) return toast('اختر القناة أولاً'); await save(); ok(await api('/api/verifypanel', { channel: S.verify.ch }), '✅ نُشرت اللوحة'); },\n  hpNew: async () => { if (!confirm('سيتم إنشاء قناة فخ ظاهرة للجميع، وأي عضو يكتب فيها يُعاقب. متأكد؟')) return; const r = await api('/api/honeypot/create', {}); if (r && r.ok) { S.honeypot = r.id; await refresh(); save('✅ تم إنشاء قناة الفخ'); go('raid'); } else ok(r); },\n  wlAdd: async () => { const v = $('#wlIn').value.trim(); if (!/^\\d{15,22}$/.test(v)) return toast('ID غير صحيح'); ST.wl = [...new Set([...(ST.wl || []), v])]; S.wl = ST.wl; await save(); go('raid'); },\n  wlDel: async (el) => { ST.wl.splice(+el.dataset.i, 1); S.wl = ST.wl; await save(); go('raid'); },\n  badAdd: async () => { const id = $('#badId').value.trim(); if (!/^\\d{15,22}$/.test(id)) return toast('ID غير صحيح'); await api('/api/bad/add', { id }); await refresh(); go('raid'); },\n  badDel: async (el) => { await api('/api/bad/remove', { id: el.dataset.id }); await refresh(); go('raid'); },\n  mdW: async () => { const w = await api('/api/warns?id=' + $('#mdId').value.trim()); $('#mdWL').innerHTML = w && w.length ? w.map((x) => `• ${esc(x.r)} — ${fmtD(x.at)}`).join('<br>') : 'لا تحذيرات'; },\n  bkNew: async () => { const r = await api('/api/backup', {}); if (r && r.link) { await refresh(); await go('bk'); $('#lnk').innerHTML = `<p class=\"mu\" style=\"margin-top:10px\">رابط عرض النسخة (يعمل لتسجيل دخول واحد فقط):</p><input readonly value=\"${esc(r.link)}\" onclick=\"this.select()\">`; } else ok(r); },\n  bkRs: async (el) => { if (confirm('استعادة العناصر المفقودة من هذه النسخة؟')) { const r = await api('/api/backup/restore', { id: el.dataset.id }); toast(r && r.ok ? `♻️ تمت استعادة ${r.n} عنصر` : 'فشلت الاستعادة'); } },\n  bkDel: async (el) => { if (confirm('حذف هذه النسخة؟')) { await api('/api/backup/delete', { id: el.dataset.id }); await refresh(); go('bk'); } },\n  binRs: async (el) => { const r = await api('/api/bin/restore', { id: el.dataset.id }); ok(r, '♻️ تمت الاستعادة'); await refresh(); go('bin'); },\n  binDel: async (el) => { await api('/api/bin/delete', { id: el.dataset.id }); await refresh(); go('bin'); },\n  binClear: async () => { if (confirm('تفريغ السلة نهائياً؟')) { await api('/api/bin/clear', {}); await refresh(); go('bin'); } },\n  stAdd: () => { const ch = $('#stCh').value, tpl = $('#stT').value.trim(); if (!ch || !tpl) return toast('اختر روم واكتب الصيغة'); S.stats.push({ ch, tpl }); save(); go('stats'); },\n  stDel: (el) => { S.stats.splice(+el.dataset.i, 1); save(); go('stats'); },\n  stNew: async () => { const tpl = $('#stT').value.trim() || '👥 الأعضاء: {members}'; const r = await api('/api/stats/create', { tpl }); if (r && r.ok) { S.stats.push({ ch: r.id, tpl }); await save(); await refresh(); go('stats'); } else ok(r); },\n  stUp: async () => { await save(); const r = await api('/api/stats/update', {}); toast(r && r.ok ? `✅ حُدّث ${r.n} روم` : 'فشل'); },\n  prApply: async () => ok(await api('/api/presence', { status: $('#prS').value, type: $('#prT').value, text: $('#prX').value })),\n  exp: () => { const { panic, wl, ...c } = S; $('#io').value = JSON.stringify(c, null, 1); },\n  imp: () => { try { merge(S, JSON.parse($('#io').value)); save('✅ تم الاستيراد'); go('bot'); } catch { toast('JSON غير صحيح'); } },\n  rst: async () => { if (confirm('إعادة ضبط كل الإعدادات؟')) { await api('/api/reset', {}); location.reload(); } },\n  lgEdit: (el) => openLg(el.dataset.k),\n  lgSave: (el) => { const k = el.dataset.k; (S.lg[k] ??= {}); Object.assign(S.lg[k], { t: $('#lgT').value, d: $('#lgD').value, c: $('#lgC').value }); closeM(); autosave(); },\n  lgReset: (el) => { const e = S.lg[el.dataset.k]; if (e) { delete e.t; delete e.d; delete e.c; } closeM(); autosave(); },\n  lgClose: closeM,\n};\n\n/* ============ event delegation ============ */\ndocument.addEventListener('click', async (e) => {\n  const t = e.target.closest('[data-go],[data-act],[data-md],[data-ch]');\n  if (!t) return;\n  if (t.dataset.go) return go(t.dataset.go);\n  if (t.dataset.act) return A[t.dataset.act]?.(t);\n  if (t.dataset.md) { // member actions (mod page or action buttons)\n    const id = t.dataset.uid || $('#mdId')?.value.trim();\n    if (!/^\\d{15,22}$/.test(id || '')) return toast('ID غير صحيح');\n    if (!confirm('تأكيد؟')) return;\n    ok(await api('/api/mod', { action: t.dataset.md, id, reason: $('#mdR')?.value || '', min: +($('#mdM')?.value || 60), role: $('#mdRole')?.value, nick: $('#mdN')?.value || '' }));\n  }\n  if (t.dataset.ch) ok(await api('/api/chan', { action: t.dataset.ch, channel: $('#chSel').value, value: $('#chV').value, title: $('#chTi').value, text: $('#chT').value }));\n});\ndocument.addEventListener('change', (e) => {\n  const t = e.target;\n  if (t.dataset.p) { set(S, t.dataset.p, t.checked); save(); drawTop(); drawNav(); if (cur === 'home') go('home'); return; }\n  if (t.dataset.n) { set(S, t.dataset.n, +t.value); return autosave(); }\n  if (t.dataset.v) { set(S, t.dataset.v, t.value); wPv(); drawNav(); return autosave(); }\n  if (t.dataset.ign) { const a = S.lvl.ignore, i = a.indexOf(t.dataset.ign); t.checked ? i < 0 && a.push(t.dataset.ign) : i >= 0 && a.splice(i, 1); return autosave(); }\n  if (t.dataset.lg) { (S.lg[t.dataset.lg] ??= {}).on = t.checked; autosave(); drawNav(); return go('logs'); }\n  if (t.dataset.lgch) { (S.lg[t.dataset.lgch] ??= {}).ch = t.value; return autosave(); }\n  if (t.dataset.lgcat) { const c = LOGS.find((x) => x[1] === t.dataset.lgcat); c[2].forEach(([k]) => ((S.lg[k] ??= {}).on = t.checked)); autosave(); drawNav(); return go('logs'); }\n});\ndocument.addEventListener('input', (e) => {\n  const t = e.target;\n  if (t.dataset.v && t.tagName !== 'SELECT') { set(S, t.dataset.v, t.value); wPv(); autosave(); }\n  if (t.dataset.pv !== undefined) emPv();\n});\n\n/* ============ boot ============ */\n(async () => {\n  const st = await api('/api/state');\n  if (!st || st.error) { location.href = '/servers'; return; }\n  ST = st; S = merge(JSON.parse(JSON.stringify(DEF)), { ...st.ui, wl: st.wl, panic: st.panic });\n  $('#gname').textContent = st.guild;\n  if (st.isOwner) $('#ownLink').style.display = 'block';\n  const start = (location.hash.match(/#\\/(\\w+)/) || [])[1];\n  go(P[start] ? start : 'home');\n})();\n</script>\n</body>\n</html>\n","owner.html":"<!DOCTYPE html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"UTF-8\"><meta name=\"robots\" content=\"noindex,nofollow\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Systemix | لوحة المالك</title><link rel=\"icon\" href=\"/logo.webp\">\n<style>:root{--card:#120a1f;--line:#2a1646;--p:#8b2fe8;--p2:#b46bff;--mu:#a592c4}*{box-sizing:border-box;margin:0;font-family:Tahoma,sans-serif}\nbody{background:radial-gradient(900px 500px at 85% -10%,#3b0f73aa,transparent),radial-gradient(700px 500px at 0% 110%,#5a14a855,transparent),#07040d;color:#f1e9ff;min-height:100vh;padding:20px;max-width:1100px;margin:auto}\nheader{display:flex;align-items:center;gap:12px;margin-bottom:18px;flex-wrap:wrap}header img{width:48px}header h2{flex:1}\nbutton{cursor:pointer;border:0;border-radius:10px;padding:8px 14px;background:var(--p);color:#fff;font-size:13px}button:hover{background:var(--p2)}button.g{background:#1e1233;border:1px solid var(--line)}button.d{background:#ff4d6d}\ninput,select,textarea{width:100%;background:#0c0716;border:1px solid var(--line);color:#f1e9ff;border-radius:10px;padding:9px;font-size:13px}textarea{min-height:70px}\n.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:14px}.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;margin-bottom:14px}\n.n{font-size:26px;font-weight:700;color:var(--p2)}.mu{color:var(--mu);font-size:12px}.ds{color:var(--mu);font-size:12px;margin:2px 0 8px}label{display:block;color:var(--mu);font-size:13px;margin:10px 0 4px}\n.srv{display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap}.srv img{width:48px;height:48px;border-radius:50%}.srv .i{flex:1;min-width:220px}.b{display:inline-block;padding:2px 10px;border-radius:12px;font-size:12px;color:#fff;margin-inline-start:6px}\n.act{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}.two{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.tag{display:inline-flex;gap:6px;background:#241338;border:1px solid var(--line);padding:5px 10px;border-radius:16px;margin:3px;font-size:12px}\n#toast{position:fixed;bottom:20px;left:20px;background:var(--p);padding:12px 18px;border-radius:12px;display:none}.f button.on{background:var(--p)}</style></head><body>\n<header><img src=\"/logo.webp\"><div style=\"flex:1\"><h2>👑 لوحة المالك</h2><div class=\"mu\">تحكم في كل السيرفرات اللي فيها البوت: الاشتراكات، الإيقاف، التمديد، والإعدادات العامة.</div></div><a href=\"/servers\"><button class=\"g\">سيرفراتي</button></a> <a href=\"/logout\"><button class=\"g\">خروج</button></a></header>\n<div class=\"grid\" id=\"stats\"></div>\n<div class=\"card\"><h3>🌐 السيرفرات</h3><div class=\"ds\">كل سيرفر فيه البوت. السيرفر المتوقف أو المنتهي يبقى فيه البوت لكنه ما يشتغل، ويُرسل لهم رسالة للتواصل معك.</div>\n<div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px\"><input id=\"q\" placeholder=\"بحث بالاسم أو الـ ID أو الملاحظة\" style=\"flex:1;min-width:200px\"><span class=\"f\" id=\"flt\"></span></div><div id=\"list\"></div></div>\n<div class=\"card\"><h3>⚙️ إعدادات الاشتراكات</h3><div class=\"ds\">إعدادات عامة لكل السيرفرات (سيرفراتك أنت مجانية دائماً).</div>\n<div class=\"two\"><div><label>تفعيل نظام الاشتراكات</label><div class=\"ds\">إذا أطفيته كل السيرفرات تشتغل بدون قيود.</div><select id=\"lcOn\"><option value=\"1\">مفعّل</option><option value=\"0\">متوقف</option></select></div>\n<div><label>السيرفر الجديد يبدأ</label><div class=\"ds\">متوقف حتى تفعّله أنت، أو تجربة مجانية.</div><select id=\"lcNew\"><option value=\"suspended\">متوقف حتى التفعيل</option><option value=\"trial\">تجربة مجانية</option></select></div>\n<div><label>أيام التجربة المجانية</label><div class=\"ds\">تُستخدم فقط إذا اخترت \"تجربة مجانية\".</div><input id=\"lcTrial\" type=\"number\" min=\"0\" max=\"365\"></div>\n<div><label>تنبيه قبل الانتهاء (أيام)</label><div class=\"ds\">يرسل البوت تذكير لصاحب السيرفر قبل انتهاء اشتراكه (0 = بدون).</div><input id=\"lcNotify\" type=\"number\" min=\"0\" max=\"30\"></div>\n<div><label>مغادرة تلقائية بعد الإيقاف (أيام)</label><div class=\"ds\">يطلع البوت من السيرفر المتوقف بعد هذه المدة (0 = يبقى دائماً).</div><input id=\"lcLeave\" type=\"number\" min=\"0\" max=\"365\"></div>\n<div><label>طريقة التواصل معك</label><div class=\"ds\">تظهر لهم في رسالة الإيقاف (مثل: يوزرك أو رابط حسابك).</div><input id=\"lcContact\" placeholder=\"@username\"></div></div>\n<label>رسالة الإيقاف</label><div class=\"ds\">النص اللي يظهر في السيرفر لما يتوقف اشتراكه.</div><textarea id=\"lcMsg\" placeholder=\"انتهى اشتراك البوت، للتجديد تواصل معي\"></textarea><div style=\"margin-top:10px\"><button id=\"lcSave\">حفظ الإعدادات</button></div></div>\n<div class=\"card\"><h3>🔗 رابط دعوة البوت</h3><div class=\"ds\">الرابط الوحيد لإضافة البوت لأي سيرفر. أعطه للمشتري فقط، وكل سيرفر جديد يوصلك تنبيه به.</div><div class=\"two\" style=\"grid-template-columns:1fr auto\"><input id=\"inv\" readonly onclick=\"this.select()\"><button class=\"g\" id=\"cp\">نسخ</button></div></div>\n<div class=\"card\"><h3>📢 رسالة جماعية</h3><div class=\"ds\">ترسل إعلان لسيرفرات البوت (قناة اللوج أو أول قناة متاحة) + رسالة خاصة لصاحب السيرفر.</div>\n<select id=\"bcS\"><option value=\"all\">كل السيرفرات</option><option value=\"active\">النشطة فقط</option><option value=\"stopped\">المتوقفة والمنتهية</option></select><label>النص</label><textarea id=\"bcT\"></textarea><div style=\"margin-top:10px\"><button id=\"bcSend\">إرسال</button></div></div>\n<div class=\"card\"><h3>🚫 قائمة السيرفرات المحظورة</h3><div class=\"ds\">أي سيرفر هنا يطلع منه البوت فوراً ولا يقدر يدخله مرة ثانية.</div><div class=\"two\" style=\"grid-template-columns:1fr auto\"><input id=\"blId\" placeholder=\"ID السيرفر\"><button id=\"blAdd\">حظر</button></div><div id=\"bl\" style=\"margin-top:8px\"></div></div>\n<div id=\"toast\"></div>\n<script>\nconst $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));\nconst api=async(p,b)=>{try{const r=await fetch(p,{method:b?'POST':'GET',headers:{'Content-Type':'application/json'},body:b?JSON.stringify(b):undefined});return await r.json()}catch(e){return{}}};\nconst toast=m=>{const t=$('#toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2200)};\nconst BD={active:['نشط','#2ecc71'],suspended:['متوقف','#ff4d6d'],expired:['منتهي','#f39c12'],free:['مجاني (سيرفرك)','#8b2fe8']};\nlet D,F='all',Q='';\nconst fmt=t=>t?new Date(t).toLocaleDateString('ar-SA'):'بدون انتهاء';\nfunction card(x){const b=BD[x.status],left=x.until?Math.ceil((x.until-Date.now())/864e5):null;\nreturn `<div class=\"card\"><div class=\"srv\"><img src=\"${x.icon||'/logo.webp'}\"><div class=\"i\"><b>${esc(x.name)}</b><span class=\"b\" style=\"background:${b[1]}\">${b[0]}</span>\n<div class=\"mu\">ID: ${x.id} • ${x.members} عضو • مالك السيرفر: ${x.ownerId}</div>\n<div class=\"mu\">الاشتراك: ${esc(x.plan||'—')} • ينتهي: ${fmt(x.until)}${left!==null&&x.status==='active'?` (باقي ${left} يوم)`:''}</div>\n<div class=\"mu\">${(x.hist||[]).map(h=>esc(h.a)+' '+fmt(h.t)).join(' ← ')}</div></div></div>\n<div class=\"two\"><input class=\"plan\" data-id=\"${x.id}\" placeholder=\"اسم الباقة\" value=\"${esc(x.plan||'')}\"><input class=\"note\" data-id=\"${x.id}\" placeholder=\"ملاحظة (اسم المشتري، رقم...)\" value=\"${esc(x.note||'')}\"></div>\n<div class=\"act\"><button data-a=\"extend\" data-d=\"30\" data-id=\"${x.id}\" title=\"يمدد الاشتراك 30 يوم من تاريخ الانتهاء\">+30 يوم</button><button data-a=\"extend\" data-d=\"90\" data-id=\"${x.id}\">+90 يوم</button><button data-a=\"extend\" data-d=\"365\" data-id=\"${x.id}\">+سنة</button>\n<button class=\"g\" data-a=\"custom\" data-id=\"${x.id}\" title=\"تحدد عدد الأيام\">+ مخصص</button><button class=\"g\" data-a=\"activate\" data-d=\"0\" data-id=\"${x.id}\" title=\"يفعّل بدون تاريخ انتهاء\">تفعيل دائم</button>\n<button class=\"d\" data-a=\"suspend\" data-id=\"${x.id}\" title=\"يوقف عمل البوت في السيرفر مع بقائه فيه\">إيقاف</button><button class=\"g\" data-a=\"open\" data-id=\"${x.id}\" title=\"يفتح لوحة تحكم هذا السيرفر\">فتح اللوحة</button><button class=\"d\" data-a=\"leave\" data-id=\"${x.id}\" title=\"يخرج البوت من السيرفر\">مغادرة</button></div></div>`}\nfunction draw(){const R=D.rows,n=s=>R.filter(x=>x.status===s).length,soon=R.filter(x=>x.status==='active'&&x.until&&x.until-Date.now()<7*864e5).length;\n$('#stats').innerHTML=[['إجمالي السيرفرات',R.length],['نشطة',n('active')+n('free')],['متوقفة',n('suspended')],['منتهية',n('expired')],['تنتهي خلال 7 أيام',soon],['إجمالي الأعضاء',R.reduce((a,x)=>a+x.members,0)]].map(([t,v])=>`<div class=\"card\" style=\"margin:0\"><div class=\"mu\">${t}</div><div class=\"n\">${v}</div></div>`).join('');\n$('#flt').innerHTML=[['all','الكل'],['active','نشط'],['suspended','متوقف'],['expired','منتهي']].map(([k,t])=>`<button class=\"g ${F===k?'on':''}\" data-f=\"${k}\">${t}</button>`).join(' ');\n$('#list').innerHTML=R.filter(x=>(F==='all'||x.status===F)&&(!Q||(x.name+x.id+(x.note||'')).toLowerCase().includes(Q))).map(card).join('')||'<p class=\"mu\">لا نتائج</p>';\n$('#bl').innerHTML=D.bl.map(id=>`<span class=\"tag\">${esc(id)} <b style=\"cursor:pointer;color:#ff4d6d\" data-bl=\"${id}\">✕</b></span>`).join('')||'<span class=\"mu\">فارغة</span>'}\nasync function load(first){D=await api('/api/owner/state');if(D.error){document.body.innerHTML='<p style=\"padding:60px;text-align:center\">هذه الصفحة للمالك فقط</p>';return}\nif(first){const L=D.lic;$('#lcOn').value=L.on?'1':'0';$('#lcNew').value=L.newServers;$('#lcTrial').value=L.trialDays;$('#lcNotify').value=L.notifyDays;$('#lcLeave').value=L.leaveDays;$('#lcContact').value=L.contact||'';$('#lcMsg').value=L.msg||'';$('#inv').value=D.invite}draw()}\ndocument.addEventListener('click',async e=>{const t=e.target,a=t.dataset.a,id=t.dataset.id;\nif(t.dataset.f){F=t.dataset.f;draw();return}\nif(t.dataset.bl){await api('/api/owner/blacklist',{id:t.dataset.bl,add:false});load();return}\nif(!a)return;\nif(a==='open'){location.href='/select/'+id;return}\nif(a==='leave'){if(confirm('إخراج البوت من هذا السيرفر؟')){const r=await api('/api/owner/leave',{id});toast(r.ok?'✅ تم':'فشل');load()}return}\nif(a==='suspend'&&!confirm('إيقاف البوت في هذا السيرفر؟ (يبقى فيه لكنه ما يشتغل)'))return;\nlet d=+t.dataset.d||0;if(a==='custom'){d=+prompt('كم يوم؟','30');if(!d)return}\nconst r=await api('/api/owner/sub',{id,action:a==='custom'?'extend':a,days:d});toast(r.ok?'✅ تم وأُبلغ السيرفر':r.msg||'فشل');load()});\ndocument.addEventListener('change',async e=>{const t=e.target;if(t.classList.contains('note')||t.classList.contains('plan')){const id=t.dataset.id,c=t.closest('.card');const r=await api('/api/owner/sub',{id,action:'note',note:c.querySelector('.note').value,plan:c.querySelector('.plan').value});toast(r.ok?'✅ حُفظت':'فشل')}});\n$('#q').oninput=e=>{Q=e.target.value.toLowerCase();draw()};\n$('#cp').onclick=()=>{$('#inv').select();document.execCommand('copy');toast('✅ نُسخ الرابط')};\n$('#lcSave').onclick=async()=>{const r=await api('/api/owner/settings',{on:$('#lcOn').value==='1',newServers:$('#lcNew').value,trialDays:+$('#lcTrial').value,notifyDays:+$('#lcNotify').value,leaveDays:+$('#lcLeave').value,contact:$('#lcContact').value,msg:$('#lcMsg').value});toast(r.ok?'✅ حُفظت الإعدادات':'فشل')};\n$('#bcSend').onclick=async()=>{if(!$('#bcT').value.trim())return toast('اكتب النص');if(!confirm('إرسال الرسالة؟'))return;const r=await api('/api/owner/broadcast',{target:$('#bcS').value,text:$('#bcT').value});toast(r.ok?`✅ أُرسلت لـ ${r.n} سيرفر`:'فشل')};\n$('#blAdd').onclick=async()=>{const id=$('#blId').value.trim();if(!/^\\d{15,22}$/.test(id))return toast('ID غير صحيح');await api('/api/owner/blacklist',{id,add:true});$('#blId').value='';load()};\nload(true);setInterval(()=>load(false),60000);\n</script></body></html>\n","view.html":"<!DOCTYPE html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"UTF-8\"><meta name=\"robots\" content=\"noindex,nofollow\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Systemix | عرض النسخة</title><link rel=\"icon\" href=\"/logo.webp\">\n<style>*{box-sizing:border-box;margin:0;font-family:Tahoma,sans-serif}body{background:radial-gradient(800px 400px at 80% -10%,#3b0f73aa,transparent),#07040d;color:#f1e9ff;padding:22px;max-width:1000px;margin:auto}\nheader{display:flex;align-items:center;gap:12px;margin-bottom:18px}header img{width:48px}.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px}\n.c{background:#120a1f;border:1px solid #2a1646;border-radius:16px;padding:16px}h3{margin-bottom:10px;color:#b46bff}.r{padding:7px 0;border-bottom:1px solid #2a1646;font-size:14px;display:flex;gap:8px;align-items:center}\n.d{width:12px;height:12px;border-radius:50%;flex:none}.m{color:#a592c4;font-size:12px}.cat{margin-top:10px;font-weight:700;color:#d9c2ff}.tg{background:#ff4d6d33;color:#ff8da1;border-radius:8px;padding:1px 6px;font-size:11px}</style></head>\n<body><header><img src=\"/logo.webp\"><div><h2 id=\"t\">جاري التحميل...</h2><div class=\"m\" id=\"s\"></div></div></header><div class=\"g\"><div class=\"c\"><h3>🎭 الرتب</h3><div id=\"roles\"></div></div><div class=\"c\"><h3>💬 الرومات</h3><div id=\"chs\"></div></div></div>\n<script>const e=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));\nfetch('/api/backup/'+location.pathname.split('/').pop()).then(r=>r.json()).then(b=>{if(b.error){document.body.innerHTML='<p style=\"padding:40px;text-align:center\">غير مصرّح، افتح رابط الدخول من البوت</p>';return}\nt.textContent='نسخة '+new Date(b.date).toLocaleString('ar-SA');s.textContent=b.roles.length+' رتبة • '+b.channels.length+' روم';\nroles.innerHTML=b.roles.map(r=>`<div class=\"r\"><span class=\"d\" style=\"background:${r.color?'#'+r.color.toString(16).padStart(6,'0'):'#99aab5'}\"></span>${e(r.name)}${r.admin?' <span class=\"tg\">Admin</span>':''}</div>`).join('')||'<span class=\"m\">لا رتب</span>';\nconst ic=x=>x.type==2?'🔊':'#';const cats=b.channels.filter(x=>x.type==4);const row=x=>`<div class=\"r\">${ic(x)} ${e(x.name)}${x.topic?`<span class=\"m\">— ${e(x.topic)}</span>`:''}</div>`;\nlet o=b.channels.filter(x=>x.type!=4&&!x.parent).map(row).join('');cats.forEach(k=>{o+=`<div class=\"cat\">📁 ${e(k.name)}</div>`+b.channels.filter(x=>x.type!=4&&x.parent===k.name).map(row).join('')});chs.innerHTML=o||'<span class=\"m\">لا رومات</span>'});</script></body></html>"};
const FEATURES = {
  "bin": (() => {
    const module = { exports: {} };
/** سلة الاستعادة: آخر 50 روم/رتبة محذوفة قابلة للاسترجاع من لوحة التحكم. */
module.exports = (ctx) => {
  const { client, app, auth, cfg, save, rid, chanSnap, chanOpts, discord: { ChannelType: T } } = ctx;
  const KINDS = [T.GuildText, T.GuildVoice, T.GuildCategory];

  function add(g, kind, d) {
    const c = cfg(g.id);
    const entry = { id: rid().slice(0, 8), kind, at: Date.now(), d };
    (c.bin ??= []).unshift(entry);
    c.bin.length = Math.min(c.bin.length, 50);
    save();
    return entry;
  }
  client.on('channelDelete', (c) => {
    if (c.guild && KINDS.includes(c.type) && !ctx.tvGone?.has(c.id)) return ctx.autoRestore?.(c.guild, 'ch', add(c.guild, 'ch', chanSnap(c.guild, c)));
  });
  client.on('roleDelete', (r) => {
    if (!r.managed) return ctx.autoRestore?.(r.guild, 'role', add(r.guild, 'role', { name: r.name, color: r.color, hoist: r.hoist, perms: r.permissions.bitfield.toString(), sens: ctx.DANGER.some((p) => r.permissions.has(p)) }));
  });

  app.post('/api/bin/restore', auth, async (req, res) => {
    const g = req.g, c = cfg(g.id), e = (c.bin || []).find((x) => x.id === req.body.id);
    if (!e) return res.json({ ok: false, msg: 'غير موجود' });
    try {
      if (e.kind === 'ch') {
        const parent = e.d.parent && g.channels.cache.find((y) => y.name === e.d.parent && y.type === T.GuildCategory);
        await g.channels.create(chanOpts(g, e.d, parent));
      } else await g.roles.create({ name: e.d.name, color: e.d.color, hoist: e.d.hoist, permissions: BigInt(e.d.perms) });
      c.bin = c.bin.filter((x) => x.id !== e.id);
      save();
      ctx.addDlog?.(g, ctx.who(req), `استعادة ${e.kind === 'ch' ? 'روم' : 'رتبة'} من السلة: ${e.d.name}`);
      res.json({ ok: true });
    } catch { res.json({ ok: false, msg: 'فشل الاسترجاع: تأكد من صلاحيات البوت' }); }
  });
  app.post('/api/bin/delete', auth, (req, res) => { const c = cfg(req.g.id); c.bin = (c.bin || []).filter((x) => x.id !== req.body.id); save(); res.json({ ok: true }); });
  app.post('/api/bin/clear', auth, (req, res) => { cfg(req.g.id).bin = []; save(); res.json({ ok: true }); });
};

    return module.exports;
  })(),
  "commands": (() => {
    const module = { exports: {} };
/** أوامر الإدارة السريعة (Slash Commands): ban, kick, timeout, warn, clear, lock, ... */
module.exports = (ctx) => {
  const { client, cfg, save, discord: { SlashCommandBuilder: S, PermissionFlagsBits: P, EmbedBuilder } } = ctx;
  const handlers = {}, perms = {};
  const user = (o, req = true) => o.addUserOption((x) => x.setName('user').setDescription('العضو').setRequired(req));
  const text = (o, n, d, req = false) => o.addStringOption((x) => x.setName(n).setDescription(d).setRequired(req));
  const int = (o, n, d, min, max, req = false) => o.addIntegerOption((x) => x.setName(n).setDescription(d).setMinValue(min).setMaxValue(max).setRequired(req));

  function def(name, desc, perm, build, fn) {
    const b = new S().setName(name).setDescription(desc);
    if (perm) b.setDefaultMemberPermissions(perm);
    build?.(b);
    ctx.cmds.push(b.toJSON());
    handlers[name] = fn;
    perms[name] = perm;
  }
  const say = (i, content, ephemeral = true) => i.reply({ content, ...(ephemeral ? { flags: 64 } : {}) });
  /** المشرف لازم رتبته أعلى من رتبة العضو، ولا يمس المالك ولا البوت. */
  const allowed = (i, t) => t && t.id !== i.guild.ownerId && t.id !== client.user.id && (i.guild.ownerId === i.user.id || i.member.roles.highest.position > t.roles.highest.position);
  const done = (i, type, id, why) => { ctx.addAct(i.guild, type, id, `${i.user.username}: ${why}`); };
  const dm = async (i, t, what, why) => { if (cfg(i.guild.id).ui?.dmPunish) await t.send?.(`⚠️ ${what} في **${i.guild.name}**\nالسبب: ${why}`).catch(() => {}); };
  const fetchM = (i, u) => i.guild.members.fetch(u.id).catch(() => null);

  def('ban', 'حظر عضو', P.BanMembers, (b) => text(user(b), 'reason', 'السبب'), async (i) => {
    const u = i.options.getUser('user'), why = i.options.getString('reason') || 'بدون سبب', m = await fetchM(i, u);
    if (m && !allowed(i, m)) return say(i, '⛔ ما تقدر تحظر هذا العضو (رتبته أعلى منك أو مساوية).');
    await dm(i, u, 'تم حظرك', why);
    await i.guild.members.ban(u.id, { reason: why });
    done(i, 'ban', u.id, why);
    say(i, `🔨 تم حظر <@${u.id}> — ${why}`, false);
  });
  def('unban', 'فك حظر', P.BanMembers, (b) => text(b, 'id', 'ID العضو', true), async (i) => {
    await i.guild.members.unban(i.options.getString('id'));
    done(i, 'unban', i.options.getString('id'), 'فك حظر');
    say(i, '♻️ تم فك الحظر', false);
  });
  def('kick', 'طرد عضو', P.KickMembers, (b) => text(user(b), 'reason', 'السبب'), async (i) => {
    const u = i.options.getUser('user'), why = i.options.getString('reason') || 'بدون سبب', m = await fetchM(i, u);
    if (!m) return say(i, '⛔ العضو غير موجود في السيرفر.');
    if (!allowed(i, m)) return say(i, '⛔ ما تقدر تطرد هذا العضو (رتبته أعلى منك أو مساوية).');
    await dm(i, u, 'تم طردك', why);
    await m.kick(why);
    done(i, 'kick', u.id, why);
    say(i, `👢 تم طرد <@${u.id}> — ${why}`, false);
  });
  def('timeout', 'كتم عضو مؤقتاً', P.ModerateMembers, (b) => text(int(user(b), 'minutes', 'المدة بالدقائق', 1, 40320, true), 'reason', 'السبب'), async (i) => {
    const u = i.options.getUser('user'), mins = i.options.getInteger('minutes'), why = i.options.getString('reason') || 'بدون سبب', m = await fetchM(i, u);
    if (!m) return say(i, '⛔ العضو غير موجود في السيرفر.');
    if (!allowed(i, m)) return say(i, '⛔ ما تقدر تكتم هذا العضو (رتبته أعلى منك أو مساوية).');
    await dm(i, u, `تم كتمك ${mins} دقيقة`, why);
    await m.timeout(mins * 60000, why);
    done(i, 'timeout', u.id, `${mins}د — ${why}`);
    say(i, `🔇 تم كتم <@${u.id}> ${mins} دقيقة`, false);
  });
  def('untimeout', 'فك الكتم', P.ModerateMembers, (b) => user(b), async (i) => {
    const m = await fetchM(i, i.options.getUser('user'));
    if (!m) return say(i, '⛔ العضو غير موجود في السيرفر.');
    await m.timeout(null);
    done(i, 'untimeout', m.id, 'فك كتم');
    say(i, '🔊 تم فك الكتم', false);
  });
  def('warn', 'تحذير عضو', P.ModerateMembers, (b) => text(user(b), 'reason', 'السبب', true), async (i) => {
    const u = i.options.getUser('user'), why = i.options.getString('reason'), c = cfg(i.guild.id), ui = c.ui || {}, m = await fetchM(i, u);
    const w = ((c.warns ??= {})[u.id] ??= []);
    w.push({ r: why, at: Date.now() });
    await dm(i, u, 'تحذير', why);
    let extra = '';
    if (w.length >= (ui.warnMax || 3) && m && allowed(i, m)) {
      const act = ui.warnAct || 'timeout';
      if (act === 'ban') await i.guild.members.ban(u.id, { reason: 'تحذيرات متكررة' });
      else if (act === 'kick') await m.kick('تحذيرات متكررة');
      else await m.timeout((ui.muteMin || 60) * 60000, 'تحذيرات متكررة');
      c.warns[u.id] = [];
      extra = ` — بلغ الحد وتم تنفيذ العقوبة (${act})`;
    }
    save();
    done(i, 'warn', u.id, why);
    say(i, `⚠️ تم تحذير <@${u.id}> — ${why}${extra}`, false);
  });
  def('warnings', 'عرض تحذيرات عضو', P.ModerateMembers, (b) => user(b), async (i) => {
    const u = i.options.getUser('user'), w = cfg(i.guild.id).warns?.[u.id] || [];
    say(i, w.length ? `⚠️ تحذيرات <@${u.id}>:\n` + w.map((x, n) => `${n + 1}. ${x.r}`).join('\n') : 'لا توجد تحذيرات.');
  });
  def('clear', 'مسح رسائل', P.ManageMessages, (b) => int(b, 'amount', 'عدد الرسائل (1-100)', 1, 100, true), async (i) => {
    await i.channel.bulkDelete(i.options.getInteger('amount'), true);
    done(i, 'clear', null, `مسح ${i.options.getInteger('amount')} رسالة في #${i.channel.name}`);
    say(i, '🧹 تم المسح');
  });
  def('lock', 'قفل الروم الحالي', P.ManageChannels, null, async (i) => { await i.channel.permissionOverwrites.edit(i.guild.roles.everyone, { SendMessages: false }); say(i, '🔒 تم قفل الروم', false); });
  def('unlock', 'فتح الروم الحالي', P.ManageChannels, null, async (i) => { await i.channel.permissionOverwrites.edit(i.guild.roles.everyone, { SendMessages: null }); say(i, '🔓 تم فتح الروم', false); });
  def('slowmode', 'سلو مود للروم', P.ManageChannels, (b) => int(b, 'seconds', 'الثواني (0 = إيقاف)', 0, 21600, true), async (i) => { await i.channel.setRateLimitPerUser(i.options.getInteger('seconds')); say(i, '🐢 تم ضبط السلو مود', false); });

  def('userinfo', 'معلومات عضو', null, (b) => user(b, false), async (i) => {
    const u = i.options.getUser('user') || i.user, m = await fetchM(i, u);
    const e = new EmbedBuilder().setTitle(u.username).setColor(0x8b2fe8).setThumbnail(u.displayAvatarURL?.()).setDescription(
      `🆔 ${u.id}\n📅 أنشئ الحساب: <t:${Math.floor(u.createdTimestamp / 1000)}:R>\n${m ? `📥 دخل السيرفر: <t:${Math.floor(m.joinedTimestamp / 1000)}:R>\n🎭 أعلى رتبة: ${m.roles.highest}` : ''}\n⚠️ التحذيرات: ${(cfg(i.guild.id).warns?.[u.id] || []).length}`);
    i.reply({ embeds: [e] });
  });
  def('serverinfo', 'معلومات السيرفر', null, null, async (i) => {
    const g = i.guild, e = new EmbedBuilder().setTitle(g.name).setColor(0x8b2fe8).setThumbnail(g.iconURL?.()).setDescription(
      `👑 المالك: <@${g.ownerId}>\n👥 الأعضاء: ${g.memberCount}\n📁 الرومات: ${g.channels.cache.size}\n🎭 الرتب: ${g.roles.cache.size}\n💎 البوستات: ${g.premiumSubscriptionCount || 0}\n📅 أنشئ: <t:${Math.floor(g.createdTimestamp / 1000)}:R>`);
    i.reply({ embeds: [e] });
  });
  def('avatar', 'صورة عضو', null, (b) => user(b, false), async (i) => { const u = i.options.getUser('user') || i.user; i.reply({ content: u.displayAvatarURL({ size: 1024 }) }); });
  def('ping', 'سرعة البوت', null, null, async (i) => say(i, `🏓 ${client.ws.ping}ms`));
  def('help', 'قائمة الأوامر', null, null, async (i) => say(i,
    '**🔨 الإدارة:** /ban /unban /kick /timeout /untimeout /warn /warnings /clear /lock /unlock /slowmode\n**ℹ️ عام:** /userinfo /serverinfo /avatar /rank /ping\n**⚙️ الإعداد:** /dashboard (لوحة التحكم) /setup /whitelist /panic /backup /ticketpanel'));

  client.on('interactionCreate', async (i) => {
    if (!i.guild || !i.isChatInputCommand() || !handlers[i.commandName]) return;
    const need = perms[i.commandName];
    if (need && !i.memberPermissions?.has(need)) return say(i, '⛔ ما عندك صلاحية لهذا الأمر.');
    try { await handlers[i.commandName](i); }
    catch { if (!i.replied && !i.deferred) say(i, '❌ فشل التنفيذ: تأكد أن رتبة البوت أعلى من العضو وأن عنده الصلاحيات.').catch(() => {}); }
  });
};

    return module.exports;
  })(),
  "logs": (() => {
    const module = { exports: {} };
/**
 * سجلات الأحداث (اللوقات).
 * كل حدث له مفتاح ويُضبط من لوحة التحكم عبر ui.lg[key] = { on, ch, t, d, c }:
 *   on = تشغيل، ch = قناة خاصة بالحدث، t/d/c = عنوان/نص/لون مخصص ({details} = تفاصيل الحدث).
 */
module.exports = (ctx) => {
  const { client, cfg, discord: { EmbedBuilder, AuditLogEvent: A } } = ctx;

  const DELAY = +(process.env.AUDIT_DELAY_MS ?? 800); // سجل التدقيق يتأخر قليلاً عن الحدث
  /** audit = { type, target } لإضافة الفاعل (من سجل التدقيق) لرسالة اللوق. */
  async function logE(g, key, title, desc, dflt = 0x7f8c8d, audit = null) {
    const ui = cfg(g.id).ui || {}, e = ui.lg?.[key];
    if (ui.on === false || e?.on !== true) return;
    const id = e.ch || ui.evCh || cfg(g.id).log, ch = id && g.channels.cache.get(id);
    if (!ch) return;
    if (audit) {
      if (DELAY) await new Promise((r) => setTimeout(r, DELAY));
      const a = await ctx.lastAudit(g, audit.type);
      if (a?.executor && (!audit.target || a.target?.id === audit.target)) desc += `\n👮 الفاعل: <@${a.executor.id}>`;
    }
    const text = e.d ? String(e.d).replace(/{details}/g, desc) : desc;
    ch.send({ embeds: [new EmbedBuilder().setTitle(String(e.t || title).slice(0, 250)).setDescription(String(text).slice(0, 3500)).setColor(ctx.color(e.c, dflt)).setTimestamp()] }).catch(() => {});
  }
  ctx.logE = logE;

  const names = (c) => c.map((r) => r.name).join('، ') || '—';
  const G = 0x2ecc71, R = 0xe74c3c, Y = 0xf1c40f, O = 0xe67e22, B = 0x3498db;

  // الرسائل
  client.on('messageDelete', (m) => {
    if (!m.guild || m.author?.bot) return;
    logE(m.guild, 'msgdel', '🗑️ رسالة محذوفة', `<#${m.channelId}> — ${m.author ? `<@${m.author.id}>` : 'غير معروف'}\n${m.content || '(غير محفوظة)'}`, R);
  });
  client.on('messageUpdate', (o, n) => {
    if (!n.guild || n.partial || o.partial || n.author?.bot || o.content === n.content) return;
    logE(n.guild, 'msgedit', '✏️ تعديل رسالة', `<#${n.channelId}> — <@${n.author.id}>\nقبل: ${o.content}\nبعد: ${n.content}`, Y);
  });

  // الأعضاء
  client.on('guildMemberAdd', (m) => logE(m.guild, 'join', '📥 دخول عضو', `<@${m.id}> (${m.user.username})`, G));
  client.on('guildMemberRemove', (m) => logE(m.guild, 'leave', '📤 خروج عضو', `${m.user.username} (${m.id})`, O, { type: A.MemberKick, target: m.id }));
  client.on('guildBanAdd', (b) => logE(b.guild, 'ban', '🔨 حظر', `${b.user.username} (${b.user.id})`, R, { type: A.MemberBanAdd, target: b.user.id }));
  client.on('guildBanRemove', (b) => logE(b.guild, 'unban', '♻️ فك حظر', `${b.user.username} (${b.user.id})`, B, { type: A.MemberBanRemove, target: b.user.id }));
  client.on('guildMemberUpdate', (o, n) => {
    if (o.partial) return;
    const g = n.guild;
    if (o.nickname !== n.nickname) logE(g, 'nick', '🏷️ تغيير لقب', `<@${n.id}>: ${o.nickname || '—'} ← ${n.nickname || '—'}`, 0x7f8c8d, { type: A.MemberUpdate, target: n.id });
    const add = n.roles.cache.filter((r) => !o.roles.cache.has(r.id)), rem = o.roles.cache.filter((r) => !n.roles.cache.has(r.id));
    if (add.size || rem.size) logE(g, 'mrole', '🎭 تغيير رتب عضو', `<@${n.id}>\n➕ ${names(add)}\n➖ ${names(rem)}`, B, { type: A.MemberRoleUpdate, target: n.id });
    if (o.communicationDisabledUntilTimestamp !== n.communicationDisabledUntilTimestamp) {
      const until = n.communicationDisabledUntilTimestamp;
      logE(g, 'timeout', '🔇 كتم مؤقت', `<@${n.id}>: ${until > Date.now() ? 'حتى ' + new Date(until).toLocaleString('ar-SA') : 'تم فك الكتم'}`, O);
    }
  });

  // الرومات
  client.on('channelCreate', (c) => c.guild && logE(c.guild, 'chcreate', '📁 إنشاء روم', `<#${c.id}> (${c.name})`, G, { type: A.ChannelCreate, target: c.id }));
  client.on('channelDelete', (c) => c.guild && logE(c.guild, 'chdelete', '🗑️ حذف روم', c.name, R, { type: A.ChannelDelete, target: c.id }));
  client.on('channelUpdate', (o, n) => {
    if (!n.guild) return;
    const d = [];
    if (o.name !== n.name) d.push(`الاسم: ${o.name} ← ${n.name}`);
    if (o.topic !== n.topic) d.push('تم تغيير الوصف');
    if ((o.rateLimitPerUser || 0) !== (n.rateLimitPerUser || 0)) d.push(`سلو مود: ${o.rateLimitPerUser || 0} ← ${n.rateLimitPerUser || 0}`);
    if (o.parentId !== n.parentId) d.push('تم نقل الروم لفئة أخرى');
    if (o.permissionOverwrites?.cache.size !== n.permissionOverwrites?.cache.size) d.push('تم تعديل الصلاحيات');
    if (d.length) logE(n.guild, 'chupdate', '🛠️ تعديل روم', `<#${n.id}>\n${d.join('\n')}`, Y, { type: A.ChannelUpdate, target: n.id });
  });

  // الرتب
  client.on('roleCreate', (r) => logE(r.guild, 'rolecreate', '🎭 إنشاء رتبة', r.name, G, { type: A.RoleCreate, target: r.id }));
  client.on('roleDelete', (r) => logE(r.guild, 'roledelete', '🗑️ حذف رتبة', r.name, R, { type: A.RoleDelete, target: r.id }));
  client.on('roleUpdate', (o, n) => {
    const d = [];
    if (o.name !== n.name) d.push(`الاسم: ${o.name} ← ${n.name}`);
    if (o.color !== n.color) d.push('تم تغيير اللون');
    if (o.permissions.bitfield !== n.permissions.bitfield) d.push('تم تعديل الصلاحيات');
    if (d.length) logE(n.guild, 'roleupdate', '🛠️ تعديل رتبة', `${n.name}\n${d.join('\n')}`, Y, { type: A.RoleUpdate, target: n.id });
  });

  // الصوت
  client.on('voiceStateUpdate', (o, n) => {
    if (!n.guild || o.channelId === n.channelId) return;
    if (!o.channelId) logE(n.guild, 'vjoin', '🔊 دخول روم صوتي', `<@${n.id}> ← <#${n.channelId}>`, G);
    else if (!n.channelId) logE(n.guild, 'vleave', '🔇 خروج من روم صوتي', `<@${n.id}> ← <#${o.channelId}>`, O);
    else logE(n.guild, 'vmove', '🔀 انتقال بين الرومات', `<@${n.id}>: <#${o.channelId}> ← <#${n.channelId}>`, B);
  });

  // السيرفر
  client.on('guildUpdate', (o, n) => {
    const d = [];
    if (o.name !== n.name) d.push(`الاسم: ${o.name} ← ${n.name}`);
    if (o.icon !== n.icon) d.push('تم تغيير الشعار');
    if (o.verificationLevel !== n.verificationLevel) d.push('تغيّر مستوى التحقق');
    if (d.length) logE(n, 'gupdate', '⚙️ تعديل إعدادات السيرفر', d.join('\n'), Y, { type: A.GuildUpdate });
  });
  client.on('emojiCreate', (e) => logE(e.guild, 'emojiadd', '😀 إضافة إيموجي', `${e} (${e.name})`, G, { type: A.EmojiCreate, target: e.id }));
  client.on('emojiDelete', (e) => logE(e.guild, 'emojidel', '🗑️ حذف إيموجي', e.name, R, { type: A.EmojiDelete, target: e.id }));
  client.on('inviteCreate', (i) => i.guild && logE(i.guild, 'invcreate', '🔗 إنشاء دعوة', `${i.code} — ${i.inviter ? `<@${i.inviter.id}>` : 'غير معروف'}`, G));
  client.on('inviteDelete', (i) => i.guild && logE(i.guild, 'invdelete', '🔗 حذف دعوة', i.code, R));
};

    return module.exports;
  })(),
  "shield": (() => {
    const module = { exports: {} };
/**
 * طبقات حماية إضافية:
 *  - تعديل/حذف رتبة حساسة (فيها صلاحيات خطيرة) بدون تصريح ← تراجع + عقوبة فورية.
 *  - استرجاع فوري للروم/الرتبة المحذوفة من سلة الاستعادة (بدون الحاجة لنسخة احتياطية).
 *  - فلتر الملفات الخطيرة، الإيموجي المفرطة، والرسائل المكررة.
 */
module.exports = (ctx) => {
  const { client, cfg, save, off, trusted, punishBy, threat, log, lastAudit, DANGER, chanOpts, discord: { AuditLogEvent: A, ChannelType: T } } = ctx;
  const sensitive = (role) => DANGER.some((p) => role.permissions.has(p));

  client.on('roleUpdate', async (o, n) => {
    const g = n.guild;
    if (off(g, 'role') || !sensitive(o)) return;
    if (o.name === n.name && o.color === n.color && o.hoist === n.hoist && o.permissions.bitfield === n.permissions.bitfield) return;
    const e = await lastAudit(g, A.RoleUpdate);
    if (!e || e.target?.id !== n.id || trusted(g, e.executor.id)) return;
    await n.edit({ name: o.name, color: o.color, hoist: o.hoist, permissions: o.permissions }).catch(() => {});
    await punishBy(g, e.executor.id, 'Sensitive role edit');
    log(g, '🛡️ تعديل رتبة حساسة', `<@${e.executor.id}> حاول تعديل **${o.name}**. تم التراجع والعقوبة.`, e.executor.id);
  });

  /** يُستدعى من bin.js بعد كل حذف: إذا الفاعل غير موثوق نرجّع العنصر فوراً. */
  ctx.autoRestore = async (g, kind, entry) => {
    if (off(g, 'restore')) return;
    const e = await lastAudit(g, kind === 'ch' ? A.ChannelDelete : A.RoleDelete, 8000);
    if (!e || trusted(g, e.executor.id)) return;
    const d = entry.d;
    let made = null;
    if (kind === 'ch') {
      const parent = d.parent && g.channels.cache.find((y) => y.name === d.parent && y.type === T.GuildCategory);
      made = await g.channels.create(chanOpts(g, d, parent)).catch(() => null);
    } else {
      made = await g.roles.create({ name: d.name, color: d.color, hoist: d.hoist, permissions: BigInt(d.perms) }).catch(() => null);
      if (d.sens) await punishBy(g, e.executor.id, 'Sensitive role delete');
    }
    if (made) {
      const c = cfg(g.id);
      c.bin = (c.bin || []).filter((x) => x.id !== entry.id);
      save();
      log(g, '♻️ استرجاع تلقائي', `تم استرجاع ${kind === 'ch' ? 'الروم' : 'الرتبة'} **${d.name}** بعد حذفها بواسطة <@${e.executor.id}>`, e.executor.id);
    }
  };

  const BAD_EXT = /\.(exe|scr|bat|cmd|com|pif|msi|jar|vbs|vbe|ps1|apk|dll|lnk|hta|reg|wsf)$/i;
  const dup = {};
  client.on('messageCreate', async (m) => {
    if (!m.guild || m.author.bot || !m.member) return;
    const g = m.guild, ui = cfg(g.id).ui || {};
    if (off(g, '_') || trusted(g, m.author.id)) return;
    const text = m.content || '';
    let why = null;
    if (!off(g, 'files') && [...(m.attachments?.values?.() || [])].some((a) => BAD_EXT.test(a.name || ''))) why = 'ملف خطير';
    if (!why && !off(g, 'emojis') && (text.match(/<a?:\w+:\d+>|\p{Extended_Pictographic}/gu) || []).length > (ui.maxEmojis || 10)) why = 'إيموجي مفرط';
    if (!why && !off(g, 'spam') && text.length > 3) {
      const k = g.id + m.author.id, now = Date.now(), a = (dup[k] = (dup[k] || []).filter((x) => now - x.t < 15000));
      a.push({ t: now, c: text });
      if (a.filter((x) => x.c === text).length >= 3) { dup[k] = []; why = 'رسائل مكررة'; }
    }
    if (!why) return;
    m.delete().catch(() => {});
    if (!DANGER.some((p) => m.member.permissions.has(p))) await m.member.timeout((ui.muteMin || 60) * 60000, why).catch(() => {});
    threat(g, 1, why);
    log(g, '🧹 فلتر المحتوى', `<@${m.author.id}>: ${why}`, m.author.id);
  });
};

    return module.exports;
  })(),
  "starboard": (() => {
    const module = { exports: {} };
/** لوحة النجوم: الرسالة اللي تجمع عدد معين من التفاعلات تُنشر في قناة مخصصة (ui.star). */
module.exports = (ctx) => {
  const { client, cfg, save, discord: { EmbedBuilder } } = ctx;

  client.on('messageReactionAdd', async (reaction, user) => {
    try {
      if (user.bot) return;
      if (reaction.partial) reaction = await reaction.fetch();
      const m = reaction.message.partial ? await reaction.message.fetch() : reaction.message;
      const g = m.guild;
      if (!g || ctx.off(g, '_')) return;
      const st = cfg(g.id).ui?.star;
      const emoji = st?.emoji || '⭐';
      if (!st?.on || !st.ch || m.channelId === st.ch || reaction.emoji.name !== emoji) return;

      const users = await reaction.users.fetch();
      const n = users.filter((u) => !u.bot && (st.self || u.id !== m.author?.id)).size;
      if (n < (+st.n || 3)) return;
      const ch = g.channels.cache.get(st.ch);
      if (!ch) return;

      const posts = (cfg(g.id).starPosts ??= {});
      const text = `${emoji} **${n}** | <#${m.channelId}>`;
      if (posts[m.id]) {
        const p = await ch.messages.fetch(posts[m.id]).catch(() => null);
        if (p) return void p.edit({ content: text }).catch(() => {});
      }
      const e = new EmbedBuilder().setColor(0xf1c40f).setTimestamp(m.createdAt)
        .setAuthor({ name: m.author?.username || 'مجهول', iconURL: m.author?.displayAvatarURL?.() })
        .setDescription(`${(m.content || '').slice(0, 3500)}\n\n[الانتقال للرسالة](${m.url})`);
      const img = m.attachments?.find((a) => a.contentType?.startsWith('image/'));
      if (img) e.setImage(img.url);
      const sent = await ch.send({ content: text, embeds: [e] });
      posts[m.id] = sent.id;
      const keys = Object.keys(posts);
      if (keys.length > 1000) delete posts[keys[0]];
      save();
    } catch { /* رسالة غير متاحة أو صلاحيات ناقصة */ }
  });
};

    return module.exports;
  })(),
  "statchannels": (() => {
    const module = { exports: {} };
/** رومات الإحصائيات: روم صوتي اسمه صيغة فيها متغيرات ({members} ...) ويتحدث كل 10 دقايق (ui.stats). */
module.exports = (ctx) => {
  const { client, app, auth, cfg, isActive, discord: { ChannelType: T, PermissionFlagsBits: P } } = ctx;

  const vars = (g) => ({
    members: g.memberCount, humans: g.members.cache.filter((m) => !m.user.bot).size, bots: g.members.cache.filter((m) => m.user.bot).size,
    channels: g.channels.cache.size, roles: g.roles.cache.size, boosts: g.premiumSubscriptionCount || 0,
  });

  async function update(g) {
    const list = cfg(g.id).ui?.stats;
    if (!Array.isArray(list)) return 0;
    const v = vars(g);
    let n = 0;
    for (const s of list.slice(0, 10)) {
      const ch = g.channels.cache.get(s.ch);
      if (!ch || !s.tpl) continue;
      const name = String(s.tpl).replace(/{(\w+)}/g, (m, k) => (k in v ? v[k] : m)).slice(0, 100);
      if (ch.name !== name) await ch.setName(name).then(() => n++, () => {});
    }
    return n;
  }
  ctx.updateStats = update;

  setInterval(() => client.guilds.cache.forEach((g) => { if (isActive(g) && !ctx.off(g, '_')) update(g); }), 10 * 60 * 1000).unref();

  app.post('/api/stats/update', auth, async (req, res) => res.json({ ok: true, n: await update(req.g) }));
  app.post('/api/stats/create', auth, async (req, res) => {
    const name = String(req.body.tpl || '👥 الأعضاء: {members}').replace(/{(\w+)}/g, (m, k) => (k in vars(req.g) ? vars(req.g)[k] : m)).slice(0, 100);
    const ch = await req.g.channels.create({ name, type: T.GuildVoice, permissionOverwrites: [{ id: req.g.id, deny: [P.Connect] }] }).catch(() => null);
    res.json(ch ? { ok: true, id: ch.id } : { ok: false, msg: 'فشل الإنشاء: تأكد من صلاحيات البوت' });
  });
};

    return module.exports;
  })(),
  "tempvoice": (() => {
    const module = { exports: {} };
/** رومات صوتية مؤقتة: دخول "روم الإنشاء" يُنشئ روماً خاصاً بالعضو ويُحذف عندما يفضى (ui.tv). */
module.exports = (ctx) => {
  const { client, cfg, save, discord: { ChannelType: T, PermissionFlagsBits: P } } = ctx;
  ctx.tvGone = new Set(); // رومات حذفها البوت نفسه (حتى لا تدخل سلة الاستعادة)

  client.on('voiceStateUpdate', async (o, n) => {
    const g = n.guild;
    if (!g || ctx.off(g, '_')) return;
    const c = cfg(g.id), tv = c.ui?.tv;

    if (tv?.on && tv.ch && n.channelId === tv.ch && n.member && !n.member.user.bot) {
      const name = String(tv.name || '🔊 {user}').replace(/{user}/g, n.member.displayName).slice(0, 90);
      const ch = await g.channels.create({
        name, type: T.GuildVoice, parent: tv.cat || n.channel?.parentId || undefined, userLimit: Math.max(0, +tv.limit || 0),
        permissionOverwrites: [{ id: n.member.id, allow: [P.ManageChannels, P.MoveMembers] }],
      }).catch(() => null);
      if (ch) {
        (c.tvc ??= []).push(ch.id);
        save();
        await n.member.voice.setChannel(ch).catch(() => {});
      }
    }

    if (o.channelId && c.tvc?.includes(o.channelId)) {
      const ch = g.channels.cache.get(o.channelId);
      if (!ch || ch.members.size === 0) {
        ctx.tvGone.add(o.channelId);
        c.tvc = c.tvc.filter((x) => x !== o.channelId);
        save();
        await ch?.delete('temp voice empty').catch(() => {});
      }
    }
  });
};

    return module.exports;
  })(),
  "tools": (() => {
    const module = { exports: {} };
/** أدوات لوحة التحكم: سجل الإجراءات، سجل اللوحة، الإمبد، المتصدرين، اسم البوت. */
module.exports = (ctx) => {
  const { app, auth, cfg, save, discord: { EmbedBuilder } } = ctx;
  const keep = (arr, n) => { if (arr.length > n) arr.length = n; };

  ctx.addAct = (g, type, uid, text) => {
    const c = cfg(g.id);
    (c.acts ??= []).unshift({ t: Date.now(), type: String(type).slice(0, 60), uid: uid || null, text: String(text || '').replace(/\*/g, '').slice(0, 300) });
    keep(c.acts, 200);
    save();
  };
  ctx.addDlog = (g, who, text) => {
    const c = cfg(g.id);
    (c.dlog ??= []).unshift({ t: Date.now(), who: String(who).slice(0, 60), text: String(text).slice(0, 300) });
    keep(c.dlog, 200);
    save();
  };

  app.post('/api/embed', auth, async (req, res) => {
    const b = req.body || {}, ch = req.g.channels.cache.get(b.channel);
    if (!ch?.isTextBased?.()) return res.json({ ok: false, msg: 'اختر قناة نصية' });
    const url = (u) => (/^https?:\/\//i.test(u || '') ? u : null);
    if (!b.title && !b.desc && !url(b.image)) return res.json({ ok: false, msg: 'اكتب عنواناً أو نصاً' });
    const e = new EmbedBuilder().setColor(ctx.color(b.color, 0x8b2fe8));
    if (b.title) e.setTitle(String(b.title).slice(0, 250));
    if (b.desc) e.setDescription(String(b.desc).slice(0, 4000));
    if (url(b.image)) e.setImage(url(b.image));
    if (url(b.thumb)) e.setThumbnail(url(b.thumb));
    if (b.footer) e.setFooter({ text: String(b.footer).slice(0, 200) });
    const sent = await ch.send({ embeds: [e] }).catch(() => null);
    if (sent) ctx.addDlog(req.g, ctx.who(req), `إرسال إمبد إلى #${ch.name}`);
    res.json({ ok: !!sent, msg: sent ? '' : 'فشل الإرسال: تأكد من صلاحيات البوت' });
  });

  app.get('/api/leaderboard', auth, async (req, res) => {
    const g = req.g, top = Object.entries(cfg(g.id).xp || {}).sort((a, b) => b[1] - a[1]).slice(0, 25);
    const mem = await g.members.fetch({ user: top.map(([id]) => id) }).catch(() => null);
    res.json(top.map(([id, xp]) => {
      const m = mem?.get?.(id) || g.members.cache.get(id);
      return { id, xp, level: Math.floor(0.1 * Math.sqrt(xp)), name: m?.displayName || m?.user?.username || id, avatar: m?.displayAvatarURL?.({ size: 64 }) || null };
    }));
  });

  app.post('/api/botnick', auth, async (req, res) => {
    try {
      await req.g.members.me.setNickname(String(req.body.nick || '').slice(0, 32) || null);
      ctx.addDlog(req.g, ctx.who(req), 'تغيير اسم البوت في السيرفر');
      res.json({ ok: true });
    } catch { res.json({ ok: false, msg: 'فشل: تأكد أن للبوت صلاحية تغيير الاسم' }); }
  });
};

    return module.exports;
  })(),
};
/**
 * Systemix — بوت ديسكورد للحماية والإدارة + لوحة تحكم ويب + نظام اشتراكات.
 * ترتيب الملف: تخزين ← اشتراكات ← أدوات ← حماية ← أحداث ← أوامر ← ويب ← ميزات (src/features/*).
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const discord = require('discord.js');
const {
  Client, GatewayIntentBits: I, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle,
  SlashCommandBuilder: S, PermissionFlagsBits: P, AuditLogEvent: A, ChannelType: T,
} = discord;

const read = (f) => ASSETS[f];
const ctx = {}; // سياق مشترك يُمرَّر لوحدات الميزات في src/features

const client = new Client({
  intents: [I.Guilds, I.GuildMembers, I.GuildModeration, I.GuildMessages, I.MessageContent, I.GuildWebhooks, I.GuildIntegrations, I.GuildVoiceStates,
    I.GuildInvites, I.GuildMessageReactions, I.GuildExpressions ?? I.GuildEmojisAndStickers],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// ---------- التخزين (ملف JSON بسيط) ----------
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });
const FILE = path.join(DATA_DIR, 'data.json');
const LEGACY = path.join(process.cwd(), 'data.json'); // ترحيل بيانات الإصدارات القديمة
if (!fs.existsSync(FILE) && fs.existsSync(LEGACY)) fs.copyFileSync(LEGACY, FILE);
let db = {};
try { db = JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { /* أول تشغيل */ }
let saveTimer = null;
const flush = () => { clearTimeout(saveTimer); saveTimer = null; fs.writeFileSync(FILE + '.tmp', JSON.stringify(db)); fs.renameSync(FILE + '.tmp', FILE); };
const save = () => { saveTimer ??= setTimeout(flush, 300); }; // حفظ مؤجل لتقليل الكتابة على القرص
process.on('exit', () => { if (saveTimer) flush(); });
for (const sg of ['SIGINT', 'SIGTERM']) process.on(sg, () => process.exit(0));
const cfg = (id) => (db[id] ??= { wl: [], log: null, welcome: null, nuke: true, lock: false, xp: {}, backup: null });

// ---------- نظام الاشتراكات (للمالك) ----------
// OWNER_ID يقبل ايدي واحد أو عدة ايديات مفصولة بفاصلة (كلهم مالكين)
const OWNERS = () => (process.env.OWNER_ID || '').split(/[\s,;]+/).filter(Boolean);
const isOwnerId = (id) => !!id && OWNERS().includes(String(id));
const OWNER = () => OWNERS().length > 0; // هل نظام المالكين/الاشتراكات مفعّل؟
const lic = () => (db.lic ??= { on: true, trialDays: 3, newServers: 'suspended', contact: '', msg: '', notifyDays: 3, leaveDays: 0 });
function subOf(g) {
  db.subs ??= {};
  let s = db.subs[g.id];
  if (!s) {
    const L = lic(), now = Date.now(), susp = L.newServers !== 'trial';
    s = db.subs[g.id] = { name: g.name, ownerId: g.ownerId, added: now, status: susp ? 'suspended' : 'active', until: !susp && L.trialDays ? now + L.trialDays * 864e5 : null,
      plan: !susp && L.trialDays ? 'تجريبي' : '—', note: '', hist: [{ t: now, a: susp ? 'أُضيف (بانتظار التفعيل)' : 'أُضيف (تجربة)' }] };
    save();
  }
  return s;
}
function isActive(g) {
  if (!g || !OWNER() || !lic().on || isOwnerId(g.ownerId)) return true;
  const s = subOf(g);
  return s.status === 'active' && (!s.until || s.until > Date.now());
}
function subInfo(g) {
  const L = lic();
  if (!OWNER() || !L.on || isOwnerId(g.ownerId)) return { active: true, free: true, days: null, status: 'free' };
  const s = subOf(g), act = isActive(g);
  return { active: act, free: false, status: act ? 'active' : s.status === 'suspended' ? 'suspended' : 'expired', until: s.until, plan: s.plan,
    days: s.until ? Math.max(0, Math.ceil((s.until - Date.now()) / 864e5)) : null, contact: L.contact, msg: L.msg };
}
const guildOf = (a) => { for (const x of a) { if (x && x.guild) return x.guild; if (x && x.ownerId && x.channels) return x; } return null; };
function denyInteraction(i) {
  const L = lic();
  if (!i?.isRepliable?.()) return;
  return i.reply({ content: `⛔ اشتراك البوت متوقف أو منتهي في هذا السيرفر.\n${L.msg || 'للتجديد تواصل مع مالك البوت.'}${L.contact ? '\n📩 ' + L.contact : ''}`, flags: 64 }).catch(() => {});
}
const _on = client.on.bind(client);
client.on = (ev, fn) => _on(ev, (...a) => {
  let g = null;
  try { g = guildOf(a); } catch {}
  if (g && !isActive(g)) return ev === 'interactionCreate' ? denyInteraction(a[0]) : undefined;
  return fn(...a);
});
const notifyOwner = (txt) => OWNERS().forEach((id) => client.users.fetch(id).then((u) => u.send(txt)).catch(() => {}));
async function notifyGuild(g, kind, extra = '') {
  const L = lic();
  const K = { suspended: ['⛔ تم إيقاف اشتراك البوت', 'البوت موجود في السيرفر لكنه متوقف عن العمل.'], pending: ['👋 تمت إضافة البوت', 'البوت بانتظار التفعيل من المالك قبل أن يبدأ العمل.'],
    expired: ['⌛ انتهى اشتراك البوت', 'البوت موجود لكنه متوقف عن العمل حتى التجديد.'], activated: ['✅ تم تفعيل اشتراك البوت', 'البوت يعمل الآن بكامل ميزاته.'],
    reminder: ['⏰ اشتراك البوت قارب على الانتهاء', 'جدّد قبل الانتهاء حتى لا يتوقف البوت.'], custom: ['📢 رسالة من مالك البوت', ''] }[kind];
  const tail = kind === 'activated' || kind === 'custom' ? '' : `\n\n${L.msg || 'للتجديد أو التفعيل تواصل مع مالك البوت.'}${L.contact ? '\n📩 ' + L.contact : ''}`;
  const e = new EmbedBuilder().setTitle(K[0]).setDescription(`${K[1]}${extra ? '\n' + extra : ''}${tail}`.trim()).setColor(kind === 'activated' || kind === 'custom' ? 0x2ecc71 : 0xe74c3c).setTimestamp();
  const id = cfg(g.id).log;
  const ch = (id && g.channels.cache.get(id)) || g.systemChannel || g.channels.cache.find((c) => c.type === T.GuildText && c.permissionsFor?.(g.members.me)?.has(P.SendMessages));
  await ch?.send({ embeds: [e] }).catch(() => {});
  const own = await g.fetchOwner().catch(() => null);
  await own?.send({ embeds: [e] }).catch(() => {});
}
async function checkSubs() {
  const L = lic(), now = Date.now();
  if (!OWNER() || !L.on) return;
  for (const g of client.guilds.cache.values()) {
    if (isOwnerId(g.ownerId)) continue;
    const s = subOf(g);
    if (s.status === 'active' && s.until) {
      if (s.until <= now && s.flag !== 'expired') { s.flag = 'expired'; s.stopped = s.until; (s.hist ??= []).push({ t: now, a: 'انتهى الاشتراك' }); save(); await notifyGuild(g, 'expired'); }
      else if (s.until > now && L.notifyDays && s.until - now <= L.notifyDays * 864e5 && !s.rem) { s.rem = true; save(); await notifyGuild(g, 'reminder', `ينتهي: ${new Date(s.until).toLocaleDateString('ar-SA')}`); }
    }
    if (L.leaveDays && !isActive(g) && now - (s.stopped || s.until || s.added) > L.leaveDays * 864e5) { (s.hist ??= []).push({ t: now, a: 'غادر تلقائياً' }); save(); await g.leave().catch(() => {}); }
  }
}
_on('guildCreate', (g) => {
  if (db.bl?.[g.id]) return void g.leave().catch(() => {});
  if (!OWNER()) return;
  subOf(g);
  notifyOwner(`🆕 انضم البوت لسيرفر **${g.name}** (${g.id}) — ${g.memberCount} عضو\nالحالة: ${isActive(g) ? 'نشط' : 'بانتظار تفعيلك من لوحة المالك'}`);
  if (!isActive(g)) notifyGuild(g, 'pending');
});
client.once('ready', () => {
  client.guilds.cache.forEach((g) => { if (db.bl?.[g.id]) g.leave().catch(() => {}); else if (OWNER()) subOf(g); });
  setTimeout(checkSubs, 20000);
});
setInterval(checkSubs, 10 * 60 * 1000);

// ---------- أدوات ----------
const recent = {};
async function log(g, title, desc, uid) {
  const stt = (cfg(g.id).stats ??= {});
  stt[title] = (stt[title] || 0) + 1;
  (recent[g.id] ??= []).unshift({ u: uid || null, at: Date.now(), t: title, d: desc.replace(/<@(\d+)>/g, '$1').replace(/\*/g, '') });
  if (recent[g.id].length > 50) recent[g.id].pop();
  if (uid) ctx.addAct?.(g, title, uid, desc);
  const pe = cfg(g.id).ui?.lg?.protect;
  if (pe?.on === false) return;
  const id = pe?.ch || cfg(g.id).log;
  const ch = id && g.channels.cache.get(id);
  if (!ch) return;
  const e = new EmbedBuilder().setTitle(title).setDescription(desc).setColor(0xe74c3c).setTimestamp();
  const components = uid
    ? [new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('ban:' + uid).setLabel('حظر').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('strip:' + uid).setLabel('عزل (سحب الرتب)').setStyle(ButtonStyle.Secondary))]
    : [];
  ch.send({ embeds: [e], components }).catch(() => {});
}

const trusted = (g, id) => id === client.user.id || id === g.ownerId || cfg(g.id).wl.includes(id);
const punish = (g, id, reason) => g.members.ban(id, { reason }).catch(() => {});

// ---------- Anti-Nuke ----------
const LIMIT = 3, WINDOW = 10000, hits = new Map();
async function guard(g, type, label, targetId) {
  if (!cfg(g.id).nuke || off(g, 'nuke') || off(g, KEY[label])) return;
  const ui = cfg(g.id).ui || {};
  const logs = await g.fetchAuditLogs({ type, limit: 1 }).catch(() => null);
  const e = logs?.entries.first();
  if (!e || Date.now() - e.createdTimestamp > 5000) return;
  if (targetId && e.target?.id !== targetId) return;
  const u = e.executor;
  if (!u || trusted(g, u.id) || seenE.has(e.id)) return;
  seenE.add(e.id); if (seenE.size > 500) seenE.clear();
  const k = g.id + u.id + label;
  const arr = (hits.get(k) || []).filter((t) => Date.now() - t < (ui.window || 10) * 1000);
  arr.push(Date.now());
  hits.set(k, arr);
  if (arr.length < (ui.limit || LIMIT)) return;
  hits.delete(k);
  await punishBy(g, u.id, 'Anti-Nuke: ' + label);
  log(g, '🚨 Anti-Nuke', `تم حظر <@${u.id}> بسبب: **${label}** (${ui.limit || LIMIT}+ خلال ${ui.window || 10} ثواني)`, u.id);
}

client.on('channelDelete', (c) => c.guild && guard(c.guild, A.ChannelDelete, 'حذف قنوات'));
client.on('roleDelete', (r) => guard(r.guild, A.RoleDelete, 'حذف رتب'));
client.on('guildBanAdd', (b) => guard(b.guild, A.MemberBanAdd, 'حظر جماعي'));
client.on('guildMemberRemove', (m) => guard(m.guild, A.MemberKick, 'طرد جماعي', m.id));

// ---------- حماية الويب هوك ----------
client.on('webhooksUpdate', async (ch) => {
  const g = ch.guild;
  if (!cfg(g.id).nuke || off(g, 'hook')) return;
  const logs = await g.fetchAuditLogs({ type: A.WebhookCreate, limit: 1 }).catch(() => null);
  const e = logs?.entries.first();
  if (!e || Date.now() - e.createdTimestamp > 5000 || trusted(g, e.executor.id)) return;
  const hooks = await ch.fetchWebhooks().catch(() => null);
  await hooks?.get(e.target.id)?.delete('Anti-Webhook').catch(() => {});
  log(g, '🪝 ويب هوك مشبوه', `تم حذف ويب هوك أنشأه <@${e.executor.id}>`, e.executor.id);
});

// ---------- Anti-Admin Escalation ----------
client.on('guildMemberUpdate', async (o, n) => {
  const g = n.guild;
  if (off(g, 'esc')) return;
  const gained = n.roles.cache.filter((r) => !o.roles.cache.has(r.id) && DANGER.some((p) => r.permissions.has(p)));
  if (!gained.size) return;
  const logs = await g.fetchAuditLogs({ type: A.MemberRoleUpdate, limit: 1 }).catch(() => null);
  const e = logs?.entries.first();
  if (!e || Date.now() - e.createdTimestamp > 5000 || trusted(g, e.executor.id)) return;
  await n.roles.remove(gained).catch(() => {});
  await punishBy(g, e.executor.id, 'Anti-Admin-Escalation');
  log(g, '⚠️ محاولة ترقية مشبوهة', `<@${e.executor.id}> حاول يعطي <@${n.id}> صلاحية Administrator. تم السحب والحظر.`, e.executor.id);
});

client.on('roleUpdate', async (o, n) => {
  if (!DANGER.some((p) => n.permissions.has(p) && !o.permissions.has(p))) return;
  const g = n.guild;
  if (off(g, 'esc')) return;
  const logs = await g.fetchAuditLogs({ type: A.RoleUpdate, limit: 1 }).catch(() => null);
  const e = logs?.entries.first();
  if (!e || Date.now() - e.createdTimestamp > 5000 || trusted(g, e.executor.id)) return;
  await n.setPermissions(o.permissions).catch(() => {});
  await punishBy(g, e.executor.id, 'Anti-Admin-Escalation');
  log(g, '⚠️ رتبة أخذت Administrator', `تم الرجوع للصلاحيات القديمة وحظر <@${e.executor.id}>`, e.executor.id);
});

// ---------- مراقبة الرابط المميز ----------
client.on('guildUpdate', async (o, n) => {
  if (o.vanityURLCode === n.vanityURLCode || off(n, 'vanity')) return;
  const logs = await n.fetchAuditLogs({ type: A.GuildUpdate, limit: 1 }).catch(() => null);
  const e = logs?.entries.first();
  const by = e && Date.now() - e.createdTimestamp < 5000 ? e.executor : null;
  if (by && trusted(n, by.id)) return;
  if (by) await punish(n, by.id, 'Vanity change');
  log(n, '🔗 تغيّر الرابط المميز', `من \`${o.vanityURLCode}\` إلى \`${n.vanityURLCode}\`\nالفاعل: ${by ? `<@${by.id}>` : 'غير معروف'}\n⚠️ ديسكورد لا يسمح للبوتات باسترجاع الرابط، رجّعه يدوياً.`, by?.id);
});

// ---------- الانضمام: وضع الطوارئ + ترحيب + كشف الحسابات الجديدة ----------
client.on('guildMemberAdd', async (m) => {
  const g = m.guild, c = cfg(g.id);
  if (c.lock && !m.user.bot) return m.kick('Panic Lockdown').catch(() => {});
  const age = (Date.now() - m.user.createdTimestamp) / 864e5;
  if (age < (c.ui?.altDays ?? 3) && !off(g, 'alt') && !m.user.bot) {
    const act = c.ui?.altAct || 'alert';
    if (act === 'kick') { await m.kick('حساب جديد جداً').catch(() => {}); log(g, '🕵️ طرد حساب جديد', `<@${m.id}> عمر حسابه ${age.toFixed(1)} يوم`, m.id); return; }
    if (act === 'timeout') await m.timeout((c.ui?.muteMin || 60) * 60000, 'حساب جديد جداً').catch(() => {});
    log(g, '🕵️ حساب جديد جداً', `<@${m.id}> عمر حسابه ${age.toFixed(1)} يوم${act === 'timeout' ? ' — تم كتمه مؤقتاً' : ''}`, m.id);
  }
  const w = c.ui?.welcome;
  if (off(g, '_') || w?.on === false) return;
  const ch = findCh(g, w?.ch) || (c.welcome && g.channels.cache.get(c.welcome));
  const text = w?.msg ? fmt(w.msg, m, true) : `حياك الله <@${m.id}> في **${g.name}**\nأنت العضو رقم **${g.memberCount}**`;
  ch?.send({ embeds: [new EmbedBuilder().setColor(parseInt(String(w?.color || '#2ecc71').replace('#', ''), 16) || 0x2ecc71).setTitle(w?.title || 'أهلاً وسهلاً 👋').setDescription(text).setThumbnail(m.user.displayAvatarURL())] }).catch(() => {});
});

// ---------- المستويات ----------
const cd = new Map();
client.on('messageCreate', (m) => {
  if (!m.guild || m.author.bot || off(m.guild, '_') || cfg(m.guild.id).ui?.lvl?.on === false || cfg(m.guild.id).ui?.lvl?.ignore?.includes(m.channelId) || Date.now() - (cd.get(m.guild.id + m.author.id) || 0) < (cfg(m.guild.id).ui?.lvl?.cd || 60) * 1000) return;
  cd.set(m.guild.id + m.author.id, Date.now());
  const xp = (cfg(m.guild.id).xp[m.author.id] ??= 0);
  const lvl = (x) => Math.floor(0.1 * Math.sqrt(x));
  const L = cfg(m.guild.id).ui?.lvl || {}, lo = L.min || 15, hi = Math.max(lo, L.max || 25);
  const now = xp + lo + Math.floor(Math.random() * (hi - lo + 1));
  cfg(m.guild.id).xp[m.author.id] = now;
  if (lvl(now) > lvl(xp)) {
    const Lc = cfg(m.guild.id).ui?.lvl || {};
    if (Lc.announce !== false) {
      const text = String(Lc.msg || '🎉 مبروك {user} وصلت لفل **{level}**').replace(/{user}/g, `<@${m.author.id}>`).replace(/{level}/g, lvl(now));
      (findCh(m.guild, Lc.ch) || m.channel).send({ content: text, allowedMentions: { users: [m.author.id] } }).catch(() => {});
    }
    for (const r of cfg(m.guild.id).ui?.lvl?.rewards || []) {
      const role = r.lvl <= lvl(now) && m.guild.roles.cache.find((x) => x.name === r.role);
      if (role) m.member?.roles.add(role).catch(() => {});
    }
  }
  save();
});


// ---------- مساعدات + النسخ الاحتياطي + الطوارئ ----------
const KEY = { 'حذف قنوات': 'chan', 'حذف رتب': 'role', 'حظر جماعي': 'ban', 'طرد جماعي': 'ban' };
const off = (g, k) => cfg(g.id).ui?.on === false || cfg(g.id).ui?.sec?.[k] === false;
const findCh = (g, n) => n && g.channels.cache.find((c) => c.type === T.GuildText && (c.id === n || c.name === String(n).replace(/^#/, '')));
const fmt = (t, m, mention) => t.replace(/{user}/g, mention ? `<@${m.id}>` : `**${m.user.username}**`).replace(/{server}/g, m.guild.name).replace(/{count}/g, m.guild.memberCount);
client.on('guildMemberRemove', (m) => {
  const l = cfg(m.guild.id).ui?.leave;
  if (l?.on && !off(m.guild, '_')) findCh(m.guild, l.ch)?.send(fmt(l.msg || '{user} غادر', m, false)).catch(() => {});
});

const PORT = process.env.PORT || 3000;
// على Render يتوفر RENDER_EXTERNAL_URL تلقائياً، فلا تحتاج PUBLIC_URL
const URL_BASE = (process.env.PUBLIC_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
async function punishBy(g, id, reason) {
  threat(g, 5, reason);
  const how = cfg(g.id).ui?.punish || 'ban';
  const m = await g.members.fetch(id).catch(() => null);
  if (m && how !== 'kick') await m.roles.set([], reason).catch(() => {}); // عزل الصلاحيات فوراً قبل أي عقوبة
  if (how === 'strip') return;
  if (how === 'kick') return m?.kick(reason).catch(() => {});
  addBad(g, id, reason);
  return punish(g, id, reason);
}
const sendPanel = (ch) => ch.send({ embeds: [new EmbedBuilder().setTitle('🎫 الدعم الفني').setDescription('اضغط الزر لفتح تذكرة')],
  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket_open').setLabel('فتح تذكرة').setStyle(ButtonStyle.Primary))] });
const rid = () => crypto.randomBytes(24).toString('hex');
function newLink(gid, to) {
  db.tokens ??= {};
  const t = rid();
  db.tokens[t] = { gid, to, exp: Date.now() + 864e5, used: false };
  save();
  return `${URL_BASE}/t/${t}`;
}
function createBackup(g) {
  const c = cfg(g.id);
  const b = {
    id: rid().slice(0, 8), date: Date.now(),
    roles: g.roles.cache.filter((r) => !r.managed && r.id !== g.id).sort((a, b) => b.position - a.position)
      .map((r) => ({ name: r.name, color: r.color, hoist: r.hoist, admin: r.permissions.has(P.Administrator), perms: r.permissions.bitfield.toString() })),
    channels: g.channels.cache.filter((x) => [T.GuildText, T.GuildVoice, T.GuildCategory].includes(x.type))
      .sort((a, b) => a.rawPosition - b.rawPosition)
      .map((x) => chanSnap(g, x)),
  };
  (c.backups ??= []).unshift(b);
  c.backups.length = Math.min(c.backups.length, 10);
  save();
  return b;
}
async function restoreBackup(g, b) {
  let n = 0;
  for (const r of b.roles)
    if (!g.roles.cache.some((x) => x.name === r.name)) {
      await g.roles.create({ name: r.name, color: r.color, hoist: r.hoist, permissions: BigInt(r.perms) }).catch(() => {}); n++;
    }
  const sorted = [...b.channels].sort((a, c) => (c.type === T.GuildCategory) - (a.type === T.GuildCategory));
  for (const x of sorted)
    if (!g.channels.cache.some((y) => y.name === x.name && y.type === x.type)) {
      const parent = x.parent && g.channels.cache.find((y) => y.name === x.parent && y.type === T.GuildCategory);
      await g.channels.create(chanOpts(g, x, parent)).catch(() => {}); n++;
    }
  return n;
}
async function setPanic(g, on, by) {
  const c = cfg(g.id);
  c.lock = on; save();
  let ok = 0, bad = 0;
  for (const ch of g.channels.cache.filter((x) => x.type === T.GuildText).values())
    await ch.permissionOverwrites.edit(g.roles.everyone, { SendMessages: on ? false : null }).then(() => ok++, () => bad++);
  log(g, on ? '🔒 وضع الطوارئ مفعّل' : '🔓 وضع الطوارئ أُوقف', `بواسطة ${by}\nتم تعديل ${ok} روم${bad ? `، وفشل ${bad} (تأكد من صلاحيات البوت ورتبته)` : ''}`);
  return { done: ok, bad };
}
const SEC_N = { nuke: 'Anti-Nuke', ban: 'منع الحظر/الطرد الجماعي', chan: 'حماية القنوات', role: 'حماية الرتب', hook: 'الويب هوكس', vanity: 'الرابط المميز', esc: 'منع الترقية', alt: 'كشف الحسابات الجديدة', emoji: 'الإيموجيات', gset: 'إعدادات السيرفر', integ: 'التكاملات', bots: 'قائمة البوتات', raid: 'كشف الغارات', honey: 'قناة الفخ', link: 'درع الروابط', mention: 'سبام المنشن', trust: 'القائمة السوداء', restore: 'الاسترجاع التلقائي', spam: 'سبام الرسائل', words: 'الكلمات الممنوعة' };
const EV_N = { msgdel: 'سجل حذف الرسائل', msgedit: 'سجل تعديل الرسائل', join: 'سجل الدخول', leave: 'سجل الخروج', ban: 'سجل الحظر', unban: 'سجل فك الحظر', voice: 'سجل الصوت', nick: 'سجل الألقاب', ch: 'سجل الرومات', role: 'سجل الرتب' };
function settingsDiff(o, n) {
  const val = (x, p, d) => { const v = p.split('.').reduce((a, k) => a?.[k], x); return v === undefined ? d : v; };
  const list = [['on', 'البوت (التشغيل العام)', true], ['autoPanic', 'الطوارئ التلقائي', false], ['capsOn', 'فلتر الحروف الكبيرة', false], ['blockInvites', 'منع الدعوات', false],
    ['welcome.on', 'الترحيب', true], ['leave.on', 'المغادرة', false], ['lvl.on', 'المستويات', true], ['lvl.announce', 'إعلان المستوى', true], ['welcome.dm', 'الرسالة الخاصة', false]];
  for (const k in SEC_N) list.push(['sec.' + k, SEC_N[k], true]);
  for (const k in EV_N) list.push(['ev.' + k, EV_N[k], true]);
  return list.filter(([p, , d]) => !!val(o, p, d) !== !!val(n, p, d)).map(([p, name, d]) => `${val(n, p, d) ? '🟢' : '🔴'} ${name}: ${val(n, p, d) ? 'تشغيل' : 'إيقاف'}`);
}

// ---------- الويب (لوحة التحكم + عرض النسخ) ----------
const LOGO = Buffer.from('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aW5ncmVkaWVudC52M2RoYXNoWCCOWrVTQbmEp2X9SkDI6u/YBcPzWumBfif80TQy5OxcmKRmYWN0aW9ueB1jb20uYW50aHJvcGljLmNsYXVkZS5wcm92aWRlZGpwYXJhbWV0ZXJzoXgfY29tLmFudGhyb3BpYy5vcmlnaW4tY29uZmlkZW5jZWd1bmtub3dua2Rlc2NyaXB0aW9ueGZDbGF1ZGUgcHJvdmlkZWQgdGhpcyBmaWxlIGF0IHRoZSByZXF1ZXN0IG9mIGEgdXNlciBhbmQgbWF5IGhhdmUgY3JlYXRlZCBvciBtb2RpZmllZCB0aGUgZmlsZSBjb250ZW50cy5tc29mdHdhcmVBZ2VudKFkbmFtZWZDbGF1ZGVyYWxsQWN0aW9uc0luY2x1ZGVk9QAAAMhqdW1iAAAAQGp1bWRjYm9yABEAEIAAAKoAOJtxE2MycGEuaGFzaC5kYXRhAAAAABhjMnNok2a1CDDdnhXIkPFDFC7AJgAAAIBjYm9ypWNhbGdmc2hhMjU2Y3BhZEwAAAAAAAAAAAAAAABkaGFzaFgg9ciibePUGWwo4rJYkD0trZSdtAqq9V/tTr6lJwZ2HVpkbmFtZW5qdW1iZiBtYW5pZmVzdGpleGNsdXNpb25zgaJlc3RhcnQZVc5mbGVuZ3RoGRaHAAACPmp1bWIAAAAnanVtZGMyY2wAEQAQgAAAqgA4m3EDYzJwYS5jbGFpbS52MgAAAAIPY2JvcqVjYWxnZnNoYTI1NmlzaWduYXR1cmV4TXNlbGYjanVtYmY9L2MycGEvdXJuOmMycGE6NjQwZWZjODEtNzY1Mi00MTU0LTgyMmQtZDBmNTBiNDI4ZjRiL2MycGEuc2lnbmF0dXJlamluc3RhbmNlSUR4LHhtcDppaWQ6Yzg5ZmFkNGItNWVlNS00NGQyLTk5NWUtZTczMGU2MGFjNzUwcmNyZWF0ZWRfYXNzZXJ0aW9uc4OiY3VybHgtc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5pbmdyZWRpZW50LnYzZGhhc2hYII5atVNBuYSnZf1KQMjq79gFw/Na6YF+J/zRNDLk7FyYomN1cmx4KnNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEuYWN0aW9ucy52MmRoYXNoWCD05dq/RIFliNYwdmEkLlJqJYmi2sc7TRxM1NzpzuQMZKJjdXJseClzZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmhhc2guZGF0YWRoYXNoWCApFEPb2DIeUBpNUtqnMeDXoSdlfNa1Qg2Lmsc072pXVnRjbGFpbV9nZW5lcmF0b3JfaW5mb6NkbmFtZW9BbnRocm9waWMgRmlsZXNndmVyc2lvbmUxLjAuMGtzcGVjVmVyc2lvbmUyLjQuMAAAEDhqdW1iAAAAKGp1bWRjMmNzABEAEIAAAKoAOJtxA2MycGEuc2lnbmF0dXJlAAAAEAhjYm9y0oRZAhKiASYYIVkCCjCCAgYwggGNoAMCAQICFEDloAruwjnQvriD+gZCBT1nVRMAMAoGCCqGSM49BAMDMEkxFzAVBgNVBAoTDkFudGhyb3BpYywgUEJDMS4wLAYDVQQDEyVBbnRocm9waWMgQ29udGVudCBDcmVkZW50aWFscyBSb290IENBMB4XDTI2MDgwNzE4NDM1NloXDTI4MDgwNjE5NDM1NlowRDEXMBUGA1UEChMOQW50aHJvcGljLCBQQkMxKTAnBgNVBAMTIEFudGhyb3BpYyBDbGF1ZGUgQ29udGVudCBTaWduaW5nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEmHoKa8tQGAUU1TS9QqU5W0Tp2N3XsvlK7BfQt6YWKwEzd2R3/dzKPEUDdCjlLjp9fT+KFjRVnuZ9v0oXvTe3k6NYMFYwDgYDVR0PAQH/BAQDAgeAMBUGA1UdJQQOMAwGCisGAQQBg+heAgEwDAYDVR0TAQH/BAIwADAfBgNVHSMEGDAWgBTOUeIEgU5kWyP448TPmj6cwddcwjAKBggqhkjOPQQDAwNnADBkAjAxcx0UngF60stVjs5G4T2eiptsBk5mf9oCtfJPAUBl8qs/PEXa8+gk1/X5QJ2DVcYCMHBfXN31YapiSqYvlIWrDVDJKOvXMl+kkz37Wt0PBI8sw486Mq6JeOhT+lRR4b1HCaFjcGFkWQ2eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9lhA6DUoW37wj3kb4G4/iFQKMfEuveluATpeqC3J0QD4InP9MKLzbHo9kXQ72O499bEIDGnrk0miN4HPyNurs0KnWQA=', 'base64');
const DASH = read('dashboard.html');
const VIEW = read('view.html');
const deny = (m) => `<meta charset="utf-8"><body style="background:#07040d;color:#f1e9ff;font-family:Tahoma;text-align:center;padding:80px">${m}</body>`;
const HTTPS = /^https:/i.test(URL_BASE);
const rateHits = new Map();
setInterval(() => rateHits.clear(), 10 * 60 * 1000).unref();
/** ترويسات أمان + حد طلبات + حماية CSRF (طلبات التعديل لازم تكون من نفس الموقع). */
function security(req, res, next) {
  res.set({ 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'same-origin' });
  if (req.path !== '/logo.webp') res.set('Cache-Control', 'no-store');
  if (HTTPS) res.set('Strict-Transport-Security', 'max-age=31536000');
  const now = Date.now(), hits = (rateHits.get(req.ip) || []).filter((t) => now - t < 60000);
  hits.push(now);
  rateHits.set(req.ip, hits);
  if (hits.length > 300) return res.status(429).send('Too many requests');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const origin = req.get('origin');
    try { if (origin && new URL(origin).host !== new URL(URL_BASE).host) return res.status(403).json({ error: 'origin' }); } catch { return res.status(403).json({ error: 'origin' }); }
  }
  next();
}
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(security);
app.use(express.json({ limit: '300kb' }));
const ck = (req) => Object.fromEntries((req.headers.cookie || '').split(';').map((x) => x.trim().split('=')).filter((x) => x[0]));
const who = (req) => sess(req)?.name || 'لوحة التحكم';
const sess = (req) => { const x = db.sessions?.[ck(req).sx]; return x && x.exp > Date.now() ? x : null; };
const auth = (req, res, next) => {
  const x = sess(req);
  if (!x) return res.status(401).json({ error: 'login' });
  req.g = client.guilds.cache.get(x.gid);
  if (!req.g) return res.status(404).json({ error: 'guild' });
  if (!isActive(req.g) && !isOwnerId(x.uid) && !(req.method === 'GET' && req.path === '/api/state')) return res.status(402).json({ error: 'sub' });
  return next();
};
app.get('/health', (q, r) => r.json({ ok: true, ready: client.isReady?.() ?? false, guilds: client.guilds.cache.size })); // فحص الصحة (Render وغيره)
app.get('/robots.txt', (q, r) => r.type('text/plain').send('User-agent: *\nDisallow: /\n')); // لوحة التحكم خاصة، لا تظهر في بحث قوقل
app.get('/logo.webp', (q, r) => r.type('image/webp').send(LOGO));
app.get('/t/:t', (req, res) => {
  const k = db.tokens?.[req.params.t], x = sess(req);
  if (!k || k.exp < Date.now()) return res.status(403).send(deny('الرابط منتهي أو غير صحيح'));
  if (k.used) return x && x.gid === k.gid ? res.redirect(k.to) : res.status(403).send(deny('هذا الرابط استُخدم مسبقاً (صالح لتسجيل دخول واحد فقط)'));
  k.used = true;
  const sid = rid();
  (db.sessions ??= {})[sid] = { gid: k.gid, gids: [k.gid], guilds: [{ id: k.gid, name: client.guilds.cache.get(k.gid)?.name || k.gid, icon: null }], exp: Date.now() + 30 * 864e5 };
  save();
  res.setHeader('Set-Cookie', `sx=${sid}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Lax${HTTPS ? '; Secure' : ''}`);
  res.redirect(k.to);
});
const he = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const CID = () => process.env.CLIENT_ID || client.user?.id;
const REDIR = () => `${URL_BASE}/auth/callback`;
const cookieSet = (res, k, v, age) => res.append('Set-Cookie', `${k}=${v}; HttpOnly; Path=/; Max-Age=${age}; SameSite=Lax${HTTPS ? '; Secure' : ''}`);
const PAGE = (body) => `<!DOCTYPE html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Systemix</title><link rel="icon" href="/logo.webp">
<body style="margin:0;min-height:100vh;font-family:Tahoma,sans-serif;color:#f1e9ff;background:radial-gradient(900px 500px at 85% -10%,#3b0f73aa,transparent),radial-gradient(700px 500px at 0% 110%,#5a14a855,transparent),#07040d">${body}</body></html>`;
const BTN = 'display:inline-block;background:#8b2fe8;color:#fff;padding:12px 24px;border-radius:12px;text-decoration:none;font-size:15px';
app.get('/', (q, r) => (sess(q) ? r.redirect('/servers') : r.send(PAGE(`<div style="min-height:100vh;display:grid;place-items:center;text-align:center"><div>
  <img src="/logo.webp" width="190" style="filter:drop-shadow(0 0 30px #8b2fe8aa)"><h1 style="font-size:34px;margin:10px">Systemix</h1>
  <p style="color:#a592c4">لوحة التحكم الكاملة بالبوت</p><a href="/auth/login" style="${BTN};margin-top:14px;font-size:17px;padding:14px 32px">تسجيل الدخول بـ Discord</a></div></div>`))));
app.get('/auth/login', (q, r) => {
  if (!process.env.CLIENT_SECRET) return r.status(500).send(deny('أضف CLIENT_SECRET (و CLIENT_ID) في ملف .env ثم أعد تشغيل البوت'));
  const st = rid();
  cookieSet(r, 'st', st, 600);
  r.redirect('https://discord.com/oauth2/authorize?' + new URLSearchParams({ client_id: CID(), response_type: 'code', scope: 'identify guilds', redirect_uri: REDIR(), state: st, prompt: 'none' }));
});
app.get('/auth/callback', async (q, r) => {
  try {
    if (!q.query.code || q.query.state !== ck(q).st) return r.status(400).send(deny('فشل التحقق، ارجع وجرب مرة ثانية'));
    const tk = await (await fetch('https://discord.com/api/oauth2/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: CID(), client_secret: process.env.CLIENT_SECRET, grant_type: 'authorization_code', code: q.query.code, redirect_uri: REDIR() }) })).json();
    if (!tk.access_token) return r.status(400).send(deny('رفض ديسكورد الدخول: تأكد من CLIENT_SECRET وأن رابط Redirect مضاف في Developer Portal:<br><b>' + REDIR() + '</b>'));
    const H = { Authorization: 'Bearer ' + tk.access_token };
    const [u, gs] = await Promise.all([fetch('https://discord.com/api/users/@me', { headers: H }).then((x) => x.json()), fetch('https://discord.com/api/users/@me/guilds', { headers: H }).then((x) => x.json())]);
    const mine = (Array.isArray(gs) ? gs : []).filter((x) => x.owner || (BigInt(x.permissions || 0) & 8n) === 8n).map((x) => ({ id: x.id, name: x.name, icon: x.icon }));
    const sid = rid();
    (db.sessions ??= {})[sid] = { uid: u.id, name: u.global_name || u.username, guilds: mine, gids: mine.map((x) => x.id), exp: Date.now() + 7 * 864e5 };
    save();
    cookieSet(r, 'sx', sid, 604800);
    r.redirect(isOwnerId(u.id) ? '/owner' : '/servers?auto=1');
  } catch (e) { r.status(500).send(deny('خطأ في تسجيل الدخول')); }
});
app.get('/servers', (q, r) => {
  const x = sess(q);
  if (!x) return r.redirect('/');
  const own = isOwner(q);
  const list = own ? [...client.guilds.cache.values()].map((g) => ({ id: g.id, name: g.name, icon: g.icon })) : (x.guilds || []).filter((g) => client.guilds.cache.has(g.id));
  if (q.query.auto && !own && list.length === 1) { x.gid = list[0].id; save(); return r.redirect('/dashboard'); }
  const card = (g) => {
    const info = subInfo(client.guilds.cache.get(g.id));
    const icon = g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=64` : '/logo.webp';
    const badge = info.active ? '' : `<span style="background:#ff4d6d;border-radius:10px;padding:2px 10px;font-size:12px;margin-inline-start:8px">${info.status === 'suspended' ? 'متوقف' : 'منتهي'}</span>`;
    return `<div style="display:flex;align-items:center;gap:14px;background:#120a1f;border:1px solid #2a1646;border-radius:16px;padding:14px;margin-bottom:12px"><img src="${icon}" width="48" height="48" style="border-radius:50%"><b style="flex:1">${he(g.name)}${badge}</b><a href="/select/${g.id}" style="${BTN}">إدارة</a></div>`;
  };
  r.send(PAGE(`<div style="max-width:620px;margin:auto;padding:30px 16px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:20px"><img src="/logo.webp" width="46"><h2 style="flex:1;margin:0">سيرفراتك${x.name ? ' — ' + he(x.name) : ''}</h2>${own ? `<a href="/owner" style="${BTN}">👑 لوحة المالك</a>` : ''}<a href="/logout" style="color:#a592c4">خروج</a></div>
    ${list.map(card).join('') || '<p style="color:#a592c4;line-height:1.9">ما لقيت سيرفرات فيها البوت وأنت Administrator فيها.<br>إذا تبغى البوت في سيرفرك تواصل مع مالك البوت.</p>'}</div>`));
});
app.get('/select/:id', async (q, r) => {
  const x = sess(q), g = client.guilds.cache.get(q.params.id);
  if (!x || !g) return r.redirect('/servers');
  if (!isOwner(q)) {
    if (!x.gids?.includes(g.id)) return r.redirect('/servers');
    if (x.uid) {
      const m = await g.members.fetch(x.uid).catch(() => null);
      if (!m || !(m.permissions.has(P.Administrator) || g.ownerId === x.uid)) return r.redirect('/servers');
    }
  }
  x.gid = g.id;
  save();
  r.redirect('/dashboard');
});
app.get('/logout', (q, r) => { if (db.sessions) delete db.sessions[ck(q).sx]; save(); cookieSet(r, 'sx', '', 0); r.redirect('/'); });
app.get('/dashboard', (q, r) => { const x = sess(q); return x?.gid && client.guilds.cache.has(x.gid) ? r.type('html').send(DASH) : r.redirect('/servers'); });
app.get('/view/:id', (q, r) => (sess(q) ? r.type('html').send(VIEW) : r.status(403).send(deny('اطلب رابط الدخول من البوت'))));
app.get('/api/state', auth, (req, res) => {
  const g = req.g, c = cfg(g.id);
  res.json({ guild: g.name, acts: (c.acts || []).slice(0, 100), dlog: (c.dlog || []).slice(0, 100), bin: (c.bin || []).map((e) => ({ id: e.id, kind: e.kind, at: e.at, name: e.d.name })),
    voices: g.channels.cache.filter((x) => x.type === T.GuildVoice).map((x) => ({ id: x.id, name: '🔊 ' + x.name })), sub: subInfo(g), stats: c.stats || {}, isOwner: isOwnerId(sess(req)?.uid), presence: db.bot || {}, bad: Object.entries(db.bad || {}).slice(-100).map(([id, v]) => ({ id, r: v.r })), uptime: Math.floor(process.uptime()), chCount: g.channels.cache.size, roleCount: g.roles.cache.size, members: g.memberCount, ping: client.ws.ping, panic: c.lock, wl: c.wl, ui: c.ui || {}, logs: recent[g.id] || [],
    channels: g.channels.cache.filter((x) => x.type === T.GuildText).map((x) => ({ id: x.id, name: '#' + x.name })),
    categories: g.channels.cache.filter((x) => x.type === T.GuildCategory).map((x) => ({ id: x.id, name: x.name })),
    roles: g.roles.cache.filter((r) => !r.managed && r.id !== g.id).map((r) => ({ id: r.id, name: r.name })),
    top: Object.entries(c.xp).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([id, xp]) => ({ id, name: g.members.cache.get(id)?.user.username || id, xp })),
    backups: (c.backups || []).map((b) => ({ id: b.id, date: b.date, roles: b.roles.length, channels: b.channels.length })) });
});
app.put('/api/config', auth, (req, res) => {
  const b = req.body || {}, n = (v, lo, hi, d) => Math.min(hi, Math.max(lo, Number(v) || d));
  const c = cfg(req.g.id), { sec, welcome, leave, lvl, tk, wl } = b;
  const old = c.ui || {};
  const { panic: _p, backups: _b, logs: _l, wl: _w, ...rest } = b;
  c.ui = { ...rest, on: b.on !== false, logCh: b.logCh || '', limit: n(b.limit, 1, 20, 3), window: n(b.window, 3, 120, 10),
    punish: ['ban', 'kick', 'strip'].includes(b.punish) ? b.punish : 'ban', altDays: n(b.altDays, 1, 365, 3), autoPanic: !!b.autoPanic,
    panicScore: n(b.panicScore, 3, 100, 12), raidJoins: n(b.raidJoins, 3, 100, 8), raidMin: n(b.raidMin, 1, 120, 5), maxMentions: n(b.maxMentions, 2, 50, 5),
    spamMsgs: n(b.spamMsgs, 3, 30, 6), spamSec: n(b.spamSec, 2, 60, 5), muteMin: n(b.muteMin, 1, 40320, 60), warnMax: n(b.warnMax, 1, 20, 3),
    capsPct: n(b.capsPct, 30, 100, 70), autoBackup: n(b.autoBackup, 0, 168, 0), badDomains: String(b.badDomains || '').slice(0, 2000),
    badWords: String(b.badWords || '').slice(0, 4000), ar: Array.isArray(b.ar) ? b.ar.slice(0, 50) : [] };
  if (c.ui.logCh) c.log = c.ui.logCh;
  c.nuke = sec?.nuke !== false;
  c.wl = (wl || []).filter((x) => /^\d{15,22}$/.test(x));
  save();
  const ch = settingsDiff(old, c.ui);
  const keys = Object.keys(c.ui).filter((k) => JSON.stringify(c.ui[k]) !== JSON.stringify(old[k]));
  if (keys.length) ctx.addDlog?.(req.g, who(req), `تعديل: ${keys.join('، ')}`);
  if (ch.length) log(req.g, '⚙️ تغيير إعدادات من لوحة التحكم', `${sess(req)?.name || 'لوحة التحكم'}:\n${ch.join('\n')}`);
  res.json({ ok: true, changed: ch.length });
});
app.post('/api/panic', auth, async (req, res) => { ctx.addDlog?.(req.g, who(req), req.body.on ? 'تفعيل وضع الطوارئ' : 'إيقاف وضع الطوارئ');
  const r = await setPanic(req.g, !!req.body.on, 'لوحة التحكم'); res.json({ ok: true, ...r }); });
app.post('/api/backup', auth, (req, res) => { const b = createBackup(req.g); res.json({ ok: true, link: newLink(req.g.id, '/view/' + b.id) }); });
app.post('/api/backup/restore', auth, async (req, res) => {
  const b = cfg(req.g.id).backups?.find((x) => x.id === req.body.id);
  if (!b) return res.json({ ok: false });
  res.json({ ok: true, n: await restoreBackup(req.g, b) });
});
app.get('/api/backup/:id', auth, (req, res) => res.json(cfg(req.g.id).backups?.find((x) => x.id === req.params.id) || { error: 'none' }));
app.post('/api/ticketpanel', auth, async (req, res) => {
  const ch = req.g.channels.cache.get(req.body.channel);
  if (!ch?.isTextBased()) return res.json({ ok: false });
  res.json({ ok: !!(await sendPanel(ch).catch(() => null)) });
});
app.post('/api/xp/reset', auth, (req, res) => { cfg(req.g.id).xp = {}; save(); res.json({ ok: true }); });
app.post('/api/mod', auth, async (req, res) => {
  const { action, id, reason, min, role, nick } = req.body || {};
  if (!/^\d{15,22}$/.test(id || '')) return res.json({ ok: false, msg: 'ID غير صحيح' });
  const g = req.g, c = cfg(g.id), ui = c.ui || {}, m = await g.members.fetch(id).catch(() => null);
  const why = String(reason || 'لوحة التحكم').slice(0, 200);
  if (ui.dmPunish && m && ['ban', 'kick', 'timeout', 'warn'].includes(action)) await m.send(`⚠️ إجراء إداري في **${g.name}**: ${action}\nالسبب: ${why}`).catch(() => {});
  try {
    if (action === 'ban') await g.members.ban(id, { reason: why });
    else if (action === 'unban') await g.members.unban(id);
    else if (action === 'kick') await m.kick(why);
    else if (action === 'strip') await m.roles.set([], why);
    else if (action === 'timeout') await m.timeout(Math.min(40320, Math.max(1, +min || 60)) * 60000, why);
    else if (action === 'untimeout') await m.timeout(null);
    else if (action === 'addrole' || action === 'rmrole') {
      const r = g.roles.cache.get(role);
      if (!r) return res.json({ ok: false, msg: 'اختر رتبة' });
      await (action === 'addrole' ? m.roles.add(r) : m.roles.remove(r));
    } else if (action === 'nick') await m.setNickname(String(nick || '').slice(0, 32) || null);
    else if (action === 'warn') {
      const w = ((c.warns ??= {})[id] ??= []);
      w.push({ r: why, at: Date.now() });
      if (w.length >= (ui.warnMax || 3)) {
        const act = ui.warnAct || 'timeout';
        if (act === 'ban') await g.members.ban(id, { reason: 'تحذيرات متكررة' });
        else if (act === 'kick') await m.kick('تحذيرات متكررة');
        else await m.timeout((ui.muteMin || 60) * 60000, 'تحذيرات متكررة');
        c.warns[id] = [];
      }
      save();
    } else if (action === 'clearwarns') { if (c.warns) delete c.warns[id]; save(); }
    else return res.json({ ok: false });
    ctx.addAct(g, action, id, why);
    ctx.addDlog(g, who(req), `إجراء ${action} على ${id}`);
    res.json({ ok: true });
  } catch (e) { res.json({ ok: false, msg: 'فشل: تأكد أن العضو موجود وأن رتبة البوت أعلى منه' }); }
});
app.get('/api/warns', auth, (req, res) => res.json(cfg(req.g.id).warns?.[req.query.id] || []));
app.post('/api/chan', auth, async (req, res) => {
  const { action, channel, value, text, title } = req.body || {};
  const ch = req.g.channels.cache.get(channel);
  if (!ch?.isTextBased()) return res.json({ ok: false, msg: 'اختر قناة نصية' });
  try {
    if (action === 'lock' || action === 'unlock') await ch.permissionOverwrites.edit(req.g.roles.everyone, { SendMessages: action === 'lock' ? false : null });
    else if (action === 'slow') await ch.setRateLimitPerUser(Math.min(21600, Math.max(0, +value || 0)));
    else if (action === 'purge') await ch.bulkDelete(Math.min(100, Math.max(1, +value || 1)), true);
    else if (action === 'say') await ch.send(title ? { embeds: [new EmbedBuilder().setTitle(String(title).slice(0, 200)).setDescription(String(text || '').slice(0, 3500)).setColor(0x8b2fe8)] } : { content: String(text || '').slice(0, 1900), allowedMentions: { parse: [] } });
    else return res.json({ ok: false });
    res.json({ ok: true });
  } catch (e) { res.json({ ok: false, msg: 'فشل: تأكد من صلاحيات البوت' }); }
});
app.post('/api/rrpanel', auth, async (req, res) => {
  const { channel, title, roles } = req.body || {};
  const ch = req.g.channels.cache.get(channel);
  const rs = (roles || []).map((id) => req.g.roles.cache.get(id)).filter((r) => r && !r.managed && !DANGER.some((p) => r.permissions.has(p))).slice(0, 20);
  if (!ch?.isTextBased() || !rs.length) return res.json({ ok: false, msg: 'اختر قناة ورتبة (غير إدارية)' });
  const rows = [];
  for (let k = 0; k < rs.length; k += 5) rows.push(new ActionRowBuilder().addComponents(rs.slice(k, k + 5).map((r) => new ButtonBuilder().setCustomId('rr:' + r.id).setLabel(r.name.slice(0, 80)).setStyle(ButtonStyle.Secondary))));
  const sent = await ch.send({ embeds: [new EmbedBuilder().setTitle(String(title || 'اختر رتبك').slice(0, 200)).setDescription('اضغط على الزر لأخذ الرتبة أو سحبها').setColor(0x8b2fe8)], components: rows }).catch(() => null);
  res.json({ ok: !!sent });
});
app.post('/api/presence', auth, (req, res) => {
  if (!isOwnerId(sess(req)?.uid)) return res.json({ ok: false, msg: 'للمالك فقط: ضع OWNER_ID في .env' });
  const { status, type, text } = req.body || {};
  db.bot = { status: ['online', 'idle', 'dnd', 'invisible'].includes(status) ? status : 'online', type: [0, 2, 3, 5].includes(+type) ? +type : 0, text: String(text || '').slice(0, 100) };
  save();
  applyPresence();
  res.json({ ok: true });
});
app.post('/api/reset', auth, (req, res) => { const c = cfg(req.g.id); c.ui = {}; c.nuke = true; save(); res.json({ ok: true }); });
app.post('/api/xp/set', auth, (req, res) => { cfg(req.g.id).xp[req.body.id] = Math.max(0, Math.floor(+req.body.xp) || 0); save(); res.json({ ok: true }); });
app.post('/api/backup/delete', auth, (req, res) => { const c = cfg(req.g.id); c.backups = (c.backups || []).filter((x) => x.id !== req.body.id); save(); res.json({ ok: true }); });
app.post('/api/verifypanel', auth, async (req, res) => {
  const ch = req.g.channels.cache.get(req.body.channel);
  if (!ch?.isTextBased()) return res.json({ ok: false });
  res.json({ ok: !!(await sendVerify(ch).catch(() => null)) });
});
app.post('/api/honeypot/create', auth, async (req, res) => {
  const ch = await req.g.channels.create({ name: '🎁-free-nitro', type: T.GuildText, topic: '⚠️ فخ أمني: أي رسالة هنا = عقوبة تلقائية' }).catch(() => null);
  if (!ch) return res.json({ ok: false });
  const c = cfg(req.g.id);
  c.ui = { ...(c.ui || {}), honeypot: ch.id };
  save();
  res.json({ ok: true, id: ch.id });
});
app.post('/api/bad/add', auth, (req, res) => { if (/^\d{15,22}$/.test(req.body.id || '')) { (db.bad ??= {})[req.body.id] = { r: 'أضيف يدوياً', g: req.g.id, at: Date.now() }; save(); } res.json({ ok: true }); });
app.post('/api/bad/remove', auth, (req, res) => { if (db.bad) delete db.bad[req.body.id]; save(); res.json({ ok: true }); });
const OWNER_HTML = read('owner.html');
const isOwner = (req) => isOwnerId(sess(req)?.uid);
const ownerOnly = (req, res, next) => (isOwner(req) ? next() : res.status(403).json({ error: 'owner' }));
app.get('/owner', (q, r) => (isOwner(q) ? r.type('html').send(OWNER_HTML) : r.status(403).send(deny('هذه الصفحة للمالك فقط (ضع OWNER_ID في .env وسجّل الدخول بحسابك)'))));
app.get('/api/owner/state', ownerOnly, (req, res) => {
  const L = lic(), now = Date.now();
  const rows = [...client.guilds.cache.values()].map((g) => {
    const s = subOf(g), free = isOwnerId(g.ownerId), exp = s.until && s.until <= now;
    return { id: g.id, name: g.name, icon: g.iconURL?.({ size: 64 }) || null, members: g.memberCount || 0, ownerId: g.ownerId, status: free ? 'free' : s.status === 'suspended' ? 'suspended' : exp ? 'expired' : 'active',
      until: s.until, plan: s.plan, note: s.note, added: s.added, hist: (s.hist || []).slice(-4) };
  }).sort((a, b) => (a.until || 9e15) - (b.until || 9e15));
  res.json({ rows, lic: L, bl: Object.keys(db.bl || {}), invite: 'https://discord.com/oauth2/authorize?' + new URLSearchParams({ client_id: CID(), scope: 'bot applications.commands', permissions: '8' }) });
});
app.post('/api/owner/sub', ownerOnly, async (req, res) => {
  const { id, action, days, plan, note } = req.body || {};
  const g = client.guilds.cache.get(id);
  if (!g) return res.json({ ok: false, msg: 'البوت غير موجود في السيرفر' });
  const s = subOf(g), now = Date.now(), d = Math.max(0, Math.min(3650, +days || 0));
  if (typeof note === 'string') s.note = note.slice(0, 300);
  if (typeof plan === 'string') s.plan = plan.slice(0, 40);
  if (action === 'activate' || action === 'extend') {
    const live = s.status === 'active' && s.until && s.until > now;
    const base = action === 'extend' && live ? s.until : now;
    s.status = 'active';
    s.until = d ? base + d * 864e5 : action === 'activate' ? null : s.until;
    delete s.flag; delete s.rem; delete s.stopped;
    (s.hist ??= []).push({ t: now, a: d ? `تفعيل/تمديد ${d} يوم` : 'تفعيل بدون انتهاء' });
    save(); register(g);
    await notifyGuild(g, 'activated', s.until ? `ينتهي: ${new Date(s.until).toLocaleDateString('ar-SA')}` : 'بدون تاريخ انتهاء');
  } else if (action === 'suspend') {
    s.status = 'suspended'; s.stopped = now;
    (s.hist ??= []).push({ t: now, a: 'إيقاف يدوي' });
    save();
    await notifyGuild(g, 'suspended');
  } else save();
  res.json({ ok: true });
});
app.post('/api/owner/leave', ownerOnly, async (req, res) => {
  const g = client.guilds.cache.get(req.body.id);
  if (!g) return res.json({ ok: false });
  await g.leave().catch(() => {});
  res.json({ ok: true });
});
app.post('/api/owner/settings', ownerOnly, (req, res) => {
  const b = req.body || {}, L = lic(), n = (v, lo, hi, d) => Math.min(hi, Math.max(lo, Number(v) || d));
  Object.assign(L, { on: b.on !== false, newServers: b.newServers === 'trial' ? 'trial' : 'suspended', trialDays: n(b.trialDays, 0, 365, 0), notifyDays: n(b.notifyDays, 0, 30, 0),
    leaveDays: n(b.leaveDays, 0, 365, 0), contact: String(b.contact || '').slice(0, 200), msg: String(b.msg || '').slice(0, 400) });
  save();
  res.json({ ok: true });
});
app.post('/api/owner/broadcast', ownerOnly, async (req, res) => {
  const { target, text } = req.body || {};
  if (!String(text || '').trim()) return res.json({ ok: false });
  let k = 0;
  for (const g of client.guilds.cache.values()) {
    const act = isActive(g);
    if ((target === 'active' && !act) || (target === 'stopped' && act)) continue;
    await notifyGuild(g, 'custom', String(text).slice(0, 1500));
    k++;
  }
  res.json({ ok: true, n: k });
});
app.post('/api/owner/blacklist', ownerOnly, (req, res) => {
  const { id, add } = req.body || {};
  if (!/^\d{15,22}$/.test(id || '')) return res.json({ ok: false });
  db.bl ??= {};
  if (add === false) delete db.bl[id]; else { db.bl[id] = Date.now(); client.guilds.cache.get(id)?.leave().catch(() => {}); }
  save();
  res.json({ ok: true });
});

// ---------- طبقات الحماية المتقدمة ----------
const DANGER = [P.Administrator, P.ManageGuild, P.ManageRoles, P.ManageChannels, P.BanMembers, P.KickMembers, P.ManageWebhooks];
const seenE = new Set();
async function lastAudit(g, type, ms = 5000) {
  const l = await g.fetchAuditLogs({ type, limit: 1 }).catch(() => null);
  const e = l?.entries.first();
  return e && Date.now() - e.createdTimestamp < ms ? e : null;
}
const threats = {};
function threat(g, pts, why) {
  const ui = cfg(g.id).ui || {}, now = Date.now();
  const a = (threats[g.id] = (threats[g.id] || []).filter((x) => now - x.t < 60000));
  a.push({ t: now, p: pts });
  if (ui.autoPanic && !cfg(g.id).lock && a.reduce((t, x) => t + x.p, 0) >= (ui.panicScore || 12)) {
    threats[g.id] = [];
    setPanic(g, true, 'التحليل الاستباقي (' + why + ')');
  }
}
function addBad(g, id, why) {
  if (trusted(g, id)) return;
  (db.bad ??= {})[id] = { r: String(why).slice(0, 80), g: g.id, at: Date.now() };
  save();
}
Object.assign(KEY, { 'إنشاء قنوات': 'chan', 'تعديل قنوات': 'chan', 'إنشاء رتب': 'role', 'تعديل رتب': 'role', 'حذف إيموجي': 'emoji', 'حذف ملصقات': 'emoji' });
client.on('channelCreate', (c) => c.guild && guard(c.guild, A.ChannelCreate, 'إنشاء قنوات'));
client.on('channelUpdate', (o, n) => n.guild && guard(n.guild, A.ChannelUpdate, 'تعديل قنوات'));
client.on('roleCreate', (r) => guard(r.guild, A.RoleCreate, 'إنشاء رتب'));
client.on('roleUpdate', (o, n) => guard(n.guild, A.RoleUpdate, 'تعديل رتب'));
client.on('emojiDelete', (e) => guard(e.guild, A.EmojiDelete, 'حذف إيموجي'));
client.on('stickerDelete', (x) => x.guild && guard(x.guild, A.StickerDelete, 'حذف ملصقات'));

// حماية إعدادات السيرفر (اسم/شعار/مستوى التحقق)
client.on('guildUpdate', async (o, n) => {
  if (off(n, 'gset') || (o.name === n.name && o.icon === n.icon && o.verificationLevel === n.verificationLevel)) return;
  const e = await lastAudit(n, A.GuildUpdate);
  if (!e || trusted(n, e.executor.id)) return;
  await n.edit({ name: o.name, verificationLevel: o.verificationLevel, icon: o.iconURL({ extension: 'png', size: 1024 }) }).catch(() => {});
  await punishBy(n, e.executor.id, 'Server settings change');
  log(n, '🏰 تعديل إعدادات السيرفر', `<@${e.executor.id}> غيّر الاسم/الشعار/التحقق. تم التراجع والعقوبة.`, e.executor.id);
});

// حماية التكاملات
client.on('guildIntegrationsUpdate', async (g) => {
  if (off(g, 'integ')) return;
  for (const t of [A.IntegrationCreate, A.IntegrationDelete]) {
    const e = await lastAudit(g, t);
    if (e && !trusted(g, e.executor.id) && !seenE.has(e.id)) {
      seenE.add(e.id);
      await punishBy(g, e.executor.id, 'Integration abuse');
      log(g, '🔌 تلاعب بالتكاملات', `<@${e.executor.id}> عدّل التكاملات`, e.executor.id);
    }
  }
});


// البوتات، القائمة السوداء، كشف الغارات
const joins = {}, raid = {};
client.on('guildMemberAdd', async (m) => {
  const g = m.guild, c = cfg(g.id), ui = c.ui || {};
  if (off(g, '_')) return;
  if (m.user.bot) {
    if (m.id === client.user.id || off(g, 'bots') || c.wl.includes(m.id)) return;
    const e = await lastAudit(g, A.BotAdd);
    if (e && trusted(g, e.executor.id)) return;
    await m.kick('Strict bot whitelist').catch(() => {});
    if (e) await punishBy(g, e.executor.id, 'Unauthorized bot add');
    return log(g, '🤖 بوت غير مصرّح', `تم طرد البوت **${m.user.username}**${e ? ` وعقوبة <@${e.executor.id}>` : ''}`, e?.executor.id);
  }
  if (!off(g, 'trust') && db.bad?.[m.id] && !trusted(g, m.id)) {
    await m.ban({ reason: 'Blacklist: ' + db.bad[m.id].r }).catch(() => {});
    return log(g, '🕸️ مخرب معروف', `تم حظر <@${m.id}> تلقائياً (السبب السابق: ${db.bad[m.id].r})`);
  }
  if (off(g, 'raid')) return;
  const now = Date.now(), a = (joins[g.id] = (joins[g.id] || []).filter((x) => now - x.t < 10000));
  a.push({ id: m.id, t: now });
  if (raid[g.id] > now) return void m.kick('Raid mode').catch(() => {});
  if (a.length >= (ui.raidJoins || 8)) {
    raid[g.id] = now + (ui.raidMin || 5) * 60000;
    for (const x of a) (ui.raidAct === 'ban' ? g.members.ban(x.id, { reason: 'Raid wave' }) : g.members.kick(x.id, 'Raid wave')).catch(() => {});
    threat(g, 6, 'raid');
    log(g, '🌊 غارة انضمام', `${a.length} عضو دخلوا خلال 10 ثواني. تم طردهم وتفعيل وضع الغارة ${ui.raidMin || 5} دقائق.`);
  }
});

// الفخ، سبام المنشن، درع الروابط
const OFFICIAL = /(^|\.)(discord\.com|discord\.gg|discordapp\.com|discordapp\.net|discord\.media|discord\.gift|discord\.new|discordstatus\.com|steampowered\.com|steamcommunity\.com)$/i;
client.on('messageCreate', async (m) => {
  if (!m.guild || m.author.bot || !m.member) return;
  const g = m.guild, ui = cfg(g.id).ui || {};
  if (off(g, '_') || trusted(g, m.author.id)) return;
  if (ui.honeypot && m.channelId === ui.honeypot && !off(g, 'honey')) {
    m.delete().catch(() => {});
    await punishBy(g, m.author.id, 'Honeypot');
    return log(g, '🍯 وقع في الفخ', `<@${m.author.id}> كتب في قناة الفخ`, m.author.id);
  }
  let why = null;
  const txt = m.content || '';
  if (!off(g, 'spam')) {
    const k = g.id + m.author.id, now = Date.now(), a = (spamB[k] = (spamB[k] || []).filter((t) => now - t < (ui.spamSec || 5) * 1000));
    a.push(now);
    if (a.length >= (ui.spamMsgs || 6)) { spamB[k] = []; why = 'سبام رسائل'; }
  }
  if (!why && !off(g, 'words') && ui.badWords) {
    const lw = String(ui.badWords).toLowerCase().split(/[\n,]+/).map((x) => x.trim()).filter(Boolean), t = txt.toLowerCase();
    if (lw.some((w) => t.includes(w))) why = 'كلمة ممنوعة';
  }
  if (!why && ui.capsOn && txt.length >= 10) {
    const l = txt.replace(/[^A-Za-z]/g, '');
    if (l.length >= 8 && (l.replace(/[^A-Z]/g, '').length / l.length) * 100 >= (ui.capsPct || 70)) why = 'حروف كبيرة';
  }
  if (!why && ui.blockInvites !== false) {
    const ok = String(ui.allowInv || '').toLowerCase().split(/[\s,]+/);
    for (const mm of txt.matchAll(/(?:discord\.gg|discord(?:app)?\.com\/invite)\/([\w-]+)/gi)) if (!ok.includes(mm[1].toLowerCase())) { why = 'دعوة سيرفر'; break; }
  }
  if (!off(g, 'mention') && (m.mentions.everyone || m.mentions.users.size + m.mentions.roles.size >= (ui.maxMentions || 5))) why = 'سبام منشن';
  if (!why && !off(g, 'link')) {
    const urls = m.content.match(/https?:\/\/[^\s<>()]+|(?:discord\.gg|discord\.com\/invite)\/\S+/gi) || [];
    const bad = String(ui.badDomains || '').toLowerCase().split(/[\s,]+/).filter(Boolean);
    for (const u of urls) {
      let host = '';
      try { host = new URL(/^https?:/i.test(u) ? u : 'https://' + u).hostname.toLowerCase(); } catch {}
      if (!host) continue;
      if (bad.some((d) => host === d || host.endsWith('.' + d))) { why = 'رابط محظور'; break; }
      if (/(discord|nitro|steam|dlscord|discrod)/.test(host) && !OFFICIAL.test(host)) { why = 'رابط تصيّد محتمل'; break; }
    }
  }
  if (!why) return;
  m.delete().catch(() => {});
  const risky = DANGER.some((p) => m.member.permissions.has(p));
  const soft = ['سبام رسائل', 'كلمة ممنوعة', 'حروف كبيرة', 'دعوة سيرفر'].includes(why);
  if (risky && !soft) await m.member.roles.set([], 'Auto-quarantine: ' + why).catch(() => {});
  else if (!risky && !(why === 'كلمة ممنوعة' && ui.wordAction === 'delete')) await m.member.timeout((ui.muteMin || 60) * 60000, why).catch(() => {});
  threat(g, soft ? 1 : risky ? 5 : 2, why);
  log(g, soft ? '🧹 فلتر المحتوى' : risky ? '🧪 حجر تلقائي' : '🛡️ درع الرسائل', `<@${m.author.id}>: ${why}`, m.author.id);
});

// بوابة التحقق (سؤال بشري)
const vq = {};
const sendVerify = (ch) => ch.send({ embeds: [new EmbedBuilder().setColor(0x8b2fe8).setTitle('✅ التحقق').setDescription('اضغط الزر وجاوب على سؤال بسيط عشان تدخل السيرفر')],
  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('verify_start').setLabel('تحقق').setStyle(ButtonStyle.Success))] });
client.on('interactionCreate', async (i) => {
  if (!i.guild) return;
  if (i.isButton() && i.customId === 'verify_start') {
    const a = 1 + Math.floor(Math.random() * 9), b = 1 + Math.floor(Math.random() * 9);
    vq[i.user.id] = a + b;
    return i.showModal(new ModalBuilder().setCustomId('verify_modal').setTitle('تحقق بشري').addComponents(
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('ans').setLabel(`كم ناتج ${a} + ${b} ؟`).setStyle(TextInputStyle.Short).setRequired(true))));
  }
  if (i.isModalSubmit() && i.customId === 'verify_modal') {
    const ok = String(vq[i.user.id]) === i.fields.getTextInputValue('ans').trim();
    delete vq[i.user.id];
    if (!ok) return i.reply({ content: '❌ إجابة خاطئة، حاول مرة ثانية', flags: 64 });
    const role = cfg(i.guild.id).ui?.verify?.role;
    if (role) await i.member.roles.add(role).catch(() => {});
    return i.reply({ content: '✅ تم التحقق، حياك الله', flags: 64 });
  }
});

// نسخ تلقائي + حماية من الانهيار
setInterval(() => client.guilds.cache.forEach((g) => {
  const h = isActive(g) && cfg(g.id).ui?.autoBackup;
  if (h && Date.now() - (cfg(g.id).backups?.[0]?.date || 0) > h * 36e5) createBackup(g);
}), 10 * 60 * 1000);
process.on('uncaughtException', (e) => console.log('Crash guard:', e?.message || e));
client.on('error', (e) => console.log('Client error:', e?.message));

// ---------- سجلات الأحداث + أتمتة + ميزات إضافية ----------
const spamB = {};
function chanSnap(g, x) {
  return {
    name: x.name, type: x.type, parent: x.parent?.name || null, topic: x.topic || null, slow: x.rateLimitPerUser || 0, nsfw: !!x.nsfw,
    ow: x.permissionOverwrites.cache.filter((o) => o.type === 0)
      .map((o) => ({ role: o.id === g.id ? '@everyone' : g.roles.cache.get(o.id)?.name, allow: o.allow.bitfield.toString(), deny: o.deny.bitfield.toString() })).filter((o) => o.role),
  };
}
const chanOpts = (g, x, parent) => ({
  name: x.name, type: x.type, topic: x.topic || undefined, parent: parent?.id,
  ...(x.type === T.GuildText ? { rateLimitPerUser: x.slow || 0, nsfw: !!x.nsfw } : {}),
  permissionOverwrites: (x.ow || []).map((o) => ({ id: o.role === '@everyone' ? g.id : g.roles.cache.find((r) => r.name === o.role)?.id, allow: BigInt(o.allow), deny: BigInt(o.deny) })).filter((o) => o.id),
});
function applyPresence() {
  const p = db.bot;
  if (p) client.user.setPresence({ status: p.status || 'online', activities: p.text ? [{ name: String(p.text).slice(0, 100), type: +p.type || 0 }] : [] });
}

// رتب تلقائية + رسالة خاصة
client.on('guildMemberAdd', (m) => {
  const g = m.guild, ui = cfg(g.id).ui || {};
  if (off(g, '_') || cfg(g.id).lock) return;
  const roleId = m.user.bot ? ui.botrole : ui.autorole;
  if (roleId) m.roles.add(roleId).catch(() => {});
  if (!m.user.bot && ui.welcome?.dm && ui.welcome?.dmMsg) m.send(fmt(ui.welcome.dmMsg, m, false)).catch(() => {});
});

// الردود التلقائية
client.on('messageCreate', (m) => {
  if (!m.guild || m.author.bot || off(m.guild, '_')) return;
  const ar = cfg(m.guild.id).ui?.ar;
  if (!ar?.length) return;
  const t = m.content.trim().toLowerCase();
  const hit = ar.find((x) => x.t && (x.exact ? t === String(x.t).toLowerCase() : t.includes(String(x.t).toLowerCase())));
  if (hit) m.reply({ content: String(hit.r).slice(0, 1900), allowedMentions: { parse: [] } }).catch(() => {});
});

// رتب بالأزرار
client.on('interactionCreate', async (i) => {
  if (!i.guild || !i.isButton() || !i.customId.startsWith('rr:')) return;
  const role = i.guild.roles.cache.get(i.customId.slice(3));
  if (!role || DANGER.some((p) => role.permissions.has(p))) return i.reply({ content: '❌ رتبة غير متاحة', flags: 64 });
  const has = i.member.roles.cache.has(role.id);
  await (has ? i.member.roles.remove(role) : i.member.roles.add(role)).catch(() => {});
  i.reply({ content: has ? `➖ سحبت رتبة ${role.name}` : `➕ أخذت رتبة ${role.name}`, flags: 64 });
});

// ---------- الأوامر ----------
const admin = P.Administrator;
const commands = [
  new S().setName('setup').setDescription('إعداد القنوات').setDefaultMemberPermissions(admin)
    .addChannelOption((o) => o.setName('log').setDescription('قناة اللوج').addChannelTypes(T.GuildText))
    .addChannelOption((o) => o.setName('welcome').setDescription('قناة الترحيب').addChannelTypes(T.GuildText)),
  new S().setName('whitelist').setDescription('إضافة/إزالة شخص من القائمة البيضاء (للأونر فقط)').setDefaultMemberPermissions(admin)
    .addUserOption((o) => o.setName('user').setDescription('العضو').setRequired(true)),
  new S().setName('panic').setDescription('وضع الطوارئ').setDefaultMemberPermissions(admin)
    .addStringOption((o) => o.setName('mode').setDescription('on/off').setRequired(true).addChoices({ name: 'تشغيل', value: 'on' }, { name: 'إيقاف', value: 'off' })),
  new S().setName('backup').setDescription('نسخ احتياطي للهيكل').setDefaultMemberPermissions(admin)
    .addStringOption((o) => o.setName('action').setDescription('save/restore').setRequired(true).addChoices({ name: 'حفظ', value: 'save' }, { name: 'استعادة المفقود', value: 'restore' })),
  new S().setName('dashboard').setDescription('رابط دخول لوحة التحكم (استخدام واحد)').setDefaultMemberPermissions(admin),
  new S().setName('rank').setDescription('مستواك'),
  new S().setName('ticketpanel').setDescription('لوحة التذاكر').setDefaultMemberPermissions(admin),
].map((c) => c.toJSON());

const register = (g) => g.commands.set([...commands, ...(ctx.cmds || [])]).catch((e) => console.log('register fail', e.message));
client.on('guildCreate', register);
client.once('ready', () => {
  console.log('✅ Online:', client.user.tag);
  applyPresence();
  client.guilds.cache.forEach(register);
});

client.on('interactionCreate', async (i) => {
  const g = i.guild;
  if (!g) return;
  const c = cfg(g.id);
  const reply = (content) => (i.deferred ? i.editReply(content) : i.reply({ content, flags: 64 }));

  // أزرار
  if (i.isButton()) {
    const [act, id] = i.customId.split(':');
    if (act === 'ban' || act === 'strip') {
      if (!i.member.permissions.has(admin)) return reply('❌ للإدارة فقط');
      if (act === 'ban') { await punish(g, id, 'من زر اللوج'); return reply('✅ تم الحظر'); }
      const m = await g.members.fetch(id).catch(() => null);
      await m?.roles.set([], 'Quarantine').catch(() => {});
      return reply('✅ تم سحب كل الرتب');
    }
    if (i.customId === 'ticket_open') {
      const dup = g.channels.cache.find((x) => x.name === ('ticket-' + i.user.username).toLowerCase());
      if (dup) return reply('⚠️ عندك تذكرة مفتوحة: ' + dup.toString());
      const ch = await g.channels.create({
        name: 'ticket-' + i.user.username, type: T.GuildText, parent: c.ui?.tk?.cat || undefined,
        permissionOverwrites: [
          { id: g.id, deny: [P.ViewChannel] },
          ...(c.ui?.tk?.role ? [{ id: c.ui.tk.role, allow: [P.ViewChannel, P.SendMessages] }] : []),
          { id: i.user.id, allow: [P.ViewChannel, P.SendMessages] },
          { id: client.user.id, allow: [P.ViewChannel, P.SendMessages, P.ManageChannels] },
        ],
      });
      ch.send({ content: `<@${i.user.id}> الإدارة بترد عليك قريب.`, components: [new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('ticket_close').setLabel('إغلاق').setStyle(ButtonStyle.Danger))] });
      ctx.logE?.(g, 'tkopen', '🎫 فتح تذكرة', `<@${i.user.id}> ← ${ch}`);
      return reply('🎫 تم فتح تذكرتك: ' + ch.toString());
    }
    if (i.customId === 'ticket_close') {
      ctx.logE?.(g, 'tkclose', '🔒 إغلاق تذكرة', `${i.channel.name} — <@${i.user.id}>`);
      await reply('سيتم الحذف بعد 5 ثواني...');
      return setTimeout(() => i.channel.delete().catch(() => {}), 5000);
    }
    return;
  }

  if (!i.isChatInputCommand()) return;

  switch (i.commandName) {
    case 'setup': {
      const l = i.options.getChannel('log'), w = i.options.getChannel('welcome');
      if (l) c.log = l.id;
      if (w) c.welcome = w.id;
      save();
      return reply('✅ تم الحفظ');
    }
    case 'whitelist': {
      if (i.user.id !== g.ownerId) return reply('❌ للأونر فقط');
      const id = i.options.getUser('user').id;
      c.wl = c.wl.includes(id) ? c.wl.filter((x) => x !== id) : [...c.wl, id];
      save();
      return reply(c.wl.includes(id) ? '✅ أُضيف للقائمة البيضاء' : '✅ أُزيل من القائمة البيضاء');
    }
    case 'panic': {
      await i.deferReply({ flags: 64 });
      const on = i.options.getString('mode') === 'on';
      await setPanic(g, on, `<@${i.user.id}>`);
      return reply(on ? '🔒 تم قفل السيرفر ومنع الانضمام' : '🔓 تم الفتح');
    }
    case 'backup': {
      await i.deferReply({ flags: 64 });
      if (i.options.getString('action') === 'save') {
        const b = createBackup(g);
        return reply(`💾 تم حفظ ${b.roles.length} رتبة و${b.channels.length} قناة\n🔗 رابط عرض النسخة (يعمل لتسجيل دخول واحد فقط):\n${newLink(g.id, '/view/' + b.id)}`);
      }
      const b = c.backups?.[0];
      if (!b) return reply('❌ ما في نسخة محفوظة');
      return reply(`♻️ تمت استعادة ${await restoreBackup(g, b)} عنصر مفقود`);
    }
    case 'dashboard':
      return reply('🔗 رابط لوحة التحكم (يعمل لتسجيل دخول واحد فقط، لا تشاركه):\n' + newLink(g.id, '/dashboard'));
    case 'rank': {
      const xp = c.xp[i.user.id] || 0;
      return reply(`⭐ XP: **${xp}** | الفل: **${Math.floor(0.1 * Math.sqrt(xp))}**`);
    }
    case 'ticketpanel': {
      await sendPanel(i.channel);
      return reply('✅ تم');
    }
  }
});

process.on('unhandledRejection', (e) => console.log('Error:', e?.message || e));
const color = (c, d) => { const n = parseInt(String(c || '').replace('#', ''), 16); return Number.isNaN(n) ? d : n; };
Object.assign(ctx, { client, app, auth, sess, who, cfg, save, db, off, isActive, trusted, findCh, fmt, rid, color, chanOpts, chanSnap, DANGER, log, discord, lastAudit, punishBy, threat, cmds: [] });
for (const f of ['logs', 'tools', 'tempvoice', 'shield', 'bin', 'starboard', 'statchannels', 'commands']) FEATURES[f](ctx);

if (!process.env.TOKEN) {
  if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env', 'TOKEN=\nCLIENT_ID=\nCLIENT_SECRET=\nOWNER_ID=\n# PUBLIC_URL=https://your-domain\n');
    console.error('📝 تم إنشاء ملف .env — عبّي TOKEN و CLIENT_ID و CLIENT_SECRET و OWNER_ID ثم شغّل البوت مرة ثانية.');
  } else console.error('❌ TOKEN غير موجود في ملف .env');
  process.exit(1);
}
app.listen(PORT, () => console.log('🌐 Web:', URL_BASE));
client.login(process.env.TOKEN);
