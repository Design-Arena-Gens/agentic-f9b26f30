"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const councilAgenda = [
  {
    title: "Urgent Naval Briefing",
    detail:
      "The Li Forces have mobilised a triad of war barges near the estuary. Our own fleets are thin after the autumn campaign and need reinforcements before the next tide."
  },
  {
    title: "Logistical Demands",
    detail:
      "Oak planks, river-ready tar, and replacement rigging must be expedited from the northern yards. Quartermasters report three days delay unless escorts are assigned."
  },
  {
    title: "Strategic Stakes",
    detail:
      "Control of the inlet keeps the mountain passes supplied. Should it fall, the capital starves within a fortnight and the Li Forces will flank the Ironwall garrison."
  }
];

const sceneLayers = [
  {
    name: "Vaulted Arches",
    description:
      "Ancient ribbed vaults carved from basalt stone, their crests washed in dusk-blue moonlight.",
    glow: "rgba(92, 121, 204, 0.55)"
  },
  {
    name: "War Table",
    description:
      "A weathered oak table with inset brass lattices and a relief map of the coastline set under smoky glass.",
    glow: "rgba(239, 127, 69, 0.65)"
  },
  {
    name: "Candle Chorus",
    description:
      "Clusters of tallow candles in iron sconces stretch down the hall, breathing ember light across polished armour.",
    glow: "rgba(217, 164, 65, 0.45)"
  },
  {
    name: "Upper Gallery",
    description:
      "Citizens and scribes crowd the gallery. Silk pennants, damp from the mist, hang like muted standards behind them.",
    glow: "rgba(132, 84, 201, 0.35)"
  }
];

const knights = [
  {
    name: "Sir Aldric of the Tides",
    role: "Lord Admiral",
    insight: "Advocates for reinforcing the southern flotilla before the first ice."
  },
  {
    name: "Dame Cerys Emberfall",
    role: "Master-at-Arms",
    insight: "Warns that the Li Forces favour incendiary sails; demands copper sheathing."
  },
  {
    name: "Sir Gavran Thornshield",
    role: "Siege Marshal",
    insight: "Offers ground ballistae for harbour defense if the council cedes engineers."
  },
  {
    name: "Brother Lyr Valen",
    role: "Chronicler",
    insight: "Records every oath; posits the omen of a blood moon over the estuary."
  }
];

function useAmbientTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 18, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 18, mass: 0.4 });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (event.clientX / innerWidth - 0.5) * 20;
      const offsetY = (event.clientY / innerHeight - 0.5) * 20;
      x.set(offsetX);
      y.set(-offsetY);
    };

    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [x, y]);

  return { smoothX, smoothY };
}

