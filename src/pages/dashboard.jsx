import React, { useState } from 'react';
import './dashboard.css';

const NAV = [
  { section: 'Overview' },
  { id: 'dashboard',    label: 'Dashboard'    },
  { id: 'bookings',     label: 'Bookings'     },
  { id: 'guests',       label: 'Guests'       },
  { id: 'schedules',    label: 'Schedules'    },
  { id: 'staff',        label: 'Staff'        },
  { section: 'Operations' },
  { id: 'rooms',        label: 'Rooms'        },
  { id: 'revenue',      label: 'Revenue'      },
  { id: 'reviews',      label: 'Reviews'      },
  { id: 'settings',     label: 'Settings'     },
  { id: 'reservations', label: 'Reservations' },
  { id: 'rates',        label: 'Rates'        },
  { id: 'reports',      label: 'Reports'      },
];


function Logo() {
  return (
    <svg width="44" height="103" viewBox="0 0 211 495" fill="none">
      <path d="M119.997 352.415C98.1006 352.415 79.1309 347.374 63.0879 337.293C47.0449 327.104 34.6875 313.012 26.0156 295.018C17.3438 277.023 13.0078 256.211 13.0078 232.58V228.678C13.0078 204.83 17.3438 183.963 26.0156 166.078C34.7959 148.083 46.7739 134.046 61.9497 123.965C77.1255 113.884 94.3608 108.843 113.656 108.843C132.083 108.843 147.693 110.957 160.484 115.185C173.383 119.412 184.386 125.103 193.491 132.257V180.061H167.15L163.736 145.753C158.424 142.284 151.92 139.683 144.224 137.948C136.528 136.105 127.422 135.184 116.908 135.184C103.358 135.184 91.1631 139.086 80.3232 146.891C69.4834 154.696 60.9199 165.59 54.6328 179.573C48.3457 193.448 45.2021 209.708 45.2021 228.353V232.58C45.2021 251.441 48.0747 267.918 53.8198 282.01C59.6733 295.993 68.1826 306.887 79.3477 314.692C90.5127 322.388 104.062 326.236 119.997 326.236C130.837 326.236 139.997 325.315 147.476 323.472C154.956 321.521 161.568 319.028 167.313 315.993V260.384L121.948 258.758V235.182H199.345V326.887C192.516 333.282 182.706 339.136 169.915 344.447C157.232 349.759 140.593 352.415 119.997 352.415Z" fill="var(--gold)"/>
      <ellipse cx="113.5" cy="440" rx="19.5" ry="20" fill="var(--gold)"/>
    </svg>
  );
}

function Sidebar({ active, onNav, open }) {
  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebarLogo" onClick={() => onNav('dashboard')}>
        <Logo />
      </div>

      {NAV.map((item, i) =>
        item.section ? (
          <p key={i} className="sidebarSectionLabel">{item.section}</p>
        ) : (
          <button key={item.id}
            className={`sidebarNavItem${active === item.id ? ' active' : ''}`}
            onClick={() => onNav(item.id)}>
            {item.label}
          </button>
        )
      )}

      <div className="sidebarLogout">
        <button className="sidebarLogoutBtn">Log out</button>
      </div>
    </aside>
  );
}


