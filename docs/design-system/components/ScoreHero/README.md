# ScoreHero

The Puntaje TendIA as a hero number "de 1000", its band badge and a three-band bar with a pin, the portal's `ScoreHero` as validated with doña Gloria.

- **Consumer provides:** `puntaje` (0–1000). Band: ≥650 Bueno, ≥500 Medio, else Bajo; mark that segment `is-on` and set the pin to `left: calc(<puntaje/10>% - 2px)`.
- Number in `score-numeral` (64px/800, tabular), `indigo700`. Each band has its name and start written under the bar; the bar itself is `aria-hidden`.
- On the landing it is illustrative: show 618 and label it "Ejemplo".
