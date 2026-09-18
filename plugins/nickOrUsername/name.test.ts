/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 valen
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import { pickName } from "./name";

test("server nickname wins", () => {
    assert.equal(pickName("Mari", "sleepy", "sleepymari_u"), "Mari");
});

test("friend nickname when no server nickname", () => {
    assert.equal(pickName(null, "sleepy", "sleepymari_u"), "sleepy");
    assert.equal(pickName(undefined, "sleepy", "sleepymari_u"), "sleepy");
});

test("username when nothing is set (never the display name)", () => {
    assert.equal(pickName(null, null, "icevali"), "icevali");
    assert.equal(pickName("", "", "icevali"), "icevali");
});
