// ../../../../../packages/protocol/dist/version.js
var PROVIDER_GLOBAL = "claude";

// ../../../../../packages/protocol/dist/storage.js
var STORAGE_KEY_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
function isValidStorageKey(key) {
  return typeof key === "string" && STORAGE_KEY_RE.test(key);
}

// ../../../../../packages/protocol/dist/errors.js
var BYOPErrorCode = {
  /** User rejected the connect/consent request. (≈ 4001) */
  USER_REJECTED: 4001,
  /** Origin is not connected / has no grant for this method. (≈ 4100) */
  UNAUTHORIZED: 4100,
  /** Method exists but the origin's scope doesn't cover it (model/tool not granted). */
  SCOPE_EXCEEDED: 4110,
  /** A per-action write consent was denied by the user. */
  CONSENT_DENIED: 4120,
  /** Budget or rate limit hit (tokens/day or calls/min). */
  BUDGET_EXCEEDED: 4290,
  /** Unknown method. (≈ 4200) */
  UNSUPPORTED_METHOD: 4200,
  /** Bad params. (≈ -32602) */
  INVALID_PARAMS: -32602,
  /** The sidekick daemon is not installed / not reachable. The SDK maps this to its
   *  "install the sidekick" fallback. */
  PROVIDER_UNAVAILABLE: 4900,
  /** Backend error (model/tool failed for a non-policy reason). */
  BACKEND_ERROR: 4500
};

