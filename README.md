# irclog

A Discord theme that makes chat look like an IRC log.

```
2026-07-08 [23:48:18] <@regena>  I just noticed you
2026-07-08 [23:48:31] <@regena>  Talking to that lala, I know from aethy
2026-07-08 [23:49:19] <@xivbestiary>  oh? they apparently have no limits
│ 23:49 <@regena> that reminds me of one i have
2026-07-08 [23:50:02] <@astralsight>  sometimes
```

Grey date, white `[time]` with seconds, blue `<@nick>`. Wrapped lines go back to the left margin.
Reply quotes become a dim `│` line. In Discord's Default (cozy) mode you keep avatars and grouping
and only the header is styled.

Works with [Equicord](https://equicord.org) and [Vencord](https://vencord.dev).

## TL;DR (Equicord)

1. If you have Vencord, uninstall it first. Then install Equicord from <https://equicord.org>.
2. Discord Settings > Accessibility > Visual Density > Chat Message Display > **Compact**.
3. Settings > Equicord > Themes > **Online Themes**, paste:
   `https://raw.githubusercontent.com/Valiice/discord-irclog/main/irclog-equicord.theme.css`
4. Plugins > **CustomTimestamps** on > cog > set both formats to `YYYY-MM-DD [[]HH:mm:ss[]]`
5. Optional: **ReplyTimestamp**, **IrcColors**. Leave **ShowMeYourName** off.
6. Fully quit Discord from the tray and start it again. `Ctrl+R` is not enough for step 4.

Details and troubleshooting below.

## Setup on Equicord, step by step

You need Discord desktop and about five minutes. No coding.

**0. Start from plain Discord.**
If Vencord is installed, uninstall it first (run the Vencord installer and pick Uninstall).
Installing Equicord over Vencord makes Discord fail to start because both patchers load, and the
only fix is reinstalling Discord.

**1. Install Equicord.**
Download the installer from <https://equicord.org>, run it, click Install. Discord restarts.

**2. Switch Discord to Compact mode.**
User Settings (the cog at the bottom left) > Accessibility > Visual Density > Chat Message Display > Compact.
Without this you only get the header styling.

**3. Add the theme.**
User Settings > scroll down to the Equicord section > Themes > Online Themes tab. Paste this on its own line:

```
https://raw.githubusercontent.com/Valiice/discord-irclog/main/irclog-equicord.theme.css
```

GitHub is on Equicord's allowlist, so there is no trust prompt. The chat changes right away.

**4. Turn on the timestamp plugin.**
Equicord section > Plugins > search `CustomTimestamps` > toggle on > click its cog. Set both
Compact format and Cozy format to exactly:

```
YYYY-MM-DD [[]HH:mm:ss[]]
```

`[[]` and `[]]` are how this format language writes literal brackets.

**5. Optional plugins, same list.**
- ReplyTimestamp: shows the time of the quoted message in reply lines.
- IrcColors: gives every user their own nick colour like an IRC client. Off means everyone gets the same blue.
- Leave ShowMeYourName off. It changes the names and removes the `@` in quotes.

**6. Fully quit and restart Discord.**
Right-click the Discord tray icon > Quit Discord, then start it again. Plugin settings are cached
by Discord's main process, so `Ctrl+R` will not apply step 4.

Lines should now read `2026-07-08 [23:48:18] <@nick>  text` with a grey date.

### If it looks wrong

| What you see | Cause and fix |
|---|---|
| Date and time in one white bracket: `[2026-07-08 23:48:18]` | Step 4 did not apply. Check the format string, then do step 6 (full quit). |
| Double brackets: `[[2026-07-08 ...]]` | You added `irclog.theme.css` instead of `irclog-equicord.theme.css`. Use only the Equicord one. |
| Header says `Today at 23:48` | CustomTimestamps is off, or Discord was not fully restarted. |
| Names look wrong, no `@` in quotes | ShowMeYourName is on. Turn it off. |
| Wrong font (Verdana or Segoe) | DejaVu Sans loads from jsDelivr. Wait a moment, or check that Equicord did not block it (Themes shows a CSP notice). |
| Gap before `[` or before `<@` is off | The column widths are tuned for DejaVu Sans. If you changed the font, adjust `--irclog-date-w` and `--irclog-time-w` (see Customise). |
| Still looks like normal Discord | Step 2. You are in Default mode, where only the header is styled. |

## Vencord, or building from source

If you run Vencord or Equicord from source, use the base theme plus the userplugins in [`plugins/`](plugins/):

- Themes > Online Themes: `https://raw.githubusercontent.com/Valiice/discord-irclog/main/irclog.theme.css`
- Copy `plugins/ircTimestamps` (and optionally `plugins/nickOrUsername`) into `src/userplugins/`, run `pnpm build`, restart Discord.
- Enable IrcTimestamps. It puts the date in its own `<span class="vc-irc-date">`, which the theme colours grey. CustomTimestamps is not needed.
- NickOrUsername (optional): shows a nickname only if one is actually set (server first, then friend), otherwise the `@username`, never the display name. Keep ShowMeYourName off with it.

Installer builds of either mod cannot load userplugins. That is what the Equicord variant is for.

## Customise

Everything is a CSS variable. Put overrides in Settings > Themes > QuickCSS:

```css
:root {
  --irclog-font: "DejaVu Sans", Verdana, "Segoe UI", sans-serif;
  --irclog-size: 14px;
  --irclog-line: 1.65;
  --irclog-text: #dcdcdc;
  --irclog-time: #ffffff;
  --irclog-date: #8a8a8a;
  --irclog-nick: #7aa2f7;   /* fallback only, role colours and IrcColors win */
  --irclog-nick-gap: 0.5ch; /* total space between ">" and the message text, 0 = touching */
  --irclog-time-open: "[";  /* brackets the base theme draws around the time; the Equicord variant sets both to "" */
  --irclog-time-close: "]";
}

/* Equicord variant only: column widths of the split timestamp, tuned for DejaVu Sans */
:root {
  --irclog-date-w: 5.812em;  /* width of "2026-07-08" */
  --irclog-time-w: 5.9em;    /* width of "[23:48:18]" in bold */
  --irclog-date-gap: 0.32em; /* one space */
}
```

## How it holds up

Every selector uses ids Discord ships un-hashed (`#chat-messages-*`, `#message-username-*`,
`#message-timestamp-*`, `#message-content-*`, `#message-reply-context-*`), so the theme should
survive Discord's class-hash rotations. The Equicord variant's grey date is plain CSS: the timestamp
is laid out as two one-line columns so `::first-line` can colour just the date. The comment at the
top of `irclog-equicord.theme.css` explains it.
