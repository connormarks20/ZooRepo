On windows:
(Assuming you have mysql downloaded and setup already. Make sure you are logged in. Having a .env file helps.)

Search for: edit the system and environment variables
Select environment variables, and select “Path” then “edit”
Select “new” and copy the directory where sql bin is located:

My path looks something like this: C:\Program Files\MySQL\MySQL Server 9.2\bin

In powershell, navigate to the ZooRepo root directory where the ZoologicalDB.sql file is located (assuming you guys have cloned the repository, or pulled the most recent, and typed npm install in both the frontend and backend directories)

Pipe the contents of the ZoologicalDB into mysql.

Get-Content ZoologicalDB.sql | mysql -u root -p

Type:
npm run dev
In both the backend and frontend, and it should give you a localhost link to see the site

** Note: Ensure all dependencies are properly installed in both frontend and backend**

On mac:
Mac Setup
Ensure MySQL is installed:

If you don’t already have it, install MySQL via Homebrew:

bash
CopyEdit
brew install mysql

Start MySQL server:

bash
CopyEdit
brew services start mysql

Verify MySQL is in your PATH:

MySQL is usually installed to /opt/homebrew/opt/mysql/bin (on Apple Silicon)

To add it to your shell PATH temporarily:

bash
CopyEdit
export PATH="/opt/homebrew/opt/mysql/bin:$PATH"

To make it permanent, add the line above to your shell config file:

~/.zshrc (for zsh)

or ~/.bash_profile (for bash)

Navigate to the repo root:

In Terminal, cd into the directory containing ZoologicalDB.sql

Import the SQL file into MySQL:

bash
CopyEdit
cat ZoologicalDB.sql | mysql -u root -p zoodb

You’ll be prompted for your MySQL password.

If zoodb doesn’t exist yet:

sql
CopyEdit
CREATE DATABASE zoodb;