// ../../../../../packages/sdk/dist/connect-chip.js
function rungFromError(e) {
  if (e?.code !== BYOPErrorCode.PROVIDER_UNAVAILABLE)
    return null;
  return e?.data?.reason === "unpaired" ? { kind: "unpaired" } : { kind: "unreachable" };
}
var CHROME_STORE_URL = "https://chromewebstore.google.com/detail/injmjolmnekmahlnackakiamjepegagb";
var RELAY_DMG_URL = "https://github.com/sameeeeeeep/switchboard/releases/latest/download/Switchboard.dmg";
var STYLE = `
:host { all: initial; }
* { box-sizing: border-box; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
.chip, .btn { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; border: 0;
  font-size: 13px; font-weight: 600; line-height: 1; border-radius: 10px; }
/* The canonical connect lockup \u2014 the SAME mark + wordmark on every wrapp, so users recognize
   "Connect Switchboard" the way they knew the MetaMask button. Dark pill, lime glyph, locked in
   the shadow root so a host app can't restyle it away. */
.btn { padding: 9px 15px 9px 11px; background: #12151C; color: #E8EDF4; border: 1px solid #2C3444; }
.btn.connect:hover { background: #161B24; border-color: #3A4A18; }
.btn.get { color: #C3CAD6; border-color: #262C38; }
.btn.get:hover { color: #E8EDF4; border-color: #3A4353; }
.btn .arr { color: #6E7C90; font-weight: 500; margin-left: -2px; }
/* The Switchboard mark: lime rounded square with the top-right notch (matches the side-panel brand).
   Muted to slate when the sidekick isn't installed yet \u2014 the mark "lights up" once you can connect. */
.glyph { position: relative; width: 16px; height: 16px; border-radius: 5px; background: #C8F250;
  box-shadow: 0 0 12px rgba(200,242,80,.45); flex: none; }
.glyph::after { content: ""; position: absolute; top: 4px; right: 4px; width: 4px; height: 4px;
  border-radius: 50%; background: #0A0C10; }
.btn.get .glyph { background: #6E7C90; box-shadow: none; }
.wrap { position: relative; display: inline-block; }
.chip { background: #1A1F29; border: 1px solid #262C38; padding: 6px 10px 6px 7px; color: #E8EDF4; }
.chip:hover { border-color: #3A4353; }
.av { width: 26px; height: 26px; border-radius: 7px; background: #C8F250; color: #0A0C10; display: grid;
  place-items: center; font-weight: 700; font-size: 12px; overflow: hidden; flex: none; }
.av img { width: 100%; height: 100%; object-fit: cover; }
.who { display: flex; flex-direction: column; gap: 3px; min-width: 0; text-align: left; }
.who .hi { font-size: 12.5px; font-weight: 600; white-space: nowrap; }
.who .proj { font-size: 10.5px; font-weight: 500; color: #99A3B7; white-space: nowrap; }
.caret { color: #6E7C90; font-size: 9px; margin-left: 2px; }
.menu { position: absolute; top: calc(100% + 6px); right: 0; z-index: 2147483000; width: 232px;
  background: #1A1F29; border: 1px solid #262C38; border-radius: 12px; padding: 7px;
  box-shadow: 0 18px 40px -20px rgba(0,0,0,.7); }
.menu .lbl { padding: 8px 10px 6px; font-size: 10px; font-weight: 600; letter-spacing: .06em;
  text-transform: uppercase; color: #6E7C90; }
.menu .proj-row { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 8px;
  background: #20262F; cursor: pointer; border: 0; width: 100%; color: #E8EDF4; font-size: 13px; font-weight: 600; }
.menu .proj-row:hover { background: #262d38; }
.menu .proj-row .go { margin-left: auto; color: #C8F250; font-size: 11px; font-weight: 600; }
.menu .sep { height: 1px; background: #262C38; margin: 6px 4px; }
.menu .item { display: block; width: 100%; text-align: left; padding: 8px 10px; border: 0; border-radius: 8px;
  background: transparent; color: #B4BECE; font-size: 13px; font-weight: 500; cursor: pointer; }
.menu .item:hover { background: #20262F; color: #E8EDF4; }
.menu .foot { padding: 8px 10px 4px; font-size: 11px; font-weight: 500; color: #6E7C90; line-height: 1.4; }
/* Setup-ladder pills (sidekick asleep / unpaired): quiet and informative, never red \u2014 nothing is
   broken. Amber only while the daemon is unreachable; the glyph stays muted until it's reachable. */
.dot { width: 7px; height: 7px; border-radius: 50%; background: #E8B84B; flex: none;
  box-shadow: 0 0 8px rgba(232,184,75,.45); }
.menu .body { padding: 8px 10px 2px; font-size: 12px; font-weight: 500; color: #B4BECE; line-height: 1.45; }
`;
function mountConnect(target, opts = {}) {
  const installUrl = opts.installUrl ?? "https://thelastprompt.ai/switchboard/";
  const host = document.createElement("div");
  host.style.display = "inline-block";
  const root = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = STYLE;
  root.append(style);
  const mount = document.createElement("div");
  root.append(mount);
  target.append(host);
  let state2 = { kind: "booting" };
  let menuOpen = false;
  let destroyed = false;
  let relay2 = null;
  let seq = 0;
  let wasConnected = false;
  let lastProjectKey;
  let sessionDisconnected = false;
  const onDocClick = (e) => {
    if (menuOpen && !host.contains(e.target)) {
      menuOpen = false;
      render2();
    }
  };
  document.addEventListener("click", onDocClick);
  const initEvent = `${PROVIDER_GLOBAL}#initialized`;
  let lateWatching = false;
  const onLateInit = () => {
    lateWatching = false;
    window.removeEventListener(initEvent, onLateInit);
    if (!destroyed)
      void refresh();
  };
  function watchForLateProvider() {
    if (lateWatching || destroyed)
      return;
    lateWatching = true;
    window.addEventListener(initEvent, onLateInit);
  }
  function el3(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls)
      n.className = cls;
    if (text != null)
      n.textContent = text;
    return n;
  }
  async function refresh() {
    const my = ++seq;
    const r = await whenRelayReady(2500, { installUrl });
    if (destroyed || my !== seq)
      return;
    if (!(r instanceof Relay)) {
      watchForLateProvider();
      state2 = { kind: "not-installed", installUrl };
      return render2();
    }
    relay2 = r;
    subscribe(r);
    const h = await r.health();
    if (destroyed || my !== seq)
      return;
    if (h && !h.reachable) {
      state2 = { kind: "unreachable", appMissing: h.installedHere === false };
      emitTransition(false);
      return render2();
    }
    if (h && !h.paired) {
      state2 = { kind: "unpaired" };
      emitTransition(false);
      return render2();
    }
    let permErr = null;
    const grant = sessionDisconnected ? null : await r.permissions().catch((e) => {
      permErr = e;
      return null;
    });
    if (destroyed || my !== seq)
      return;
    if (!grant) {
      const rung = !h ? rungFromError(permErr) : null;
      if (rung) {
        state2 = rung;
        emitTransition(false);
        return render2();
      }
      state2 = { kind: "disconnected", relay: r };
      emitTransition(false);
      return render2();
    }
    const wantsContext = opts.context !== "none";
    const [user, project] = await Promise.all([
      r.identity(),
      wantsContext ? r.context.active().catch(() => null) : Promise.resolve(null)
    ]);
    if (destroyed || my !== seq)
      return;
    const wasAlreadyConnected = wasConnected;
    state2 = { kind: "connected", relay: r, user, project };
    emitTransition(true);
    const projKey = project ? project.id ?? project.name : null;
    if (wasAlreadyConnected && lastProjectKey !== void 0 && projKey !== lastProjectKey)
      opts.onProjectChange?.(project);
    lastProjectKey = projKey;
    render2();
  }
  function emitTransition(connected) {
    if (connected === wasConnected)
      return;
    wasConnected = connected;
    if (connected && relay2)
      opts.onConnect?.(relay2);
    else if (!connected)
      opts.onDisconnect?.();
  }
  let subscribed = false;
  function subscribe(r) {
    if (subscribed)
      return;
    subscribed = true;
    r.on("permissionsChanged", () => {
      void refresh();
    });
    r.on("disconnect", () => {
      void refresh();
    });
    r.on("health", () => {
      void refresh();
    });
  }
  async function doConnect() {
    if (!relay2)
      return;
    try {
      sessionDisconnected = false;
      await relay2.connect(opts.scope);
      await refresh();
    } catch (e) {
      const err = e;
      if (err?.code !== BYOPErrorCode.PROVIDER_UNAVAILABLE)
        return;
      await refresh();
      if (state2.kind === "disconnected") {
        const rung = rungFromError(err);
        if (rung) {
          state2 = rung;
          emitTransition(false);
          render2();
        }
      }
    }
  }
  async function doPick() {
    if (!relay2)
      return;
    menuOpen = false;
    render2();
    await relay2.context.pick().catch(() => null);
    await refresh();
  }
  async function doDisconnect() {
    if (!relay2)
      return;
    menuOpen = false;
    sessionDisconnected = true;
    await relay2.disconnect().catch(() => {
    });
    await refresh();
  }
  function render2() {
    if (destroyed)
      return;
    mount.textContent = "";
    if (state2.kind === "booting")
      return;
    if (state2.kind === "not-installed") {
      const url = state2.installUrl;
      const wrap2 = el3("div", "wrap");
      const b = el3("button", "btn get");
      b.append(el3("span", "glyph"), el3("span", void 0, "Get Switchboard"), el3("span", "arr", "\u2197"));
      b.onclick = (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        render2();
      };
      wrap2.append(b);
      if (menuOpen) {
        const menu = el3("div", "menu");
        menu.append(el3("div", "body", "Two parts: the Chrome extension, then Switchboard for Mac."));
        const store = el3("button", "item", "1 \xB7 Add to Chrome \u2197");
        store.onclick = () => {
          menuOpen = false;
          render2();
          window.open(CHROME_STORE_URL, "_blank", "noopener");
        };
        const guide = el3("button", "item", "2 \xB7 Get Switchboard for Mac \u2197");
        guide.onclick = () => {
          menuOpen = false;
          render2();
          window.open(url, "_blank", "noopener");
        };
        menu.append(store, guide);
        wrap2.append(menu);
      }
      mount.append(wrap2);
      return;
    }
    if (state2.kind === "unreachable") {
      const appMissing = state2.appMissing === true;
      const wrap2 = el3("div", "wrap");
      const b = el3("button", "btn get");
      b.append(el3("span", "glyph"), el3("span", void 0, appMissing ? "Get Switchboard for Mac" : "Your sidekick is asleep"), el3("span", appMissing ? "arr" : "dot", appMissing ? "\u2197" : void 0), ...appMissing ? [] : [el3("span", "caret", "\u25BE")]);
      b.onclick = (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        render2();
      };
      wrap2.append(b);
      if (menuOpen) {
        const menu = el3("div", "menu");
        if (appMissing) {
          menu.append(el3("div", "body", "Extension \u2713 \u2014 now the other half: Switchboard, the Mac app that holds your Claude."));
          const dl = el3("button", "item", "Download Switchboard.dmg \u2197");
          dl.onclick = () => {
            menuOpen = false;
            render2();
            window.open(RELAY_DMG_URL, "_blank", "noopener");
          };
          menu.append(dl, el3("div", "sep"));
        } else {
          menu.append(el3("div", "body", "Open the Switchboard menubar app to wake it."));
          const retry = el3("button", "item", "Retry");
          retry.onclick = () => {
            menuOpen = false;
            render2();
            void refresh();
          };
          menu.append(retry, el3("div", "sep"));
        }
        const setup = el3("button", "item", "New here? Full setup \u2197");
        setup.onclick = () => {
          menuOpen = false;
          render2();
          window.open(installUrl, "_blank", "noopener");
        };
        menu.append(setup);
        wrap2.append(menu);
      }
      mount.append(wrap2);
      return;
    }
    if (state2.kind === "unpaired") {
      const wrap2 = el3("div", "wrap");
      const b = el3("button", "btn connect");
      b.append(el3("span", "glyph"), el3("span", void 0, "Almost there \u2014 pair in the side panel"), el3("span", "caret", "\u25BE"));
      b.onclick = (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        render2();
      };
      wrap2.append(b);
      if (menuOpen) {
        const menu = el3("div", "menu");
        menu.append(el3("div", "body", "Click the Switchboard icon in your Chrome toolbar and paste your pairing token."));
        const retry = el3("button", "item", "Retry");
        retry.onclick = () => {
          menuOpen = false;
          render2();
          void refresh();
        };
        menu.append(retry);
        wrap2.append(menu);
      }
      mount.append(wrap2);
      return;
    }
    if (state2.kind === "disconnected") {
      const b = el3("button", "btn connect");
      b.append(el3("span", "glyph"), el3("span", void 0, "Connect Switchboard"));
      b.onclick = doConnect;
      mount.append(b);
      return;
    }
    const { user, project } = state2;
    const rawName = user?.name?.trim();
    const collides = !!rawName && !!project?.name && rawName.toLowerCase() === project.name.toLowerCase();
    const name = !rawName || collides ? "there" : rawName;
    const wrap = el3("div", "wrap");
    const chip = el3("button", "chip");
    const av = el3("div", "av");
    if (user?.avatar) {
      const img = el3("img");
      img.src = user.avatar;
      img.alt = name;
      av.append(img);
    } else
      av.textContent = name.charAt(0).toUpperCase();
    const wantsContext = opts.context !== "none";
    const who = el3("div", "who");
    who.append(el3("div", "hi", `Hi ${name}`));
    who.append(el3("div", "proj", wantsContext ? project ? project.name : "No context lent" : "Connected"));
    chip.append(av, who, el3("span", "caret", "\u25BE"));
    chip.onclick = (e) => {
      e.stopPropagation();
      menuOpen = !menuOpen;
      render2();
    };
    wrap.append(chip);
    if (menuOpen) {
      const menu = el3("div", "menu");
      if (wantsContext) {
        menu.append(el3("div", "lbl", "Working on"));
        const row = el3("button", "proj-row");
        row.append(el3("span", void 0, project ? project.name : "Choose a context"));
        row.append(el3("span", "go", project ? "Switch \u25B8" : "Choose \u25B8"));
        row.onclick = doPick;
        menu.append(row, el3("div", "sep"));
      }
      const dc = el3("button", "item", "Disconnect this app");
      dc.onclick = doDisconnect;
      menu.append(dc);
      menu.append(el3("div", "foot", "Connectors, budgets & activity live in the Switchboard toolbar panel."));
      wrap.append(menu);
    }
    mount.append(wrap);
  }
  render2();
  void refresh();
  return {
    refresh: () => void refresh(),
    destroy: () => {
      destroyed = true;
      document.removeEventListener("click", onDocClick);
      window.removeEventListener(initEvent, onLateInit);
      host.remove();
    }
  };
}

