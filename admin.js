var SB=“https://urfqevstrwsrtysbllah.supabase.co”;
var SK=“eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZnFldnN0cndzcnR5c2JsbGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNTQ5OTQsImV4cCI6MjEwMDkzMDk5NH0.9TPgghMQdHjqwRm51dEVHJ6O115FPBoYBfZHO_siTYI”;
var WA=“233537889150”;
var CUR=“dash”;
var _unis=[],_progs=[],_pu=[],_fp=[],_pg=0,_pp=100,_us=[],_fU=[],_aiSt=“pending”,_aiTimer=null;

function hd(){return{“apikey”:SK,“Authorization”:“Bearer “+SK,“Content-Type”:“application/json”,“Prefer”:“return=representation”};}

// Recursive batch fetch - gets ALL rows regardless of count
function dbG(t,q){
return dbBatch(t,q,0,[]);
}
function dbBatch(t,q,off,acc){
var h=hd();
var url=SB+”/rest/v1/”+t+”?”+(q||””)+”&limit=1000&offset=”+off;
return fetch(url,{headers:h}).then(function(r){
return r.ok?r.json():r.text().then(function(x){throw new Error(x);});
}).then(function(d){
var rows=acc.concat(d||[]);
if((d||[]).length===1000) return dbBatch(t,q,off+1000,rows);
return rows;
});
}
function dbP(t,b){return fetch(SB+”/rest/v1/”+t,{method:“POST”,headers:hd(),body:JSON.stringify(b)}).then(function(r){return r.ok?r.json():r.text().then(function(x){throw new Error(x);});});}
function dbU(t,id,b){return fetch(SB+”/rest/v1/”+t+”?id=eq.”+id,{method:“PATCH”,headers:hd(),body:JSON.stringify(b)}).then(function(r){return r.ok?r.json():r.text().then(function(x){throw new Error(x);});});}
function dbD(t,id){return fetch(SB+”/rest/v1/”+t+”?id=eq.”+id,{method:“DELETE”,headers:hd()}).then(function(r){if(!r.ok)throw new Error(r.status);});}
function dbS(k,v){var h=hd();h[“Prefer”]=“resolution=merge-duplicates”;return fetch(SB+”/rest/v1/settings”,{method:“POST”,headers:h,body:JSON.stringify({key:k,value:v,updated_at:new Date().toISOString()})}).then(function(r){if(!r.ok)throw new Error(“fail”);});}

function toast(m){var e=document.createElement(“div”);e.className=“toast”;e.textContent=m;document.getElementById(“toasts”).appendChild(e);setTimeout(function(){e.remove();},3000);}
function openMd(fn){document.getElementById(“mbd”).innerHTML=””;fn(document.getElementById(“mbd”));document.getElementById(“ov”).className=“open”;}
function closeMd(){document.getElementById(“ov”).className=””;}
document.getElementById(“mcl”).onclick=closeMd;
document.getElementById(“ov”).onclick=function(e){if(e.target===this)closeMd();};
function gv(id){var e=document.getElementById(id);return e?e.value.trim():””;}
function sv(id){var e=document.getElementById(id);return e?e.value:””;}
function ge(id){return document.getElementById(id);}
function fd(d){return d?new Date(d).toLocaleDateString(“en-GB”,{day:“numeric”,month:“short”,year:“numeric”}):”–”;}
function bx(t,c){var s=document.createElement(“span”);s.className=“bdg “+c;s.textContent=t;return s;}
function btn(txt,cls,fn){var b=document.createElement(“button”);b.className=“btn “+cls;b.textContent=txt;b.onclick=fn;return b;}
function fld(lbl,html){var d=document.createElement(“div”);d.className=“field”;d.innerHTML=”<label>”+lbl+”</label>”+html;return d;}
function brow(){var d=document.createElement(“div”);d.style.cssText=“display:flex;gap:8px;margin-top:14px;flex-wrap:wrap”;for(var i=0;i<arguments.length;i++)d.appendChild(arguments[i]);return d;}
function sp(){return document.createTextNode(” “);}
function csvDL(name,rows,cols){var lines=[cols.join(”,”)];rows.forEach(function(r){lines.push(cols.map(function(c){var v=r[c]||””;return’”’+String(v).replace(/”/g,’””’)+’”’;}).join(”,”));});var a=document.createElement(“a”);a.href=“data:text/csv;charset=utf-8,”+encodeURIComponent(lines.join(”\n”));a.download=name+”.csv”;a.click();}

var TABS=[{id:“dash”,label:“Dashboard”},{id:“unis”,label:“Universities”},{id:“progs”,label:“Programmes”},{id:“ai”,label:“AI Inbox”},{id:“schols”,label:“Scholarships”},{id:“news”,label:“News”},{id:“forms”,label:“Forms”},{id:“anns”,label:“Announcements”},{id:“pays”,label:“Payments”},{id:“users”,label:“Users”},{id:“appear”,label:“Appearance”},{id:“stext”,label:“Site Text”},{id:“feats”,label:“Toggles”},{id:“pstack”,label:“Paystack”}];

function buildTabs(){
var c=document.getElementById(“tabs”);c.innerHTML=””;
for(var i=0;i<TABS.length;i++){
var t=TABS[i];var b=document.createElement(“button”);b.className=“tab”+(CUR===t.id?” on”:””);b.textContent=t.label;b.setAttribute(“data-id”,t.id);
b.onclick=function(){CUR=this.getAttribute(“data-id”);_unis=[];_progs=[];_fp=[];_us=[];if(_aiTimer){clearInterval(_aiTimer);_aiTimer=null;}buildTabs();showPage(CUR);};
c.appendChild(b);
}
}
function showPage(id){
var m=document.getElementById(“main”);m.innerHTML=””;
if(id===“dash”)pgDash(m);else if(id===“unis”)pgUnis(m);else if(id===“progs”)pgProgs(m);
else if(id===“ai”)pgAI(m);else if(id===“schols”)pgSchols(m);else if(id===“news”)pgNews(m);
else if(id===“forms”)pgForms(m);else if(id===“anns”)pgAnns(m);else if(id===“pays”)pgPays(m);
else if(id===“users”)pgUsers(m);else if(id===“appear”)pgAppear(m);else if(id===“stext”)pgStext(m);
else if(id===“feats”)pgFeats(m);else if(id===“pstack”)pgPstack(m);
}

//  DASHBOARD
function pgDash(m){
var g=document.createElement(“div”);g.className=“stats”;m.appendChild(g);
var st=[{id:“s1”,l:“Universities”,pg:“unis”},{id:“s2”,l:“Programmes”,pg:“progs”},{id:“s3”,l:“Users”,pg:“users”},{id:“s4”,l:“Revenue GHC”,pg:“pays”},{id:“s5”,l:“Pending Pays”,pg:“pays”},{id:“s6”,l:“AI Questions”,pg:“ai”}];
for(var i=0;i<st.length;i++){
var b=document.createElement(“div”);b.className=“stat”;g.appendChild(b);
var n=document.createElement(“div”);n.className=“stat-n”;n.id=st[i].id;n.textContent=”…”;b.appendChild(n);
var l=document.createElement(“div”);l.className=“stat-l”;l.textContent=st[i].l;b.appendChild(l);
b.onclick=function(pg){return function(){CUR=pg;buildTabs();showPage(pg);};}(st[i].pg);
}
// Today stats
var today=new Date();today.setHours(0,0,0,0);
var todayStr=today.toISOString();
var card0=document.createElement(“div”);card0.className=“card”;m.appendChild(card0);
var ch0=document.createElement(“div”);ch0.className=“card-h”;card0.appendChild(ch0);
var ht0=document.createElement(“h3”);ht0.textContent=“Today”;ch0.appendChild(ht0);
var cb0=document.createElement(“div”);cb0.className=“card-b”;cb0.style.cssText=“display:flex;gap:20px;flex-wrap:wrap”;card0.appendChild(cb0);
var td1=document.createElement(“div”);td1.innerHTML=”<div style='font-size:22px;font-weight:900;color:#f1f5f9' id='td1'>…</div><div style='font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase'>New Signups</div>”;cb0.appendChild(td1);
var td2=document.createElement(“div”);td2.innerHTML=”<div style='font-size:22px;font-weight:900;color:#6ee7b7' id='td2'>…</div><div style='font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase'>Revenue GHC</div>”;cb0.appendChild(td2);
var td3=document.createElement(“div”);td3.innerHTML=”<div style='font-size:22px;font-weight:900;color:#fcd34d' id='td3'>…</div><div style='font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase'>AI Questions</div>”;cb0.appendChild(td3);

// Quick actions
var card=document.createElement(“div”);card.className=“card”;m.appendChild(card);
var ch=document.createElement(“div”);ch.className=“card-h”;card.appendChild(ch);
var ht=document.createElement(“h3”);ht.textContent=“Quick Actions”;ch.appendChild(ht);
var cb=document.createElement(“div”);cb.className=“card-b”;cb.style.cssText=“display:flex;gap:6px;flex-wrap:wrap”;card.appendChild(cb);
var qs=[[“Universities”,“unis”],[“Programmes”,“progs”],[“AI Inbox”,“ai”],[“Payments”,“pays”],[“Users”,“users”],[“Announcements”,“anns”],[“Appearance”,“appear”],[“Toggles”,“feats”],[“Edit Text”,“stext”],[“Paystack”,“pstack”]];
for(var j=0;j<qs.length;j++) cb.appendChild(btn(qs[j][0],“btn-s”,function(id){return function(){CUR=id;buildTabs();showPage(id);};}(qs[j][1])));

// Recent activity
var card2=document.createElement(“div”);card2.className=“card”;m.appendChild(card2);
var ch2=document.createElement(“div”);ch2.className=“card-h”;card2.appendChild(ch2);
var ht2=document.createElement(“h3”);ht2.textContent=“Recent Activity”;ch2.appendChild(ht2);
var cb2=document.createElement(“div”);cb2.className=“card-b”;cb2.id=“actfeed”;cb2.innerHTML=”<p class='muted'>Loading…</p>”;card2.appendChild(cb2);

dbG(“universities”,“active=eq.true&select=id”).then(function(d){var e=ge(“s1”);if(e)e.textContent=d.length;}).catch(function(){});
dbG(“programmes”,“active=eq.true&select=id”).then(function(d){var e=ge(“s2”);if(e)e.textContent=d.length;}).catch(function(){});
dbG(“profiles”,“select=id”).then(function(d){var e=ge(“s3”);if(e)e.textContent=d.length;}).catch(function(){});
dbG(“payments”,“status=eq.success&select=amount”).then(function(d){var e=ge(“s4”);if(e)e.textContent=Math.round((d||[]).reduce(function(s,x){return s+(x.amount||0);},0)/100);}).catch(function(){});
dbG(“payments”,“status=eq.pending&select=id”).then(function(d){var e=ge(“s5”);if(e)e.textContent=d.length;}).catch(function(){});
dbG(“ai_inbox”,“status=eq.pending&select=id”).then(function(d){var e=ge(“s6”);if(e)e.textContent=d.length;}).catch(function(){});
dbG(“profiles”,“created_at=gte.”+todayStr+”&select=id”).then(function(d){var e=ge(“td1”);if(e)e.textContent=d.length;}).catch(function(){});
dbG(“payments”,“status=eq.success&created_at=gte.”+todayStr+”&select=amount”).then(function(d){var e=ge(“td2”);if(e)e.textContent=Math.round((d||[]).reduce(function(s,x){return s+(x.amount||0);},0)/100);}).catch(function(){});
dbG(“ai_inbox”,“created_at=gte.”+todayStr+”&select=id”).then(function(d){var e=ge(“td3”);if(e)e.textContent=d.length;}).catch(function(){});
// Recent feed
Promise.all([
dbG(“payments”,“order=created_at.desc&select=user_email,amount,status,created_at&limit=5”),
dbG(“profiles”,“order=created_at.desc&select=email,full_name,created_at&limit=5”)
]).then(function(r){
var cb2=ge(“actfeed”);if(!cb2)return;cb2.innerHTML=””;
var items=[];
(r[0]||[]).forEach(function(p){items.push({t:p.created_at,txt:“Payment GHC “+((p.amount||0)/100).toFixed(2)+” from “+(p.user_email||”–”),c:p.status===“success”?“bg”:“br”,s:p.status});});
(r[1]||[]).forEach(function(u){items.push({t:u.created_at,txt:“New signup: “+(u.email||”–”),c:“bp”,s:“signup”});});
items.sort(function(a,b){return new Date(b.t)-new Date(a.t);});
items.slice(0,8).forEach(function(item){
var row=document.createElement(“div”);row.className=“lrow”;cb2.appendChild(row);
var left=document.createElement(“div”);left.appendChild(bx(item.s,item.c));left.style.cssText=“display:flex;align-items:center;gap:8px”;
var txt=document.createElement(“span”);txt.textContent=item.txt;txt.style.cssText=“font-size:12px;color:#f1f5f9”;left.appendChild(txt);row.appendChild(left);
var dt=document.createElement(“span”);dt.className=“muted”;dt.textContent=fd(item.t);row.appendChild(dt);
});
if(!items.length)cb2.innerHTML=”<p class='muted'>No recent activity.</p>”;
}).catch(function(){});
}

