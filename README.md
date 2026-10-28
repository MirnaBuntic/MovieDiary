# MovieDiary
MovieDiary er en webapplikasjon hvor brukere kan holde oversikt over filmer de har sett, og filmer de ønsker å se.

Prosjektet er utviklet for å lære mer om fullstack-utvikling med React, TypeScript, Python, FastAPI og SQLite.

## Funksjonalitet

- Legge til filmer med tittel, sjanger og status.
- Registrere dato og vurdering (0–10) for filmer som er sett.
- Skille mellom filmer man har sett og ønsker å se.
- Filtrere filmer etter sjanger.
- Sortere filmer etter dato eller vurdering.
- Slette filmer fra samlingen.
- Lagre filmer i en SQLite-database.

## Teknologier

**Frontend:** React, TypeScript, Vite, HTML og CSS

**Backend:** Python, FastAPI og Pydantic

**Database:** SQLite

## Installasjon og oppstart

### 1. Start backend

Gå til backend-mappen:

```bash
cd backend
```

Opprett og aktiver et virtuelt Python-miljø:

```bash
python -m venv .venv
```

Windows (PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Installer avhengighetene og start serveren:

```bash
python -m pip install "fastapi[standard]"
fastapi dev main.py
```

API-dokumentasjon: http://127.0.0.1:8000/docs

### 2. Start frontend

Åpne en ny terminal fra prosjektets hovedmappe:

```bash
cd frontend
npm install
npm run dev
```

Åpne adressen som vises i terminalen, vanligvis http://localhost:5173.

Frontend og backend må kjøre samtidig. Dersom Vite bruker en annen port, må denne tillates i backendens CORS-konfigurasjon.

## API-endepunkter

| Metode | Endepunkt | Beskrivelse |
|---|---|---|
| GET | `/movies` | Henter alle filmer |
| POST | `/movies` | Legger til en film |
| DELETE | `/movies/{movie_id}` | Sletter en film |

## Hvordan fungerer det?

React kommuniserer med FastAPI gjennom HTTP-forespørsler ved hjelp av `fetch()`.

FastAPI håndterer forespørslene og bruker SQL til å lagre og hente informasjon fra SQLite-databasen. Informasjonen sendes mellom frontend og backend som JSON.

Filtrering og sortering skjer direkte i React.

## Hva jeg har lært

Gjennom prosjektet har jeg fått erfaring med React-komponenter, TypeScript, state-håndtering, REST API, SQL, databaser og kommunikasjon mellom frontend og backend.

## Videreutvikling

Mulige forbedringer er å legge til redigering av filmer, søkefunksjon, brukerkontoer og integrasjon med et eksternt film-API.
