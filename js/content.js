/* =====================================================================
   EDIT THIS FILE to update the website content.
   Every page reads its text from here, so you rarely need to touch HTML.
   ===================================================================== */

window.PROFILE = {
  name: "Suraj Kumar",
  initials: "SK",
  title: "Ph.D. Scholar, Mechanical Engineering",
  affiliation: "Machine Tool Laboratory, IIT Bombay",
  tagline: "I study machine-tool dynamics: detecting chatter in high-speed micromilling in real time with signal processing and machine learning.",
  about: [
    "I am a Ph.D. scholar (since 2021) at the Machine Tool Laboratory, Department of Mechanical Engineering, IIT Bombay.",
    "My research focuses on real-time chatter detection in high-speed micromilling. I combine vibration theory, sensor signal processing and machine learning to recognise unstable cutting before it damages the part or the tool.",
    "On this site I share tutorials, exercises, quizzes and interactive simulations on vibrations, control and machining.",
  ],
  // Fill these in (leave "" to hide a link)
  links: {
    email: "",
    scholar: "",
    linkedin: "",
    github: "",
    youtube: "",
    cv: "", // e.g. "assets/Suraj_Kumar_CV.pdf"
  },
  photo: "", // e.g. "assets/img/suraj.jpg"
  skills: {
    "Vibration & dynamics": ["Modal analysis", "Forced vibration", "Stability lobe diagrams", "Chatter theory", "Impact hammer testing"],
    "Signal processing": ["FFT / STFT", "Wavelet transform", "Filtering", "Feature extraction", "Acoustic emission"],
    "Machine learning": ["Python", "scikit-learn", "Deep learning", "Classification", "Real-time inference"],
    "Hardware & tools": ["NI DAQ", "LabVIEW", "MATLAB / Simulink", "Accelerometers & dynamometers", "High-speed micromachining"],
  },
  timeline: [
    { when: "2021 – present", title: "Ph.D., Mechanical Engineering, IIT Bombay", text: "Real-time chatter detection in high-speed micromilling. Machine Tool Laboratory." },
    { when: "Add year", title: "Previous degree", text: "Add your M.Tech / B.Tech details here." },
  ],
  highlights: [
    { k: "140k", v: "RPM micromilling spindle" },
    { k: "Real-time", v: "chatter detection" },
    { k: "ML + DSP", v: "for machining signals" },
  ],
};

window.RESEARCH = {
  summary: "Chatter is a self-excited vibration between the cutting tool and the workpiece. In micromilling, the tiny tools, very high spindle speeds and low damping make it hard to predict with classical stability theory alone. My work builds a sensing and learning pipeline that recognises the onset of chatter from vibration and acoustic signals fast enough to act on it.",
  themes: [
    { title: "Sensing", text: "Accelerometers, force dynamometers, acoustic emission and laser displacement sensors capture the cutting process at high sample rates." },
    { title: "Signal processing", text: "Time-frequency methods such as STFT and wavelets separate tooth-passing harmonics from the chatter frequency." },
    { title: "Learning", text: "Features feed lightweight classifiers that label stable, transitional and chatter states in real time." },
    { title: "Action", text: "The detection result can drive spindle-speed or feed adjustment to move the process back into a stable zone." },
  ],
  // Add your papers here: { authors, title, venue, year, link, status }
  publications: [
    { authors: "S. Kumar, et al.", title: "Add your paper title here", venue: "Journal / Conference", year: "2025", link: "", status: "In preparation" },
  ],
};

/* ---------------- Video tutorials ----------------
   For YouTube: put the video id (the part after v= in the URL) in "youtube".
   For a local file: copy it into assets/videos/ and set "file": "assets/videos/name.mp4".
   Leave both empty to show a "coming soon" card. */
