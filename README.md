# irclog

A Vencord / BetterDiscord-compatible theme that makes Discord chat look like an IRC log.

```
2026-07-08 [23:48:18] <@regena>  I just noticed you
2026-07-08 [23:48:31] <@regena>  Talking to that lala, I know from aethy
2026-07-08 [23:49:19] <@xivbestiary>  oh? they apparently have no limits
```

- **Compact mode**: full IRC line layout - `[HH:MM] <@nick>  message`, wrapped lines return to the left margin, DejaVu Sans.
- **Default (cozy) mode**: Discord's own layout (avatars, grouping) with the IRC header `<@nick>  [time]`.
- Reply previews become a dim quoted line: `| <@nick> quoted text`.
- Every selector uses Discord's un-hashed hooks (`#chat-messages-*`, `#message-username-*`, `#message-timestamp-*`, `#message-content-*`, `#message-reply-context-*`), so it should survive Discord's class-hash rotations.

## Install (Vencord)

1. Settings > Accessibility > Visual Density > **Chat Message Display > Compact** (the theme is inert in Default mode apart from the header).
2. Settings > Vencord > Themes > **Online Themes**, paste:
   ```
   https://raw.githubusercontent.com/Valiice/discord-irclog/main/irclog.theme.css
   ```
   or download the file into the **Local Themes** folder.

That gives you `[23:48] <@nick>  message` with Discord's display names.

## Optional plugins

| Want | Plugin | Where |
|---|---|---|
| Unique nick colour per user, like an IRC client | **IrcColors** | built into Vencord |
| Time of the replied-to message in the quote line | **ReplyTimestamp** | built into Vencord |
| `2026-07-08 [23:48:18]` - date and seconds in the header | **IrcTimestamps** | userplugin, needs a Vencord source build |
| Real usernames (`@handle`) instead of display names, keeping nicknames that were actually set | **NickOrUsername** | userplugin, needs a Vencord source build |

Keep **ShowMeYourName** off if you use NickOrUsername; they patch the same spot.

### Equicord users (no source build)

Equicord ships **CustomTimestamps**. Set its compact and cozy formats to `YYYY-MM-DD [[]HH:mm:ss[]]`
and tell the theme not to draw its own brackets, in QuickCSS:

```css
:root { --irclog-time-open: ""; --irclog-time-close: ""; }
```

You get `2026-07-08 [23:48:18]` in one colour (the date can only be grey with the IrcTimestamps userplugin).

## Customise

Variables at the top of the file, override them in Vencord's QuickCSS:

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
}
```

DejaVu Sans is loaded from jsDelivr (on Vencord's CSP allowlist); swap `--irclog-font` for any installed font.
