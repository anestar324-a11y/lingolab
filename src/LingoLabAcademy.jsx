import { useState, useEffect, useRef } from "react";
import lingoLabLogo from "./lingolab-logo.jpg";

/* ─── Google Fonts ─── */
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

/* ─── Design Tokens ─── */
const T = {
  primary: "#0051d1",
  primaryContainer: "#7a9dff",
  onPrimary: "#ffffff",
  secondary: "#fdd34d",
  secondaryContainer: "#fdd34d",
  onSecondaryContainer: "#5c4900",
  tertiary: "#f7a48b",
  tertiaryFixed: "#f7a48b",
  surface: "#f3f7fb",
  surfaceBright: "rgba(255,255,255,0.7)",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#ecf1f6",
  surfaceContainerHigh: "#dde3ea",
  surfaceContainerHighest: "#d0d7df",
  onSurface: "#2a2f32",
  onSurfaceVariant: "#5f6568",
  outlineVariant: "rgba(42,47,50,0.15)",
  mint: "#4ecdc4",
  radius: { md: "1rem", lg: "2rem", xl: "3rem", full: "9999px" },
  shadow: (o = 0.06) => `0 8px 40px rgba(42,47,50,${o})`,
  gradient: "linear-gradient(135deg, #0051d1, #7a9dff)",
  gradientCTA: "linear-gradient(135deg, #0051d1 0%, #3b7dff 50%, #7a9dff 100%)",
};

/* ─── Squiggle SVG ─── */
const Squiggle = ({ color = T.tertiaryFixed, w = 200 }) => (
  <svg width={w} height="20" viewBox="0 0 200 20" fill="none" style={{ display: "block", margin: "0 auto" }}>
    <path d="M0 10 C25 0, 50 20, 75 10 S125 0, 150 10 S175 20, 200 10" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

/* ─── Shared Styles ─── */
const baseStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; color: ${T.onSurface}; background: ${T.surface}; }
  h1, h2, h3, h4, h5, h6 { font-family: 'Lexend', sans-serif; }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to { opacity: 1; transform: scale(1); }
  }
  .fade-in { animation: fadeInUp 0.7s ease-out both; }
  .fade-in-d1 { animation: fadeInUp 0.7s ease-out 0.1s both; }
  .fade-in-d2 { animation: fadeInUp 0.7s ease-out 0.2s both; }
  .fade-in-d3 { animation: fadeInUp 0.7s ease-out 0.3s both; }
  .fade-in-d4 { animation: fadeInUp 0.7s ease-out 0.4s both; }
  .scale-in { animation: scaleIn 0.6s ease-out both; }