window.TUTORIALS = [
  { title: "Free vibration of a spring-mass system", topic: "Vibrations", level: "Beginner", duration: "12 min", youtube: "", file: "",
    desc: "Derive the equation of motion, natural frequency and the response to an initial displacement." },
  { title: "Damping and the damping ratio", topic: "Vibrations", level: "Beginner", duration: "15 min", youtube: "", file: "",
    desc: "Underdamped, critically damped and overdamped motion, and measuring damping with the log decrement." },
  { title: "Forced vibration and resonance", topic: "Vibrations", level: "Intermediate", duration: "18 min", youtube: "", file: "",
    desc: "Frequency response, magnification factor, phase and transmissibility." },
  { title: "What is chatter in machining?", topic: "Machining", level: "Intermediate", duration: "20 min", youtube: "", file: "",
    desc: "Regenerative chatter, stability lobes and why it matters in micromilling." },
  { title: "FFT and STFT of vibration signals in Python", topic: "Signal processing", level: "Intermediate", duration: "25 min", youtube: "", file: "",
    desc: "Turn raw accelerometer data into spectra and spectrograms to spot chatter frequencies." },
  { title: "PID control of a mass-spring system", topic: "Control", level: "Intermediate", duration: "16 min", youtube: "", file: "",
    desc: "Tune P, I and D gains and see their effect on rise time, overshoot and steady-state error." },
];

/* ---------------- Exercises ----------------
   answer: numeric answer used by the "Check" box (tol = relative tolerance). */
window.EXERCISES = [
  { topic: "Vibrations", level: "Easy", title: "Natural frequency",
    q: "A mass of 2 kg is attached to a spring of stiffness 800 N/m. Find the natural frequency in Hz.",
    hint: "ωn = √(k/m), and f = ωn / 2π.",
    solution: "ωn = √(800/2) = 20 rad/s, so fn = 20 / 2π ≈ <b>3.18 Hz</b>.",
    answer: 3.183, unit: "Hz", tol: 0.02 },
  { topic: "Vibrations", level: "Easy", title: "Springs in series",
    q: "Two springs, k₁ = 1000 N/m and k₂ = 4000 N/m, are connected in series. What is the equivalent stiffness in N/m?",
    hint: "For springs in series, 1/k = 1/k₁ + 1/k₂.",
    solution: "1/k = 1/1000 + 1/4000 = 5/4000, so k = <b>800 N/m</b>.",
    answer: 800, unit: "N/m", tol: 0.01 },
  { topic: "Vibrations", level: "Medium", title: "Damping ratio",
    q: "For m = 2 kg, k = 800 N/m and c = 16 N·s/m, find the damping ratio ζ.",
    hint: "ζ = c / (2√(km)).",
    solution: "c_cr = 2√(800 × 2) = 80 N·s/m, so ζ = 16/80 = <b>0.2</b>.",
    answer: 0.2, unit: "", tol: 0.02 },
  { topic: "Vibrations", level: "Medium", title: "Logarithmic decrement",
    q: "For a system with ζ = 0.2, find the logarithmic decrement δ.",
    hint: "δ = 2πζ / √(1 − ζ²).",
    solution: "δ = 2π(0.2) / √(1 − 0.04) = 1.2566 / 0.9798 ≈ <b>1.283</b>.",
    answer: 1.283, unit: "", tol: 0.02 },
  { topic: "Vibrations", level: "Medium", title: "Static deflection",
    q: "A machine sits on springs that deflect 2 mm under its weight. Estimate the natural frequency in rad/s (g = 9.81 m/s²).",
    hint: "k·δst = m·g, so ωn = √(g/δst).",
    solution: "ωn = √(9.81 / 0.002) ≈ <b>70.0 rad/s</b> (about 11.1 Hz).",
    answer: 70.04, unit: "rad/s", tol: 0.02 },
  { topic: "Vibrations", level: "Hard", title: "Vibration isolation",
    q: "A machine runs at twice the natural frequency of its isolators (r = 2) with ζ = 0.1. What is the force transmissibility TR?",
    hint: "TR = √(1 + (2ζr)²) / √((1 − r²)² + (2ζr)²).",
    solution: "TR = √(1 + 0.16) / √(9 + 0.16) = 1.077 / 3.027 ≈ <b>0.356</b>, so about 36% of the force is transmitted.",
    answer: 0.356, unit: "", tol: 0.02 },
  { topic: "Machining", level: "Easy", title: "Tooth passing frequency",
    q: "A 4-flute end mill runs at 12,000 RPM. What is the tooth passing frequency in Hz?",
    hint: "f_tp = (RPM × number of teeth) / 60.",
    solution: "f_tp = 12000 × 4 / 60 = <b>800 Hz</b>. Peaks at 800, 1600, 2400 Hz in the spectrum are forced vibration, not chatter.",
    answer: 800, unit: "Hz", tol: 0.01 },
  { topic: "Machining", level: "Medium", title: "Micromilling spindle speed",
    q: "A 2-flute micro end mill runs at 120,000 RPM. What is the tooth passing frequency in kHz?",
    hint: "Same formula, then divide by 1000.",
    solution: "f_tp = 120000 × 2 / 60 = 4000 Hz = <b>4 kHz</b>. This is why micromilling needs high sample-rate sensors.",
    answer: 4, unit: "kHz", tol: 0.01 },
  { topic: "Control", level: "Medium", title: "Closed-loop natural frequency",
    q: "A 1 kg mass with a 100 N/m spring is controlled by a proportional controller with Kp = 300 N/m. What is the closed-loop natural frequency in rad/s?",
    hint: "Proportional feedback acts like an extra spring: k_eff = k + Kp.",
    solution: "k_eff = 100 + 300 = 400 N/m, so ωn = √(400/1) = <b>20 rad/s</b>.",
    answer: 20, unit: "rad/s", tol: 0.01 },
];

