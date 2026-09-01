(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 99309, e => {
    "use strict";
    var t = e.i(53286),
        r = e.i(94189);
    e.s(["LensCursor", 0, () => {
        let e = (0, r.useRef)(null);
        return (0, r.useEffect)(() => {
            let t = e.current;
            if (!t || window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            let r = !1,
                i = e => {
                    let i;
                    t.style.transform = `translate(${e.clientX+12}px, ${e.clientY+14}px)`;
                    let n = (i = e.target) instanceof Element && null !== i.closest("a, button, [data-lens]");
                    n !== r && (r = n, t.style.opacity = n ? "1" : "0")
                };
            return window.addEventListener("pointermove", i, {
                passive: !0
            }), () => window.removeEventListener("pointermove", i)
        }, []), (0, t.jsx)("div", {
            ref: e,
            "aria-hidden": "true",
            className: "pointer-events-none fixed left-0 top-0 z-[9000] opacity-0 [transition:opacity_.15s_ease] [will-change:transform]",
            children: (0, t.jsxs)("svg", {
                width: "26",
                height: "26",
                viewBox: "0 0 26 26",
                fill: "none",
                className: "drop-shadow-sm",
                children: [(0, t.jsx)("circle", {
                    cx: "10.5",
                    cy: "10.5",
                    r: "7",
                    stroke: "#16140f",
                    strokeWidth: "2.5",
                    fill: "rgba(251,250,245,0.55)"
                }), (0, t.jsx)("line", {
                    x1: "15.8",
                    y1: "15.8",
                    x2: "23",
                    y2: "23",
                    stroke: "#16140f",
                    strokeWidth: "3",
                    strokeLinecap: "round"
                }), (0, t.jsx)("circle", {
                    cx: "8.4",
                    cy: "8.2",
                    r: "2.1",
                    fill: "rgba(251,250,245,0.85)"
                })]
            })
        })
    }])
}]);