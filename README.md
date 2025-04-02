# Energy Service frontend (Demo)

Progetto generato con [Angular CLI](https://github.com/angular/angular-cli) versione 18.2.0.

## Descrizione 

Simulazione di web app per la gestione di clienti e fatture per società di energia. Offre un'interfaccia intuitiva sia per gli operatori interni che per i clienti finali e la consultazione di una dashboard.

Permette:
- operazioni CRUD
- ricerca clienti con filtri
- ricerca fatture con filtri
- registrazione nuovi utenti e login
- creazione nuove fatture
- visualizzazione dashboard con report

Tecnologie utilizzate:
- Angular 18.2
- Ng Bootstrap per web design e mobile responsive
- State management con libreria RxJs

## Eseguire l'applicazione con Docker (consigliato)

- Se non hai Docker installato, segui le istruzioni dal sito ufficiale: [Docker](https://docs.docker.com/desktop/)
- Esegui `docker build . -t energyservice-fe-app` per creare l'immagine dell'applicazione con tutte le dipendenze necessarie al suo funzionamento
- Esegui `docker -d --name energyservice-fe-container -p 4200:80 energyservice-fe-app:latest` per creare ed eseguire il container per avviare l'applicazione
- Naviga `http://localhost:4200/`

## Eseguire l'applicazione sulla tua macchina locale (sconsigliato: richiede il download di tutti i pacchetti delle dipendenze)

- Esegui `npm i` per scaricare le dipendenze.
- Esegui `ng serve` per avviare il server di sviluppo.
- Naviga `http://localhost:4200/`.
- L'applicazione si aggiornarà automaticamente ad ogni modifica del file sorgente.

## Link al backend
- [EnergyService Backend Web App](https://energyservices-java.onrender.com/swagger-ui/index.html) (documentazione endpoints)
- [EnergyService Backend GitHub](https://github.com/adrianagaglio/EnergyServices-Java/)