`;

/* ─── Navigation ─── */
const navItems = [
  { label: "Нүүр хуудас", page: "home" },
  { label: "Мэдээ", page: "news" },
  { label: "Үйл ажиллагаа", page: "events" },
  { label: "Бидний тухай", page: "about" },
  { label: "Холбоо барих", page: "contact" },
];

function Navbar({ current, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? T.surfaceBright : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "all 0.3s ease",
      padding: "0.75rem 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => onNav("home")}>
          <img src={lingoLabLogo} alt="LingoLab Academy" style={{ height: "2.5rem", width: "auto" }} />
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {navItems.map(n => (
            <span key={n.page} onClick={() => onNav(n.page)} style={{
              fontSize: "0.875rem", fontWeight: current === n.page ? 700 : 500,
              color: current === n.page ? T.primary : T.onSurface,
              cursor: "pointer", borderBottom: current === n.page ? `2px solid ${T.primary}` : "2px solid transparent",
              paddingBottom: 2, transition: "all 0.2s",
            }}>{n.label}</span>
          ))}
          <button onClick={() => onNav("contact")} style={{
            background: T.gradient, color: T.onPrimary, border: "none",
            borderRadius: T.radius.full, padding: "0.6rem 1.5rem",
            fontFamily: "'Lexend'", fontWeight: 600, fontSize: "0.875rem",
            cursor: "pointer", transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >Бүртгүүлэх</button>
        </div>
      </div>
    </nav>
  );
}

/* ─── Footer ─── */
function Footer({ onNav }) {
  return (
    <footer style={{ background: T.surfaceContainerLow, padding: "3rem 2rem 1.5rem", marginTop: "4rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "'Lexend'", fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              <span style={{ color: T.primary }}>LingoLab</span> Academy
            </div>
            <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, lineHeight: 1.6 }}>
              Хүүхэд бүрийн бүтээлчээр хөгжүүлэх дэлхийн жишигт нийцсэн сургалтын чанартай тэнд.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.75rem" }}>Цэс</h4>
            {["Бидний тухай", "Хичээлүүд", "Мэдээ мэдээлэл"].map((t, i) => (
              <p key={i} style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, marginBottom: "0.4rem", cursor: "pointer" }}>{t}</p>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.75rem" }}>Холбоо барих</h4>
            <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, marginBottom: "0.4rem" }}>Улаанбаатар, Сүхбаатар дүүрэг</p>
            <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, marginBottom: "0.4rem" }}>+976 7700-0000</p>
            <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant }}>info@lingolab.mn</p>
          </div>
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.75rem" }}>Сошиал</h4>
            {["Фэйсбүүк", "Инстаграм", "Ютүб"].map((t, i) => (
              <p key={i} style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, marginBottom: "0.4rem", cursor: "pointer" }}>{t}</p>
            ))}
          </div>
        </div>
        <Squiggle w={160} />
        <p style={{ textAlign: "center", fontSize: "0.75rem", color: T.onSurfaceVariant, marginTop: "1rem" }}>
          © 2024 LingoLab Academy. Сурч, тоглож, хөгжицгөөе!
        </p>
      </div>
    </footer>
  );
}

/* ─── Btn Component ─── */
function Btn({ children, variant = "primary", onClick, style: s = {} }) {
  const [hov, setHov] = useState(false);
  const base = variant === "primary"
    ? { background: T.gradientCTA, color: T.onPrimary }
    : { background: T.surfaceContainerHighest, color: T.onSurface };
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        ...base, border: "none", borderRadius: T.radius.xl, padding: "0.85rem 2rem",
        fontFamily: "'Lexend'", fontWeight: 600, fontSize: "0.95rem",
        cursor: "pointer", transition: "all 0.25s ease",
        transform: hov ? "scale(1.05)" : "scale(1)",
        boxShadow: hov ? T.shadow(0.12) : "none",
        display: "inline-flex", alignItems: "center", gap: "0.5rem", ...s,
      }}>{children}</button>
  );
}

/* ─── Card Component ─── */
function Card({ children, style: s = {}, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: T.surfaceContainerLowest,
        borderRadius: T.radius.lg,
        padding: "1.75rem",
        transition: "all 0.3s ease",
        transform: hover && hov ? "translateY(-4px)" : "none",
        boxShadow: hover && hov ? T.shadow(0.1) : T.shadow(0.03),
        ...s,
      }}>{children}</div>
  );
}

/* ─── Chip ─── */
function Chip({ children, color = T.secondaryContainer, textColor = T.onSecondaryContainer }) {
  return (
    <span style={{
      background: color, color: textColor, borderRadius: T.radius.full,
      padding: "0.35rem 1rem", fontSize: "0.75rem", fontWeight: 600,
      fontFamily: "'Lexend'", display: "inline-block",
    }}>{children}</span>
  );
}

/* ─── Placeholder Image ─── */
function PlaceholderImg({ w = 400, h = 300, label = "", style: s = {}, gradient = T.gradient }) {
  return (
    <div style={{
      width: "100%", maxWidth: w, height: h, borderRadius: T.radius.lg,
      background: gradient, display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", fontFamily: "'Lexend'", fontWeight: 500,
      overflow: "hidden", position: "relative", ...s,
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15), transparent 60%)" }} />
      {label && <span style={{ position: "relative", zIndex: 1 }}>{label}</span>}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE: HOME
   ════════════════════════════════════════════════════════════════ */
function HomePage({ onNav }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: "8rem 2rem 4rem",
        background: `linear-gradient(135deg, rgba(122,157,255,0.08) 0%, rgba(247,164,139,0.08) 50%, rgba(253,211,77,0.06) 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(253,211,77,0.12)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(247,164,139,0.15)", filter: "blur(50px)" }} />
        
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div className="fade-in">
            <Chip color={T.primary} textColor="#fff">ШИНЭ ЭЛСЭЛТ ЭХЭЛЛЭЭ</Chip>
            <h1 style={{ fontFamily: "'Lexend'", fontSize: "3.2rem", fontWeight: 800, lineHeight: 1.1, margin: "1rem 0", letterSpacing: "-0.02em" }}>
              Хэл сурах нь<br />
              <span style={{ color: T.primary, fontStyle: "italic" }}>адал явдал</span>
            </h1>
            <p style={{ fontSize: "1rem", color: T.onSurfaceVariant, lineHeight: 1.7, maxWidth: 480, marginBottom: "2rem" }}>
              Бид хүүхэд бүрийн доторх бүтээлч чадварыг нээж, хэлийг тоглоом, урлаг, технологиор дамжуулан зааддаг орчин үеийн академи юм.
            </p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Btn onClick={() => onNav("contact")}>Одоо бүртгүүлээрэй</Btn>
              <Btn variant="secondary" onClick={() => onNav("about")}>Хөтөлбөр үзэх</Btn>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
              <div style={{ display: "flex" }}>
                {["#f7a48b", "#7a9dff", "#fdd34d"].map((c, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: "50%", background: c,
                    border: `3px solid ${T.surfaceContainerLowest}`,
                    marginLeft: i > 0 ? -12 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", color: "#fff", fontWeight: 700,
                  }}>{["👦", "👧", "🧒"][i]}</div>
                ))}
              </div>
              <span style={{ fontSize: "0.85rem", color: T.onSurfaceVariant }}>
                <strong style={{ color: T.onSurface, fontFamily: "'Lexend'" }}>500+</strong> Суралцагчид
              </span>
            </div>
          </div>
          <div className="fade-in-d2" style={{ position: "relative" }}>
            <PlaceholderImg w={520} h={380} label="🎨 Хүүхдүүд суралцаж байна"
              gradient="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
              style={{ borderRadius: T.radius.xl, animation: "float 6s ease-in-out infinite" }} />
            <div style={{
              position: "absolute", bottom: -20, left: -20,
              background: T.secondaryContainer, borderRadius: T.radius.lg,
              padding: "1rem 1.25rem", fontFamily: "'Lexend'", fontWeight: 700,
              fontSize: "1.1rem", color: T.onSecondaryContainer,
              boxShadow: T.shadow(0.1),
            }}>
              500+ <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>ажилласан суралцагч</span>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section style={{ padding: "5rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }} className="fade-in">
          <h2 style={{ fontFamily: "'Lexend'", fontSize: "2.2rem", fontWeight: 700 }}>Манай хөтөлбөрүүд</h2>
          <p style={{ color: T.onSurfaceVariant, marginTop: "0.5rem", maxWidth: 500, margin: "0.5rem auto 0" }}>
            Хүүхдийн нас, сонирход нийцсэн хамгийн шилдэг сургалтууддыг бид санал болгож байна.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {[
            { icon: "🌐", title: "Англи хэл", desc: "Хэлжит тоглоом, дуу хуур, хэрэглээн ярианаар дамжуулан Англи хэлийг тоглоом хэл шинэ сурах боломж.", color: "rgba(0,81,209,0.08)", accent: T.primary },
            { icon: "🎨", title: "Урлаг", desc: "Зураг зурах, гар урлал бүтээлч сэтгэлгээг хөгжүүлэх хүүхэдүүд хүсэлийг тэвэрлийн тайлыг.", color: "rgba(247,164,139,0.12)", accent: T.tertiary },
            { icon: "🤖", title: "Технологи", desc: "Код бичих үндэс, робот угсралт, дижитал ертөнцтэй танилцах анхан шатны мэдлэг олгоно.", color: "rgba(78,205,196,0.12)", accent: T.mint },
          ].map((p, i) => (
            <Card key={i} style={{ position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: p.color }} />
              <div style={{
                width: 56, height: 56, borderRadius: T.radius.lg, background: p.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", marginBottom: "1rem", position: "relative",
              }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Lexend'", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>{p.title}</h3>
              <p style={{ fontSize: "0.875rem", color: T.onSurfaceVariant, lineHeight: 1.7, marginBottom: "1rem" }}>{p.desc}</p>
              <span style={{ color: p.accent, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>
                Дэлгэрэнгүй →
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section style={{ padding: "4rem 2rem", background: T.surfaceContainerLow }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <PlaceholderImg h={200} label="📚" gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" style={{ borderRadius: T.radius.lg }} />
            <PlaceholderImg h={200} label="🎯" gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" style={{ borderRadius: T.radius.lg, marginTop: 24 }} />
            <PlaceholderImg h={200} label="🏆" gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" style={{ borderRadius: T.radius.lg, marginTop: -24 }} />
            <div style={{
              background: T.primary, borderRadius: T.radius.lg, height: 200,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff",
            }}>
              <span style={{ fontFamily: "'Lexend'", fontSize: "2.5rem", fontWeight: 800 }}>500+</span>
              <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>ажилласан суралцагч</span>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Lexend'", fontSize: "2.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Яагаад бидний г <span style={{ color: T.primary, fontStyle: "italic" }}>сонгох</span> вэ?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
              {[
                { icon: "🎮", title: "Хөгжилтэй сургалт", desc: "Хичээл бүр нь сонирхолтой тоглоом, интерактив дасгалуудаар бялхаж тул хүүхэд дархнитуй." },
                { icon: "👩‍🏫", title: "Мэргэжлийн багш нар", desc: "Хүүхэдтэй ажиллах туршлагатай, олон улсын зэрэгтэй багш нар хичээл заана." },
                { icon: "🛡️", title: "Аюулгүй орчин", desc: "Хүүхдийн эрүүл мэнд, аюулгүй байдлыг бурэн хангасан орчин үрэйг тохилогтой мяна таними." },
              ].map((it, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: T.radius.lg,
                    background: `rgba(0,81,209,0.08)`, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.25rem", flexShrink: 0,
                  }}>{it.icon}</div>
                  <div>
                    <h4 style={{ fontFamily: "'Lexend'", fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem" }}>{it.title}</h4>
                    <p style={{ fontSize: "0.85rem", color: T.onSurfaceVariant, lineHeight: 1.6 }}>{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "5rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Lexend'", fontSize: "2rem", fontWeight: 700, textAlign: "center", marginBottom: "2.5rem" }}>
          Эцэг эхчүүдийн сэтгэгдэл
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {[
            { name: "А. Наран", role: "Эцэг эх", text: "Манай охин Англи хэлний хичээлдээ аваалгаа нихээр бусгтай болсон. Багш нарын их лааж арга барий яг нихээр авхнитай.", stars: 5 },
            { name: "Б. Тэмүүлэн", role: "Эцэг эх", text: "Урбэн усалагтын манай сэтгэл бодол чадварыг маш сайн хөгжүулж байна. Сэтгэл ханамж 100%.", stars: 5 },
            { name: "Г. Солонго", role: "Эцэг эх", text: "Ухаанлаг хөтөлбөрөө ёснохо хойш хүү манай маш их өөртөс оплодлаж болсон. Баярлалаа LingoLab!", stars: 5 },
          ].map((t, i) => (
            <Card key={i}>
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.75rem" }}>
                {Array(t.stars).fill(0).map((_, j) => <span key={j} style={{ color: T.secondary, fontSize: "1.1rem" }}>★</span>)}
              </div>
              <p style={{ fontSize: "0.875rem", color: T.onSurfaceVariant, lineHeight: 1.7, fontStyle: "italic", marginBottom: "1.25rem" }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontFamily: "'Lexend'", fontWeight: 600, fontSize: "0.875rem" }}>{t.name}</p>
                  <p style={{ fontSize: "0.75rem", color: T.onSurfaceVariant }}>{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 2rem" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto", borderRadius: T.radius.xl,
          background: T.gradientCTA, padding: "3.5rem", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ position: "absolute", bottom: -80, left: -40, width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <h2 style={{ fontFamily: "'Lexend'", fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "0.75rem", position: "relative" }}>
            Хүүхдийнхээ ирээдүйд<br />өнөөдөр хөрөнгө оруулаарай
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "2rem", position: "relative" }}>
            Бүртгэл хэзээгаартай тул та яараарай. Бид таны хүүхдийг хүлээж байна.
          </p>
          <Btn onClick={() => onNav("contact")} style={{ background: "#fff", color: T.primary }}>
            Одоо бүртгүүлээрэй
          </Btn>
        </div>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE: NEWS / МЭДЭЭ
   ════════════════════════════════════════════════════════════════ */
function NewsPage() {
  const articles = [
    { tag: "АМЖИЛТ", date: "2024.09.20", title: "Манай сурагчид IELTS-ийн шалгалтанд 8.0 дундаж оноо авлаа", desc: "Энэ жилийн төгсгөнд маань олон улсын хэлний бэлтгэдээс маш амжилттай оролцож...", featured: true, gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
    { tag: "ҮЙЛ АЖИЛЛАГАА", date: "2024.05.15", title: "Зуны сургалтын бүртгэл эхэллээ", desc: "LingoLab-ийн зуныгэрийн хуулсан хөтөлбөрт хүүхдүүд зарцуудаас урих байна.", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" },
    { tag: "ШИНЭ ТЕХНОЛОГИ", date: "2024.05.12", title: "Хиймэл оюун ухаанд суурилсан шинэ апп нээлтээ хийлээ", desc: "Сурагчдын маань бие даан суралцах явцыг дэмжих аппликешн...", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { tag: "БАГШ НАРЫН БУЙАН", date: "2024.05.08", title: "Гадаад багш нарын зөвлөгөө: Сонсох чадварыг хэрхэн сайжруулах вэ?", desc: "Манай академийн зочин багш Маркэлэн сурч буй залуус зорилуулан...", gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)" },
    { tag: "АМЖИЛТ", date: "2024.05.01", title: "Тэтгэлэгт хамрагдсан сурагчдын баярын мөч", desc: "Энэ хавар Европын нэр хүндтэй их дээд сургуулиудад тэтгэлэг...", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { tag: "ЗӨВЛӨГӨӨ", date: "2024.04.28", title: "Бага насны хүүхдэд хэл заах нууц", desc: "Тоглоомын аргаар дамжуулан хэл нь хэлний хамгийн үр дүнтэй...", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: "8rem 2rem 3rem", maxWidth: 1200, margin: "0 auto",
      }}>
        <div className="fade-in">
          <Chip color={T.primary} textColor="#fff">ШИНЭ МЭДЭЭ</Chip>
          <h1 style={{ fontFamily: "'Lexend'", fontSize: "3rem", fontWeight: 800, lineHeight: 1.1, margin: "1rem 0", letterSpacing: "-0.02em" }}>
            Мэдлэгээр<br />дамжуулан<br />
            <span style={{ color: T.primary, fontStyle: "italic" }}>ертөнцийг</span> нээх
          </h1>
          <p style={{ color: T.onSurfaceVariant, maxWidth: 520, lineHeight: 1.7 }}>
            Академийн хамгийн сүүлийн үеийн сонин хачин, сурагчдын маань амжилт болон хэл сурах үр дүнтэй зөвлөгөнүүддийг эндээс аваарай.
          </p>
        </div>
      </section>

      {/* Featured + Sidebar */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 2rem", display: "grid", gridTemplateColumns: "3fr 2fr", gap: "2rem" }}>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <PlaceholderImg w={800} h={300} label="📰 Featured Article" gradient={articles[0].gradient} style={{ borderRadius: 0, maxWidth: "100%" }} />
          <div style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem" }}>
              <Chip>{articles[0].tag}</Chip>
              <span style={{ fontSize: "0.8rem", color: T.onSurfaceVariant }}>{articles[0].date}</span>
            </div>
            <h3 style={{ fontFamily: "'Lexend'", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.3 }}>{articles[0].title}</h3>
            <p style={{ fontSize: "0.875rem", color: T.onSurfaceVariant, lineHeight: 1.7, marginBottom: "1rem" }}>{articles[0].desc}</p>
            <span style={{ color: T.primary, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Дэлгэрэнгүй уншиx →</span>
          </div>
        </Card>

        <Card style={{ background: T.primary, color: "#fff" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💡</div>
          <h3 style={{ fontFamily: "'Lexend'", fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.3 }}>
            Долоо хоногийн зөвлөгөө: Үг цээжлэх хамгийн үр дүнтэй 3 арга
          </h3>
          <p style={{ fontSize: "0.875rem", opacity: 0.85, lineHeight: 1.7, marginBottom: "2rem" }}>
            Хэл сурах нисдэг хамгийн хэцүү саналдаг шинэ үгийнг тогтоох аргуудыг мэргэжлийн багш нар маань зөвлөн байна.
          </p>
          <Btn style={{ background: "#fff", color: T.primary }}>Бүгдийг үзэх</Btn>
        </Card>
      </section>

      <div style={{ padding: "2rem 0" }}><Squiggle w={200} /></div>

      {/* Article Grid */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {articles.slice(1, 4).map((a, i) => (
            <Card key={i} style={{ padding: 0, overflow: "hidden" }}>
              <PlaceholderImg w={400} h={200} label="" gradient={a.gradient} style={{ borderRadius: 0, maxWidth: "100%" }} />
              <div style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                  <Chip color={T.surfaceContainerHigh} textColor={T.onSurface}>{a.tag}</Chip>
                  <span style={{ fontSize: "0.75rem", color: T.onSurfaceVariant }}>{a.date}</span>
                </div>
                <h4 style={{ fontFamily: "'Lexend'", fontSize: "1rem", fontWeight: 700, lineHeight: 1.4, marginBottom: "0.4rem" }}>{a.title}</h4>
                <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* More Articles */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
          {articles.slice(4).map((a, i) => (
            <Card key={i} style={{ padding: 0, overflow: "hidden" }}>
              <PlaceholderImg w={400} h={200} label="" gradient={a.gradient} style={{ borderRadius: 0, maxWidth: "100%" }} />
              <div style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                  <Chip color={T.surfaceContainerHigh} textColor={T.onSurface}>{a.tag}</Chip>
                  <span style={{ fontSize: "0.75rem", color: T.onSurfaceVariant }}>{a.date}</span>
                </div>
                <h4 style={{ fontFamily: "'Lexend'", fontSize: "1rem", fontWeight: 700, lineHeight: 1.4, marginBottom: "0.4rem" }}>{a.title}</h4>
                <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            </Card>
          ))}
          {/* Newsletter card */}
          <Card style={{ background: "linear-gradient(135deg, rgba(253,211,77,0.2), rgba(247,164,139,0.15))", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h4 style={{ fontFamily: "'Lexend'", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Мэдээлэл цаг алдалгүй авах</h4>
            <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, lineHeight: 1.6, marginBottom: "1rem" }}>
              Та өөрийн и-мэйл хаягаа үлдээснээр долоо хоног бүрийн сонин мэдээ, зөвлөгөө и-мэйлээрээ хүлээн авах боломж.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input placeholder="И-мэйл хаяг" style={{
                flex: 1, padding: "0.75rem 1rem", borderRadius: T.radius.xl,
                border: "none", background: T.surfaceContainerLowest,
                fontSize: "0.85rem", fontFamily: "'Plus Jakarta Sans'",
                outline: "none",
              }} />
              <Btn style={{ padding: "0.75rem 1.25rem" }}>Бүртгүүлэх</Btn>
            </div>
          </Card>
        </div>
      </section>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", padding: "2rem 0" }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{
            width: 40, height: 40, borderRadius: "50%",
            background: n === 1 ? T.primary : T.surfaceContainerLow,
            color: n === 1 ? "#fff" : T.onSurface,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Lexend'", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
          }}>{n}</div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE: EVENTS / ҮЙЛ АЖИЛЛАГАА (matches Image 1 layout)
   ════════════════════════════════════════════════════════════════ */
function EventsPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: "8rem 2rem 4rem",
        background: `linear-gradient(135deg, rgba(122,157,255,0.06) 0%, rgba(247,164,139,0.06) 100%)`,
        position: "relative",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div className="fade-in">
            <Chip color={T.secondary} textColor={T.onSecondaryContainer}>ҮЙЛ АЖИЛЛАГАА 2024</Chip>
            <h1 style={{ fontFamily: "'Lexend'", fontSize: "3rem", fontWeight: 800, lineHeight: 1.1, margin: "1rem 0", letterSpacing: "-0.02em" }}>
              Хөгжилтэй <span style={{ color: T.primary, fontStyle: "italic" }}>суралцах цаг!</span>
            </h1>
            <p style={{ color: T.onSurfaceVariant, lineHeight: 1.7, maxWidth: 460, marginBottom: "2rem" }}>
              Хүүхэд бүрийн дотор суут ухаантныг сэрүүн, бүтээлч сэтгэлгээ хөгжүүлэх сонирхолтой арга хэмсээ, сургалтууддыг зог дагрээ.
            </p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Btn>Хөтөлбөр зарах</Btn>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ display: "flex" }}>
                  {["#f7a48b", "#7a9dff", "#fdd34d"].map((c, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: c, border: `2px solid #fff`, marginLeft: i > 0 ? -8 : 0 }} />
                  ))}
                </div>
                <span style={{ fontSize: "0.8rem", color: T.onSurfaceVariant }}><strong>500+</strong> Суралцагчcaан</span>
              </div>
            </div>
          </div>
          <div className="fade-in-d2">
            <PlaceholderImg w={500} h={360} label="🎮 3D Hero Image"
              gradient="linear-gradient(135deg, #1a1a2e, #16213e)"
              style={{ borderRadius: T.radius.xl }} />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section style={{ padding: "4rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Lexend'", fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>Бүтээлч эвентүүд</h2>
        <p style={{ color: T.onSurfaceVariant, marginBottom: "2.5rem" }}>Удахгүй болох мастер классууд болон тусламжийн хөтөлбөрүүд</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Event 1 - big */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", gridColumn: "span 2" }}>
            <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: T.onSurfaceVariant, textTransform: "uppercase", letterSpacing: "0.1em" }}>МАСТЕР КЛАСС</span>
                <h3 style={{ fontFamily: "'Lexend'", fontSize: "1.35rem", fontWeight: 700, margin: "0.5rem 0", lineHeight: 1.3 }}>
                  🎨 Уран зураг ба Англи хэл
                </h3>
                <p style={{ fontSize: "0.85rem", color: T.onSurfaceVariant, lineHeight: 1.6, marginBottom: "1rem" }}>
                  Зураг зурахыг нипо эх сурч, бүтээлтгүү онлийдоо хэрэлтийн мастер класс. Бүх хэрэглээгтэр хангэна.
                </p>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                  <Chip color={T.surfaceContainerLow} textColor={T.onSurface}>📅 5-р сарын 15</Chip>
                  <Chip color={T.surfaceContainerLow} textColor={T.onSurface}>🕐 14:00 - 17:00</Chip>
                </div>
              </div>
              <Btn style={{ alignSelf: "flex-start", padding: "0.7rem 1.5rem", fontSize: "0.85rem" }}>Одоо заавхаб</Btn>
            </Card>
            <PlaceholderImg h={320} label="🖌️ Уран зураг" gradient="linear-gradient(135deg, #667eea, #764ba2)" style={{ borderRadius: T.radius.lg }} />
          </div>

          {/* Event 2 */}
          <Card style={{ background: T.surfaceContainerLow }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: 48, height: 48, borderRadius: T.radius.md, background: "rgba(253,211,77,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>🏕️</div>
              <div>
                <h4 style={{ fontFamily: "'Lexend'", fontWeight: 700, marginBottom: "0.25rem" }}>Зуны зуслан 2024</h4>
                <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, lineHeight: 1.6 }}>Хүсэн хэрэнбайыйн сайнд, ентн хэтэлтэ ногоон, агаал 7 хонэг.</p>
                <span style={{ color: T.primary, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", marginTop: "0.5rem", display: "inline-block" }}>Дэлгэрэнгүй →</span>
              </div>
            </div>
          </Card>

          {/* Event 3 */}
          <Card style={{ background: T.primary, color: "#fff" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: 48, height: 48, borderRadius: T.radius.md, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>🎤</div>
              <div>
                <h4 style={{ fontFamily: "'Lexend'", fontWeight: 700, marginBottom: "0.25rem" }}>Илтгэх урлагийн удэш</h4>
                <p style={{ fontSize: "0.8rem", opacity: 0.85, lineHeight: 1.6 }}>Өөрний интэл ёёр дөдөр ашит ингийдин амаа нрдас сургэ соншклож суралт.</p>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem", alignItems: "center" }}>
                  <Btn style={{ background: "#fff", color: T.primary, padding: "0.6rem 1.25rem", fontSize: "0.8rem" }}>Бүртгүүлэх</Btn>
                  <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>Үлдсэнс: 5 суудал</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Event 4 */}
          <Card>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: 48, height: 48, borderRadius: T.radius.md, background: "rgba(78,205,196,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>🤖</div>
              <div>
                <h4 style={{ fontFamily: "'Lexend'", fontWeight: 700, marginBottom: "0.25rem" }}>Робот техник</h4>
                <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, lineHeight: 1.6 }}>Анган шатны робот угсралт ба программчлалын дөрвөлжин хавдрийн суралт.</p>
                <span style={{ color: T.primary, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", marginTop: "0.5rem", display: "inline-block" }}>Дэлгэрэнгүй →</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Programs Section */}
      <section style={{ padding: "4rem 2rem", background: T.surfaceContainerLow }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Lexend'", fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Хичээлийн хөтөлбөрүүд</h2>
          <p style={{ color: T.onSurfaceVariant, marginBottom: "3rem", maxWidth: 500, margin: "0.5rem auto 3rem" }}>
            Нас насны онцлог тодорсон, сонирхолтой арга барилаар мечээлэн үзэдсэн сурахтууд
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
            {[
              { name: "Little Explorers", age: "4-6 нас", price: "120к", desc: "Тоглоом, дуу хөзлам болох хэрийд аргаар англа хэлний ажитан бүтээлч оёрлатийг ажтан пинтан курс.", color: T.surfaceContainerLowest, features: ["Долоо хонэгт 2 удаа", "Жилыйн сулдіё (8-9 сурагч)"] },
              { name: "Junior Masters", age: "7-12 нас", price: "150к", desc: "Дүтлийн илэлтэг болон ирадан чадвардэр англа хэлэнд мачсурт, линөш суруулал сухатлакс хатыблор.", color: T.primary, features: ["Долоо хонэгт 3 удаа", "Кембрижийн хөтөлбөр"], highlight: true },
              { name: "Teen Leaders", age: "13-17 нас", price: "180к", desc: "Ахлах анген ирадан задлар, этэл хабтнн бөдөн IELTS шалгалтад бэлтгэх сүүрд хөтөлбөрүүд.", color: T.surfaceContainerLowest, features: ["Мэт хэрэнэнажлуд", "Тусгай бүтцэлтэлэц"] },
            ].map((p, i) => (
              <Card key={i} style={{
                background: p.highlight ? T.primary : T.surfaceContainerLowest,
                color: p.highlight ? "#fff" : T.onSurface,
                transform: p.highlight ? "scale(1.04)" : "none",
                position: "relative", overflow: "hidden",
                textAlign: "left",
              }}>
                {p.highlight && (
                  <div style={{
                    position: "absolute", top: 16, right: -32, background: T.secondary,
                    color: T.onSecondaryContainer, padding: "0.25rem 2.5rem",
                    transform: "rotate(45deg)", fontSize: "0.65rem", fontWeight: 700,
                    fontFamily: "'Lexend'",
                  }}>ХАМГИЙН ЭРЭЛТТЭЙ</div>
                )}
                <PlaceholderImg h={160} label=""
                  gradient={p.highlight ? "linear-gradient(135deg, #1a1a4e, #2d2d7e)" : "linear-gradient(135deg, #e8ecf1, #d0d7df)"}
                  style={{ borderRadius: T.radius.lg, marginBottom: "1.25rem", maxWidth: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <Chip color={p.highlight ? "rgba(255,255,255,0.2)" : T.surfaceContainerLow}
                    textColor={p.highlight ? "#fff" : T.onSurface}>{p.age}</Chip>
                  <span style={{ fontFamily: "'Lexend'", fontWeight: 800, fontSize: "1.4rem" }}>
                    {p.price}<span style={{ fontSize: "0.7rem", fontWeight: 500 }}>/сар</span>
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Lexend'", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>{p.name}</h3>
                <p style={{ fontSize: "0.8rem", opacity: p.highlight ? 0.85 : 1, color: p.highlight ? "#fff" : T.onSurfaceVariant, lineHeight: 1.6, marginBottom: "1rem" }}>{p.desc}</p>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <span style={{ color: p.highlight ? T.secondary : T.primary, fontSize: "0.7rem" }}>●</span>
                    <span style={{ fontSize: "0.8rem" }}>{f}</span>
                  </div>
                ))}
                <Btn onClick={() => {}} style={{
                  width: "100%", justifyContent: "center", marginTop: "1.25rem",
                  background: p.highlight ? "#fff" : T.surfaceContainerHigh,
                  color: p.highlight ? T.primary : T.onSurface,
                  fontSize: "0.85rem", padding: "0.75rem",
                }}>{p.highlight ? "Одоо бүртгүүлэх" : "Бүртгүүлэх"}</Btn>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "4rem 2rem" }}>
        <div style={{
          maxWidth: 700, margin: "0 auto", borderRadius: T.radius.xl,
          background: "linear-gradient(135deg, rgba(253,211,77,0.15), rgba(247,164,139,0.1))",
          padding: "3rem", textAlign: "center",
        }}>
          <h3 style={{ fontFamily: "'Lexend'", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Хамгдаа хөгжицгөөе!
          </h3>
          <p style={{ fontSize: "0.85rem", color: T.onSurfaceVariant, marginBottom: "1.5rem" }}>
            Шинээрга ханэсо болон хамтэзянэтийн мэдээлнийн цаг алдалгүй аваарай.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", maxWidth: 400, margin: "0 auto" }}>
            <input placeholder="Таны итоө хааг" style={{
              flex: 1, padding: "0.85rem 1.25rem", borderRadius: T.radius.xl,
              border: "none", background: T.surfaceContainerLowest,
              fontSize: "0.85rem", fontFamily: "'Plus Jakarta Sans'", outline: "none",
            }} />
            <Btn style={{ padding: "0.85rem 1.5rem" }}>Илгээх</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE: ABOUT / БИДНИЙ ТУХАЙ
   ════════════════════════════════════════════════════════════════ */
function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "8rem 2rem 4rem", textAlign: "center" }}>
        <Chip color={T.secondary} textColor={T.onSecondaryContainer}>ТАНИЛЦУУЛГА</Chip>
        <h1 style={{ fontFamily: "'Lexend'", fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.15, margin: "1rem auto", maxWidth: 700, letterSpacing: "-0.02em" }}>
          Бид ирээдүйн <span style={{ color: T.primary, fontStyle: "italic" }}>дэлхийн ирээдийг</span> бэлтгэж байна.
        </h1>
        <p style={{ color: T.onSurfaceVariant, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          LingoLab Academy бол хүүгэр яна хэлний Уг баак. Энэ бол хүүхэд бүрийн доторк бүтээлч чадварыг нээж, сурах хүсэл эрмэлзлийг нь бадраах "Өөрчин үяадий сурган" юм.
        </p>
      </section>

      {/* Story */}
      <section style={{ padding: "0 2rem 4rem", maxWidth: 1100, margin: "0 auto" }}>
        <Card style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", padding: "2.5rem", overflow: "hidden" }}>
          <div style={{ position: "relative" }}>
            <PlaceholderImg h={380} label="🏫 Founding Story" gradient="linear-gradient(135deg, #1a1a2e, #0d0d1a)" style={{ borderRadius: T.radius.lg }} />
            <div style={{
              position: "absolute", bottom: 24, right: -12,
              background: T.secondary, borderRadius: T.radius.lg,
              padding: "1rem 1.5rem", fontFamily: "'Lexend'", fontWeight: 800,
              fontSize: "1.5rem", color: T.onSecondaryContainer,
            }}>
              2018 <span style={{ fontSize: "0.7rem", fontWeight: 500, display: "block" }}>Анхлан нибалн</span>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Lexend'", fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>Бидний түүх</h2>
            <p style={{ fontSize: "0.9rem", color: T.onSurfaceVariant, lineHeight: 1.8, marginBottom: "1rem" }}>
              Манай академи 2018 онд ердөр гуравхан сурагчтайгаар жижигхэн өрөөнд анхнд ажлаа эхэлсэн түүхтэй. Бидний зорилго тодорхой байсан: Хүүхэд бүрт тохирэцон, үндаэ загвуй, сонирхолтой аргаар англа хэл заах.
            </p>
            <p style={{ fontSize: "0.9rem", color: T.onSurfaceVariant, lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Өнөөдөр бид 500 гаруй төгсөгчтэй, өөрсдийн гэсэн сургалтын арга барилыг боловсруулсан мэргэжлийн хамт олон болон өргөжсөн. Хэл сурах нь зөвхөн дүрэм шахагтаг биш, харин ертөнцийг нарыг шинэ цонх юая ядвал юм.
            </p>
            <span style={{ color: T.primary, fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>● Олон улсын хөтөлбөр</span>
          </div>
        </Card>
      </section>

      {/* Values */}
      <section style={{ padding: "4rem 2rem", background: T.surfaceContainerLow }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Lexend'", fontSize: "2rem", fontWeight: 700, marginBottom: "2.5rem" }}>Бидний үнэт зүйлс</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", gridAutoRows: "1fr" }}>
            {[
              { icon: "🎯", title: "Хүүхэд бүр давтагдашгүй", desc: "Сурагч бүрийн суурь арга барил, сонирхлыг хүндэтнатаг, хуль хүр руу чигласэн хатабарнйг санал болгодог.", bg: T.surfaceContainerLowest },
              { icon: "💡", title: "Бүтээлч сэтгэлгээ", desc: "Бид асуудлыг шийдэхэрнйн, шуурхэлогтой сэтгэн чадвэрт хэлний хинэлттай хосойтуудал.", bg: T.primary, color: "#fff" },
              { icon: "🎨", title: "Илэлтзэй хамт олон", desc: "", bg: T.surfaceContainerLowest },
              { icon: "🛡️", title: "Сэтгэл зүйн аюулгүй байдал", desc: "Хүүхэд алдан тэрлахаас аймтгүй, жайрыг этэлжэтиэсгэр аржин сүрах орчниг бид бүрдүүлсэн.", bg: T.surfaceContainerLowest },
              { icon: "📊", title: "", desc: "", bg: T.surfaceContainerLow, stat: "100%", statLabel: "СЭТГЭЛ ХАНАМЖ" },
            ].map((v, i) => (
              <Card key={i} style={{
                background: v.bg, color: v.color || T.onSurface,
                textAlign: "left",
                ...(i === 1 ? { gridRow: "span 2" } : {}),
              }}>
                {v.stat ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <span style={{ fontFamily: "'Lexend'", fontSize: "3rem", fontWeight: 800 }}>{v.stat}</span>
                    <span style={{ fontSize: "0.8rem", color: T.onSurfaceVariant, fontWeight: 600, letterSpacing: "0.1em" }}>{v.statLabel}</span>
                  </div>
                ) : (
                  <>
                    <span style={{ fontSize: "1.5rem", marginBottom: "0.75rem", display: "block" }}>{v.icon}</span>
                    <h4 style={{ fontFamily: "'Lexend'", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>{v.title}</h4>
                    {v.desc && <p style={{ fontSize: "0.8rem", opacity: v.color ? 0.85 : 1, color: v.color ? "#fff" : T.onSurfaceVariant, lineHeight: 1.6 }}>{v.desc}</p>}
                  </>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Lexend'", fontSize: "2rem", fontWeight: 700 }}>Манай баг хамт олон</h2>
            <p style={{ color: T.onSurfaceVariant, marginTop: "0.25rem" }}>Салбартаа олон жил ажиллсан туршлагатай, хүүхдэд хайртай шилдэг багш нар таны хүүхдийг хөтлөх болно.</p>
          </div>
          <Btn variant="secondary" style={{ fontSize: "0.8rem", padding: "0.7rem 1.25rem" }}>Бүх багш нар</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {[
            { name: "С. Анударь", role: "Англа хэлний заах арга тэбч" },
            { name: "Жеймс Уилсон", role: "Прахтик чадваар хариуцсан багш" },
            { name: "Б. Энхжин", role: "Хүүхдийн сэтгэл тыйч, багш" },
            { name: "Г. Тэмүүлэн", role: "Зөвэрэп" },
          ].map((t, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                width: "100%", aspectRatio: "1", borderRadius: T.radius.xl,
                background: `linear-gradient(135deg, ${["#2d2d2d", "#1a1a2e", "#2a2a3e", "#333"][i]}, ${["#4a4a4a", "#2d2d4e", "#3d3d5e", "#555"][i]})`,
                marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "3rem",
              }}>
                {["👨‍🏫", "👨‍💼", "👩‍🏫", "👨‍💻"][i]}
              </div>
              <h4 style={{ fontFamily: "'Lexend'", fontSize: "0.95rem", fontWeight: 700 }}>{t.name}</h4>
              <p style={{ fontSize: "0.8rem", color: T.onSurfaceVariant }}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 2rem 4rem" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto", borderRadius: T.radius.xl,
          background: T.gradientCTA, padding: "3.5rem", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <Squiggle color="rgba(255,255,255,0.2)" w={300} />
          <h2 style={{ fontFamily: "'Lexend'", fontSize: "1.8rem", fontWeight: 800, color: "#fff", margin: "1.5rem 0 0.75rem", position: "relative" }}>
            Бидэнтэй нээдж, хүүхдийнхээ<br />ирээдүйг өнөөдрөөс бүтээгээрэй.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "2rem", position: "relative" }}>
            Туршалтыг зачхад бүртгүүлэх
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", position: "relative" }}>
            <Btn style={{ background: "#fff", color: T.primary }}>Туршлатын зачхад бүртгүүлэх</Btn>
            <Btn style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>Хөтөлбөр үзэх</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE: CONTACT / ХОЛБОО БАРИХ
   ════════════════════════════════════════════════════════════════ */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: "8rem 2rem 3rem", textAlign: "center",
        background: `linear-gradient(135deg, rgba(253,211,77,0.06), rgba(247,164,139,0.06), rgba(122,157,255,0.04))`,
        position: "relative",
      }}>
        <div style={{ position: "absolute", top: 60, left: 40, width: 120, height: 120, borderRadius: "50%", background: "rgba(247,164,139,0.12)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: 80, right: 60, width: 100, height: 100, borderRadius: "50%", background: "rgba(122,157,255,0.1)", filter: "blur(40px)" }} />
        <Chip color={T.primary} textColor="#fff">БИДЭНТЭЙ НЭГДЭРЭЙ</Chip>
        <h1 style={{ fontFamily: "'Lexend'", fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.15, margin: "1rem 0", letterSpacing: "-0.02em" }}>
          Хамтдаа <span style={{ color: T.primary, fontStyle: "italic" }}>суралцаж,</span><br />хөгжицгөөе!
        </h1>
        <p style={{ color: T.onSurfaceVariant, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          Танд асуух зүйл байна уу? Манай баг хамт олон танд туслахад хүээрд бэлэн. Бидэнтэй холбогдох дараах сувгуудыг ашиглаарай.
        </p>
      </section>

      {/* Contact Grid */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "2rem" }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Card>
            <h3 style={{ fontFamily: "'Lexend'", fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              📞 Холбоо барих
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: T.radius.md, background: "rgba(0,81,209,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>📱</div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: T.onSurfaceVariant }}>Утас</p>
                  <p style={{ fontFamily: "'Lexend'", fontWeight: 600 }}>+976 8800-1234</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: T.radius.md, background: "rgba(0,81,209,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>✉️</div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: T.onSurfaceVariant }}>И-мэйл</p>
                  <p style={{ fontFamily: "'Lexend'", fontWeight: 600 }}>info@lingolab.mn</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 style={{ fontFamily: "'Lexend'", fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🔗 Олон нийтийн сүлжээ
            </h3>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["Фэйсбүүк", "Инстаграм", "Ютүб"].map(s => (
                <Chip key={s} color={T.surfaceContainerLow} textColor={T.onSurface}>{s}</Chip>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ fontFamily: "'Lexend'", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              📍 Байршил
            </h3>
            <p style={{ fontSize: "0.85rem", color: T.onSurfaceVariant, lineHeight: 1.7 }}>
              Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Чингисийн өргөн чөлөө, Аппл Тауэр, 12-р давхар
            </p>
          </Card>
        </div>

        {/* Right column - Form */}
        <Card style={{ padding: "2rem" }}>
          <h3 style={{ fontFamily: "'Lexend'", fontSize: "1.35rem", fontWeight: 700, marginBottom: "1.5rem" }}>Зурвас илгээх</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: T.onSurfaceVariant, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.35rem", display: "block" }}>ТАНЫ НЭР</label>
              <input placeholder="Нэрээ оруулна уу"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                style={{
                  width: "100%", padding: "0.85rem 1.25rem", borderRadius: T.radius.xl,
                  border: "none", background: T.surfaceContainerLow,
                  fontSize: "0.85rem", fontFamily: "'Plus Jakarta Sans'", outline: "none",
                  transition: "all 0.2s",
                }}
                onFocus={e => { e.target.style.boxShadow = `0 0 0 2px ${T.primaryContainer}40, inset 0 0 8px ${T.primaryContainer}15`; }}
                onBlur={e => { e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: T.onSurfaceVariant, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.35rem", display: "block" }}>И-МЭЙЛ ХАЯГ</label>
              <input placeholder="example@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={{
                  width: "100%", padding: "0.85rem 1.25rem", borderRadius: T.radius.xl,
                  border: "none", background: T.surfaceContainerLow,
                  fontSize: "0.85rem", fontFamily: "'Plus Jakarta Sans'", outline: "none",
                }}
                onFocus={e => { e.target.style.boxShadow = `0 0 0 2px ${T.primaryContainer}40, inset 0 0 8px ${T.primaryContainer}15`; }}
                onBlur={e => { e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: T.onSurfaceVariant, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.35rem", display: "block" }}>ГАРЧИГ</label>
            <input placeholder="Ямар сэдвээр холбогдох вэ?"
              value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
              style={{
                width: "100%", padding: "0.85rem 1.25rem", borderRadius: T.radius.xl,
                border: "none", background: T.surfaceContainerLow,
                fontSize: "0.85rem", fontFamily: "'Plus Jakarta Sans'", outline: "none",
              }}
              onFocus={e => { e.target.style.boxShadow = `0 0 0 2px ${T.primaryContainer}40, inset 0 0 8px ${T.primaryContainer}15`; }}
              onBlur={e => { e.target.style.boxShadow = "none"; }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: T.onSurfaceVariant, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.35rem", display: "block" }}>ЗУРВАС</label>
            <textarea placeholder="Бидэнд хэлэх зүйлээ энд бичнэ үү..."
              rows={5}
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              style={{
                width: "100%", padding: "0.85rem 1.25rem", borderRadius: T.radius.lg,
                border: "none", background: T.surfaceContainerLow,
                fontSize: "0.85rem", fontFamily: "'Plus Jakarta Sans'", outline: "none",
                resize: "vertical",
              }}
              onFocus={e => { e.target.style.boxShadow = `0 0 0 2px ${T.primaryContainer}40, inset 0 0 8px ${T.primaryContainer}15`; }}
              onBlur={e => { e.target.style.boxShadow = "none"; }}
            />
          </div>
          <Btn style={{ padding: "0.85rem 2.5rem" }}>Илгээх &nbsp;➤</Btn>
        </Card>
      </section>

      {/* Map */}
      <section style={{ maxWidth: 1100, margin: "2rem auto", padding: "0 2rem" }}>
        <div style={{
          borderRadius: T.radius.xl, overflow: "hidden", height: 350,
          background: "linear-gradient(135deg, #e8f0fe, #d4e4fc)",
          position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Fake map background */}
          <svg width="100%" height="100%" viewBox="0 0 800 350" style={{ position: "absolute", inset: 0 }}>
            <rect fill="#e8f0fe" width="800" height="350" />
            {/* Roads */}
            <line x1="0" y1="120" x2="800" y2="120" stroke="#d0ddf0" strokeWidth="12" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="#d0ddf0" strokeWidth="8" />
            <line x1="300" y1="0" x2="300" y2="350" stroke="#d0ddf0" strokeWidth="10" />
            <line x1="500" y1="0" x2="500" y2="350" stroke="#d0ddf0" strokeWidth="8" />
            <line x1="150" y1="0" x2="150" y2="350" stroke="#d0ddf0" strokeWidth="6" />
            <line x1="650" y1="0" x2="650" y2="350" stroke="#d0ddf0" strokeWidth="6" />
            {/* River */}
            <path d="M 0 280 Q 200 260 400 290 T 800 270" stroke="#93c5fd" strokeWidth="20" fill="none" opacity="0.5" />
            {/* Main road */}
            <line x1="0" y1="160" x2="800" y2="160" stroke="#fbbf24" strokeWidth="4" />
          </svg>
          {/* Pin */}
          <div style={{
            position: "relative", zIndex: 2,
            background: T.surfaceContainerLowest, borderRadius: T.radius.xl,
            padding: "1.25rem 1.75rem", textAlign: "center",
            boxShadow: T.shadow(0.15), border: `3px solid ${T.primary}`,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%", background: T.gradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "-36px auto 0.5rem", fontSize: "1.25rem",
            }}>🏫</div>
            <h4 style={{ fontFamily: "'Lexend'", fontWeight: 700, fontSize: "0.95rem" }}>LingoLab Academy</h4>
            <p style={{ fontSize: "0.75rem", color: T.onSurfaceVariant, marginBottom: "0.5rem" }}>Бид энд байна! Таныг хүлээж байна.</p>
            <span style={{ color: T.primary, fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }}>Маршрут харах ↗</span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   APP ROOT
   ════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const contentRef = useRef(null);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = {
    home: <HomePage onNav={navigate} />,
    news: <NewsPage />,
    events: <EventsPage />,
    about: <AboutPage />,
    contact: <ContactPage />,
  };

  return (
    <>
      <style>{baseStyles}</style>
      <Navbar current={page} onNav={navigate} />
      <main ref={contentRef} style={{ minHeight: "100vh" }}>
        {pages[page]}
      </main>
      <Footer onNav={navigate} />
    </>
  );
}