/* ---------------- Quizzes ----------------
   a: index of the correct option (0 = first). */
window.QUIZZES = {
  "Vibration basics": [
    { q: "If the mass of a spring-mass system is increased four times, the natural frequency…", o: ["Doubles", "Halves", "Becomes four times", "Stays the same"], a: 1, e: "ωn = √(k/m). Four times the mass gives 1/√4 = 1/2 of the frequency." },
    { q: "A system with damping ratio ζ = 1 is called…", o: ["Undamped", "Underdamped", "Critically damped", "Overdamped"], a: 2, e: "ζ = 1 is critical damping: the fastest return to equilibrium without oscillation." },
    { q: "At resonance (r = 1), the phase lag between force and displacement is…", o: ["0°", "45°", "90°", "180°"], a: 2, e: "For any damping, the phase lag is exactly 90° at r = 1." },
    { q: "Vibration isolation (TR < 1) is achieved when the frequency ratio r is greater than…", o: ["0.5", "1", "√2", "2"], a: 2, e: "All transmissibility curves cross TR = 1 at r = √2, so isolation needs r > √2." },
    { q: "The logarithmic decrement is used to measure…", o: ["Stiffness", "Mass", "Damping", "Natural frequency"], a: 2, e: "δ = ln(x₁/x₂) between successive peaks, which gives the damping ratio." },
    { q: "The damped natural frequency ωd is related to ωn by…", o: ["ωd = ωn(1 − ζ²)", "ωd = ωn√(1 − ζ²)", "ωd = ωn/ζ", "ωd = ωn√(1 + ζ²)"], a: 1, e: "ωd = ωn√(1 − ζ²), slightly lower than ωn for light damping." },
  ],
  "Machining & chatter": [
    { q: "Regenerative chatter is caused mainly by…", o: ["Spindle unbalance", "Waviness left by the previous tooth pass", "Coolant pressure", "Thermal expansion"], a: 1, e: "Each tooth cuts a surface left wavy by the previous one, which feeds back into the cutting force." },
    { q: "Chatter is classed as which type of vibration?", o: ["Free", "Forced", "Self-excited", "Random"], a: 2, e: "Chatter draws energy from the cutting process itself, so it is self-excited." },
    { q: "A stability lobe diagram plots axial depth of cut against…", o: ["Feed rate", "Spindle speed", "Tool length", "Temperature"], a: 1, e: "Stable zones under the lobes show which depth/speed combinations are chatter-free." },
    { q: "In a spectrum, chatter usually appears…", o: ["Exactly at tooth passing harmonics", "Near a natural frequency of the tool/structure", "Only at DC", "At the sensor sample rate"], a: 1, e: "Chatter occurs near a dominant structural mode, not at the tooth-passing harmonics." },
    { q: "Which sensor is especially sensitive to micro-scale cutting events?", o: ["Thermocouple", "Acoustic emission sensor", "Strain gauge on the bed", "Tachometer"], a: 1, e: "AE sensors pick up high-frequency stress waves, which suits micromachining." },
    { q: "One common way to escape chatter during a cut is to…", o: ["Increase depth of cut", "Change spindle speed to a stable lobe", "Use a longer tool", "Reduce damping"], a: 1, e: "Moving the spindle speed into a stability pocket is a classic chatter-suppression method." },
  ],
  "Control basics": [
    { q: "Increasing the proportional gain Kp usually…", o: ["Removes overshoot", "Speeds up response but can increase overshoot", "Eliminates steady-state error completely", "Has no effect"], a: 1, e: "Higher Kp stiffens the loop: a faster response, but often more overshoot." },
    { q: "The integral term in a PID controller mainly…", o: ["Adds damping", "Removes steady-state error", "Predicts future error", "Filters noise"], a: 1, e: "Integral action accumulates error until it is driven to zero." },
    { q: "Derivative action in a PID controller behaves like…", o: ["A spring", "A damper", "A mass", "A gear"], a: 1, e: "Force proportional to velocity acts like a damper, which reduces overshoot." },
    { q: "A closed-loop pole in the right half of the s-plane means the system is…", o: ["Stable", "Marginally stable", "Unstable", "Critically damped"], a: 2, e: "Right-half-plane poles give exponentially growing responses." },
    { q: "Percent overshoot of a second-order system depends only on…", o: ["ωn", "ζ", "Input size", "Mass"], a: 1, e: "%OS = exp(−ζπ/√(1 − ζ²)) × 100, a function of ζ only." },
  ],
};

