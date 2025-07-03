# Gunakan Node versi Alpine untuk image yang ringan
FROM node:22.2.0-alpine

# Atur working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install semua dependencies
RUN npm install

# Copy seluruh project ke dalam image
COPY . .

# Buka port 3000 untuk development
EXPOSE 3000

# Jalankan development server
CMD ["npm", "run", "dev"]