// ../../../../../packages/sdk/dist/index.js
var warnedStorageKeys = /* @__PURE__ */ new Set();
function warnBadStorageKey(key) {
  if (isValidStorageKey(key) || warnedStorageKeys.has(key))
    return;
  warnedStorageKeys.add(key);
  const suggestion = String(key).replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[^A-Za-z0-9]+/, "") || "key";
  console.warn(`[relay.storage] invalid key ${JSON.stringify(key)} \u2014 this write/read WILL be rejected by the daemon and silently do nothing.
  Keys map 1:1 to files (<key>.json) in this origin's folder, so they must match ${STORAGE_KEY_RE}.
  ":" is not allowed (illegal on NTFS; "a:b" is Alternate Data Stream syntax on Windows). Try ${JSON.stringify(suggestion)}.`);
}
var Relay = class {
  provider;
  constructor(provider) {
    this.provider = provider;
  }
  get version() {
    return this.provider.version;
  }
  capabilities() {
    return this.provider.request({ method: "claude_capabilities" });
  }
  connect(scope) {
    return this.provider.request({ method: "claude_connect", params: scope });
  }
  /** Drop this app's connection for the current page session. The grant persists (a later connect()
   *  won't reprompt) — this is "disconnect from this tab", not "revoke". Full revoke lives in the panel. */
  disconnect() {
    return this.provider.request({ method: "claude_disconnect" });
  }
  permissions() {
    return this.provider.request({ method: "claude_permissions" });
  }
  /** The setup-ladder snapshot (reachable/paired/connected), answered by the EXTENSION from its
   *  own state — never the daemon — so it resolves fast (<1s) in every degraded state, including
   *  the ones where every other method would hang. Resolves null when the extension is too old to
   *  know `claude_health` (or its worker is unreachable): callers MUST treat null as "unknown"
   *  and fall back to probing permissions() exactly as before — that skew guard is load-bearing
   *  while store users run an older extension against newer app bundles. */
  health() {
    const answer = this.provider.request({ method: "claude_health" }).catch(() => null);
    const timer = new Promise((resolve) => setTimeout(() => resolve(null), 1500));
    return Promise.race([answer, timer]);
  }
  /** The paired user's public identity (name/avatar), or null if unavailable. Convenience over
   *  capabilities().user — what the connect chip greets with ("Hi Sameep"). */
  identity() {
    return this.capabilities().then((c) => c.user ?? null).catch(() => null);
  }
  /** Synthesize speech ON-DEVICE via a local model/engine (no cloud, no connector, no credits).
   *  Returns audio as a playable data: URL, or null if no local TTS is available.
   *
   *    const clip = await relay.speak("hey, it's Maya");
   *    if (clip) new Audio(clip.audio).play();
   */
  speak(text, opts) {
    return this.provider.request({ method: "claude_speak", params: { text, voice: opts?.voice } }).catch(() => null);
  }
  listTools() {
    return this.provider.request({ method: "claude_listTools" }).then((r) => r.tools);
  }
  callTool(name, args) {
    const call = { name, arguments: args };
    return this.provider.request({ method: "claude_callTool", params: call });
  }
  complete(params) {
    return this.provider.request({ method: "claude_complete", params });
  }
  /** Streamed completion as an async iterator of deltas. Ends after a `done`/`error` delta. */
  async *stream(params) {
    const { streamId } = await this.provider.request({ method: "claude_stream", params });
    const queue = [];
    let notify = null;
    let ended = false;
    const handler = (payload) => {
      const p = payload;
      if (p.streamId !== streamId)
        return;
      queue.push(p);
      if (p.type === "done" || p.type === "error")
        ended = true;
      notify?.();
    };
    this.provider.on("delta", handler);
    try {
      while (true) {
        if (queue.length === 0) {
          if (ended)
            break;
          await new Promise((r) => notify = r);
          notify = null;
          continue;
        }
        yield queue.shift();
      }
    } finally {
      this.provider.removeListener("delta", handler);
    }
  }
  on(event, handler) {
    this.provider.on(event, handler);
  }
  /**
   * Per-origin local storage — a private on-disk key/value store for this app, plus `bind` to point
   * it at a real folder the user picks. Values are opaque strings (store JSON). Isolated per origin;
   * reads are free, writes need the site not to be read-only, and `bind` prompts for the exact path.
   *
   *   await relay.storage.set("workspace", JSON.stringify(data));
   *   const raw = await relay.storage.get("workspace");
   *   await relay.storage.bind("~/Documents/Projects/brandbrain/.data"); // existing files appear as records
   */
  get storage() {
    const req = (params) => this.provider.request({ method: "claude_storage", params });
    const k = (key) => {
      warnBadStorageKey(key);
      return key;
    };
    return {
      get: (key) => req({ op: "get", key: k(key) }).then((r) => r.value ?? null),
      set: (key, value) => req({ op: "set", key: k(key), value }).then(() => void 0),
      delete: (key) => req({ op: "delete", key: k(key) }).then((r) => r.ok),
      list: () => req({ op: "list" }).then((r) => r.keys ?? []),
      info: () => req({ op: "info" }).then((r) => r.info),
      /** Point this app's store at a real folder (triggers a path-consent click). */
      bind: (path) => req({ op: "bind", path }).then((r) => r.info),
      /** Open a NATIVE folder chooser on the daemon's machine (macOS today). The user picking a
       *  folder in an OS dialog that names this origin IS the path consent, so a successful pick
       *  comes back already bound. Resolves undefined on cancel or when no native picker exists —
       *  keep a typed-path `bind` as the fallback UI. */
      pick: (reason) => req({ op: "pick", reason }).then((r) => r.info).catch(() => void 0)
    };
  }
  /**
   * Shared, cross-app context — your portable brand knowledge. Publish a whole context; read the one
   * the user selected for this app; or open the picker. Selection happens in the side panel, so an
   * app only ever receives the context the user chose to lend it — never the whole library.
   *
   *   await relay.context.publish({ name: "Aamras", kind: "brand", data: brand });
   *   const active = await relay.context.active();   // the brand the user loaded for this app, or null
   */
  get context() {
    const req = (params) => this.provider.request({ method: "claude_context", params });
    return {
      publish: (context) => req({ op: "publish", context }).then((r) => r.id),
      list: () => req({ op: "list" }).then((r) => r.contexts ?? []),
      active: () => req({ op: "active" }).then((r) => r.context ?? null),
      pick: () => req({ op: "pick" }).then((r) => r.context ?? null),
      /** Read ONE context listed via `list()` in full, and make it this app's selection. Needs the
       *  kind granted at connect (ScopeRequest.contextKinds) — powers in-app brand dropdowns. */
      use: (id) => req({ op: "use", id }).then((r) => r.context ?? null)
    };
  }
};
var DEFAULT_INSTALL_URL = "https://thelastprompt.ai/switchboard/";
function getRelay(opts) {
  const provider = globalThis[PROVIDER_GLOBAL];
  if (provider?.isRelay)
    return new Relay(provider);
  return { installed: false, installUrl: opts?.installUrl ?? DEFAULT_INSTALL_URL };
}
function whenRelayReady(timeoutMs = 3e3, opts) {
  const now = getRelay(opts);
  if (now instanceof Relay)
    return Promise.resolve(now);
  return new Promise((resolve) => {
    const onInit = () => {
      cleanup();
      resolve(getRelay(opts));
    };
    const timer = setTimeout(() => {
      cleanup();
      resolve({ installed: false, installUrl: opts?.installUrl ?? DEFAULT_INSTALL_URL });
    }, timeoutMs);
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener(`${PROVIDER_GLOBAL}#initialized`, onInit);
    }
    window.addEventListener(`${PROVIDER_GLOBAL}#initialized`, onInit);
  });
}

