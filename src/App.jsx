import { useState, useEffect, useRef } from “react”;

// ─── PROFILE ──────────────────────────────────────────────────────────────────
const P = { bw: 85, lbm: 60, fat: 25, height: 170, fatGoal: 10, age: 30 };
// Max HR ≈ 190, Zone 2 = 65-70% = 123-133 bpm

// ─── PLAN ─────────────────────────────────────────────────────────────────────
const PLAN = {
monday: {
label:“Monday”, short:“MON”, color:”#FF5722”, emoji:“⚡”,
focus:“Back & Core”, subtitle:“Half Day · 45 min”,
exercises:[
{name:“Treadmill Warm-Up”, machine:“Treadmill”, type:“cardio”, isCardio:true,
sets:[{duration:8,speed:6,incline:2}], note:“5.5–6.5 km/h, incline 2%”},
{name:“Seated Cable Row”, machine:“Cable Machine”, type:“back”,
sets:[{reps:12,weight:40},{reps:12,weight:40},{reps:10,weight:45},{reps:10,weight:45}],
note:“Retract scapula. Chest up, neutral spine.”},
{name:“Lat Pulldown Wide”, machine:“Lat Pulldown Machine”, type:“back”,
sets:[{reps:12,weight:45},{reps:12,weight:45},{reps:10,weight:50},{reps:10,weight:50}],
note:“Pull to upper chest. Full stretch at top.”},
{name:“Leg Press”, machine:“Leg Press Machine”, type:“legs”,
sets:[{reps:15,weight:80},{reps:12,weight:90},{reps:12,weight:90}],
note:“Feet shoulder-width. Don’t lock knees.”},
{name:“Chest Press Machine”, machine:“Chest Press”, type:“push”,
sets:[{reps:12,weight:35},{reps:12,weight:35},{reps:10,weight:40}],
note:“Full extension, control the return.”},
{name:“Ab Crunch Machine”, machine:“Ab Crunch Machine”, type:“core”,
sets:[{reps:20,weight:20},{reps:20,weight:20},{reps:15,weight:25},{reps:15,weight:25}],
note:“Slow squeeze. Hold 1 sec at bottom.”},
{name:“Treadmill HIIT”, machine:“Treadmill”, type:“cardio”, isCardio:true,
sets:[{duration:12,speed:“12/6”,incline:1}], note:“45s sprint / 90s walk × 5”},
],
},
thursday:{
label:“Thursday”, short:“THU”, color:”#E91E63”, emoji:“🔥”,
focus:“Core & Lower Back”, subtitle:“Half Day · 45 min”,
exercises:[
{name:“Treadmill Warm-Up”, machine:“Treadmill”, type:“cardio”, isCardio:true,
sets:[{duration:8,speed:6.5,incline:3}], note:“Incline 3%, activates glutes”},
{name:“Chest-Supported Row”, machine:“T-Bar Row Machine”, type:“back”,
sets:[{reps:12,weight:30},{reps:12,weight:30},{reps:10,weight:35},{reps:10,weight:35}],
note:“Squeeze shoulder blades. Hold 1 sec at top.”},
{name:“Back Extension Machine”, machine:“Back Extension”, type:“back”,
sets:[{reps:15,weight:10},{reps:15,weight:10},{reps:15,weight:15},{reps:12,weight:15}],
note:“Hold 1s at top. Slow lower. Protect lower back.”},
{name:“Shoulder Press Machine”, machine:“Shoulder Press”, type:“push”,
sets:[{reps:12,weight:30},{reps:12,weight:30},{reps:10,weight:35}],
note:“Full overhead range. Don’t shrug at top.”},
{name:“Leg Curl Lying”, machine:“Leg Curl Machine”, type:“legs”,
sets:[{reps:15,weight:30},{reps:15,weight:30},{reps:12,weight:35}],
note:“Don’t let hips rise. 3 sec lowering phase.”},
{name:“Rotary Torso Machine”, machine:“Rotary Torso”, type:“core”,
sets:[{reps:15,weight:20},{reps:15,weight:20},{reps:12,weight:25}],
note:“Rotate slowly. Hold 1s at end range.”},
{name:“Cable Crunch Kneeling”, machine:“Cable Machine (rope)”, type:“core”,
sets:[{reps:20,weight:15},{reps:20,weight:15},{reps:15,weight:20},{reps:15,weight:20}],
note:“Round spine down. Don’t use hip flexors.”},
],
},
friday:{
label:“Friday”, short:“FRI”, color:”#3F51B5”, emoji:“💪”,
focus:“Heavy Back + Full Body”, subtitle:“Full Day · 80 min”,
exercises:[
{name:“Treadmill Warm-Up”, machine:“Treadmill”, type:“cardio”, isCardio:true,
sets:[{duration:10,speed:7,incline:1}], note:“Build to 7 km/h over 3 min”},
{name:“Lat Pulldown Close Grip”, machine:“Lat Pulldown Machine”, type:“back”,
sets:[{reps:10,weight:50},{reps:10,weight:50},{reps:8,weight:55},{reps:8,weight:55}],
note:“Supinated grip. Elbows to hips. Full stretch.”},
{name:“Seated Cable Row Wide”, machine:“Cable Machine (wide bar)”, type:“back”,
sets:[{reps:10,weight:45},{reps:10,weight:45},{reps:8,weight:50},{reps:8,weight:50}],
note:“Pull to sternum. Big squeeze at end.”},
{name:“Cable Face Pull”, machine:“Cable Machine (rope)”, type:“back”,
sets:[{reps:20,weight:15},{reps:18,weight:15},{reps:15,weight:20}],
note:“Elbows high. Pull to forehead. Posture gold.”},
{name:“Back Extension Machine”, machine:“Back Extension”, type:“back”,
sets:[{reps:15,weight:15},{reps:15,weight:15},{reps:12,weight:20}],
note:“Spinal erector builder. Hold at top.”},
{name:“Pec Deck Fly”, machine:“Pec Deck Machine”, type:“push”,
sets:[{reps:15,weight:30},{reps:12,weight:35},{reps:12,weight:35}],
note:“Open chest on stretch. Squeeze at close.”},
{name:“Leg Extension”, machine:“Leg Extension Machine”, type:“legs”,
sets:[{reps:15,weight:35},{reps:15,weight:35},{reps:12,weight:40}],
note:“Squeeze quad at top for 1 sec.”},
{name:“Ab Crunch Machine”, machine:“Ab Crunch Machine”, type:“core”,
sets:[{reps:20,weight:25},{reps:20,weight:25},{reps:15,weight:30},{reps:15,weight:30}],
note:“Add weight when sets feel easy.”},
{name:“Treadmill Zone 2”, machine:“Treadmill”, type:“cardio”, isCardio:true,
sets:[{duration:20,speed:6.5,incline:2}], note:“Target: 123–133 bpm. Fat burn zone.”},
],
},
saturday:{
label:“Saturday”, short:“SAT”, color:”#009688”, emoji:“🏋️”,
focus:“Arms + Core Blast”, subtitle:“Full Day · 75 min”,
exercises:[
{name:“Treadmill Jog”, machine:“Treadmill”, type:“cardio”, isCardio:true,
sets:[{duration:10,speed:7,incline:1}], note:“Steady warm-up jog”},
{name:“Lat Pulldown Neutral”, machine:“Lat Pulldown Machine”, type:“back”,
sets:[{reps:12,weight:48},{reps:12,weight:48},{reps:10,weight:52}],
note:“Neutral grip. Full stretch. Squeeze at bottom.”},
{name:“Seated Row Narrow”, machine:“Cable Machine”, type:“back”,
sets:[{reps:12,weight:42},{reps:12,weight:42},{reps:10,weight:47}],
note:“Drive elbows straight back. Control return.”},
{name:“Bicep Curl Machine”, machine:“Preacher Curl Machine”, type:“arms”,
sets:[{reps:12,weight:20},{reps:12,weight:20},{reps:10,weight:25}],
note:“No swing. Full contraction. 3s lower.”},
{name:“Tricep Pushdown Cable”, machine:“Cable Machine (V-bar)”, type:“arms”,
sets:[{reps:15,weight:20},{reps:15,weight:20},{reps:12,weight:25}],
note:“Elbows pinned. Full extension. Control.”},
{name:“Hip Abduction Machine”, machine:“Hip Abduction Machine”, type:“legs”,
sets:[{reps:20,weight:40},{reps:20,weight:40},{reps:15,weight:45}],
note:“Pause open. Slow return. Core tight.”},
{name:“Cable Woodchop Lo→Hi”, machine:“Cable Machine”, type:“core”,
sets:[{reps:12,weight:15},{reps:12,weight:15},{reps:12,weight:15}],
note:“Rotate torso only. Hips stay square.”},
{name:“Rotary Torso Machine”, machine:“Rotary Torso”, type:“core”,
sets:[{reps:15,weight:22},{reps:15,weight:22},{reps:12,weight:27}],
note:“Slow rotation. Hold 1s at end range.”},
{name:“Treadmill LISS”, machine:“Treadmill”, type:“cardio”, isCardio:true,
sets:[{duration:20,speed:5.5,incline:5}], note:“Incline 5%, 5.5 km/h. Max fat burn.”},
],
},
sunday:{
label:“Sunday”, short:“SUN”, color:”#7C4DFF”, emoji:“🌊”,
focus:“Active Recovery”, subtitle:“Recovery · 50 min”,
exercises:[
{name:“Incline Walk”, machine:“Treadmill”, type:“cardio”, isCardio:true,
sets:[{duration:30,speed:5,incline:6}], note:“Easy fat-burn. Breathe through nose.”},
{name:“Back Extension Light”, machine:“Back Extension”, type:“back”,
sets:[{reps:15,weight:0},{reps:15,weight:0},{reps:15,weight:0}],
note:“Bodyweight only. Mobility focus.”},
{name:“Seated Cable Row Light”, machine:“Cable Machine”, type:“back”,
sets:[{reps:15,weight:25},{reps:15,weight:25}],
note:“Blood flow recovery. Not a working set.”},
{name:“Ab Crunch Machine Light”, machine:“Ab Crunch Machine”, type:“core”,
sets:[{reps:20,weight:15},{reps:20,weight:15},{reps:20,weight:15}],
note:“Light weight. Core activation only.”},
{name:“Hip Abduction Machine”, machine:“Hip Abduction Machine”, type:“legs”,
sets:[{reps:20,weight:30},{reps:20,weight:30}],
note:“Hip and lower back stability.”},
],
},
};

