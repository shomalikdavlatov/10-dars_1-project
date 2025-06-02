FROM node:22-alpine
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --freeze-lockfile && yarn cache clean
COPY . .
EXPOSE 3000
RUN npx prisma generate
RUN yarn build 
CMD npx prisma db push && yarn start:prod