// src/kit/recorder.js
var STYLE_ID = "__wrapp_kit_recorder";
var CSS = `
.rec { border: 1px solid var(--edge); background: var(--inset); border-radius: 14px; padding: 13px 14px; }
.rec video { width: 100%; max-height: 340px; border-radius: 10px; background: #000; display: block; }
.rec .rec-row { display: flex; align-items: center; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
.rec .rec-btn { display: inline-flex; align-items: center; gap: 7px; font: 600 12.5px/1 var(--sans); background: var(--accent); color: var(--page); border: 0; border-radius: 10px; padding: 10px 15px; cursor: pointer; }
.rec .rec-btn.stop { background: var(--danger); color: #fff; }
.rec .rec-ghost { font: 500 11.5px/1 var(--mono); background: none; border: 1px solid var(--edge); border-radius: 999px; color: var(--ink-sec); padding: 8px 12px; cursor: pointer; }
.rec .rec-ghost:hover { border-color: var(--accent); color: var(--ink); }
.rec .rec-time { font: 500 12px/1 var(--mono); color: var(--ink-sec); display: inline-flex; align-items: center; gap: 6px; }
.rec .rec-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--danger); animation: recblink 1.1s steps(2) infinite; }
@keyframes recblink { 50% { opacity: .2; } }
.rec .rec-hint { font: 400 11.5px/1.6 var(--mono); color: var(--ink-faint); margin-top: 8px; }
.rec .rec-err { color: var(--danger); font: 400 12px/1.6 var(--mono); margin-top: 8px; }
`;
function mountRecorder(host, opts = {}) {
  const mode = opts.mode === "camera" ? "camera" : "screen";
  const maxSeconds = Number(opts.maxSeconds) > 0 ? Number(opts.maxSeconds) : 180;
  const fileName = opts.fileName || "take.webm";
  if (!document.getElementById(STYLE_ID)) {
    const st = document.createElement("style");
    st.id = STYLE_ID;
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  const el3 = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const fmt = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  const root = el3("div", "rec");
  host.append(root);
  let stream = null, recorder = null, chunks = [], url = null, timerI = null, startedAt = 0;
  function stopTracks() {
    if (stream) for (const t of stream.getTracks()) t.stop();
    stream = null;
  }
  function cleanup() {
    if (timerI) clearInterval(timerI);
    timerI = null;
    try {
      if (recorder && recorder.state !== "inactive") recorder.stop();
    } catch {
    }
    recorder = null;
    stopTracks();
  }
  function renderIdle(err) {
    root.textContent = "";
    const row = el3("div", "rec-row");
    const go = el3("button", "rec-btn", mode === "camera" ? "\u25CF Record camera" : "\u25CF Record screen");
    go.onclick = begin;
    row.append(go, el3("span", "rec-time", "up to " + fmt(maxSeconds)));
    root.append(row);
    if (opts.hint) root.append(el3("div", "rec-hint", opts.hint));
    root.append(el3("div", "rec-hint", "Recorded locally in your browser \u2014 nothing uploads anywhere."));
    if (err) root.append(el3("div", "rec-err", err));
  }
  function renderLive() {
    root.textContent = "";
    const v = el3("video");
    v.muted = true;
    v.autoplay = true;
    v.playsInline = true;
    v.srcObject = stream;
    if (mode === "camera") v.style.transform = "scaleX(-1)";
    root.append(v);
    const row = el3("div", "rec-row");
    const stopB = el3("button", "rec-btn stop", "\u25A0 Stop");
    stopB.onclick = stop;
    const time = el3("span", "rec-time");
    time.append(el3("span", "rec-dot"), el3("span", null, "0:00 / " + fmt(maxSeconds)));
    row.append(stopB, time);
    root.append(row);
  }
  function renderDone() {
    root.textContent = "";
    const v = el3("video");
    v.controls = true;
    v.src = url;
    v.playsInline = true;
    root.append(v);
    const row = el3("div", "rec-row");
    const dl = el3("button", "rec-btn", "\u2B07 Download");
    dl.onclick = () => {
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    };
    const again = el3("button", "rec-ghost", "\u27F2 re-take");
    again.onclick = begin;
    row.append(dl, again);
    root.append(row);
  }
  async function begin() {
    cleanup();
    chunks = [];
    if (url) {
      URL.revokeObjectURL(url);
      url = null;
    }
    try {
      if (mode === "camera") {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 } }, audio: true });
      } else {
        const display = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
        let mic = null;
        try {
          mic = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch {
        }
        stream = new MediaStream([...display.getVideoTracks(), ...mic ? mic.getAudioTracks() : []]);
        display.getVideoTracks()[0].addEventListener("ended", stop);
      }
    } catch (e) {
      renderIdle(e && e.name === "NotAllowedError" ? "capture permission declined \u2014 try again when ready" : String(e?.message || e).slice(0, 120));
      return;
    }
    const mime = window.MediaRecorder && MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus") ? "video/webm;codecs=vp9,opus" : "video/webm";
    recorder = new MediaRecorder(stream, { mimeType: mime });
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size) chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      url = URL.createObjectURL(blob);
      stopTracks();
      renderDone();
      if (opts.onDone) opts.onDone(blob, url);
    };
    recorder.start(250);
    startedAt = Date.now();
    renderLive();
    timerI = setInterval(() => {
      const s = (Date.now() - startedAt) / 1e3;
      const t = root.querySelector(".rec-time span:last-child");
      if (t) t.textContent = fmt(s) + " / " + fmt(maxSeconds);
      if (s >= maxSeconds) stop();
    }, 250);
  }
  function stop() {
    if (timerI) clearInterval(timerI);
    timerI = null;
    try {
      if (recorder && recorder.state !== "inactive") recorder.stop();
    } catch {
    }
  }
  renderIdle();
  return {
    destroy() {
      cleanup();
      if (url) URL.revokeObjectURL(url);
      root.remove();
    }
  };
}