function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarSearch">
        <div className="topbarSearchLine" />
        <input placeholder="Search by guest, code, treatment, room" />
      </div>
      <div className="topbarSpacer" />
      <button className="topbarIconBtn">≡</button>
      <button className="topbarIconBtn">○</button>
      <button className="topbarIconBtn">+</button>
      <div className="topbarUser">
        <div className="topbarAvatar">NK</div>
        <div>
          <div className="topbarUserName">Nadia Karim</div>
          <div className="topbarUserRole">General manager</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, badgePos, barPct }) {
  return (
    <div className="statCard">
      <div className="statCardHeader">
        <span className="statCardLabel">{label}</span>
        {badgePos && <span className="statCardBadgePos">+ {badgePos}</span>}
      </div>
      <div className="statCardValue">{value}</div>
      {sub && <div className="statCardSub">{sub}</div>}
      {barPct != null && (
        <div className="statCardBar">
          <div className="statCardBarFill" style={{ width: `${barPct}%` }} />
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    'Arriving soon': 'arriving', 'Confirmed': 'confirmed',
    'Needs prep': 'prep', 'Issue': 'issue', 'Pending': 'pending',
    'Active': 'active', 'CONFIRMED': 'confirmed',
    'ARRIVED': 'arriving', 'PENDING': 'pending',
    'Busy': 'prep', 'Prep': 'pending',
  };
  return <span className={`badge badge${map[status] || 'pending'}`}>{status}</span>;
}

function GuestCell({ name, tag }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0,2);
  return (
    <div className="guestCell">
      <div className="guestAvatar">{initials}</div>
      <div>
        <div className="guestName">{name}</div>
        {tag && <div className="guestTag">{tag}</div>}
      </div>
    </div>
  );
}

function SectionHeader({ children, action, onAction }) {
  return (
    <div className="tableHeader">
      <div className="tableTitle">{children}</div>
      {action && <button className="tableAction" onClick={onAction}>{action}</button>}
    </div>
  );
}

function DashboardPage({ onNav }) {
  const bookings = [
    { name:'Emma Laurent',  tag:'VIP member',       treatment:'Gold signature ritual', time:'10:00 AM', room:'Lotus 02',   status:'Arriving soon' },
    { name:'Omar Khalil',   tag:'Resort suite',     treatment:'Hot stone therapy',     time:'11:30 AM', room:'Cedar 04',   status:'Confirmed'     },
    { name:'Priya Shah',    tag:'Birthday package', treatment:'Bridal glow package',   time:'1:15 PM',  room:'Jasmine 01', status:'Needs prep'    },
    { name:'Sofia Alvarez', tag:'Repeat guest',     treatment:'Couples sanctuary',     time:'3:45 PM',  room:'Aurora 07',  status:'Confirmed'     },
  ];
  const staff = [
    { name:'Maya Chen · Lead therapist',  desc:'5 sessions today · Aromatherapy specialist', badge:'Active' },
    { name:'Yara Nasser · Concierge',     desc:'Handling arrivals, lounge upgrades, and VIP greeting flow', badge:'Busy' },
    { name:'Daniel Costa · Hydro team',  desc:'Steam circuit reset scheduled at 2:00 PM', badge:'Prep' },
  ];
  const funnel = [
    { name:'Hero visits',           desc:'8,420 visitors viewed the Gold Heaven homepage this week.', pct:'100%' },
    { name:'Treatment page clicks', desc:'Luxury rituals and couples packages are the top traffic drivers.', pct:'46%' },
    { name:'Booking starts',        desc:'Guests most often convert after viewing room imagery and reviews.', pct:'18%' },
    { name:'Confirmed reservations',desc:'Strong homepage to booking performance for a premium spa website.', pct:'7.2%' },
  ];
  const bars = [65,72,80,78,95,55,74];
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  return (
    <div className="pageContent">
      {/* Hero */}
      <div className="heroSection">
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="heroEyebrow">Gold Heaven · Resort & Spa</p>
          <h2 className="heroTitle">Welcome back to Gold Heaven<br />experience is nearly fully booked.</h2>
          <div className="heroBtns">
            <button className="heroBtnPrimary" onClick={() => onNav('bookings')}>Open bookings board</button>
<button className="heroBtnGhost" onClick={() => window.open('http://localhost:3000', '_blank')}>View website performance</button>  </div>
        </div>
        <div className="heroGlance">
          <div className="heroGlanceLabel">Today at a glance</div>
          <div className="heroGlanceValue">84%</div>
          <div className="heroGlanceBadge">↑ 12% above last Friday</div>
          <div className="heroGlanceBar">
            <div className="heroGlanceBarFill" style={{ width:'84%' }} />
          </div>
        </div>
      </div>

      <div className="statGrid">
        <StatCard label="Bookings today"   value="126"
          sub="18 walk-ins and 108 confirmed reservations across 9 treatment rooms." />
        <StatCard label="Revenue forecast" value="18.4k"
          sub="Driven by couples rituals, hydrotherapy circuits, and add-on aromatherapy packages." />
        <StatCard label="Room occupancy"   value="9/11"
          sub="Two rooms reserved for deep-clean rotation before the evening wave begins." barPct={82} />
        <StatCard label="Guest rating"     value="4.9"
          sub="Most praised: ambient rooms, therapist attentiveness, and post treatment lounge." />
      </div>

      <div className="twoCol">
        <div>
          <div className="dataTable">
            <SectionHeader action="See all" onAction={() => {}}>Today's priority bookings</SectionHeader>
            <div className="tableWrap">
              <table>
                <thead><tr>
                  <th>Guest</th><th>Treatment</th><th>Time</th><th>Room</th><th>Status</th>
                </tr></thead>
                <tbody>
                  {bookings.map((b,i) => (
                    <tr key={i}>
                      <td><GuestCell name={b.name} tag={b.tag} /></td>
                      <td>{b.treatment}</td>
                      <td style={{ fontFamily:"'Cinzel',serif", color:'var(--sand)' }}>{b.time}</td>
                      <td>{b.room}</td>
                      <td><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
              <div className="cardTitle">Weekly revenue mix</div>
              <button className="tableAction">Export</button>
            </div>
            <div className="revenueChart">
              {bars.map((h,i) => (
                <div key={i} className="revenueBarWrap">
                  <div className="revenueBar" style={{ height:`${h}%` }} />
                  <span className="revenueBarLabel">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
              <div className="cardTitle">Staff on shift</div>
              <button className="tableAction">Roster</button>
            </div>
            {staff.map((s,i) => (
              <div key={i} className="staffShiftItem">
                <div className="staffShiftRow">
                  <div className="staffShiftName">{s.name}</div>
                  <StatusBadge status={s.badge} />
                </div>
                <div className="staffShiftDesc">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
              <div className="cardTitle">Website homepage funnel</div>
              <button className="tableAction">Details</button>
            </div>
            {funnel.map((f,i) => (
              <div key={i} className="funnelItem">
                <div>
                  <div className="funnelName">{f.name}</div>
                  <div className="funnelDesc">{f.desc}</div>
                </div>
                <div className="funnelPercent">{f.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function BookingsPage() {
  const [filter, setFilter] = useState('All');
  const bookings = [
    { name:'Emma Laurent',  tag:'#GH-2041 · VIP',      treatment:'Gold signature ritual', note:'90 min · aromatherapy addon',   time:'10:00 AM', note2:'Check-in 9:40 AM',         therapist:'Maya Chen',   room:'Lotus 02',   status:'Arriving soon' },
    { name:'Omar Khalil',   tag:'#GH-2048 · Resort',   treatment:'Hot stone therapy',     note:'75 min · tea lounge included',  time:'11:30 AM', note2:'Paid in full',              therapist:'Daniel Costa',room:'Cedar 04',   status:'Confirmed'     },
    { name:'Priya Shah',    tag:'#GH-2055 · Birthday', treatment:'Bridal glow package',   note:'120 min · flowers requested',   time:'1:15 PM',  note2:'Deposit pending',           therapist:'Sana Rahim',  room:'Jasmine 01', status:'Needs prep'    },
    { name:'Sofia Alvarez', tag:'#GH-2062 · Repeat',   treatment:'Couples sanctuary',     note:'Shared lounge access',          time:'3:45 PM',  note2:'Partner arriving separately',therapist:'Leila Noor',  room:'Aurora 07',  status:'Confirmed'     },
    { name:'Lucas Meyer',   tag:'#GH-2068 · Concierge',treatment:'Deep tissue massage',   note:'60 min · room swap requested',  time:'5:00 PM',  note2:'Awaiting room release',     therapist:'Rina Patel',  room:'Pending',    status:'Issue'         },
  ];
  const timeline = [
    { time:'09:30', title:'VIP lounge prep',      desc:'Emma Laurent welcome setup, signature tea, robe size M.' },
    { time:'10:00', title:'Therapist handoff',    desc:'Maya Chen opens Lotus 02 after previous room reset completes.' },
    { time:'11:15', title:'Suite arrival',         desc:'Omar Khalil transportation confirmed through resort concierge.' },
    { time:'12:45', title:'Deposit reminder',     desc:'Priya Shah booking still needs payment confirmation before service prep.' },
  ];
  const breakdown = [
    { label:'Confirmed',     count:'94 bookings', pct:75, cls:'fillConfirmed' },
    { label:'Arriving soon', count:'18 bookings', pct:14, cls:'fillArriving' },
    { label:'Needs prep',    count:'7 bookings',  pct:6,  cls:'fillPrep' },
    { label:'Issue',         count:'7 bookings',  pct:6,  cls:'fillIssue' },
  ];

  return (
    <div className="pageContent">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <p className="pageBreadcrumb">Operations · Booking management</p>
          <h1 className="pageTitle">Bookings</h1>
          <p className="pageSubtitle">Monitor arrivals, therapist schedules, room readiness, and booking health across the full day.</p>
        </div>
        <div style={{ display:'flex', gap:10, marginTop:8 }}>
          <button className="btnSecondary">Export list</button>
          <button className="btnPrimary">+ Create booking</button>
        </div>
      </div>

      <div className="statGrid" style={{ marginBottom:22 }}>
        <StatCard label="Total bookings"      value="126" sub="Across walk-ins, online reservations, concierge requests, and resort add-ons." />
        <StatCard label="Arriving in 2 hours" value="18"  sub="Five VIP arrivals and three couples rituals need lounge preparation." />
        <StatCard label="Confirmed"           value="94"  sub="Most confirmations are concentrated in hydrotherapy and signature massage blocks." />
        <StatCard label="Need attention"      value="7"   sub="Pending payment, therapist reassignment, or room turnover delays." />
      </div>

      <div className="twoCol">
        <div className="dataTable">
          <SectionHeader>Today's booking board
            <span style={{ display:'block', fontSize:11, color:'var(--text-muted)', fontFamily:'Jost,sans-serif', fontWeight:300, marginTop:3 }}>Friday, May 24 · 126 reservations</span>
          </SectionHeader>
          <div style={{ padding:'14px 24px 0' }}>
            <div className="filterTabs">
              {['All','VIP','Pending','Walk-ins'].map(f => (
                <button key={f} className={`filterTab${filter===f?' active':''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div className="tableWrap">
            <table>
              <thead><tr>
                <th>Guest</th><th>Treatment</th><th>Time</th><th>Therapist</th><th>Room</th><th>Status</th>
              </tr></thead>
              <tbody>
                {bookings.map((b,i) => (
                  <tr key={i}>
                    <td><GuestCell name={b.name} tag={b.tag} /></td>
                    <td>
                      <div>{b.treatment}</div>
                      <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{b.note}</div>
                    </td>
                    <td>
                      <div style={{ fontFamily:"'Cinzel',serif", color:'var(--sand)' }}>{b.time}</div>
                      <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{b.note2}</div>
                    </td>
                    <td style={{ fontSize:12 }}>{b.therapist}</td>
                    <td>{b.room}</td>
                    <td><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
              <div className="cardTitle">Arrival timeline</div>
              <button className="tableAction">View day</button>
            </div>
            {timeline.map((t,i) => (
              <div key={i} className="timelineItem">
                <div className="timelineTime">{t.time}</div>
                <div>
                  <div className="timelineTitle">{t.title}</div>
                  <div className="timelineDesc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
              <div className="cardTitle">Status breakdown</div>
              <button className="tableAction">Details</button>
            </div>
            {breakdown.map((b,i) => (
              <div key={i} className="statusBreakItem">
                <div className="statusBreakName">{b.label}</div>
                <div className="statusBreakTrack">
                  <div className={`statusBreakFill ${b.cls}`} style={{ width:`${b.pct}%` }} />
                </div>
                <div className="statusBreakCount">{b.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function GuestsPage({ onNav }) {
  const upcoming = [
    { name:'Isabella V.', tag:'VIP Gold Member',  treatment:'Golden Glow Facial',  time:'14:30 – 15:45', therapist:'Sarah L.',  status:'CONFIRMED' },
    { name:'Marcus Chen', tag:'First Time Guest', treatment:'Deep Tissue Massage', time:'15:00 – 16:00', therapist:'David K.',  status:'ARRIVED'   },
    { name:'Sophia Loren',tag:'Platinum Member',  treatment:'Hot Stone Therapy',   time:'16:15 – 17:45', therapist:'Emma R.',   status:'PENDING'   },
  ];
  const growthPts = [30,45,40,60,55,80,72];

  return (
    <div className="pageContent">
      <div className="heroSection">
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="heroEyebrow">General manager · Overview</p>
          <h2 className="heroTitle">Welcome back, Nadia</h2>
          <p className="heroSub">The sanctuary is busy today. You have 14 appointments scheduled and 3 VIP arrivals expected this afternoon.</p>
          <div className="heroBtns">
            <button className="heroBtnGhost" onClick={() => onNav('schedules')}>View Schedule</button>
            <button className="heroBtnPrimary" onClick={() => onNav('bookings')}>New Booking</button>
          </div>
        </div>
      </div>

      <div className="statGrid">
        <StatCard label="Daily Revenue"     value="4,280k" badgePos="12% vs last week" barPct={72} />
        <StatCard label="Appointments"      value="48 Today" sub="92% Occupancy" />
        <StatCard label="Guest Satisfaction"value="98.4%"  sub="4.9 Average" />
        <StatCard label="Retail Sales"      value="1,150k" badgePos="5% conversion" />
      </div>

      <div className="twoCol">
        <div className="dataTable">
          <SectionHeader action="View All">Upcoming Rituals</SectionHeader>
          <div className="tableWrap">
            <table>
              <thead><tr><th>Guest</th><th>Treatment</th><th>Time</th><th>Therapist</th><th>Status</th></tr></thead>
              <tbody>
                {upcoming.map((u,i) => (
                  <tr key={i}>
                    <td><GuestCell name={u.name} tag={u.tag} /></td>
                    <td>{u.treatment}</td>
                    <td style={{ fontFamily:"'Cinzel',serif", color:'var(--sand)', fontSize:12 }}>{u.time}</td>
                    <td>{u.therapist}</td>
                    <td><StatusBadge status={u.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
            <div className="cardTitle">Weekly Growth</div>
            <span className="badgelapis">Last 7 Days</span>
          </div>
          <div className="growthChart">
            <svg className="growthSvg" viewBox="0 0 280 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#c9993a" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#c9993a" stopOpacity="0.02"/>
                </linearGradient>
              </defs>
              <path
                d={`M ${growthPts.map((v,i)=>`${i*(280/6)},${120-v}`).join(' L ')} L 280,120 L 0,120 Z`}
                fill="url(#gGrad)" />
              <polyline
                points={growthPts.map((v,i)=>`${i*(280/6)},${120-v}`).join(' ')}
                fill="none" stroke="#c9993a" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            {[['SERVICES','24K'],['RETAIL','8K']].map(([label,val],i) => (
              <div key={i} style={{ flex:1, background:'var(--lapis)', borderRadius:4, padding:'12px 14px', border:'1px solid rgba(201,153,58,0.15)' }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:2, color:'rgba(201,153,58,0.45)', marginBottom:6 }}>{label}</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:22, color:'var(--gold-light)' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function SchedulesPage() {
  const days = [
    { name:'MON', num:'23' }, { name:'TUE', num:'24', today:true },
    { name:'WED', num:'25' }, { name:'THU', num:'26' },
    { name:'FRI', num:'27' }, { name:'SAT', num:'28' }, { name:'SUN', num:'29' },
  ];
  const times = ['09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM'];
  const events = [
    { day:0, slot:2, time:'11:30 AM', name:'E. Rossi',    type:'Bath Ritual'  },
    { day:1, slot:0, time:'09:15 AM', name:'S. Martinez', type:'Facial Glow'  },
    { day:1, slot:1, time:'10:30 AM', name:'J. Wilson',   type:'Deep Tissue'  },
  ];

  return (
    <div className="pageContent">
      <h1 className="pageTitle" style={{ marginBottom:22 }}>Schedules</h1>
      <div className="twoCol" style={{ gridTemplateColumns:'1fr 260px' }}>
        <div className="scheduleGrid">
          <div className="schedHeadRow">
            <div className="schedHeadTime">Time</div>
            {days.map((d,i) => (
              <div key={i} className={`schedHeadDay${d.today?' today':''}`}>
                <div className="dayName">{d.name}</div>
                <div className="dayNum">{d.num}</div>
              </div>
            ))}
          </div>
          {times.map((t,ti) => (
            <div key={ti} className="schedBodyRow">
              <div className="schedTimeCell">{t}</div>
              {days.map((d,di) => {
                const ev = events.find(e => e.day===di && e.slot===ti);
                return (
                  <div key={di} className="schedDayCell">
                    {ev && (
                      <div className="schedEvent">
                        <div className="schedEventTime">{ev.time}</div>
                        <div className="schedEventName">{ev.name}</div>
                        <div className="schedEventType">{ev.type}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div>
          <div className="card">
            <div className="cardTitle" style={{ marginBottom:16 }}>Quick Stats</div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:8 }}>Booked Today</div>
            <div style={{ height:5, background:'rgba(201,153,58,0.1)', borderRadius:3, overflow:'hidden', marginBottom:10 }}>
              <div style={{ height:'100%', width:'75%', background:'linear-gradient(90deg,var(--lapis),var(--lapis-light))', borderRadius:3 }} />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:16, color:'var(--lapis)' }}>18/24</span>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:13, color:'var(--sand)' }}>3,120K</span>
            </div>
            <div style={{ fontSize:12, color:'var(--text-muted)' }}>Revenue Est.</div>
          </div>

          <div className="card">
            <div className="cardTitle" style={{ marginBottom:14 }}>Pending Requests</div>
            <div className="pendingCard">
              <div className="guestAvatar">AV</div>
              <div style={{ flex:1 }}>
                <div className="pendingName">Amelia Vane</div>
                <div className="pendingTreatment">Celestial Scrub</div>
              </div>
              <div className="pendingBtns">
                <button className="pendingApprove">Approve</button>
                <button className="pendingReject">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function StaffPage() {
  const staff = [
    { name:'Sara Mohamed',    role:'Senior Therapist',     dept:'Message Therapy', phone:'+20110123467',  status:'Active' },
    { name:'Mariam Mustafa',  role:'Therapist',            dept:'Message Therapy', phone:'+20102346454',  status:'Active' },
    { name:'Ahmed Hassan',    role:'Skin care specialist', dept:'Skin care',       phone:'+201025616762', status:'Active' },
    { name:'Maya Ali',        role:'Spa Attendant',        dept:'Front office',    phone:'+201154345553', status:'Active' },
    { name:'Heba Mostafa',    role:'Receptionist',         dept:'Skin care',       phone:'+201210818666', status:'Active' },
  ];
  return (
    <div className="pageContent">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <h1 className="pageTitle">Staff</h1>
          <p className="pageSubtitle">Manage your spa staff members</p>
        </div>
        <button className="btnPrimary">+ New Staff</button>
      </div>

      <div className="statGrid" style={{ gridTemplateColumns:'repeat(3,1fr)', marginBottom:22 }}>
        <StatCard label="Total Staff"   value="12" sub="Members" />
        <StatCard label="Active Staff"  value="11" sub="Members" />
        <StatCard label="Departments"   value="5"  sub="Members" />
      </div>

      <div className="dataTable">
        <div className="tableWrap">
          <table>
            <thead><tr>
              <th>Staff Member</th><th>Role</th><th>Department</th><th>Phone</th><th>Status</th><th>Action</th>
            </tr></thead>
            <tbody>
              {staff.map((s,i) => (
                <tr key={i}>
                  <td><GuestCell name={s.name} /></td>
                  <td style={{ fontSize:12 }}>{s.role}</td>
                  <td style={{ fontSize:12 }}>{s.dept}</td>
                  <td style={{ fontSize:12, letterSpacing:'0.3px' }}>{s.phone}</td>
                  <td><StatusBadge status={s.status} /></td>
                  <td>
                    <div style={{ display:'flex', gap:12 }}>
                      <button style={{ background:'none', border:'1px solid rgba(201,153,58,0.25)', borderRadius:3, padding:'5px 10px', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:10, color:'var(--sand)', letterSpacing:1 }}>Edit</button>
                      <button style={{ background:'none', border:'1px solid rgba(160,48,48,0.25)', borderRadius:3, padding:'5px 10px', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:10, color:'#a03030', letterSpacing:1 }}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function RoomsPage() {
  const rooms = [
    { name:'Golden Suite 01',  type:'Deluxe Suite · 2F', price:'950 EGP / night',   status:'Available' },
    { name:'Oasis Room 03',    type:'Standard · 1F',     price:'480 EGP / night',   status:'Occupied'  },
    { name:'Serenity Room 07', type:'Standard · 2F',     price:'480 EGP / night',   status:'Available' },
    { name:'Heaven Suite 02',  type:'Deluxe Suite · 3F', price:'1,200 EGP / night', status:'Available' },
    { name:'Palm Room 12',     type:'Standard · 1F',     price:'450 EGP / night',   status:'Available' },
    { name:'Lotus Suite 05',   type:'Deluxe Suite · 3F', price:'1,100 EGP / night', status:'Available' },
  ];
  return (
    <div className="pageContent">
      <h1 className="pageTitle" style={{ marginBottom:22 }}>Rooms</h1>
      <div className="statGrid" style={{ gridTemplateColumns:'repeat(3,1fr)', marginBottom:24 }}>
        <StatCard label="Total rooms" value="24"  sub="6 suites · 18 standard" />
        <StatCard label="Available"   value="58%" sub="58% availability" barPct={58} />
        <StatCard label="Occupied"    value="+2"  sub="+2 vs yesterday" />
      </div>
      <div className="card">
        <div className="cardTitle" style={{ marginBottom:20 }}>Room overview</div>
        <div className="roomsGrid">
          {rooms.map((r,i) => (
            <div key={i} className="roomCard">
              <div className="roomCardName">{r.name}</div>
              <div className="roomCardType">{r.type}</div>
              <div className="roomCardPrice">{r.price}</div>
              <span className={`badge badge${r.status==='Available'?'confirmed':'prep'}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function RevenuePage() {
  const bars = [
    {day:'Mon',pct:42},{day:'Tue',pct:55},{day:'Wed',pct:70},
    {day:'Thu',pct:65},{day:'Fri',pct:88},{day:'Sat',pct:30},{day:'Sun',pct:62},
  ];
  return (
    <div className="pageContent">
      <h1 className="pageTitle" style={{ marginBottom:22 }}>Revenue</h1>
      <div className="statGrid" style={{ gridTemplateColumns:'repeat(3,1fr)', marginBottom:22 }}>
        <StatCard label="Total revenue (April)" value="124.8K EGP" badgePos="12% vs last month" />
        <StatCard label="Spa revenue"           value="68.2K EGP"  sub="55% of total" barPct={55} />
        <StatCard label="Pool & landscape"      value="32.4K EGP"  sub="26% of total" barPct={26} />
      </div>
      <div className="card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
          <div className="cardTitle">Weekly revenue</div>
          <span className="badgelapis">Last 7 Days</span>
        </div>
        <div className="hbarWrap">
          {bars.map((b,i) => (
            <div key={i} className="hbarItem">
              <span className="hbarLabel">{b.day}</span>
              <div className="hbarTrack">
                <div className="hbarFill" style={{ width:`${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function ReviewsPage() {
  const reviews = [
    { initials:'SV', name:'sabella V.',  treatment:'Golden Glow Facial · Apr 18', text:'',  tags:['SPA','THERAPIST'] },
    { initials:'MC', name:'Marcus C.',   treatment:'Pool Day Pass · Apr 17',       text:'The pool area is stunning beautifully maintained and never overcrowded. The landscape garden walk was an unexpected highlight. Will return.', tags:['POOL','LANDSCAPES'] },
    { initials:'S',  name:'Sophia',      treatment:'Hot Stone Therapy · Apr 16',   text:'Everything was perfect from check-in to the hot stone session. The garden views from the relaxation lounge are simply breathtaking.', tags:['SPA','AMBIANCE'] },
  ];
  return (
    <div className="pageContent">
      <h1 className="pageTitle" style={{ marginBottom:22 }}>Reviews</h1>
      <div className="statGrid" style={{ gridTemplateColumns:'repeat(3,1fr)', marginBottom:22 }}>
        <StatCard label="Overall rating"  value="4.8 / 5" sub="Based on 312 reviews" />
        <StatCard label="5-star reviews"  value="241"     sub="77% of total" barPct={77} />
        <StatCard label="This month"      value="38"      badgePos="6 vs last month" />
      </div>
      <div className="twoCol">
        <div className="card">
          <div className="cardTitle" style={{ marginBottom:20 }}>Rating breakdown</div>
          {[{label:'5 stars',pct:77},{label:'4 stars',pct:50},{label:'3 stars',pct:12},{label:'2 stars',pct:4}].map((r,i) => (
            <div key={i} className="ratingBarItem">
              <span className="ratingBarLabel">{r.label}</span>
              <div className="ratingBarTrack">
                <div className="ratingBarFill" style={{ width:`${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="cardTitle" style={{ marginBottom:16 }}>Recent reviews</div>
          {reviews.map((r,i) => (
            <div key={i} className="reviewItem">
              <div className="reviewHeader">
                <div className="reviewInitials">{r.initials}</div>
                <div>
                  <div className="reviewName">{r.name}</div>
                  <div className="reviewTreatment">{r.treatment}</div>
                </div>
              </div>
              {r.text && <p className="reviewText">{r.text}</p>}
              <div className="reviewTags">
                {r.tags.map((t,j) => <span key={j} className="reviewTag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function SettingsPage() {
  return (
    <div className="pageContent">
      <h1 className="pageTitle" style={{ marginBottom:24 }}>Settings</h1>
      <div className="settingsGrid">
        <div className="card">
          <div className="cardTitle" style={{ marginBottom:20 }}>Property</div>
          <label className="settingsLabel">Property name</label>
          <div className="settingsValue">GOLD HEAVEN RESORT & SPA</div>
          <label className="settingsLabel">Location</label>
          <div className="settingsValue">NORTH COAST, EGYPT</div>
          <label className="settingsLabel">Currency</label>
          <select className="settingsSelect"><option>Egyptian Pounds</option><option>USD</option></select>
          <label className="settingsLabel">Email</label>
          <div className="settingsValue" style={{ fontSize:12 }}>manager@goldheavenue.ae</div>
        </div>
        <div className="card">
          <div className="cardTitle" style={{ marginBottom:20 }}>Operational hours</div>
          <label className="settingsLabel">Spa opening time</label>
          <div className="settingsValue">12:30 pm</div>
          <label className="settingsLabel">Spa closing time</label>
          <div className="settingsValue">12:30 pm</div>
          <label className="settingsLabel">Pool hours</label>
          <div className="settingsValue">07:00 AM - 10:00 PM</div>
        </div>
      </div>
      <div className="card">
        <div className="cardTitle" style={{ marginBottom:16 }}>Notifications</div>
        {[
          'New booking alerts — Push + email when booking confirmed',
          'Guest check-in reminders — 1 hour before arrival',
          'New review alerts — Notify on each new rating',
        ].map((label,i) => (
          <div key={i} className="toggleRow">
            <span className="toggleLabel">{label}</span>
            <button className="toggleBtn" />
          </div>
        ))}
      </div>
    </div>
  );
}


function ReservationsPage({ onNav }) {
  return (
    <div className="pageContent">
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:28 }}>
        <button onClick={() => onNav('dashboard')} style={{ background:'none', border:'1px solid rgba(201,153,58,0.25)', borderRadius:3, padding:'7px 14px', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:10, color:'var(--lapis)', letterSpacing:1 }}>Back</button>
        <h1 className="pageTitle" style={{ marginBottom:0 }}>Reservation Details</h1>
      </div>
      <div className="reservationCard">
        <div className="reservationCardBody">
          <div className="reservationCardInfo">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div className="reservationCardName">Golden Suite 01</div>
                <div className="reservationCardType">Deluxe Suite · 2F</div>
                <div className="reservationCardPrice">950 EGP /night</div>
              </div>
              <button className="btnSecondary">Guest Details</button>
            </div>
            <div className="reservationCardDivider" />
            {[
              ['Check in','May 2, 2026'],['Check out','May 9, 2026'],
              ['Guest','1 Adult'],['Room Type','Deluxe Suite'],
              ['Room Number','132'],['Guest Request','1 Hot chocolate'],
            ].map(([label,val],i) => (
              <div key={i} className="reservationCardField">
                <span className="reservationCardFieldLabel">{label}: </span>
                <span className="reservationCardFieldValue">{val}</span>
              </div>
            ))}
          </div>
          <div className="reservationCardImg" />
        </div>
        <div className="reservationCardBtns">
          <button className="btnSecondary">Close</button>
          <button className="btnPrimary">Send Booking Reminder</button>
        </div>
      </div>
    </div>
  );
}


function RatesPage() {
  const [activeFilter, setActiveFilter] = useState('All Services');
  const services = [
    { name:'Swedish Massage',      desc:'Relaxing full body',   cat:'MASSAGE', dur:'60 min', std:'690 EGP', wknd:'999 EGP' },
    { name:'Deep Cleansing Facial',desc:'Organic ingredients',  cat:'FACIAL',  dur:'45 min', std:'770 EGP', wknd:'444 EGP' },
    { name:'Hot Stone Therapy',    desc:'Basalt stone massage', cat:'MASSAGE', dur:'90 min', std:'800 EGP', wknd:'665 EGP' },
  ];
  return (
    <div className="pageContent">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <h1 className="pageTitle">Service Rates</h1>
          <p className="pageSubtitle">Manage treatment pricing, durations, and seasonal adjustments.</p>
        </div>
        <div style={{ display:'flex', gap:10, marginTop:8 }}>
          <button className="btnSecondary">Export</button>
          <button className="btnPrimary">+ Add Service</button>
        </div>
      </div>
      <div className="filterTabs" style={{ marginBottom:22 }}>
        {['All Services','Massages','Facials','Body Wraps','Nail Care'].map(f => (
          <button key={f} className={`filterTab${activeFilter===f?' active':''}`} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="dataTable" style={{ marginBottom:22 }}>
        <div className="tableWrap">
          <table>
            <thead><tr>
              <th>Service Name</th><th>Category</th><th>Duration</th><th>Standard Rate</th><th>Weekend Rate</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {services.map((s,i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight:400, color:'var(--lapis)' }}>{s.name}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{s.desc}</div>
                  </td>
                  <td><span className="badgelapis">{s.cat}</span></td>
                  <td>{s.dur}</td>
                  <td style={{ fontFamily:"'Cinzel',serif" }}>{s.std}</td>
                  <td style={{ fontFamily:"'Cinzel',serif", color:'var(--sand)' }}>{s.wknd}</td>
                  <td>
                    <div style={{ display:'flex', gap:10 }}>
                      <button style={{ background:'none', border:'1px solid rgba(201,153,58,0.25)', borderRadius:3, padding:'5px 10px', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:10, color:'var(--sand)', letterSpacing:1 }}>Edit</button>
                      <button style={{ background:'none', border:'1px solid rgba(160,48,48,0.25)', borderRadius:3, padding:'5px 10px', cursor:'pointer', fontFamily:"'Cinzel',serif", fontSize:10, color:'#a03030', letterSpacing:1 }}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="ratesFeatureGrid">
        {[
          { title:'Seasonal Discounts', desc:'Apply percentage-based reductions across categories.', cta:'Configure Now' },
          { title:'Bundle Packages',    desc:'Create service combinations for better value.',          cta:'Create Bundle' },
          { title:'Happy Hour Rates',   desc:'Increase off-peak bookings with dynamic pricing.',       cta:'Set Schedule'  },
        ].map((c,i) => (
          <div key={i} className="ratesFeatureCard">
            <div className="ratesFeatureTitle">{c.title}</div>
            <p className="ratesFeatureDesc">{c.desc}</p>
            <button className="ratesFeatureCta">{c.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPage() {
  const rows = [
    { month:'May 2024',      revenue:'18,750 EGP', appts:156, newC:23, growth:'+12.5%', pos:true  },
    { month:'April 2024',    revenue:'16,650 EGP', appts:144, newC:28, growth:'+8.7%',  pos:true  },
    { month:'March 2024',    revenue:'15,200 EGP', appts:133, newC:25, growth:'+6.3%',  pos:true  },
    { month:'February 2024', revenue:'14,800 EGP', appts:120, newC:22, growth:'-2.1%',  pos:false },
  ];
  return (
    <div className="pageContent">
      <h1 className="pageTitle">Reports</h1>
      <p className="pageSubtitle">Track your spa performance and insights</p>
      <div className="dataTable" style={{ marginBottom:22 }}>
        <div className="tableWrap">
          <table>
            <thead><tr>
              <th>Month</th><th>Revenue</th><th>Appointments</th><th>New customers</th><th>Growth</th>
            </tr></thead>
            <tbody>
              {rows.map((r,i) => (
                <tr key={i}>
                  <td style={{ fontWeight:400 }}>{r.month}</td>
                  <td style={{ fontFamily:"'Cinzel',serif" }}>{r.revenue}</td>
                  <td style={{ textAlign:'center' }}>{r.appts}</td>
                  <td style={{ textAlign:'center' }}>{r.newC}</td>
                  <td style={{ fontFamily:"'Cinzel',serif", color: r.pos ? '#3a6b3e' : '#a03030' }}>{r.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="reportsImgGrid">
        <div className="reportsImg" style={{ backgroundImage:"url('facegold.png')" }} />
        <div className="reportsImg" style={{ backgroundImage:"url('metal.png')" }} />
      </div>
    </div>
  );
}


function ErrorPage({ onNav }) {
  return (
    <div className="pageContent errorPage">
      <div className="errorBox">
        <div className="errorWarning" />
        <div className="errorCode">ERROR 404</div>
        <div className="errorTitle">Unable to load analytics data</div>
        <p className="errorDesc">The analytics service is temporarily unavailable. Your booking and guest data is safe — we're just unable to fetch the report right now.</p>
        <div className="errorBtns">
          <button className="btnPrimary" onClick={() => window.location.reload()}>Reload Page</button>
          <button className="btnSecondary" onClick={() => onNav('dashboard')}>Go to Overview</button>
        </div>
      </div>
    </div>
  );
}


export default function Dashboard() {
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (p) => {
    setPage(p);
    setSidebarOpen(false);
    window.scrollTo({ top:0, behavior:'smooth' });
  };

  const pages = {
    dashboard:    <DashboardPage onNav={navigate} />,
    bookings:     <BookingsPage />,
    guests:       <GuestsPage onNav={navigate} />,
    schedules:    <SchedulesPage />,
    staff:        <StaffPage />,
    rooms:        <RoomsPage />,
    revenue:      <RevenuePage />,
    reviews:      <ReviewsPage />,
    settings:     <SettingsPage />,
    reservations: <ReservationsPage onNav={navigate} />,
    rates:        <RatesPage />,
    reports:      <ReportsPage />,
    error:        <ErrorPage onNav={navigate} />,
  };

  return (
    <div className="dashWrapper">
      <Sidebar active={page} onNav={navigate} open={sidebarOpen} />
      <div className="dashMain">
        <Topbar />
        {pages[page] || <ErrorPage onNav={navigate} />}
      </div>
      <button className="sidebarToggle" onClick={() => setSidebarOpen(o => !o)}>
        {sidebarOpen ? 'X' : '='}
      </button>
    </div>
  );
}