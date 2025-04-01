# Fase di build
FROM node:18 AS build
WORKDIR /app


# Copia solo i file package per sfruttare la cache di Docker
COPY package*.json ./
RUN npm install


# Installa Angular CLI
RUN npm install -g @angular/cli@18.2.0


# Copia il resto dei file del progetto
COPY . .


# Esegui il build dell'applicazione
RUN ng build --configuration production


# Fase di produzione
FROM nginx:alpine


# Copia la configurazione di Nginx personalizzata
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copia i file compilati dalla fase di build
# Nota: adatta il percorso "dist/todos" al nome del tuo progetto Angular
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/energy-services/browser /usr/share/nginx/html


# Espone la porta 80 (standard per HTTP)
EXPOSE 80


# Comando per avviare Nginx
CMD ["nginx", "-g", "daemon off;"]
