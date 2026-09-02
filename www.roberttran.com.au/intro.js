(() => {
    const subjectName = "Muhammed Anshif"
    const columnNames = [
        "The Morning Brief",
        "Notes from the Desk",
        "Field Report",
        "Late Edition",
        "On the Record"
    ]

    let activeIntro = null
    let dateAnimationStarted = false

    const currentDateLabel = () => {
        const parts = new Intl.DateTimeFormat("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).formatToParts(new Date())
        const part = (type) => parts.find((item) => item.type === type)?.value || ""
        return `${part("weekday")} ${part("day")} ${part("month")} ${part("year")}`
    }

    const animateCurrentDate = () => {
        if (dateAnimationStarted) return
        dateAnimationStarted = true

        const dateWrap = document.querySelector("[data-current-date]")
        const dateOutput = dateWrap?.querySelector("[data-date-output]")
        if (!dateWrap || !dateOutput) return

        const fullDate = currentDateLabel()
        dateWrap.setAttribute("aria-label", fullDate)

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            dateOutput.textContent = fullDate
            return
        }

        let characterIndex = 0
        dateOutput.textContent = "|"

        const typeNextCharacter = () => {
            characterIndex += 1
            const typedDate = fullDate.slice(0, characterIndex)
            dateOutput.textContent = characterIndex < fullDate.length ? `${typedDate}|` : typedDate
            if (characterIndex < fullDate.length) {
                window.setTimeout(typeNextCharacter, 38 + Math.random() * 34)
            }
        }

        window.setTimeout(typeNextCharacter, 180)
    }

    const columnMarkup = (name, columnIndex) => {
        const lines = Array.from({ length: 60 }, (_, lineIndex) => {
            const marker = (7 * lineIndex + 5 * columnIndex) % 13
            const modifier = marker === 0 ? "x" : marker % 4 === 0 ? "s" : ""
            return `<div class="fm-col-l ${modifier}"></div>`
        }).join("")

        return `<div class="fm-col"><div class="fm-col-h">${name}</div><div class="fm-col-r"></div>${lines}</div>`
    }

    const sceneMarkup = (name) => `
        ${columnNames.map(columnMarkup).join("")}
        <div class="fm-masthead">
            <div class="fm-masthead-k">Wanted</div>
            <div class="fm-masthead-t">${name}</div>
            <div class="fm-masthead-r"></div>
        </div>
    `

    const startIntro = ({ name = subjectName, navigateTo = "" } = {}) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            if (navigateTo) window.location.assign(navigateTo)
            return
        }
        if (activeIntro) activeIntro.remove()

        window.scrollTo(0, 0)
        document.body.classList.add("fm-local-active")

        const scene = sceneMarkup(name)
        const intro = document.createElement("div")
        intro.className = "fm-intro fm-local-intro"
        intro.setAttribute("role", "dialog")
        intro.setAttribute("aria-label", `Find ${name}`)
        intro.innerHTML = `
            <div class="fm-zoom">
                <div class="fm-scene fm-scene--base">${scene}</div>
                <div class="fm-scene--mag-clip">
                    <div class="fm-scene fm-scene--mag">${scene}</div>
                </div>
                <div class="fm-local-shade"></div>
                <div class="fm-lens" aria-hidden="true">
                    <div class="fm-lens-handle"></div>
                    <div class="fm-lens-glass"></div>
                    <div class="fm-lens-rim"></div>
                </div>
                <div class="fm-grain"></div>
                <div class="fm-stampwrap" aria-live="polite">
                    <div class="fm-stamp">${name}<small>Identified</small></div>
                </div>
            </div>
            <div class="fm-hint">Take the glass — find ${name}</div>
            <button class="fm-skip" type="button">Skip intro →</button>
        `

        document.body.appendChild(intro)
        activeIntro = intro

        const magnified = intro.querySelector(".fm-scene--mag")
        const clip = intro.querySelector(".fm-scene--mag-clip")
        const shade = intro.querySelector(".fm-local-shade")
        const lens = intro.querySelector(".fm-lens")
        const hint = intro.querySelector(".fm-hint")
        const skip = intro.querySelector(".fm-skip")

        let x = window.innerWidth * 0.2
        let y = window.innerHeight * 0.34
        let lastMove = performance.now()
        let targetSince = 0
        let locked = false
        let finishing = false
        let animationFrame = 0

        const lensRadius = () => Math.round(
            Math.min(104, Math.max(82, Math.min(window.innerWidth, window.innerHeight) * 0.12))
        )

        const draw = (time = performance.now()) => {
            const radius = lensRadius()
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2

            if (!locked && time - lastMove > 3500) {
                x += (centerX - x) * 0.025
                y += (centerY - y) * 0.025
            }

            lens.style.width = `${radius * 2}px`
            lens.style.height = `${radius * 2}px`
            lens.style.margin = "0"
            lens.style.left = `${x - radius}px`
            lens.style.top = `${y - radius}px`
            lens.style.transform = "rotate(-10deg)"

            clip.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`
            clip.style.webkitClipPath = `circle(${radius}px at ${x}px ${y}px)`
            magnified.style.transformOrigin = `${x}px ${y}px`
            magnified.style.transform = "scale(1.9)"
            shade.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent ${radius - 4}px, rgba(22,20,15,.26) ${radius + 190}px, rgba(22,20,15,.42) 62%)`

            const distance = Math.hypot(x - centerX, y - centerY)
            if (!locked && distance < radius * 0.58) {
                if (!targetSince) targetSince = time
                if (time - targetSince > 320) lockOnSubject()
            } else {
                targetSince = 0
            }

            if (!locked) animationFrame = requestAnimationFrame(draw)
        }

        const finish = () => {
            if (!activeIntro || finishing) return
            finishing = true
            cancelAnimationFrame(animationFrame)

            if (navigateTo) {
                intro.classList.add("fm-local-navigating")
                hint.textContent = `Opening case file — ${name}`
                skip.disabled = true
                window.dispatchEvent(new Event("rt-intro-done"))
                requestAnimationFrame(() => window.location.assign(navigateTo))
                return
            }

            intro.classList.add("fm-intro--exit")
            document.body.classList.remove("fm-local-active")
            window.dispatchEvent(new Event("rt-intro-done"))
            setTimeout(() => {
                intro.remove()
                if (activeIntro === intro) activeIntro = null
            }, 480)
        }

        const lockOnSubject = () => {
            if (locked) return
            locked = true
            x = window.innerWidth / 2
            y = window.innerHeight / 2
            draw()
            intro.classList.add("fm-local-locked")
            hint.textContent = `Subject found — ${name}`
            setTimeout(finish, 1450)
        }

        const moveLens = (event) => {
            if (locked) return
            x = event.clientX
            y = event.clientY
            lastMove = performance.now()
        }

        const onKeyDown = (event) => {
            if (event.key === "Escape") finish()
        }

        intro.addEventListener("pointermove", moveLens)
        intro.addEventListener("pointerdown", moveLens)
        skip.addEventListener("click", finish)
        window.addEventListener("keydown", onKeyDown, { once: true })
        window.addEventListener("resize", () => draw(), { once: true })

        draw()
        skip.focus({ preventScroll: true })
    }

    const replayButton = document.querySelector('button[title="Reopen the case"]')
    if (replayButton) {
        replayButton.addEventListener("click", (event) => {
            event.preventDefault()
            event.stopImmediatePropagation()
            startIntro()
        }, true)
    }

    document.addEventListener("click", (event) => {
        const homeLink = event.target.closest("[data-home-link]")
        if (!homeLink || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        if (window.location.pathname !== "/" && !window.location.pathname.endsWith("/index.html")) return

        event.preventDefault()
        event.stopImmediatePropagation()
        window.history.replaceState(null, "", "/")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, true)

    document.addEventListener("click", (event) => {
        const caseLink = event.target.closest(
            '[data-case-intro], a[href="/case-files/beek-perfumes"], a[href="/case-files/beek-perfumes/"], a[href="/case-files/monkey-tribe"], a[href="/case-files/monkey-tribe/"], a[href="/case-files/porto"], a[href="/case-files/porto/"]'
        )
        if (!caseLink || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

        event.preventDefault()
        event.stopImmediatePropagation()
        fetch(caseLink.href, {
            credentials: "same-origin",
            cache: "force-cache"
        }).catch(() => {})
        const projectPath = new URL(caseLink.href).pathname
        const projectName = caseLink.dataset.caseName || (
            projectPath.includes("monkey-tribe") ? "Monkey Tribe" :
            projectPath.includes("porto") ? "PORTO" :
            "Beek Perfumes"
        )
        startIntro({
            name: projectName,
            navigateTo: caseLink.href
        })
    }, true)

    const pageUrl = new URL(window.location.href)
    const skipInitialIntro = pageUrl.searchParams.get("skipIntro") === "1"
    if (skipInitialIntro) {
        pageUrl.searchParams.delete("skipIntro")
        window.history.replaceState(null, "", `${pageUrl.pathname}${pageUrl.search}${pageUrl.hash}`)
        requestAnimationFrame(() => animateCurrentDate())
    } else {
        window.addEventListener("rt-intro-done", () => {
            window.setTimeout(animateCurrentDate, 480)
        }, { once: true })
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            requestAnimationFrame(() => animateCurrentDate())
        }
        requestAnimationFrame(() => startIntro())
    }
})()
