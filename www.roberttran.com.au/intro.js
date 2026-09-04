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
        // A single update avoids repeatedly recalculating layout for the entire
        // long-form page while keeping the date current for every visit.
        dateOutput.textContent = fullDate
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

    const startIntro = ({ name = subjectName, navigateTo = "", autoPilot = false } = {}) => {
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
            <div class="fm-hint">${autoPilot ? `Scanning the perimeter — locating ${name}` : `Take the glass — find ${name}`}</div>
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
        let autoPilotActive = autoPilot

        const lensRadius = () => Math.round(
            Math.min(104, Math.max(82, Math.min(window.innerWidth, window.innerHeight) * 0.12))
        )

        const randomBetween = (minimum, maximum) => minimum + Math.random() * (maximum - minimum)
        const shuffled = (items) => {
            const result = [...items]
            for (let index = result.length - 1; index > 0; index -= 1) {
                const swapIndex = Math.floor(Math.random() * (index + 1))
                ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
            }
            return result
        }

        const autoPath = autoPilot ? (() => {
            const radius = lensRadius()
            const edge = radius + 20
            const width = window.innerWidth
            const height = window.innerHeight
            const horizontalMaximum = Math.max(edge, width - edge)
            const verticalMaximum = Math.max(edge, height - edge)
            const fourSides = shuffled([
                { x: randomBetween(edge, horizontalMaximum), y: edge },
                { x: horizontalMaximum, y: randomBetween(edge, verticalMaximum) },
                { x: randomBetween(edge, horizontalMaximum), y: verticalMaximum },
                { x: edge, y: randomBetween(edge, verticalMaximum) }
            ])

            return [
                { x, y },
                ...fourSides,
                { x: width / 2, y: height / 2 }
            ]
        })() : []
        // Keep the automatic search easy to follow without making the
        // preloader overstay its welcome. Five legs take about 1.6 seconds.
        const autoLegDuration = 320
        const autoStartedAt = performance.now()

        const draw = (time = performance.now()) => {
            const radius = lensRadius()
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2

            if (autoPilotActive) {
                const elapsed = Math.max(0, time - autoStartedAt)
                const segmentIndex = Math.max(0, Math.min(
                    Math.floor(elapsed / autoLegDuration),
                    autoPath.length - 2
                ))
                const segmentProgress = Math.min(1, (elapsed % autoLegDuration) / autoLegDuration)
                const easedProgress = segmentProgress < 0.5
                    ? 2 * segmentProgress * segmentProgress
                    : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2
                const from = autoPath[segmentIndex]
                const to = autoPath[segmentIndex + 1]
                x = from.x + (to.x - from.x) * easedProgress
                y = from.y + (to.y - from.y) * easedProgress

                if (elapsed >= autoLegDuration * (autoPath.length - 1)) {
                    autoPilotActive = false
                    lockOnSubject()
                    return
                }
            } else if (!locked && time - lastMove > 3500) {
                x += (centerX - x) * 0.025
                y += (centerY - y) * 0.025
            }

            lens.style.width = `${radius * 2}px`
            lens.style.height = `${radius * 2}px`
            lens.style.setProperty("--fm-lens-x", `${x - radius}px`)
            lens.style.setProperty("--fm-lens-y", `${y - radius}px`)
            lens.style.transform = "translate3d(var(--fm-lens-x), var(--fm-lens-y), 0) rotate(-10deg)"

            clip.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`
            clip.style.webkitClipPath = `circle(${radius}px at ${x}px ${y}px)`
            magnified.style.transformOrigin = `${x}px ${y}px`
            magnified.style.transform = "scale(1.9)"
            shade.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent ${radius - 4}px, rgba(22,20,15,.26) ${radius + 190}px, rgba(22,20,15,.42) 62%)`

            const distance = Math.hypot(x - centerX, y - centerY)
            if (!autoPilotActive && !locked && distance < radius * 0.58) {
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
            setTimeout(finish, autoPilot ? 300 : 1450)
        }

        const moveLens = (event) => {
            if (locked) return

            // Any real pointer input immediately hands the magnifying glass
            // to the visitor; otherwise the four-side search continues.
            if (autoPilotActive) {
                autoPilotActive = false
                hint.textContent = `You have control — find ${name}`
            }
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
            startIntro({ autoPilot: true })
        }, true)
    }

    // The page is server-rendered HTML, so these small native handlers replace
    // the much larger React hydration runtime that the static snapshot shipped.
    const menuButton = document.querySelector('button[aria-label="Open menu"]')
    const menuPanel = menuButton?.closest("nav")?.nextElementSibling
    const menuBars = menuButton ? Array.from(menuButton.children) : []

    const setMenuOpen = (open) => {
        if (!menuButton || !menuPanel) return

        menuButton.setAttribute("aria-expanded", String(open))
        menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu")
        menuPanel.setAttribute("aria-hidden", String(!open))
        menuPanel.classList.toggle("pointer-events-none", !open)
        menuPanel.classList.toggle("max-h-0", !open)
        menuPanel.classList.toggle("opacity-0", !open)
        menuPanel.classList.toggle("max-h-[600px]", open)
        menuPanel.classList.toggle("opacity-100", open)

        menuBars[0]?.classList.toggle("translate-y-[7px]", open)
        menuBars[0]?.classList.toggle("rotate-45", open)
        menuBars[1]?.classList.toggle("opacity-0", open)
        menuBars[2]?.classList.toggle("-translate-y-[7px]", open)
        menuBars[2]?.classList.toggle("-rotate-45", open)
    }

    menuButton?.addEventListener("click", () => {
        setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true")
    })
    menuPanel?.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false))
    })

    const contactForm = document.querySelector("#contact form")
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]')
        const defaultButtonLabel = submitButton?.textContent || "Send the letter"
        const status = document.createElement("p")
        status.className = "mt-3 font-gothic text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-soft"
        status.setAttribute("role", "status")
        status.setAttribute("aria-live", "polite")
        contactForm.appendChild(status)

        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault()
            const data = new FormData(contactForm)
            if (String(data.get("company") || "")) return

            if (submitButton) {
                submitButton.disabled = true
                submitButton.textContent = "Sending…"
            }
            status.textContent = ""

            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: String(data.get("name") || ""),
                        email: String(data.get("email") || ""),
                        subject: String(data.get("subject") || "Project enquiry"),
                        message: String(data.get("message") || ""),
                        company: ""
                    })
                })
                if (!response.ok) throw new Error("Message failed to send")

                contactForm.reset()
                status.textContent = "Letter sent. Thank you — he’ll be in touch soon."
            } catch {
                status.textContent = "Message could not be sent. Email directly: "
                const emailLink = document.createElement("a")
                emailLink.href = "mailto:nguyenvtt.dev@gmail.com"
                emailLink.textContent = "nguyenvtt.dev@gmail.com"
                emailLink.className = "link-pencil"
                status.appendChild(emailLink)
            } finally {
                if (submitButton) {
                    submitButton.disabled = false
                    submitButton.textContent = defaultButtonLabel
                }
            }
        })
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
            '[data-case-intro], a[href="/case-files/beek-perfumes"], a[href="/case-files/beek-perfumes/"], a[href="/case-files/monkey-tribe"], a[href="/case-files/monkey-tribe/"], a[href="/case-files/porto"], a[href="/case-files/porto/"], a[href="/case-files/ben10hits"], a[href="/case-files/ben10hits/"], a[href="/case-files/rain-architecture"], a[href="/case-files/rain-architecture/"], a[href="/case-files/rdx-company"], a[href="/case-files/rdx-company/"], a[href="/case-files/triosis-digital"], a[href="/case-files/triosis-digital/"]'
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
            projectPath.includes("ben10hits") ? "Ben10Hits" :
            projectPath.includes("rain-architecture") ? "Rain Architecture" :
            projectPath.includes("rdx-company") ? "RDX Company" :
            projectPath.includes("triosis-digital") ? "Triosis Digital" :
            "Beek Perfumes"
        )
        startIntro({
            name: projectName,
            navigateTo: caseLink.href,
            autoPilot: true
        })
    }, true)

    const pageUrl = new URL(window.location.href)
    const skipInitialIntro = pageUrl.searchParams.get("skipIntro") === "1"
    const hasIntroParameter = pageUrl.searchParams.has("intro") || pageUrl.searchParams.has("skipIntro")
    pageUrl.searchParams.delete("intro")
    pageUrl.searchParams.delete("skipIntro")
    if (hasIntroParameter) {
        window.history.replaceState(null, "", `${pageUrl.pathname}${pageUrl.search}${pageUrl.hash}`)
    }

    // Run the cinematic preloader automatically. The lens checks all four
    // randomized edges before moving to the subject in the centre.
    if (!skipInitialIntro) {
        window.addEventListener("rt-intro-done", () => {
            window.setTimeout(animateCurrentDate, 480)
        }, { once: true })
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            requestAnimationFrame(() => animateCurrentDate())
        }
        requestAnimationFrame(() => startIntro({ autoPilot: true }))
    } else {
        requestAnimationFrame(() => animateCurrentDate())
    }
})()
