# ÜV-Listen-Generator (MVP)

**Was ist das?**  
Eine super einfache, deploy-fertige Next.js-App mit Demo-Daten. Du bekommst eine Eingabemaske wie im Screenshot und unten eine Tabelle mit den berechneten ÜV-Deals.  
Später können wir echte FUT.GG/FUTBIN-Daten anbinden – für den Start reicht das hier zum sofortigen Deploy auf **Vercel**.

## Lokales Starten (optional)
```bash
npm install
npm run dev
```
App ist dann auf `http://localhost:3000`.

## Deployment
- Push das Projekt zu GitHub
- In Vercel: „New Project“ → Repo auswählen → Deploy
- Keine Environment-Variablen nötig

## Nächste Schritte (optional)
- Scraper als GitHub Action hinzufügen (schreibt Live-Daten in eine DB)
- API anpassen, um Daten aus der DB zu lesen
