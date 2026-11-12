# Tabularium for Obsidian

[English](README.md) · [中文](README.zh-CN.md) · Lingua Latīna

Additamentum Obsidian quod armarium cum ministratore domi hospitato [Tabularii](https://github.com/Violaria/Tabularium) cryptographia ab extremo ad extremum synchronizat.

## Quae requiruntur et usus retis

Additamento opus est Obsidian 1.13 vel recentiore et ratione in ministratore Tabularii. Omnis petitio retis ad inscriptionem ministratoris quam inscribis it: initus, testimonia huius instrumenti edenda et renovanda, synchronizatio, missio ad Kindle, communicatio. Paginae auxilii cum additamento continentur.

Commentarii in instrumento tessera arcana armarii cryptantur (E2EE V2, viis obscuratis) antequam id relinquunt. Tessera arcana in instrumento tantum servatur, et ministrator documenta non cryptata reicit. Duae functiones contentum legibile mittunt, et tantum cum eis uteris: missio ad Kindle EPUB per ministratorem mittit, et commentarius communicatus ad nexum editur quem quivis nexum habens aperire potest.

## Functiones

- Inito cum inscriptione ministratoris, nomine usoris et tessera; deinde armarium exstans elige vel novum crea, instrumento nomen da et tesseram arcanam inscribe. Additamentum testimonia propria huic instrumento accipit et dum adhibetur renovat.
- Synchronizatio et discrepantiae:
  - synchronizatio viva, periodica vel eventibus excitata, tractatio discrepantiarum, historia cuiusque commentarii;
  - cryptographia et viae obscuratae semper accensae sunt dum conexum est;
  - synchronizatio per solum ministratorem Tabularii fit: plicae occultae et optiones additamentorum ac thematum non synchronizantur, nec CouchDB, repositorium obiectorum aut synchronizatio inter pares manu institui possunt.
- Cura ex pagina optionum: omnia ex ministratore arcessere, ministratorem ex hoc instrumento superscribere (postquam dominus armarii in interrete permisit), reserare, diagnosis.
- Ordinatio indicis plicarum propria, indice gradato in notis `Collation.md` scripta.
- Commentarium, capsam vel selectionem ad inscriptionem Kindle in ministratore constitutam mitte.
- Commentarium vel capsam ut paginam interretialem communica; pagina renovatur cum plicae communicatae mutantur.
- Instrumenta formae super textum selectum, et instrumentum ad nexus internos fractos inveniendos et reficiendos.
- Facies Anglice, Sinice et Latine.

## Institutio

Donec additamentum in indice additamentorum communitatis Obsidian inscriptum est:
1. plicas `main.js`, `manifest.json` et `styles.css` ex editione in `.obsidian/plugins/tabularium/` armarii exscribe;
2. Tabularium sub «Community plugins» accende;
3. iussum «Tabularium: Conexio ministratoris» exsequere ut inias.

## Constructio

Cum Node.js 24.10.0:

```bash
npm ci
npm run build       # main.js
npm run check       # examina typorum, lint, examina Svelte
npm run test:unit
```

Plicae editionum ab GitHub Actions ex commisso signato construuntur, cum constructione probata per singulos bytos comparantur et testimonium originis constructionis ferunt (`gh attestation verify main.js --repo Violaria/Tabularium-Obsidian`).

Hoc repositorium submodulus est [Tabularii](https://github.com/Violaria/Tabularium). Nucleus synchronizationis in `packages/sync-core/` etiam commentariis interretialibus et clienti lineae iussorum ministratoris servit, quae in [Tabularium-Server](https://github.com/Violaria/Tabularium-Server) sunt.
