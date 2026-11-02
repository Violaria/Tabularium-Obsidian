# Tabularium for Obsidian

[English](README.md) · [中文](README.zh-CN.md) · Lingua Latīna

Additamentum Obsidian quod tabularium cum ministratore domi hospitato [Tabularii](https://github.com/Violaria/Tabularium) cryptographia ab extremo ad extremum synchronizat. Ramus est [Self-hosted LiveSync](https://github.com/vrtmrz/obsidian-livesync) 1.0.40 et ordinationem indicis plicarum ex [Custom File Explorer sorting](https://github.com/SebastianMC/obsidian-custom-sort) 3.2.0 continet, ita ut utrumque additamentum suppleat. Antequam hoc accendis, Self-hosted LiveSync et quodvis aliud additamentum synchronizationis in tabulario exstingue.

## Quae requiruntur et usus retis

Rationem in ministratore Tabularii habere debes; sine ea additamentum nihil agit. Omnis petitio retis ad inscriptionem ministratoris quam inscribis it: initus, testimonia huius instrumenti edenda et renovanda, synchronizatio, missio ad Kindle, communicatio. Additamentum nulla telemetrica mittit, et paginae auxilii cum eo continentur.

Commentarii in instrumento tessera arcana tabularii cryptantur (LiveSync E2EE V2, viis obscuratis) antequam id relinquunt. Tessera arcana in instrumento tantum servatur, et ministrator documenta non cryptata reicit. Duae functiones contentum legibile mittunt, et tantum cum eis uteris: missio ad Kindle EPUB per ministratorem mittit, et commentarius communicatus ad nexum editur quem quivis nexum habens aperire potest.

## Functiones

- Inito cum inscriptione ministratoris, nomine usoris et tessera; deinde tabularium exstans elige vel novum crea, instrumento nomen da et tesseram arcanam inscribe. Additamentum testimonia propria huic instrumento accipit et dum adhibetur renovat.
- Synchronizatio et discrepantiae ex LiveSync:
  - synchronizatio viva, periodica vel eventibus excitata, tractatio discrepantiarum, historia cuiusque commentarii;
  - cryptographia et viae obscuratae semper accensae sunt dum conexum est;
  - synchronizatio plicarum occultarum, synchronizatio accommodationum, et institutiones manuales CouchDB, repositorii obiectorum et synchronizationis inter pares additamenti originalis sublatae sunt.
- Cura ex pagina optionum: omnia ex ministratore arcessere, ministratorem ex hoc instrumento superscribere (postquam dominus tabularii in interrete permisit), reserare, diagnosis.
- Ordinatio indicis plicarum per plicas `sortspec.md`, ut in Custom File Explorer sorting.
- Commentarium, capsam vel selectionem ad inscriptionem Kindle in ministratore constitutam mitte.
- Commentarium vel capsam ut paginam interretialem communica; pagina renovatur cum plicae communicatae mutantur.
- Instrumenta formae super textum selectum, et instrumentum ad nexus internos fractos inveniendos et reficiendos.
- Facies Anglice, Sinice et Latine.

## Institutio

Donec additamentum in indice additamentorum communitatis Obsidian inscriptum est:
1. plicas `main.js`, `manifest.json` et `styles.css` ex editione in `.obsidian/plugins/tabularium/` tabularii exscribe;
2. Tabularium sub «Community plugins» accende;
3. iussum «Tabularium: Conexio ministratoris» exsequere ut inias.

## Constructio

Hoc repositorium submodulus est [Tabularii](https://github.com/Violaria/Tabularium) et a fasciculo ordinationis ibi posito pendet. Parentem cum `--recurse-submodules` exscribe et, cum Node.js 24.10.0:

```bash
npm run bootstrap
npm run build --prefix apps/obsidian      # main.js
npm run check --prefix apps/obsidian      # examina typorum, lint, examina Svelte
npm run test:unit --prefix apps/obsidian
```

Idem fons etiam commentarios interretiales (`src/apps/notes/`) et LiveSync CLI (`src/apps/cli/`) gignit, quibus ministrator Tabularii utitur.

## Licentia

MIT, ut Self-hosted LiveSync, cuius notitia iuris auctoris in `LICENSE` servatur. Custom File Explorer sorting a SebastianMC scriptum est.