const DAYS_ORDER = [“monday”,“thursday”,“friday”,“saturday”,“sunday”];
const REST_DAYS  = [“tuesday”,“wednesday”];

const TYPE_COLOR = {
back:”#4FC3F7”, core:”#EF9A9A”, cardio:”#A5D6A7”,
legs:”#FFE082”, push:”#CE93D8”, arms:”#F48FB1”,
};

const FOODS_DB = [
{name:“Chicken Breast (100g)”,cal:165,p:31,c:0,f:3.6},
{name:“Brown Rice (100g cooked)”,cal:112,p:2.6,c:24,f:0.9},
{name:“Egg (1 large)”,cal:72,p:6,c:0.4,f:5},
{name:“Oats (100g dry)”,cal:389,p:17,c:66,f:7},
{name:“Banana (1 medium)”,cal:89,p:1,c:23,f:0.3},
{name:“Greek Yogurt (150g)”,cal:130,p:17,c:6,f:3.5},
{name:“Whey Protein Shake”,cal:120,p:24,c:3,f:2},
{name:“Almonds (30g)”,cal:174,p:6,c:6,f:15},
{name:“Salmon (100g)”,cal:208,p:20,c:0,f:13},
{name:“Sweet Potato (100g)”,cal:86,p:1.6,c:20,f:0.1},
{name:“Tuna (100g canned)”,cal:116,p:26,c:0,f:1},
{name:“Avocado (half)”,cal:120,p:1.5,c:6,f:11},
{name:“White Rice (100g cooked)”,cal:130,p:2.7,c:28,f:0.3},
{name:“Pasta (100g cooked)”,cal:131,p:5,c:25,f:1},
{name:“Broccoli (100g)”,cal:35,p:2.4,c:7,f:0.4},
{name:“Cottage Cheese (150g)”,cal:111,p:18,c:5,f:2.5},
];

const SK = “forge_v5”;

// Persistent storage helpers
async function loadStore() {
try {
const r = await window.storage.get(SK);
return r ? JSON.parse(r.value) : {};
} catch { return {}; }
}
async function saveStore(d) {
try { await window.storage.set(SK, JSON.stringify(d)); } catch {}
}

function toKey(){ return new Date().toISOString().split(“T”)[0]; }
function dayName(){ return [“sunday”,“monday”,“tuesday”,“wednesday”,“thursday”,“friday”,“saturday”][new Date().getDay()]; }

