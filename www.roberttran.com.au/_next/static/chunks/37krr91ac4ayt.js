(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 67389, e => {
    "use strict";
    var a = e.i(53286),
        t = e.i(94189);
    let n = () => () => {};

    function r() {
        try {
            document.cookie = "rt_intro_seen=1; path=/; SameSite=Lax"
        } catch {}
    }

    function l(e, a, t) {
        if (e <= a[0]) return t[0];
        for (let n = 1; n < a.length; n++)
            if (e <= a[n]) {
                let r = (e - a[n - 1]) / (a[n] - a[n - 1]);
                return t[n - 1] + (t[n] - t[n - 1]) * r
            }
        return t[t.length - 1]
    }

    function i(e, a) {
        return Math.round(Math.min(104, Math.max(82, .12 * Math.min(e, a))))
    }
    let s = (0, t.memo)(function() {
        return (0, a.jsxs)(a.Fragment, {
            children: [
                ["The Morning Brief", "Notes from the Desk", "Field Report", "Late Edition", "On the Record"].map((e, t) => (0, a.jsxs)("div", {
                    className: "fm-col",
                    children: [(0, a.jsx)("div", {
                        className: "fm-col-h",
                        children: e
                    }), (0, a.jsx)("div", {
                        className: "fm-col-r"
                    }), Array.from({
                        length: 60
                    }).map((e, n) => {
                        let r = (7 * n + 5 * t) % 13;
                        return (0, a.jsx)("div", {
                            className: "fm-col-l " + (0 === r ? "x" : r % 4 == 0 ? "s" : "")
                        }, n)
                    })]
                }, t)), (0, a.jsxs)("div", {
                    className: "fm-masthead",
                    children: [(0, a.jsx)("div", {
                        className: "fm-masthead-k",
                        children: "Wanted"
                    }), (0, a.jsx)("div", {
                        className: "fm-masthead-t",
                        children: "Muhammed Anshif"
                    }), (0, a.jsx)("div", {
                        className: "fm-masthead-r"
                    })]
                })
            ]
        })
    });
    e.s(["Intro", 0, () => {
        let e = (0, t.useSyncExternalStore)(n, () => !0, () => !1),
            [c, o] = (0, t.useState)(!1),
            [m, d] = (0, t.useState)(!1),
            [p, h] = (0, t.useState)("hunt"),
            [x, u] = (0, t.useState)(.48),
            [f, g] = (0, t.useState)({
                x: 0,
                y: 0,
                r: -10
            }),
            A = (0, t.useSyncExternalStore)(n, () => window.matchMedia("(pointer: coarse)").matches, () => !1),
            v = (0, t.useRef)(0),
            b = (0, t.useRef)({
                x: 0,
                y: 0
            }),
            w = (0, t.useRef)({
                x: 0,
                y: 0
            }),
            j = (0, t.useRef)(0),
            y = (0, t.useRef)(0),
            k = (0, t.useCallback)(() => {
                r(), d(!0), setTimeout(() => {
                    o(!0), window.scrollTo(0, 0), window.dispatchEvent(new Event("rt-intro-done"))
                }, 460)
            }, []);
        if ((0, t.useEffect)(() => {
                if (!e) return;
                let a = e => {
                    "Escape" === e.key && k()
                };
                return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a)
            }, [e, k]), (0, t.useEffect)(() => {
                if (!e || "hunt" !== p) return;
                if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return void r();
                let a = window.innerWidth || 1200,
                    t = window.innerHeight || 800,
                    n = i(a, t);
                w.current = {
                    x: -(.3 * a),
                    y: -(.2 * t)
                }, b.current = { ...w.current
                }, j.current = performance.now();
                let l = performance.now(),
                    s = e => {
                        b.current = {
                            x: e.clientX - a / 2,
                            y: e.clientY - t / 2
                        }, j.current = performance.now()
                    };
                window.addEventListener("pointermove", s);
                let c = e => {
                    let a = b.current,
                        t = w.current;
                    if (e - j.current > 3e3 && (a.x += (0 - a.x) * .02, a.y += (0 - a.y) * .02), t.x += (a.x - t.x) * .12, t.y += (a.y - t.y) * .12, g({
                            x: t.x,
                            y: t.y,
                            r: -10
                        }), Math.hypot(t.x, t.y) < .6 * n && e - l > 800)
                        if (y.current) {
                            if (e - y.current > 250) return void h("locked")
                        } else y.current = e;
                    else y.current = 0;
                    v.current = requestAnimationFrame(c)
                };
                return v.current = requestAnimationFrame(c), () => {
                    cancelAnimationFrame(v.current), window.removeEventListener("pointermove", s)
                }
            }, [e, p]), (0, t.useEffect)(() => {
                if (!e || "locked" !== p) return;
                let a = { ...w.current
                    },
                    t = 0,
                    n = !1,
                    r = e => {
                        t || (t = e);
                        let l = 1 - Math.pow(1 - Math.min(1, (e - t) / 320), 3);
                        g({
                            x: a.x * (1 - l),
                            y: a.y * (1 - l),
                            r: -10 + 12 * l
                        });
                        let i = Math.min(1, (e - t - 320) / 3400);
                        if (i > 0 && u(.48 + .52 * i), i >= 1) {
                            n || (n = !0, setTimeout(k, 320));
                            return
                        }
                        v.current = requestAnimationFrame(r)
                    };
                return v.current = requestAnimationFrame(r), () => cancelAnimationFrame(v.current)
            }, [e, p, k]), c) return null;
        if (!e) return (0, a.jsxs)("div", {
            className: "fm-intro",
            children: [(0, a.jsx)("div", {
                className: "fm-zoom",
                children: (0, a.jsx)("div", {
                    className: "fm-scene fm-scene--base",
                    children: (0, a.jsx)(s, {})
                })
            }), (0, a.jsx)("div", {
                className: "fm-hint",
                children: "Take the glass — find the subject"
            }), (0, a.jsx)("button", {
                className: "fm-skip",
                type: "button",
                onClick: k,
                children: "Skip intro →"
            })]
        });
        let Z = window.innerWidth || 1200,
            E = window.innerHeight || 800,
            N = i(Z, E),
            M = f.x,
            H = f.y,
            V = f.r;
        if (x > .5 && x < .59) {
            let e = (x - .5) / .09,
                a = 1 - e;
            M += 8 * Math.sin(e * Math.PI * 11) * a, H += 5 * Math.cos(e * Math.PI * 9) * a, V += 5 * Math.sin(e * Math.PI * 13) * a
        }
        let F = Z / 2 + M,
            L = E / 2 + H,
            C = -.8999999999999999 * F,
            S = -.8999999999999999 * L,
            T = l(x, [.68, .74], [1, 0]),
            R = l(x, [.48, .56], [0, .3]),
            $ = +("hunt" === p),
            I = l(x, [.66, .74], [0, 1]),
            B = l(x, [.76, .785], [0, 1]),
            _ = l(x, [.76, .798, .83, .86], [2, .8, 1.1, 1]),
            q = l(x, [.76, .798], [-54, 0]),
            O = l(x, [.76, .86], [-14, -10]),
            U = Math.min(1, Math.max(0, (x - .94) / .06)),
            D = U < .5 ? 4 * U * U * U : 1 - Math.pow(-2 * U + 2, 3) / 2,
            P = l(x, [.94, .98, 1], [1, 1.035, 1.02]),
            z = l(x, [.93, .96, .99, 1], [0, 10, 3, 0]),
            G = z > .1 ? `blur(${z}px)` : "none",
            W = `circle(${N}px at ${F}px ${L}px)`;
        return (0, a.jsxs)("div", {
            className: "fm-intro" + (m ? " fm-intro--exit" : ""),
            children: [(0, a.jsx)("div", {
                "aria-hidden": "true",
                style: {
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    backdropFilter: G,
                    WebkitBackdropFilter: G
                }
            }), (0, a.jsxs)("div", {
                className: "fm-zoom",
                style: {
                    transform: `scale(${P})`,
                    opacity: 1 - D,
                    filter: `blur(${5*D}px)`,
                    transformOrigin: "50% 50%",
                    transition: "opacity .2s ease, filter .2s ease"
                },
                children: [(0, a.jsx)("div", {
                    className: "fm-scene fm-scene--base",
                    children: (0, a.jsx)(s, {})
                }), (0, a.jsx)("div", {
                    className: "fm-scene--mag-clip",
                    style: {
                        clipPath: W,
                        WebkitClipPath: W
                    },
                    children: (0, a.jsx)("div", {
                        className: "fm-scene fm-scene--mag",
                        style: {
                            transform: `translate(${C}px, ${S}px) scale(1.9)`,
                            transformOrigin: "0px 0px"
                        },
                        children: (0, a.jsx)(s, {})
                    })
                }), (0, a.jsx)("div", {
                    style: {
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: "240vw",
                        height: "240vh",
                        marginLeft: "-120vw",
                        marginTop: "-120vh",
                        pointerEvents: "none",
                        zIndex: 4,
                        transform: `translate(${M}px, ${H}px)`,
                        background: `radial-gradient(circle at 50% 50%, transparent ${N-4}px, rgba(22,20,15,.26) ${N+200}px, rgba(22,20,15,.42) 58%)`
                    }
                }), (0, a.jsx)("div", {
                    className: "fm-dim",
                    style: {
                        opacity: R
                    }
                }), (0, a.jsxs)("div", {
                    className: "fm-lens",
                    style: {
                        width: 2 * N,
                        height: 2 * N,
                        marginLeft: -N,
                        marginTop: -N,
                        transform: `translate(${M}px, ${H}px) rotate(${V}deg)`,
                        opacity: T,
                        transition: "opacity .2s ease"
                    },
                    children: [(0, a.jsx)("div", {
                        className: "fm-lens-handle"
                    }), (0, a.jsx)("div", {
                        className: "fm-lens-glass"
                    }), (0, a.jsx)("div", {
                        className: "fm-lens-rim"
                    })]
                }), (0, a.jsx)("div", {
                    className: "fm-grain"
                }), (0, a.jsx)("div", {
                    style: {
                        position: "absolute",
                        inset: 0,
                        zIndex: 8,
                        background: "#FBFAF5",
                        opacity: I,
                        pointerEvents: "none"
                    }
                }), (0, a.jsx)("div", {
                    className: "fm-stampwrap",
                    style: {
                        zIndex: 9
                    },
                    children: (0, a.jsx)("div", {
                        className: "fm-stamp",
                        style: {
                            opacity: B,
                            transform: `translateY(${q}px) scale(${_}) rotate(${O}deg)`,
                            transition: "opacity .1s ease-out"
                        },
                        children: "Identified"
                    })
                })]
            }), (0, a.jsx)("div", {
                className: "fm-hint",
                style: {
                    opacity: $,
                    transition: "opacity .3s ease"
                },
                children: A ? "Drag the glass — find the subject" : "Take the glass — find the subject"
            }), (0, a.jsx)("button", {
                className: "fm-skip",
                type: "button",
                onClick: k,
                children: "Skip intro →"
            })]
        })
    }])
}, 63206, e => {
    "use strict";
    var a = e.i(53286),
        t = e.i(94189);
    e.s(["DateLine", 0, ({
        text: e
    }) => {
        let [n, r] = (0, t.useState)(e.length), l = (0, t.useRef)(!1);
        return (0, t.useEffect)(() => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            let a = () => {
                if (l.current) return;
                l.current = !0;
                let a = 0,
                    t = n => {
                        a || (a = n);
                        let l = Math.min(1, (n - a) / 600);
                        r(Math.round(l * e.length)), l < 1 && requestAnimationFrame(t)
                    };
                requestAnimationFrame(t)
            };
            if (document.querySelector(".fm-intro")) return window.addEventListener("rt-intro-done", a, {
                once: !0
            }), () => window.removeEventListener("rt-intro-done", a);
            a()
        }, [e.length]), (0, a.jsxs)("span", {
            className: "relative whitespace-nowrap",
            children: [(0, a.jsx)("span", {
                className: "text-transparent",
                children: e
            }), (0, a.jsx)("span", {
                className: "absolute inset-0",
                "aria-hidden": "true",
                children: e.slice(0, n)
            })]
        })
    }])
}, 85662, e => {
    "use strict";
    var a = e.i(94189);
    let t = a.forwardRef((e, t) => {
        let {
            alt: n,
            color: r = "currentColor",
            size: l = "1em",
            weight: i = "regular",
            mirrored: s = !1,
            children: c,
            weights: o,
            ...m
        } = e;
        return a.createElement("svg", {
            ref: t,
            xmlns: "http://www.w3.org/2000/svg",
            width: l,
            height: l,
            fill: r,
            viewBox: "0 0 256 256",
            transform: s ? "scale(-1, 1)" : void 0,
            ...m
        }, !!n && a.createElement("title", null, n), c, o.get(i))
    });
    t.displayName = "SSRBase", e.s(["default", 0, t])
}, 19885, e => {
    "use strict";
    var a = e.i(53286);
    let t = {
            primary: "bg-ink text-paper hover:bg-transparent hover:text-ink",
            ink: "bg-ink text-paper hover:bg-paper hover:text-ink",
            ghost: "bg-transparent text-ink hover:bg-ink hover:text-paper"
        },
        n = {
            sm: "text-[11.5px] px-[15px] py-2",
            md: "text-[13px] px-[22px] py-3",
            lg: "text-[14px] px-7 py-[15px]"
        };
    e.s(["Button", 0, ({
        children: e,
        variant: r = "primary",
        size: l = "md",
        href: i,
        type: s = "button",
        disabled: c = !1,
        onClick: o
    }) => {
        let m = `inline-flex items-center gap-2.5 whitespace-nowrap border-2 border-ink font-gothic font-bold uppercase tracking-[0.1em] transition-colors duration-150 cursor-pointer ${t[r]} ${n[l]} ${c?"opacity-60 cursor-not-allowed":""}`;
        return i ? (0, a.jsx)("a", {
            className: m,
            href: i,
            onClick: o,
            children: e
        }) : (0, a.jsx)("button", {
            type: s,
            className: m,
            disabled: c,
            onClick: o,
            children: e
        })
    }])
}, 67888, 30724, 28151, e => {
    "use strict";
    var a = e.i(94189),
        t = e.i(85662);
    let n = new Map([
            ["bold", a.createElement(a.Fragment, null, a.createElement("path", {
                d: "M212.62,75.17A63.7,63.7,0,0,0,206.39,26,12,12,0,0,0,196,20a63.71,63.71,0,0,0-50,24H126A63.71,63.71,0,0,0,76,20a12,12,0,0,0-10.39,6,63.7,63.7,0,0,0-6.23,49.17A61.5,61.5,0,0,0,52,104v8a60.1,60.1,0,0,0,45.76,58.28A43.66,43.66,0,0,0,92,192v4H76a20,20,0,0,1-20-20,44.05,44.05,0,0,0-44-44,12,12,0,0,0,0,24,20,20,0,0,1,20,20,44.05,44.05,0,0,0,44,44H92v12a12,12,0,0,0,24,0V192a20,20,0,0,1,40,0v40a12,12,0,0,0,24,0V192a43.66,43.66,0,0,0-5.76-21.72A60.1,60.1,0,0,0,220,112v-8A61.5,61.5,0,0,0,212.62,75.17ZM196,112a36,36,0,0,1-36,36H112a36,36,0,0,1-36-36v-8a37.87,37.87,0,0,1,6.13-20.12,11.65,11.65,0,0,0,1.58-11.49,39.9,39.9,0,0,1-.4-27.72,39.87,39.87,0,0,1,26.41,17.8A12,12,0,0,0,119.82,68h32.35a12,12,0,0,0,10.11-5.53,39.84,39.84,0,0,1,26.41-17.8,39.9,39.9,0,0,1-.4,27.72,12,12,0,0,0,1.61,11.53A37.85,37.85,0,0,1,196,104Z"
            }))],
            ["duotone", a.createElement(a.Fragment, null, a.createElement("path", {
                d: "M208,104v8a48,48,0,0,1-48,48H136a32,32,0,0,1,32,32v40H104V192a32,32,0,0,1,32-32H112a48,48,0,0,1-48-48v-8a49.28,49.28,0,0,1,8.51-27.3A51.92,51.92,0,0,1,76,32a52,52,0,0,1,43.83,24h32.34A52,52,0,0,1,196,32a51.92,51.92,0,0,1,3.49,44.7A49.28,49.28,0,0,1,208,104Z",
                opacity: "0.2"
            }), a.createElement("path", {
                d: "M208.3,75.68A59.74,59.74,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58,58,0,0,0,208.3,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.76,41.76,0,0,1,200,104Z"
            }))],
            ["fill", a.createElement(a.Fragment, null, a.createElement("path", {
                d: "M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z"
            }))],
            ["light", a.createElement(a.Fragment, null, a.createElement("path", {
                d: "M206.13,75.92A57.79,57.79,0,0,0,201.2,29a6,6,0,0,0-5.2-3,57.77,57.77,0,0,0-47,24H123A57.77,57.77,0,0,0,76,26a6,6,0,0,0-5.2,3,57.79,57.79,0,0,0-4.93,46.92A55.88,55.88,0,0,0,58,104v8a54.06,54.06,0,0,0,50.45,53.87A37.85,37.85,0,0,0,98,192v10H72a26,26,0,0,1-26-26A38,38,0,0,0,8,138a6,6,0,0,0,0,12,26,26,0,0,1,26,26,38,38,0,0,0,38,38H98v18a6,6,0,0,0,12,0V192a26,26,0,0,1,52,0v40a6,6,0,0,0,12,0V192a37.85,37.85,0,0,0-10.45-26.13A54.06,54.06,0,0,0,214,112v-8A55.88,55.88,0,0,0,206.13,75.92ZM202,112a42,42,0,0,1-42,42H112a42,42,0,0,1-42-42v-8a43.86,43.86,0,0,1,7.3-23.69,6,6,0,0,0,.81-5.76,45.85,45.85,0,0,1,1.43-36.42,45.85,45.85,0,0,1,35.23,21.1A6,6,0,0,0,119.83,62h32.34a6,6,0,0,0,5.06-2.76,45.83,45.83,0,0,1,35.23-21.11,45.85,45.85,0,0,1,1.43,36.42,6,6,0,0,0,.79,5.74A43.78,43.78,0,0,1,202,104Z"
            }))],
            ["regular", a.createElement(a.Fragment, null, a.createElement("path", {
                d: "M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"
            }))],
            ["thin", a.createElement(a.Fragment, null, a.createElement("path", {
                d: "M203.94,76.16A55.73,55.73,0,0,0,199.46,30,4,4,0,0,0,196,28a55.78,55.78,0,0,0-46,24H122A55.78,55.78,0,0,0,76,28a4,4,0,0,0-3.46,2,55.73,55.73,0,0,0-4.48,46.16A53.78,53.78,0,0,0,60,104v8a52.06,52.06,0,0,0,52,52h1.41A36,36,0,0,0,100,192v12H72a28,28,0,0,1-28-28A36,36,0,0,0,8,140a4,4,0,0,0,0,8,28,28,0,0,1,28,28,36,36,0,0,0,36,36h28v20a4,4,0,0,0,8,0V192a28,28,0,0,1,56,0v40a4,4,0,0,0,8,0V192a36,36,0,0,0-13.41-28H160a52.06,52.06,0,0,0,52-52v-8A53.78,53.78,0,0,0,203.94,76.16ZM204,112a44.05,44.05,0,0,1-44,44H112a44.05,44.05,0,0,1-44-44v-8a45.76,45.76,0,0,1,7.71-24.89,4,4,0,0,0,.53-3.84,47.82,47.82,0,0,1,2.1-39.21,47.8,47.8,0,0,1,38.12,22.1A4,4,0,0,0,119.83,60h32.34a4,4,0,0,0,3.37-1.84,47.8,47.8,0,0,1,38.12-22.1,47.82,47.82,0,0,1,2.1,39.21,4,4,0,0,0,.53,3.83A45.85,45.85,0,0,1,204,104Z"
            }))]
        ]),
        r = a.forwardRef((e, r) => a.createElement(t.default, {
            ref: r,
            ...e,
            weights: n
        }));
    r.displayName = "GithubLogoIcon", e.s(["GithubLogo", 0, r], 67888);
    var l = e.i(53286);
    e.s(["Shell", 0, ({
        children: e,
        wide: a = !1,
        className: t = ""
    }) => (0, l.jsx)("div", {
        className: `mx-auto px-5 sm:px-[30px] ${a?"max-w-[1320px]":"max-w-[1180px]"} ${t}`,
        children: e
    })], 30724), e.s(["CONTACT_EMAIL", 0, "nguyenvtt.dev@gmail.com", "GITHUB_URL", 0, "https://github.com/trebordng", "LINKEDIN_URL", 0, "https://www.linkedin.com/in/robert-tran-a49b251a4/"], 28151)
}, 48939, e => {
    "use strict";
    var a = e.i(53286),
        t = e.i(94189),
        n = e.i(85662);
    let r = new Map([
            ["bold", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"
            }))],
            ["duotone", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M192,64V168L88,64Z",
                opacity: "0.2"
            }), t.createElement("path", {
                d: "M192,56H88a8,8,0,0,0-5.66,13.66L128.69,116,58.34,186.34a8,8,0,0,0,11.32,11.32L140,127.31l46.34,46.35A8,8,0,0,0,200,168V64A8,8,0,0,0,192,56Zm-8,92.69-38.34-38.34h0L107.31,72H184Z"
            }))],
            ["fill", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M200,64V168a8,8,0,0,1-13.66,5.66L140,127.31,69.66,197.66a8,8,0,0,1-11.32-11.32L128.69,116,82.34,69.66A8,8,0,0,1,88,56H192A8,8,0,0,1,200,64Z"
            }))],
            ["light", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M198,64V168a6,6,0,0,1-12,0V78.48L68.24,196.24a6,6,0,0,1-8.48-8.48L177.52,70H88a6,6,0,0,1,0-12H192A6,6,0,0,1,198,64Z"
            }))],
            ["regular", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"
            }))],
            ["thin", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M196,64V168a4,4,0,0,1-8,0V73.66L66.83,194.83a4,4,0,0,1-5.66-5.66L182.34,68H88a4,4,0,0,1,0-8H192A4,4,0,0,1,196,64Z"
            }))]
        ]),
        l = t.forwardRef((e, a) => t.createElement(n.default, {
            ref: a,
            ...e,
            weights: r
        }));
    l.displayName = "ArrowUpRightIcon";
    var i = e.i(67888);
    let s = new Map([
            ["bold", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M128,60a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,60Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,124Zm0-112a92.1,92.1,0,0,0-92,92c0,77.36,81.64,135.4,85.12,137.83a12,12,0,0,0,13.76,0,259,259,0,0,0,42.18-39C205.15,170.57,220,136.37,220,104A92.1,92.1,0,0,0,128,12Zm31.3,174.71A249.35,249.35,0,0,1,128,216.89a249.35,249.35,0,0,1-31.3-30.18C80,167.37,60,137.31,60,104a68,68,0,0,1,136,0C196,137.31,176,167.37,159.3,186.71Z"
            }))],
            ["duotone", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M128,24a80,80,0,0,0-80,80c0,72,80,128,80,128s80-56,80-128A80,80,0,0,0,128,24Zm0,112a32,32,0,1,1,32-32A32,32,0,0,1,128,136Z",
                opacity: "0.2"
            }), t.createElement("path", {
                d: "M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"
            }))],
            ["fill", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"
            }))],
            ["light", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M128,66a38,38,0,1,0,38,38A38,38,0,0,0,128,66Zm0,64a26,26,0,1,1,26-26A26,26,0,0,1,128,130Zm0-112a86.1,86.1,0,0,0-86,86c0,30.91,14.34,63.74,41.47,94.94a252.32,252.32,0,0,0,41.09,38,6,6,0,0,0,6.88,0,252.32,252.32,0,0,0,41.09-38c27.13-31.2,41.47-64,41.47-94.94A86.1,86.1,0,0,0,128,18Zm0,206.51C113,212.93,54,163.62,54,104a74,74,0,0,1,148,0C202,163.62,143,212.93,128,224.51Z"
            }))],
            ["regular", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"
            }))],
            ["thin", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M128,68a36,36,0,1,0,36,36A36,36,0,0,0,128,68Zm0,64a28,28,0,1,1,28-28A28,28,0,0,1,128,132Zm0-112a84.09,84.09,0,0,0-84,84c0,30.42,14.17,62.79,41,93.62a250,250,0,0,0,40.73,37.66,4,4,0,0,0,4.58,0A250,250,0,0,0,171,197.62c26.81-30.83,41-63.2,41-93.62A84.09,84.09,0,0,0,128,20Zm37.1,172.23A254.62,254.62,0,0,1,128,227a254.62,254.62,0,0,1-37.1-34.81C73.15,171.8,52,139.9,52,104a76,76,0,0,1,152,0C204,139.9,182.85,171.8,165.1,192.23Z"
            }))]
        ]),
        c = t.forwardRef((e, a) => t.createElement(n.default, {
            ref: a,
            ...e,
            weights: s
        }));
    c.displayName = "MapPinIcon";
    var o = e.i(19885),
        m = e.i(30724),
        d = e.i(28151);
    let p = [{
        key: "work",
        label: "Work",
        href: "#work"
    }, {
        key: "stack",
        label: "Stack",
        href: "#stack"
    }, {
        key: "contact",
        label: "Contact",
        href: "#contact"
    }];
    e.s(["SiteNav", 0, () => {
        let [e, n] = (0, t.useState)(!1), [r, s] = (0, t.useState)("");
        (0, t.useEffect)(() => {
            let e = new IntersectionObserver(e => {
                e.forEach(e => {
                    e.isIntersecting && s(e.target.id)
                })
            }, {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            });
            ["work", "stack", "contact"].forEach(a => {
                let t = document.getElementById(a);
                t && e.observe(t)
            });
            let a = () => {
                window.scrollY < 120 && s("")
            };
            return window.addEventListener("scroll", a, {
                passive: !0
            }), () => {
                e.disconnect(), window.removeEventListener("scroll", a)
            }
        }, []);
        let h = (e, a) => {
            e.preventDefault(), n(!1), (e => {
                let a = e.replace("#", ""),
                    t = document.getElementById(a);
                if (!t) return;
                let n = document.querySelector(".nav-wrap"),
                    r = n ? n.offsetHeight : 56,
                    l = t.getBoundingClientRect().top + window.scrollY - r - 8;
                window.scrollTo({
                    top: l,
                    behavior: "smooth"
                })
            })(a)
        };
        return (0, a.jsx)("div", {
            className: "nav-wrap sticky top-0 z-40 border-b-2 border-ink bg-paper",
            style: {
                viewTransitionName: "site-header"
            },
            children: (0, a.jsxs)(m.Shell, {
                children: [(0, a.jsxs)("nav", {
                    className: "flex min-h-[50px] items-center justify-between gap-[18px] py-[9px]",
                    children: [(0, a.jsx)("a", {
                        href: "/",
                        "aria-label": "Muhammed Anshif — home",
                        className: "cursor-pointer whitespace-nowrap select-none font-display text-[22px] font-normal tracking-[-0.01em] text-ink no-underline",
                        children: "Muhammed Anshif"
                    }), (0, a.jsxs)("div", {
                        className: "hidden items-center gap-[26px] min-[940px]:flex",
                        children: [p.map(e => (0, a.jsx)("a", {
                            href: e.href,
                            onClick: a => h(a, e.href),
                            className: `cursor-pointer border-b-2 pb-0.5 font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-150 hover:border-ink ${r===e.key?"border-ink":"border-transparent"}`,
                            children: e.label
                        }, e.key)), (0, a.jsx)(o.Button, {
                            variant: "primary",
                            size: "sm",
                            href: "#contact",
                            onClick: e => h(e, "#contact"),
                            children: "Hire him"
                        })]
                    }), (0, a.jsxs)("div", {
                        className: "flex items-center gap-3 min-[940px]:hidden",
                        children: [(0, a.jsx)("span", {
                            className: "hidden min-[460px]:inline-flex",
                            children: (0, a.jsx)(o.Button, {
                                variant: "primary",
                                size: "sm",
                                href: "#contact",
                                onClick: e => h(e, "#contact"),
                                children: "Hire him"
                            })
                        }), (0, a.jsxs)("button", {
                            type: "button",
                            "aria-label": e ? "Close menu" : "Open menu",
                            "aria-expanded": e,
                            onClick: () => n(e => !e),
                            className: "flex h-[42px] w-[42px] flex-none flex-col items-center justify-center gap-[5px] border-2 border-ink",
                            children: [(0, a.jsx)("span", {
                                className: `h-0.5 w-5 bg-ink transition-transform duration-200 ${e?"translate-y-[7px] rotate-45":""}`
                            }), (0, a.jsx)("span", {
                                className: `h-0.5 w-5 bg-ink transition-opacity duration-150 ${e?"opacity-0":""}`
                            }), (0, a.jsx)("span", {
                                className: `h-0.5 w-5 bg-ink transition-transform duration-200 ${e?"-translate-y-[7px] -rotate-45":""}`
                            })]
                        })]
                    })]
                }), (0, a.jsx)("div", {
                    "aria-hidden": !e,
                    className: `overflow-hidden transition-all duration-200 min-[940px]:hidden ${e?"max-h-[600px] opacity-100":"pointer-events-none max-h-0 opacity-0"}`,
                    children: (0, a.jsxs)("div", {
                        className: "border-t-2 border-ink pb-4 pt-1.5",
                        children: [p.map(e => (0, a.jsxs)("a", {
                            href: e.href,
                            onClick: a => h(a, e.href),
                            className: `flex items-center justify-between border-b border-ink/25 px-0.5 py-[15px] font-display text-[30px] font-normal tracking-[-0.01em] text-ink ${r===e.key?"italic":""}`,
                            children: [(0, a.jsx)("span", {
                                children: e.label
                            }), (0, a.jsx)(l, {
                                weight: "bold",
                                className: "h-[18px] w-[18px] text-ink-soft"
                            })]
                        }, e.key)), (0, a.jsx)("div", {
                            className: "mt-[18px]",
                            children: (0, a.jsx)(o.Button, {
                                variant: "primary",
                                href: "#contact",
                                onClick: e => h(e, "#contact"),
                                children: "Hire him →"
                            })
                        }), (0, a.jsxs)("div", {
                            className: "mt-4 flex flex-wrap gap-x-[18px] gap-y-2 font-gothic text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft",
                            children: [(0, a.jsxs)("span", {
                                className: "inline-flex items-center gap-[7px]",
                                children: [(0, a.jsx)(c, {
                                    weight: "fill",
                                    className: "h-3.5 w-3.5"
                                }), " Brisbane, AU"]
                            }), (0, a.jsxs)("span", {
                                className: "inline-flex items-center gap-[7px]",
                                children: [(0, a.jsx)(i.GithubLogo, {
                                    weight: "bold",
                                    className: "h-3.5 w-3.5"
                                }), (0, a.jsx)("a", {
                                    href: d.GITHUB_URL,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    children: "github.com/trebordng"
                                })]
                            })]
                        })]
                    })
                })]
            })
        })
    }], 48939)
}, 84558, e => {
    "use strict";
    var a = e.i(53286),
        t = e.i(94189),
        n = e.i(85662);
    let r = new Map([
            ["bold", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M224,44H32A12,12,0,0,0,20,56V192a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A12,12,0,0,0,224,44ZM193.15,68,128,127.72,62.85,68ZM44,188V83.28l75.89,69.57a12,12,0,0,0,16.22,0L212,83.28V188Z"
            }))],
            ["duotone", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M224,56l-96,88L32,56Z",
                opacity: "0.2"
            }), t.createElement("path", {
                d: "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"
            }))],
            ["fill", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-8,144H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"
            }))],
            ["light", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M224,50H32a6,6,0,0,0-6,6V192a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A6,6,0,0,0,224,50ZM208.58,62,128,135.86,47.42,62ZM216,194H40a2,2,0,0,1-2-2V69.64l86,78.78a6,6,0,0,0,8.1,0L218,69.64V192A2,2,0,0,1,216,194Z"
            }))],
            ["regular", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"
            }))],
            ["thin", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M224,52H32a4,4,0,0,0-4,4V192a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A4,4,0,0,0,224,52Zm-10.28,8L128,138.57,42.28,60ZM216,196H40a4,4,0,0,1-4-4V65.09L125.3,147a4,4,0,0,0,5.4,0L220,65.09V192A4,4,0,0,1,216,196Z"
            }))]
        ]),
        l = t.forwardRef((e, a) => t.createElement(n.default, {
            ref: a,
            ...e,
            weights: r
        }));
    l.displayName = "EnvelopeSimpleIcon";
    var i = e.i(67888);
    let s = new Map([
            ["bold", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M216,20H40A20,20,0,0,0,20,40V216a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V40A20,20,0,0,0,216,20Zm-4,192H44V44H212ZM112,176V120a12,12,0,0,1,21.43-7.41A40,40,0,0,1,192,148v28a12,12,0,0,1-24,0V148a16,16,0,0,0-32,0v28a12,12,0,0,1-24,0ZM96,120v56a12,12,0,0,1-24,0V120a12,12,0,0,1,24,0ZM68,80A16,16,0,1,1,84,96,16,16,0,0,1,68,80Z"
            }))],
            ["duotone", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M224,40V216a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8H216A8,8,0,0,1,224,40Z",
                opacity: "0.2"
            }), t.createElement("path", {
                d: "M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"
            }))],
            ["fill", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z"
            }))],
            ["light", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M216,26H40A14,14,0,0,0,26,40V216a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V40A14,14,0,0,0,216,26Zm2,190a2,2,0,0,1-2,2H40a2,2,0,0,1-2-2V40a2,2,0,0,1,2-2H216a2,2,0,0,1,2,2ZM94,112v64a6,6,0,0,1-12,0V112a6,6,0,0,1,12,0Zm88,28v36a6,6,0,0,1-12,0V140a22,22,0,0,0-44,0v36a6,6,0,0,1-12,0V112a6,6,0,0,1,12,0v2.11A34,34,0,0,1,182,140ZM98,84A10,10,0,1,1,88,74,10,10,0,0,1,98,84Z"
            }))],
            ["regular", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"
            }))],
            ["thin", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M216,28H40A12,12,0,0,0,28,40V216a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28Zm4,188a4,4,0,0,1-4,4H40a4,4,0,0,1-4-4V40a4,4,0,0,1,4-4H216a4,4,0,0,1,4,4ZM92,112v64a4,4,0,0,1-8,0V112a4,4,0,0,1,8,0Zm88,28v36a4,4,0,0,1-8,0V140a24,24,0,0,0-48,0v36a4,4,0,0,1-8,0V112a4,4,0,0,1,8,0v6.87A32,32,0,0,1,180,140ZM96,84a8,8,0,1,1-8-8A8,8,0,0,1,96,84Z"
            }))]
        ]),
        c = t.forwardRef((e, a) => t.createElement(n.default, {
            ref: a,
            ...e,
            weights: s
        }));
    c.displayName = "LinkedinLogoIcon";
    var o = e.i(19885),
        m = e.i(37960);
    let d = ({
            text: e
        }) => (0, a.jsx)(a.Fragment, {
            children: e.split(" ").map((e, n) => (0, a.jsxs)(t.Fragment, {
                children: [n > 0 ? " " : null, (0, a.jsx)("span", {
                    className: "rv-word",
                    style: {
                        "--i": n
                    },
                    children: e
                })]
            }, n))
        }),
        p = ({
            kicker: e,
            title: t,
            sub: n
        }) => (0, a.jsxs)("div", {
            className: "mb-[30px]",
            children: [(0, a.jsxs)(m.Reveal, {
                effect: "none",
                className: "flex flex-wrap items-baseline justify-between gap-5 pb-2.5",
                children: [(0, a.jsxs)("div", {
                    children: [(0, a.jsx)("span", {
                        className: "rv-fade font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink",
                        children: e
                    }), (0, a.jsx)("h2", {
                        className: "mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]",
                        children: (0, a.jsx)(d, {
                            text: t
                        })
                    })]
                }), (0, a.jsx)("span", {
                    className: "rv-fade whitespace-nowrap font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft",
                    children: n
                })]
            }), (0, a.jsx)(m.Reveal, {
                effect: "rule",
                className: "h-1 bg-ink"
            })]
        });
    var h = e.i(30724),
        x = e.i(28151);
    let u = "w-full border-2 border-ink bg-paper-bright px-3.5 py-3 font-text text-[16px] text-ink placeholder:text-ink-faint focus:outline-none",
        f = "mb-[7px] block font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft",
        g = "flex h-[42px] w-[42px] items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper",
        A = [{
            k: "Direct line",
            value: (0, a.jsx)("a", {
                className: "link-pencil",
                href: `mailto:${x.CONTACT_EMAIL}`,
                children: x.CONTACT_EMAIL
            }),
            note: "For commissions, contracts, and the occasional good argument about CSS."
        }, {
            k: "The Desk",
            value: "Brisbane, Australia",
            note: "AEST - working with teams worldwide, remote-first."
        }, {
            k: "Availability",
            value: "Freelance & contract only",
            note: "Working full-time at Pakko, so he takes on select freelance / contract projects on the side."
        }];
    e.s(["Contact", 0, () => {
        let [e, n] = (0, t.useState)(!1), [r, s] = (0, t.useState)(!1), [d, v] = (0, t.useState)(""), b = async e => {
            e.preventDefault();
            let a = e.currentTarget,
                t = new FormData(a),
                r = String(t.get("name") ? ? ""),
                l = String(t.get("email") ? ? ""),
                i = String(t.get("subject") ? ? "Project enquiry"),
                c = String(t.get("message") ? ? ""),
                o = String(t.get("company") ? ? "");
            s(!0), v("");
            try {
                if (!(await fetch("/api/contact", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: r,
                            email: l,
                            subject: i,
                            message: c,
                            company: o
                        })
                    })).ok) throw Error("Message failed to send.");
                a.reset(), n(!0)
            } catch {
                v("Message could not be sent. Email Robert directly instead.")
            } finally {
                s(!1)
            }
        };
        return (0, a.jsx)("section", {
            id: "contact",
            className: "border-t-4 border-ink py-[76px]",
            children: (0, a.jsxs)(h.Shell, {
                children: [(0, a.jsx)(p, {
                    kicker: "Submit a Tip",
                    title: "Letters & Commissions",
                    sub: "The desk is open for select work — 2026"
                }), (0, a.jsxs)(m.Reveal, {
                    className: "grid grid-cols-1 border-2 border-ink min-[600px]:grid-cols-[1.15fr_0.85fr]",
                    children: [(0, a.jsx)("div", {
                        className: "border-b-2 border-ink p-6 min-[600px]:border-b-0 min-[600px]:border-r-2 min-[600px]:p-9",
                        children: e ? (0, a.jsxs)("div", {
                            className: "px-2 py-[30px] text-center",
                            children: [(0, a.jsx)("div", {
                                className: "mb-3.5 font-display text-[56px] leading-none",
                                children: "*"
                            }), (0, a.jsx)("h3", {
                                className: "mb-2 font-display text-[30px]",
                                children: "Tip received — filed for the morning edition"
                            }), (0, a.jsx)("p", {
                                className: "mx-auto max-w-[34ch] font-text text-[15px] leading-[1.55] text-ink-soft",
                                children: "Thanks for writing in. The desk reads every message and replies within 24 hours."
                            })]
                        }) : (0, a.jsxs)(a.Fragment, {
                            children: [(0, a.jsx)("h3", {
                                className: "mb-1.5 font-display text-[32px] font-normal",
                                children: "Put it in writing"
                            }), (0, a.jsx)("p", {
                                className: "mb-6 font-text text-[15px] leading-[1.55] text-ink-soft",
                                children: "A project in mind, a role to fill, or just a good question - send it through and he’ll get back to you."
                            }), (0, a.jsxs)("form", {
                                onSubmit: b,
                                children: [(0, a.jsx)("input", {
                                    className: "hidden",
                                    name: "company",
                                    tabIndex: -1,
                                    autoComplete: "off"
                                }), (0, a.jsxs)("div", {
                                    className: "grid grid-cols-1 gap-4 min-[600px]:grid-cols-2",
                                    children: [(0, a.jsxs)("div", {
                                        className: "mb-4",
                                        children: [(0, a.jsx)("label", {
                                            className: f,
                                            htmlFor: "contact-name",
                                            children: "Your name"
                                        }), (0, a.jsx)("input", {
                                            id: "contact-name",
                                            name: "name",
                                            className: u,
                                            placeholder: "Jane Doe",
                                            required: !0
                                        })]
                                    }), (0, a.jsxs)("div", {
                                        className: "mb-4",
                                        children: [(0, a.jsx)("label", {
                                            className: f,
                                            htmlFor: "contact-email",
                                            children: "Email"
                                        }), (0, a.jsx)("input", {
                                            id: "contact-email",
                                            name: "email",
                                            className: u,
                                            type: "email",
                                            placeholder: "jane@company.com",
                                            required: !0
                                        })]
                                    })]
                                }), (0, a.jsxs)("div", {
                                    className: "mb-4",
                                    children: [(0, a.jsx)("label", {
                                        className: f,
                                        htmlFor: "contact-subject",
                                        children: "Subject"
                                    }), (0, a.jsx)("input", {
                                        id: "contact-subject",
                                        name: "subject",
                                        className: u,
                                        placeholder: "A new product, a rebuild, a contract..."
                                    })]
                                }), (0, a.jsxs)("div", {
                                    className: "mb-4",
                                    children: [(0, a.jsx)("label", {
                                        className: f,
                                        htmlFor: "contact-message",
                                        children: "The story"
                                    }), (0, a.jsx)("textarea", {
                                        id: "contact-message",
                                        name: "message",
                                        className: `${u} min-h-[120px] resize-y leading-[1.5]`,
                                        placeholder: "Tell him what you're building.",
                                        required: !0
                                    })]
                                }), d ? (0, a.jsxs)("p", {
                                    className: "mb-4 font-text text-[14px] leading-[1.45] text-ink-soft",
                                    role: "alert",
                                    children: [d, " ", (0, a.jsx)("a", {
                                        className: "underline",
                                        href: `mailto:${x.CONTACT_EMAIL}`,
                                        children: x.CONTACT_EMAIL
                                    })]
                                }) : null, (0, a.jsxs)("div", {
                                    className: "mt-[22px] flex flex-wrap items-center justify-between gap-4",
                                    children: [(0, a.jsx)("span", {
                                        className: "font-gothic text-[11px] uppercase tracking-[0.06em] text-ink-soft",
                                        children: "Usually replies within 24 hours"
                                    }), (0, a.jsx)(o.Button, {
                                        variant: "primary",
                                        size: "lg",
                                        type: "submit",
                                        disabled: r,
                                        children: r ? "Sending..." : "Send the letter"
                                    })]
                                })]
                            })]
                        })
                    }), (0, a.jsxs)("div", {
                        className: "flex flex-col bg-paper-warm p-6 min-[600px]:p-8",
                        children: [A.map((e, t) => (0, a.jsxs)("div", {
                            className: `border-b border-ink/25 py-4 last:border-b-0 ${0===t?"pt-0":""}`,
                            children: [(0, a.jsx)("p", {
                                className: "mb-[5px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft",
                                children: e.k
                            }), (0, a.jsx)("p", {
                                className: "font-display text-[21px] leading-[1.2] [overflow-wrap:anywhere]",
                                children: e.value
                            }), (0, a.jsx)("p", {
                                className: "mt-1 font-text text-[14px] text-ink-soft",
                                children: e.note
                            })]
                        }, e.k)), (0, a.jsxs)("div", {
                            className: "mt-auto flex gap-2.5 pt-[22px]",
                            children: [(0, a.jsx)("a", {
                                className: g,
                                href: x.GITHUB_URL,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                "aria-label": "GitHub",
                                children: (0, a.jsx)(i.GithubLogo, {
                                    weight: "bold",
                                    className: "h-[19px] w-[19px]"
                                })
                            }), (0, a.jsx)("a", {
                                className: g,
                                href: x.LINKEDIN_URL,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                "aria-label": "LinkedIn",
                                children: (0, a.jsx)(c, {
                                    weight: "bold",
                                    className: "h-[19px] w-[19px]"
                                })
                            }), (0, a.jsx)("a", {
                                className: g,
                                href: `mailto:${x.CONTACT_EMAIL}`,
                                "aria-label": "Email",
                                children: (0, a.jsx)(l, {
                                    weight: "bold",
                                    className: "h-[19px] w-[19px]"
                                })
                            })]
                        })]
                    })]
                })]
            })
        })
    }], 84558)
}, 68477, e => {
    "use strict";
    var a = e.i(53286),
        t = e.i(94189),
        n = e.i(85662);
    let r = new Map([
            ["bold", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M160,128a224.48,224.48,0,0,1-26.37,105.54,12,12,0,1,1-21.16-11.32A200.33,200.33,0,0,0,136,128a8,8,0,0,0-16,0,12,12,0,0,1-24,0,32,32,0,0,1,64,0ZM128,56a12,12,0,1,0,0,24,48.05,48.05,0,0,1,48,48c0,7.62-.36,15.32-1.07,22.87A12,12,0,0,0,185.74,164c.38,0,.76,0,1.14,0a12,12,0,0,0,11.93-10.87c.79-8.3,1.18-16.76,1.18-25.13A72.08,72.08,0,0,0,128,56ZM96,92.23A12,12,0,0,0,80,74.35,72.1,72.1,0,0,0,56,128a120.11,120.11,0,0,1-15.12,58.37,12,12,0,0,0,21,11.69A144.14,144.14,0,0,0,80,128,48.08,48.08,0,0,1,96,92.23Zm10.1,64.1a12,12,0,0,0-14.46,8.9,158.61,158.61,0,0,1-18.88,45.86,12,12,0,0,0,20.5,12.48A182.86,182.86,0,0,0,115,170.79,12,12,0,0,0,106.1,156.33Zm76.73,24.07A12,12,0,0,0,168.19,189a241.5,241.5,0,0,1-8,24.87,12,12,0,0,0,6.91,15.49,11.76,11.76,0,0,0,4.29.8,12,12,0,0,0,11.21-7.71,260.2,260.2,0,0,0,8.79-27.37A12,12,0,0,0,182.83,180.4ZM128,16A112.12,112.12,0,0,0,16,127.44c0,.19,0,.38,0,.57a79.81,79.81,0,0,1-5,27.82,12,12,0,1,0,22.5,8.35A103.59,103.59,0,0,0,40,128.58c0-.19,0-.38,0-.57a88,88,0,0,1,176-.5c0,.16,0,.33,0,.5a282.12,282.12,0,0,1-6.74,61.38,12,12,0,0,0,9.09,14.33A11.84,11.84,0,0,0,221,204a12,12,0,0,0,11.7-9.38A305.87,305.87,0,0,0,240,128.55c0-.18,0-.36,0-.54A112.13,112.13,0,0,0,128,16Z"
            }))],
            ["duotone", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",
                opacity: "0.2"
            }), t.createElement("path", {
                d: "M72,128a134.63,134.63,0,0,1-14.16,60.47,8,8,0,1,1-14.32-7.12A118.8,118.8,0,0,0,56,128,71.73,71.73,0,0,1,83,71.8,8,8,0,1,1,93,84.29,55.76,55.76,0,0,0,72,128Zm56-8a8,8,0,0,0-8,8,184.12,184.12,0,0,1-23,89.1,8,8,0,0,0,14,7.76A200.19,200.19,0,0,0,136,128,8,8,0,0,0,128,120Zm0-32a40,40,0,0,0-40,40,8,8,0,0,0,16,0,24,24,0,0,1,48,0,214.09,214.09,0,0,1-20.51,92A8,8,0,1,0,146,226.83,230,230,0,0,0,168,128,40,40,0,0,0,128,88Zm0-64A104.11,104.11,0,0,0,24,128a87.76,87.76,0,0,1-5,29.33,8,8,0,0,0,15.09,5.33A103.9,103.9,0,0,0,40,128a88,88,0,0,1,176,0,282.24,282.24,0,0,1-5.29,54.45,8,8,0,0,0,6.3,9.4,8.22,8.22,0,0,0,1.55.15,8,8,0,0,0,7.84-6.45A298.37,298.37,0,0,0,232,128,104.12,104.12,0,0,0,128,24ZM94.4,152.17A8,8,0,0,0,85,158.42a151,151,0,0,1-17.21,45.44,8,8,0,0,0,13.86,8,166.67,166.67,0,0,0,19-50.25A8,8,0,0,0,94.4,152.17ZM128,56a72.85,72.85,0,0,0-9,.56,8,8,0,0,0,2,15.87A56.08,56.08,0,0,1,184,128a252.12,252.12,0,0,1-1.92,31A8,8,0,0,0,189,168a8.39,8.39,0,0,0,1,.06,8,8,0,0,0,7.92-7,266.48,266.48,0,0,0,2-33A72.08,72.08,0,0,0,128,56Zm57.93,128.25a8,8,0,0,0-9.75,5.75c-1.46,5.69-3.15,11.4-5,17a8,8,0,0,0,5,10.13,7.88,7.88,0,0,0,2.55.42,8,8,0,0,0,7.58-5.46c2-5.92,3.79-12,5.35-18.05A8,8,0,0,0,185.94,184.26Z"
            }))],
            ["fill", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M126.42,24C70.73,24.85,25.21,70.09,24,125.81a103.53,103.53,0,0,0,13.52,53.54,4,4,0,0,0,7.1-.3,119.35,119.35,0,0,0,11.37-51A71.77,71.77,0,0,1,83,71.83a8,8,0,1,1,9.86,12.61A55.82,55.82,0,0,0,72,128.07a135.28,135.28,0,0,1-18.45,68.35,4,4,0,0,0,.61,4.85c2,2,4.09,4,6.25,5.82a4,4,0,0,0,6-1A151.18,151.18,0,0,0,85,158.49a8,8,0,1,1,15.68,3.19,167.33,167.33,0,0,1-21.07,53.64,4,4,0,0,0,1.6,5.63c2.47,1.25,5,2.41,7.57,3.47a4,4,0,0,0,5-1.61A183,183,0,0,0,120,128.28a8.16,8.16,0,0,1,7.44-8.21,8,8,0,0,1,8.56,8,198.94,198.94,0,0,1-25.21,97.16,4,4,0,0,0,2.95,5.92q4.55.63,9.21.86a4,4,0,0,0,3.67-2.1A214.88,214.88,0,0,0,152,128.8c.05-13.25-10.3-24.49-23.54-24.74A24,24,0,0,0,104,128a8.1,8.1,0,0,1-7.29,8,8,8,0,0,1-8.71-8,40,40,0,0,1,40.42-40c22,.23,39.68,19.17,39.57,41.16a231.37,231.37,0,0,1-20.52,94.57,4,4,0,0,0,4.62,5.51,103.49,103.49,0,0,0,10.26-3,4,4,0,0,0,2.35-2.22,243.76,243.76,0,0,0,11.48-34,8,8,0,1,1,15.5,4q-1.12,4.37-2.4,8.7a4,4,0,0,0,6.46,4.17A104,104,0,0,0,126.42,24ZM198,161.08a8,8,0,0,1-7.92,7,8.39,8.39,0,0,1-1-.06,8,8,0,0,1-6.95-8.93,252.57,252.57,0,0,0,1.92-31,56.08,56.08,0,0,0-56-56,56.78,56.78,0,0,0-7,.43,8,8,0,0,1-2-15.89,72.1,72.1,0,0,1,81,71.49A266.93,266.93,0,0,1,198,161.08Z"
            }))],
            ["light", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M70,128a132.68,132.68,0,0,1-14,59.58,6,6,0,0,1-5.38,3.33,6,6,0,0,1-5.36-8.67A120.74,120.74,0,0,0,58,128,69.72,69.72,0,0,1,84.25,73.36a6,6,0,0,1,7.51,9.37A57.73,57.73,0,0,0,70,128Zm58-6a6,6,0,0,0-6,6,186.07,186.07,0,0,1-23.23,90.07,6,6,0,0,0,10.5,5.82A198.14,198.14,0,0,0,134,128,6,6,0,0,0,128,122Zm0-32a38,38,0,0,0-38,38,6,6,0,0,0,12,0,26,26,0,0,1,52,0,216.06,216.06,0,0,1-20.71,92.85A6,6,0,1,0,144.16,226,227.94,227.94,0,0,0,166,128,38,38,0,0,0,128,90Zm0-64A102.11,102.11,0,0,0,26,128a90,90,0,0,1-5.12,30,6,6,0,1,0,11.31,4A101.83,101.83,0,0,0,38,128a90,90,0,0,1,180,0,284.7,284.7,0,0,1-5.33,54.84,6,6,0,0,0,4.72,7.05,6.8,6.8,0,0,0,1.17.11,6,6,0,0,0,5.88-4.84A295.92,295.92,0,0,0,230,128,102.12,102.12,0,0,0,128,26ZM94,154.13a6,6,0,0,0-7.07,4.69,152.82,152.82,0,0,1-17.44,46,6,6,0,0,0,10.4,6,164.77,164.77,0,0,0,18.8-49.65A6,6,0,0,0,94,154.13ZM128,58a70.76,70.76,0,0,0-8.75.54,6,6,0,1,0,1.49,11.91A58,58,0,0,1,186,128a252.27,252.27,0,0,1-1.94,31.26,6,6,0,0,0,5.21,6.69,6.59,6.59,0,0,0,.75,0,6,6,0,0,0,5.95-5.26A266.46,266.46,0,0,0,198,128,70.08,70.08,0,0,0,128,58ZM185.44,186.2a6,6,0,0,0-7.31,4.31c-1.47,5.74-3.18,11.49-5.06,17.09a6,6,0,0,0,11.38,3.82c2-5.88,3.75-11.9,5.3-17.92A6,6,0,0,0,185.44,186.2Z"
            }))],
            ["regular", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M72,128a134.63,134.63,0,0,1-14.16,60.47,8,8,0,1,1-14.32-7.12A118.8,118.8,0,0,0,56,128,71.73,71.73,0,0,1,83,71.8,8,8,0,1,1,93,84.29,55.76,55.76,0,0,0,72,128Zm56-8a8,8,0,0,0-8,8,184.12,184.12,0,0,1-23,89.1,8,8,0,0,0,14,7.76A200.19,200.19,0,0,0,136,128,8,8,0,0,0,128,120Zm0-32a40,40,0,0,0-40,40,8,8,0,0,0,16,0,24,24,0,0,1,48,0,214.09,214.09,0,0,1-20.51,92A8,8,0,1,0,146,226.83,230,230,0,0,0,168,128,40,40,0,0,0,128,88Zm0-64A104.11,104.11,0,0,0,24,128a87.76,87.76,0,0,1-5,29.33,8,8,0,0,0,15.09,5.33A103.9,103.9,0,0,0,40,128a88,88,0,0,1,176,0,282.24,282.24,0,0,1-5.29,54.45,8,8,0,0,0,6.3,9.4,8.22,8.22,0,0,0,1.55.15,8,8,0,0,0,7.84-6.45A298.37,298.37,0,0,0,232,128,104.12,104.12,0,0,0,128,24ZM94.4,152.17A8,8,0,0,0,85,158.42a151,151,0,0,1-17.21,45.44,8,8,0,0,0,13.86,8,166.67,166.67,0,0,0,19-50.25A8,8,0,0,0,94.4,152.17ZM128,56a72.85,72.85,0,0,0-9,.56,8,8,0,0,0,2,15.87A56.08,56.08,0,0,1,184,128a252.12,252.12,0,0,1-1.92,31A8,8,0,0,0,189,168a8.39,8.39,0,0,0,1,.06,8,8,0,0,0,7.92-7,266.48,266.48,0,0,0,2-33A72.08,72.08,0,0,0,128,56Zm57.93,128.25a8,8,0,0,0-9.75,5.75c-1.46,5.69-3.15,11.4-5,17a8,8,0,0,0,5,10.13,7.88,7.88,0,0,0,2.55.42,8,8,0,0,0,7.58-5.46c2-5.92,3.79-12,5.35-18.05A8,8,0,0,0,185.94,184.26Z"
            }))],
            ["thin", t.createElement(t.Fragment, null, t.createElement("path", {
                d: "M68,128A130.71,130.71,0,0,1,54.27,186.7a4,4,0,0,1-3.58,2.22,3.91,3.91,0,0,1-1.78-.42,4,4,0,0,1-1.8-5.36A122.71,122.71,0,0,0,60,128,67.74,67.74,0,0,1,85.5,74.92a4,4,0,0,1,5,6.25A59.74,59.74,0,0,0,68,128Zm60-4a4,4,0,0,0-4,4,188.1,188.1,0,0,1-23.48,91,4,4,0,0,0,7,3.88A196.22,196.22,0,0,0,132,128,4,4,0,0,0,128,124Zm0-32a36,36,0,0,0-36,36,4,4,0,0,0,8,0,28,28,0,0,1,56,0,218,218,0,0,1-20.9,93.7,4,4,0,1,0,7.24,3.41A226,226,0,0,0,164,128,36,36,0,0,0,128,92Zm0-64A100.11,100.11,0,0,0,28,128a91.66,91.66,0,0,1-5.24,30.67,4,4,0,1,0,7.54,2.66A99.66,99.66,0,0,0,36,128a92,92,0,0,1,184,0,286.37,286.37,0,0,1-5.37,55.23,4,4,0,0,0,3.15,4.69,4.13,4.13,0,0,0,.78.08,4,4,0,0,0,3.92-3.23A294.25,294.25,0,0,0,228,128,100.11,100.11,0,0,0,128,28ZM93.6,156.09a4,4,0,0,0-4.71,3.12,155,155,0,0,1-17.66,46.64,4,4,0,0,0,6.93,4,163.13,163.13,0,0,0,18.57-49A4,4,0,0,0,93.6,156.09ZM128,60a68.79,68.79,0,0,0-8.5.53,4,4,0,0,0,1,7.93A62.57,62.57,0,0,1,128,68a60.07,60.07,0,0,1,60,60,256.15,256.15,0,0,1-1.95,31.5,4,4,0,0,0,3.47,4.47l.5,0a4,4,0,0,0,4-3.51A264.37,264.37,0,0,0,196,128,68.08,68.08,0,0,0,128,60Zm56.93,128.12a4,4,0,0,0-4.87,2.88c-1.49,5.78-3.21,11.58-5.1,17.23a4,4,0,1,0,7.58,2.54c2-5.83,3.73-11.81,5.27-17.77A4,4,0,0,0,184.94,188.13Z"
            }))]
        ]),
        l = t.forwardRef((e, a) => t.createElement(n.default, {
            ref: a,
            ...e,
            weights: r
        }));
    l.displayName = "FingerprintIcon", e.s(["ReopenCase", 0, () => (0, a.jsx)("button", {
        type: "button",
        title: "Reopen the case",
        "aria-label": "Reopen the case — replay the intro",
        onClick: () => {
            document.cookie = "rt_intro_seen=; path=/; max-age=0", window.location.reload()
        },
        className: "flex h-10 w-10 items-center justify-center border border-paper/45 text-paper transition-colors hover:border-stamp-bright hover:text-stamp-bright",
        children: (0, a.jsx)(l, {
            weight: "duotone",
            className: "h-[22px] w-[22px]"
        })
    })], 68477)
}]);
