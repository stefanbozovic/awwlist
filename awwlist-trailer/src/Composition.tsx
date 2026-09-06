import React from "react";
import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const RED = "#f20b37";
const INK = "#15151a";
const FPS = 30;

type Scene = {
  start: number;
  end: number;
  eyebrow?: string;
  line1: string;
  line2?: string;
  big?: string;
  card?: string;
  kicker?: string;
};

const scenes: Scene[] = [
  { start: 0, end: 90, eyebrow: "AWWLIST PRESENTS", line1: "Get ready", line2: "for gifting season.", big: "GIFT" },
  { start: 90, end: 240, eyebrow: "IT'S COMING", line1: "Birthdays.", line2: "Holidays.", big: "✦" },
  { start: 240, end: 450, eyebrow: "A SIMPLE TRUTH", line1: "Great gift ideas", line2: "don't wait around.", big: "IDEAS" },
  { start: 450, end: 600, eyebrow: "A MOMENT", line1: "Mom loves", line2: "this book.", card: "THE NIGHT CIRCUS", kicker: "MOM" },
  { start: 600, end: 750, eyebrow: "ANOTHER ONE", line1: "Dad wants", line2: "that blue hat.", card: "COBALT WOOL CAP", kicker: "DAD" },
  { start: 750, end: 900, eyebrow: "KEEP IT", line1: "With AwwList,", line2: "save it now.", big: "+" },
  { start: 900, end: 1080, eyebrow: "MAKE IT YOURS", line1: "Photo. Link.", line2: "Note.", big: "SAVE" },
  { start: 1080, end: 1260, eyebrow: "LATER", line1: "When it’s time", line2: "to shop…", big: "NOW" },
  { start: 1260, end: 1440, eyebrow: "READY", line1: "The perfect ideas", line2: "are ready too.", big: "✓" },
  { start: 1440, end: 1590, eyebrow: "SKIP THE PANIC", line1: "No guessing.", big: "NOPE" },
  { start: 1590, end: 1710, eyebrow: "MAKE IT COUNT", line1: "Thoughtful gifts.", line2: "Every time.", big: "♥" },
];

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const Wordmark: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, fontWeight: 800, letterSpacing: "-0.07em", fontSize: 31 }}>
    <span style={{ width: 22, height: 22, borderRadius: 8, background: RED, display: "inline-block" }} />
    AwwList
  </div>
);

const GiftCard: React.FC<{ label: string; name: string; local: number }> = ({ label, name, local }) => {
  const float = Math.sin(local / 12) * 7;
  return (
    <div style={{ position: "absolute", right: 82, bottom: 105, width: 500, height: 285, borderRadius: 34, overflow: "hidden", background: INK, color: "white", boxShadow: "0 35px 70px rgba(0,0,0,.18)", rotate: `${interpolate(local, [0, 12], [8, 0], { extrapolateRight: "clamp", easing: ease })}deg`, translate: `0 ${float}px` }}>
      <div style={{ height: "100%", padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(125deg, #17171d 0%, #17171d 57%, #f20b37 57%, #f20b37 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: ".16em", fontWeight: 700 }}><span>{label}</span><span>✦</span></div>
        <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.02, maxWidth: 290 }}>{name}</div>
        <div style={{ fontSize: 18, opacity: .7 }}>Saved on AwwList</div>
      </div>
    </div>
  );
};

const SceneLayer: React.FC<{ scene: Scene; sceneIndex: number }> = ({ scene, sceneIndex }) => {
  const frame = useCurrentFrame();
  const local = frame - scene.start;
  const duration = scene.end - scene.start;
  const intro = interpolate(local, [0, 13], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const outro = interpolate(local, [duration - 10, duration], [1, 0], { extrapolateLeft: "clamp", easing: Easing.bezier(.7, 0, .84, 0) });
  const opacity = Math.min(intro, outro);
  const sweep = interpolate(local, [0, duration], [-180, 1520], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity, overflow: "hidden", background: "#fff", color: INK, fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div style={{ position: "absolute", width: 330, height: 330, borderRadius: "50%", background: RED, right: -72, top: -72, scale: interpolate(local, [0, 22], [0.5, 1], { extrapolateRight: "clamp", easing: ease, output: "perceptual-scale" }) }} />
      <div style={{ position: "absolute", left: sweep, top: 0, height: "100%", width: 46, background: RED, rotate: "25deg", opacity: .9 }} />
      <div style={{ position: "absolute", left: 74, top: 66, opacity: .92 }}><Wordmark /></div>
      <div style={{ position: "absolute", left: 76, top: 160, color: RED, fontSize: 20, letterSpacing: ".16em", fontWeight: 800 }}>{scene.eyebrow}</div>
      {scene.big && <div style={{ position: "absolute", right: scene.card ? 548 : 65, bottom: scene.card ? 90 : 70, color: sceneIndex % 2 ? INK : RED, fontSize: scene.big.length > 2 ? 175 : 255, fontWeight: 900, letterSpacing: "-0.11em", opacity: .06, lineHeight: .8, rotate: `${sceneIndex % 2 ? -5 : 4}deg` }}>{scene.big}</div>}
      <div style={{ position: "absolute", left: 70, top: 250, right: scene.card ? 585 : 80, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 94, fontWeight: 800, letterSpacing: "-0.07em", lineHeight: .97, translate: `0 ${interpolate(local, [0, 15], [42, 0], { extrapolateRight: "clamp", easing: ease })}px` }}>{scene.line1}</div>
        {scene.line2 && <div style={{ fontSize: 94, fontWeight: 800, letterSpacing: "-0.07em", lineHeight: .97, color: RED, translate: `0 ${interpolate(local, [4, 19], [42, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })}px` }}>{scene.line2}</div>}
      </div>
      {scene.card && <GiftCard label={scene.kicker ?? "IDEA"} name={scene.card} local={local} />}
      <div style={{ position: "absolute", left: 76, bottom: 60, fontSize: 19, fontWeight: 700, letterSpacing: ".08em", color: "#777" }}>{String(sceneIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - 1710;
  const pop = interpolate(local, [0, 20], [0.75, 1], { extrapolateRight: "clamp", easing: ease, output: "perceptual-scale" });
  return (
    <AbsoluteFill style={{ background: "#fff", color: INK, justifyContent: "center", alignItems: "center", fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 740, height: 740, background: RED, borderRadius: "50%", opacity: .07, scale: interpolate(local, [0, 90], [0, 2.4], { extrapolateRight: "clamp", easing: ease, output: "perceptual-scale" }) }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 35, scale: pop }}>
        <Img src={staticFile("awwlist-logo.png")} style={{ width: 235, height: 235, objectFit: "contain" }} />
        <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: "-0.09em" }}>AwwList</div>
        <div style={{ color: RED, fontSize: 28, fontWeight: 800, letterSpacing: ".11em" }}>GIFTS THEY’LL LOVE.</div>
      </div>
    </AbsoluteFill>
  );
};

export const AwwListTrailer: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {scenes.map((scene, index) => frame >= scene.start && frame < scene.end ? <SceneLayer key={scene.start} scene={scene} sceneIndex={index} /> : null)}
      {frame >= 1710 ? <EndCard /> : null}
    </AbsoluteFill>
  );
};

export const MyComposition: React.FC = () => (
  <Composition id="AwwListGiftingSeason" component={AwwListTrailer} durationInFrames={60 * FPS} fps={FPS} width={1920} height={1080} />
);