/* ---------------- Blog posts ----------------
   body is HTML. Add new posts at the top. "slug" is used in the URL (post.html?p=slug). */
window.POSTS = [
  {
    slug: "what-is-chatter",
    title: "What is chatter, and why is it harder in micromilling?",
    date: "2026-10-01", tags: ["Machining", "Vibrations"], read: "6 min",
    excerpt: "A practical introduction to regenerative chatter, the stability lobe diagram, and what changes when tools shrink below a millimetre.",
    body: `
<p>If you have ever heard a milling machine start to <em>scream</em> halfway through a cut, you have heard chatter. It leaves a wavy surface, wears tools quickly and can break a micro end mill in seconds.</p>
<h2>Regeneration: the root cause</h2>
<p>Each tooth cuts a surface that the previous tooth has already left slightly wavy. If the tool is vibrating, the chip thickness changes from one pass to the next, which changes the cutting force, which drives more vibration. When the phase between the old and new waves is unfavourable, the vibration grows: this is <b>regenerative chatter</b>.</p>
<span class="eq">h(t) = h₀ + y(t − T) − y(t),  T = 60 / (N · RPM)</span>
<p>Here h is the chip thickness, y the tool displacement and T the tooth passing period for N teeth.</p>
<h2>Stability lobes</h2>
<p>Solving this delay equation gives a <b>stability lobe diagram</b>: for every spindle speed there is a limiting depth of cut. Between the lobes are "pockets" where much deeper cuts are stable.</p>
<h2>Why micromilling is different</h2>
<ul>
<li><b>Very high speeds</b> (often 50,000–140,000 RPM) push tooth passing frequencies into the kHz range.</li>
<li><b>Tiny, slender tools</b> have low stiffness and modes that are hard to measure directly.</li>
<li><b>Size effects</b>: the chip thickness is close to the cutting-edge radius, so classical force models become less accurate.</li>
</ul>
<p>Because the prediction is uncertain, <b>detecting</b> chatter from sensor signals in real time becomes very valuable. That is the focus of my Ph.D.</p>
<blockquote>Try the <a href="lab.html#forced">forced vibration simulator</a> to see how a structure's response peaks near resonance.</blockquote>`,
  },
  {
    slug: "damping-ratio-intuition",
    title: "Building intuition for the damping ratio",
    date: "2026-09-15", tags: ["Vibrations", "Tutorial"], read: "5 min",
    excerpt: "Underdamped, critically damped and overdamped responses explained with one equation and an interactive simulator.",
    body: `
<p>Almost every vibration problem comes back to one equation:</p>
<span class="eq">m·ẍ + c·ẋ + k·x = F(t)</span>
<p>Dividing by m gives two numbers that describe everything about the free response:</p>
<span class="eq">ωn = √(k/m)      ζ = c / (2√(km))</span>
<h2>Three regimes</h2>
<ul>
<li><b>ζ &lt; 1, underdamped:</b> the mass oscillates at ωd = ωn√(1 − ζ²) inside an exponential envelope e^(−ζωn t).</li>
<li><b>ζ = 1, critically damped:</b> the fastest return to rest with no overshoot.</li>
<li><b>ζ &gt; 1, overdamped:</b> no oscillation, but a slower return.</li>
</ul>
<img src="assets/gifs/damping_comparison.gif" alt="Animation comparing underdamped, critically damped and overdamped spring-mass systems">
<h2>Measuring damping</h2>
<p>From an experimental decay, take two successive peaks x₁ and x₂. The logarithmic decrement δ = ln(x₁/x₂) gives ζ = δ / √(4π² + δ²).</p>
<p>Open the <a href="lab.html#free">free vibration simulator</a> and drag the damping slider to see each regime.</p>`,
  },
  {
    slug: "fft-vs-wavelet",
    title: "FFT, STFT or wavelets? Choosing a tool for machining signals",
    date: "2026-08-20", tags: ["Signal processing"], read: "7 min",
    excerpt: "Why a plain FFT is not enough to catch the onset of chatter, and what time-frequency methods add.",
    body: `
<p>A spectrum tells you <em>which</em> frequencies are present, but not <em>when</em> they appear. Chatter starts partway through a cut, so timing matters.</p>
<h2>FFT</h2>
<p>Good for steady signals. In a stable cut you see tooth passing harmonics; in a chatter cut a new peak appears near a structural mode.</p>
<h2>STFT</h2>
<p>Slide a window along the signal and take an FFT of each piece. The result is a spectrogram. There is a trade-off: short windows give good timing but poor frequency resolution.</p>
<pre>import numpy as np
from scipy.signal import stft
f, t, Z = stft(acc, fs=50_000, nperseg=1024)
power = np.abs(Z) ** 2</pre>
<h2>Wavelets</h2>
<p>Wavelets use short windows at high frequency and long windows at low frequency, which suits transient events like chatter onset.</p>
<h2>From features to decisions</h2>
<p>Energy ratios in bands around the chatter frequency, compared with energy at tooth-passing harmonics, make simple and robust features for a classifier.</p>`,
  },
];

/* ---------------- GIF gallery (Interactive Lab page) ----------------
   Put your own GIFs in assets/gifs/ and list them here. */
window.GIFS = [
  { file: "assets/gifs/free_underdamped.gif", title: "Underdamped free vibration", text: "ζ = 0.1: the mass oscillates and decays slowly." },
  { file: "assets/gifs/damping_comparison.gif", title: "Effect of damping", text: "ζ = 0.1, 1.0 and 2.0 released from the same displacement." },
  { file: "assets/gifs/resonance.gif", title: "Forced response near resonance", text: "Harmonic force at r = 1: the amplitude grows until damping balances it." },
  { file: "assets/gifs/beating.gif", title: "Beating", text: "Undamped forcing at r = 0.9: energy slowly moves in and out." },
  { file: "assets/gifs/pid_step.gif", title: "PID position control", text: "Step response of a controlled mass with P, PD and PID." },
];
