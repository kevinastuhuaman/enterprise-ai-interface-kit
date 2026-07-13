# 002: Confidence is not a decorative score

## Status

Accepted

## Decision

Confidence combines a calibrated band, the evidence coverage behind it, and the decision threshold that applies to the action. The interface never uses a single percentage as permission to act.

## Consequence

Low confidence routes the user toward missing evidence or a bounded review instead of presenting false precision.
