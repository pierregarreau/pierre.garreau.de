---
title: "Portfolio Atlas — Six Famous Investment Strategies, Dissected"
draft: false
date: 2026-05-08T00:00:00+00:00
description: "An interactive explorer of six legendary portfolio strategies — All Weather, 60/40, Bogleheads, Permanent Portfolio, Buffett 90/10, and Golden Butterfly — with 8 years of historical data and 5-year forward projections."
tags: [ "Finance", "Investing", "Data", "Interactive" ]
---

{{< portfolio-atlas >}}

## A note on how this was built

This portfolio explorer was my first ever project built with Claude Code — Anthropic's agentic coding tool that runs in the terminal. The experience is worth writing about.

**Session one** was entirely about the explorer itself. I described what I wanted — six famous portfolios, historical data, interactive charts, a compare view — and Claude Code wrote the whole thing in a single session. The self-contained HTML file you see embedded above is that output, essentially untouched. Chart.js, the data, the CSS design system, the navigation logic, the scatter plots and drawdown charts — all of it produced in one go. I didn't write a single line of that file.

**Session two** was this blog. This Hugo site had been sitting dormant since 2020, pinned to Hugo 0.70. I asked Claude Code to parse the repo, update Hugo to the latest version, set up Docker for local development, and then write a blog entry from the portfolio explorer I had just built. What I got back: a `docker-compose.yml`, a `README.md`, fixes for three breaking changes introduced across four years of Hugo releases.

I've been writing code for twenty years. I know what it feels like to pick up a project you haven't touched in five years — the archaeology of it, the friction of getting it running again before you can do anything useful. That part, the part I like least, took about two minutes.

Whether that's exciting or unsettling probably depends on where you sit. For me it was both.

## Six strategies, one ruler

Most personal finance advice collapses into two camps: *buy index funds and don't look at it*, or an endless stream of tactical opinions that aged poorly. What rarely gets done is a clean, side-by-side comparison of the canonical frameworks — the ones that have enough history and intellectual backing to be taken seriously.

This explorer covers six of them:

- *Ray Dalio's All Weather* — risk parity across four economic seasons
- *Classic 60 / 40* — the institutional cornerstone since the Graham era
- *Bogleheads 3-Fund* — Bogle's philosophy in three index funds, globally diversified
- *Permanent Portfolio* — Harry Browne's four-quadrant equal-weight design from 1981
- *Buffett 90 / 10* — maximum conviction in American enterprise, minimum complexity
- *Golden Butterfly* — the Permanent Portfolio with a Small Cap Value tilt

The data covers 2017–2024, with monthly returns, annualised CAGR, volatility, max drawdown, Sharpe ratio, and three-scenario projections to 2030.

## What the numbers say

A few things to note when you put all six on the same ruler:

**Buffett 90/10 wins on raw return** (13.0% 10Y CAGR) but carries the most volatility and the deepest drawdowns. It is effectively a bet that US equities mean-revert upward — which they have, until they don't.

**Golden Butterfly has the best Sharpe ratio** (0.85) among the six. Adding Small Cap Value to the Permanent Portfolio's skeleton picks up the size and value factor premiums while keeping the all-season safety net intact. 2022 was -11.5% versus -24.3% for All Weather.

**All Weather underperformed in the 2022 rate-shock scenario** more than its thesis would suggest. Long-duration bonds and equities fell together — the exact correlation breakdown the strategy was designed to avoid. The 40% TLT allocation was the culprit.

**The 60/40 is not dead**, just cyclical. Its 8.5% 10Y CAGR with a 0.79 Sharpe still beats most actively managed funds after fees.
