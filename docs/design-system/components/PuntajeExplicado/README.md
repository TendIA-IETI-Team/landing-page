# PuntajeExplicado

How a score is built: ScoreHero with the example score, the **ScoreBreakdown** table, and an info Alerta saying the AI explains but does not calculate (landing addition).

- **Consumer provides:** the base (615 = an average shop), and the factors with label, value and signed points from a real `tendia-v2` response; group the small ones as "Otros n factores". Points keep one decimal so base + points equals the score exactly.
- ScoreBreakdown is a real `<table>` (caption, header, `tfoot` total) with a diverging bar per row: `chart-primary` adds to the right of a `neutral600` zero line, `chart-negative` subtracts to the left; the bar column hides under 520px and the numbers stay.
- Say that the shop is simulated and name the model version.