//  UNIVERSITIES
function pgUnis(m){
var sb=document.createElement(“div”);sb.className=“sb”;m.appendChild(sb);
var h=document.createElement(“h2”);h.className=“ph”;h.textContent=“Universities”;sb.appendChild(h);
var acts=document.createElement(“div”);acts.style.cssText=“display:flex;gap:6px;flex-wrap:wrap”;sb.appendChild(acts);
acts.appendChild(btn(”+ Add”,“btn-p”,function(){uniMd(null);}));
acts.appendChild(btn(“Export CSV”,“btn-gh”,function(){csvDL(“universities”,_unis,[“code”,“name”,“type”,“region”,“location”,“website”,“active”]);}));
var si=document.createElement(“input”);si.placeholder=“Search…”;si.style.cssText=“width:100%;padding:9px 12px;background:#1e1e32;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;font-size:13px;font-family:Arial,sans-serif;outline:none;margin-bottom:12px;box-sizing:border-box”;m.appendChild(si);
si.oninput=function(){renderUnis(si.value);};
var card=document.createElement(“div”);card.className=“card”;m.appendChild(card);
var tbl=document.createElement(“table”);card.appendChild(tbl);var thead=document.createElement(“thead”);tbl.appendChild(thead);var hr=document.createElement(“tr”);thead.appendChild(hr);
[“Code”,“Name”,“Type”,“Region”,“Progs”,“Status”,“Actions”].forEach(function(h){var th=document.createElement(“th”);th.textContent=h;hr.appendChild(th);});
var tb=document.createElement(“tbody”);tb.id=“utb”;tbl.appendChild(tb);tb.innerHTML=”<tr><td colspan='7' class='empty'>Loading…</td></tr>”;
Promise.all([dbG(“universities”,“order=name.asc&select=*”),dbG(“programmes”,“select=university_id”)]).then(function(r){
_unis=r[0]||[];var pc={};(r[1]||[]).forEach(function(p){pc[p.university_id]=(pc[p.university_id]||0)+1;});
_unis.forEach(function(u){u._pc=pc[u.id]||0;});renderUnis(””);
}).catch(function(e){toast(“Error: “+e.message);});
}
function renderUnis(q){
var tb=ge(“utb”);if(!tb)return;
var data=q?_unis.filter(function(u){return(u.name+u.code+(u.region||””)).toLowerCase().indexOf(q.toLowerCase())>=0;}):_unis;
tb.innerHTML=””;if(!data.length){tb.innerHTML=”<tr><td colspan='7' class='empty'>None found</td></tr>”;return;}
data.forEach(function(u){
var tr=document.createElement(“tr”);tb.appendChild(tr);
var c1=document.createElement(“td”);c1.appendChild(bx(u.code,“bp”));tr.appendChild(c1);
var c2=document.createElement(“td”);c2.textContent=u.name;c2.style.cssText=“font-weight:600;color:#f1f5f9;cursor:pointer”;
c2.onclick=function(uid){return function(){uniProgs(uid);};}(u.id);tr.appendChild(c2);
var c3=document.createElement(“td”);c3.appendChild(bx(u.type||”–”,u.type===“Public”?“bg”:“bo”));tr.appendChild(c3);
var c4=document.createElement(“td”);c4.textContent=u.region||”–”;c4.className=“muted”;tr.appendChild(c4);
var c5=document.createElement(“td”);c5.textContent=u._pc;c5.className=“muted”;tr.appendChild(c5);
var c6=document.createElement(“td”);c6.appendChild(bx(u.active?“Active”:“Hidden”,u.active?“bg”:“br”));tr.appendChild(c6);
var c7=document.createElement(“td”);c7.style.whiteSpace=“nowrap”;tr.appendChild(c7);
c7.appendChild(btn(“Edit”,“btn-gh btn-sm”,function(uid){return function(){var u=_unis.find(function(x){return x.id===uid;});if(u)uniMd(u);};}(u.id)));c7.appendChild(sp());
c7.appendChild(btn(u.active?“Hide”:“Show”,“btn-sm “+(u.active?“btn-o”:“btn-g”),function(uid,act){return function(){dbU(“universities”,uid,{active:!act}).then(function(){toast(“Done”);CUR=“unis”;buildTabs();showPage(“unis”);}).catch(function(e){toast(e.message);});};}(u.id,u.active)));c7.appendChild(sp());
c7.appendChild(btn(“Del”,“btn-r btn-sm”,function(uid){return function(){if(!confirm(“Delete?”))return;dbD(“universities”,uid).then(function(){toast(“Deleted”);CUR=“unis”;buildTabs();showPage(“unis”);}).catch(function(e){toast(e.message);});};}(u.id)));
});
}
function uniProgs(uid){
var u=_unis.find(function(x){return x.id===uid;});
openMd(function(body){
var h=document.createElement(“h3”);h.textContent=(u?u.name:“University”)+” - Programmes”;body.appendChild(h);
var p=document.createElement(“p”);p.className=“muted”;p.textContent=“Loading…”;body.appendChild(p);
dbG(“programmes”,“university_id=eq.”+uid+”&order=name.asc&select=id,name,degree,cutoff,active”).then(function(d){
p.remove();if(!d||!d.length){body.appendChild(document.createTextNode(“No programmes.”));return;}
// Bulk actions
var bar=document.createElement(“div”);bar.style.cssText=“display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap”;body.appendChild(bar);
bar.appendChild(btn(“Show All”,“btn-g btn-sm”,function(){Promise.all(d.map(function(p){return dbU(“programmes”,p.id,{active:true});})).then(function(){toast(“All shown”);closeMd();}).catch(function(){toast(“Error”);});}));
bar.appendChild(btn(“Hide All”,“btn-o btn-sm”,function(){Promise.all(d.map(function(p){return dbU(“programmes”,p.id,{active:false});})).then(function(){toast(“All hidden”);closeMd();}).catch(function(){toast(“Error”);});}));
var tbl=document.createElement(“table”);body.appendChild(tbl);var thead=document.createElement(“thead”);tbl.appendChild(thead);var hr=document.createElement(“tr”);thead.appendChild(hr);
[“Programme”,“Degree”,“Cut-off”,“Status”].forEach(function(h){var th=document.createElement(“th”);th.textContent=h;hr.appendChild(th);});
var tb=document.createElement(“tbody”);tbl.appendChild(tb);
d.forEach(function(p){
var tr=document.createElement(“tr”);tb.appendChild(tr);
var c1=document.createElement(“td”);c1.textContent=p.name;c1.style.color=”#f1f5f9”;tr.appendChild(c1);
var c2=document.createElement(“td”);c2.appendChild(bx(p.degree||”–”,“by”));tr.appendChild(c2);
var c3=document.createElement(“td”);c3.textContent=p.cutoff||”–”;c3.className=“muted”;tr.appendChild(c3);
var c4=document.createElement(“td”);c4.appendChild(bx(p.active?“Active”:“Hidden”,p.active?“bg”:“br”));tr.appendChild(c4);
});
body.appendChild(brow(btn(“Close”,“btn-gh”,closeMd)));
});
});
}
function uniMd(u){
openMd(function(body){
var h=document.createElement(“h3”);h.textContent=(u?“Edit”:“Add”)+” University”;body.appendChild(h);
var REGS=[“Greater Accra”,“Ashanti”,“Central”,“Eastern”,“Western”,“Northern”,“Upper East”,“Upper West”,“Volta”,“Bono”,“North East”,“Western North”];
var TYPES=[“Public”,“Private”,“Technical”,“Distance”];
body.appendChild(fld(“Code *”,”<input id='uf1' value='"+(u?u.code:"")+"'/>”));
body.appendChild(fld(“Full Name *”,”<input id='uf2' value='"+(u?u.name:"")+"'/>”));
body.appendChild(fld(“Short Name”,”<input id='uf3' value='"+(u?u.short_name||"":"")+"'/>”));
var g=document.createElement(“div”);g.className=“g2”;body.appendChild(g);
var d1=document.createElement(“div”);g.appendChild(d1);d1.appendChild(fld(“Type”,”<select id='uf4'>”+TYPES.map(function(t){return”<option”+(u&&u.type===t?” selected”:””)+”>”+t+”</option>”;}).join(””)+”</select>”));
var d2=document.createElement(“div”);g.appendChild(d2);d2.appendChild(fld(“Founded”,”<input id='uf5' type='number' value='"+(u?u.founded||"":"")+"'/>”));
var d3=document.createElement(“div”);g.appendChild(d3);d3.appendChild(fld(“City”,”<input id='uf6' value='"+(u?u.location||"":"")+"'/>”));
var d4=document.createElement(“div”);g.appendChild(d4);d4.appendChild(fld(“Region”,”<select id='uf7'>”+REGS.map(function(r){return”<option”+(u&&u.region===r?” selected”:””)+”>”+r+”</option>”;}).join(””)+”</select>”));
body.appendChild(fld(“Website”,”<input id='uf8' value='"+(u?u.website||"":"")+"'/>”));
body.appendChild(fld(“Logo URL”,”<input id='uf9' value='"+(u?u.logo_url||"":"")+"' placeholder='https://...'/>”));
body.appendChild(fld(“About”,”<textarea id='uf10'>”+(u?u.about||””:””)+”</textarea>”));
body.appendChild(brow(
btn(u?“Save”:“Add University”,“btn-p”,function(){
var code=gv(“uf1”).toUpperCase(),name=gv(“uf2”);if(!code||!name){toast(“Code and name required”);return;}
var b={code:code,name:name,short_name:gv(“uf3”)||code,type:sv(“uf4”),location:gv(“uf6”),region:sv(“uf7”),founded:parseInt(gv(“uf5”))||null,website:gv(“uf8”),logo_url:gv(“uf9”),about:gv(“uf10”),active:true,updated_at:new Date().toISOString()};
(u?dbU(“universities”,u.id,b):dbP(“universities”,b)).then(function(){toast(“Saved”);closeMd();CUR=“unis”;buildTabs();showPage(“unis”);}).catch(function(e){toast(e.message);});
}),
btn(“Cancel”,“btn-gh”,closeMd)
));
});
}

