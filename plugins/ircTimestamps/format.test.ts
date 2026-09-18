/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 valen
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import { formatIrcDate, formatIrcTime } from "./format";

// Local-time construction so the expectations hold in any timezone.
const at = (y: number, mo: number, d: number, h: number, mi: number, s: number) => new Date(y, mo - 1, d, h, mi, s);

test("formatIrcDate: ISO date, zero-padded", () => {
    assert.equal(formatIrcDate(at(2026, 7, 8, 23, 48, 18)), "2026-07-08");
    assert.equal(formatIrcDate(at(2026, 1, 1, 0, 0, 0)), "2026-01-01");
    assert.equal(formatIrcDate(at(2026, 12, 31, 23, 59, 59)), "2026-12-31");
});

test("formatIrcTime: 24h with seconds, zero-padded", () => {
    assert.equal(formatIrcTime(at(2026, 7, 8, 23, 48, 18)), "23:48:18");
    assert.equal(formatIrcTime(at(2026, 7, 9, 0, 22, 4)), "00:22:04");
    assert.equal(formatIrcTime(at(2026, 7, 9, 9, 5, 0)), "09:05:00");
});

test("formatters use local time, not UTC", () => {
    const d = at(2026, 7, 9, 0, 22, 4);
    const offsetMin = d.getTimezoneOffset();
    // Only meaningful when the machine is not on UTC; otherwise the two agree trivially.
    if (offsetMin !== 0) {
        assert.notEqual(formatIrcTime(d), d.toISOString().slice(11, 19));
    }
    assert.equal(formatIrcTime(d), "00:22:04");
});
