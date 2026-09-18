/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 valen
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

import { formatIrcDate, formatIrcTime } from "./format";

interface TimestampProps {
    compact?: boolean;
    /** Hover timestamp in the gutter of a grouped cozy message (rendered with compact=true). */
    cozyAlt?: boolean;
    timestamp: Date | string | number;
    timestampFormat?: string | null;
}

export default definePlugin({
    name: "IrcTimestamps",
    description: "Message header timestamps as IRC log lines: 2026-07-08 [23:48:18], local time",
    authors: [{ name: "valen", id: 0n }],

    patches: [
        {
            // Discord's Timestamp component. Its displayed string also feeds a width-class
            // helper that calls .match() on it, so the string is left untouched and only the
            // copy handed to the inner <time> renderer is swapped for our node.
            find: "#{intl::MESSAGE_EDITED_TIMESTAMP_A11Y_LABEL}",
            replacement: {
                match: /timeFormatted:(\i),(timestamp:\i,id:\i,compact:\i,children:\i\})/g,
                replace: "timeFormatted:$self.renderTimestamp(arguments[0],$1),$2"
            }
        }
    ],

    renderTimestamp(props: TimestampProps, original: string) {
        // Gutter hover-timestamps on grouped cozy lines have no room for a date, and callers
        // asking for an explicit format keep Discord's text.
        if (props.cozyAlt || props.timestampFormat != null) return original;

        const date = new Date(props.timestamp);
        return (
            <>
                <span className="vc-irc-date">{formatIrcDate(date)}</span>
                {" ["}
                <span className="vc-irc-time">{formatIrcTime(date)}</span>
                {"]"}
            </>
        );
    }
});