// src/kit/ui.js
var el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};
var str = (s) => String(s ?? "").trim();
var STYLE_ID2 = "relay-kit-ui";
var ACCENT = "var(--accent, var(--lime, #C8F250))";
var ACCENT_SOFT = "var(--accent-soft, var(--lime-soft, #232B0D))";
var CSS2 = `
/* zero-specificity base: only applies where the shell styles nothing */
:where(.opts) { display: flex; flex-direction: column; gap: 8px; }
:where(.opt) { position: relative; border: 1px solid var(--edge, #262C38); background: var(--inset, #070809); border-radius: 14px; padding: 13px 14px; cursor: pointer; transition: border-color .15s, background .15s; }
:where(.opt:hover) { border-color: var(--edge-soft, #1C212B); }
:where(.opt.sel) { border-color: ${ACCENT}; background: color-mix(in srgb, ${ACCENT_SOFT} 55%, var(--inset, #070809)); }
:where(.opt .check) { position: absolute; right: 11px; top: 11px; width: 18px; height: 18px; border-radius: 50%; border: 1px solid var(--edge, #262C38); display: grid; place-items: center; color: transparent; font: 700 11px/1 var(--sans, sans-serif); }
:where(.opt.sel .check) { border-color: ${ACCENT}; background: ${ACCENT}; color: var(--page, #0A0C10); }
:where(.opt .rec) { display: inline-block; font: 500 9px/1 var(--mono, monospace); letter-spacing: .1em; text-transform: uppercase; border-radius: 999px; padding: 3px 7px; margin-bottom: 7px; }
:where(.opt .o-label) { font: 600 13.5px/1.3 var(--display, sans-serif); color: var(--ink, #E8EDF4); padding-right: 22px; }
:where(.opt .o-text) { font: 400 13px/1.5 var(--sans, sans-serif); color: var(--ink-sec, #B4BECE); margin-top: 5px; white-space: pre-wrap; word-break: break-word; }
:where(.opt .o-img) { width: 100%; border-radius: 8px; border: 1px solid var(--edge, #262C38); display: block; margin-top: 8px; }
:where(.steer) { margin-top: 16px; display: flex; flex-direction: column; gap: 7px; }
:where(.steer .chips) { display: flex; flex-wrap: wrap; gap: 6px; }
:where(.steer .chip) { font: 500 11px/1 var(--sans, sans-serif); border: 1px solid var(--edge, #262C38); background: var(--panel, #12151C); color: var(--ink-sec, #B4BECE); border-radius: 999px; padding: 6px 10px; cursor: pointer; }
:where(.steer .row) { display: flex; gap: 8px; align-items: center; }
:where(.steer .box) { flex: 1; min-width: 0; display: flex; align-items: center; gap: 8px; border: 1px solid var(--edge, #262C38); background: var(--panel, #12151C); border-radius: 10px; padding: 8px 11px; }
:where(.steer input) { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--ink, #E8EDF4); font: 400 12.5px/1.4 var(--sans, sans-serif); }
:where(.steer .send) { flex: none; font: 600 12px/1 var(--sans, sans-serif); background: ${ACCENT}; color: var(--page, #0A0C10); border: 0; border-radius: 9px; padding: 9px 12px; cursor: pointer; }

/* ---- kit modifiers: normal specificity, these MUST beat the shell ---- */
/* DRAFTED \u2014 a machine suggestion. Neutral ink on a hairline, never the brand accent (rule 5). */
.opt .rec.k-draft { color: var(--ink-dim, #99A3B7); background: transparent; border: 1px dashed var(--edge, #262C38); }
.opt.k-drafted { border-style: dashed; }
.opt.k-drafted:not(.sel) { background: var(--inset, #070809); }
/* CHOSEN \u2014 a human clicked. The shell's own .opt.sel accent rules do the painting; this only adds
   the receipt line, so "who decided this" is never a guess (rule 6). */
.opt .k-by { display: block; font: 500 9px/1 var(--mono, monospace); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-faint, #6E7C90); margin-top: 8px; }
.opt.sel .k-by { color: ${ACCENT}; }
/* ESCAPE HATCH \u2014 the human's own answer. Reads as an option, never as one of the generated ones. */
.opt.k-esc { border-style: dashed; cursor: pointer; }
.opt.k-esc .o-label { color: var(--ink-sec, #B4BECE); }
.opt.k-esc .k-escrow { display: flex; gap: 8px; align-items: center; margin-top: 9px; }
.opt.k-esc .k-escrow input { flex: 1; min-width: 0; background: var(--inset, #070809); border: 1px solid var(--edge, #262C38); border-radius: 9px; color: var(--ink, #E8EDF4); font: 400 12.5px/1.4 var(--sans, sans-serif); padding: 9px 11px; outline: none; }
.opt.k-esc .k-escrow input:focus { border-color: color-mix(in srgb, ${ACCENT} 55%, var(--edge, #262C38)); }
.opt.k-esc .k-escrow .send { flex: none; font: 600 12px/1 var(--sans, sans-serif); background: ${ACCENT}; color: var(--page, #0A0C10); border: 0; border-radius: 9px; padding: 9px 12px; cursor: pointer; }
.opt.k-esc .k-escrow .send:disabled { opacity: .5; cursor: default; }
.opt.k-esc .k-escrow .ghost { flex: none; font: 500 12px/1 var(--sans, sans-serif); background: none; border: 1px solid var(--edge, #262C38); color: var(--ink-dim, #99A3B7); border-radius: 9px; padding: 9px 12px; cursor: pointer; }
`;
function ensureStyle() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID2)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID2;
  s.textContent = CSS2;
  (document.head || document.documentElement).append(s);
}
var idOf = (o) => o && typeof o === "object" ? o.id : o;
function draftIdOf(x) {
  if (Array.isArray(x)) {
    const r = x.find((o) => o && o.recommended);
    return idOf(r || x[0]);
  }
  return idOf(x);
}
function optionCards(a, b, c, d) {
  ensureStyle();
  const o = Array.isArray(a) ? { options: a, chosenId: b, onChoose: c, ...d || {} } : a || {};
  const options = o.options || [];
  const sel = o.sel || null;
  const chosenId = o.chosenId !== void 0 ? o.chosenId : sel ? sel.chosenId : null;
  const draftedId = o.draftedId !== void 0 ? o.draftedId : sel && sel.draftedId !== void 0 ? sel.draftedId : draftIdOf(options);
  const onChoose = o.onChoose || o.onPick || (() => {
  });
  const recLabel = o.recommendedLabel || "recommended";
  const chosenNote = o.chosenNote === void 0 ? "chosen by you" : o.chosenNote;
  const wrap = el("div", "opts");
  wrap.setAttribute("role", "radiogroup");
  for (const opt of options) {
    const locked = chosenId != null && opt.id === chosenId;
    const drafted = !locked && draftedId != null && opt.id === draftedId;
    const card = el("div", "opt" + (locked ? " sel" : "") + (drafted ? " k-drafted" : ""));
    card.setAttribute("role", "radio");
    card.setAttribute("aria-checked", locked ? "true" : "false");
    card.tabIndex = o.disabled ? -1 : 0;
    const pick = () => {
      if (!o.disabled) onChoose(opt);
    };
    card.onclick = pick;
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pick();
      }
    };
    if (o.disabled) card.style.opacity = ".55";
    card.append(el("div", "check", "\u2713"));
    if (drafted || locked && draftedId === opt.id) card.append(el("div", "rec k-draft", recLabel));
    else if (opt.recommended && draftedId == null) card.append(el("div", "rec k-draft", recLabel));
    card.append(el("div", "o-label", opt.label));
    if (opt.text) card.append(el("div", "o-text", opt.text));
    if (opt.imageUrl) {
      const img = el("img", "o-img");
      img.src = opt.imageUrl;
      img.alt = opt.label || "";
      card.append(img);
    }
    if (typeof o.decorate === "function") o.decorate(card, opt);
    if (locked && chosenNote) card.append(el("span", "k-by", chosenNote));
    wrap.append(card);
  }
  if (o.escape) wrap.append(escapeHatch(o.escape));
  return wrap;
}
function escapeHatch(opts) {
  ensureStyle();
  const o = opts || {};
  const label = o.label || "none of these \u2014 say what you'd do instead";
  const card = el("div", "opt k-esc");
  card.append(el("div", "o-label", label));
  if (o.hint) card.append(el("div", "o-text", o.hint));
  const row = el("div", "k-escrow");
  row.hidden = true;
  const input = el("input");
  input.type = "text";
  input.placeholder = o.placeholder || "describe what you'd do instead\u2026";
  if (o.prefill) input.value = o.prefill;
  const send = el("button", "send", o.sendLabel || "use this");
  send.type = "button";
  const cancel = el("button", "ghost", "cancel");
  cancel.type = "button";
  row.append(input, send, cancel);
  card.append(row);
  const open = () => {
    if (!row.hidden) return;
    row.hidden = false;
    input.focus();
    input.select();
  };
  const close = () => {
    row.hidden = true;
  };
  card.onclick = (e) => {
    if (e.target.closest(".k-escrow")) return;
    open();
  };
  card.onkeydown = (e) => {
    if (e.target === card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      open();
    }
  };
  card.tabIndex = 0;
  let busy = false;
  const submit = () => {
    const text = str(input.value);
    if (!text || busy) return;
    const option = { id: "custom", label: text, text: "", custom: true };
    const out = typeof o.onSubmit === "function" ? o.onSubmit(text, option) : null;
    if (out && typeof out.then === "function") {
      busy = true;
      const was = send.textContent;
      send.disabled = true;
      send.textContent = "\u2026";
      out.finally(() => {
        busy = false;
        send.disabled = false;
        send.textContent = was;
        close();
      });
    } else {
      close();
    }
  };
  send.onclick = submit;
  cancel.onclick = close;
  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };
  card.open = open;
  card.close = close;
  card.value = () => str(input.value);
  return card;
}

