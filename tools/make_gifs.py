"""Generate the spring-mass response GIFs used on the Interactive Lab page.

Usage (from the website folder):
    pip install numpy matplotlib pillow
    python tools/make_gifs.py
GIFs are written to assets/gifs/.
"""
import os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation, PillowWriter
from matplotlib.patches import FancyBboxPatch

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "gifs")
os.makedirs(OUT, exist_ok=True)
ACCENT, ACCENT2, MUTED, WARN, BAD = "#0d9488", "#4f46e5", "#94a3b8", "#d97706", "#dc2626"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 9, "axes.spines.top": False, "axes.spines.right": False})


def simulate(m, k, c, x0=1.0, v0=0.0, force=None, T=10.0, n=2000):
    """RK4 integration of m x'' + c x' + k x = F(t)."""
    dt = T / n
    t = np.linspace(0, T, n + 1)
    y = np.array([x0, v0], float)
    xs = np.empty(n + 1)
    f = force or (lambda s: 0.0)
    rhs = lambda s, q: np.array([q[1], (f(s) - c * q[1] - k * q[0]) / m])
    for i in range(n + 1):
        xs[i] = y[0]
        k1 = rhs(t[i], y); k2 = rhs(t[i] + dt / 2, y + dt / 2 * k1)
        k3 = rhs(t[i] + dt / 2, y + dt / 2 * k2); k4 = rhs(t[i] + dt, y + dt * k3)
        y = y + dt / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
    return t, xs


def spring_xy(top, bottom, x=0.0, coils=8, w=0.12):
    ys = np.linspace(top, bottom, 2 * coils + 3)
    xs = np.full_like(ys, x)
    xs[2:-2] = x + w * np.array([(-1) ** i for i in range(len(ys) - 4)])
    return xs, ys


def draw_system(ax, xpos, cx=0.0, label="", color=ACCENT, scale=0.35):
    """Draw a hanging spring-mass at horizontal position cx with displacement xpos (-1..1)."""
    my = -1.0 - scale * xpos
    sx, sy = spring_xy(0.0, my + 0.15, cx)
    ax.plot(sx, sy, color="#334155", lw=1.6)
    ax.add_patch(FancyBboxPatch((cx - 0.22, my - 0.15), 0.44, 0.3, boxstyle="round,pad=0.02", fc=color, ec="none"))
    ax.plot([cx - 0.35, cx + 0.35], [0, 0], color=MUTED, lw=3)
    ax.plot([cx - 0.35, cx + 0.35], [-1.0, -1.0], color=MUTED, lw=0.8, ls="--")
    if label:
        ax.text(cx, 0.15, label, ha="center", fontsize=8, color="#0f172a")


def make(name, systems, T, fps=25, seconds=6, ylabel="x (m)", title="", force_t=None):
    """systems: list of (t, x, label, color)."""
    frames = fps * seconds
    fig = plt.figure(figsize=(7.2, 3.3), dpi=80)
    gs = fig.add_gridspec(1, 2, width_ratios=[1.2, 1.7], wspace=0.22, left=0.02, right=0.97, bottom=0.16, top=0.9)
    ax_s, ax_p = fig.add_subplot(gs[0]), fig.add_subplot(gs[1])
    peak = max(np.max(np.abs(x)) for _, x, _, _ in systems) or 1
    def update(fi):
        tc = T * fi / (frames - 1)
        ax_s.clear(); ax_p.clear()
        ax_s.set_xlim(-0.7 * max(len(systems), 1.4), 0.7 * max(len(systems), 1.4)); ax_s.set_ylim(-1.75, 0.35); ax_s.axis("off")
        n = len(systems)
        for j, (t, x, lab, col) in enumerate(systems):
            i = min(len(t) - 1, int(tc / t[-1] * (len(t) - 1)))
            draw_system(ax_s, x[i] / peak, cx=(j - (n - 1) / 2) * 1.35, label=lab, color=col)
            ax_p.plot(t[: i + 1], x[: i + 1], color=col, lw=1.8, label=lab)
        ax_p.set_xlim(0, T); ax_p.set_ylim(-1.15 * peak, 1.15 * peak)
        ax_p.set_xlabel("time (s)"); ax_p.set_ylabel(ylabel); ax_p.grid(alpha=0.25)
        if n > 1: ax_p.legend(loc="upper right", fontsize=7, frameon=False)
        if title: ax_p.set_title(title, fontsize=10)
    anim = FuncAnimation(fig, update, frames=frames)
    path = os.path.join(OUT, name)
    anim.save(path, writer=PillowWriter(fps=fps))
    plt.close(fig)
    print("saved", path, f"{os.path.getsize(path) / 1024:.0f} KB")


m, k = 1.0, 4 * np.pi ** 2  # wn = 2*pi rad/s, fn = 1 Hz
wn = np.sqrt(k / m)
cc = 2 * np.sqrt(k * m)

t, x = simulate(m, k, 0.1 * cc, T=6)
make("free_underdamped.gif", [(t, x, "ζ = 0.1", ACCENT)], 6, title="Underdamped free vibration")

sys = []
for z, col in [(0.1, ACCENT), (1.0, ACCENT2), (2.0, WARN)]:
    t, x = simulate(m, k, z * cc, T=4)
    sys.append((t, x, f"ζ = {z}", col))
make("damping_comparison.gif", sys, 4, title="Effect of damping ratio")

t, x = simulate(m, k, 0.05 * cc, x0=0, force=lambda s: 10 * np.sin(wn * s), T=10)
make("resonance.gif", [(t, x, "r = 1, ζ = 0.05", BAD)], 10, seconds=7, title="Harmonic forcing at resonance")

t, x = simulate(m, k, 0.0, x0=0, force=lambda s: 10 * np.sin(0.9 * wn * s), T=20)
make("beating.gif", [(t, x, "r = 0.9, ζ = 0", ACCENT2)], 20, seconds=7, title="Beating (undamped, near resonance)")

# PID step response: u = Kp e + Ki ∫e - Kd v
def pid(Kp, Ki, Kd, target=1.0, T=5, n=2000, mm=1.0, kk=20.0, c=1.0):
    dt = T / n; tt = np.linspace(0, T, n + 1); y = np.zeros(3); xs = np.empty(n + 1)
    def rhs(q):
        e = target - q[0]; u = Kp * e + Ki * q[2] - Kd * q[1]
        return np.array([q[1], (u - c * q[1] - kk * q[0]) / mm, e])
    for i in range(n + 1):
        xs[i] = y[0]
        k1 = rhs(y); k2 = rhs(y + dt / 2 * k1); k3 = rhs(y + dt / 2 * k2); k4 = rhs(y + dt * k3)
        y = y + dt / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
    return tt, xs

sys = [(*pid(120, 0, 0), "P", WARN), (*pid(120, 0, 20), "PD", ACCENT2), (*pid(120, 60, 20), "PID", ACCENT)]
make("pid_step.gif", sys, 5, ylabel="x (m), target = 1", title="Step response: P vs PD vs PID")
