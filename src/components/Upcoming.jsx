// src/components/Upcoming.jsx
import React, { useState } from "react";
import { content } from "../content";
import VideoModal from "./VideoModal.jsx";
import VideoTeaser from "./VideoTeaser.jsx";
import { PiStorefrontBold } from "react-icons/pi";
import { LuMegaphone, LuGlobe } from "react-icons/lu";

function Tag({ children }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full border border-slate-200 bg-white">
      {children}
    </span>
  );
}

function IconFor(name = "") {
  const s = (name || "").toLowerCase();
  if (s.includes("butchery")) return <PiStorefrontBold className="text-slate-600" />;
  if (s.includes("funeka")) return <LuMegaphone className="text-slate-600" />;
  if (s.includes("ntombi")) return <LuGlobe className="text-slate-600" />;
  return <LuGlobe className="text-slate-600" />;
}

export default function Upcoming() {
  const [showVideo, setShowVideo] = useState(false);
  const [video, setVideo] = useState({ mp4: "", webm: "", poster: "", title: "" });

  const projects = Array.isArray(content?.upcoming) ? content.upcoming : [];

  const openVideo = (v = {}, title = "") => {
    setVideo({
      mp4: v.mp4 || "",
      webm: v.webm || "",
      poster: v.poster || "",
      title: title || "",
    });
    setShowVideo(true);
  };

  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <div className="slash-divider" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Upcoming Projects</h2>

        {projects.length === 0 ? (
          <div className="text-sm text-slate-600">
            (Nothing to show yet — add items to <code>content.upcoming</code> in <code>src/content.js</code>.)
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {projects.map((u, i) => {
              const name = u?.name || "Untitled";
              const note = u?.note || "";
              const details = u?.details || "";
              const tags = Array.isArray(u?.tags) ? u.tags : [];
              const v = u?.video || {};
              const hasVideo = Boolean(v.mp4 || v.webm);

              return (
                <article
                  key={i}
                  className="group rounded-2xl overflow-hidden bg-white border shadow-soft transition
                             border-slate-200 hover:shadow-lg hover:-translate-y-[2px]"
                  style={{ boxShadow: "0 2px 20px rgba(72,170,183,0.10)" }}
                >
                  {/* Accent stripe */}
                  <div className="h-1" style={{ background: "#48aab7" }} />

                  {/* Media */}
                  <div className="relative">
                    {hasVideo ? (
                      <VideoTeaser
                        poster={v.poster || ""}
                        mp4={v.mp4 || ""}
                        webm={v.webm || ""}
                        onClick={() => openVideo(v, name)}
                      />
                    ) : (
                      <div className="h-40 bg-slate-100 grid place-items-center">
                        {IconFor(name)}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold">{name}</h3>
                      <div className="flex flex-wrap gap-1">
                        {tags.map((t, idx) => <Tag key={idx}>{t}</Tag>)}
                      </div>
                    </div>

                    {note && <div className="text-xs text-slate-500">{note}</div>}
                    {details && <p className="text-sm text-slate-700">{details}</p>}

                    {hasVideo && (
                      <div className="pt-1">
                        <button
                          onClick={() => openVideo(v, name)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white
                                     hover:bg-slate-50 text-slate-900"
                          aria-label={`Watch promo for ${name}`}
                        >
                          ▶ Watch with sound
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {showVideo && (
        <VideoModal
          title={video.title}
          poster={video.poster}
          mp4={video.mp4}
          webm={video.webm}
          onClose={() => setShowVideo(false)}
        />
      )}
    </section>
  );
}