export default function Page() {
  const { smoothX, smoothY } = useAmbientTilt();

  return (
    <main>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="hero"
      >
        <div className="hero__badge">Captured on a 55mm lens • Ultra Fidelity 4K</div>
        <h1>
          Midnight Council of Steel:
          <span> Reinforcements for the Northern Sound</span>
        </h1>
        <p>
          Inside a grand medieval hall alive with banners and stone reliefs, the realm&apos;s most
          venerated knights gather by candlelight. Each breath fogs in the winter air as strategies
          clash over the urgent call to fortify the naval bulwark against the encroaching Li Forces.
        </p>
      </motion.section>

      <section className="visual-stage">
        <div className="visual-stage__grid">
          <motion.div
            className="visual-stage__viewport"
            style={{
              rotateX: smoothY,
              rotateY: smoothX
            }}
          >
            <div className="visual-stage__viewport__inner">
              <div className="layer layer--arches">
                <div className="layer__beam layer__beam--left" />
                <div className="layer__beam layer__beam--right" />
                <div className="layer__light layer__light--moon" />
              </div>
              <div className="layer layer--gallery">
                <div className="spectators">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div className="spectator" key={`spectator-${index}`}>
                      <span />
                    </div>
                  ))}
                </div>
                <div className="gallery__banner gallery__banner--1" />
                <div className="gallery__banner gallery__banner--2" />
              </div>
              <div className="layer layer--table">
                <div className="table__surface">
                  <div className="table__inlay table__inlay--naval" />
                  <div className="table__glow" />
                </div>
                <div className="candle-strip">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div className="candle" key={`candle-${index}`}>
                      <span />
                    </div>
                  ))}
                </div>
              </div>
              <div className="layer layer--knights">
                {knights.map((knight, index) => (
                  <motion.div
                    key={knight.name}
                    className="knight"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.08, duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <div className="knight__silhouette" />
                    <div className="knight__aura" />
                  </motion.div>
                ))}
                <motion.div
                  className="knight knight--orator"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="knight__silhouette" />
                  <div className="knight__aura" />
                  <div className="orator__gesture" />
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="visual-stage__caption"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h2>The Hall Breathes with Anticipation</h2>
            <p>
              The camera glides along the oak table, catching every rivet in the ornate armour and
              each ripple in the draped banners. Candlelight dances against the marble floors,
              pulling the viewer deeper into a night weighed with consequence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="stack stack--layers">
        <h2>Layered Depth & Textures</h2>
        <div className="card-grid">
          {sceneLayers.map((layer, index) => (
            <motion.article
              key={layer.name}
              className="card card--layer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true }}
              style={
                {
                  "--card-glow": layer.glow
                } as React.CSSProperties
              }
            >
              <h3>{layer.name}</h3>
              <p>{layer.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="stack stack--agenda">
        <div className="stack__intro">
          <h2>Orator&apos;s Address</h2>
          <p>
            Sir Aldric stands, gauntlets glinting in the amber light, urging the council to fortify
            the naval bulwarks before dawn. His voice cuts through the murmurs, met by fervent
            debate and the restless murmuration of the gallery above.
          </p>
        </div>
        <div className="agenda">
          {councilAgenda.map((item, index) => (
            <motion.div
              key={item.title}
              className="agenda__item"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true, amount: 0.6 }}
            >
              <span className="agenda__index">{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="stack stack--knights">
        <h2>Profiles in Steel</h2>
        <div className="knight-grid">
          {knights.map((knight, index) => (
            <motion.article
              key={knight.name}
              className="card card--knight"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.09, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true }}
            >
              <header>
                <h3>{knight.name}</h3>
                <p>{knight.role}</p>
              </header>
              <p>{knight.insight}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div>
          <h2>Camera Journey</h2>
          <p>
            The shot begins tight on the orator&apos;s gauntlet, then eases into a sweeping pan that
            reveals each knight in sequence before rising to the hushed spectators. Every frame
            clings to the tactile detail of stone, steel, and whispered resolve.
          </p>
        </div>
        <div className="footer__meta">
          <div>
            <span className="footer__label">Optics</span>
            <p>Prime 55mm • ƒ/1.4 • ISO 200</p>
          </div>
          <div>
            <span className="footer__label">Grade</span>
            <p>Azure moonlight balanced against ember highlights for cinematic contrast.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .hero {
          display: grid;
          gap: 1.5rem;
          padding: 2.5rem;
          border: 1px solid rgba(217, 164, 65, 0.2);
          background: linear-gradient(135deg, rgba(5, 12, 26, 0.85), rgba(15, 19, 33, 0.8));
          border-radius: 32px;
          box-shadow: 0 30px 80px rgba(7, 10, 18, 0.65);
        }

        .hero__badge {
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-steel);
        }

        .hero h1 {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 3vw, 3.4rem);
          line-height: 1.1;
        }

        .hero h1 span {
          display: block;
          color: var(--accent-gold);
        }

        .hero p {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 64ch;
          line-height: 1.6;
        }

        .visual-stage {
          margin-top: 4rem;
        }

        .visual-stage__grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          align-items: center;
        }

        .visual-stage__viewport {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: 28px;
          border: 1px solid rgba(217, 164, 65, 0.2);
          background: radial-gradient(circle at 50% 0%, rgba(150, 170, 212, 0.12), transparent 65%),
            radial-gradient(circle at 50% 80%, rgba(239, 127, 69, 0.18), transparent 55%),
            rgba(8, 12, 20, 0.9);
          overflow: hidden;
          box-shadow: 0 35px 80px rgba(0, 4, 12, 0.75);
          transform-style: preserve-3d;
        }

        .visual-stage__viewport__inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform: perspective(1400px);
          overflow: hidden;
        }

        .layer {
          position: absolute;
          inset: 0;
        }

        .layer--arches {
          background: radial-gradient(circle at 20% 10%, rgba(70, 94, 158, 0.22), transparent 70%),
            radial-gradient(circle at 80% 10%, rgba(70, 94, 158, 0.18), transparent 70%);
        }

        .layer__beam {
          position: absolute;
          top: 0;
          width: 12%;
          height: 100%;
          background: linear-gradient(180deg, rgba(53, 77, 140, 0.8), transparent);
          filter: blur(10px);
        }

        .layer__beam--left {
          left: 12%;
          transform: skewY(-6deg);
        }

        .layer__beam--right {
          right: 12%;
          transform: skewY(6deg);
        }

        .layer__light--moon {
          position: absolute;
          width: 36%;
          height: 36%;
          left: 32%;
          top: 4%;
          background: radial-gradient(circle, rgba(156, 185, 255, 0.45), transparent 70%);
          filter: blur(12px);
        }

        .layer--gallery {
          display: grid;
          place-items: start;
        }

        .spectators {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 0.75rem;
          width: 70%;
          margin: 8% auto 0;
        }

        .spectator {
          position: relative;
          height: 48px;
          border-radius: 50% 50% 40% 40% / 60% 60% 40% 40%;
          background: linear-gradient(180deg, rgba(40, 47, 66, 0.9), rgba(12, 16, 24, 0.8));
          overflow: hidden;
        }

        .spectator span {
          position: absolute;
          inset: 4px;
          background: radial-gradient(circle at 50% 30%, rgba(211, 184, 150, 0.9), rgba(54, 40, 39, 0.4));
          border-radius: inherit;
        }

        .gallery__banner {
          position: absolute;
          top: 18%;
          width: 9%;
          height: 46%;
          background: linear-gradient(180deg, rgba(217, 164, 65, 0.8), rgba(112, 64, 10, 0.9));
          border-radius: 12px;
          filter: drop-shadow(0 24px 30px rgba(0, 0, 0, 0.45));
        }

        .gallery__banner--1 {
          left: 15%;
        }

        .gallery__banner--2 {
          right: 18%;
        }

        .layer--table {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: translateZ(30px);
        }

        .table__surface {
          width: 72%;
          height: 38%;
          border-radius: 18px;
          background: linear-gradient(145deg, rgba(80, 52, 31, 0.95), rgba(28, 14, 5, 0.85));
          border: 1px solid rgba(130, 89, 54, 0.65);
          position: relative;
          overflow: hidden;
        }

        .table__inlay {
          position: absolute;
          inset: 10%;
          border-radius: 12px;
          background: linear-gradient(120deg, rgba(19, 27, 40, 0.8), rgba(9, 12, 18, 0.95));
        }

        .table__inlay--naval::after {
          content: "";
          position: absolute;
          inset: 12%;
          border: 1px solid rgba(217, 164, 65, 0.3);
          border-radius: 10px;
          mask-image: radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.85) 0%, transparent 80%);
        }

        .table__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 120%, rgba(239, 127, 69, 0.45), transparent 70%);
          mix-blend-mode: screen;
        }

        .candle-strip {
          display: flex;
          gap: 0.9rem;
          margin-top: 1.5rem;
        }

        .candle {
          position: relative;
          width: 18px;
          height: 52px;
          background: linear-gradient(180deg, rgba(186, 144, 91, 0.9), rgba(92, 56, 32, 0.95));
          border-radius: 999px;
          border: 1px solid rgba(217, 164, 65, 0.35);
          overflow: hidden;
        }

        .candle span {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 28px;
          background: radial-gradient(circle, rgba(255, 197, 120, 1), rgba(239, 127, 69, 0.7));
          border-radius: 50%;
          filter: blur(1px);
          animation: candle-flicker 2s infinite ease-in-out alternate;
        }

        @keyframes candle-flicker {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 0.82;
          }
          100% {
            transform: translateX(-50%) scale(1.1);
            opacity: 1;
          }
        }

        .layer--knights {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 1.8rem;
          padding: 0 7%;
          transform: translateY(10%);
        }

        .knight {
          position: relative;
          width: clamp(60px, 7vw, 82px);
          height: clamp(140px, 18vw, 190px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .knight__silhouette {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(98, 110, 134, 0.92), rgba(21, 28, 42, 0.95));
          clip-path: polygon(50% 0%, 65% 8%, 80% 16%, 86% 28%, 88% 44%, 86% 68%, 72% 100%, 28% 100%, 14% 68%, 12% 44%, 14% 28%, 20% 16%, 35% 8%);
          filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.65));
        }

        .knight__aura {
          position: absolute;
          inset: -12%;
          background: radial-gradient(circle at 50% 100%, rgba(239, 127, 69, 0.4), transparent 60%);
          opacity: 0.7;
        }

        .knight--orator {
          transform: translateY(-8%);
        }

        .knight--orator .knight__aura {
          background: radial-gradient(circle at 50% 20%, rgba(217, 164, 65, 0.75), transparent 70%);
          mix-blend-mode: screen;
        }

        .orator__gesture {
          position: absolute;
          top: 32%;
          right: -16%;
          width: 56px;
          height: 20px;
          background: radial-gradient(circle, rgba(217, 164, 65, 0.65), transparent 70%);
          border-radius: 999px;
          filter: blur(6px);
          animation: gesture-pulse 3.8s ease-in-out infinite;
        }

        @keyframes gesture-pulse {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: translate3d(8px, -4px, 0) scale(1.1);
            opacity: 1;
          }
        }

        .visual-stage__caption h2 {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 2.4vw, 2.4rem);
          margin-bottom: 0.8rem;
        }

        .visual-stage__caption p {
          color: var(--text-muted);
          line-height: 1.7;
        }

        .stack {
          margin-top: 4.5rem;
        }

        .stack h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.9rem, 2.6vw, 2.3rem);
          margin-bottom: 1.5rem;
        }

        .card-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        }

        .card {
          padding: 1.8rem;
          border-radius: 22px;
          border: 1px solid rgba(217, 164, 65, 0.16);
          background: rgba(10, 14, 24, 0.85);
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 45px rgba(3, 6, 12, 0.6);
        }

        .card--layer {
          position: relative;
        }

        .card--layer::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(circle at 20% 20%, var(--card-glow), transparent 75%);
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        .card--layer h3 {
          font-family: var(--font-serif);
          color: var(--accent-gold);
          margin-bottom: 0.6rem;
        }

        .card--layer p {
          color: var(--text-muted);
          line-height: 1.6;
        }

        .stack--agenda {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          align-items: start;
        }

        .stack__intro p {
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 44ch;
        }

        .agenda {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .agenda__item {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.2rem;
          align-items: start;
          padding: 1.6rem;
          border-radius: 18px;
          border: 1px solid rgba(217, 164, 65, 0.16);
          background: linear-gradient(135deg, rgba(9, 14, 21, 0.9), rgba(16, 21, 32, 0.85));
        }

        .agenda__index {
          font-size: 1.8rem;
          font-family: var(--font-serif);
          color: var(--accent-gold);
          line-height: 1;
        }

        .agenda__item h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .agenda__item p {
          color: var(--text-muted);
          margin-top: 0.35rem;
          line-height: 1.6;
        }

        .knight-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

        .card--knight header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--accent-gold);
        }

        .card--knight header p {
          margin: 0.35rem 0 0;
          color: var(--accent-steel);
          font-size: 0.95rem;
          letter-spacing: 0.02em;
        }

        .card--knight > p {
          margin-top: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .footer {
          margin: 5rem 0 2rem;
          padding: 2.5rem;
          border-radius: 28px;
          border: 1px solid rgba(217, 164, 65, 0.16);
          background: linear-gradient(
            120deg,
            rgba(11, 16, 26, 0.85) 0%,
            rgba(18, 24, 38, 0.78) 50%,
            rgba(40, 24, 18, 0.3) 100%
          );
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }

        .footer__meta {
          display: grid;
          gap: 1.4rem;
        }

        .footer__label {
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.7rem;
          color: rgba(217, 164, 65, 0.65);
          margin-bottom: 0.4rem;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 1.8rem;
          }

          .visual-stage__viewport {
            border-radius: 20px;
          }

          .footer {
            padding: 1.8rem;
          }
        }
      `}</style>
    </main>
  );
}
