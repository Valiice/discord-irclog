# irclog

Makes Discord chat look like an IRC log.

```
2026-07-08 [23:48:18] <@regena>  I just noticed you
2026-07-08 [23:48:31] <@regena>  Talking to that lala, I know from aethy
2026-07-08 [23:49:19] <@xivbestiary>  oh? they apparently have no limits
│ 23:49 <@regena> that reminds me of one i have
2026-07-08 [23:50:02] <@astralsight>  sometimes
```

Grey date, white `[time]` with seconds, blue `<@nick>`, wrapped lines return to the left margin,
reply quotes become a dim `│` line. In Discord's **Default** (cozy) mode you keep avatars and message
grouping and only the header gets the IRC treatment.

It is a theme for [Equicord](https://equicord.org) / [Vencord](https://vencord.dev) (BetterDiscord-compatible CSS).

---

## Quick start (Equicord) — for a new user

You need: Discord desktop, ~5 minutes, no coding.

**0. Start from plain Discord.**
If you already have **Vencord** installed, uninstall it first (run the Vencord installer → *Uninstall*).
Installing Equicord on top of Vencord breaks Discord's startup (both patchers load), and the fix is a
Discord reinstall.

**1. Install Equicord.**
Download the installer from <https://equicord.org>, run it, click *Install*. Discord restarts.

**2. Switch Discord to Compact mode.**
User Settings (cog, bottom-left) → **Accessibility** → **Visual Density** → **Chat Message Display** → **Compact**.
(Without this you only get the header styling.)

**3. Add the theme.**
User Settings → scroll to the **Equicord** section → **Themes** → **Online Themes** tab → paste on its own line:

```
https://raw.githubusercontent.com/Valiice/discord-irclog/main/irclog-equicord.theme.css
```

No trust prompt is needed — GitHub is on Equicord's allowlist. The chat changes immediately.

**4. Turn on the timestamp plugin.**
Equicord section → **Plugins** → search `CustomTimestamps` → toggle on → click its cog and set **both**
*Compact format* and *Cozy format* to exactly:

```
YYYY-MM-DD [[]HH:mm:ss[]]
```

(`[[]` and `[]]` are how you write literal brackets in this format language.)

**5. Optional plugins, same list.**
- **ReplyTimestamp** — shows the time of the quoted message in reply lines (`│ 23:49 <@regena> …`).
- **IrcColors** — gives every user their own nick colour like an IRC client. Off = everyone the same blue.
- Leave **ShowMeYourName** *off*; it changes the names and removes the `@` in quotes.

**6. Fully quit and relaunch Discord.**
Right-click the Discord tray icon → *Quit Discord*, then start it again. Plugin settings are cached
by Discord's main process; `Ctrl+R` is **not** enough for step 4 to take effect.

**Done.** Lines should read `2026-07-08 [23:48:18] <@nick>  text` with a grey date.

### If it doesn't look right

| Symptom | Cause / fix |
|---|---|
| Date and time in one white bracket, `[2026-07-08 23:48:18]` | Step 4 not applied — check the format string, then do step 6 (full quit). |
| Double brackets `[[2026-07-08 …]]` | You added `irclog.theme.css` instead of `irclog-equicord.theme.css`. Use only the Equicord one. |
| Header shows `Today at 23:48` | CustomTimestamps is off or Discord wasn't fully restarted. |
| Names look wrong / no `@` in quotes | ShowMeYourName is on. Turn it off. |
| Wrong font (Verdana/Segoe) | DejaVu Sans is loaded from jsDelivr; give it a moment or check that Equicord didn't block the request (Themes → CSP notice). |
| Gap before `[` or before `<@` is off | The date/time column widths are tuned to DejaVu Sans. If you changed the font, adjust `--irclog-date-w` / `--irclog-time-w` (see *Customise*). |
| Everything still looks like normal Discord | Step 2 — you are in Default mode. Only the header is styled there. |

---

## Vencord / building from source

If you run Vencord or Equicord **from source**, use the base theme plus the userplugins in [`plugins/`](plugins/):

- Themes → Online Themes: `https://raw.githubusercontent.com/Valiice/discord-irclog/main/irclog.theme.css`
- Copy `plugins/ircTimestamps` (and optionally `plugins/nickOrUsername`) into `src/userplugins/`, `pnpm build`, restart.
- Enable **IrcTimestamps** — it renders the date in its own `<span class="vc-irc-date">`, which the theme styles grey. No CustomTimestamps needed.
- **NickOrUsername** (optional): shows a nickname only if one is actually set (server, then friend), otherwise the `@username`, never the display name. Keep ShowMeYourName off with it.

Installer builds of either mod cannot load userplugins; that is what the Equicord variant above is for.

---

## Customise

All knobs are CSS variables. Put overrides in Settings → Themes → **QuickCSS**:

```css
:root {
  --irclog-font: "DejaVu Sans", Verdana, "Segoe UI", sans-serif;
  --irclog-size: 14px;
  --irclog-line: 1.65;
  --irclog-text: #dcdcdc;
  --irclog-time: #ffffff;
  --irclog-date: #8a8a8a;
  --irclog-nick: #7aa2f7;   /* fallback only - role colours and IrcColors win */
  --irclog-nick-gap: 0.5ch; /* total space between ">" and the message text; 0 = touching */
  --irclog-time-open: "[";  /* brackets the base theme draws around the time (the Equicord variant sets both to "") */
  --irclog-time-close: "]";
}

/* Equicord variant only - column widths of the split timestamp, tuned to DejaVu Sans */
:root {
  --irclog-date-w: 5.812em;  /* width of "2026-07-08" */
  --irclog-time-w: 5.9em;    /* width of "[23:48:18]" in bold */
  --irclog-date-gap: 0.32em; /* one space */
}
```

## How it holds up

Every selector uses ids Discord ships un-hashed (`#chat-messages-*`, `#message-username-*`,
`#message-timestamp-*`, `#message-content-*`, `#message-reply-context-*`), so the theme should survive
Discord's class-hash rotations. The Equicord variant's grey date is pure CSS: the timestamp is laid out as
two one-line columns so `::first-line` can colour just the date — see the comment at the top of
`irclog-equicord.theme.css`.
