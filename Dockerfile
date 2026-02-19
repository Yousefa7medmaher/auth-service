FROM node:18

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --chown=appuser:appgroup package*.json ./
RUN npm install --omit=dev

COPY --chown=appuser:appgroup . .

USER appuser

EXPOSE 5000

CMD ["npm", "start"]
