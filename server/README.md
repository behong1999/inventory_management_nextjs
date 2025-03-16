# EC2 Setup Instructions

## 1. Connect to EC2 Instance via EC2 Instance Connect

## 2. Install Node Version Manager (nvm) and Node.js

- **Switch to superuser and install nvm:**

```
sudo su -
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

- **Activate nvm:**

```
. ~/.nvm/nvm.sh
```

- **Install the latest version of Node.js using nvm:**

```
nvm install node
```

- **Verify that Node.js and npm are installed:**

```
node -v
npm -v
```

## 3. Install Git

- **Update the system and install Git:**

```
sudo yum update -y
sudo yum install git -y
```

sudo yum update -y will:
•	Update all outdated packages to their latest versions.
•	Automatically approve the updates without asking for user confirmation.


- **Check Git version:**

```
git --version
```

- **Clone your code repository from GitHub:**

```
git clone [your-github-link]
```

- **Navigate to the directory and install packages:**

```
cd inventory-management
npm i
```

## 3'. Initialize the database on AWS after finishing creating an RDS instance**

Generate Prisma Client by:
```
npx prisma generate
npx prisma migrate dev –name init
npm run seed
```
Whereas, npm run seed to populate/initialize the database with mock data

- **Create Env File and Port 80:**

```
nano .env
```

- **PASSWORD** with the password for PostgreSQL database user (default is 'postgres' unless changed).
- **ENDPOINT** with the RDS endpoint found in the AWS RDS console under the "Connectivity & Security" tab.
- **PORT** with the port for database also found in the AWS RDS console under the "Connectivity & Security" tab (default is 5432).
- **NAME** with the name of database found in the AWS RDS console under the "Configuration" tab.
```
DATABASE_URL="postgresql://postgres:[PASSWORD]@[ENDPOINT]:[PORT]/[NAME]?schema=public"
PORT=80
```

- **Start the application:**

```
npm start
```

## 4. Install pm2 (Production Process Manager for Node.js)
It has a lot of useful features such as monitoring, clustering, reloading, log management, etc. In other words, it prevents the EC2 instance might go down if closing the computer and ensure that it’s always running 

- **Install pm2 globally:**

```
npm i pm2 -g
```

- **Create a pm2 ecosystem configuration file (inside server directory):**

```
module.exports = { apps : [{ name: 'inventory-management', script: 'npm', args: 'run dev', env: { NODE_ENV: 'development', ENV_VAR1: 'environment-variable', } }], };
```

- **Modify the ecosystem file if necessary so that we can use pm which will run application for us:**

```
nano ecosystem.config.js
```

- **Set pm2 to restart automatically on system reboot:**

```
sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u $USER --hp $(eval echo ~$USER)
```

- **Start the application using the pm2 ecosystem configuration:**

```
pm2 start ecosystem.config.js
```

- **Useful pm2 commands:**

  - **Stop all processes:**

  ```
  pm2 stop all
  ```

  - **Delete all processes:**

  ```
  pm2 delete all
  ```

  - **Check status of processes:**

  ```
  pm2 status
  ```

  - **Monitor processes:**

  ```
  pm2 monit
  ```
