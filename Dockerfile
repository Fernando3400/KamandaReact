# Use a imagem Node.js como base
FROM node:18 AS builder

# Defina o diretório de trabalho como /app
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do aplicativo
COPY . .

# Crie a versão otimizada do aplicativo React
RUN npm run build

# Use uma imagem leve do servidor da web para produção
FROM nginx:alpine

# Copie os arquivos de construção do aplicativo React para o diretório de publicação do Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copia os certificados SSL do Let's Encrypt para dentro do container
COPY fullchain.pem /app/certs/fullchain.pem
COPY privkey.pem /app/certs/privkey.pem

# Exponha a porta 80 (a porta padrão para o servidor da web Nginx)
EXPOSE 80

# Configuração do Nginx (pode ser a configuração simplificada que você usou)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Inicie o servidor da web Nginx
CMD ["nginx", "-g", "daemon off;"]
