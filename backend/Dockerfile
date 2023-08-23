FROM node:16-alpine3.11

# Create app directory

WORKDIR /app

# Install app dependencies

COPY package*.json ./

RUN npm install

# Bundle app source

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]

CMD ["start"]