//  PROGRAMMES
function pgProgs(m){
var sb=document.createElement(“div”);sb.className=“sb”;m.appendChild(sb);
var h=document.createElement(“h2”);h.className=“ph”;h.textContent=“Programmes”;sb.appendChild(h);
var acts=document.createElement(“div”);acts.style.cssText=“display:flex;gap:6px;flex-wrap:wrap”;sb.appendChild(acts);
acts.appendChild(btn(”+ Add”,“btn-p”,function(){progMd(null);}));
acts.appendChild(btn(“Export CSV”,“btn-gh”,function(){csvDL(“programmes”,_fp,[“name”,“degree”,“cutoff”,“duration”,“fee”,“active”]);}));
var fl=document.createElement(“div”);fl.style.cssText=“display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px”;m.appendChild(fl);
var si=document.createElement(“input”);si.placeholder=“Search…”;si.style.cssText=“flex:1;min-width:140px;padding:9px 12px;background:#1e1e32;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;font-size:13px;font-family:Arial,sans-serif;outline:none”;fl.appendChild(si);
var uf=document.createElement(“select”);uf.style.cssText=“width:140px;padding:9px 12px;background:#1e1e32;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;font-size:13px;font-family:Arial,sans-serif;outline:none”;fl.appendChild(uf);uf.innerHTML=”<option value=''>All Universities</option>”;
var df=document.createElement(“select”);df.style.cssText=“width:110px;padding:9px 12px;background:#1e1e32;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;font-size:13px;font-family:Arial,sans-serif;outline:none”;fl.appendChild(df);df.innerHTML=”<option value=''>All Degrees</option>”;
[“BSc”,“BA”,“BEd”,“BTech”,“BBA”,“LLB”,“MBChB”,“HND”,“Diploma”,“Certificate”].forEach(function(d){var o=document.createElement(“option”);o.textContent=d;df.appendChild(o);});
var ct=document.createElement(“p”);ct.className=“muted”;ct.style.marginBottom=“8px”;m.appendChild(ct);
var card=document.createElement(“div”);card.className=“card”;m.appendChild(card);
var tbl=document.createElement(“table”);card.appendChild(tbl);var thead=document.createElement(“thead”);tbl.appendChild(thead);var hr=document.createElement(“tr”);thead.appendChild(hr);
[“Uni”,“Programme”,“Degree”,“Cut-off”,“Status”,“Actions”].forEach(function(h){var th=document.createElement(“th”);th.textContent=h;hr.appendChild(th);});
var tb=document.createElement(“tbody”);tb.id=“ptb”;tbl.appendChild(tb);
var pg=document.createElement(“div”);pg.className=“pager”;pg.id=“ppg”;card.appendChild(pg);
function filter(){var q=si.value.toLowerCase(),u=uf.value,d=df.value;_fp=_progs.filter(function(p){return(!q||p.name.toLowerCase().indexOf(q)>=0)&&(!u||p.university_id===u)&&(!d||p.degree===d);});_pg=0;renderProgs();ct.textContent=_fp.length+” of “+_progs.length+” programmes”;}
si.oninput=filter;uf.onchange=filter;df.onchange=filter;
var loading=document.createElement(“p”);loading.className=“muted”;loading.textContent=“Loading all programmes…”;m.appendChild(loading);
Promise.all([dbG(“programmes”,“order=name.asc&select=*”),dbG(“universities”,“select=id,code,name,short_name&order=name.asc”)]).then(function(r){
loading.remove();_progs=r[0]||[];_pu=r[1]||[];_fp=_progs;
_pu.forEach(function(u){var o=document.createElement(“option”);o.value=u.id;o.textContent=u.short_name||u.code;uf.appendChild(o);});
ct.textContent=“Loaded “+_progs.length+” programmes”;renderProgs();
}).catch(function(e){toast(“Error: “+e.message);});
}
function renderProgs(){
var tb=ge(“ptb”),pg=ge(“ppg”);if(!tb)return;
var um={};_pu.forEach(function(u){um[u.id]=u.short_name||u.code;});
var sl=_fp.slice(_pg*_pp,(_pg+1)*_pp);tb.innerHTML=””;
if(!sl.length){tb.innerHTML=”<tr><td colspan='6' class='empty'>None found</td></tr>”;}
else sl.forEach(function(p){
var tr=document.createElement(“tr”);tb.appendChild(tr);
var c1=document.createElement(“td”);c1.appendChild(bx(um[p.university_id]||”?”,“bp”));tr.appendChild(c1);
var c2=document.createElement(“td”);c2.textContent=p.name;c2.style.cssText=“color:#f1f5f9;font-weight:500”;tr.appendChild(c2);
var c3=document.createElement(“td”);c3.appendChild(bx(p.degree||”–”,“by”));tr.appendChild(c3);
var c4=document.createElement(“td”);c4.textContent=p.cutoff||”–”;c4.className=“muted”;tr.appendChild(c4);
var c5=document.createElement(“td”);c5.appendChild(bx(p.active?“Active”:“Hidden”,p.active?“bg”:“br”));tr.appendChild(c5);
var c6=document.createElement(“td”);c6.style.whiteSpace=“nowrap”;tr.appendChild(c6);
c6.appendChild(btn(“Edit”,“btn-gh btn-sm”,function(pid){return function(){var p=_progs.find(function(x){return x.id===pid;});if(p)progMd(p);};}(p.id)));c6.appendChild(sp());
c6.appendChild(btn(“Copy”,“btn-gh btn-sm”,function(pid){return function(){var p=_progs.find(function(x){return x.id===pid;});if(p){var c={};for(var k in p){c[k]=p[k];}delete c.id;delete c.created_at;delete c.updated_at;c.name=p.name+” (Copy)”;progMd(null,c);}};}(p.id)));c6.appendChild(sp());
c6.appendChild(btn(p.active?“Hide”:“Show”,“btn-sm “+(p.active?“btn-o”:“btn-g”),function(pid,act){return function(){dbU(“programmes”,pid,{active:!act}).then(function(){var pp=_progs.find(function(x){return x.id===pid;});if(pp)pp.active=!act;renderProgs();toast(“Done”);}).catch(function(e){toast(e.message);});};}(p.id,p.active)));c6.appendChild(sp());
c6.appendChild(btn(“Del”,“btn-r btn-sm”,function(pid){return function(){if(!confirm(“Delete?”))return;dbD(“programmes”,pid).then(function(){_progs=_progs.filter(function(x){return x.id!==pid;});_fp=_fp.filter(function(x){return x.id!==pid;});renderProgs();toast(“Deleted”);}).catch(function(e){toast(e.message);});};}(p.id)));
});
if(pg){pg.innerHTML=””;var pages=Math.ceil(_fp.length/_pp);if(pages>1){for(var i=0;i<Math.min(pages,20);i++){var b=document.createElement(“button”);b.className=“pbtn”+(i===_pg?” on”:””);b.textContent=i+1;b.setAttribute(“data-pg”,i);b.onclick=function(){_pg=parseInt(this.getAttribute(“data-pg”));renderProgs();};pg.appendChild(b);}}}
}
function progMd(p,prefill){
openMd(function(body){
var h=document.createElement(“h3”);h.textContent=(p?“Edit”:“Add”)+” Programme”;body.appendChild(h);
var src=prefill||p||{};
var uopts=”<option value=''>Select…</option>”+_pu.map(function(u){return”<option value=’”+u.id+”’”+(src.university_id===u.id?” selected”:””)+”>”+u.name+”</option>”;}).join(””);
var DEGS=[“BSc”,“BA”,“BEd”,“BTech”,“BBA”,“LLB”,“MBChB”,“HND”,“Diploma”,“Certificate”];
body.appendChild(fld(“University *”,”<select id='pf1'>”+uopts+”</select>”));
body.appendChild(fld(“Programme Name *”,”<input id='pf2' value='"+(src.name||"")+"'/>”));
var g=document.createElement(“div”);g.className=“g3”;body.appendChild(g);
var d1=document.createElement(“div”);g.appendChild(d1);d1.appendChild(fld(“Degree”,”<select id='pf3'>”+DEGS.map(function(d){return”<option”+(src.degree===d?” selected”:””)+”>”+d+”</option>”;}).join(””)+”</select>”));
var d2=document.createElement(“div”);g.appendChild(d2);d2.appendChild(fld(“Duration”,”<input id='pf4' value='"+(src.duration||"")+"'/>”));
var d3=document.createElement(“div”);g.appendChild(d3);d3.appendChild(fld(“Cut-off”,”<input id='pf5' type='number' value='"+(src.cutoff||"")+"'/>”));
body.appendChild(fld(“Tracks (comma separated)”,”<input id='pf6' value='"+(src.required_track?src.required_track.join(", "):"")+"'/>”));
body.appendChild(fld(“Annual Fee”,”<input id='pf7' value='"+(src.fee||"")+"'/>”));
body.appendChild(fld(“Career Paths”,”<textarea id='pf8'>”+(src.careers||””)+”</textarea>”));
body.appendChild(brow(
btn(p?“Save”:“Add”,“btn-p”,function(){
var uni=sv(“pf1”),name=gv(“pf2”);if(!uni||!name){toast(“University and name required”);return;}
var tracks=gv(“pf6”)?gv(“pf6”).split(”,”).map(function(x){return x.trim();}).filter(Boolean):[];
var b={university_id:uni,name:name,degree:sv(“pf3”),duration:gv(“pf4”),cutoff:parseInt(gv(“pf5”))||null,required_track:tracks,fee:gv(“pf7”),careers:gv(“pf8”),active:true,updated_at:new Date().toISOString()};
(p?dbU(“programmes”,p.id,b):dbP(“programmes”,b)).then(function(){toast(“Saved”);closeMd();CUR=“progs”;buildTabs();showPage(“progs”);}).catch(function(e){toast(e.message);});
}),
btn(“Cancel”,“btn-gh”,closeMd)
));
});
}

