# 1️⃣ Base image
FROM node:18

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first (for better caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy the rest of the app
COPY . .

# 6️⃣ Expose app port (adjust if not 5000)
EXPOSE 5000

# 7️⃣ Start the app
CMD ["npm", "run", "dev"]
