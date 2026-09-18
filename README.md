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

Use **`irclog-equicord.theme.css`** instead of the base file (it imports it) and enable Equicord's
built-in **CustomTimestamps** with both formats set to `YYYY-MM-DD [[]HH:mm:ss[]]`:

1. Vencord/Equicord settings > Themes > **Online Themes**:
   ```
   https://raw.githubusercontent.com/Valiice/discord-irclog/main/irclog-equicord.theme.css
   ```
2. Plugins > **CustomTimestamps** > on > cog > Compact format and Cozy format: `YYYY-MM-DD [[]HH:mm:ss[]]`
3. Plugin settings are cached by the main process: **fully quit and relaunch Discord** after changing them (`Ctrl+R` is not enough).
4. Optional: **ReplyTimestamp** (time in reply quotes), **IrcColors** (unique nick colours). Leave **ShowMeYourName** off.

Result is the same grey-date look as the userplugin, produced with CSS alone (see the comment at the top of that file for how).

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