//  AI INBOX
function pgAI(m){
var sb=document.createElement(“div”);sb.className=“sb”;m.appendChild(sb);
var h=document.createElement(“h2”);h.className=“ph”;h.textContent=“AI Inbox”;sb.appendChild(h);
var rf=document.createElement(“div”);rf.style.cssText=“display:flex;gap:6px;align-items:center;flex-wrap:wrap”;sb.appendChild(rf);
var sel=document.createElement(“select”);sel.style.cssText=“padding:7px 10px;background:#1e1e32;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;font-size:12px;font-family:Arial,sans-serif;outline:none”;rf.appendChild(sel);
[{v:“pending”,t:“Unanswered”},{v:“answered”,t:“Answered”},{v:””,t:“All”}].forEach(function(o){var op=document.createElement(“option”);op.value=o.v;op.textContent=o.t;if(o.v===_aiSt)op.selected=true;sel.appendChild(op);});
var list=document.createElement(“div”);m.appendChild(list);
rf.appendChild(btn(“Refresh”,“btn-s btn-sm”,function(){loadAI(list,sel.value);}));
rf.appendChild(btn(“Dismiss All”,“btn-gh btn-sm”,function(){if(!confirm(“Dismiss all unanswered?”))return;dbG(“ai_inbox”,“status=eq.pending&select=id”).then(function(d){return Promise.all((d||[]).map(function(x){return dbU(“ai_inbox”,x.id,{status:“answered”,reply:”[Dismissed]”});}));}).then(function(){toast(“All dismissed”);loadAI(list,_aiSt);}).catch(function(){toast(“Error”);});}));
var autoLbl=document.createElement(“span”);autoLbl.className=“ai-auto”;autoLbl.id=“ailbl”;autoLbl.textContent=“Auto-refresh: ON”;rf.appendChild(autoLbl);
sel.onchange=function(){loadAI(list,sel.value);};
loadAI(list,_aiSt);
// Auto-refresh every 60 seconds
_aiTimer=setInterval(function(){
var lbl=ge(“ailbl”);if(lbl)lbl.textContent=“Auto-refresh: ON”;
loadAI(list,_aiSt);
},60000);
}
function loadAI(list,status){
_aiSt=status;list.innerHTML=”<p class='muted'>Loading…</p>”;
dbG(“ai_inbox”,(status?“status=eq.”+status+”&”:””)+“order=created_at.desc&select=*”).then(function(msgs){
list.innerHTML=””;if(!msgs||!msgs.length){list.innerHTML=”<div class='empty'>No questions here.</div>”;return;}
msgs.forEach(function(msg){
var card=document.createElement(“div”);card.className=“card”;card.style.marginBottom=“10px”;list.appendChild(card);
var cb=document.createElement(“div”);cb.className=“card-b”;card.appendChild(cb);
var top=document.createElement(“div”);top.style.cssText=“display:flex;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:6px”;cb.appendChild(top);
top.appendChild(bx(msg.status===“pending”?“Unanswered”:“Answered”,msg.status===“pending”?“br”:“bg”));
var dt=document.createElement(“span”);dt.className=“muted”;dt.textContent=fd(msg.created_at);top.appendChild(dt);
var q=document.createElement(“p”);q.style.cssText=“color:#f1f5f9;font-size:13px;margin:0 0 6px 0”;q.textContent=msg.question||””;cb.appendChild(q);
var em=document.createElement(“p”);em.style.cssText=“color:#64748b;font-size:12px;margin:0 0 10px 0”;em.textContent=msg.user_email||“Anonymous”;cb.appendChild(em);
if(msg.reply&&msg.status===“answered”){var rep=document.createElement(“div”);rep.style.cssText=“background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);border-radius:8px;padding:10px;font-size:12px;color:#6ee7b7;margin-bottom:8px”;rep.textContent=msg.reply;cb.appendChild(rep);}
if(msg.status===“pending”){
// WhatsApp quick reply button
var waRow=document.createElement(“div”);waRow.style.cssText=“display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap”;cb.appendChild(waRow);
var waBtn=document.createElement(“a”);waBtn.className=“btn btn-wa btn-sm”;waBtn.textContent=“Reply on WhatsApp”;waBtn.href=“https://wa.me/”+WA+”?text=”+encodeURIComponent(“Hi, regarding your question: “+msg.question+”\n\nAnswer: “);waBtn.target=”_blank”;waRow.appendChild(waBtn);
// Admin reply
var row=document.createElement(“div”);row.style.cssText=“display:flex;gap:8px”;cb.appendChild(row);
var inp=document.createElement(“input”);inp.placeholder=“Type reply to send to student…”;inp.style.cssText=“flex:1;padding:8px 10px;background:#1e1e32;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;font-size:12px;font-family:Arial,sans-serif;outline:none”;row.appendChild(inp);
row.appendChild(btn(“Send”,“btn-p btn-sm”,function(id,input){return function(){if(!input.value.trim()){toast(“Type a reply”);return;}dbU(“ai_inbox”,id,{reply:input.value.trim(),status:“answered”,replied_at:new Date().toISOString()}).then(function(){toast(“Sent”);loadAI(list,_aiSt);}).catch(function(e){toast(e.message);});};}(msg.id,inp)));
row.appendChild(btn(“Dismiss”,“btn-gh btn-sm”,function(id){return function(){dbU(“ai_inbox”,id,{status:“answered”,reply:”[Dismissed]”}).then(function(){toast(“Dismissed”);loadAI(list,_aiSt);}).catch(function(e){toast(e.message);});};}(msg.id)));
} else {
cb.appendChild(btn(“Reopen”,“btn-gh btn-sm”,function(id){return function(){dbU(“ai_inbox”,id,{status:“pending”,reply:null}).then(function(){toast(“Reopened”);loadAI(list,_aiSt);}).catch(function(e){toast(e.message);});};}(msg.id)));
}
});
}).catch(function(){list.innerHTML=”<div class='card'><div class='card-b'><p style='color:#fcd34d;margin:0 0 10px 0'>Run this SQL in Supabase to create AI Inbox:</p><pre style='background:#0f0f1a;padding:12px;border-radius:8px;font-size:11px;color:#94a3b8;white-space:pre-wrap;overflow:auto;margin:0'>CREATE TABLE IF NOT EXISTS public.ai_inbox (\n  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,\n  question text NOT NULL,\n  user_id uuid, user_email text,\n  status text DEFAULT ‘pending’,\n  reply text, replied_at timestamptz,\n  created_at timestamptz DEFAULT now()\n);\nGRANT ALL ON public.ai_inbox TO anon;</pre></div></div>”;});}

//  SCHOLARSHIPS
function pgSchols(m){var sb=document.createElement(“div”);sb.className=“sb”;m.appendChild(sb);var h=document.createElement(“h2”);h.className=“ph”;h.textContent=“Scholarships”;sb.appendChild(h);sb.appendChild(btn(”+ Add”,“btn-p”,function(){scholMd(null);}));var list=document.createElement(“div”);list.innerHTML=”<p class='muted'>Loading…</p>”;m.appendChild(list);loadSchols(list);}
function loadSchols(list){dbG(“scholarships”,“order=name.asc&select=*”).then(function(d){list.innerHTML=””;if(!d||!d.length){list.innerHTML=”<div class='empty'>No scholarships yet.</div>”;return;}d.forEach(function(s){var card=document.createElement(“div”);card.className=“card”;list.appendChild(card);var ch=document.createElement(“div”);ch.className=“card-h”;card.appendChild(ch);var info=document.createElement(“div”);ch.appendChild(info);var title=document.createElement(“h3”);title.textContent=s.name||“Scholarship”;info.appendChild(title);var sub=document.createElement(“p”);sub.className=“muted”;sub.textContent=(s.organization||””)+(s.amount?” - “+s.amount:””);info.appendChild(sub);var acts=document.createElement(“div”);acts.style.cssText=“display:flex;gap:5px;align-items:center”;ch.appendChild(acts);acts.appendChild(btn(“Edit”,“btn-gh btn-sm”,function(id){return function(){dbG(“scholarships”,“id=eq.”+id+”&select=*”).then(function(r){if(r[0])scholMd(r[0]);});};}(s.id)));acts.appendChild(btn(“Del”,“btn-r btn-sm”,function(id){return function(){if(!confirm(“Delete?”))return;dbD(“scholarships”,id).then(function(){toast(“Deleted”);CUR=“schols”;buildTabs();showPage(“schols”);}).catch(function(e){toast(e.message);});};}(s.id)));if(s.description){var cb=document.createElement(“div”);cb.className=“card-b muted”;cb.textContent=s.description;card.appendChild(cb);}});}).catch(function(){});}
function scholMd(s){openMd(function(body){var h=document.createElement(“h3”);h.textContent=(s?“Edit”:“Add”)+” Scholarship”;body.appendChild(h);body.appendChild(fld(“Name *”,”<input id='sc1' value='"+(s?s.name||"":"")+"'/>”));body.appendChild(fld(“Organisation”,”<input id='sc2' value='"+(s?s.organization||"":"")+"'/>”));body.appendChild(fld(“Amount”,”<input id='sc3' value='"+(s?s.amount||"":"")+"' placeholder='e.g. Full tuition'/>”));body.appendChild(fld(“Description”,”<textarea id='sc5'>”+(s?s.description||””:””)+”</textarea>”));body.appendChild(fld(“Eligibility”,”<textarea id='sc6'>”+(s?s.eligibility||””:””)+”</textarea>”));body.appendChild(fld(“Eligible Tracks (comma separated)”,”<input id='sc7' value='"+(s&&s.tracks?s.tracks.join(", "):"")+"'/>”));body.appendChild(brow(btn(s?“Save”:“Add”,“btn-p”,function(){if(!gv(“sc1”)){toast(“Name required”);return;}var tracks=gv(“sc7”)?gv(“sc7”).split(”,”).map(function(x){return x.trim();}).filter(Boolean):[];var b={name:gv(“sc1”),organization:gv(“sc2”),amount:gv(“sc3”),description:gv(“sc5”),eligibility:gv(“sc6”),tracks:tracks};(s?dbU(“scholarships”,s.id,b):dbP(“scholarships”,b)).then(function(){toast(“Saved”);closeMd();CUR=“schols”;buildTabs();showPage(“schols”);}).catch(function(e){toast(e.message);});}),btn(“Cancel”,“btn-gh”,closeMd)));});}

