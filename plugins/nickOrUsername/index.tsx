/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 valen
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import ErrorBoundary from "@components/ErrorBoundary";
import definePlugin from "@utils/types";
import { Channel, Message, User } from "@vencord/discord-types";
import { GuildMemberStore, RelationshipStore } from "@webpack/common";

import { pickName } from "./name";

interface UsernameProps {
    author: { nick: string; authorId: string; };
    channel: Channel;
    message: Message;
    withMentionPrefix?: boolean;
    isRepliedMessage: boolean;
    userOverride?: User;
}

export default definePlugin({
    name: "NickOrUsername",
    description: "Show a nickname that was actually set (server, then friend), otherwise the username - never the global display name. Keep ShowMeYourName off.",
    authors: [{ name: "valen", id: 0n }],

    patches: [
        {
            // Same hook ShowMeYourName uses: the message header's username node.
            find: '="SYSTEM_TAG"',
            replacement: {
                match: /(?<=onContextMenu:\i,children:)\i\?(?=.{0,100}?user[Nn]ame:)/,
                replace: "$self.renderUsername(arguments[0]),_oldChildren:$&"
            }
        }
    ],

    renderUsername: ErrorBoundary.wrap(({ channel, message, withMentionPrefix, userOverride }: UsernameProps) => {
        const user = userOverride ?? message.author;
        const serverNick = channel.guild_id ? GuildMemberStore.getNick(channel.guild_id, user.id) : null;
        const friendNick = RelationshipStore.getNickname(user.id);
        return <>{withMentionPrefix ? "@" : ""}{pickName(serverNick, friendNick, user.username)}</>;
    }, { noop: true })
});
