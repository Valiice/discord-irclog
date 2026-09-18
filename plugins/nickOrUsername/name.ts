/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 valen
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/**
 * The name to show for a message author: a nickname somebody actually set
 * (server nickname first, then friend nickname), otherwise the account username.
 * The global display name is deliberately never used.
 */
export function pickName(serverNick: string | null | undefined, friendNick: string | null | undefined, username: string): string {
    return serverNick || friendNick || username;
}