//  NEWS
function pgNews(m){var sb=document.createElement(“div”);sb.className=“sb”;m.appendChild(sb);var h=document.createElement(“h2”);h.className=“ph”;h.textContent=“News”;sb.appendChild(h);sb.appendChild(btn(”+ Add”,“btn-p”,function(){newsMd(null);}));var list=document.createElement(“div”);list.innerHTML=”<p class='muted'>Loading…</p>”;m.appendChild(list);loadNews(list);}
function loadNews(list){dbG(“news”,“order=created_at.desc&select=*”).then(function(d){list.innerHTML=””;if(!d||!d.length){list.innerHTML=”<div class='empty'>No news yet.</div>”;return;}d.forEach(function(n){var card=document.createElement(“div”);card.className=“card”;list.appendChild(card);var ch=document.createElement(“div”);ch.className=“card-h”;card.appendChild(ch);var info=document.createElement(“div”);ch.appendChild(info);var title=document.createElement(“h3”);title.textContent=n.title;info.appendChild(title);var sub=document.createElement(“p”);sub.className=“muted”;sub.textContent=(n.category||“General”)+(n.urgent?” - URGENT”:””)+” - “+fd(n.created_at);info.appendChild(sub);var acts=document.createElement(“div”);acts.style.cssText=“display:flex;gap:5px;align-items:center”;ch.appendChild(acts);acts.appendChild(bx(n.published?“Published”:“Draft”,n.published?“bg”:“by”));if(n.urgent)acts.appendChild(bx(“Urgent”,“br”));acts.appendChild(btn(“Edit”,“btn-gh btn-sm”,function(id){return function(){dbG(“news”,“id=eq.”+id+”&select=*”).then(function(r){if(r[0])newsMd(r[0]);});};}(n.id)));acts.appendChild(btn(“Del”,“btn-r btn-sm”,function(id){return function(){if(!confirm(“Delete?”))return;dbD(“news”,id).then(function(){toast(“Deleted”);CUR=“news”;buildTabs();showPage(“news”);}).catch(function(e){toast(e.message);});};}(n.id)));if(n.body){var cb=document.createElement(“div”);cb.className=“card-b muted”;cb.textContent=n.body.slice(0,120)+(n.body.length>120?”…”:””);card.appendChild(cb);}});}).catch(function(){});}
function newsMd(n){var CATS=[“General”,“Admissions”,“Results”,“Scholarships”,“Events”,“Announcements”];openMd(function(body){var h=document.createElement(“h3”);h.textContent=(n?“Edit”:“Add”)+” News”;body.appendChild(h);body.appendChild(fld(“Title *”,”<input id='nw1' value='"+(n?n.title||"":"")+"'/>”));var g=document.createElement(“div”);g.className=“g2”;body.appendChild(g);var d1=document.createElement(“div”);g.appendChild(d1);d1.appendChild(fld(“Category”,”<select id='nw2'>”+CATS.map(function(c){return”<option”+(n&&n.category===c?” selected”:””)+”>”+c+”</option>”;}).join(””)+”</select>”));var d2=document.createElement(“div”);g.appendChild(d2);d2.appendChild(fld(“Source”,”<input id='nw3' value='"+(n?n.source||"":"")+"'/>”));body.appendChild(fld(“Source URL”,”<input id='nw6' value='"+(n?n.source_url||"":"")+"'/>”));body.appendChild(fld(“Full Content”,”<textarea id='nw5'>”+(n?n.body||””:””)+”</textarea>”));var urg=document.createElement(“div”);urg.style.cssText=“display:flex;align-items:center;gap:8px;margin-bottom:12px”;var urgchk=document.createElement(“input”);urgchk.type=“checkbox”;urgchk.id=“nw4”;urgchk.style.width=“auto”;if(n&&n.urgent)urgchk.checked=true;var urglbl=document.createElement(“label”);urglbl.textContent=“Mark as Urgent”;urglbl.style.cssText=“color:#94a3b8;font-size:13px;cursor:pointer”;urglbl.htmlFor=“nw4”;urg.appendChild(urgchk);urg.appendChild(urglbl);body.appendChild(urg);body.appendChild(brow(btn(n?“Update”:“Publish”,“btn-p”,function(){if(!gv(“nw1”)){toast(“Title required”);return;}var urgEl=ge(“nw4”);var b={title:gv(“nw1”),category:sv(“nw2”),body:gv(“nw5”),source:gv(“nw3”),source_url:gv(“nw6”),urgent:urgEl?urgEl.checked:false,published:true,published_at:new Date().toISOString()};(n?dbU(“news”,n.id,b):dbP(“news”,b)).then(function(){toast(“Saved”);closeMd();CUR=“news”;buildTabs();showPage(“news”);}).catch(function(e){toast(e.message);});}),btn(“Cancel”,“btn-gh”,closeMd)));});}

//  FORMS
var _fU=[];function pgForms(m){var sb=document.createElement(“div”);sb.className=“sb”;m.appendChild(sb);var h=document.createElement(“h2”);h.className=“ph”;h.textContent=“Admission Forms”;sb.appendChild(h);sb.appendChild(btn(”+ Add”,“btn-p”,function(){formMd(null);}));var list=document.createElement(“div”);list.innerHTML=”<p class='muted'>Loading…</p>”;m.appendChild(list);dbG(“universities”,“select=id,name&order=name.asc”).then(function(unis){_fU=unis||[];loadForms(list);});}
function loadForms(list){Promise.all([dbG(“admission_forms”,“order=deadline.asc&select=*”),dbG(“universities”,“select=id,name”)]).then(function(r){list.innerHTML=””;var um={};(r[1]||[]).forEach(function(u){um[u.id]=u.name;});var forms=r[0]||[];if(!forms.length){list.innerHTML=”<div class='empty'>No forms yet.</div>”;return;}var card=document.createElement(“div”);card.className=“card”;list.appendChild(card);var tbl=document.createElement(“table”);card.appendChild(tbl);var thead=document.createElement(“thead”);tbl.appendChild(thead);var hr=document.createElement(“tr”);thead.appendChild(hr);[“University”,“Year”,“Fee”,“Deadline”,“Status”,“Actions”].forEach(function(h){var th=document.createElement(“th”);th.textContent=h;hr.appendChild(th);});var tb=document.createElement(“tbody”);tbl.appendChild(tb);forms.forEach(function(f){var tr=document.createElement(“tr”);tb.appendChild(tr);var c1=document.createElement(“td”);c1.textContent=um[f.university_id]||”–”;c1.className=“muted”;tr.appendChild(c1);var c2=document.createElement(“td”);c2.textContent=f.academic_year||”–”;c2.style.color=”#f1f5f9”;tr.appendChild(c2);var c3=document.createElement(“td”);c3.textContent=f.fee||”–”;tr.appendChild(c3);var c4=document.createElement(“td”);c4.textContent=f.deadline?fd(f.deadline):”–”;c4.className=“muted”;tr.appendChild(c4);var c5=document.createElement(“td”);c5.appendChild(bx(f.status||“open”,f.status===“closed”?“br”:“bg”));tr.appendChild(c5);var c6=document.createElement(“td”);c6.style.whiteSpace=“nowrap”;tr.appendChild(c6);c6.appendChild(btn(“Edit”,“btn-gh btn-sm”,function(id){return function(){dbG(“admission_forms”,“id=eq.”+id+”&select=*”).then(function(r){if(r[0])formMd(r[0]);});};}(f.id)));c6.appendChild(sp());c6.appendChild(btn(f.status===“closed”?“Reopen”:“Close”,“btn-sm “+(f.status===“closed”?“btn-g”:“btn-o”),function(id,st){return function(){dbU(“admission_forms”,id,{status:st===“closed”?“open”:“closed”,updated_at:new Date().toISOString()}).then(function(){toast(“Updated”);CUR=“forms”;buildTabs();showPage(“forms”);}).catch(function(e){toast(e.message);});};}(f.id,f.status)));c6.appendChild(sp());c6.appendChild(btn(“Del”,“btn-r btn-sm”,function(id){return function(){if(!confirm(“Delete?”))return;dbD(“admission_forms”,id).then(function(){toast(“Deleted”);CUR=“forms”;buildTabs();showPage(“forms”);}).catch(function(e){toast(e.message);});};}(f.id)));});}).catch(function(){});}
function formMd(f){openMd(function(body){var h=document.createElement(“h3”);h.textContent=(f?“Edit”:“Add”)+” Admission Form”;body.appendChild(h);var uopts=”<option value=''>Select…</option>”+_fU.map(function(u){return”<option value=’”+u.id+”’”+(f&&f.university_id===u.id?” selected”:””)+”>”+u.name+”</option>”;}).join(””);body.appendChild(fld(“University *”,”<select id='ff1'>”+uopts+”</select>”));body.appendChild(fld(“Academic Year”,”<input id='ff2' value='"+(f?f.academic_year||"":"")+"' placeholder='e.g. 2025/2026'/>”));var g=document.createElement(“div”);g.className=“g2”;body.appendChild(g);var d1=document.createElement(“div”);g.appendChild(d1);d1.appendChild(fld(“Fee”,”<input id='ff3' value='"+(f?f.fee||"":"")+"'/>”));var d2=document.createElement(“div”);g.appendChild(d2);d2.appendChild(fld(“Deadline”,”<input id='ff4' type='date' value='"+(f?f.deadline||"":"")+"'/>”));body.appendChild(fld(“Portal URL”,”<input id='ff5' value='"+(f?f.portal_url||"":"")+"'/>”));body.appendChild(fld(“Notes”,”<textarea id='ff6'>”+(f?f.notes||””:””)+”</textarea>”));body.appendChild(brow(btn(f?“Save”:“Add”,“btn-p”,function(){if(!sv(“ff1”)){toast(“Select a university”);return;}var b={university_id:sv(“ff1”),academic_year:gv(“ff2”),fee:gv(“ff3”),deadline:gv(“ff4”)||null,portal_url:gv(“ff5”),notes:gv(“ff6”),status:“open”,updated_at:new Date().toISOString()};(f?dbU(“admission_forms”,f.id,b):dbP(“admission_forms”,b)).then(function(){toast(“Saved”);closeMd();CUR=“forms”;buildTabs();showPage(“forms”);}).catch(function(e){toast(e.message);});}),btn(“Cancel”,“btn-gh”,closeMd)));});}

//  ANNOUNCEMENTS
function pgAnns(m){var sb=document.createElement(“div”);sb.className=“sb”;m.appendChild(sb);var h=document.createElement(“h2”);h.className=“ph”;h.textContent=“Announcements”;sb.appendChild(h);sb.appendChild(btn(”+ Add”,“btn-p”,function(){annMd(null);}));var list=document.createElement(“div”);list.innerHTML=”<p class='muted'>Loading…</p>”;m.appendChild(list);loadAnns(list);}
function loadAnns(list){dbG(“announcements”,“order=starts_at.desc&select=*”).then(function(d){list.innerHTML=””;if(!d||!d.length){list.innerHTML=”<div class='empty'>No announcements yet.</div>”;return;}d.forEach(function(a){var card=document.createElement(“div”);card.className=“card”;list.appendChild(card);var ch=document.createElement(“div”);ch.className=“card-h”;card.appendChild(ch);var left=document.createElement(“div”);left.style.cssText=“display:flex;align-items:center;gap:8px”;ch.appendChild(left);var dot=document.createElement(“span”);dot.style.cssText=“width:10px;height:10px;border-radius:50%;background:”+(a.color||”#7C3AED”)+”;flex-shrink:0”;left.appendChild(dot);var txt=document.createElement(“span”);txt.style.cssText=“color:#f1f5f9;font-weight:600;font-size:13px”;txt.textContent=a.title||””;left.appendChild(txt);var acts=document.createElement(“div”);acts.style.cssText=“display:flex;gap:5px;align-items:center”;ch.appendChild(acts);acts.appendChild(bx(a.active?“Live”:“Hidden”,a.active?“bg”:“by”));acts.appendChild(btn(“Edit”,“btn-gh btn-sm”,function(id){return function(){dbG(“announcements”,“id=eq.”+id+”&select=*”).then(function(r){if(r[0])annMd(r[0]);});};}(a.id)));acts.appendChild(btn(a.active?“Hide”:“Show”,“btn-sm “+(a.active?“btn-o”:“btn-g”),function(id,act){return function(){dbU(“announcements”,id,{active:!act}).then(function(){toast(act?“Hidden”:“Live”);CUR=“anns”;buildTabs();showPage(“anns”);}).catch(function(e){toast(e.message);});};}(a.id,a.active)));acts.appendChild(btn(“Del”,“btn-r btn-sm”,function(id){return function(){if(!confirm(“Delete?”))return;dbD(“announcements”,id).then(function(){toast(“Deleted”);CUR=“anns”;buildTabs();showPage(“anns”);}).catch(function(e){toast(e.message);});};}(a.id)));});}).catch(function(){});}
function annMd(a){openMd(function(body){var h=document.createElement(“h3”);h.textContent=(a?“Edit”:“New”)+” Announcement”;body.appendChild(h);body.appendChild(fld(“Title *”,”<input id='an1' value='"+(a?a.title||"":"")+"'/>”));body.appendChild(fld(“Body / Message”,”<textarea id='an4'>”+(a?a.body||””:””)+”</textarea>”));var g=document.createElement(“div”);g.className=“g2”;body.appendChild(g);var d1=document.createElement(“div”);g.appendChild(d1);d1.appendChild(fld(“Color”,”<input id='an2' type='color' value='"+(a?a.color||"#7C3AED":"#7C3AED")+"'/>”));var d2=document.createElement(“div”);g.appendChild(d2);d2.appendChild(fld(“Link URL”,”<input id='an3' value='"+(a?a.link||"":"")+"'/>”));body.appendChild(fld(“Link Text”,”<input id='an5' value='"+(a?a.link_text||"":"")+"'/>”));var g2=document.createElement(“div”);g2.className=“g2”;body.appendChild(g2);var d3=document.createElement(“div”);g2.appendChild(d3);d3.appendChild(fld(“Start Date”,”<input id='an6' type='datetime-local' value='"+(a&&a.starts_at?a.starts_at.slice(0,16):"")+"'/>”));var d4=document.createElement(“div”);g2.appendChild(d4);d4.appendChild(fld(“End Date”,”<input id='an7' type='datetime-local' value='"+(a&&a.ends_at?a.ends_at.slice(0,16):"")+"'/>”));body.appendChild(brow(btn(a?“Save”:“Add”,“btn-p”,function(){if(!gv(“an1”)){toast(“Title required”);return;}var col=ge(“an2”);var b={title:gv(“an1”),body:gv(“an4”),color:col?col.value:”#7C3AED”,link:gv(“an3”)||null,link_text:gv(“an5”)||null,starts_at:gv(“an6”)||new Date().toISOString(),ends_at:gv(“an7”)||null,active:true};(a?dbU(“announcements”,a.id,b):dbP(“announcements”,b)).then(function(){toast(“Saved”);closeMd();CUR=“anns”;buildTabs();showPage(“anns”);}).catch(function(e){toast(e.message);});}),btn(“Cancel”,“btn-gh”,closeMd)));});}

//  PAYMENTS
function pgPays(m){
var sb=document.createElement(“div”);sb.className=“sb”;m.appendChild(sb);
var h=document.createElement(“h2”);h.className=“ph”;h.textContent=“Payments”;sb.appendChild(h);
var rf=document.createElement(“div”);rf.style.cssText=“display:flex;gap:6px;flex-wrap:wrap”;sb.appendChild(rf);
var sel=document.createElement(“select”);sel.style.cssText=“padding:7px 10px;background:#1e1e32;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;font-size:12px;font-family:Arial,sans-serif;outline:none”;rf.appendChild(sel);
[{v:””,t:“All”},{v:“success”,t:“Successful”},{v:“pending”,t:“Pending”},{v:“failed”,t:“Failed”},{v:“refunded”,t:“Refunded”}].forEach(function(o){var op=document.createElement(“option”);op.value=o.v;op.textContent=o.t;sel.appendChild(op);});
var si=document.createElement(“input”);si.placeholder=“Search email…”;si.style.cssText=“width:160px;padding:7px 10px;background:#1e1e32;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;font-size:12px;font-family:Arial,sans-serif;outline:none”;rf.appendChild(si);
var sum=document.createElement(“p”);sum.className=“muted”;sum.style.marginBottom=“12px”;m.appendChild(sum);
var card=document.createElement(“div”);card.className=“card”;m.appendChild(card);
var tbl=document.createElement(“table”);card.appendChild(tbl);var thead=document.createElement(“thead”);tbl.appendChild(thead);var hr=document.createElement(“tr”);thead.appendChild(hr);
[“Date”,“User”,“Amount”,“Plan”,“Status”,“Actions”].forEach(function(h){var th=document.createElement(“th”);th.textContent=h;hr.appendChild(th);});
var tb=document.createElement(“tbody”);tb.id=“pytb”;tbl.appendChild(tb);
var allPays=[];
function render(){
var q=si.value.toLowerCase(),st=sel.value;
var data=allPays.filter(function(p){return(!st||p.status===st)&&(!q||(p.user_email||””).toLowerCase().indexOf(q)>=0);});
var rev=data.filter(function(p){return p.status===“success”;}).reduce(function(s,p){return s+(p.amount||0);},0);
sum.textContent=data.length+” records - GHC “+Math.round(rev/100)+” collected”;
var tb=ge(“pytb”);if(!tb)return;tb.innerHTML=””;
if(!data.length){tb.innerHTML=”<tr><td colspan='6' class='empty'>No payments</td></tr>”;return;}
data.forEach(function(p){var tr=document.createElement(“tr”);tb.appendChild(tr);var c1=document.createElement(“td”);c1.textContent=fd(p.created_at);c1.className=“muted”;tr.appendChild(c1);var c2=document.createElement(“td”);c2.textContent=p.user_email||”–”;c2.style.color=”#f1f5f9”;tr.appendChild(c2);var c3=document.createElement(“td”);c3.textContent=“GHC “+((p.amount||0)/100).toFixed(2);c3.style.cssText=“font-weight:700;color:#f1f5f9”;tr.appendChild(c3);var c4=document.createElement(“td”);c4.appendChild(bx(p.plan||”–”,“bb”));tr.appendChild(c4);var c5=document.createElement(“td”);c5.appendChild(bx(p.status,p.status===“success”?“bg”:p.status===“pending”?“bo”:p.status===“refunded”?“bb”:“br”));tr.appendChild(c5);var c6=document.createElement(“td”);tr.appendChild(c6);if(p.status===“pending”)c6.appendChild(btn(“Approve”,“btn-g btn-sm”,function(id){return function(){dbU(“payments”,id,{status:“success”,verified_at:new Date().toISOString()}).then(function(){toast(“Approved”);load();}).catch(function(e){toast(e.message);});};}(p.id)));if(p.status===“success”)c6.appendChild(btn(“Refund”,“btn-gh btn-sm”,function(id){return function(){if(!confirm(“Refund?”))return;dbU(“payments”,id,{status:“refunded”}).then(function(){toast(“Refunded”);load();}).catch(function(e){toast(e.message);});};}(p.id)));});
}
function load(){dbG(“payments”,“order=created_at.desc&select=*”).then(function(d){allPays=d||[];render();}).catch(function(){});}
sel.onchange=render;si.oninput=render;load();
}

//  USERS
var _us=[];function pgUsers(m){
var sb=document.createElement(“div”);sb.className=“sb”;m.appendChild(sb);
var h=document.createElement(“h2”);h.className=“ph”;h.textContent=“Users”;sb.appendChild(h);
var acts=document.createElement(“div”);acts.style.cssText=“display:flex;gap:6px;flex-wrap:wrap”;sb.appendChild(acts);
acts.appendChild(btn(“Export CSV”,“btn-gh”,function(){csvDL(“users”,_us,[“email”,“full_name”,“plan”,“created_at”]);}));
var si=document.createElement(“input”);si.placeholder=“Search…”;si.style.cssText=“width:200px;padding:7px 10px;background:#1e1e32;border:1.5px solid rgba(255,255,255,.08);border-radius:8px;color:#f1f5f9;font-size:12px;font-family:Arial,sans-serif;outline:none”;sb.appendChild(si);
var ct=document.createElement(“p”);ct.className=“muted”;ct.style.marginBottom=“12px”;m.appendChild(ct);
var card=document.createElement(“div”);card.className=“card”;m.appendChild(card);
var tbl=document.createElement(“table”);card.appendChild(tbl);var thead=document.createElement(“thead”);tbl.appendChild(thead);var hr=document.createElement(“tr”);thead.appendChild(hr);
[“Name”,“Email”,“Joined”,“Paid”,“Plan”,“Actions”].forEach(function(h){var th=document.createElement(“th”);th.textContent=h;hr.appendChild(th);});
var tb=document.createElement(“tbody”);tb.id=“ustb”;tbl.appendChild(tb);
function renderU(data){var tb=ge(“ustb”);if(!tb)return;tb.innerHTML=””;if(!data.length){tb.innerHTML=”<tr><td colspan='6' class='empty'>No users</td></tr>”;return;}data.forEach(function(u){var tr=document.createElement(“tr”);tb.appendChild(tr);var c1=document.createElement(“td”);c1.textContent=u.full_name||u.name||”–”;c1.style.cssText=“color:#f1f5f9;font-weight:500”;tr.appendChild(c1);var c2=document.createElement(“td”);c2.textContent=u.email||”–”;c2.className=“muted”;tr.appendChild(c2);var c3=document.createElement(“td”);c3.textContent=fd(u.created_at);c3.className=“muted”;tr.appendChild(c3);var c4=document.createElement(“td”);c4.textContent=“GHC “+((u._paid||0)/100).toFixed(2);c4.style.color=(u._paid||0)>0?”#10b981”:”#475569”;tr.appendChild(c4);var c5=document.createElement(“td”);c5.appendChild(bx(u.plan||“free”,u.plan===“premium”?“bp”:u.plan===“basic”?“bg”:“by”));tr.appendChild(c5);var c6=document.createElement(“td”);c6.style.whiteSpace=“nowrap”;tr.appendChild(c6);c6.appendChild(btn(“View”,“btn-gh btn-sm”,function(uid){return function(){uView(uid);};}(u.id)));c6.appendChild(sp());c6.appendChild(btn(“Upgrade”,“btn-s btn-sm”,function(u){return function(){uUpgrade(u);};}(u)));});}
si.oninput=function(){renderU(_us.filter(function(u){return((u.email||””)+(u.full_name||u.name||””)).toLowerCase().indexOf(si.value.toLowerCase())>=0;}));};
Promise.all([dbG(“profiles”,“order=created_at.desc&select=*”),dbG(“payments”,“status=eq.success&select=user_id,amount”)]).then(function(r){var pm={};(r[1]||[]).forEach(function(p){pm[p.user_id]=(pm[p.user_id]||0)+(p.amount||0);});_us=(r[0]||[]).map(function(u){u._paid=pm[u.id]||0;return u;});ct.textContent=_us.length+” users”;renderU(_us);}).catch(function(){dbG(“profiles”,“select=*”).then(function(d){_us=d||[];renderU(_us);}).catch(function(){});});
}
function uView(id){var u=_us.find(function(x){return x.id===id;});if(!u)return;dbG(“payments”,“user_id=eq.”+id+”&select=*&order=created_at.desc”).then(function(pays){openMd(function(body){var h=document.createElement(“h3”);h.textContent=u.full_name||u.email||“User”;body.appendChild(h);[[“Email”,u.email||”–”],[“Joined”,fd(u.created_at)],[“Paid”,“GHC “+((u._paid||0)/100).toFixed(2)],[“Plan”,u.plan||“free”]].forEach(function(row){var r=document.createElement(“div”);r.className=“lrow”;body.appendChild(r);var info=document.createElement(“div”);var h4=document.createElement(“h4”);h4.textContent=row[0];info.appendChild(h4);r.appendChild(info);var s=document.createElement(“span”);s.className=“muted”;s.textContent=row[1];r.appendChild(s);});if(pays&&pays.length){var pt=document.createElement(“p”);pt.style.cssText=“font-size:10px;font-weight:700;color:#475569;text-transform:uppercase;margin:12px 0 8px 0”;pt.textContent=“Payment History”;body.appendChild(pt);var tbl=document.createElement(“table”);body.appendChild(tbl);var htr=document.createElement(“tr”);var th2=document.createElement(“thead”);th2.appendChild(htr);tbl.appendChild(th2);[“Date”,“Amount”,“Status”].forEach(function(h){var th=document.createElement(“th”);th.textContent=h;htr.appendChild(th);});var tb=document.createElement(“tbody”);tbl.appendChild(tb);pays.forEach(function(p){var tr=document.createElement(“tr”);tb.appendChild(tr);[fd(p.created_at),“GHC “+((p.amount||0)/100).toFixed(2)].forEach(function(t){var td=document.createElement(“td”);td.textContent=t;tr.appendChild(td);});var td=document.createElement(“td”);td.appendChild(bx(p.status,p.status===“success”?“bg”:“bo”));tr.appendChild(td);});}body.appendChild(brow(btn(“Close”,“btn-gh”,closeMd)));});});}
function uUpgrade(u){openMd(function(body){var h=document.createElement(“h3”);h.textContent=“Upgrade “+( u.email||“User”);body.appendChild(h);var p=document.createElement(“p”);p.className=“muted”;p.style.marginBottom=“12px”;p.textContent=“Manually set plan for this user:”;body.appendChild(p);body.appendChild(fld(“Plan”,”<select id='uplan'><option value='free'>Free</option><option value=‘basic’”+(u.plan===‘basic’?’ selected’:’’)+”>Basic</option><option value=‘premium’”+(u.plan===‘premium’?’ selected’:’’)+”>Premium</option><option value=‘bundle’”+(u.plan===‘bundle’?’ selected’:’’)+”>Bundle</option></select>”));body.appendChild(brow(btn(“Save”,“btn-p”,function(){dbU(“profiles”,u.id,{plan:sv(“uplan”),updated_at:new Date().toISOString()}).then(function(){toast(“Plan updated”);u.plan=sv(“uplan”);closeMd();CUR=“users”;buildTabs();showPage(“users”);}).catch(function(e){toast(e.message);});}),btn(“Cancel”,“btn-gh”,closeMd)));});}

//  APPEARANCE
function pgAppear(m){var h=document.createElement(“h2”);h.className=“ph”;h.style.marginBottom=“14px”;h.textContent=“Appearance”;m.appendChild(h);var card=document.createElement(“div”);card.className=“card”;m.appendChild(card);var ch=document.createElement(“div”);ch.className=“card-h”;card.appendChild(ch);ch.appendChild(function(){var e=document.createElement(“h3”);e.textContent=“Colors”;return e;}());var cb=document.createElement(“div”);cb.className=“card-b”;card.appendChild(cb);var g=document.createElement(“div”);g.className=“g2”;cb.appendChild(g);[{id:“cp”,lbl:“Primary”,def:”#7C3AED”},{id:“ca”,lbl:“Accent”,def:”#EC4899”},{id:“cbg”,lbl:“Background”,def:”#0f0f1a”},{id:“cc”,lbl:“Card”,def:”#161625”}].forEach(function(c){var d=document.createElement(“div”);g.appendChild(d);d.appendChild(fld(c.lbl,”<div style='display:flex;gap:8px'><input id='"+c.id+"' type='color' value='"+c.def+"' style='width:40px;height:36px;border:1.5px solid rgba(255,255,255,.08);border-radius:7px;cursor:pointer;background:#1e1e32;padding:2px'/><input id='"+c.id+"t' value='"+c.def+"' style='flex:1'/></div>”));});var grad=document.createElement(“div”);grad.style.cssText=“height:32px;border-radius:8px;background:linear-gradient(135deg,#7C3AED,#EC4899);margin-bottom:12px”;cb.appendChild(grad);cb.appendChild(btn(“Save Colors”,“btn-p”,function(){Promise.all([dbS(“primary_color”,ge(“cp”)?ge(“cp”).value:”#7C3AED”),dbS(“accent_color”,ge(“ca”)?ge(“ca”).value:”#EC4899”),dbS(“bg_color”,ge(“cbg”)?ge(“cbg”).value:”#0f0f1a”),dbS(“card_color”,ge(“cc”)?ge(“cc”).value:”#161625”)]).then(function(){toast(“Saved”);}).catch(function(){toast(“Error”);});}));var card2=document.createElement(“div”);card2.className=“card”;m.appendChild(card2);var ch2=document.createElement(“div”);ch2.className=“card-h”;card2.appendChild(ch2);ch2.appendChild(function(){var e=document.createElement(“h3”);e.textContent=“Fonts”;return e;}());var cb2=document.createElement(“div”);cb2.className=“card-b”;card2.appendChild(cb2);var g2=document.createElement(“div”);g2.className=“g2”;cb2.appendChild(g2);var fd2=document.createElement(“div”);g2.appendChild(fd2);fd2.appendChild(fld(“Heading”,”<select id='fh'><option>Outfit</option><option>Inter</option><option>Poppins</option><option>Space Grotesk</option></select>”));var fb=document.createElement(“div”);g2.appendChild(fb);fb.appendChild(fld(“Body”,”<select id='fb'><option>Inter</option><option>Outfit</option><option>Poppins</option><option>DM Sans</option></select>”));cb2.appendChild(btn(“Save Fonts”,“btn-p”,function(){Promise.all([dbS(“font_heading”,sv(“fh”)),dbS(“font_body”,sv(“fb”))]).then(function(){toast(“Saved”);}).catch(function(){toast(“Error”);});}));dbG(“settings”,“key=in.("primary_color","accent_color","bg_color","card_color","font_heading","font_body")&select=key,value”).then(function(d){var map={primary_color:“cp”,accent_color:“ca”,bg_color:“cbg”,card_color:“cc”};(d||[]).forEach(function(s){if(map[s.key]){var e=ge(map[s.key]);if(e)e.value=s.value;var et=ge(map[s.key]+“t”);if(et)et.value=s.value;}if(s.key===“font_heading”){var e=ge(“fh”);if(e)e.value=s.value;}if(s.key===“font_body”){var e=ge(“fb”);if(e)e.value=s.value;}});}).catch(function(){});}

//  SITE TEXT
var ST=[“hero_title”,“hero_sub”,“hero_desc”,“btn_primary”,“btn_secondary”,“site_name”,“tagline”,“whatsapp”,“contact_email”,“facebook”,“instagram”,“twitter”,“tiktok”,“basic_name”,“basic_price”,“basic_desc”,“basic_perks”,“premium_name”,“premium_price”,“premium_desc”,“premium_perks”,“premium_badge”,“bundle_name”,“bundle_price”,“bundle_desc”,“bundle_perks”,“bundle_badge”,“footer_tag”,“copyright”,“maintenance_msg”,“whatsapp_fallback_msg”];
function pgStext(m){var h=document.createElement(“h2”);h.className=“ph”;h.style.marginBottom=“14px”;h.textContent=“Edit Site Text”;m.appendChild(h);function section(title,keys){var card=document.createElement(“div”);card.className=“card”;m.appendChild(card);var ch=document.createElement(“div”);ch.className=“card-h”;card.appendChild(ch);ch.appendChild(function(){var e=document.createElement(“h3”);e.textContent=title;return e;}());var cb=document.createElement(“div”);cb.className=“card-b”;card.appendChild(cb);keys.forEach(function(k){var lbl=k.replace(/_/g,” “).replace(/\b\w/g,function(c){return c.toUpperCase();});var isA=k.indexOf(“desc”)>=0||k.indexOf(“perks”)>=0||k.indexOf(“msg”)>=0;cb.appendChild(fld(lbl,isA?”<textarea id='st-"+k+"'></textarea>”:”<input id='st-"+k+"'/>”));});cb.appendChild(btn(“Save”,“btn-p”,function(ks){return function(){Promise.all(ks.map(function(k){var e=ge(“st-”+k);return e?dbS(k,e.value):Promise.resolve();})).then(function(){toast(“Saved”);}).catch(function(){toast(“Error”);});};}(keys)));}
section(“Hero Section”,[“hero_title”,“hero_sub”,“hero_desc”,“btn_primary”,“btn_secondary”]);
section(“Branding and Contact”,[“site_name”,“tagline”,“whatsapp”,“contact_email”,“facebook”,“instagram”,“twitter”,“tiktok”]);
section(“Basic Plan GHC 12”,[“basic_name”,“basic_price”,“basic_desc”,“basic_perks”]);
section(“Premium Plan GHC 26”,[“premium_name”,“premium_price”,“premium_desc”,“premium_perks”,“premium_badge”]);
section(“Bundle Plan GHC 32”,[“bundle_name”,“bundle_price”,“bundle_desc”,“bundle_perks”,“bundle_badge”]);
section(“Footer”,[“footer_tag”,“copyright”]);
section(“Special Messages”,[“maintenance_msg”,“whatsapp_fallback_msg”]);
dbG(“settings”,“key=in.(”+ST.map(function(k){return’”’+k+’”’;}).join(”,”)+”)”+”&select=key,value”).then(function(d){(d||[]).forEach(function(s){var e=ge(“st-”+s.key);if(e)e.value=s.value||””;});}).catch(function(){});}

var FEATS=[{k:“maintenance_mode”,l:“Maintenance Mode”,d:“Show maintenance page to students”},{k:“ai_counsellor”,l:“AI Counsellor”,d:“Enable AI chat on student site”},{k:“payments_enabled”,l:“Payments Enabled”,d:“Allow students to pay”},{k:“registration_open”,l:“Registration Open”,d:“Allow new registrations”},{k:“show_scholarships”,l:“Scholarships Page”,d:“Show scholarships section”},{k:“show_news”,l:“News and Updates”,d:“Show news section”},{k:“show_rankings”,l:“University Rankings”,d:“Show rankings table”},{k:“show_compare”,l:“Compare Universities”,d:“Allow side by side comparison”},{k:“show_calculator”,l:“Aggregate Calculator”,d:“Show WASSCE calculator”},{k:“show_forms”,l:“Admission Forms”,d:“Show forms tracker”},{k:“announcement_bar”,l:“Announcement Bar”,d:“Show banner at top of site”}];
function pgFeats(m){var h=document.createElement(“h2”);h.className=“ph”;h.style.marginBottom=“14px”;h.textContent=“Features and Toggles”;m.appendChild(h);var card=document.createElement(“div”);card.className=“card”;m.appendChild(card);var cb=document.createElement(“div”);cb.className=“card-b”;cb.id=“fbd”;cb.innerHTML=”<p class='muted'>Loading…</p>”;card.appendChild(cb);dbG(“settings”,“key=in.(”+FEATS.map(function(f){return’”’+f.k+’”’;}).join(”,”)+”)”+”&select=key,value”).then(function(d){var vals={};(d||[]).forEach(function(s){vals[s.k]=s.value===“true”;});cb.innerHTML=””;FEATS.forEach(function(f){var row=document.createElement(“div”);row.className=“lrow”;cb.appendChild(row);var info=document.createElement(“div”);var h4=document.createElement(“h4”);h4.textContent=f.l;info.appendChild(h4);var p=document.createElement(“p”);p.textContent=f.d;info.appendChild(p);row.appendChild(info);var tog=document.createElement(“button”);tog.className=“tog”+(vals[f.k]?” on”:””);row.appendChild(tog);var dot=document.createElement(“div”);dot.className=“tog-d”;tog.appendChild(dot);tog.onclick=function(key,b){return function(){var on=b.classList.contains(“on”);b.classList.toggle(“on”);dbS(key,String(!on)).then(function(){toast(!on?“Enabled”:“Disabled”);}).catch(function(){toast(“Error”);});};}(f.k,tog);});}).catch(function(){cb.innerHTML=”<p class='muted' style='color:#fcd34d'>Create settings table in Supabase first.</p>”;});}

function pgPstack(m){var h=document.createElement(“h2”);h.className=“ph”;h.style.marginBottom=“14px”;h.textContent=“Paystack Keys”;m.appendChild(h);var card=document.createElement(“div”);card.className=“card”;m.appendChild(card);var ch=document.createElement(“div”);ch.className=“card-h”;card.appendChild(ch);var ht=document.createElement(“h3”);ht.textContent=“API Keys”;ch.appendChild(ht);var mode=document.createElement(“span”);mode.id=“pkm”;mode.style.cssText=“font-size:12px;font-weight:700;color:#fcd34d”;mode.textContent=“Test Mode”;ch.appendChild(mode);var cb=document.createElement(“div”);cb.className=“card-b”;card.appendChild(cb);var warn=document.createElement(“div”);warn.style.cssText=“background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.2);border-radius:8px;padding:10px;margin-bottom:14px;font-size:12px;color:#fcd34d”;warn.textContent=“Only the Public Key is used on the student site.”;cb.appendChild(warn);var tl=document.createElement(“p”);tl.style.cssText=“font-size:10px;font-weight:700;color:#475569;text-transform:uppercase;margin-bottom:8px”;tl.textContent=“Test Keys”;cb.appendChild(tl);cb.appendChild(fld(“Test Public Key”,”<input id='pk1' placeholder='pk_test_...'/>”));cb.appendChild(fld(“Test Secret Key”,”<input id='pk2' type='password' placeholder='sk_test_...'/>”));var ll=document.createElement(“p”);ll.style.cssText=“font-size:10px;font-weight:700;color:#475569;text-transform:uppercase;margin:12px 0 8px 0”;ll.textContent=“Live Keys”;cb.appendChild(ll);cb.appendChild(fld(“Live Public Key”,”<input id='pk3' placeholder='pk_live_...'/>”));cb.appendChild(fld(“Live Secret Key”,”<input id='pk4' type='password' placeholder='sk_live_...'/>”));var lrow=document.createElement(“div”);lrow.className=“lrow”;lrow.style.margin=“10px 0”;cb.appendChild(lrow);var li=document.createElement(“div”);var lh=document.createElement(“h4”);lh.textContent=“Use Live Keys”;li.appendChild(lh);var lp=document.createElement(“p”);lp.textContent=“Switch on when Paystack approved”;li.appendChild(lp);lrow.appendChild(li);var ltog=document.createElement(“button”);ltog.className=“tog”;ltog.id=“pkt”;lrow.appendChild(ltog);var ldot=document.createElement(“div”);ldot.className=“tog-d”;ltog.appendChild(ldot);ltog.onclick=function(){ltog.classList.toggle(“on”);var live=ltog.classList.contains(“on”);var md=ge(“pkm”);if(md){md.textContent=live?“Live Mode”:“Test Mode”;md.style.color=live?”#6ee7b7”:”#fcd34d”;}};cb.appendChild(brow(btn(“Save Keys”,“btn-p”,function(){var live=ge(“pkt”)&&ge(“pkt”).classList.contains(“on”);var saves=[dbS(“pk_test_pub”,gv(“pk1”)),dbS(“pk_live_pub”,gv(“pk3”)),dbS(“pk_live_mode”,String(live))];if(gv(“pk2”))saves.push(dbS(“pk_test_sec”,gv(“pk2”)));if(gv(“pk4”))saves.push(dbS(“pk_live_sec”,gv(“pk4”)));Promise.all(saves).then(function(){toast(“Saved”);}).catch(function(){toast(“Error”);});}),btn(“Reload”,“btn-gh”,function(){pgPstack(document.getElementById(“main”));})));var card2=document.createElement(“div”);card2.className=“card”;m.appendChild(card2);var ch2=document.createElement(“div”);ch2.className=“card-h”;card2.appendChild(ch2);var ht2=document.createElement(“h3”);ht2.textContent=“Subscription Prices”;ch2.appendChild(ht2);var cb2=document.createElement(“div”);cb2.className=“card-b”;card2.appendChild(cb2);var g=document.createElement(“div”);g.className=“g3”;cb2.appendChild(g);var d1=document.createElement(“div”);g.appendChild(d1);d1.appendChild(fld(“Basic GHC”,”<input id='sp1' type='number' placeholder='12'/>”));var d2=document.createElement(“div”);g.appendChild(d2);d2.appendChild(fld(“Premium GHC”,”<input id='sp2' type='number' placeholder='26'/>”));var d3=document.createElement(“div”);g.appendChild(d3);d3.appendChild(fld(“Bundle GHC”,”<input id='sp3' type='number' placeholder='32'/>”));cb2.appendChild(btn(“Save Prices”,“btn-p”,function(){Promise.all([dbS(“price_basic”,gv(“sp1”)),dbS(“price_premium”,gv(“sp2”)),dbS(“price_bundle”,gv(“sp3”))]).then(function(){toast(“Saved”);}).catch(function(){toast(“Error”);});}));dbG(“settings”,“key=in.("pk_test_pub","pk_live_pub","pk_live_mode","price_basic","price_premium","price_bundle")&select=key,value”).then(function(d){var v={};(d||[]).forEach(function(s){v[s.key]=s.value;});if(v.pk_test_pub&&ge(“pk1”))ge(“pk1”).value=v.pk_test_pub;if(v.pk_live_pub&&ge(“pk3”))ge(“pk3”).value=v.pk_live_pub;if(v.price_basic&&ge(“sp1”))ge(“sp1”).value=v.price_basic;if(v.price_premium&&ge(“sp2”))ge(“sp2”).value=v.price_premium;if(v.price_bundle&&ge(“sp3”))ge(“sp3”).value=v.price_bundle;var live=v.pk_live_mode===“true”;var tog=ge(“pkt”);if(tog&&live)tog.classList.add(“on”);var md=ge(“pkm”);if(md){md.textContent=live?“Live Mode”:“Test Mode”;md.style.color=live?”#6ee7b7”:”#fcd34d”;}}).catch(function(){});}

buildTabs();
showPage(“dash”);
