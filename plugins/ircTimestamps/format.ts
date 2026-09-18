/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 valen
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// IRC-log timestamp pieces, in local time: "2026-07-08" and "23:48:18".

const pad2 = (n: number) => String(n).padStart(2, "0");

export function formatIrcDate(d: Date): string {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function formatIrcTime(d: Date): string {
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}