export default function Forge() {
const [tab,     setTab]    = useState(“home”);
const [store,   setStore]  = useState({});
const [loading, setLoading]= useState(true);

const todayKey = toKey();
const curDay   = dayName();
const isRest   = REST_DAYS.includes(curDay);
const todayPlan= PLAN[curDay];

// Load from persistent storage on mount
useEffect(() => {
loadStore().then(data => {
setStore(data);
setSession(data?.sessions?.[todayKey] || {});
setMeals(data?.meals?.[todayKey] || []);
setWater(data?.water?.[todayKey] || 0);
setSleep(data?.sleep?.[todayKey] || {bedtime:””,wake:””,hours:0});
setLoading(false);
});
}, []);

// Workout
const [session, setSession] = useState({});
const [openEx,  setOpenEx]  = useState(null);
const [planDay, setPlanDay] = useState(() => DAYS_ORDER.includes(dayName()) ? dayName() : “monday”);

// Food
const [meals,   setMeals]   = useState([]);
const [foodQ,   setFoodQ]   = useState(””);
const [showFood,setShowFood]= useState(false);
const [customF, setCF]      = useState({name:””,cal:””,p:””,c:””,f:””});

// Water & Sleep
const [water,   setWater]   = useState(0);
const [sleep,   setSleep]   = useState({bedtime:””,wake:””,hours:0});
const [bedInput,setBedInput]= useState(””);
const [wakeInput,setWakeInput]= useState(””);

// Weight
const [wInput,  setWInput]  = useState(””);
const [toast,   setToast]   = useState(null);

// Calendar
const [calMonth,   setCalMonth]   = useState(() => { const n=new Date(); return {y:n.getFullYear(),m:n.getMonth()}; });
const [calSelected,setCalSelected]= useState(null);

function notify(msg, c=”#FF5722”){ setToast({msg,c}); setTimeout(()=>setToast(null),2200); }

function upd(patch){
const n={…store,…patch};
setStore(n);
saveStore(n);
}

function saveSession(s){ setSession(s); upd({sessions:{…(store.sessions||{}),[todayKey]:s}}); }

function setSetField(ei,si,field,val){
const k=`${ei}-${si}`;
const n={…session,[k]:{…(session[k]||{}),[field]:val}};
saveSession(n);
}
function toggleDone(ei,si,targetReps){
const k=`${ei}-${si}`;
const cur=session[k]||{};
const done=!cur.done;
const reps=cur.reps!==undefined?cur.reps:targetReps;
saveSession({…session,[k]:{…cur,done,reps}});
if(done) notify(“Set crushed! 💪”,”#4CAF50”);
}

function addWater(ml){
const n=Math.min(3500,water+ml);
setWater(n); upd({water:{…(store.water||{}),[todayKey]:n}});
notify(`+${ml}ml 💧`,”#2196F3”);
}
function resetWater(){ setWater(0); upd({water:{…(store.water||{}),[todayKey]:0}}); }

function logSleep(){
if(!bedInput||!wakeInput) return;
const [bh,bm]=bedInput.split(”:”).map(Number);
const [wh,wm]=wakeInput.split(”:”).map(Number);
let hrs = (wh*60+wm - (bh*60+bm))/60;
if(hrs<0) hrs+=24;
const s={bedtime:bedInput,wake:wakeInput,hours:+hrs.toFixed(1)};
setSleep(s); upd({sleep:{…(store.sleep||{}),[todayKey]:s}});
notify(`${hrs.toFixed(1)}h sleep logged 😴`,”#7C4DFF”);
}

function addMeal(food){
const n=[…meals,{…food,id:Date.now()}];
setMeals(n); upd({meals:{…(store.meals||{}),[todayKey]:n}});
notify(`Added ${food.name}`); setFoodQ(””); setShowFood(false);
}
function delMeal(id){
const n=meals.filter(m=>m.id!==id);
setMeals(n); upd({meals:{…(store.meals||{}),[todayKey]:n}});
}
function addCustom(){
if(!customF.name||!customF.cal) return;
addMeal({name:customF.name,cal:+customF.cal,p:+customF.p||0,c:+customF.c||0,f:+customF.f||0});
setCF({name:””,cal:””,p:””,c:””,f:””});
}
function logWeight(){
if(!wInput) return;
const w=+wInput;
const hist=[…(store.wh||[]).filter(x=>x.date!==todayKey),{date:todayKey,w}];
upd({wh:hist,sw:store.sw||w,lw:w});
setWInput(””); notify(`⚖️ ${w} kg saved`,”#FF5722”);
}

// Computed
const totCal = meals.reduce((s,m)=>s+m.cal,0);
const totP   = meals.reduce((s,m)=>s+m.p,0);
const totC   = meals.reduce((s,m)=>s+m.c,0);
const totFat = meals.reduce((s,m)=>s+m.f,0);
const calGoal= 1800, calRemain=calGoal-totCal;
const waterGoal = 2500;
const fatLost= Math.max(0,(store.sw||0)-(store.lw||store.sw||0));
const fatPct = Math.min(100,(fatLost/P.fatGoal)*100);

const completedSets = todayPlan
? todayPlan.exercises.reduce((t,ex,ei)=>t+ex.sets.filter((_,si)=>session[`${ei}-${si}`]?.done).length,0) : 0;
const totalSets = todayPlan
? todayPlan.exercises.reduce((t,ex)=>t+ex.sets.length,0) : 0;

const sleepColor = sleep.hours>=7?”#4CAF50”:sleep.hours>=5?”#FF9800”:”#F44336”;
const sleepMsg   = sleep.hours>=8?“Excellent 🌟”:sleep.hours>=7?“Good 👍”:sleep.hours>=5?“Fair ⚠️”:sleep.hours>0?“Poor 🔴”:“Not logged”;

const tabs = [
{id:“home”,   icon:“🏠”, label:“Home”},
{id:“workout”,icon:“🏋️”, label:“Workout”},
{id:“cal”,    icon:“📅”, label:“Calendar”},
{id:“food”,   icon:“🍽️”, label:“Nutrition”},
{id:“stats”,  icon:“📊”, label:“Stats”},
];

return (
<div style={{background:”#F5F5F5”,minHeight:“100vh”,maxWidth:430,margin:“0 auto”,fontFamily:”-apple-system,‘SF Pro Display’,sans-serif”,position:“relative”,paddingBottom:70}}>
<style>{`*{box-sizing:border-box;margin:0;padding:0} ::-webkit-scrollbar{display:none} .card{background:#fff;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.08)} .btn-pill{border:none;border-radius:100px;cursor:pointer;font-size:14px;font-weight:700;padding:14px 28px;letter-spacing:.3px;transition:all .15s;-webkit-tap-highlight-color:transparent} .btn-sm{border:none;border-radius:100px;cursor:pointer;font-size:12px;font-weight:700;padding:8px 16px;transition:all .15s;-webkit-tap-highlight-color:transparent} .btn-icon{border:none;border-radius:50%;cursor:pointer;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:18px;transition:all .15s;-webkit-tap-highlight-color:transparent} input{background:#F5F5F5;border:none;border-radius:12px;color:#1a1a1a;font-family:inherit;font-size:14px;padding:12px 14px;width:100%;outline:none;transition:box-shadow .2s} input:focus{box-shadow:0 0 0 2px #FF5722} .set-row{display:grid;align-items:center;padding:10px 16px;border-bottom:1px solid #F5F5F5;gap:8px} .num-in{width:56px;text-align:center;padding:8px 4px;font-size:15px;font-weight:700;border-radius:10px;background:#F5F5F5;border:none;font-family:inherit;outline:none;-webkit-tap-highlight-color:transparent} .num-in:focus{box-shadow:0 0 0 2px #FF5722} .check-btn{width:32px;height:32px;border-radius:50%;border:2px solid #E0E0E0;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;flex-shrink:0;-webkit-tap-highlight-color:transparent;font-size:14px} .check-btn.done{background:#4CAF50;border-color:#4CAF50;color:#fff} .water-btn{flex:1;border:2px solid #E3F2FD;background:#E3F2FD;border-radius:12px;padding:12px 4px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all .15s;-webkit-tap-highlight-color:transparent} .water-btn:active{transform:scale(.96)} .tab-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 0;background:transparent;border:none;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:all .15s} .toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:10px 22px;border-radius:100px;font-size:13px;z-index:9999;font-weight:700;animation:tin .25s ease;pointer-events:none;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,.2)} @keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}} .ex-card{background:#fff;border-radius:14px;margin:0 16px 10px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden} .food-row{padding:12px 16px;border-bottom:1px solid #F9F9F9;cursor:pointer;display:flex;justify-content:space-between;align-items:center;-webkit-tap-highlight-color:transparent;transition:background .1s} .food-row:active{background:#F5F5F5} .stat-ring{transform:rotate(-90deg);transform-origin:50% 50%} .day-chip{padding:8px 16px;border-radius:100px;font-size:12px;font-weight:700;cursor:pointer;border:2px solid #E0E0E0;background:#fff;color:#999;font-family:inherit;transition:all .2s;-webkit-tap-highlight-color:transparent} .sleep-quality{display:flex;gap:6px;margin-top:8px} .sq-block{flex:1;height:6px;border-radius:3px;transition:background .3s}`}</style>

```
  {toast && <div className="toast" style={{background:toast.c,color:"#fff"}}>{toast.msg}</div>}

  {/* ─── LOADING SCREEN ─── */}
  {loading && (
    <div style={{position:"fixed",inset:0,background:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:999}}>
      <div style={{fontSize:48,marginBottom:16}}>🏋️</div>
      <div style={{fontSize:20,fontWeight:800,color:"#FF5722",marginBottom:8}}>FORGE</div>
      <div style={{fontSize:13,color:"#999"}}>Loading your data…</div>
      <div style={{marginTop:20,width:48,height:4,background:"#F0F0F0",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",background:"#FF5722",borderRadius:2,animation:"ldbar 1s ease infinite alternate"}}/>
      </div>
      <style>{`@keyframes ldbar{from{width:10%}to{width:90%}}`}</style>
    </div>
  )}

  {/* ─── SCROLLABLE CONTENT ─── */}
  <div style={{height:"calc(100vh - 70px)",overflowY:"auto"}}>

    {/* ════ HOME ════ */}
    {tab==="home"&&(
      <div style={{paddingBottom:8}}>
        {/* Hero */}
        <div style={{background:"linear-gradient(135deg,#FF5722 0%,#FF1744 100%)",padding:"52px 20px 28px",color:"#fff"}}>
          <div style={{fontSize:12,fontWeight:600,opacity:.7,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>
            {new Date().toLocaleDateString("en",{weekday:"long",month:"long",day:"numeric"})}
          </div>
          <div style={{fontSize:28,fontWeight:800,lineHeight:1.2,marginBottom:4}}>
            {isRest?"Rest Day 😴":todayPlan?`${todayPlan.emoji} ${todayPlan.focus}`:"Hey there 👋"}
          </div>
          <div style={{fontSize:14,opacity:.8}}>
            {isRest?"Recovery is part of the plan.":todayPlan?todayPlan.subtitle:"Track your day below."}
          </div>

          {/* Quick session progress */}
          {!isRest&&todayPlan&&(
            <div style={{marginTop:18,background:"rgba(255,255,255,.15)",borderRadius:14,padding:"12px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:600,opacity:.9,marginBottom:8}}>
                <span>SESSION PROGRESS</span>
                <span>{completedSets}/{totalSets} sets</span>
              </div>
              <div style={{height:6,background:"rgba(255,255,255,.3)",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:totalSets>0?`${(completedSets/totalSets)*100}%`:"0",background:"#fff",borderRadius:3,transition:"width .4s"}}/>
              </div>
            </div>
          )}
        </div>

        <div style={{padding:"16px 16px 0"}}>

          {/* Daily rings row */}
          <div style={{display:"flex",gap:10,marginBottom:16}}>
            {/* Calories ring */}
            {[
              {label:"Calories",val:totCal,goal:calGoal,unit:"kcal",color:"#FF5722",icon:"🔥"},
              {label:"Water",val:water,goal:waterGoal,unit:"ml",color:"#2196F3",icon:"💧"},
              {label:"Sleep",val:sleep.hours,goal:8,unit:"hrs",color:"#7C4DFF",icon:"😴"},
            ].map(r=>{
              const pct=Math.min(1,r.val/r.goal);
              const R=30, circ=2*Math.PI*R;
              return(
                <div key={r.label} className="card" style={{flex:1,padding:"14px 10px",textAlign:"center"}}>
                  <svg width="70" height="70" viewBox="0 0 70 70">
                    <circle cx="35" cy="35" r={R} fill="none" stroke="#F0F0F0" strokeWidth="6"/>
                    <circle cx="35" cy="35" r={R} fill="none" stroke={r.color} strokeWidth="6"
                      strokeDasharray={`${circ*pct} ${circ}`}
                      strokeDashoffset={circ*0.25} strokeLinecap="round"
                      style={{transition:"stroke-dasharray .5s ease"}}
                      className="stat-ring"/>
                    <text x="35" y="32" textAnchor="middle" fontSize="16" fontWeight="800" fill="#1a1a1a" fontFamily="-apple-system,sans-serif">{r.icon}</text>
                    <text x="35" y="47" textAnchor="middle" fontSize="9" fontWeight="700" fill={r.color} fontFamily="-apple-system,sans-serif">{r.val>0?r.val:0}</text>
                  </svg>
                  <div style={{fontSize:11,fontWeight:700,color:"#999",marginTop:4}}>{r.label}</div>
                  <div style={{fontSize:10,color:"#CCC"}}>{r.goal} {r.unit}</div>
                </div>
              );
            })}
          </div>

          {/* Water tracker */}
          <div className="card" style={{padding:16,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div>
                <div style={{fontSize:16,fontWeight:800}}>💧 Water Intake</div>
                <div style={{fontSize:12,color:"#999",marginTop:1}}>Goal: 2,500 ml/day</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:24,fontWeight:900,color:"#2196F3"}}>{water}<span style={{fontSize:12,color:"#999",fontWeight:600}}> ml</span></div>
                <div style={{fontSize:11,color:water>=waterGoal?"#4CAF50":"#999"}}>{water>=waterGoal?"✓ Goal reached!":`${waterGoal-water} ml to go`}</div>
              </div>
            </div>
            {/* Water progress */}
            <div style={{height:8,background:"#E3F2FD",borderRadius:4,overflow:"hidden",marginBottom:12}}>
              <div style={{height:"100%",width:`${Math.min(100,(water/waterGoal)*100)}%`,background:"linear-gradient(90deg,#2196F3,#03A9F4)",borderRadius:4,transition:"width .4s"}}/>
            </div>
            {/* Quick add buttons */}
            <div style={{display:"flex",gap:8}}>
              {[150,250,350,500].map(ml=>(
                <button key={ml} className="water-btn" onClick={()=>addWater(ml)}>
                  <span style={{fontSize:16}}>🥤</span>
                  <span style={{fontSize:11,fontWeight:700,color:"#2196F3"}}>+{ml}ml</span>
                </button>
              ))}
            </div>
            <button onClick={resetWater} style={{marginTop:8,width:"100%",background:"none",border:"none",fontSize:11,color:"#CCC",cursor:"pointer",padding:"4px 0"}}>Reset water for today</button>
          </div>

          {/* Sleep tracker */}
          <div className="card" style={{padding:16,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div>
                <div style={{fontSize:16,fontWeight:800}}>😴 Sleep</div>
                <div style={{fontSize:12,color:"#999",marginTop:1}}>Recommended: 7–9 hrs</div>
              </div>
              {sleep.hours>0&&(
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:24,fontWeight:900,color:sleepColor}}>{sleep.hours}<span style={{fontSize:12,color:"#999",fontWeight:600}}> hrs</span></div>
                  <div style={{fontSize:11,color:sleepColor}}>{sleepMsg}</div>
                </div>
              )}
            </div>

            {/* Sleep quality blocks */}
            {sleep.hours>0&&(
              <div style={{marginBottom:12}}>
                <div className="sleep-quality">
                  {[1,2,3,4,5,6,7,8].map(h=>(
                    <div key={h} className="sq-block" style={{background:sleep.hours>=h?sleepColor:"#F0F0F0"}}/>
                  ))}
                </div>
                {sleep.bedtime&&sleep.wake&&(
                  <div style={{fontSize:11,color:"#999",marginTop:6,display:"flex",gap:12}}>
                    <span>🌙 Bed: {sleep.bedtime}</span>
                    <span>☀️ Wake: {sleep.wake}</span>
                  </div>
                )}
              </div>
            )}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
              <div>
                <div style={{fontSize:11,color:"#999",marginBottom:4,fontWeight:600}}>🌙 BEDTIME</div>
                <input type="time" value={bedInput} onChange={e=>setBedInput(e.target.value)}/>
              </div>
              <div>
                <div style={{fontSize:11,color:"#999",marginBottom:4,fontWeight:600}}>☀️ WAKE UP</div>
                <input type="time" value={wakeInput} onChange={e=>setWakeInput(e.target.value)}/>
              </div>
            </div>
            <button className="btn-pill" onClick={logSleep}
              style={{width:"100%",background:"#7C4DFF",color:"#fff",fontSize:13}}>
              Log Sleep
            </button>

            {/* Sleep tips */}
            <div style={{marginTop:12,background:"#F3E5F5",borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#7C4DFF",marginBottom:3}}>💡 Sleep tip for fat loss</div>
              <div style={{fontSize:11,color:"#9C27B0",lineHeight:1.5}}>Less than 7 hrs raises cortisol and cravings. Sleep is your fat-loss weapon — aim for the same bedtime every night.</div>
            </div>
          </div>

          {/* Fat loss progress */}
          <div className="card" style={{padding:16,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div>
                <div style={{fontSize:16,fontWeight:800}}>🎯 Fat Loss Goal</div>
                <div style={{fontSize:12,color:"#999",marginTop:1}}>Target: lose 10 kg fat</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:22,fontWeight:900,color:"#FF5722"}}>−{fatLost.toFixed(1)}<span style={{fontSize:12,color:"#999",fontWeight:600}}> kg</span></div>
                <div style={{fontSize:11,color:"#999"}}>{(P.fatGoal-fatLost).toFixed(1)} kg to go</div>
              </div>
            </div>
            <div style={{height:10,background:"#F5F5F5",borderRadius:5,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${fatPct}%`,background:"linear-gradient(90deg,#FF5722,#FF1744)",borderRadius:5,transition:"width .6s"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#CCC",marginTop:6}}>
              <span>Start: {store.sw||"—"} kg</span>
              <span>{fatPct.toFixed(0)}% complete</span>
              <span>Now: {store.lw||"—"} kg</span>
            </div>
          </div>

          {/* Quick go to workout */}
          {!isRest&&todayPlan&&(
            <button className="btn-pill" onClick={()=>setTab("workout")}
              style={{width:"100%",background:"#FF5722",color:"#fff",fontSize:15,marginBottom:12}}>
              Start Today's Workout →
            </button>
          )}

        </div>
      </div>
    )}

    {/* ════ WORKOUT ════ */}
    {tab==="workout"&&(
      <div>
        {/* Header */}
        <div style={{background:isRest?"#607D8B":todayPlan?todayPlan.color:"#607D8B",padding:"52px 20px 20px",color:"#fff"}}>
          <div style={{fontSize:12,fontWeight:600,opacity:.7,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>TODAY'S SESSION</div>
          <div style={{fontSize:26,fontWeight:800}}>{isRest?"Rest Day 😴":todayPlan?`${todayPlan.emoji} ${todayPlan.focus}`:"No Workout"}</div>
          {!isRest&&todayPlan&&(
            <>
              <div style={{fontSize:14,opacity:.8,marginTop:4}}>{todayPlan.subtitle}</div>
              <div style={{marginTop:14,background:"rgba(255,255,255,.2)",borderRadius:12,padding:"10px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:700,marginBottom:6}}>
                  <span>SETS DONE</span><span>{completedSets} / {totalSets}</span>
                </div>
                <div style={{height:5,background:"rgba(255,255,255,.3)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:totalSets>0?`${(completedSets/totalSets)*100}%`:"0",background:"#fff",borderRadius:3,transition:"width .4s"}}/>
                </div>
              </div>
            </>
          )}
        </div>

        {isRest?(
          <div style={{padding:"40px 20px",textAlign:"center"}}>
            <div style={{fontSize:56,marginBottom:16}}>🛌</div>
            <div style={{fontSize:20,fontWeight:800,color:"#1a1a1a",marginBottom:8}}>Rest Day</div>
            <div style={{fontSize:14,color:"#999",lineHeight:1.7}}>Your muscles grow during recovery.<br/>Stay hydrated. Get 8 hours of sleep.<br/>Light walk is fine if you feel restless.</div>
          </div>
        ):todayPlan&&(
          <div style={{padding:"12px 0 0"}}>
            {todayPlan.exercises.map((ex,ei)=>{
              const col=TYPE_COLOR[ex.type]||"#E0E0E0";
              const exOpen=openEx===ei;
              const doneSets=ex.sets.filter((_,si)=>session[`${ei}-${si}`]?.done).length;
              const exDone=doneSets===ex.sets.length;

              return(
                <div key={ei} className="ex-card" style={{border:exDone?"2px solid #4CAF50":exOpen?`2px solid ${todayPlan.color}`:"2px solid transparent"}}>
                  {/* Exercise header */}
                  <div style={{padding:"14px 16px",cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}
                    onClick={()=>setOpenEx(exOpen?null:ei)}>
                    <div style={{width:40,height:40,borderRadius:12,background:col+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                      {ex.type==="back"?"🔙":ex.type==="core"?"⭕":ex.type==="cardio"?"🏃":ex.type==="legs"?"🦵":ex.type==="push"?"💪":"💪"}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:700,color:"#1a1a1a",marginBottom:3}}>{ex.name}</div>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        <span style={{fontSize:11,fontWeight:700,color:col,background:col+"22",padding:"2px 8px",borderRadius:100}}>{ex.type.toUpperCase()}</span>
                        {!ex.isCardio&&<span style={{fontSize:11,color:"#999"}}>{ex.sets.length} sets</span>}
                        <span style={{fontSize:11,color:"#BBB"}}>🔧 {ex.machine}</span>
                      </div>
                    </div>
                    <div style={{flexShrink:0}}>
                      {exDone
                        ? <div style={{width:28,height:28,borderRadius:50,background:"#4CAF50",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14}}>✓</div>
                        : <div style={{fontSize:12,color:"#CCC",fontWeight:700}}>{exOpen?"▲":"▼"}</div>
                      }
                    </div>
                  </div>

                  {/* Sets */}
                  {exOpen&&(
                    <div>
                      {/* Note */}
                      <div style={{padding:"8px 16px",background:"#FFF8E1",fontSize:12,color:"#F57F17",lineHeight:1.5}}>
                        💡 {ex.note}
                      </div>

                      {ex.isCardio?(
                        ex.sets.map((s,si)=>{
                          const k=`${ei}-${si}`;
                          const cur=session[k]||{};
                          return(
                            <div key={si} style={{display:"flex",alignItems:"center",padding:"12px 16px",gap:12,borderTop:"1px solid #F5F5F5"}}>
                              <div style={{flex:1}}>
                                <div style={{fontSize:15,fontWeight:700,color:"#1a1a1a"}}>{s.duration} min</div>
                                <div style={{fontSize:12,color:"#999"}}>{s.speed} km/h · Incline {s.incline}%</div>
                              </div>
                              <div className={`check-btn ${cur.done?"done":""}`}
                                onClick={()=>{const n={...session,[k]:{...cur,done:!cur.done}};saveSession(n);if(!cur.done)notify("Cardio done! 🏃","#4CAF50");}}>
                                {cur.done?"✓":""}
                              </div>
                            </div>
                          );
                        })
                      ):(
                        <>
                          {/* Column labels */}
                          <div style={{display:"grid",gridTemplateColumns:"28px 1fr 64px 64px 32px",gap:8,padding:"8px 16px 4px",fontSize:10,fontWeight:700,color:"#CCC",letterSpacing:.5,textTransform:"uppercase",borderTop:"1px solid #F5F5F5",background:"#FAFAFA"}}>
                            <div>#</div><div>Machine</div><div style={{textAlign:"center"}}>Target</div><div style={{textAlign:"center"}}>Done</div><div/>
                          </div>

                          {ex.sets.map((s,si)=>{
                            const k=`${ei}-${si}`;
                            const cur=session[k]||{};
                            const isDone=!!cur.done;
                            const actR=cur.reps!==undefined?cur.reps:"";
                            const actW=cur.weight!==undefined?cur.weight:s.weight;
                            const hit=isDone&&cur.reps>=s.reps;
                            const miss=isDone&&cur.reps<s.reps;

                            return(
                              <div key={si} className="set-row"
                                style={{gridTemplateColumns:"28px 1fr 64px 64px 32px",background:isDone?"#F1F8F1":"#fff"}}>
                                {/* Set # */}
                                <div style={{fontSize:13,fontWeight:800,color:isDone?"#4CAF50":"#CCC",textAlign:"center"}}>{si+1}</div>

                                {/* Weight editable */}
                                <div style={{display:"flex",flexDirection:"column",gap:2}}>
                                  <div style={{fontSize:10,color:"#CCC",fontWeight:700}}>WEIGHT (kg)</div>
                                  <input type="number" className="num-in"
                                    style={{width:"100%",color:"#FF5722",background:isDone?"#E8F5E9":"#F5F5F5"}}
                                    value={actW}
                                    onChange={e=>setSetField(ei,si,"weight",+e.target.value)}/>
                                </div>

                                {/* Target reps */}
                                <div style={{textAlign:"center"}}>
                                  <div style={{fontSize:10,color:"#CCC",fontWeight:700,marginBottom:2}}>TARGET</div>
                                  <div style={{fontSize:18,fontWeight:900,color:"#1a1a1a"}}>{s.reps}</div>
                                </div>

                                {/* Actual reps */}
                                <div style={{textAlign:"center"}}>
                                  <div style={{fontSize:10,fontWeight:700,marginBottom:2,color:hit?"#4CAF50":miss?"#F44336":"#CCC"}}>
                                    {hit?"✓ HIT":miss?"MISSED":"ACTUAL"}
                                  </div>
                                  <input type="number" className="num-in"
                                    placeholder="—"
                                    value={actR}
                                    onChange={e=>setSetField(ei,si,"reps",+e.target.value)}
                                    style={{color:hit?"#4CAF50":miss?"#F44336":"#1a1a1a",background:isDone?"#E8F5E9":"#F5F5F5"}}/>
                                </div>

                                {/* Check */}
                                <div className={`check-btn ${isDone?"done":""}`}
                                  onClick={()=>toggleDone(ei,si,s.reps)}>
                                  {isDone?"✓":""}
                                </div>
                              </div>
                            );
                          })}
                          <div style={{padding:"8px 16px",background:"#FAFAFA",fontSize:11,color:"#CCC",display:"flex",gap:16}}>
                            <span>Starting weight: <b style={{color:"#FF5722"}}>{ex.sets[0]?.weight} kg</b></span>
                            <span>Done: <b style={{color:"#4CAF50"}}>{doneSets}/{ex.sets.length}</b></span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{height:8}}/>
          </div>
        )}
      </div>
    )}

    {/* ════ CALENDAR ════ */}
    {tab==="cal"&&(()=>{
      const DAY_NAMES_MAP = {0:"sunday",1:"monday",2:"tuesday",3:"wednesday",4:"thursday",5:"friday",6:"saturday"};
      const WORKOUT_DOT = {monday:"#FF5722",thursday:"#E91E63",friday:"#3F51B5",saturday:"#009688",sunday:"#7C4DFF"};
      const REST_COLOR  = "#BDBDBD";

      const {y,m} = calMonth;
      const firstDay = new Date(y,m,1).getDay(); // 0=Sun
      const daysInMonth = new Date(y,m+1,0).getDate();
      const todayD = new Date();
      const todayStr = toKey();

      // Build grid cells (null = empty padding)
      const cells = [];
      for(let i=0;i<firstDay;i++) cells.push(null);
      for(let d=1;d<=daysInMonth;d++) cells.push(d);

      function dateStr(d){ return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`; }
      function getDayName(d){ return DAY_NAMES_MAP[new Date(y,m,d).getDay()]; }
      function getDayPlan(d){ const dn=getDayName(d); return PLAN[dn]||null; }
      function isToday(d){ return dateStr(d)===todayStr; }
      function isFuture(d){ return new Date(y,m,d) > todayD; }
      function isSelected(d){ return calSelected===dateStr(d); }

      // Has this day been logged (any session data)?
      function hasLog(d){
        const k=dateStr(d);
        const sess=store.sessions?.[k];
        if(!sess) return false;
        return Object.values(sess).some(v=>v.done);
      }

      const monthName = new Date(y,m,1).toLocaleDateString("en",{month:"long",year:"numeric"});

      // Selected day detail
      const selPlan = calSelected ? getDayPlan(parseInt(calSelected.split("-")[2])) : null;
      const selDayName = calSelected ? getDayName(parseInt(calSelected.split("-")[2])) : null;
      const selIsRest  = calSelected && REST_DAYS.includes(selDayName);
      const selLogged  = calSelected && hasLog(parseInt(calSelected.split("-")[2]));
      const selSess    = calSelected ? (store.sessions?.[calSelected]||{}) : {};
      const selIsToday = calSelected===todayStr;

      return(
        <div>
          {/* Header */}
          <div style={{background:"linear-gradient(135deg,#1a237e,#283593)",padding:"52px 20px 20px",color:"#fff"}}>
            <div style={{fontSize:12,fontWeight:600,opacity:.6,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>SCHEDULE</div>
            <div style={{fontSize:24,fontWeight:800}}>Workout Calendar</div>
            <div style={{fontSize:13,opacity:.7,marginTop:2}}>Track your fixtures & history</div>
          </div>

          <div style={{padding:"16px 16px 0"}}>
            {/* Legend */}
            <div className="card" style={{padding:"10px 14px",marginBottom:12,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
              {[
                {label:"Workout",color:"#FF5722",dot:true},
                {label:"Rest",color:REST_COLOR,dot:true},
                {label:"Today",color:"#1a237e",border:true},
                {label:"Completed",color:"#4CAF50",check:true},
              ].map(l=>(
                <div key={l.label} style={{display:"flex",alignItems:"center",gap:5}}>
                  {l.dot&&<div style={{width:10,height:10,borderRadius:"50%",background:l.color}}/>}
                  {l.border&&<div style={{width:10,height:10,borderRadius:3,border:`2px solid ${l.color}`,background:"transparent"}}/>}
                  {l.check&&<div style={{width:10,height:10,borderRadius:3,background:l.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:"#fff",fontWeight:900}}>✓</div>}
                  <span style={{fontSize:11,color:"#999",fontWeight:600}}>{l.label}</span>
                </div>
              ))}
            </div>

            {/* Month navigator */}
            <div className="card" style={{padding:"12px 14px",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <button onClick={()=>setCalMonth(p=>{const d=new Date(p.y,p.m-1,1);return{y:d.getFullYear(),m:d.getMonth()};})}
                  style={{background:"#F5F5F5",border:"none",borderRadius:10,width:36,height:36,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
                <div style={{fontSize:16,fontWeight:800,color:"#1a1a1a"}}>{monthName}</div>
                <button onClick={()=>setCalMonth(p=>{const d=new Date(p.y,p.m+1,1);return{y:d.getFullYear(),m:d.getMonth()};})}
                  style={{background:"#F5F5F5",border:"none",borderRadius:10,width:36,height:36,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
              </div>

              {/* Day headers */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:6}}>
                {["S","M","T","W","T","F","S"].map((d,i)=>(
                  <div key={i} style={{textAlign:"center",fontSize:11,fontWeight:700,color:"#CCC",paddingBottom:4}}>{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
                {cells.map((d,i)=>{
                  if(!d) return <div key={i}/>;
                  const plan=getDayPlan(d);
                  const dn=getDayName(d);
                  const isRest_=REST_DAYS.includes(dn);
                  const logged=hasLog(d);
                  const today_=isToday(d);
                  const future=isFuture(d);
                  const sel=isSelected(d);
                  const dotColor=plan?WORKOUT_DOT[dn]||"#FF5722":isRest_?REST_COLOR:null;

                  return(
                    <div key={i} onClick={()=>setCalSelected(sel?null:dateStr(d))}
                      style={{
                        aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",
                        justifyContent:"center",borderRadius:10,cursor:"pointer",
                        background: sel?"#1a237e": logged?"#E8F5E9": today_?"#E8EAF6":"transparent",
                        border: today_?`2px solid #1a237e`:"2px solid transparent",
                        opacity: future?.5:1,
                        transition:"all .15s",position:"relative",
                      }}>
                      <div style={{fontSize:13,fontWeight:today_||sel?800:500,color:sel?"#fff":today_?"#1a237e":logged?"#2E7D32":"#1a1a1a",lineHeight:1}}>{d}</div>
                      {dotColor&&(
                        <div style={{marginTop:2,display:"flex",gap:2,alignItems:"center"}}>
                          {logged
                            ? <div style={{width:6,height:6,borderRadius:"50%",background:"#4CAF50"}}/>
                            : <div style={{width:5,height:5,borderRadius:"50%",background:sel?"rgba(255,255,255,.7)":dotColor}}/>
                          }
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected day detail */}
            {calSelected&&(
              <div className="card" style={{overflow:"hidden",marginBottom:12,border:`2px solid ${selPlan?selPlan.color:"#E0E0E0"}`}}>
                {/* Day header */}
                <div style={{padding:"14px 16px",background:selPlan?selPlan.color+"15":"#F5F5F5",borderBottom:"1px solid #F0F0F0"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:"#999",marginBottom:2}}>
                        {new Date(calSelected+"T12:00").toLocaleDateString("en",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
                      </div>
                      <div style={{fontSize:18,fontWeight:800,color:selPlan?selPlan.color:selIsRest?"#999":"#1a1a1a"}}>
                        {selPlan?`${selPlan.emoji} ${selPlan.focus}`:selIsRest?"😴 Rest Day":"No Session"}
                      </div>
                      {selPlan&&<div style={{fontSize:12,color:"#999",marginTop:2}}>{selPlan.subtitle}</div>}
                    </div>
                    {selLogged&&<div style={{background:"#4CAF50",color:"#fff",borderRadius:100,padding:"4px 10px",fontSize:11,fontWeight:700,flexShrink:0}}>✓ Logged</div>}
                    {selIsToday&&!selLogged&&<div style={{background:"#FF5722",color:"#fff",borderRadius:100,padding:"4px 10px",fontSize:11,fontWeight:700,flexShrink:0}}>Today</div>}
                    {!selIsToday&&!selLogged&&selPlan&&<div style={{background:"#F5F5F5",color:"#999",borderRadius:100,padding:"4px 10px",fontSize:11,fontWeight:700,flexShrink:0}}>Upcoming</div>}
                  </div>
                </div>

                {/* Exercise list */}
                {selPlan&&!selIsRest&&(
                  <div>
                    {selPlan.exercises.map((ex,ei)=>{
                      const col={"back":"#4FC3F7","core":"#EF9A9A","cardio":"#A5D6A7","legs":"#FFE082","push":"#CE93D8","arms":"#F48FB1"}[ex.type]||"#E0E0E0";
                      // Check if this exercise had any sets done on selected day
                      const anyDone = ex.sets.some((_,si)=>selSess[`${ei}-${si}`]?.done);
                      const allDone = ex.sets.every((_,si)=>selSess[`${ei}-${si}`]?.done);
                      return(
                        <div key={ei} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 16px",borderBottom:"1px solid #F9F9F9"}}>
                          <div style={{width:8,height:8,borderRadius:"50%",background:col,flexShrink:0}}/>
                          <div style={{flex:1}}>
                            <div style={{fontSize:13,fontWeight:600,color:"#1a1a1a"}}>{ex.name}</div>
                            <div style={{fontSize:11,color:"#999"}}>
                              {ex.isCardio
                                ? `${ex.sets[0]?.duration} min · ${ex.sets[0]?.speed} km/h`
                                : `${ex.sets.length} sets · starts at ${ex.sets[0]?.weight||0} kg`
                              }
                            </div>
                          </div>
                          {selLogged&&(
                            <div style={{fontSize:12,fontWeight:700,color:allDone?"#4CAF50":anyDone?"#FF9800":"#E0E0E0"}}>
                              {allDone?"✓ Done":anyDone?"Partial":"—"}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {selIsToday&&(
                      <div style={{padding:"12px 16px"}}>
                        <button className="btn-pill" onClick={()=>setTab("workout")}
                          style={{width:"100%",background:selPlan.color,color:"#fff",fontSize:13}}>
                          Go to Today's Workout →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Rest day message */}
                {selIsRest&&(
                  <div style={{padding:"16px",textAlign:"center",color:"#999"}}>
                    <div style={{fontSize:28,marginBottom:8}}>😴</div>
                    <div style={{fontSize:14,fontWeight:700}}>Rest & Recovery</div>
                    <div style={{fontSize:12,marginTop:4,lineHeight:1.6}}>No training scheduled.<br/>Stay hydrated and sleep well.</div>
                  </div>
                )}
              </div>
            )}

            {/* Weekly overview for current month */}
            <div className="card" style={{padding:16,marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:800,marginBottom:12}}>This Month's Schedule</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day=>{
                  const dn=day.toLowerCase();
                  const plan=PLAN[dn];
                  const isR=REST_DAYS.includes(dn);
                  return(
                    <div key={day} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 10px",background:plan?plan.color+"0D":isR?"#F9F9F9":"#F5F5F5",borderRadius:10}}>
                      <div style={{width:36,height:36,borderRadius:10,background:plan?plan.color+"22":isR?"#F0F0F0":"#E0E0E0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                        {plan?plan.emoji:isR?"😴":"—"}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:700,color:"#1a1a1a"}}>{day}</div>
                        <div style={{fontSize:11,color:"#999"}}>{plan?`${plan.focus} · ${plan.subtitle}`:isR?"Rest & Recovery":"No session"}</div>
                      </div>
                      {plan&&(
                        <span style={{fontSize:10,fontWeight:700,color:plan.color,background:plan.color+"15",padding:"3px 8px",borderRadius:100}}>
                          {plan.type==="half"?"HALF":"FULL"}
                        </span>
                      )}
                      {isR&&<span style={{fontSize:10,fontWeight:700,color:"#CCC",background:"#F0F0F0",padding:"3px 8px",borderRadius:100}}>REST</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{height:8}}/>
          </div>
        </div>
      );
    })()}

    {/* ════ PLAN (kept for Plan tab reference, now accessed via Calendar) ════ */}
    {tab==="plan"&&(
      <div>
        <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)",padding:"52px 20px 20px",color:"#fff"}}>
          <div style={{fontSize:12,fontWeight:600,opacity:.6,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>YOUR PROGRAM</div>
          <div style={{fontSize:24,fontWeight:800}}>5-Day Machine Plan</div>
          <div style={{fontSize:13,opacity:.7,marginTop:4}}>Back & Core priority · Personalised for 85kg / 60kg LBM</div>
        </div>

        <div style={{display:"flex",gap:8,padding:"16px 16px 8px",overflowX:"auto"}}>
          {DAYS_ORDER.map(d=>(
            <button key={d} className="day-chip"
              style={planDay===d?{background:PLAN[d].color,borderColor:PLAN[d].color,color:"#fff"}:{}}
              onClick={()=>{setPlanDay(d);setOpenEx(null);}}>
              {PLAN[d].short}
            </button>
          ))}
          {REST_DAYS.map(d=>(
            <button key={d} style={{padding:"8px 14px",borderRadius:100,fontSize:12,fontWeight:700,border:"2px dashed #E0E0E0",background:"#FAFAFA",color:"#CCC",fontFamily:"inherit",cursor:"default",whiteSpace:"nowrap"}}>
              {d.slice(0,3).toUpperCase()} REST
            </button>
          ))}
        </div>

        {(()=>{
          const p=PLAN[planDay];
          return(
            <div style={{padding:"0 0 8px"}}>
              <div style={{margin:"8px 16px",background:p.color+"15",border:`2px solid ${p.color}33`,borderRadius:16,padding:"14px 16px"}}>
                <div style={{fontSize:18,fontWeight:800,color:p.color}}>{p.emoji} {p.focus}</div>
                <div style={{fontSize:12,color:"#999",marginTop:2}}>{p.subtitle}</div>
                <div style={{display:"flex",gap:16,marginTop:10}}>
                  {[
                    {l:"Exercises",v:p.exercises.length},
                    {l:"Total Sets",v:p.exercises.reduce((t,e)=>t+e.sets.length,0)},
                    {l:"Back",v:p.exercises.filter(e=>e.type==="back").length,c:"#4FC3F7"},
                    {l:"Core",v:p.exercises.filter(e=>e.type==="core").length,c:"#EF9A9A"},
                  ].map(s=>(
                    <div key={s.l} style={{textAlign:"center"}}>
                      <div style={{fontSize:20,fontWeight:900,color:s.c||p.color}}>{s.v}</div>
                      <div style={{fontSize:10,color:"#999",fontWeight:700}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {p.exercises.map((ex,ei)=>{
                const col=TYPE_COLOR[ex.type]||"#E0E0E0";
                const open=openEx===`plan-${planDay}-${ei}`;
                return(
                  <div key={ei} className="ex-card">
                    <div style={{padding:"13px 16px",cursor:"pointer",display:"flex",gap:10,alignItems:"center"}}
                      onClick={()=>setOpenEx(open?null:`plan-${planDay}-${ei}`)}>
                      <div style={{width:36,height:36,borderRadius:10,background:col+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                        {ex.type==="back"?"🔙":ex.type==="core"?"⭕":ex.type==="cardio"?"🏃":ex.type==="legs"?"🦵":"💪"}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:700,marginBottom:3}}>{ex.name}</div>
                        <div style={{display:"flex",gap:6}}>
                          <span style={{fontSize:10,fontWeight:700,color:col,background:col+"22",padding:"2px 7px",borderRadius:100}}>{ex.type.toUpperCase()}</span>
                          {!ex.isCardio&&<span style={{fontSize:10,color:"#BBB"}}>{ex.sets.length} sets</span>}
                          <span style={{fontSize:10,color:"#CCC"}}>🔧 {ex.machine}</span>
                        </div>
                      </div>
                      <div style={{fontSize:11,color:"#CCC",fontWeight:700}}>{open?"▲":"▼"}</div>
                    </div>
                    {open&&(
                      <div>
                        <div style={{padding:"8px 16px",background:"#FFF8E1",fontSize:12,color:"#F57F17",lineHeight:1.5}}>💡 {ex.note}</div>
                        {!ex.isCardio?(
                          <div>
                            <div style={{display:"grid",gridTemplateColumns:"40px 1fr 1fr",padding:"8px 16px 4px",fontSize:10,fontWeight:700,color:"#CCC",letterSpacing:.5,textTransform:"uppercase",background:"#FAFAFA",borderTop:"1px solid #F5F5F5"}}>
                              <div>SET</div><div style={{textAlign:"center"}}>WEIGHT</div><div style={{textAlign:"center"}}>REPS</div>
                            </div>
                            {ex.sets.map((s,si)=>(
                              <div key={si} style={{display:"grid",gridTemplateColumns:"40px 1fr 1fr",padding:"10px 16px",borderTop:"1px solid #F9F9F9",alignItems:"center"}}>
                                <div style={{fontSize:13,fontWeight:800,color:"#CCC"}}>{si+1}</div>
                                <div style={{textAlign:"center",fontSize:18,fontWeight:900,color:"#FF5722"}}>{s.weight}<span style={{fontSize:11,color:"#CCC",fontWeight:600}}> kg</span></div>
                                <div style={{textAlign:"center",fontSize:18,fontWeight:900,color:col}}>{s.reps}<span style={{fontSize:11,color:"#CCC",fontWeight:600}}> reps</span></div>
                              </div>
                            ))}
                          </div>
                        ):(
                          <div style={{padding:"10px 16px",fontSize:13,color:"#4CAF50",fontWeight:700,borderTop:"1px solid #F5F5F5"}}>
                            ⏱ {ex.sets[0]?.duration} min · {ex.sets[0]?.speed} km/h · Incline {ex.sets[0]?.incline}%
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    )}

    {/* ════ FOOD ════ */}
    {tab==="food"&&(
      <div>
        <div style={{background:"linear-gradient(135deg,#2E7D32,#43A047)",padding:"52px 20px 20px",color:"#fff"}}>
          <div style={{fontSize:12,fontWeight:600,opacity:.7,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>NUTRITION</div>
          <div style={{fontSize:26,fontWeight:800}}>Today's Fuel</div>
          <div style={{display:"flex",gap:14,marginTop:14}}>
            {[{l:"Eaten",v:totCal,c:"#FFEB3B"},{l:"Goal",v:calGoal,c:"#fff"},{l:calRemain>=0?"Left":"Over",v:Math.abs(calRemain),c:calRemain>=0?"#A5D6A7":"#EF9A9A"}].map(s=>(
              <div key={s.l} style={{textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:900,color:s.c}}>{s.v}</div>
                <div style={{fontSize:11,opacity:.7}}>{s.l} kcal</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:12,height:6,background:"rgba(255,255,255,.3)",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${Math.min(100,(totCal/calGoal)*100)}%`,background:"#FFEB3B",borderRadius:3,transition:"width .4s"}}/>
          </div>
        </div>

        <div style={{padding:"14px 16px 0"}}>
          {/* Macros */}
          <div className="card" style={{padding:16,marginBottom:12}}>
            <div style={{fontSize:14,fontWeight:800,marginBottom:12}}>Macronutrients</div>
            <div style={{display:"flex",gap:12}}>
              {[{l:"Protein",v:Math.round(totP),tgt:160,c:"#4CAF50"},{l:"Carbs",v:Math.round(totC),tgt:180,c:"#FF9800"},{l:"Fat",v:Math.round(totFat),tgt:60,c:"#F44336"}].map(m=>(
                <div key={m.l} style={{flex:1,textAlign:"center"}}>
                  <div style={{fontSize:20,fontWeight:900,color:m.c}}>{m.v}</div>
                  <div style={{fontSize:11,color:"#999",fontWeight:600}}>/ {m.tgt}g</div>
                  <div style={{fontSize:10,color:"#CCC",marginBottom:4}}>{m.l}</div>
                  <div style={{height:4,background:"#F5F5F5",borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${Math.min(100,(m.v/m.tgt)*100)}%`,background:m.c,transition:"width .4s"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meals */}
          {meals.length>0&&(
            <div className="card" style={{marginBottom:12,overflow:"hidden"}}>
              <div style={{padding:"12px 16px",fontSize:13,fontWeight:800,borderBottom:"1px solid #F5F5F5"}}>Logged Today</div>
              {meals.map(m=>(
                <div key={m.id} className="food-row">
                  <div>
                    <div style={{fontSize:13,fontWeight:600}}>{m.name}</div>
                    <div style={{fontSize:11,color:"#999",marginTop:1}}>P {m.p}g · C {m.c}g · F {m.f}g</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{fontSize:16,fontWeight:900,color:"#FF5722"}}>{m.cal}<span style={{fontSize:10,color:"#CCC",fontWeight:600}}> kcal</span></div>
                    <button onClick={()=>delMeal(m.id)} style={{background:"#FEE",border:"none",borderRadius:50,width:26,height:26,cursor:"pointer",fontSize:13,color:"#F44336",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add food */}
          <button className="btn-pill" style={{width:"100%",background:"#2E7D32",color:"#fff",fontSize:14,marginBottom:10}} onClick={()=>setShowFood(!showFood)}>
            {showFood?"✕ Close":"+ Add Food"}
          </button>

          {showFood&&(
            <div className="card" style={{marginBottom:12,overflow:"hidden"}}>
              <div style={{padding:"12px 14px",borderBottom:"1px solid #F5F5F5"}}>
                <input type="search" placeholder="Search food database..." value={foodQ} onChange={e=>setFoodQ(e.target.value)}/>
              </div>
              <div style={{maxHeight:220,overflowY:"auto"}}>
                {FOODS_DB.filter(f=>f.name.toLowerCase().includes(foodQ.toLowerCase())).map((f,i)=>(
                  <div key={i} className="food-row" onClick={()=>addMeal(f)}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600}}>{f.name}</div>
                      <div style={{fontSize:11,color:"#999"}}>P:{f.p}g C:{f.c}g F:{f.f}g</div>
                    </div>
                    <div style={{fontSize:17,fontWeight:900,color:"#FF5722"}}>{f.cal}</div>
                  </div>
                ))}
              </div>
              <div style={{padding:14,borderTop:"1px solid #F5F5F5",background:"#FAFAFA"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#999",marginBottom:8}}>CUSTOM FOOD</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <input type="text" placeholder="Name" value={customF.name} onChange={e=>setCF(p=>({...p,name:e.target.value}))} style={{gridColumn:"1/-1"}}/>
                  <input type="number" placeholder="Calories" value={customF.cal} onChange={e=>setCF(p=>({...p,cal:e.target.value}))}/>
                  <input type="number" placeholder="Protein g" value={customF.p} onChange={e=>setCF(p=>({...p,p:e.target.value}))}/>
                  <input type="number" placeholder="Carbs g" value={customF.c} onChange={e=>setCF(p=>({...p,c:e.target.value}))}/>
                  <input type="number" placeholder="Fat g" value={customF.f} onChange={e=>setCF(p=>({...p,f:e.target.value}))}/>
                </div>
                <button className="btn-pill" style={{width:"100%",marginTop:10,background:"#FF5722",color:"#fff",fontSize:13}} onClick={addCustom}>Add Custom</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    {/* ════ STATS ════ */}
    {tab==="stats"&&(
      <div>
        <div style={{background:"linear-gradient(135deg,#212121,#424242)",padding:"52px 20px 20px",color:"#fff"}}>
          <div style={{fontSize:12,fontWeight:600,opacity:.6,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>PROGRESS</div>
          <div style={{fontSize:26,fontWeight:800}}>Your Stats</div>
          <div style={{fontSize:13,opacity:.7,marginTop:2}}>85 kg · 170 cm · 60 kg LBM · ~29% body fat</div>
        </div>

        <div style={{padding:"14px 16px 0"}}>
          {/* Log weight */}
          <div className="card" style={{padding:16,marginBottom:12}}>
            <div style={{fontSize:15,fontWeight:800,marginBottom:12}}>⚖️ Log Weight</div>
            <div style={{display:"flex",gap:10}}>
              <input type="number" placeholder="e.g. 85.0 kg" step="0.1" value={wInput} onChange={e=>setWInput(e.target.value)} style={{flex:1}}/>
              <button className="btn-pill" style={{background:"#FF5722",color:"#fff",fontSize:13}} onClick={logWeight}>Save</button>
            </div>
            {store.sw&&store.lw&&(
              <div style={{display:"flex",gap:10,marginTop:14}}>
                {[{l:"Start",v:store.sw,c:"#999"},{l:"Current",v:store.lw,c:"#FF5722"},{l:"Lost",v:`−${fatLost.toFixed(1)}`,c:"#4CAF50"}].map(s=>(
                  <div key={s.l} style={{flex:1,textAlign:"center",background:"#F5F5F5",borderRadius:12,padding:"12px 8px"}}>
                    <div style={{fontSize:20,fontWeight:900,color:s.c}}>{s.v}</div>
                    <div style={{fontSize:10,color:"#999",fontWeight:700,marginTop:2}}>{s.l} kg</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fat loss goal big card */}
          <div className="card" style={{padding:20,marginBottom:12,textAlign:"center"}}>
            <div style={{fontSize:15,fontWeight:800,marginBottom:4}}>🎯 Fat Loss Goal</div>
            <div style={{fontSize:12,color:"#999",marginBottom:16}}>Start: ~25 kg fat → Target: ~15 kg fat (18% BF)</div>
            <div style={{position:"relative",display:"inline-block"}}>
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="64" fill="none" stroke="#F5F5F5" strokeWidth="14"/>
                <circle cx="80" cy="80" r="64" fill="none" stroke="#FF5722" strokeWidth="14"
                  strokeDasharray={`${2*Math.PI*64*fatPct/100} ${2*Math.PI*64}`}
                  strokeDashoffset={2*Math.PI*64*0.25} strokeLinecap="round"
                  style={{transition:"stroke-dasharray .8s ease",filter:"drop-shadow(0 0 8px #FF572255)"}}
                  className="stat-ring"/>
                <text x="80" y="72" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1a1a1a" fontFamily="-apple-system,sans-serif">{fatPct.toFixed(0)}%</text>
                <text x="80" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FF5722" fontFamily="-apple-system,sans-serif">{fatLost.toFixed(1)} / 10 kg</text>
              </svg>
            </div>
            {!store.sw&&<div style={{fontSize:12,color:"#CCC",marginTop:8}}>Log your starting weight to begin tracking</div>}
          </div>

          {/* Weight history */}
          {store.wh?.length>0&&(
            <div className="card" style={{overflow:"hidden",marginBottom:12}}>
              <div style={{padding:"12px 16px",fontSize:14,fontWeight:800,borderBottom:"1px solid #F5F5F5"}}>Weight History</div>
              {[...store.wh].reverse().slice(0,8).map((e,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:"1px solid #F9F9F9"}}>
                  <span style={{fontSize:13,color:"#999"}}>{e.date}</span>
                  <span style={{fontSize:17,fontWeight:900,color:"#FF5722"}}>{e.w} kg</span>
                </div>
              ))}
            </div>
          )}

          {/* Sleep & water history */}
          <div className="card" style={{padding:16,marginBottom:12}}>
            <div style={{fontSize:15,fontWeight:800,marginBottom:12}}>Today's Wellness</div>
            <div style={{display:"flex",gap:12}}>
              <div style={{flex:1,background:"#E3F2FD",borderRadius:12,padding:"12px",textAlign:"center"}}>
                <div style={{fontSize:24}}>💧</div>
                <div style={{fontSize:20,fontWeight:900,color:"#2196F3",marginTop:4}}>{water}<span style={{fontSize:11,fontWeight:600,color:"#999"}}> ml</span></div>
                <div style={{fontSize:10,color:"#999",fontWeight:700,marginTop:2}}>WATER</div>
                <div style={{fontSize:10,color:water>=waterGoal?"#4CAF50":"#999"}}>{water>=waterGoal?"Goal ✓":`${Math.round((water/waterGoal)*100)}%`}</div>
              </div>
              <div style={{flex:1,background:"#EDE7F6",borderRadius:12,padding:"12px",textAlign:"center"}}>
                <div style={{fontSize:24}}>😴</div>
                <div style={{fontSize:20,fontWeight:900,color:"#7C4DFF",marginTop:4}}>{sleep.hours||"—"}<span style={{fontSize:11,fontWeight:600,color:"#999"}}> hrs</span></div>
                <div style={{fontSize:10,color:"#999",fontWeight:700,marginTop:2}}>SLEEP</div>
                <div style={{fontSize:10,color:sleepColor}}>{sleepMsg}</div>
              </div>
              <div style={{flex:1,background:"#FFF8E1",borderRadius:12,padding:"12px",textAlign:"center"}}>
                <div style={{fontSize:24}}>🔥</div>
                <div style={{fontSize:20,fontWeight:900,color:"#FF9800",marginTop:4}}>{totCal}<span style={{fontSize:11,fontWeight:600,color:"#999"}}> kcal</span></div>
                <div style={{fontSize:10,color:"#999",fontWeight:700,marginTop:2}}>CALORIES</div>
                <div style={{fontSize:10,color:calRemain>=0?"#4CAF50":"#F44336"}}>{calRemain>=0?`${calRemain} left`:`${Math.abs(calRemain)} over`}</div>
              </div>
            </div>
          </div>

          {/* Program info */}
          <div className="card" style={{padding:16,marginBottom:12}}>
            <div style={{fontSize:15,fontWeight:800,marginBottom:12}}>Program Overview</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[{l:"Workout Days",v:"5/week"},{l:"Rest Days",v:"2/week"},{l:"Back Training",v:"5×/week"},{l:"Core Training",v:"5×/week"},{l:"Cardio/Session",v:"~30 min"},{l:"Calorie Target",v:"1,800 kcal"},{l:"Protein Target",v:"160g/day"},{l:"Est. Fat Loss",v:"~1 kg/mo"}].map(s=>(
                <div key={s.l} style={{background:"#F5F5F5",borderRadius:10,padding:"10px 12px"}}>
                  <div style={{fontSize:10,color:"#999",fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:3}}>{s.l}</div>
                  <div style={{fontSize:15,fontWeight:800,color:"#FF5722"}}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{height:8}}/>
        </div>
      </div>
    )}

  </div>

  {/* ─── BOTTOM TAB BAR ─── */}
  <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"#fff",borderTop:"1px solid #F0F0F0",display:"flex",zIndex:100,paddingBottom:"env(safe-area-inset-bottom,0px)",boxShadow:"0 -4px 20px rgba(0,0,0,.08)"}}>
    {tabs.map(t=>(
      <button key={t.id} className="tab-btn" onClick={()=>{setTab(t.id);setOpenEx(null);}}>
        <span style={{fontSize:22,lineHeight:1}}>{t.icon}</span>
        <span style={{fontSize:10,fontWeight:700,color:tab===t.id?"#FF5722":"#BDBDBD",letterSpacing:.3}}>{t.label}</span>
        {tab===t.id&&<div style={{width:20,height:3,background:"#FF5722",borderRadius:2,marginTop:2}}/>}
      </button>
    ))}
  </div>
</div>
```

);
}