// src/take.js
var APP = {
  id: "take",
  // = build.mjs entry name = ./dist/<id>.js in the html
  name: "Take",
  installUrl: "https://thelastprompt.ai/switchboard/",
  scope: {
    reason: "Take \u2014 drafts a recording script on your own Claude; the capture stays local in your browser",
    models: ["sonnet"],
    tools: []
  },
  usesContext: "single"
  // a lent context grounds the script (optional)
};
var $ = (id) => document.getElementById(id);
var el2 = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};
var uid = () => Math.random().toString(36).slice(2, 9);
var msg = (e) => String(e?.message || e).slice(0, 160);
var toastT = null;
function toast(text, err) {
  clearTimeout(toastT);
  let t = document.querySelector(".toast");
  if (!t) {
    t = el2("div", "toast");
    document.body.append(t);
  }
  t.className = "toast" + (err ? " err" : "");
  t.textContent = text;
  toastT = setTimeout(() => t.remove(), 3200);
}
var relay = null;
var notInstalled = false;
var brand = null;
var wired = false;
mountConnect($("chip-dock"), {
  scope: APP.scope,
  context: APP.usesContext,
  installUrl: APP.installUrl,
  onConnect: (r) => {
    relay = r;
    wire(r);
    void onReady();
  },
  onDisconnect: () => {
    relay = null;
    render();
  },
  onProjectChange: () => {
    void syncContext();
  }
});
(async () => {
  const r = await whenRelayReady(2e3, { installUrl: APP.installUrl });
  if (r && "connect" in r) {
    const grant = await r.permissions().catch(() => null);
    if (grant) {
      relay = r;
      wire(r);
      void onReady();
      return;
    }
  } else if (r && r.installed === false) notInstalled = true;
  render();
})();
function wire(r) {
  if (wired) return;
  wired = true;
  r.on("permissionsChanged", () => void syncContext());
}
var hydrated = false;
async function onReady() {
  await syncContext();
  if (!hydrated) {
    hydrated = true;
    await loadState();
  }
  render();
  autostart();
}
async function syncContext() {
  if (!relay) return;
  if (APP.usesContext === "single") brand = await relay.context.active().catch(() => null);
  render();
}
var state = { premises: null, premiseError: null, run: null };
async function loadState() {
  if (running || premLoading) return;
  try {
    const raw = await relay.storage.get(APP.id + "-state");
    if (raw) state = Object.assign({ premises: null, premiseError: null, run: null }, JSON.parse(raw));
  } catch {
    state = { premises: null, premiseError: null, run: null };
  }
}
async function saveState() {
  try {
    await relay.storage.set(APP.id + "-state", JSON.stringify(state));
  } catch {
  }
}
var STREAM_TIMEOUT_MS = 18e4;
async function streamText(params, onProgress) {
  const it = relay.stream(params);
  let text = "", settled = false, timer = null;
  try {
    return await Promise.race([
      (async () => {
        for await (const d of it) {
          if (d.type === "text") {
            text += d.text;
            onProgress && onProgress({ text });
          } else if (d.type === "tool_proposed") {
            onProgress && onProgress({ tool: d.call?.name });
          } else if (d.type === "error") throw new Error(d.error?.message || "stream error");
        }
        settled = true;
        return text;
      })(),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          if (settled) return;
          try {
            it.return?.();
          } catch {
          }
          reject(new Error("Switchboard didn't respond \u2014 is the sidekick running? Reload this tab and try again."));
        }, STREAM_TIMEOUT_MS);
      })
    ]);
  } finally {
    clearTimeout(timer);
  }
}
async function askJsonArray(parts) {
  return parseJsonArray(await streamText({ prompt: parts.filter(Boolean).join("\n\n") }));
}
function parseJsonArray(text) {
  const t = String(text || "").replace(/```[a-z]*\n?/gi, "").trim();
  const s = t.indexOf("["), e = t.lastIndexOf("]");
  if (s === -1 || e <= s) return null;
  try {
    const a = JSON.parse(t.slice(s, e + 1));
    return Array.isArray(a) ? a : null;
  } catch {
    return null;
  }
}
function researching(status) {
  const r = el2("div", "researching");
  r.append(el2("div", "scan"), el2("span", null, status || "working\u2026"));
  return r;
}
function steerRow(onSteer, chips) {
  const wrap = el2("div", "steer");
  wrap.append(el2("span", "kicker", "not quite? steer it"));
  const row1 = el2("div", "chips");
  for (const s of chips || STEER_CHIPS) {
    const c = el2("button", "chip", s);
    c.onclick = () => onSteer(s);
    row1.append(c);
  }
  wrap.append(row1);
  const row = el2("div", "row");
  const box = el2("div", "box");
  const input = el2("input");
  input.placeholder = "tell it what to change\u2026";
  const send = () => {
    const t = input.value.trim();
    if (!t) return;
    input.value = "";
    onSteer(t);
  };
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
  box.append(input);
  const btn = el2("button", "send", "send");
  btn.onclick = send;
  row.append(box, btn);
  wrap.append(row);
  return wrap;
}
function connectSteps() {
  const card = el2("div", "steps-card");
  const steps = el2("div", "steps");
  const s1 = el2("div");
  s1.innerHTML = notInstalled ? "<b>1</b> \xB7 Install Switchboard (button, top-right)" : "<b>1</b> \xB7 Connect Switchboard (top-right) \u2014 lends this page your Claude";
  const s2 = el2("div");
  s2.innerHTML = "<b>2</b> \xB7 Four takes worth recording appear \u2014 nothing to type";
  const s3 = el2("div");
  s3.innerHTML = "<b>3</b> \xB7 The \u2605 one scripts itself; pick another or steer it";
  steps.append(s1, s2, s3);
  card.append(steps);
  return card;
}
var STEER_CHIPS = ["plainer words", "punchier", "shorter", "different angle"];
var MODES = [
  { key: "screen", label: "Screen + mic", sub: "walk through a product, tool, or flow", maxSeconds: 180, fileName: "take-screen.webm" },
  { key: "camera", label: "Camera + mic", sub: "talk to camera \u2014 intro, pitch, update", maxSeconds: 120, fileName: "take-camera.webm" }
];
var running = false;
var premLoading = false;
var premisesTried = false;
var recHost = null;
function autostart() {
  if (state.run) state.run.status = "";
  render();
  if (state.premises && state.premises.length) {
    premisesTried = true;
    return;
  }
  if (premisesTried) return;
  premisesTried = true;
  void loadPremises();
}
var ctxBlob = (n) => brand ? JSON.stringify(brand.data || {}).slice(0, n || 2200) : "";
async function loadPremises(steer) {
  if (!relay || premLoading) return;
  premLoading = true;
  state.premiseError = null;
  render();
  try {
    const arr = await askJsonArray([
      `You are ${APP.name}. A founder is about to hit record \u2014 screen or camera \u2014 and needs to know WHAT is worth recording right now.`,
      brand ? `THE PROJECT "${brand.name}" \u2014 everything must come from here (its products, voice, audience, positioning): ${ctxBlob()}` : "No project was lent, so propose four takes any small product team could genuinely record this week, and keep them concrete.",
      "Propose 4 takes. Each is a specific, shootable idea \u2014 a named product walked through end to end, a real objection answered out loud, a proof shown live on screen \u2014 not a category and not a topic. Never invent facts beyond what you're given.",
      steer ? `Steer (apply it): "${steer}"` : "",
      'Return ONLY a JSON array \u2014 no prose, no fences. Each element: {"label":<the take, 3-7 words>,"text":<one line: what happens on screen and who it is for>,"recommended":<true for exactly one>}'
    ]);
    if (!arr || !arr.length) throw new Error("no takes came back \u2014 hit \u27F3 other takes");
    const opts = arr.slice(0, 4).map((o) => ({
      id: uid(),
      label: String(o.label || o.title || "A take").slice(0, 70),
      text: String(o.text || o.body || o.description || "").trim().slice(0, 320),
      recommended: !!o.recommended
    }));
    if (!opts.some((o) => o.recommended)) opts[0].recommended = true;
    let seen = false;
    for (const o of opts) {
      if (o.recommended) {
        if (seen) o.recommended = false;
        else seen = true;
      }
    }
    state.premises = opts;
  } catch (e) {
    state.premiseError = msg(e);
  } finally {
    premLoading = false;
    await saveState();
    render();
    const rec = (state.premises || []).find((o) => o.recommended);
    if (rec && !state.run && !running) void start(rec, { auto: true });
  }
}
async function start(premise, opts) {
  if (!relay) return;
  if (running) {
    toast("Still drafting that one \u2014 one sec.");
    return;
  }
  const label = String(premise?.label || "").trim();
  if (!label) {
    toast("Pick a take, or describe one.", true);
    return;
  }
  destroyRecorder();
  state.run = {
    id: uid(),
    premiseId: premise.id || null,
    auto: !!(opts && opts.auto),
    input: label,
    brief: String(premise.text || ""),
    mode: "screen",
    options: null,
    selectedId: null,
    draftedId: null,
    steers: [],
    status: "",
    error: null
  };
  await saveState();
  render();
  await draftScript();
}
async function draftScript(steer) {
  const r = state.run;
  if (!r || !relay) return;
  const mode = MODES.find((m) => m.key === r.mode) || MODES[0];
  if (steer) r.steers.push(steer);
  running = true;
  r.error = null;
  r.status = "drafting the script\u2026";
  render();
  try {
    const arr = await askJsonArray([
      `You are ${APP.name}, scripting a ${mode.label.toLowerCase()} recording (${mode.sub}, up to ${mode.maxSeconds}s).`,
      `WHAT THEY'RE RECORDING: "${r.input}"`,
      r.brief ? `THE PREMISE IN FULL: ${r.brief}` : "",
      brand ? `LENT CONTEXT "${brand.name}" (ground the script in it \u2014 voice, specifics): ${ctxBlob(2500)}` : "",
      "Draft 3 script options, each a genuinely different angle. Each option: a list of BEATS, one per line \u2014 for screen recordings each beat is 'what's on screen \u2014 the spoken line'; for camera each beat is a short spoken line. Plain words a person actually says out loud. Never invent facts beyond what you're given.",
      r.steers.length ? `Steering (apply the latest): ${r.steers.map((s) => `"${s}"`).join(" \u2192 ")}` : "",
      'Return ONLY a JSON array \u2014 no prose, no fences. Each element: {"label":<the angle, 2-5 words>,"text":<the beats, one per line>,"recommended":<true for exactly one>}'
    ]);
    if (!arr || !arr.length) throw new Error("no scripts came back \u2014 try again");
    r.options = arr.slice(0, 3).map((o) => ({ id: uid(), label: String(o.label || "Angle").slice(0, 60), text: String(o.text || "").trim(), recommended: !!o.recommended }));
    if (!r.options.some((o) => o.recommended)) r.options[0].recommended = true;
    r.draftedId = (r.options.find((o) => o.recommended) || r.options[0]).id;
    r.selectedId = null;
  } catch (e) {
    r.error = msg(e);
  } finally {
    running = false;
    r.status = "";
    await saveState();
    render();
  }
}
async function setMode(key) {
  const r = state.run;
  if (!r || running || r.mode === key) return;
  destroyRecorder();
  r.mode = key;
  r.options = null;
  r.selectedId = null;
  r.draftedId = null;
  r.steers = [];
  await saveState();
  render();
  await draftScript();
}
function destroyRecorder() {
  if (recHost) {
    try {
      recHost.handle.destroy();
    } catch {
    }
    recHost = null;
  }
}
function selectedText() {
  const r = state.run;
  const o = (r.options || []).find((x) => x.id === r.selectedId);
  return o ? o.text : "";
}
async function copyScript() {
  try {
    await navigator.clipboard.writeText(selectedText());
    toast("Script copied \u2713");
  } catch {
    toast("Couldn't copy.", true);
  }
}
function render() {
  const hero = $("hero"), view = $("view");
  const r = state.run;
  hero.hidden = !!relay;
  view.textContent = "";
  if (!relay) {
    view.append(connectSteps());
    return;
  }
  const head = el2("div", "runbar");
  head.append(el2("span", "kicker", "what to record"));
  head.append(el2("span", "run-input", brand ? "drawn from " + brand.name : "no context lent \u2014 generic takes"));
  const more = el2("button", "act", "\u27F3 other takes");
  more.disabled = premLoading;
  more.onclick = () => void loadPremises();
  head.append(more);
  view.append(head);
  if (premLoading) view.append(researching("reading " + (brand ? brand.name : "the project") + " for what's worth recording\u2026"));
  if (state.premiseError) {
    view.append(el2("div", "err", state.premiseError));
    const t = el2("button", "act", "try again");
    t.onclick = () => void loadPremises();
    view.append(t);
  }
  if (state.premises && state.premises.length) {
    const draftedPremise = state.premises.find((o) => o.recommended) || null;
    view.append(optionCards({
      options: state.premises,
      // A premise Take opened by itself stays DRAFTED; only a click puts a card in the accent state.
      chosenId: r && !r.auto ? r.premiseId : null,
      draftedId: draftedPremise ? draftedPremise.id : null,
      onChoose: (o) => {
        if (r && r.auto && r.premiseId === o.id) {
          r.auto = false;
          void saveState();
          render();
          return;
        }
        void start(o);
      }
    }));
  }
  const own = el2("div", "steer");
  own.append(el2("span", "kicker", "or describe your own \u2014 optional"));
  const ownRow = el2("div", "row");
  const ownBox = el2("div", "box");
  const ownInput = el2("input");
  ownInput.placeholder = "e.g. a 40-second walkthrough of the pricing page";
  const ownGo = () => {
    const t = ownInput.value.trim();
    if (!t) return;
    ownInput.value = "";
    void start({ id: null, label: t, text: "" });
  };
  ownInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") ownGo();
  });
  ownBox.append(ownInput);
  const ownBtn = el2("button", "send", "script it");
  ownBtn.onclick = ownGo;
  ownRow.append(ownBox, ownBtn);
  own.append(ownRow);
  view.append(own);
  if (!r) return;
  const bar = el2("div", "runbar");
  bar.style.marginTop = "26px";
  bar.append(el2("span", "kicker", "recording"), el2("span", "run-input", r.input));
  const cp = el2("button", "act", "copy script");
  cp.onclick = () => void copyScript();
  cp.disabled = !r.options || !r.selectedId;
  const nu = el2("button", "act", "\xD7 clear");
  nu.onclick = () => {
    destroyRecorder();
    state.run = null;
    void saveState();
    render();
  };
  bar.append(cp, nu);
  view.append(bar);
  const modeRow = el2("div", "opts");
  modeRow.style.flexDirection = "row";
  modeRow.style.flexWrap = "wrap";
  for (const m of MODES) {
    const o = el2("div", "opt" + (r.mode === m.key ? " sel" : ""));
    o.style.flex = "1";
    o.style.minWidth = "180px";
    o.onclick = () => void setMode(m.key);
    o.append(el2("div", "check", "\u2713"), el2("div", "o-label", m.label), el2("div", "o-text", m.sub));
    modeRow.append(o);
  }
  view.append(modeRow);
  if (r.status) view.append(researching(r.status));
  if (r.error) {
    view.append(el2("div", "err", r.error));
    const t = el2("button", "act", "try again");
    t.onclick = () => void draftScript(null);
    view.append(t);
  }
  if (r.options) {
    view.append(el2("div", "kicker sect", "the script"));
    view.append(optionCards({
      options: r.options,
      chosenId: r.selectedId || null,
      draftedId: r.draftedId || (r.options.find((o) => o.recommended) || {}).id || null,
      disabled: running,
      onChoose: (o) => {
        r.selectedId = o.id;
        void saveState();
        render();
      },
      // Doctrine 4 — a slate without an exit is a cage. Your own angle re-scripts from your words.
      escape: {
        label: "none of these \u2014 say the angle you'd take",
        placeholder: "e.g. no talking \u2014 just show the bug, then the fix",
        sendLabel: "script that",
        onSubmit: (t) => draftScript(t)
      }
    }));
    if (!running) view.append(steerRow((s) => {
      running = true;
      render();
      void draftScript(s).finally(() => {
        running = false;
        render();
      });
    }));
    view.append(el2("div", "kicker sect", "record it"));
    const mode = MODES.find((m) => m.key === r.mode) || MODES[0];
    if (!recHost) {
      const host = el2("div");
      const handle = mountRecorder(host, {
        mode: r.mode,
        maxSeconds: mode.maxSeconds,
        fileName: mode.fileName,
        hint: r.mode === "screen" ? "Share the tab/window, then walk the beats above." : "Look at the camera and hit the beats above \u2014 one take."
      });
      recHost = { host, handle };
    }
    view.append(recHost.host);
  }
}
render();
//# sourceMappingURL=take.js.map
